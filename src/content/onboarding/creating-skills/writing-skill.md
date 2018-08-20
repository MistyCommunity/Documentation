---
title: Writing a Skill for Misty
layout: onboarding.hbs
columns: three
order: 6
---

# {{title}}

Misty's a pretty capable robot on her own, but the exciting part of working with Misty is seeing her run the skills you create for her. Check out the Misty Community [GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills) for example skills (including a fun [Python-based skill](https://github.com/MistyCommunity/MistyI/tree/master/API_Wrappers/Python/samples/mistyvoice) that gives Misty a voice using the Google Text-to-Speech API).

Creating your own skill for Misty typically involves two things: getting data from Misty via WebSocket connections and sending commands to Misty using her API. This topic walks you through both sides of this process.

## Getting Data from Misty

A WebSocket connection provides a live, continuously updating stream of data from Misty. When you subscribe to a WebSocket, you can get data for your robot ranging from distance information to face detection events to movement and more.

You can directly observe WebSocket data in your browser's JavaScript console, by connecting your robot to the [API Explorer](../../3-ways-to-interact-with-misty/api-explorer/#opening-a-websocket), but to use WebSocket data in a skill, you'll need to subscribe to it programmatically, in your code. We'll walk through this process, using the `tofApp.js` sample. You can download this JavaScript sample [here](https://github.com/MistyCommunity/MistyI/tree/master/Sample%20Code/Time%20of%20Flight).

