import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
const getPerson = async (event) => {
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        console.log(JSON.stringify(event));
        console.log(typeof event.pathParameters);
        console.log(event.pathParameters);
        const id = event.queryStringParameters.id;
        const result = await dynamoDb
            .get({
            TableName: "PeopleTable",
            Key: { id },
        })
            .promise();
        return formatJSONResponse({
            message: "Person found.",
            data: result.Item,
            status: 200
        });
    }
    catch (error) {
        console.log({ error_addPeople: error });
        return formatJSONResponse({
            error: error.message,
            message: "Couldn't find person details",
            status: 500
        });
    }
};
export const main = middyfy(getPerson);
//# sourceMappingURL=handler.js.map