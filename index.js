const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const log = require('lambda-log');
const helpers = require("./lib/helpers");

const bucket = "poc-generated-reports";

exports.handler = async function(event, context) {
    if ('env' in event) {
        log.options.tags.push(event.env);
        if (event.env.includes('dev'))
            log.options.dev = true;
    }

    log.info(`${context.functionName} executed successfully`);

    if (context.functionName.includes("generate-report")){
        const report = await helpers.generatePDF(event, context);
        const key = createObjectKey(event.ReportOptions.ReportName, event.ReportOptions.ReportFormat);
        const client = createS3Client();

        let bucketParams = { Bucket: bucket, Key: key, Body: Buffer.from(report, 'base64') };

        try {
            const data = await client.send(new PutObjectCommand(bucketParams));
            log.info(`Successfully saved report ${key} to bucket ${bucket}`);
            log.info(data);
        }
        catch (err) {
            log.error(`Failed to save report ${key} to bucket ${bucket}`);
        }

        event.ReportData = {
            "Location": key
        };
    }

    return event;
}

function createS3Client()
{
    const REGION = "us-east-1";
    const s3Client = new S3Client({ region: REGION });
    return s3Client;
}

function createObjectKey(reportName, reportFormat)
{
    const now = new Date(Date.now());
    const keyBuilder  = [
        now.getFullYear(),
        (now.getMonth() + 1).toString().padStart(2,0),
        now.getDate().toString().padStart(2,0),
        `${now.getHours().toString().padStart(2.0)}${now.getMinutes().toString().padStart(2,0)}`,
        `${reportName}.${reportFormat}`
    ];

    return keyBuilder.join('\\');
}