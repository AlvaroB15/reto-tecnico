import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "add-people",
	description: "Obtener los datos de las personas de la api swapi",
	events: [
		{
			http: {
				method: "post",
				path: "people"
			},
		},
	],
};
export default handler;
