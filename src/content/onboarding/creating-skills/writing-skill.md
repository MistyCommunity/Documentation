---
title: Writing a Skill for Misty
layout: onboarding.hbs
columns: three
order: 6
---

# {{title}}

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

We supply two helper tools that make it easy to develop JavaScript skills for Misty:
* `lightClient.js` - The LightClient tool simplifies JavaScript access to the REST endpoints for sending commands to the robot
* `lightSocket.js` - The LightSocket tool streamlines opening, connecting, and subscribing to a WebSocket to receive data back from the robot 

Get both tools [at the Misty I GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript)

### Using the LightClient JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src=”tools/lightClient.js”></script>
<script src=”tools/lightSocket.js”></script>
<script src=”app.js”></script>
```

The first step to creating an external skill is to create an instance of the LightClient class, passing in your robot's IP address and the amount of time in ms you want your program to wait before timing out if no response is detected (the default is 30 seconds). 

```javascript
let client = new LightClient("[robot IP address]", 10000);
```

Once you create an instance of LightClient, it's simple to send requests to Misty’s REST endpoints. Most of the URL for Misty’s REST commands are built into LightClient: 

```javascript
http://{ipAddress}/api/
```

In order to use a specific endpoint, just pass in the rest of the URL. For example, you can do the following to send a GET request to the `GetDeviceInformation()` command:

```javascript
client.GetCommand("info/device", function(data) {
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
client.PostCommand("led/change", payload, function(result) {
    if(result) {
        console.log("Request Successful")
    }
});
```


### Using the LightSocket JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src=”tools/lightClient.js”></script>
<script src=”tools/lightSocket.js”></script>
<script src=”app.js”></script>
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

**Note**: All of Misty's WebSocket data structures are subject to change.

### TimeOfFlight

Misty has four time-of-flight sensors that provide raw proximity data (in meters) in a single stream. The ```TimeOfFlight``` WebSocket sends this data any time a time-of-flight sensor is triggered. It is possible for proximity data to be sent as frequently as every 70 milliseconds, though it can be significantly slower. It is not sent at timed intervals.

Sample time-of-flight sensor data:
```javascript
TimeOfFlight{
	"EventName":"TimeOfFlight",
	"Message":{
		"Created":"2018-03-30T20:36:46.5816862Z",
		"DistanceInMeters":0.184,
		"Expiry":"2018-03-30T20:36:46.9316897Z",
		"SensorId":"CD727A0A",
		"SensorPosition":"Right"
	},
	"Type":"TimeOfFlight"
}
```

### ComputerVision (Beta)

You can subscribe to the ```ComputerVision``` WebSocket to obtain data on both face detection and face recognition events.

The ```EventName``` value is the name you provide when you register the WebSocket connection.  

If face recognition is running on the robot, and a previously trained face is recognized, the ```PersonName``` value is the name previously assigned to that face. The ```PersonName``` value is ```unknown_person``` if an untrained/unknown face is detected. The ```PersonName``` value is ```null``` if face recognition is not currently running.

```TrackId``` is reserved data that may change in the future.

Sample ComputerVision data for a face recognition event:
```javascript
ComputerVision{
	"EventName":"MyFaceRecognition",
	"Message":{
		"Bearing":-3,
		"Created":"2018-07-02T16:26:20.1718422Z",
		"Distance":71,
		"Elevation":3,
		"Expiry":"2018-07-02T16:26:20.9218446Z",
		"PersonName":"Barkley",
		"SensorId":null,
		"SensorName":null,
		"TrackId":0
	},
	"Type":"ComputerVision"
}
```

### FaceDetection (Deprecated)

**Note**: The ```FaceDetection``` WebSocket is deprecated. Use the ```ComputerVision``` WebSocket instead.

The ```FaceDetection``` WebSocket returns only raw face detection data. Currently, this sensory data is not aggregated with other face data, so there may be empty and ```null``` fields.

The ```FaceDetection``` WebSocket data is sent only upon a sensory message trigger. It is not sent at timed intervals. The approximate transmission rate of ```FaceDetection``` data is 4x/second, but this timing can vary.

Sample face detection data:
```javascript
FaceDetection{
	"EventName":"FaceDetection",
	"Message":{
		"Bearing":-3,
		"Created":"2018-04-02T16:25:00.6934206Z",
		"Distance":71,
		"Elevation":3,
		"Expiry":"2018-04-02T16:25:01.4434254Z",
		"FaceId":3,
		"PersonName":null,
		"SensorId":null
	},
	"Type":"FaceDetection"
}
```

### FaceRecognition (Deprecated)

**Note**: The ```FaceRecognition``` WebSocket is deprecated. Use the ```ComputerVision``` WebSocket instead.

The ```FaceRecognition``` WebSocket returns only raw face recognition data. Currently, this sensory data is not aggregated with other face data, so there may be empty and ```null``` fields, including the recognized name.

The ```FaceRecognition``` WebSocket data is sent only upon a sensory message trigger. It is not sent at timed intervals. The approximate transmission rate of ```FaceRecognition``` data is 1x/second, but this timing can vary.

Sample face recognition data:
```javascript
FaceRecognition{
	"EventName":"FaceRecognition",
	"Message":{
		"Bearing":0,
		"Created":"2018-04-02T16:26:20.1718422Z",
		"Distance":0,
		"Elevation":0,
		"Expiry":"2018-04-02T16:26:20.9218446Z",
		"FaceId":12,
		"PersonName":"Barkley",
		"SensorId":null
	},
	"Type":"FaceRecognition"
}
```

### LocomotionCommand

```LocomotionCommand``` WebSocket data is sent every time the linear or angular velocity of the robot changes. It is not sent at timed intervals.

Sample locomotion data:
```javascript
LocomotionCommand{
	"EventName":"LocomotionCommand",
	"Message":{
		"ActionId":0,
		"AngularVelocity":0,
		"Created":"2018-04-02T22:59:39.3350238Z",
		"LinearVelocity":0.30000000000000004,
		"UsePid":true,
		"UseTrapezoidalDrive":true,
		"ValueIndex":0
	},
	"Type":"LocomotionCommand"
}
```

### HaltCommand

```HaltCommand``` WebSocket data is sent every time the robot stops and contains the date and time of the event. It is not sent at timed intervals.

### SelfState

The ```SelfState``` WebSocket provides a variety of data about Misty’s current internal state, including:

* battery charge, voltage, and charging status
* IP address
* affect
* position and orientation ("pose")
* SLAM status
* sensor messages

**Note:** There are a number of fields in the WebSocket data structure that are reserved for future use and which may be empty or contain ```null``` data:
* ```Acceleration```
* ```BumpedState```
* ```CurrentGoal```
* ```MentalState```
* ```Personality```
* ```PhysiologicalBehavior```

```SelfState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```SelfState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the ```lightSocket.js``` JavaScript helper.

Sample SelfState data:
```javascript
SelfState {
    "eventName": "SelfState",
    "message": {
        "acceleration": null,
        "batteryChargePercent": 0,
        "batteryVoltage": 0,
        "bumpedState": {
            "disengagedSensorIds": [],
            "disengagedSensorNames": [],
            "disengagedSensors": [],
            "engagedSensorIds": [],
            "engagedSensorNames": [],
            "engagedSensors": []
        },
        "currentGoal": {
            "animation": null,
            "animationId": null,
            "directedMotion": null,
            "directedMotionBehavior": "SupersedeAll",
            "haltActionSequence": false,
            "haltAnimation": false
        },
        "isCharging": false,
        "localIPAddress": "10.0.1.160",
        "location": {
            "bearing": 2.1161846957231862,
            "bearingThreshold": {
                "lowerBound": 0,
                "upperBound": 0
            },
            "distance": 0.049783250606253104,
            "distanceThreshold": {
                "lowerBound": 0,
                "upperBound": 0
            },
            "elevation": -0.009038750542528028,
            "elevationThreshold": {
                "lowerBound": 0,
                "upperBound": 0
            },
            "pose": {
                "bearing": 2.1161846957231862,
                "created": "2018-09-17T21:01:35.7312016Z",
                "distance": 0.049783250606253104,
                "elevation": -0.009038750542528028,
                "frameId": "WorldOrigin",
                "framesProvider": {
                    "rootFrame": {
                        "created": "2018-09-17T18:21:22.8435331Z",
                        "id": "RobotBaseCenter",
                        "isStatic": true,
                        "linkFromParent": {
                            "isStatic": true,
                            "parentFrameId": "",
                            "transformFromParent": {
                                "bearing": 0,
                                "distance": 0,
                                "elevation": 0,
                                "pitch": 0,
                                "quaternion": {
                                    "isIdentity": true,
                                    "w": 1,
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "roll": 0,
                                "x": 0,
                                "y": 0,
                                "yaw": 0,
                                "z": 0
                            },
                            "transformToParent": {
                                "bearing": 3.141592653589793,
                                "distance": 0,
                                "elevation": 0,
                                "pitch": 0,
                                "quaternion": {
                                    "isIdentity": true,
                                    "w": 1,
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "roll": 0,
                                "x": 0,
                                "y": 0,
                                "yaw": 0,
                                "z": 0
                            }
                        }
                    }
                },
                "homogeneousCoordinates": {
                    "bearing": 2.1161846957231862,
                    "distance": 0.049783250606253104,
                    "elevation": -0.009038750542528028,
                    "pitch": -0.18708743155002594,
                    "quaternion": {
                        "isIdentity": false,
                        "w": 0.99558717,
                        "x": -0.008987884,
                        "y": -0.09339719,
                        "z": -0.0015491969
                    },
                    "roll": -0.017920719552386073,
                    "x": -0.025824014097452164,
                    "y": 0.04255925118923187,
                    "yaw": -0.001430802591800146,
                    "z": 0.00044997225631959736
                },
                "pitch": -0.18708743155002594,
                "roll": -0.017920719552386073,
                "x": -0.025824014097452164,
                "y": 0.04255925118923187,
                "yaw": -0.001430802591800146,
                "z": 0.00044997225631959736
            },
            "unitOfMeasure": "None"
        },
        "mentalState": {
            "affect": {
                "arousal": 0,
                "dominance": 0,
                "valence": 0
            },
            "created": "2018-09-17T21:01:35.7312016Z",
            "personality": {
                "agreeableness": 0,
                "conscientiousness": 0,
                "extraversion": 0,
                "neuroticism": 0,
                "openness": 0
            },
            "physiologicalBehavior": {
                "hunger": {
                    "isEating": false,
                    "level": 0
                },
                "sleepiness": {
                    "isSleeping": false,
                    "level": 0
                }
            }
        },
        "occupancyGridCell": {
            "x": 0,
            "y": 0
        },
        "occupancyGridCellMeters": 0,
        "orientation": {
            "pitch": -0.18708743155002594,
            "roll": -0.017920719552386073,
            "yaw": -0.001430802591800146
        },
        "position": {
            "x": -0.025824014097452164,
            "y": 0.04255925118923187,
            "z": -0.025824014097452164
        },
        "slamStatus": {
            "runMode": "Exploring",
            "sensorStatus": "Ready",
            "status": 132
        },
        "stringMessages": null,
        "touchedState": {
            "disengagedSensors": [],
            "engagedSensors": []
        }
    },
    "type": "SelfState"
}
```

### WorldState

The ```WorldState``` WebSocket sends data about the environment Misty is perceiving, including:
* the locations of perceived objects
* the times they were perceived

```WorldState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```WorldState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the ```lightSocket.js``` JavaScript helper.


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


