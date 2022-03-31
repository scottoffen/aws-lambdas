const index = require("./index");

const functionNames = [
    'poc-node-generate-report',
    'poc-node-store-report-metadata',
    'poc-node-send-notifications'
];

const event = {
    "env": "development",
    "ReportOptions": {

    },
    "Subscribers": [
        {
            "Type": "EMAIL",
            "Name": "Person1 Name",
            "Address": "person1.address@example.com"
        },
        {
            "Type": "EMAIL",
            "Name": "Person2 Name",
            "Address": "person2.address@example.com"
        }
    ]
}

const context = {
    "callbackWaitsForEmptyEventLoop": true,
    "functionVersion": "$LATEST",
    "functionName": "poc-node-generate-report",
    "memoryLimitInMB": "128",
    "logGroupName": "/aws/lambda/poc-node-generate-report",
    "logStreamName": "2022/03/31/[$LATEST]6de034d9be204d79acb681fb43639e54",
    "invokedFunctionArn": "arn:aws:lambda:us-east-1:010028932403:function:poc-node-generate-report:$LATEST",
    "awsRequestId": "ce98c86c-3562-4bbd-a4b3-ada4186b5c97"
};

index.handler(event, context);