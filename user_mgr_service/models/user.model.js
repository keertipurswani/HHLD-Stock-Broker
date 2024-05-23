import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    watchlists: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "watchlist"
        }
    ]
})

const users = mongoose.model('users', usersSchema);
export default users;