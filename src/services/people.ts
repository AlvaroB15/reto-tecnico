import * as DynamoDB from "aws-sdk/clients/dynamodb";

const dynamoDb = new DynamoDB.DocumentClient();

export const addPersonService = async (newPerson) => {
    return await dynamoDb
        .put({
            TableName: "PeopleTable",
            Item: newPerson,
        })
        .promise();
};

export const getPeopleService = async () => {
    return await dynamoDb
        .scan({
            TableName: "PeopleTable",
        })
        .promise();
};

export const getPersonService = async (id: string) => {
    return await dynamoDb
        .get({
            TableName: "PeopleTable",
            Key: { id },
        })
        .promise();
};