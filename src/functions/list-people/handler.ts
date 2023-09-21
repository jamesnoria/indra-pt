import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { formatJSONResponse } from '@libs/api-gateway';

import * as PeopleController from '../../controllers/people-controller';
import { ERROR_STATUS } from 'src/utils/codeStatus';

const listPeople: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  try {
    const page = event.queryStringParameters?.page || '1';

    const { total, pag_siguiente, pag_anterior, resultados } =
      await PeopleController.mergeSwapiDynamoDB(parseInt(page));

    return formatJSONResponse({
      total,
      pag_siguiente,
      pag_anterior,
      resultados,
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: ERROR_STATUS.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const main = middyfy(listPeople);