To subscribe to a WebSocket data stream, you must first open the WebSocket, then send a message to specify the exact data you want to receive. For some WebSocket data, you must also send a REST command to the robot so it starts generating the data. For the time-of-flight sensor data that the `tofApp.js` [sample](https://github.com/MistyCommunity/MistyI/tree/master/Sample%20Code/Time%20of%20Flight) uses, sending a REST command is not required, because Misty's time-of-flight sensors are always on.

**IMPORTANT!** For the most current version of the `tofApp.js` sample code, always check our [GitHub repo](https://github.com/MistyCommunity/MistyI/blob/master/Sample%20Code/Time%20of%20Flight/tofApp.js).


### Subscribing & Unsubscribing to a WebSocket

The first thing the `tofApp.js` sample does is to construct the message that subscribes to the exact WebSocket data we want.

The `Type` property is the name of the desired data stream. Misty's available WebSocket data stream types are described below. Currently, they include:
* ```TimeOfFlight```
* ```FaceDetection```
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

Once you've successfully subscribed to a data stream, you can use the `socket.onmessage` function to handle the data received back from the robot. In this example, we simply log the received data to the console. For a real skill, you could instead parse the event data and write a conditional function based on a particular property value to do something when a condition is met.

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

### WebSocket Types & Sample Data

The following are Misty's available WebSocket data stream types. You can filter all WebSocket options so (a) they return only a specified subset of the data and (b) check current values before the data is sent.

### TimeOfFlight

Misty has four time-of-flight sensors that provide raw proximity data (in meters) in a single stream. The ```TimeOfFlight``` WebSocket sends this data any time a time-of-flight sensor is triggered. It is possible for proximity data to be sent as frequently as every 70 milliseconds, though it can be significantly slower. It is not sent at timed intervals.

Sample time-of-flight sensor data:
```javascript
TimeOfFlight{
	"eventName":"TimeOfFlight",
	"Message":{
		"created":"2018-03-30T20:36:46.5816862Z",
		"distanceInMeters":0.184,
		"expiry":"2018-03-30T20:36:46.9316897Z",
		"sensorId":"CD727A0A",
		"sensorPosition":"Right"
	},
	"type":"TimeOfFlight"
}
```

### FaceDetection (Beta)

At this time, the ```FaceDetection``` WebSocket returns only raw face detection data. Currently, this sensory data is not aggregated with other face data, so there may be empty and ```null``` fields.

The ```FaceDetection``` WebSocket data is sent only upon a sensory message trigger. It is not sent at timed intervals. The approximate transmission rate of ```FaceDetection``` data is 4x/second, but this timing can vary.

Sample face detection data:
```javascript
FaceDetection{
	"eventName":"FaceDetection",
	"Message":{
		"Bearing":-3,
		"created":"2018-04-02T16:25:00.6934206Z",
		"Distance":71,
		"Elevation":3,
		"expiry":"2018-04-02T16:25:01.4434254Z",
		"faceId":3,
		"personName":null,
		"sensorId":null
	},
	"type":"FaceDetection"
}
```

### FaceRecognition (Beta)

At this time, the ```FaceRecognition``` WebSocket returns only raw face recognition data. Currently, this sensory data is not aggregated with other face data, so there may be empty and ```null``` fields, including the recognized name.

The ```FaceRecognition``` WebSocket data is sent only upon a sensory message trigger. It is not sent at timed intervals. The approximate transmission rate of ```FaceRecognition``` data is 1x/second, but this timing can vary.

Sample face recognition data:
```javascript
FaceRecognition{
	"eventName":"FaceRecognition",
	"Message":{
		"Bearing":0,
		"created":"2018-04-02T16:26:20.1718422Z",
		"Distance":0,
		"Elevation":0,
		"expiry":"2018-04-02T16:26:20.9218446Z",
		"faceId":12,
		"personName":"Barkley",
		"sensorId":null
	},
	"type":"FaceRecognition"
}
```

### LocomotionCommand

```LocomotionCommand``` WebSocket data is sent every time the linear or angular velocity of the robot changes. It is not sent at timed intervals.

Sample locomotion data:
```javascript
LocomotionCommand{
	"eventName":"LocomotionCommand",
	"Message":{
		"actionId":0,
		"angularVelocity":0,
		"created":"2018-04-02T22:59:39.3350238Z",
		"linearVelocity":0.30000000000000004,
		"usePid":true,
		"useTrapezoidalDrive":true,
		"valueIndex":0
	},
	"type":"LocomotionCommand"
}
```

### HaltCommand

```HaltCommand``` WebSocket data is sent every time the robot stops and contains the date and time of the event. It is not sent at timed intervals.

### SelfState

The ```SelfState``` WebSocket can provide a large amount of data about Misty’s current internal state, including:

* battery charge, voltage, and charging status
* affect
* position and orientation
* SLAM status
* sensor messages

**Note:** There are a number of fields in the WebSocket data structure that are reserved for future use and which may be empty or contain ```null``` data:
* ```acceleration```
* ```bumpedState```
* ```currentGoal```
* ```mentalState```
* ```personality```
* ```physiologicalBehavior```

```SelfState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```SelfState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the sample below that uses the ```lightSocket.js``` JavaScript helper.

### WorldState

The ```WorldState``` WebSocket sends data about the environment Misty is perceiving, including:
* the locations of perceived objects
* the times they were perceived

```WorldState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```WorldState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the sample below that uses the ```lightSocket.js``` JavaScript helper.


## Sending Commands to Misty

To send API commands to Misty in a skill, you can use the [JavaScript API](/apis/api-reference/all-functions) or this community-created [Python wrapper](https://github.com/MistyCommunity/MistyI/tree/master/API_Wrappers/Python). To experiment with the API, you can also use a REST client such as Postman and send [GET and POST](/apis/api-reference/rest) commands to Misty directly.

Misty's API includes commands for:
* Display and light control
* Audio control
* Face detection, training, and recognition
* Locomotion
* Mapping
* Head movement
* Configuration and information

The [Misty I GitHub repo](https://github.com/MistyCommunity/MistyI) contains a variety of sample skills that you can use to test and adapt into your own custom uses.

### Calling the REST API Programmatically

The ```lightClient.js``` sample is a JavaScript helper [available at the Misty I GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript). It lets you call Misty's REST API simply by passing in the command name and parameters.

The example function `RunMe` uses ```lightClient.js``` to call the ```GetHelp``` and ```DriveTime``` API commands.

```javascript
RunMe();
async function RunMe()
{
	//Create a client instance for this robot, using its IP address.
	//Ajax timeout is specified in ms.
	var lightClient = new LightClient("10.0.1.1", 10000); 

		// Example Get call to GetHelp command.
      	lightClient.GetCommand("info/help", function(data) { console.log(JSON.stringify(data)); });

		// Example Post call to DriveTime command.
		// Callback is called when driving is complete.
        lightClient.PostCommand("drive/time", " {\"LinearVelocity\":0,\"AngularVelocity\":20, \"TimeMs\":100}",  function(data) { console.log(JSON.stringify(data)); });         
}
```


## Working with the API Explorer Code

You can use the code and examples in the [API Explorer download package](https://s3.amazonaws.com/misty-releases/Misty-0.7/latest/api-explorer.zip) to help you build skills.

### index.html & default.css

These files contain the user interface and styles for the Misty API Explorer.

### SampleUI.js

This file defines the handlers for the ```index.html``` page events. Use `SampleUI.js` to see examples of all of the event listeners linked to the various buttons rendered in ```index.html```. For example, Select a mood or Change LED.

### MistyRobot.js

This file builds the server URL based on the robot you're interacting with. It provides a wider and more user-friendly range of commands than `MistyAPI.js`.

```SampleUI.js``` calls ```MistyRobot.js``` to processes user actions by sending commands through ```MistyAPI.js``` and ```MistyWebSocket.js```.

### MistyAPI.js

This file is a one-to-one wrapper for most of Misty's API endpoints. It constructs payloads to pass to `MistyAjax.js`. You can call it directly once you have created a new `MistyRobot` by inputting the robot's IP address, port, and verbose level.

### MistyWebSocket.js

This file allows you to subscribe to and unsubscribe from Misty's WebSockets.

### MistyAjax.js

A simple wrapper for Ajax ```GET``` and ```POST``` requests, this file sends Ajax calls to Misty.


