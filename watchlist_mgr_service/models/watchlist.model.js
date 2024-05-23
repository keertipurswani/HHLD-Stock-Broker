import mongoose from "mongoose";

const watchlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stocks: [
        {
            name: {
                type: String,
                required: true
            },
            instrumentKey: {
                type: String,
                required: true
            }
        }
    ]
})

const watchlist = mongoose.model('watchlist', watchlistSchema);
export default watchlist;