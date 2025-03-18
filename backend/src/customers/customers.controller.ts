import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dtos/create-customer-dto';
import { PaginationDTO } from 'src/shared/dtos/pagination-dto';
import { UpdateCustomerDTO } from './dtos/update-customer-dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new customer' })
    async Create(@Body() data: CreateCustomerDTO) {
        const customer = await this.customersService.create(data)

        return customer
    }

    @Get()
    @ApiOperation({ summary: 'List all customers' })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
        default: 1
    })
    @ApiQuery({
        name: 'size',
        required: false,
        type: Number,
        description: 'Items per page',
        default: 10
    })
    async List(@Query() pagination: PaginationDTO) {
        const customers = await this.customersService.list(pagination)

        return customers
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer' })
    async Delete(@Param('id') id: string) {
        const deleted = await this.customersService.delete(Number(id))

        return deleted
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a customer' })
    async Update(@Param('id') id: string, @Body() data: UpdateCustomerDTO) {
        const customer = await this.customersService.update(Number(id), data)

        return customer
    }
}
