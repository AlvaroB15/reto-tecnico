// import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "get-planet-swapi",
	description: "Obtener los datos de los planetas de la api swapi",
	events: [
		{
			http: {
				method: "get",
				path: "get-planet-swapi"
			},
		},
	],
};
export default handler;
