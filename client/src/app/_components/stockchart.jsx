"use client"
import 'chartjs-adapter-moment';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useCurrentStockDataStore } from '../zustand/useCurrentStockDataStore';

const StockChart = () => {
  const { currentStock } = useCurrentStockDataStore();
  const [marketData, setMarketData] = useState([]);

  const getMarketData = async () => {
    try {
      if (!currentStock) return;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_MD_BE_URI}/getDataMonthlyInterval`, { params: { instrumentKey: currentStock.instrumentKey } });
      console.log('Data received : ', res);
      console.log(res.data.candles);
      setMarketData(res.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  }

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    getMarketData();
  }, [currentStock])

  useEffect(() => {
    console.log('market data ', marketData);
    if (marketData && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      // Destroy previous chart instance if it exists
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      const dates = marketData.data?.candles.map(item => item[0]);
      const prices = marketData.data?.candles.map(item => item[4]);

      console.log('Dates:', dates);
      console.log('Prices:', prices);

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Stock Prices',
            data: prices,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price'
              }
            }
          }
        }
      });
    }

    // Clean up function
    return () => {
      // Ensure chart instance is destroyed when component unmounts

      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [marketData]);

  return (
    <div>
      <div className='font-semibold m-3 flex justify-center text-2xl'>
        {currentStock.name}
      </div>
      <div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default StockChart;
