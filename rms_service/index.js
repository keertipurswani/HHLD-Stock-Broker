const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './protos/risk_management.proto';
const express = require('express');

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const riskmanagement = grpc.loadPackageDefinition(packageDefinition).stockbroker;

// Mock user data (In a real application, you would query a database)
const users = {
    'user1': { funds: 1000 },
    'user2': { funds: 500 }
};

// Implement the PlaceOrder function
function placeOrder(call, callback) {
    const { user_id, order_amount, items, customer_details, payment_details, order_timestamp } = call.request;
    const user = users[user_id];

    let errors = [];

    if (!user) {
        errors.push({ field: 'user_id', error_message: 'User not found' });
    } else if (user.funds < order_amount) {
        errors.push({ field: 'order_amount', error_message: 'Insufficient funds' });
    }

    // Additional validation logic can be added here, e.g., validate items, customer details, and payment details

    const is_valid = errors.length === 0;
    const message = is_valid ? 'Order is valid' : 'Order is invalid';

    const response = {
        is_valid,
        message,
        errors,
        processing_time_ms: Math.random() * 100 // Mock processing time
    };

    callback(null, response);
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(riskmanagement.StockBroker.service, { placeOrder: placeOrder });
    const port = '0.0.0.0:50051';
    server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`gRPC Server running at ${port}`);
        server.start();
    });
}

main();

const app = express();
const expressPort = 8085;
app.use(express.json());

app.post('/placeOrder', (req, res) => {
    const { user_id, order_id, order_amount, items, customer_details, payment_details, order_timestamp } = req.body;
    const user = users[user_id];

    let errors = [];

    if (!user) {
        errors.push({ field: 'user_id', error_message: 'User not found' });
    } else if (user.funds < order_amount) {
        errors.push({ field: 'order_amount', error_message: 'Insufficient funds' });
    }

    // Additional validation logic can be added here, e.g., validate items, customer details, and payment details

    const is_valid = errors.length === 0;
    const message = is_valid ? 'Order is valid' : 'Order is invalid';

    const response = {
        is_valid,
        message,
        errors,
        processing_time_ms: Math.random() * 100 // Mock processing time
    };

    res.status(is_valid ? 200 : 400).json(response);
});

app.listen(expressPort, () => {
    console.log(`HTTP Server is listening at port ${expressPort}`);
});
