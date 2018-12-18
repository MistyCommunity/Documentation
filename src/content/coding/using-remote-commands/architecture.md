---
title: Architecture
layout: onboarding.hbs
columns: one
order: 1
---

# {{title}}

including concepts about websockets, how you send commands to and get data from misty

Misty's a pretty capable robot on her own, but the exciting part of working with Misty is seeing her run the skills you create for her. Check out the Misty Community [GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills) for example skills (including a fun [Python-based skill](https://github.com/MistyCommunity/MistyI/tree/master/API_Wrappers/Python/samples/mistyvoice) that gives Misty a voice using the Google Text-to-Speech API).

Creating your own skill for Misty typically involves two things: getting data from Misty via WebSocket connections and sending commands to Misty using her API. This topic walks you through both sides of this process.

## Sending Commands to Misty

To send API commands to Misty in a skill, you can use the [JavaScript API](/apis/api-reference/all-functions) or this [Python wrapper](https://github.com/MistyCommunity/mistyPy). To experiment with the API, you can also use a REST client such as Postman and send [GET and POST](/apis/api-reference/rest) commands to Misty directly.

Misty's API includes commands for:
* Display and light control
* Audio control
* Face detection, training, and recognition
* Locomotion
* Mapping
* Head movement
* Configuration and information

The [Misty I GitHub repo](https://github.com/MistyCommunity/MistyI) contains a variety of sample skills that you can use to test and adapt into your own custom uses.

## Getting Data from Misty

A WebSocket connection provides a live, continuously updating stream of data from Misty. When you subscribe to a WebSocket, you can get data for your robot ranging from distance information to face detection events to movement and more.

You can directly observe WebSocket data in your browser's JavaScript console, by connecting your robot to the [API Explorer](../../3-ways-to-interact-with-misty/api-explorer/#opening-a-websocket), but to use WebSocket data in a skill, you'll need to subscribe to it programmatically, in your code. We'll walk through this process, using the `tofApp.js` sample. You can download this JavaScript sample [here](https://github.com/MistyCommunity/MistyI/tree/master/Sample%20Code/Time%20of%20Flight).

To subscribe to a WebSocket data stream, you must first open the WebSocket, then send a message to specify the exact data you want to receive. For some WebSocket data, you must also send a REST command to the robot so it starts generating the data. For the time-of-flight sensor data that the `tofApp.js` [sample](https://github.com/MistyCommunity/MistyI/tree/master/Sample%20Code/Time%20of%20Flight) uses, sending a REST command is not required, because Misty's time-of-flight sensors are always on.

**IMPORTANT!** For the most current version of the `tofApp.js` sample code, always check our [GitHub repo](https://github.com/MistyCommunity/MistyI/blob/master/Sample%20Code/Time%20of%20Flight/tofApp.js).


### Subscribing & Unsubscribing to a WebSocket

The first thing the `tofApp.js` sample does is to construct the message that subscribes to the exact WebSocket data we want.

The `Type` property is the name of the desired data stream. Misty's available WebSocket data stream types are described below. Currently, they include:
* ```TimeOfFlight```
* ```ComputerVision```
* ```FaceDetection``` (deprecated)
* ```FaceRecognition``` (deprecated)
* ```LocomotionCommand```
* ```HaltCommand```
* ```SelfState```
* ```WorldState```

The optional `DebounceMs` value specifies how frequently the data is sent. If you don't specify a value, by default the data is sent every 250ms. In this case, we've set it to be sent every 100ms.

The `EventName` property is a name you specify for how your code will refer to this particular WebSocket instance. `Message` and `ReturnProperty` are also optional values. 

For time-of-flight subscriptions, you must also include `EventConditions`. These specify the location of the time of flight sensor being accessed by changing `Value` to `Right`, `Center`, `Left`, or `Back`. This sample code subscribes to the center time-of-flight sensor only.

After creating the `subscribe` message, the sample also creates an `unsubscribe` message. When it's no longer needed, unsubscribing from a WebSocket data stream is a good practice to avoid creating performance issues. The `unsubscribe` message will be sent when the skill is done using the data.

```javascript
//Use this variable to hold the IP address for the robot.
var ip = "00.0.0.000";

//Create a message to subscribe to the desired WebSocket data.
var subscribeMsg = {
  "Operation": "subscribe",
  "Type": "TimeOfFlight",
  "DebounceMs": 100,
  "EventName": "CenterTimeOfFlight",
  "Message": "",
  "ReturnProperty": null,
  "EventConditions":
  {
    "Property": "SensorPosition",
    "Inequality": "=",
    "Value": "Center"
  }
};

//Create a message to unsubscribe to the data when done.
var unsubscribeMsg = {
  "Operation": "unsubscribe",
  "EventName": "CenterTimeOfFlight",
  "Message": ""
};

//Format the messages as JSON objects.
var subMsg = JSON.stringify(subscribeMsg);
var unsubMsg = JSON.stringify(unsubscribeMsg);
```

After constructing the messages, they are formatted as JSON objects, so they are ready to send once the WebSocket is open.

### Opening & Closing a WebSocket

Having constucted the `subscribe` and `unsubscribe` messages, the `tofApp.js` sample next attempts to open a WebSocket connection. Once the WebSocket is open, it sends the JSON-formatted “subscribe” message.

Once you've successfully subscribed to a data stream, you can use the `socket.onmessage()` function to handle the data received back from the robot. In this example, we simply log the received data to the console. For a real skill, you could instead parse the event data and write a conditional function based on a particular property value to do something when a condition is met.

In the sample, after a specified number of messages are received, we unsubscribe to the data stream and close the WebSocket connection. Alternately, because a given WebSocket could be used for multiple data subscriptions, you could keep the WebSocket open after unsubscribing and only close it when you are done entirely.

```javascript
//Set the initial WebSocket message count to 0, as we're
//only keeping this WebSocket open for 10 messages total.
var messageCount = 0;

var socket;

function startTimeOfFlight() {
    //Create a new WebSocket connection to the robot.
    socket = new WebSocket("ws://" + ip + "/pubsub");

    //When the WebSocket's open, send the subscribe message.
    socket.onopen = function(event) {
      console.log("WebSocket opened.");
      socket.send(subMsg);
    };

    //Handle the WebSocket data from the server.
    //Send the unsubscribe message when we're done,
    //then close the socket.
    socket.onmessage = function(event) {
      var message = JSON.parse(event.data).message;
      messageCount += 1;
      console.log(message);
      if (messageCount == 10) {
     	socket.send(unsubMsg);
        socket.close();
      }
    };

    //Handle any errors that occur.
    socket.onerror = function(error) {
      console.log("WebSocket Error: " + error);
    };

    //Do something when the WebSocket is closed.
    socket.onclose = function(event) {
      console.log("WebSocket closed.");
    };
};

```
