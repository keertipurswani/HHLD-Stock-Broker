import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100, // number of virtual users
    duration: '1m', // duration of the test
};
  

export default function () {
    const url = 'http://localhost:8085/placeOrder';
    const payload = JSON.stringify({
        "order_id": "order123",
        "user_id": "user1",
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
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'is status 200': (r) => r.status === 200,
        'is order valid': (r) => r.status === 200 && JSON.parse(r.body).is_valid === true, // Updated validation logic
    });

    sleep(1); // Sleep for 1 second between iterations
}
