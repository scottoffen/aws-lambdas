const log = require('lambda-log');

exports.handler = async function(event, context) {
    if ('env' in event) log.options.tags.push(event.env);
    log.info(`${context.functionName} executed successfully`);

    if (context.functionName.includes("generate-report")){
        event.ReportData = {
            "Location": "/location"
        };
    }

    return event;
}