import axios from 'axios';

interface APIPerson {
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

interface APIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class PeopleService {
  constructor() {
    axios.defaults.baseURL = 'https://swapi.py4e.com/api/people';
    axios.defaults.timeout = 5000;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }

  async getTotalPeople(): Promise<number> {
    const response = await axios.get('/').catch(console.error);
    return response ? response.data.count : 0;
  }

  async getNextPage(page: number): Promise<APIResponse<APIPerson>> {
    const response = await axios.get(`/?page=${page}`).catch(console.error);
    return response ? response.data.next : null;
  }

  async getPreviousPage(page: number) {
    const response = await axios.get(`/?page=${page}`).catch(console.error);
    return response ? response.data.previous : null;
  }

  async getAllPeople(): Promise<APIPerson[]> {
    const response = await axios.get('/').catch(console.error);
    return response ? response.data.results : [];
  }

  async getPerson(id: number): Promise<APIPerson> {
    const response = await axios.get(`/${id}`).catch(console.error);
    return response ? response.data : null;
  }

  async getPeopleFromPage(page: number) {
    const response = await axios.get(`/?page=${page}`).catch(console.error);
    return response ? response.data.results : [];
  }
}
