const express = require('express');
const webserver = express().listen(3000, () => console.log(`Listening on ${3000}`));
process.setMaxListeners(0);

const { Server } = require('ws');
const sockserver = new Server({ port: 443 });

const WebSocket = require('ws');
const socket = new WebSocket('wss://stream.aisstream.io/v0/stream');
const MMSI = '219230000';

socket.onopen = function (_) {
  let subscriptionMessage = {
      Apikey: "25a6027dcb1f0a5501dc6a7ff053d4bed95b307e",
      BoundingBoxes: [[[-90, -180], [90, 180]]],
      FiltersShipMMSI: [MMSI],
      FilterMessageTypes: ["PositionReport"]
  }
  socket.send(JSON.stringify(subscriptionMessage));
};

socket.addEventListener("error", (event) => {
  console.log(event);
});

sockserver.on('connection', ws => {
 console.log('New client connected!');

 ws.on('message', data => {
  socket.addEventListener("message", (event) => {
    let aisMessage = JSON.parse(event.data);
    const metaData = aisMessage["MetaData"];

    if (aisMessage["MessageType"] === "PositionReport") {
      const positionReport = aisMessage["Message"]["PositionReport"];

      const data = {
        shipId: positionReport["UserID"],
        shipName: metaData["ShipName"],
        MMSI: metaData["MMSI"],
        latitude: positionReport["Latitude"],
        longitude: positionReport["Longitude"]
      };
      
      ws.send(JSON.stringify(data));
    }
  });
});

 ws.on('close', () => console.log('Client has disconnected!'))

 ws.onerror = function () {
   console.log('websocket error')
 }
});
