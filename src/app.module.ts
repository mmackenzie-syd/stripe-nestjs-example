import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [StripeModule.forRoot(
    'STRIPE SECRET KEY', 
    { apiVersion: '2022-08-01' }), CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
