import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './repositories/customers-repository';
import { TypeORMCustomersRepository } from './repositories/typeorm-customers-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    CustomersService,
    {
      provide: CustomersRepository,
      useClass: TypeORMCustomersRepository
    }
  ],
  controllers: [CustomersController]
})
export class CustomersModule {}
