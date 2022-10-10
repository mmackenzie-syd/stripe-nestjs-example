import { Controller, Get, Inject, Res } from '@nestjs/common';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { Stripe } from 'stripe';
import { Response } from 'express'

const YOUR_DOMAIN = 'http://localhost:3000'

@Controller('customers')
export class CustomersController {

    constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}
    @Get('/')
    listCustomers() {
        return this.stripe.customers.list();
    }

    @Get('/pay')
    async pay(@Res() res: Response) {
        const session = await this.stripe.checkout.sessions.create({
            line_items: [{
              price_data: {
                currency: 'usd',
                unit_amount: 2000,
                product_data: {
                  name: 'T-shirt',
                  description: 'Comfortable cotton t-shirt',
                  images: ['https://example.com/t-shirt.png'],
                },
              },
              quantity: 1,
            }],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/customers/success`,
            cancel_url: `${YOUR_DOMAIN}/customers/cancel`,
          });
          return res.redirect(session.url);
    }

    @Get('/success')
    success() {
        return 'successful payment'
    }

    @Get('/cancel')
    cancel() {
        return 'cancel payment'
    }
}
