# The Simple Web Service
The Simple Web Service fronts a Lambda function with an API Gateway &amp; DynamoDB

Insipred by [Serverless Microservice Patterns for AWS](https://www.jeremydaly.com/serverless-microservice-patterns-for-aws/)

This is the most basic of patterns you’re likely to see with serverless applications. The Simple Web Service fronts a Lambda function with an API Gateway. I’ve shown DynamoDB as the database here because it scales nicely with the high concurrency capabilities of Lambda.

![Simple Web Service Diagram](assets/simple-web-service-768x125.png)