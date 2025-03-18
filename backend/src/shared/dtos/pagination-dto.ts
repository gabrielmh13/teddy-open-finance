import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDTO {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    page: number;
  
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    size: number;
}