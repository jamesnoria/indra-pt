import type { AWS } from '@serverless/typescript';

import { PeopleTable } from 'src/utils/peopleDynamoDb';

import listPeople from '@functions/list-people';
import createPeople from '@functions/create-people';

const serverlessConfiguration: AWS = {
  service: 'indra-pt',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local',
    'serverless-plugin-swagger-ui',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: '*',
      },
    ],
  },
  functions: { listPeople, createPeople },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 8080,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
    resources: {
      Resources: {
        PeopleTable,
      },
    },
  },
};

module.exports = serverlessConfiguration;
