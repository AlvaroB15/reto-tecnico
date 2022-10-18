import type { AWS } from "@serverless/typescript";

import getPeopleSwapi from "@functions/swapi-get-people";
import getPlanetSwapi from "@functions/swapi-get-planet";
import addPeople from "@functions/add-person";
import getPeople from "@functions/get-people";
import getPerson from "@functions/get-person";

const serverlessConfiguration: AWS = {
  service: "zoluxiones",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        name: "role_aws_prueba_tecnica_zoluxiones",
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:PutObject",
              "s3:DeleteObject",
              "s3:GetObject",
            ],
            Resource: "*"
          },
          {
            Effect: "Allow",
            Action: [
              "secretsmanager:GetSecretValue"
            ],
            Resource: "*"
          },
          {
            Effect: "Allow",
            Action: [
              "ec2:CreateNetworkInterface",
              "ec2:DescribeNetworkInterface",
              "ec2:DeleteNetworkInterface",
              "ec2:DescribeVpcs",
              "ec2:DescribeSubnets",
              "ec2:DescribeSecurityGroups",
            ],
            Resource: "*"
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:us-east-1:375466748597:table/PeopleTable"
          },
          {
            Effect: "Allow",
            Action: [
              "execute-api:Invoke"
            ],
            Resource: "arn:aws:execute-api:*:*:*"
          }
        ],
      }
    }
  },
  resources: {
    Resources: {
      PeopleTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "PeopleTable",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" }
          ],
          KeySchema: [
            { AttributeName: "id", KeyType: "HASH" }
          ]
        }
      }
    }
  },
  // import the function via paths
  functions: { getPeopleSwapi, getPlanetSwapi, addPeople, getPeople, getPerson },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
