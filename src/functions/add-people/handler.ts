import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
// import { responseApi } from '../../utils/response'

import { v4 } from "uuid";
import * as AWS from "aws-sdk";

const addPeople: Handler = async (event: APIGatewayEvent) => {

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { nombre, genero, planetaOrigen } = JSON.parse(JSON.stringify(event.body));

    const createdAt = new Date();
    const id = v4();

    const newPerson = {
      id,
      nombre,
      genero,
      planetaOrigen,
      fechaRegistro: createdAt.toString(),
    };

    await dynamoDb
      .put({
        TableName: "PeopleTable",
        Item: newPerson,
      })
      .promise();


    return formatJSONResponse(
      {
        message: "People registered",
        data: newPerson,
        status: 200
      }
    );

  } catch (error) {
    console.log({ error_addPeople: error });

    return formatJSONResponse(
      {
        error: error.message,
        status: 500
      }
    );
  }
};

export const main = middyfy(addPeople);