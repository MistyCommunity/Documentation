---
title: Overview
layout: coding.hbs
columns: three
order: 1
---

# {{title}}

In addition to the on-robot JavaScript SDK, you can also write skills for Misty using her powerful REST API. Writing a skill this way typically involves two things: getting data from Misty via WebSocket connections and sending commands to Misty using her REST API. This topic walks you through both sides of this process.

The examples in this topic are written in JavaScript. Example requests use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and example WebSocket connections use the `lightSocket.js` helper library to simplify subscribing to Misty’s WebSocket connections. You can also use the community owned [Python wrapper](https://github.com/MistyCommunity/Wrapper-Python) or a REST client such as Postman to send Misty commands.


## Sending Commands to Misty

Misty's API includes commands for:

* Display, LED, and flashlight control
* Audio control
* Face detection, training, and recognition
* Locomotion
* Simultaneous localization and mapping (SLAM)
* Head and arm movement
* System configuration and information

The [Misty Community Sample Code GitHub repo](https://github.com/MistyCommunity/SampleCode) contains a variety of sample skills that you can use to test and adapt into your own custom uses.

Additionally, we supply a helper tool called `lightSocket.js` that streamlines opening, connecting, and subscribing to Misty's WebSocket server to receive event messages from the robot. [Download `lightSocket.js` from GitHub](https://github.com/MistyCommunity/SampleCode/tree/master/Tools/javascript).

### Using the Fetch API

Most modern web browsers provide native support for the Fetch API. When you use the Fetch API, you can code a remote-running robot application by embedding a few lines of JavaScript in an `HTML` file and loading that file in your web browser.

To send a request using the Fetch API, we call the `fetch()` method inside `<script>` tags in an `HTML` file. The `fetch()` method takes two arguments:

* `resource` (string): Defines the resource to fetch. When using Misty's REST API, resources are hosted at `<robot-ip-address>/api/<command-endpoint>`
* `init` (object): Optional. An object that defines custom settings to use with the request. In our examples, we use this object to define the HTTP method and any additional parameters to send in the body of the request.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Learn more about the `fetch()` method in the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
{{box op="end"}}

The base URL for all requests in Misty's REST API is as follows:

```JS
// base URL
<robot-ip-address>/api/
```

To invoke a Misty command, we append the endpoint for that command to this base URL. For example, to get a list of the images stored on Misty, we use the `/images/list` endpoint. For a robot with an IP of `192.168.7.183`, the full `GetImageList` resource URL looks like this:

```JS
// GetImageList example URL
192.168.7.183/api/images/list
```

When we use the `fetch()` method to send a GET request, we pass in the full command URL as the `resource`. Then, we specify the request method in the object we pass in for the `init` argument. For example, setting up the `fetch()` method to send a request to the `GetImageList` endpoint would look like this:

```JS
fetch('http://192.168.7.33/api/images/list', {
  method: 'GET'
  })
```

Next, we use a `Promise` to handle the request and response data. (The details of using `Promises` are beyond the scope of this documentation; for more details on how to use them in your code, see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).) We use [`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) to return a new `Promise` with our call on the `fetch()` method. We then handle the response data by printing it to the console in our web browser.

Our full `GetImageList` request looks like this:

```JS
Promise.race([
	fetch('http://192.168.7.33/api/images/list', {
		method: 'GET'
	}),
	new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
])
.then(response => response.json())
.then(jsonData => console.log(jsonData))
```

Here’s another example of using the Fetch API with `Promises` to send a GET request to Misty, this time to obtain Misty's device information:

```JavaScript
Promise.race([
	fetch('http://192.168.7.33/api/device', {
		method: 'GET'
	}),
	new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
])
.then(response => response.json())
.then(jsonData => console.log(jsonData))
```

You will also want to send POST requests to the robot. For a POST request, in order to send data along with the request, define a `body` parameter in the `init` object when you call the `fetch()` method. Set the value of the `body` parameter to be a string with the JSON data to send with your request.

For example, we can send a POST request to the `ChangeLED` endpoint to change the color of Misty's chest LED to blue. The `ChangeLED` command accepts as parameters RGB values for `red`, `green`, and `blue`. If there are no errors, the response data returns `true`, and we can log a success message. When we use the Fetch API, our POST request (and the JSON data we send along with it) looks like this:

```javascript
Promise.race([
    fetch('http://192.168.7.33/api/led', {
        method: 'POST',
        body: '{ "red":0,"green":0,"blue":255 }'
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
])
.then(response => response.json())
.then(jsonData => console.log(jsonData))
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** The API Explorer web tool provides examples of using the Fetch API to send requests to all of Misty's available REST endpoints. To use these examples in your code, connect your robot to the [API Explorer](http://sdk.mistyrobotics.com/api-explorer/). Then, copy the example requests you want to use and paste them into `<script>` tags in an `HTML` file. Open this file in your web browser to send the requests to your robot.
{{box op="end"}}

## Getting Data from Misty

A WebSocket connection provides a live, continuously updating stream of data from Misty. When you subscribe to a WebSocket, you can get data for your robot ranging from distance information to face detection events to movement and more.

You can directly observe WebSocket data in your browser's JavaScript console by connecting your robot to the [Command Center](../../../tools-&-apps/web-based-tools/command-center). However, to use WebSocket data in a robot application, you'll need to subscribe to it programmatically in your code. We'll walk through this process using the `tofApp.js` in the section below. You can download this JavaScript sample [from GitHub](https://github.com/MistyCommunity/SampleCode/tree/master/Time%20of%20Flight).


{{box op="start" cssClass="boxed noteBox"}}
**Note:** For the most current version of the `tofApp.js` sample code, always check our [GitHub repo](https://github.com/MistyCommunity/SampleCode/blob/master/Time%20of%20Flight/tofApp.js).
{{box op="end"}}


### Subscribing & Unsubscribing to a WebSocket

To subscribe to a WebSocket data stream, you must first open the WebSocket. Then, send a message to specify the exact data you want to receive. For some WebSocket data, you must also send a REST command to the robot to enable the systems that start generating that data. For the time-of-flight sensor data that the [`tofApp.js` sample](https://github.com/MistyCommunity/SampleCode/tree/master/Time%20of%20Flight) uses, sending a REST command is not required, because Misty's time-of-flight sensors are always on.


The first thing the `tofApp.js` sample does is to construct the message that subscribes to the exact WebSocket data we want.

The `Type` property is the name of the desired event type (or data stream) to receive messages from. Misty's available event types are described in detail in the [Event Types](../../../misty-ii/robot/sensor-data) documentation. You can subscribe to each of these event types via a WebSocket connection.

The optional `DebounceMs` value specifies how frequently the data is sent. For time-of-flight data, if you don't specify a value, by default the data is sent every 250ms. In this case, we've set it to be sent every 100ms.

The `EventName` property is a name you specify for how your code will refer to this particular WebSocket instance. It can be any name you like.

`Message` and `ReturnProperty` are optional values.

For time-of-flight subscriptions, you must also include `EventConditions`. You can use event conditions to specify which sensor(s) to stream data from, in cases where the event type streams messages from multiple sensors. Specify the `sensorId` of the time-of-flight sensor to get messages from (`toffr`, `toffl`, `toffc`, `toffr`, or [another `sensorId`](https://docs.mistyrobotics.com/misty-ii/reference/sensor-data/#time-of-flight-sensor-details)). This sample code subscribes to the front center time-of-flight sensor -- `toffc` -- only.

After creating the `subscribe` message, the sample also creates an `unsubscribe` message. When it's no longer needed, unsubscribing from a WebSocket data stream is a good practice to avoid creating performance issues. The `unsubscribe` message will be sent when the skill is done using the data.

```javascript
//Use this variable to hold the IP address for the robot.
var ip = "<robot-ip-address>";

//Create a message to subscribe to the desired WebSocket data.
var subscribeMsg = {
  "Operation": "subscribe",
  "Type": "TimeOfFlight",
  "DebounceMs": 100,
  "EventName": "FrontCenterTimeOfFlight",
  "Message": "",
  "ReturnProperty": null,
  "EventConditions": [
    {
      "Property": "SensorId",
      "Inequality": "=",
      "Value": "toffc"
    }
  ]
};

//Create a message to unsubscribe to the data when done.
var unsubscribeMsg = {
  "Operation": "unsubscribe",
  "EventName": "FrontCenterTimeOfFlight",
  "Message": ""
};

//Format the messages as JSON objects.
var subMsg = JSON.stringify(subscribeMsg);
var unsubMsg = JSON.stringify(unsubscribeMsg);
```

After constructing the messages, they are formatted as JSON objects, so they are ready to send once the WebSocket is open.

### Opening & Closing a WebSocket

Having constucted the `subscribe` and `unsubscribe` messages, the `tofApp.js` sample next attempts to open a WebSocket connection. Once the WebSocket is open, it sends the JSON-formatted "subscribe" message.

Once you've successfully subscribed to a data stream, you can use the `socket.onmessage()` function to handle the data received back from the robot. In this example, we handle the received data by logging it to the console. For a real robot application, you could instead parse the event data and write a conditional function based on a particular property value. This is how you code Misty to react to event data in useful and interesting ways.

In the sample, after a specified number of messages are received, we unsubscribe to the data stream and close the WebSocket connection. Alternately, because a given WebSocket could be used for multiple data subscriptions, you could keep the WebSocket open after unsubscribing and only close it when you are done running the application.

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

### Connecting to Misty with LightSocket JS

The `lightSocket.js` helper tool streamlines opening, connecting, and subscribing to Misty's WebSocket server to receive event messages from the robot. [Download `lightSocket.js` from GitHub](https://github.com/MistyCommunity/SampleCode/tree/master/Tools/javascript)

The `lightSocket.js` file should typically be located in a "tools" or "assets" folder. It’s important to reference the file prior to your application file in your `HTML` page. For example:

```HTML
<!-- In your HTML file -->
<script src="tools/lightSocket.js"></script>
<script src="app.js"></script>
```

The first step in using `lightSocket.js` is to create an instance of the `LightSocket` class, passing in your robot's IP address. Then, you call the `Connect()` method to open a WebSocket connection.

```javascript
let socket = new LightSocket(ip);
socket.Connect();
```

In order to subscribe to a WebSocket using LightSocket, we call the `Subscribe()` method. The arguments passed to the function correspond to the properties of `subscribeMsg` described in [Subscribing & Unsubscribing to a WebSocket](./#subscribing-amp-unsubscribing-to-a-websocket). See the function below for reference:

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