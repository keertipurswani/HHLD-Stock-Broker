import express from 'express';
import cors from "cors"
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import {mockStockPrices, mockHistoricalData, mockCompanyInfo, mockUserPortfolios} from "./mockData.js";

// Define schema using GraphQL SDL
const schema = buildSchema(`
  type StockPrice {
    symbol: String!
    price: Float!
    timestamp: String!
  }

  type HistoricalData {
    date: String!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Int!
  }

  type CompanyInfo {
    name: String!
    sector: String!
    CEO: String!
    headquarters: String!
    description: String!
  }

  type Holding {
    symbol: String!
    quantity: Int!
    averagePrice: Float!
  }

  type UserPortfolio {
    holdings: [Holding!]!
    cashBalance: Float!
    totalValue: Float!
  }

  type Query {
    stockPrice(symbol: String!): StockPrice
    historicalData(symbol: String!, startDate: String!, endDate: String!): [HistoricalData!]!
    companyInfo(symbol: String!): CompanyInfo
    userPortfolio(userId: String!): UserPortfolio
  }
`);
  

// Resolver functions
const root = {
  stockPrice: ({ symbol }) => mockStockPrices[symbol],
  historicalData: ({ symbol, startDate, endDate }) => mockHistoricalData[symbol].filter(entry => entry.date >= startDate && entry.date <= endDate),
  companyInfo: ({ symbol }) => mockCompanyInfo[symbol],
  userPortfolio: ({ userId }) => mockUserPortfolios[userId],
};

// Create an express server
const app = express();
app.use(cors());

// Define the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for easy testing
}));

// Start the server
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/graphql`);
});
