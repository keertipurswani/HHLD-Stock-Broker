export const mockStockPrices = {
    AAPL: { symbol: 'AAPL', price: 145.12, timestamp: '2024-05-12T10:00:00Z' },
    MSFT: { symbol: 'MSFT', price: 250.55, timestamp: '2024-05-12T10:00:00Z' },
  };
  
export const mockHistoricalData = {
    TCS: [
      { date: '2022-01-01', open: 1000.0, high: 1020.0, low: 990.0, close: 1015.0, volume: 10000 },
      { date: '2022-01-02', open: 1020.0, high: 1035.0, low: 1005.0, close: 1025.0, volume: 12000 },
      // Add more historical data entries as needed
    ],
    INFY: [
      { date: '2022-01-01', open: 1500.0, high: 1520.0, low: 1485.0, close: 1505.0, volume: 8000 },
      { date: '2022-01-02', open: 1520.0, high: 1540.0, low: 1510.0, close: 1530.0, volume: 9000 },
      // Add more historical data entries as needed
    ],
  };
  
export const mockCompanyInfo = {
    INFY: { name: 'Infosys Limited', sector: 'Information Technology', CEO: 'Salil Parekh', headquarters: 'Bangalore, India', description: 'Infosys Limited is an Indian multinational corporation that provides business consulting, information technology and outsourcing services.' },
    TCS: { name: 'Tata Consultancy Services Limited', sector: 'Information Technology', CEO: 'Rajesh Gopinathan', headquarters: 'Mumbai, India', description: 'Tata Consultancy Services Limited (TCS) is an Indian multinational information technology services and consulting company.' },
  };
  
export const mockUserPortfolios = {
    '123': {
      holdings: [
        { symbol: 'AAPL', quantity: 10, averagePrice: 140.0 },
        { symbol: 'TCS', quantity: 20, averagePrice: 1000.0 },
      ],
      cashBalance: 5000.0,
      totalValue: (10 * 145.12) + (20 * 1015.0) + 5000.0, // Total value including stocks and cash
    },
    '456': {
      holdings: [
        { symbol: 'MSFT', quantity: 15, averagePrice: 255.0 },
        { symbol: 'INFY', quantity: 25, averagePrice: 1525.0 },
      ],
      cashBalance: 7000.0,
      totalValue: (15 * 250.55) + (25 * 1530.0) + 7000.0, // Total value including stocks and cash
    },
  };
  