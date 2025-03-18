import { Injectable } from "@nestjs/common";
import { CustomersRepository } from "./customers-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../customers.entity";
import { Repository } from "typeorm";
import { CreateCustomerDTO } from "../dtos/create-customer-dto";
import { ReturnCustomerDTO } from "../dtos/return-customer-dto";
import { TypeORMCustomersMappers } from "../mappers/typeorm-customers-mappers";
import { PaginationDTO } from "src/shared/dtos/pagination-dto";
import { UpdateCustomerDTO } from "../dtos/update-customer-dto";

@Injectable()
export class TypeORMCustomersRepository implements CustomersRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>
    ) {}

    async create(data: CreateCustomerDTO): Promise<ReturnCustomerDTO | null> {
        try {
            const customer = await this.customersRepository.save(TypeORMCustomersMappers.toPersistenceCustomer(data))
            
            return customer ? TypeORMCustomersMappers.toDomainCustomer(customer) : null
        } catch (error) {
            return null
        }
    }

    async findAll(pagination: PaginationDTO): Promise<ReturnCustomerDTO[] | null> {
        try {
            const customers = await this.customersRepository.find({
                skip: (pagination.page - 1) * pagination.size,
                take: pagination.size
            })

            return customers ? customers.map(customer => TypeORMCustomersMappers.toDomainCustomer(customer)) : null
        } catch(error) {
            return null
        }
    }

    async countAll(): Promise<number | null> {
        try {
            const count = await this.customersRepository.count()

            return count
        } catch(error){
            return null
        }
    }

    async findById(id: number): Promise<ReturnCustomerDTO | null> {
        try {
            const customer = await this.customersRepository.findOne({
                where: {
                    id: id
                }
            })

            return customer ? TypeORMCustomersMappers.toDomainCustomer(customer) : null
        } catch(error){
            return null
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.customersRepository.delete(id)

            return true
        } catch(error){
            return false
        }
    }

    async update(id: number, data: Partial<UpdateCustomerDTO>): Promise<boolean> {
        try {
            await this.customersRepository.update(id, TypeORMCustomersMappers.toPersistenceCustomerUpdate(data))
            
            return true
        } catch(error){
            return false
        }
    }

}