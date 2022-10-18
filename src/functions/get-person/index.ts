// import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "get-person",
	description: "Obtener datos de una persona especifica de Dynamo",
	events: [
		{
			http: {
				method: "get",
				path: "get-person"
			},
		},
	],
};
export default handler;
