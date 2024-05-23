import watchlistModel from "../models/watchlist.model.js";

export const getWatchLists = async (req, res) => {
    try {
        console.log('Getting watchlists');
        const allWatchlists = await watchlistModel.find();
        return res.status(200).json(allWatchlists);
    } catch (error) {
        console.log('Error gettings watchlists: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const addStockToWatchList = async (req, res) => {
    try {
        console.log('Adding stock to watchlist');
        const { watchlist, stock } = req.body;
        if (!watchlist) {
            return res.status(400).json({ error: 'Watchlist name is required' });
        } else if (!stock) {
            return res.status(400).json({ error: 'Stock is required' });
        } else {
            const existingWatchlist = await watchlistModel.findOne({ 'title': watchlist });
            if (!existingWatchlist) {
                return res.status(404).json({ error: 'Watchlist not found' });
            } else {
                existingWatchlist.stocks.push(stock);
                const updatedWatchlist = await existingWatchlist.save();
                res.status(200).json(updatedWatchlist);
            }
        }
    } catch (error) {
        console.log('Error adding stock to watchlist: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

const addWatchList = async (req, res) => {
    try {
        console.log('Adding watchlist');
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required for the watchlist' });
        } else {
            const newWatchlist = {
                title: title,
                stocks: []
            };
            const updatedWatchlist = await watchlistModel.findOneAndUpdate({title}, { $push: { watchlist: newWatchlist } }, { new: true, upsert: true, setDefaultsOnInsert: true });
            return res.status(200).json(updatedWatchlist);
        }
    } catch (error) {
        console.log('Error adding watchlist: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default addWatchList;