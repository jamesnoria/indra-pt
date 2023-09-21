import { People } from '../models/peopleModel';
import { APIPeopleModel } from '../models/peopleAPIModel';

interface SWAPIPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string;
  species: string;
  vehicles: string;
  starships: string;
  created: string;
  edited: string;
  url: string;
}

const resultsTranslation = {
  name: 'nombre',
  height: 'altura',
  mass: 'peso',
  hair_color: 'color_cabello',
  skin_color: 'color_piel',
  eye_color: 'color_ojos',
  birth_year: 'ano_naciemiento',
  gender: 'sexo',
  homeworld: 'tierra_natal',
  films: 'peliculas',
  species: 'especies',
  vehicles: 'vehiculos',
  starships: 'naves',
  created: 'fecha_creacion',
  edited: 'fecha_actualizacion',
  url: 'url',
};

export const translateResults = (obj: SWAPIPerson): APIPeopleModel => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[resultsTranslation[key]] = obj[key];
  });
  return newObj as APIPeopleModel;
};

export const translateDynamoToAPI = (obj: People): APIPeopleModel => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = obj[key];
  });
  return newObj as APIPeopleModel;
};
