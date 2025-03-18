import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from './repositories/customers-repository';
import { CreateCustomerDTO } from './dtos/create-customer-dto';
import { PaginationDTO } from 'src/shared/dtos/pagination-dto';
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'src/utils/constants';
import { UpdateCustomerDTO } from './dtos/update-customer-dto';

@Injectable()
export class CustomersService {
    constructor(private readonly customersRepository: CustomersRepository) {}

    async create(data: CreateCustomerDTO) {
        const customer = await this.customersRepository.create(data);

        if (!customer) {
            throw new HttpException('Unable to create customer.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return customer;
    }

    async list(pagination: PaginationDTO) {
        const customers = await this.customersRepository.findAll({
            page: pagination.page || DEFAULT_PAGE,
            size: pagination.size || DEFAULT_SIZE
        });

        if (!customers) {
            throw new HttpException('Unable to list customers.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const total = await this.customersRepository.countAll();

        if (total === null) {
            throw new HttpException('Unable to count customers.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            data: customers,
            total
        }
    }

    async delete(id: number) {
        const customer = await this.customersRepository.findById(id);

        if (!customer) {
            throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
        }

        const deleted = await this.customersRepository.delete(id);

        if (!deleted) {
            throw new HttpException('Unable to delete customer.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return;
    }

    async update(id: number, data: UpdateCustomerDTO) {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
        }

        const updated = await this.customersRepository.update(id, data);

        if (!updated) {
            throw new HttpException('Unable to update customer.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const updatedCustomer = await this.customersRepository.findById(id);

        if (!updatedCustomer) {
            throw new HttpException('Unable to find updated customer.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return updatedCustomer;
    }
}
