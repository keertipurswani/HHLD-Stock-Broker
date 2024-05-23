"use client"
import { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache()
});

// Define GraphQL queries
const STOCK_PRICE_QUERY = gql`
  query {
    stockPrice(symbol: "AAPL") {
      symbol
      price
      timestamp
    }
  }
`;

const HISTORICAL_DATA_QUERY = gql`
  query {
    historicalData(symbol: "TCS", startDate: "2022-01-01", endDate: "2022-01-02") {
      date
      open
      high
      low
      close
      volume
    }
  }
`;

const COMPANY_INFO_QUERY = gql`
  query {
    companyInfo(symbol: "INFY") {
      name
      sector
      CEO
      headquarters
      description
    }
  }
`;

const USER_PORTFOLIO_QUERY = gql`
  query {
    userPortfolio(userId: "123") {
      holdings {
        symbol
        quantity
        averagePrice
      }
      cashBalance
      totalValue
    }
  }
`;

const AnalyticsReport = () => {

    const [stockPrice, setStockPrice] = useState({});
    const [historialData, sethistorialData] = useState({});
    const [companyInfo, setcompanyInfo] = useState({});
    const [userPortfolio, setuserPortfolio] = useState({});

  const fetchData = async () => {
    try {
      // Execute GraphQL queries using client.query
      const stockPriceResult = await client.query({ query: STOCK_PRICE_QUERY });
      const historicalDataResult = await client.query({ query: HISTORICAL_DATA_QUERY });
      const companyInfoResult = await client.query({ query: COMPANY_INFO_QUERY });
      const userPortfolioResult = await client.query({ query: USER_PORTFOLIO_QUERY });

      console.log('Stock Price:', stockPriceResult.data.stockPrice);
      setStockPrice(stockPriceResult.data.stockPrice);
      console.log('Historical Data:', historicalDataResult.data.historicalData);
      sethistorialData(historicalDataResult.data.historicalData);
      console.log('Company Info:', companyInfoResult.data.companyInfo);
      setcompanyInfo(companyInfoResult.data.companyInfo);
      console.log('User Portfolio:', userPortfolioResult.data.userPortfolio);
      setuserPortfolio(userPortfolioResult.data.userPortfolio);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();

  return (
    <div>
      <h1>Stock Data</h1>
      <h2>Stock Price (AAPL)</h2>
      <pre>{JSON.stringify(stockPrice)}</pre>
      <h2>Historical Data (TCS)</h2>
      <pre>{JSON.stringify(historialData)}</pre>
      <h2>Company Info (INFY)</h2>
      <pre>{JSON.stringify(companyInfo)}</pre>
      <h2>User Portfolio (ID: 123)</h2>
      <pre>{JSON.stringify(userPortfolio)}</pre>
    </div>
  );
  
};

export default AnalyticsReport;
