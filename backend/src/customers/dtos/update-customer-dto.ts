import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateCustomerDTO {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'John Doe', description: 'The name of the customer' })
    name?: string;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ example: '1000', description: 'The salary of the customer' })
    salary?: string;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ example: '1000', description: 'The company value' })
    companyValue?: string;
}