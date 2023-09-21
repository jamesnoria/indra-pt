import { PeopleModel, People } from '../models/peopleModel';
import { APIPeopleModel } from '../models/peopleAPIModel';
import { PeopleService } from 'src/services/peopleService';
import { translateResults } from 'src/services/translator';
import { getAllEntries } from '../services/dynamodbService';

const MAX_RESULTS_PER_PAGE = 10;

export const create = (apiData: Partial<APIPeopleModel>) => {
  const { peliculas, especies, vehiculos, naves, ...extraAPIData } = apiData;

  let dbData: Partial<People> = extraAPIData;

  if (apiData.peliculas || apiData.especies || apiData.vehiculos || apiData.naves) {
    dbData.peliculas = peliculas ? JSON.stringify(peliculas) : '[]';

    dbData.especies = especies ? JSON.stringify(especies) : '[]';

    dbData.vehiculos = vehiculos ? JSON.stringify(vehiculos) : '[]';
    dbData.naves = naves ? JSON.stringify(naves) : '[]';
  }

  console.log(dbData);

  return PeopleModel.create(dbData);
};

export const mergeSwapiDynamoDB = async (page: number) => {
  const SwapiPeople = new PeopleService();
  let results = await SwapiPeople.getPeopleFromPage(page);
  results = results.map(translateResults);

  const dynamodbData = (await getAllEntries(PeopleModel)).sort((a, b) => {
    if (a.creado < b.creado) return -1;
    if (a.creado > b.creado) return 1;
    return 0;
  });

  const [totalSwapi, pag_siguiente, pag_anterior] = await Promise.all([
    SwapiPeople.getTotalPeople(),
    SwapiPeople.getNextPage(page),
    SwapiPeople.getPreviousPage(page),
  ]);

  const pageLimit = page * MAX_RESULTS_PER_PAGE;

  let dynamoData: People[];

  if (pageLimit >= totalSwapi) {
    const remainGaps = pageLimit - totalSwapi;

    if (remainGaps >= MAX_RESULTS_PER_PAGE) {
      const prevPage = page - 1;
      const prevPageTotal = prevPage * MAX_RESULTS_PER_PAGE;
      const totalPrevDynamo = prevPageTotal - totalSwapi;

      dynamoData = dynamodbData.slice(
        totalPrevDynamo,
        MAX_RESULTS_PER_PAGE + totalPrevDynamo
      );
    } else {
      dynamoData = dynamodbData.slice(0, remainGaps);
    }

    const dynamoDataConverted: APIPeopleModel[] = dynamoData.map((item) => {
      return {
        ...item,
        peliculas: item.peliculas ? (JSON.parse(item.peliculas) as string[]) : [],
        especies: item.especies ? (JSON.parse(item.especies) as string[]) : [],
        vehiculos: item.vehiculos ? (JSON.parse(item.vehiculos) as string[]) : [],
        naves: item.naves ? (JSON.parse(item.naves) as string[]) : [],
      };
    });

    results = [...results, ...dynamoDataConverted];
  }

  const total = totalSwapi + dynamodbData.length;

  return {
    total,
    pag_siguiente,
    pag_anterior,
    resultados: results,
  };
};
