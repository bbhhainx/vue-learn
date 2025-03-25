export const api_host: { [index: string]: { [index: string]: string } } = {
  development: {
    contact: 'http://localhost:3005',
    product: 'http://localhost:3006',
    merchant: 'http://localhost:7200/v1',
    finance: 'https://api-finance.merchant.vn',
    payment: 'https://api-payment.merchant.vn',
    order: 'http://localhost:3007'
  },
  staging: {
    contact: 'https://api-sandbox-contact.merchant.vn',
    product: 'https://api-sandbox-product.merchant.vn',
    merchant: 'https://api-sandbox.merchant.vn/v1',
    finance: 'https://api-finance.merchant.vn',
    payment: 'https://api-payment.merchant.vn',
    order: 'https://api-sandbox-order.merchant.vn'
  },
  production: {
    contact: 'https://api-contact.merchant.vn',
    product: 'https://api-product.merchant.vn',
    merchant: 'https://api.merchant.vn/v1',
    finance: 'https://api-finance.merchant.vn',
    payment: 'https://api-payment.merchant.vn',
    order: 'https://api-order.merchant.vn'
  },
};