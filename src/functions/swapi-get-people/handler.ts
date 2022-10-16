import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPeopleSwapi } from "../../libs/swapi/getPeople";

const getPeople: Handler = async (event: APIGatewayEvent) => {
  try {
    const response = await getPeopleSwapi(event.queryStringParameters.lan);

    return formatJSONResponse(
      {
        message: "People Found",
        data: response,
        status: 200
      }
    );
  } catch (error) {
    return formatJSONResponse(
      {
        error: error.message,
        status: 400
      }
    );
  }
};

export const main = middyfy(getPeople);
