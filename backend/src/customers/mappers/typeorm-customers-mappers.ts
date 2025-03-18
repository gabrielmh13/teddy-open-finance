import { Customer } from "../customers.entity";
import { CreateCustomerDTO } from "../dtos/create-customer-dto";
import { ReturnCustomerDTO } from "../dtos/return-customer-dto";
import { UpdateCustomerDTO } from "../dtos/update-customer-dto";

export class TypeORMCustomersMappers {
    static toDomainCustomer(raw: Customer): ReturnCustomerDTO {
        return {
            id: raw.id,
            name: raw.name,
            salary: raw.salary,
            companyValue: raw.companyValue
        }
    }

    static toPersistenceCustomer(data: CreateCustomerDTO): Customer {
        const customer = new Customer()
        customer.name = data.name
        customer.salary = data.salary
        customer.companyValue = data.companyValue

        return customer
    }

    static toPersistenceCustomerUpdate(data: UpdateCustomerDTO): UpdateCustomerDTO {
        return {
            name: data.name,
            salary: data.salary,
            companyValue: data.companyValue
        }
    }
}