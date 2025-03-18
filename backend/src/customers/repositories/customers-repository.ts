import { PaginationDTO } from "src/shared/dtos/pagination-dto";
import { CreateCustomerDTO } from "../dtos/create-customer-dto";
import { ReturnCustomerDTO } from "../dtos/return-customer-dto";
import { UpdateCustomerDTO } from "../dtos/update-customer-dto";

export abstract class CustomersRepository {
    abstract create(data: CreateCustomerDTO): Promise<ReturnCustomerDTO | null>
    abstract findAll(pagintation: PaginationDTO): Promise<ReturnCustomerDTO[] | null>
    abstract countAll(): Promise<number | null>
    abstract findById(id: number): Promise<ReturnCustomerDTO | null>
    abstract delete(id: number): Promise<boolean>
    abstract update(id: number, data: Partial<UpdateCustomerDTO>): Promise<boolean>
}