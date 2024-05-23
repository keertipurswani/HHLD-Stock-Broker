import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const client = new grpc.Client();
const errorCounter = new Counter('errors');

export let options = {
  vus: 100, // number of virtual users
  duration: '1m', // duration of the test
  thresholds: {
    errors: ['count<1'], // Set thresholds to stop the test on errors
  },
};

client.load([], 'risk_management.proto'); // Load your .proto file

export default function () {
  client.connect('0.0.0.0:50051', {
    plaintext: true,
  });

  const data = {
    "user_id": "user1",
    "order_id": "order123",
    "order_amount": 1500.00,
    "items": [
      {
        "stock_symbol": "AAPL",
        "order_type": "buy",
        "quantity": 10,
        "price": 150.00
      },
      {
        "stock_symbol": "GOOGL",
        "order_type": "buy",
        "quantity": 5,
        "price": 200.00
      }
    ],
    "customer_details": {
      "customer_name": "John Doe",
      "email": "johndoe@example.com",
      "phone_number": "123-456-7890",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "Anystate",
        "country": "USA",
        "postal_code": "12345"
      }
    },
    "payment_details": {
      "payment_method": "Credit Card",
      "transaction_id": "txn123456",
      "payment_timestamp": "2023-01-01T12:00:00Z",
      "payment_amount": 1500.00
    },
    "order_timestamp": "2023-01-01T12:00:00Z"
  };

  const response = client.invoke('stockbroker.StockBroker/PlaceOrder', data);
  
  check(response, {
    'status is OK': (r) => r,
  }) || errorCounter.add(1);

  client.close();
  sleep(1); // Simulate think time between requests
}
