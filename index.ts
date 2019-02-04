import cdk = require("@aws-cdk/cdk");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import dynamodb = require("@aws-cdk/aws-dynamodb");

export class SimpleWebService extends cdk.Stack {

  constructor(parent: cdk.App, name: string, props?: any) {
    super(parent, name, props);

    // Create an API Gateway REST API
    const api = new apigateway.RestApi(this, "simple-web-api", {
      restApiName: "Simple Web API",
      description: "Simple Web API example"
    });

    let table = this.addDynamoDB();
    let lambda = this.addLambda(table);

    // Create intergration between lambda and API Gateway
    let intergration = new apigateway.LambdaIntegration(lambda);
    let resource = api.root.addResource("simple-web-service");
    resource.addMethod("ANY", intergration);

    // Give Lambda access to DynamoDB
    table.grantReadWriteData(lambda.role);
  }

  private addDynamoDB() {
    let table = new dynamodb.Table(this, "Table", {
      billingMode: dynamodb.BillingMode.PayPerRequest,
      partitionKey: { name: "pk", type: dynamodb.AttributeType.String }
    });
    return table;
  }

  private addLambda(table: dynamodb.Table) {
    let fn = new lambda.Function(this, "ProcessHandler", {
      runtime: lambda.Runtime.NodeJS810,
      code: lambda.Code.asset("assets/lambda"),
      handler: "index.handler",
      environment: {
        TABLE_NAME: table.tableName
      },
      description: "A test lambda function from SimpleWebService",
      timeout: 60 // Keep high for debugging!
    });

    return fn;
  }

}
