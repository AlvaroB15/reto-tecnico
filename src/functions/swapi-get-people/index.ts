import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "get-people-swapi",
	description: "Obtener los datos de las personas de la api swapi",
	events: [
		{
			http: {
				method: "get",
				path: "swapi/people"
			},
		},
	],
};
export default handler;
