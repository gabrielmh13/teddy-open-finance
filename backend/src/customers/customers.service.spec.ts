import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './repositories/customers-repository';
import { InMemoryCustomersRepository } from './repositories/in-memory-customers-repository';
import { HttpException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  const defaultCustomer = {
    name: "John Doe",
    salary: "1000000",
    companyValue: "50000000"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CustomersRepository,
          useClass: InMemoryCustomersRepository
        }
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('Should be able to create customer', async () => {
    const customer = await service.create(defaultCustomer);

    expect(customer).toHaveProperty('id');
  });

  it('Should be able to list customers', async () => {
    await service.create(defaultCustomer);
    await service.create(defaultCustomer);

    const customers = await service.list({ page: 1, size: 10 });

    expect(customers).toHaveProperty('data');
    expect(customers.data).toHaveLength(2);
    expect(customers).toHaveProperty('total');
    expect(customers.total).toBe(2);
  });

  it('Should be able to delete customer', async () => {
    const customer = await service.create(defaultCustomer);

    expect(customer).toHaveProperty('id');

    await service.delete(customer.id);

    const customers = await service.list({ page: 1, size: 10 });

    expect(customers).toHaveProperty('data');
    expect(customers.data).toHaveLength(0);
    expect(customers).toHaveProperty('total');
    expect(customers.total).toBe(0);
  });

  it('Should not be able to delete customer that does not exist', async () => {
    await expect(service.delete(1)).rejects.toBeInstanceOf(HttpException);
    await expect(service.delete(1)).rejects.toMatchObject({ message: 'Customer not found.', status: 404 });
  });

  it('Should be able to update customer', async () => {
    let customer = await service.create(defaultCustomer);

    expect(customer).toHaveProperty('id');

    const updatedCustomer = await service.update(customer.id, { name: "Jane Doe" });

    expect(updatedCustomer).toHaveProperty('id');
    expect(updatedCustomer.name).toBe("Jane Doe");
  });

  it('Should not be able to update customer that does not exist', async () => {
    await expect(service.update(1, { name: "Jane Doe" })).rejects.toBeInstanceOf(HttpException);
    await expect(service.update(1, { name: "Jane Doe" })).rejects.toMatchObject({ message: 'Customer not found.', status: 404 });
  });
});
