---
title: Rest API & WebSocket Architecture
layout: coding-misty-i.hbs
columns: three
order: 3
---

# {{title}}

In addition to her on-robot JavaScript API, you can also write skills for Misty using her powerful REST API.

Writing a skill this way typically involves two things: getting data from Misty via WebSocket connections and sending commands to Misty using her REST API. This topic walks you through both sides of this process.

The examples in this topic are written in JavaScript and use helper libraries to simplify making requests and subscribing to Misty’s WebSocket connections. You can also use the community owned [Python wrapper](https://github.com/MistyCommunity/Wrapper-Python) or a REST client such as Postman to send Misty commands.

## Sending Commands to Misty

Misty's API includes commands for:

* Display and light control
* Audio control
* Face detection, training, and recognition
* Locomotion
* Mapping
* Head movement
* Configuration and information

The [Misty Community REST-API repository on GitHub](https://github.com/MistyCommunity/REST-API) contains a variety of sample robot applications that you can use to test and adapt into your own custom uses.

We supply two helper tools that make it easy to develop JavaScript skills for Misty:
* `lightClient.js` - The LightClient tool simplifies JavaScript access to the REST endpoints for sending commands to the robot
* `lightSocket.js` - The LightSocket tool streamlines opening, connecting, and subscribing to a WebSocket to receive data back from the robot 

Get both tools [here](https://github.com/MistyCommunity/REST-API/tree/master/Tools/javascript).

### Using the LightClient JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src="tools/lightClient.js"></script>
<script src="tools/lightSocket.js"></script>
<script src="app.js"></script>
```

The first step to creating an external skill is to create an instance of the LightClient class, passing in your robot's IP address and the amount of time in ms you want your program to wait before timing out if no response is detected (the default is 30 seconds). 

```javascript
let client = new LightClient("[robot IP address]", 10000);
```

Once you create an instance of LightClient, it's simple to send requests to Misty’s REST endpoints. Most of the URL for Misty’s REST commands are built into LightClient: 

```javascript
http://<ipAddress>/api/
```

In order to use a specific endpoint, just pass in the rest of the URL. For example, you can do the following to send a GET request to the `GetDeviceInformation()` command:

```javascript
client.GetCommand("device", function(data) {
    console.log(data);
});
```

Here’s another example of using LightClient to send a GET request to Misty, this time to obtain a list of the images currently stored on the robot:

```javascript
client.GetCommand("images", function(data) {
    console.log(data);
});
```

You will also want to send POST requests to the robot. For a POST command, in order to send data along with the request, just pass it to `lightClient.PostCommand` as the second argument. Be sure to use the `JSON.stringify()` method first, in order to convert the JavaScript value(s) to a JSON string.

For example, we can send a POST request to the `ChangeLED()` endpoint to change the color of Misty's chest logo LED to blue. If there are no errors, the callback returns true, and we log a success message.

Specify the RGB values and convert the data to a JSON string:

```javascript
let data = {
    "red": 0,
    "green": 0,
    "blue": 255
};
payload = JSON.stringify(data);
```

Send the request, including the data:

```javascript
client.PostCommand("led", payload, function(result) {
    if(result) {
        console.log("Request Successful")
    }
});
```

### Using the LightSocket JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src="tools/lightClient.js"></script>
<script src="tools/lightSocket.js"></script>
<script src="app.js"></script>
```

As we did for LightClient, the first step in using `lightSocket.js` is to create an instance of the LightSocket class, passing in your robot's IP address. Then, you call the `Connect()` method to open a WebSocket connection.

```javascript
let socket = new LightSocket(ip);
socket.Connect();
```

In order to subscribe to a WebSocket using LightSocket, simply call the `Subscribe()` method. The arguments passed to the function correspond to the properties of `subscribeMsg` described in "Getting Data from Misty." See the function below for reference: 

```javascript
socket.Subscribe = function (eventName, msgType, debounceMs, property, inequality, value, returnProperty, eventCallback)
```

Here we create a `TimeOfFlight` WebSocket subscription for the center time-of-flight sensor, and log the data as we receive it:

```javascript
socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "=", "Center", null, function(data) {
    console.log(data);
});
```

It's always best practice to unsubscribe to the WebSocket connection after use, so at the end of your script, be sure to call the `Unsubscribe()` method:

```javascript
socket.Unsubscribe("CenterTimeOfFlight");
```

## Getting Data from Misty

A WebSocket connection provides a live, continuously updating stream of data from Misty. When you subscribe to a WebSocket, you can get data for your robot ranging from distance information to face detection events to movement and more.

You can directly observe WebSocket data in your browser's JavaScript console, by connecting your robot to the [Command Center](../../../tools-&-apps/web-based-tools/command-center), but to use WebSocket data in a skill, you'll need to subscribe to it programmatically, in your code. We'll walk through this process, using the `tofApp.js` sample. You can download this JavaScript sample [here](https://github.com/MistyCommunity/REST-API/tree/master/Sample%20Code/Time%20of%20Flight).

To subscribe to a WebSocket data stream, you must first open the WebSocket, then send a message to specify the exact data you want to receive. For some WebSocket data, you must also send a REST command to the robot so it starts generating the data. For the time-of-flight sensor data that the `tofApp.js` [sample](https://github.com/MistyCommunity/REST-API/tree/master/Sample%20Code/Time%20of%20Flight) uses, sending a REST command is not required, because Misty's time-of-flight sensors are always on.

**IMPORTANT!** For the most current version of the `tofApp.js` sample code, always check our [GitHub repo](https://github.com/MistyCommunity/REST-API/tree/master/Sample%20Code/Time%20of%20Flight/tofApp.js).


### Subscribing & Unsubscribing to a WebSocket

The first thing the `tofApp.js` sample does is to construct the message that subscribes to the exact WebSocket data we want.

The `Type` property is the name of the desired data stream. Misty's available WebSocket data stream types are described below. Currently, they include:
* ```TimeOfFlight```
* ```FaceRecognition```
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
  "EventConditions": [
    {
      "Property": "SensorPosition",
      "Inequality": "=",
      "Value": "Center"
    }
  ]
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

Having constucted the `subscribe` and `unsubscribe` messages, the `tofApp.js` sample next attempts to open a WebSocket connection. Once the WebSocket is open, it sends the JSON-formatted "subscribe" message.

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
