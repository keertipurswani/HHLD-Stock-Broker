import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import watchListRouter from "./routes/watchlists.route.js"
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8085;
app.use(cors());

app.use('/watchlists', watchListRouter);

app.get('/', async (req, res) => {
    res.json({ message: 'HHLD Stock Broker Watchlist Manager Service' });
});

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is listening at http://localhost:${port}`);
})





