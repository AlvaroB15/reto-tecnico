// import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "get-people",
	description: "Obtener los datos de las personas de Dynamo",
	events: [
		{
			http: {
				method: "get",
				path: "get-people"
			},
		},
	],
};
export default handler;
