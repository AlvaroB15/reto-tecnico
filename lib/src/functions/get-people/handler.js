import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
const getPeople = async () => {
    try {
        const dynamoDb = new DynamoDB.DocumentClient();
        const result = await dynamoDb
            .scan({
            TableName: "PeopleTable",
        })
            .promise();
        return formatJSONResponse({
            message: "People list Found",
            data: result.Items,
            status: 200
        });
    }
    catch (error) {
        console.log({ error_addPeople: error });
        return formatJSONResponse({
            error: error.message,
            status: 500
        });
    }
};
export const main = middyfy(getPeople);
//# sourceMappingURL=handler.js.map