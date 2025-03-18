import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ReturnCustomerDTO {
    @ApiProperty({ example: 1, description: 'The id of the customer' })
    id: number;

    @ApiProperty({ example: 'John Doe', description: 'The name of the customer' })
    name: string;

    @ApiProperty({ example: '1000', description: 'The salary of the customer' })
    salary: string;

    @ApiProperty({ example: '1000', description: 'The company value' })
    companyValue: string;
}