import { Injectable } from "@nestjs/common";
import { CustomersRepository } from "./customers-repository";
import { PaginationDTO } from "src/shared/dtos/pagination-dto";
import { CreateCustomerDTO } from "../dtos/create-customer-dto";
import { ReturnCustomerDTO } from "../dtos/return-customer-dto";
import { UpdateCustomerDTO } from "../dtos/update-customer-dto";

@Injectable()
export class InMemoryCustomersRepository implements CustomersRepository {
    private customers: ReturnCustomerDTO[] = []

    async create(data: CreateCustomerDTO): Promise<ReturnCustomerDTO | null> {
        const customer: ReturnCustomerDTO = {
            id: this.customers.length + 1,
            ...data
        }

        this.customers.push(customer)

        return customer
    }

    async findAll(pagintation: PaginationDTO): Promise<ReturnCustomerDTO[] | null> {
        return this.customers.slice((pagintation.page - 1) * pagintation.size, pagintation.page * pagintation.size)
    }

    async countAll(): Promise<number | null> {
        return this.customers.length
    }
    
    async findById(id: number): Promise<ReturnCustomerDTO | null> {
        const customer = this.customers.find(customer => customer.id === id)

        return customer || null
    }
    
    async delete(id: number): Promise<boolean> {
        const index = this.customers.findIndex(customer => customer.id === id)

        if (index === -1) {
            return false
        }

        this.customers.splice(index, 1)

        return true
    }

    async update(id: number, data: Partial<UpdateCustomerDTO>): Promise<boolean> {
        const index = this.customers.findIndex(customer => customer.id === id)

        if (index === -1) {
            return false
        }

        this.customers[index] = {
            ...this.customers[index],
            ...data
        }

        return true
    }

}