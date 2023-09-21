import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import * as PeopleController from '../../controllers/people-controller';

import { HTTP_STATUS, ERROR_STATUS } from '../../utils/codeStatus';

import { translateDynamoToAPI } from '../../services/translator';

const createPeople: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const data = await PeopleController.create({ ...event.body });

    const response = translateDynamoToAPI(data);

    return {
      statusCode: HTTP_STATUS.CREATED,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: ERROR_STATUS.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(error),
    };
  }
};

export const main = middyfy(createPeople);
