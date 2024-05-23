import usersModel from "../models/user.model.js"
import UpstoxClient from 'upstox-js-sdk';

const addUser = async (req, res) => {
    try {
        console.log('Adding user');
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        } else {
            const newUser = {
                name: name,
                watchlists: []
            };
            const updatedUsers = await usersModel.findOneAndUpdate({ name }, { $push: { users: newUser } }, { new: true, upsert: true, setDefaultsOnInsert: true });
            return res.status(200).json(updatedUsers);
        }
    } catch (error) {
        console.log('Error adding user: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const getUsers = async (req, res) => {
    try {
        console.log('Getting users');
        const allUsers = await usersModel.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log('Error getting users: ', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const getFunds = async (req, res) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    var OAUTH2 = defaultClient.authentications['OAUTH2'];
    OAUTH2.accessToken = process.env.ACCESS_TOKEN;
    let apiInstance = new UpstoxClient.UserApi();
    let apiVersion = "2.0";
    apiInstance.getUserFundMargin(apiVersion, null, (error, data, response) => {
        if (error) {
            console.error(error);
            return res.status(500).json({error: error});
        } else {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            return res.status(200).json({message: data});
        }
    });
}

export default addUser;