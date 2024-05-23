import {addOrderToDB, getOrdersFromDB} from '../db/db.js'

const addOrder = async(req, res) => {
    try {
        const {userId, stock, exchange, quantity} = req.body;
        await addOrderToDB(userId, stock, exchange, quantity);
        return res.status(200).json({message: 'Order added'});
    } catch (error) {
        console.log('Error adding order: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const getOrders = async(req, res) => {
    try {
        const userId = req.query.userId;
        const orders = await getOrdersFromDB(userId);
        return res.status(200).json({orders: orders});
    } catch (error) {
        console.log('Error gettings orders: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default addOrder;