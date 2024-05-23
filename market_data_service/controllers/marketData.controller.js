import getMarketDataFeed from "../marketDataAPI/getMarketData.js";

const loadMarketData = async (req, res) => {
    try {
        getMarketDataFeed();
        return res.status(200).json({ message: 'Data received' });
    } catch (error) {
        console.log('Error in loading market data : ', error.message());
        return res.status(500).json({ message: 'Server error' });
    }
}

export default loadMarketData;