---
title: Writing a Skill for Misty
layout: onboarding.hbs
columns: three
order: 6
---

# {{title}}

Misty's a pretty capable robot on her own, but the exciting part of working with Misty is seeing her run the skills you create for her. Check out the Misty Community [GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills) for example skills (including a fun [Python-based skill](https://github.com/MistyCommunity/MistyI/tree/master/API_Wrappers/Python/samples/mistyvoice) that gives Misty a voice using the Google Text-to-Speech API).

To create your own skill for Misty typically involves two things: sending commands to Misty and getting data back from Misty. To send commands to Misty, you call the [REST](/apis/api-reference/rest) and [JavaScript](/apis/api-reference/all-functions) APIs. To get live updating data streams from Misty, you'll need to use a WebSocket connection.

This document:
* describes the data sent by Misty's currently available [WebSocket connections](/onboarding/creating-skills/writing-skill/#websocket-connections)
* provides [examples](/onboarding/creating-skills/writing-skill/#sending-commands-and-subscribing-to-websockets) of using simple JavaScript helpers to send commands and subscribe to Misty's WebSockets
* presents Misty's API Explorer components as [models for development](/onboarding/creating-skills/writing-skill/#working-with-the-api-explorer-code)


## WebSocket Connections

To get streams of live data back from Misty, you can [programmatically subscribe](/onboarding/creating-skills/writing-skill/#sending-commands-and-subscribing-to-websockets) to one or more of Misty's available WebSocket connections. You can filter all WebSocket options so (a) they return only a specified subset of the data and (b) check current values before the data is sent.

Misty’s WebSocket connections include:
* ```TimeOfFlight```
* ```FaceDetection```
* ```FaceRecognition```
* ```LocomotionCommand```
* ```HaltCommand```
* ```SelfState```
* ```WorldState```

You can directly observe Misty's WebSocket data in the [API Explorer](../../3-ways-to-interact-with-misty/api-explorer/#opening-a-websocket).

### TimeOfFlight

Misty has four time-of-flight sensors that provide raw proximity data (in meters) in a single stream. The ```TimeOfFlight``` WebSocket sends this data any time a time-of-flight sensor is triggered. It is possible for proximity data to be sent as frequently as every 70 milliseconds, though it can be significantly slower. It is not sent at timed intervals.

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



## Sending Commands and Subscribing to WebSockets

While you can directly send REST commands to Misty to control her behavior, we also provide a JavaScript API for this purpose. (There are other [community-created wrappers](https://github.com/MistyCommunity/MistyI/tree/master/API_Wrappers) for the REST API available, as well.)

The following are examples of using the simple JavaScript helpers [available at our GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript) to call the Misty API and to connect to and register callbacks for Misty's WebSockets.

### Sending Commands to Misty

The ```lightClient.js``` JavaScript helper lets you call API commands by passing in the command name and parameters. The example function below shows how you can use ```lightClient.js``` to call the ```GetHelp``` and ```DriveTime``` commands:

Example call:

```javascript
RunMe();
async function RunMe()
{
	var lightClient = new LightClient("10.0.1.1", 10000); //Set IP and ajax timeout in ms

		// Example Get call to get help
      	lightClient.GetCommand("info/help", function(data) { console.log(JSON.stringify(data)); });

		// Example Post call to drive time, callback
		// will be called when driving is complete
        lightClient.PostCommand("drive/time", " {\"LinearVelocity\":0,\"AngularVelocity\":20, \"TimeMs\":100}",  function(data) { console.log(JSON.stringify(data)); });         
}
```

Get ```lightClient.js``` from [the Misty Community GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript).

### Subscribing to WebSocket Data from Misty

The ```lightSocket.js``` JavaScript helper lets you register JavaScript callback functions for Misty's WebSocket connections. The example function below shows how you can use ```lightSocket.js``` to subscribe to and unsubscribe from specific data streams:

Example call:

```javascript
RunMe();
async function RunMe()
{
	// Create a new LightSocket object and
	// connect to Misty's WebSockets.
	var lightSocket = new LightSocket("10.0.1.216");
        lightSocket.Connect();

	// Give a time to connect until connection.
	// Callback implemented in lightSocket.js
    	await sleep(5000);

	// Listen for TimeOfFlight data. 500ms debounce
	// ensures data is not sent more than once every 500ms.
	// Default is 250ms; can be set as frequently as 100ms.
	lightSocket.Subscribe("TimeOfFlight", "TimeOfFlight", 500, null, null, null, null, function(data){console.log("New Time of Flight Event!", data)});

	// Listen for MentalState Updates in the SelfState Object.
	// This socket listens for SelfState (triggered every 100ms),
	// but returns the SelfState field MentalState every 2 seconds.
	lightSocket.Subscribe("MentalState", "SelfState", 2000, null, null, null, "MentalState", function(data){ console.log("New Mental State Event!", data)});            

	// Listen on SelfState, but only return MentalState.Affect
	// data if the internal data of MentalState.Affect.Arousal == 0
	// Returns at most, once every four seconds.
        lightSocket.Subscribe("Affect", "SelfState", 4000, "MentalState.Affect.Arousal", "==", 0, "MentalState.Affect", function(data){console.log("New Affect Event!", data)});            

	// Let it run for a while before unsusbscribing...            
        await sleep(30000);    

	// Unsubscribe from the WebSocket connections by name.
	// If no connection name was used in registration, the name
	// is the actual named object name used for registration.
        lightSocket.Unsubscribe("MentalState");
        lightSocket.Unsubscribe("TimeOfFlight");
        lightSocket.Unsubscribe("Affect");
        lightSocket.Disconnect();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
```

Get ```lightSocket.js``` from [the Misty Community GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript).

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

A simple wrapper for Ajax ```Get``` and ```Post``` requests, this file sends Ajax calls to Misty.





