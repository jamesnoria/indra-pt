import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

const peopleSchema = new dynamoose.Schema({
  nombre: {
    type: String,
  },
  altura: {
    type: String,
  },
  peso: {
    type: String,
  },
  color_cabello: {
    type: String,
  },
  color_piel: {
    type: String,
  },
  color_ojos: {
    type: String,
  },
  ano_nacimiento: {
    type: String,
  },
  sexo: {
    type: String,
  },
  tierra_natal: {
    type: String,
  },
  peliculas: {
    type: String,
  },
  especies: {
    type: String,
  },
  vehiculos: {
    type: String,
  },
  naves: {
    type: String,
  },
  creado: {
    type: Date,
    default: Date.now,
  },
  actualizado: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    default: '',
  },
});

export interface People extends Document {
  nombre: string;
  altura: string;
  peso: string;
  color_cabello: string;
  color_piel: string;
  color_ojos: string;
  ano_nacimiento: string;
  sexo: string;
  tierra_natal: string;
  peliculas: string;
  especies: string;
  vehiculos: string;
  naves: string;
  creado: Date;
  actualizado: Date;
  url: string;
}

export const PeopleModel = dynamoose.model<People>('People', peopleSchema);
