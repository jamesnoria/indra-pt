import { PeopleService } from '../services/peopleService';

describe('PeopleService', () => {
  test('return a page with 10 people', async () => {
    const peopleService = new PeopleService();
    const people = await peopleService.getPeopleFromPage(1);
    expect(people.length).toBe(10);
  });

  test('return people id 1', async () => {
    const peopleService = new PeopleService();
    const person = await peopleService.getPerson(1);
    expect(person.name).toBe('Luke Skywalker');
  });
});
