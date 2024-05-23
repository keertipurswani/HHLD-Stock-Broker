import UpstoxClient from 'upstox-js-sdk';

export const placeOrderToUpstox = async (req, res) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    var OAUTH2 = defaultClient.authentications['OAUTH2'];
    OAUTH2.accessToken = process.env.ACCESS_TOKEN;

    let apiInstance = new UpstoxClient.OrderApi();
    let body = new UpstoxClient.PlaceOrderRequest(1, UpstoxClient.PlaceOrderRequest.ProductEnum.D, UpstoxClient.PlaceOrderRequest.ValidityEnum.DAY, 0.0, "NSE_EQ|INE528G01035", UpstoxClient.PlaceOrderRequest.OrderTypeEnum.MARKET, UpstoxClient.PlaceOrderRequest.TransactionTypeEnum.BUY, 0, 0.0, true);
    let apiVersion = "2.0";

    apiInstance.placeOrder(body, apiVersion, (error, data, response) => {
        if (error) {
            console.error(error.response.text);
            return res.status(500).json({ error: error });
        } else {
            console.log('API called successfully. Returned data: ' + data);
            return res.status(200).json({ message: data });
        }
    });
}

export const getOrdersFromUpstox = async (req, res) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    var OAUTH2 = defaultClient.authentications['OAUTH2'];
    OAUTH2.accessToken = process.env.ACCESS_TOKEN;
    let apiInstance = new UpstoxClient.OrderApi();

    let apiVersion = "2.0";

    apiInstance.getOrderBook(apiVersion, (error, data, response) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        } else {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            return res.status(200).json({ message: data });
        }
    });
}

export const cancelOrderToUpstox = async (req, res) => {
    let defaultClient = UpstoxClient.ApiClient.instance;
    var OAUTH2 = defaultClient.authentications['OAUTH2'];
    OAUTH2.accessToken = process.env.ACCESS_TOKEN;
    let apiInstance = new UpstoxClient.OrderApi();

    let orderId = "240518025174819";
    let apiVersion = "2.0";

    apiInstance.cancelOrder(orderId, apiVersion, (error, data, response) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        } else {
            console.log('API called successfully. Returned data: ' + data);
            return res.status(200).json({ message: data });
        }
    });
}