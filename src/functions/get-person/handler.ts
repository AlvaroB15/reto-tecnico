import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
// import { responseApi } from '../../utils/response'

import * as AWS from "aws-sdk";

const getPerson: Handler = async (event: APIGatewayEvent) => {

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    console.log(JSON.stringify(event));

    console.log(typeof event.pathParameters);
    console.log(event.pathParameters);

    // const { id } = JSON.parse(JSON.stringify(event.pathParameters));
    const id = event.queryStringParameters.id;

    const result = await dynamoDb
      .get({
        TableName: "PeopleTable",
        Key: { id },
      })
      .promise();

    return formatJSONResponse(
      {
        message: "Person found.",
        data: result.Item,
        status: 200
      }
    );

  } catch (error) {
    console.log({ error_addPeople: error });

    return formatJSONResponse(
      {
        error: error.message,
        message: "No se pudo obtener datos de la persona/personaje",
        status: 500
      }
    );
  }
};

export const main = middyfy(getPerson);