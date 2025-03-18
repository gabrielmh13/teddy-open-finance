import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, MinLength,  } from "class-validator";

export class CreateCustomerDTO {
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'John Doe', description: 'The name of the customer' })
    name: string;

    @IsNumberString()
    @ApiProperty({ example: '1000', description: 'The salary of the customer' })
    salary: string;

    @IsNumberString()
    @ApiProperty({ example: '1000', description: 'The company value' })
    companyValue: string;
}