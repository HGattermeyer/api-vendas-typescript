import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Henrique',
      email: 'henrique1989@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two clients with the same email', async () => {
    await createCustomer.execute({
      name: 'Henrique',
      email: 'henrique1989@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Henrique',
        email: 'henrique1989@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
