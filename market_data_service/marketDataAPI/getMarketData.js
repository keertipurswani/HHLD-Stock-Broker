import UpstoxClient from "upstox-js-sdk";
import { WebSocket } from "ws";
import protobuf from "protobufjs";
import path from 'path';

const __dirname = path.resolve(path.dirname(''));
console.log(__dirname);

let protobufRoot = null;
let defaultClient = UpstoxClient.ApiClient.instance;
let apiVersion = "2.0";
let OAUTH2 = defaultClient.authentications["OAUTH2"];
OAUTH2.accessToken = process.env.ACCESS_TOKEN;

// Function to authorize the market data feed
const getMarketFeedUrl = async () => {

  console.log('GETTING WS URL--------------------');
  return new Promise((resolve, reject) => {
    let apiInstance = new UpstoxClient.WebsocketApi(); // Create new Websocket API instance

    apiInstance.getMarketDataFeedAuthorize(
      apiVersion,
      (error, data, response) => {
        if (error) reject(error);
        else resolve(data.data.authorizedRedirectUri);
      }
    );
  });
};

// Function to establish WebSocket connection
const connectWebSocket = async (wsUrl, instrumentKeys, callback) => {

  console.log('INITIALISING WS CONNECTION WITH UPSTOX--------------------');
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: {
        "Api-Version": apiVersion,
        Authorization: "Bearer " + OAUTH2.accessToken,
      },
      followRedirects: true,
    });

    // WebSocket event handlers
    ws.on("open", () => {
      console.log("connected");
      resolve(ws); // Resolve the promise once connected

      // Set a timeout to send a subscription message after 1 second
      setTimeout(() => {
        const data = {
          guid: "someguid",
          method: "sub",
          data: {
            mode: "full",
            instrumentKeys: instrumentKeys,
          },
        };
        ws.send(Buffer.from(JSON.stringify(data)));
      }, 1000);
    });

    ws.on("close", () => {
      console.log("disconnected");
    });

    ws.on("message", (data) => {
      const decodedData = decodeProfobuf(data);
      const instrumentKeysAndLTP = Object.keys(decodedData.feeds).map(key => ({
        instrumentKey: key,
        ltp: decodedData.feeds[key]?.ff?.marketFF?.ltpc?.ltp
      }));
      console.log(instrumentKeysAndLTP);


      console.log('CALLBACK TO FE--------------------');
      callback(instrumentKeysAndLTP);
    });

    ws.on("error", (error) => {
      console.log("error:", error);
      reject(error); // Reject the promise on error
    });
  });
};

// Function to initialize the protobuf part
const initProtobuf = async () => {
  console.log('INITIALISING PROTOBUF--------------------');
  console.log(__dirname)
  protobufRoot = await protobuf.load(__dirname + "/marketDataAPI/marketDataFeed.proto");
  console.log("Protobuf part initialization complete");
};

// Function to decode protobuf message
const decodeProfobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }

  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

const getMarketDataFeed = async (instrumentKeys, callback) => {
  try {
    await initProtobuf(); // Initialize protobuf
    const wsUrl = await getMarketFeedUrl(); // Get the market feed URL
    const ws = await connectWebSocket(wsUrl, instrumentKeys, callback); // Connect to the WebSocket
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export default getMarketDataFeed