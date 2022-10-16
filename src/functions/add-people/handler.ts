import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
// import { responseApi } from '../../utils/response'

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addPeople: Handler = async (event: APIGatewayEvent) => {

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    console.log(typeof event.body);
    console.log(JSON.stringify(event.body));

    const datt = JSON.parse(event.body);
    console.log(datt);

    console.log(JSON.stringify(event.body));

    console.log(JSON.parse(JSON.stringify(event.body)));


    const { nombre, genero, planetaOrigen } = event.body as any;
    const createdAt = new Date();
    const id = v4();

    const newPerson = {
      id,
      nombre,
      genero,
      planetaOrigen,
      fechaRegistro: createdAt.toString(),
    };

    // add register
    await dynamoDb
      .put({
        TableName: "PeopleTable",
        Item: newPerson,
      })
      .promise();


    return formatJSONResponse(
      {
        message: "People Found",
        data: {
          newPerson,
          message: "Persona/personaje registrado correctamente."
        },
        status: 200
      }
    );
    // return responseApi(
    //   200,
    //   newPerson,
    //   "Persona/personaje registrado correctamente.",
    // );
  } catch (error) {
    console.log({ error_addPeople: error });

    // return responseApi(
    // 	null,
    // 	"Hubo un problema al listrar los personajes.",
    // 	500,
    // 	error
    // );

    return formatJSONResponse(
      {
        error: {
          message: error.message,
          // error: 
        },
        status: 500
      }
    );

    // return responseApi(
    //   null,
    //   "No se pudo registrar a la persona/personaje",
    //   500,
    //   error
    // );
  }
};

export const main = middyfy(addPeople);