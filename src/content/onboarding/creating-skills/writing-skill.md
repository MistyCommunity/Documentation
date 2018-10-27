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


## Tutorial 1: Changing Misty’s LED

These tutorials describe how to write skills for Misty that use her REST API. REST API calls are sent to Misty from an external device (usually the web browser of a laptop or desktop) and can send commands or request data from your robot. These tutorials show how to use .html documents and inline JavaScript to write programs for Misty that run in your web browser. In this tutorial, you learn how to write a program that sends a REST command to change the color of Misty’s chest LED.

### Connecting Misty to Your Network
Because these commands are sent to Misty over a local network connection, you must connect your robot to your local network. [Use the Companion App](https://docs.mistyrobotics.com/onboarding/3-ways-to-interact-with-misty/companion-app/#connecting-misty-to-bluetooth-and-wi-fi) to connect your robot to your Wi-Fi network, or [follow this guide](https://docs.mistyrobotics.com/onboarding/3-ways-to-interact-with-misty/api-explorer/#connecting-wifi) to connect Misty to your Wi-Fi network using the API Explorer and an Ethernet/USB dongle. Once Misty is connected to your network, take note of her IP address to use with the REST API commands.

### Setting Up Your Project
This tutorial uses Misty’s REST API to send a POST request that changes the color of her chest LED and logs a successful response. To set up your project, create a new .html document. To simplify the task of making `XMLHttpRequests` to Misty from the browser, we’ll use Axios, an HTTP library supported by most web browsers and Node.js. To use Axios in your program, reference a link to a CDN for Axios inside `<script>` tags in the `<head>` section of your .html file when you set up the project. 

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Remote Command Tutorial 1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Reference a link to a CDN for Axios here -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
</body>
</html>
```

Alternately, you can download a compressed version of the Axios library to include in your project. Read more about Axios [here](https://github.com/axios/axios).

### Writing the Code
Within `<script>` tags in the `<body>` of your .html document, declare a constant variable `ip` and set its value to a string with your robot’s IP address. We’ll reference this variable throughout the program to send commands to Misty. 

```html
<body>
    <script>
        // Declare a constant variable and set its value 
        to a string with your robot's IP address.
        const ip = "<robotipaddress>";
    </script>
</body>
```

When we send a command to change Misty’s LED color, we need to communicate what the new color should be. The REST API command to change Misty’s LED requires three parameters: `“red”`, `“green”`, and `“blue”`. These parameters represent the RGB values of the new color. 

Create an object called `data` to send with the POST request. Create a property for each color parameter, and set the value of each property to an integer between `0` and `255`. The RGB values in the example change Misty’s LED to a hot pink color.

```html
<body>
    <script>
        const ip = "<robotipaddress>";

        // Assemble the data to send with your POST request. Set values for each RGB color property.
        let data = {
            "red": 255,
            "green": 0,
            "blue": 255
        };

    </script>
</body>
```

Now we’re ready to write the code to send the command to Misty. We do this by using the `axios.post()` method included in the Axios library. This method accepts two parameters:
* the URL of the request, and
* the data to send with the request. 

The REST API endpoint for changing Misty’s LED display is `http://<robotipaddress>/api/led/change`. In your code, call `axios.post()` and pass a string with this endpoint as the first parameter. Use the previously defined variable `ip` to populate the `<robotipaddress>` section of the URL. Pass the `data` object for the second parameter.

```html
<body>
    <script>
        const ip = "<robotipaddress>";

        let data = {
            "red": 255,
            "green": 0,
            "blue": 255
        };

        // Call axios.post(), passing the URL of the ChangeLED endpoint as the first parameter, and the payload (the data object) as the second.
        axios.post("http://" + ip + "/api/led/change", data)

    </script>
</body>
```

Because Axios is promise based, we need to use a `then()` method after calling `post()`. This method returns a promise and triggers a callback function if the promise is fulfilled. We pass a callback function to `then()` to interpret information from the return values of the POST call and print a message to the console about whether the request was a failure or success.

```html
<body>
    <script>
        const ip = "<robotipaddress>";

        let data = {
            "red": 255,
            "green": 0,
            "blue": 255
        };

        axios.post("http://" + ip + "/api/led/change", data)
        // Chain then() after calling post(). Pass a callback function to interpret the return values of the POST call and print a message to the console about whether the request was a failure or a success.
            .then(function (response) {
        console.log(`ChangeLED was a ${response.data[0].status}`);
        })

    </script>
</body>
```

We use a `catch()` method after `then()`, which triggers if the promise is rejected. Pass a callback function to `catch()` to print to the console any errors returned by the request.

```html
<body>
    <script>
        const ip = "<robotipaddress>";

        let data = {
            "red": 255,
            "green": 0,
            "blue": 255
        };

        axios.post("http://" + ip + "/api/led/change", data)
            .then(function (response) {
        console.log(`ChangeLED was a ${response.data[0].status}`)
        // Chain a catch() method after then(). catch() triggers if the promise is rejected. Pass a callback to catch() to print any errors returned by the request to the console.
            .catch(function (error) {
        console.log(`There was an error with the request ${error}`);
            })
        })

    </script>
</body>
```

Now we’re ready to run the program!
1. Save your .html document.
2. Open the .html file in a web browser.
3. Open the developer tools of your web browser to view the console. 

When the script loads, a `ChangeLED` command is sent to Misty, and a message about the results of the command appears in the console. **Congratulations!** You have just written your first program using Misty’s remote command interface!

### Full Sample

See the full .html document for reference.

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Remote Command Tutorial 1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Reference a link to a CDN for Axios here -->
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
	<script>
        // Declare a constant variable and set its value to a string with your robot's IP address.
		const ip = "<robotipaddress>";

        // Assemble the data to send with your POST request. Set values for each RGB color property.
		let data = {
			"red": 255,
			"green": 0,
			"blue": 0
		};

        // Call axios.post(), passing the URL of the ChangeLED endpoint as the first parameter, and the payload (the data object) as the second.
        axios.post("http://" + ip + "/api/led/change", data)
            // Chain then() after calling post(). Pass a callback function to interpret the return values of the POST call and print a message to the console about whether the request was a failure or a success.
			.then(function (response) {
				// log the result
				console.log(`ChangeLED was a ${response.data[0].status}`);
            })
            // Chain a catch() method after then(). catch() triggers if the promise is rejected. Pass a callback to catch() to print any errors returned by the request to the console.
			.catch(function (error) {
				// log the error
				console.log(`There was an error with the request ${error}`);
			});
	</script>
</body>
</html>
```



## Tutorial 2: Using Sensors, WebSockets, and Locomotion

In this tutorial, we’ll write a skill that commands Misty to drive in a straight line for a designated period of time and stop if she encounters an object in her path. We’ll do this by combining Misty’s `DriveTime` locomotion command with information received from the `TimeOfFlight` and `LocomotionCommand` WebSocket data streams. In this tutorial, you’ll learn:
* How to subscribe to data from Misty’s WebSockets
* How to use the `lightSocket.js` helper tool
* How to write callbacks that allow Misty to make decisions about what to do in different situations by using WebSocket data

Before you write any code, connect Misty to your home network and make sure you know her IP address. You can see how to get this information in the first tutorial above.

### Setting Up Your Project

In addition to Axios, this project uses the `lightSocket.js` helper tool to simplify the process of subscribing to Misty’s WebSocket streams. You can download this tool from our [GitHub repository](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript). Save the `lightSocket.js` file to a “tools” or “assets” folder in your project.

To set up your project, create a new .html document. Give it a title, and include references to `lightSocket.js` and a CDN for the Axios library in the `<head>` section. We write the code for commanding Misty within `<script>` tags in the `<body>` section of this document.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Remote Command Tutorial 2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Include references to a CDN for the Axios library and the local path where lightSocket.js is saved in the <head> of your document -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="<local-path-to-lightSocket.js"></script>
    </head>
<body>
    <script>
    // The code for commanding Misty will go here!
    </script>
</body>
``` 

### Writing the Code

Within `<script>` tags in the `<body>` of your document, declare a constant variable `ip` and set its value to a string with your robot’s IP address. We use this variable to send commands to Misty.

```html
<body>
    <script>

    // Declare a constant variable and set its value to a string with your robot’s IP address.
    const ip = "<robotipaddress>";

    </script>
</body>

```

#### Opening a Connection

Create a new instance of `LightSocket`  called `socket`. The `socket` instance takes as parameters the IP address of your robot and two optional callback functions. The first callback triggers when a connection is opened, and the second triggers when it’s closed. Pass `ip` and a function called `openCallback` to the new instance of `LightSocket`. Below these declarations, declare the `openCallback` function.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    // Create a new instance of LightSocket called socket. Pass as arguments the ip variable and a function named openCallback.
    let socket = new LightSocket(ip, openCallback);

    /* COMMANDS */

    // Define the function passed as the callback to the new instance of LightSocket. This is the code that executes when socket opens a connection to your robot.
    function openCallback() {

    }

    </script>
</body>
```

Once a connection is opened, we want to do three things:
* Subscribe to the `TimeOfFlight` WebSocket.
* Subscribe to the `LocomotionCommand` WebSocket.
* Send Misty a `DriveTime` command.

We write the code for this inside the `openCallback` function.

#### Subscribing to WebSockets

Let's start by subscribing to Misty’s `TimeOfFlight` and `LocomotionCommand` WebSocket connections.

The `TimeOfFlight` WebSocket sends data from the time-of-flight (TOF) sensors around Misty’s base. These sensors tell Misty how far objects are away from her, or if she's about to drive off a ledge. For this program, we’re interested in receiving data from Misty’s front center TOF sensor. This sensor points straight forward in Misty’s direction of travel.

The instance of `LightSocket` we’ve created (called `socket`) uses the `Subscribe` method to subscribe to Misty’s WebSockets. The `Subscribe` method takes 8 parameters.

```JavaScript
socket.Subscribe(eventName, msgType, debounceMs, property, inequality, value, [returnProperty], [eventCallback])
```

Note that many of these parameters correlate with the values required in `subscribeMsg`, described in the documentation [here](https://docs.mistyrobotics.com/onboarding/creating-skills/writing-skill/#subscribing-amp-unsubscribing-to-a-websocket). `LightSocket` uses the parameters you pass to it to generate a message similar to this.

To subscribe to the data stream from `TimeOfFlight`, call the `Subscribe()` method on `socket`. Pass the following for each parameter:

1. `eventName` is a string that designates the name you would like to give this event. This name should be unique, and should give a clue as to the function the event serves. Let’s call our event `"CenterTimeOfFlight"`.
2. `msgType` is a string that specifies the WebSocket to subscribe to. We’re subscribing to Misty’s `"TimeOfFlight"` WebSocket.
3. `debounceMs` specifies how often in milliseconds Misty should send a message with `TimeOfFlight` data. Enter `100` to receive a message every tenth of a second. (At the speed Misty will be traveling, this should be should be precise enough for us to be able to execute a `Stop` command before Misty collides with an object in her path.)
4. `property` is a string that specifies which property of the event to look at. We’ll be filtering by `“SensorPosition”`.
5. `inequality` is a string that sets the comparison operator for your filter. We’ll use `"=="`.
6. `value` is a string that defines the value of the property to check against. We want to receive information for TOF sensors where the value of the `"SensorPosition"` property is `”Center”`. 
7. `returnProperty` is an optional parameter. We won’t need this; enter `null`.
8. `eventCallback` is the callback function that triggers when WebSocket data is received. We’ll name this function `_centerTimeOfFlight`, which corresponds to the name we provided for this event. We’ll write the code for this function in the **Callbacks** section of this tutorial.

**Note:** The `property`, `inequality`, and `value` parameters describe a comparison statement. Use these to specify which data from the event to receive.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* COMMANDS */

    function openCallback() {

        // Subscribe to a new event called "CenterTimeOfFlight" that returns data when "TimeOfFlight" events are triggered. Pass arguments to make sure this event returns data for the front center time-of-flight sensor every 100 milliseconds. Pass the callback function _centerTimeOfFlight as the final argument.
        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);
    }

    </script>
</body>
```

The `LocomotionCommand` WebSocket sends data every time the robot’s linear or angular velocity changes (see the documentation [here](https://docs.mistyrobotics.com/onboarding/creating-skills/writing-skill/#websocket-types-amp-sample-data) for more information). We use this WebSocket to learn when Misty has stopped moving.

As with `TimeOfFlight`, we need to pass eight parameters to `socket.Subscribe()` to receive data from `LocomotionCommand`. However, because we only want to know whether Misty’s movement has changed, we don’t need to filter our results to specific event properties. We only need to pass arguments for `eventName` (`“LocomotionCommand”`), the WebSocket name (also `”LocomotionCommand”`), and the `eventCallback` function, which we call `_locomotionCommand`. Enter `null` for all of the other parameters.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        // Subscribe to a new event called "LocomotionCommand" that returns data when Misty's angular or linear velocity changes. Pass the callback function _locomotionCommand as the final argument.
        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

    }
    </script>
</body>
```

#### Sending Commands

After we’ve subscribed to these WebSockets, we issue the command for Misty to drive by using Axios to send a POST request to the `DriveTime` endpoint. This endpoint accepts values for three properties: `LinearVelocity`, `AngularVelocity`, and `TimeMS`. Inside the `OpenCallback` function, create a data `object` with the following key/value pairs to send with the REST command:
* Set the `LinearVelocity` to `50` to tell Misty to drive forward at a moderate speed.
* Set `AngularVelocity` to `0`, so Misty drives straight without turning.
* Set `TimeMS` to `5000` to specify that Misty should drive for five seconds. 

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        // Assemble the data to send with the DriveTime command.
        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

    }
    </script>
</body>
```

**Note:** You can learn more about `DriveTime` and how the parameters affect Misty’s movement in the API section of this documentation.

Pass the URL for the `DriveTime` command along with this `data` object to the `axios.post()` method. Use a `then()` method to handle a successful response and `catch()` to handle any errors.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        // Use axios.post() to send the data to the DriveTime REST API endpoint.
        axios.post("http://" + ip + "/api/drive/time", data)
            // Chain .then() to handle a successful response.
            .then(function (response) {
                // Print the results of the DriveTime command to the console.
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            // Chain .catch() to handle errors.
            .catch(function (error) {
                // Print any errors related to the DriveTime command to the console.
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

#### Setting up Callbacks
Now that we’ve written the code that subscribes to the WebSocket connections and send the `DriveTime` command, we’re ready to write the callback functions `_centerTimeOfFlight` and `_locomotionCommand`. These functions trigger when Misty sends data for the events we’ve subscribed to.

Let’s start with `_centerTimeOfFlight`, the callback function passed to `Subscribe()` for the `TimeOfFlight` WebSocket connection. We’ve subscribed to the `CenterTimeOfFlight` event in order to examine incoming data and tell Misty what to do when she detects an object in her path. Data from this WebSocket is passed directly into the `_centerTimeOfFlight` callback function. `_centerTimeOfFlight` should parse this data and send Misty a `Stop` command if an object is detected in her path.

Let’s define our callbacks above the section where we’ve written our commands. Create a function called `_centerTimeOfFlight` with a single parameter called `data`. This parameter represents the data passed to Misty when the `CenterTimeOfFlight` event triggers.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    // Define the callback function that will be passed when we subscribe to the CenterTimeOfFlight event.
    let _centerTimeOfFlight = function (data) {

    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

When you subscribe to an event, some messages come through that don’t contain event data. These are typically registration or error messages. To ignore these messages, we write the code for our callback function in `try` and `catch` statements. 

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        // Use try and catch statements to handle exceptions and unimportant messages from the WebSocket data stream.
        try {

        };
        catch(e){

        };
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

Inside the `try` statement, instantiate a `distance` variable. `distance` stores a value representing the distance from Misty in meters an object has been detected by her front center time-of-flight sensor. This value is stored in the `data` response at `data.message.distanceInMeters`. Log `distance` to the console.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        try {
            // Instantiate a distance variable to store the value representing the distance from Misty in meters an object has been detected by her front center time-of-flight sensor. 
            let distance = data.message.distanceInMeters;
            // Log this distance to the console.
            console.log(distance);
        };
        catch(e){

        };
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

We only want Misty to stop when `distance` is a very small value, indicating she is very close to an object. To do this, write an `if` statement to check if `distance < 0.2`. The `if` statement does nothing if `distance` is not a value greater than `0.2` meters, and if `distance` is `undefined`, an exception occurs and is passed to the `catch` statement. This is the case when registration or error messages are received through the WebSocket. By using a `try` statement, our callback functions behave appropriately when the “right” messages come through, and continue execution if they cannot act on the data they receive.

If `distance` is a value less than `0.2`, use Axios to issue a POST request to the endpoint for the `Stop` command: `"http://" + ip + "/api/drive/stop"`. This endpoint does not require parameters, so we can omit the second parameter of `axios.post()`. Chain `.then()` and `catch()` methods to log a successful response or catch any potential errors.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        try {
            let distance = data.message.distanceInMeters;
            console.log(distance);
            // Write an if statement to check if the distance is smaller than 0.2 meters.
            if (distance < 0.2) {
                // If the distance is shorter than 
                axios.post("http://" + ip + "/api/drive/stop")
                    .then(function (response) {
                        // Print the results of the Stop command to the console.
                        console.log(`Stop was a ${response.data[0].status}`);
                    })
                    .catch(function (error) {
                        // Print errors related to the Stop command to the console.
                        console.log(`There was an error with the request ${error}`);
                    });
				}
        };
        catch(e){

        };
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

The `_centerTimeOfFlight` callback triggers every time data from Misty’s front center sensor is received. If an object is detected close enough to the sensor, a `Stop` command is issued, and Misty stops before colliding with the object.

The purpose of the `_locomotionCommand` callback function is to “clean up” our skill when the program stops executing. Whenever you subscribe to a WebSocket, you should unsubscribe when you are done with it, so Misty stops sending data. The program we're writing can end in two ways:

* Misty stops driving when she detects an object in her path.
* Misty does not detect an object in her path and stops driving after five seconds.

The `LocomotionCommand` event sends data whenever linear or angular velocity changes, including when Misty starts moving when the program starts. We want to unsubscribe from our WebSockets when Misty stops **and** the value of `LinearVelocity` is `0`. Declare a function called `_locomotionCommand`, and pass it a parameter for the `data` received in the `LocomotionCommand` data stream. We only want to unsubscribe when Misty stops, so we add the condition that `linearVelocity` should be `0` to an `if` statement. As with the `_centerTimeOfFlight` callback, place this condition inside a `try` statement, and place a `catch` statement to handle exceptions at the end of the function.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        try {
            let distance = data.message.distanceInMeters;
            console.log(distance);
            if (distance < 0.2) {
                axios.post("http://" + ip + "/api/drive/stop")
                    .then(function (response) {
                        console.log(`Stop was a ${response.data[0].status}`);
                    })
                    .catch(function (error) {
                        console.log(`There was an error with the request ${error}`);
                    });
				}
        };
        catch(e){

        };
    };

    // Define the callback function that will be passed when we subscribe to the LocomotionCommand event.
    let _locomotionCommand = function (data) {
        // Use try and catch statements to handle exceptions and unimportant messages from the WebSocket data stream.
        try {
            // Use an if statement to check if Misty has stopped moving
            if (data.message.linearVelocity === 0) {
            }
        }
        catch(e) {}
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

If `data.message.linearVelocity === 0`, the program should unsubscribe from the WebSockets we’ve opened. Write commands to unsubscribe from the `DriveTime` and `LocomotionCommand` WebSockets, and log a message to the console so you can verify that this only happens when `linearVelocity` is indeed `0`.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        try {
            let distance = data.message.distanceInMeters;
            console.log(distance);
            if (distance < 0.2) {
                axios.post("http://" + ip + "/api/drive/stop")
                    .then(function (response) {
                        console.log(`Stop was a ${response.data[0].status}`);
                    })
                    .catch(function (error) {
                        console.log(`There was an error with the request ${error}`);
                    });
				}
        };
        catch(e){

        };
    };

    let _locomotionCommand = function (data) {
        try {
            if (data.message.linearVelocity === 0) {
                // Print a message to the console for debugging.
                console.log("LocomotionCommand received linear velocity as", data.message.linearVelocity);
                // Unsubscribe from the CenterTimeOfFlight and LocomotionCommand events.
                socket.Unsubscribe("CenterTimeOfFlight");
                socket.Unsubscribe("LocomotionCommand");                
            }
        }
        catch(e) {}
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

    </script>
</body>
```

### Putting It All Together

At the bottom of the script, call `socket.Connect()`. When the connection is established, the `OpenCallback` function executes to subscribe to WebSockets and send Misty a `DriveTime` command. Data received through these WebSockets is passed to the `_centerTimeOfFlight` and `_locomotionCommand` callback functions.

```html
<body>
    <script>

    const ip = "<robotipaddress>";

    let socket = new LightSocket(ip, openCallback);

    /* CALLBACKS */

    let _centerTimeOfFlight = function (data) {
        try {
            let distance = data.message.distanceInMeters;
            console.log(distance);
            if (distance < 0.2) {
                axios.post("http://" + ip + "/api/drive/stop")
                    .then(function (response) {
                        console.log(`Stop was a ${response.data[0].status}`);
                    })
                    .catch(function (error) {
                        console.log(`There was an error with the request ${error}`);
                    });
				}
        };
        catch(e){

        };
    };

    let _locomotionCommand = function (data) {
        try {
            if (data.message.linearVelocity === 0) {
                console.log("LocomotionCommand received linear velocity as", data.message.linearVelocity);
                socket.Unsubscribe("CenterTimeOfFlight");
                socket.Unsubscribe("LocomotionCommand");                
            }
        }
        catch(e) {}
    };

    /* COMMANDS */

    function openCallback() {

        socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);

        socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

        let data = {
            LinearVelocity: 50,
            AngularVelocity: 0,
            TimeMS: 5000
        };

        axios.post("http://" + ip + "/api/drive/time", data)
            .then(function (response) {
                console.log(`DriveTime was a ${response.data[0].status}`);
            })
            .catch(function (error) {
                console.log(`There was an error with the request ${error}`);
            });
    };

        // Open the connection to your robot. When the connection is established, the OpenCallback function executes to subscribe to WebSockets and send Misty a DriveTime command. Data recieved through these WebSockets is passed to the _centerTimeOfFlight and _locomotionCommand callback functions.
        socket.Connect();

    </script>
</body>
```


**Congratulations!** You’ve just written another skill for Misty. Save your .html document and open it in a web browser to watch Misty go. When the document loads, the program:
* Connects with Misty.
* Sends a `DriveTime` command for Misty to drive forward for 5 seconds.
* Subscribes to `TimeOfFlight` events to detect if an object is in Misty’s path and sends a `Stop` command if so.
* Subscribes to `LocomotionCommand` to detect when Misty has come to a stop and unsubscribes from the WebSocket connections.

### Full Sample

See the full .html document for reference.

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Remote Command Tutorial 2</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Include references to a CDN for the Axios library and the local path where lightSocket.js is saved in the <head> of your document -->
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script src="<local-path-to-lightSocket.js>"></script>
</head>
<body>
	<script>
		// Declare a constant variable and set its value to a string with your robot’s IP address.
		const ip = "<robotipaddress>";

        // Create a new instance of LightSocket called socket. Pass as arguments the ip variable and a function named openCallback.
		let socket = new LightSocket(ip, openCallback);

        /* CALLBACKS */
        
        // Define the callback function that will be passed when we subscribe to the CenterTimeOfFlight event.
		let _centerTimeOfFlight = function (data) {

            // Use try and catch statements to handle exceptions and unimportant messages from the WebSocket data stream.
			try {
                // Instantiate a distance variable to store the value representing the distance from Misty in meters an object has been detected by her front center time-of-flight sensor. 
                let distance = data.message.distanceInMeters;
                // Log this distance to the console.
                console.log(distance);
                
                // Write an if statement to check if the distance is smaller than 0.2 meters.
				if (distance < 0.2) {
                    // If the distance is shorter than 
					axios.post("http://" + ip + "/api/drive/stop")
						.then(function (response) {
							// Print the results of the Stop command to the console.
							console.log(`Stop was a ${response.data[0].status}`);
						})
						.catch(function (error) {
							// Print errors related to the Stop command to the console.
							console.log(`There was an error with the request ${error}`);
						});
				}
            }
			catch (e) {
			}
        };
        
        // Define the callback function that will be passed when we subscribe to the LocomotionCommand event.
		let _locomotionCommand = function (data) {
            // Use try and catch statements to handle exceptions and unimportant messages from the WebSocket data stream.
			try {
				// Use an if statement to check if Misty has stopped moving
				if (data.message.linearVelocity === 0) {
                    // Print a message to the console for debugging.
					console.log("LocomotionCommand received linear velocity as", data.message.linearVelocity);
                    // Unsubscribe from the CenterTimeOfFlight and LocomotionCommand events.
                    socket.Unsubscribe("CenterTimeOfFlight");
					socket.Unsubscribe("LocomotionCommand");
				}
			}
			catch(e) {}
        };
        
        /* COMMANDS */

        // Define the function passed as the callback to the new instance of LightSocket. This is the code that executes when socket opens a connection to your robot.
		function openCallback() {

            // Print a message to the console when the connection is established.
			console.log("socket opened");

            // Subscribe to a new event called "CenterTimeOfFlight" that returns data when "TimeOfFlight" events are triggered. Pass arguments to make sure this event returns data for the front center time-of-flight sensor every 100 milliseconds. Pass the callback function _centerTimeOfFlight as the final argument.
			socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "==", "Center", null, _centerTimeOfFlight);
            
            // Subscribe to a new event called "LocomotionCommand" that returns data when Misty's angular or linear velocity changes. Pass the callback function _locomotionCommand as the final argument.
            socket.Subscribe("LocomotionCommand", "LocomotionCommand", null, null, null, null, null, _locomotionCommand);

			// Assemble the data to send with the DriveTime command.
			let data = {
				LinearVelocity: 50,
				AngularVelocity: 0,
				TimeMS: 5000
			};

            // Use axios.post() to send the data to the DriveTime REST API endpoint.
            axios.post("http://" + ip + "/api/drive/time", data)
                // Chain .then() to handle a successful response.
				.then(function (response) {
					// Print the results of the DriveTime command to the console.
					console.log(`DriveTime was a ${response.data[0].status}`);
                })
                // Chain .catch() to handle errors.
				.catch(function (error) {
					// Print any errors related to the DriveTime command to the console.
					console.log(`There was an error with the request ${error}`);
				});
		};

        // Open the connection to your robot. When the connection is established, the OpenCallback function executes to subscribe to WebSockets and send Misty a  DriveTime command. Data recieved through these WebSockets is passed to the _centerTimeOfFlight and _locomotionCommand callback functions.
		socket.Connect();
	</script>
</body>
</html>
```


## Working with the API Explorer Code

You can use the code and examples in the [API Explorer download package](https://s3.amazonaws.com/misty-releases/api-explorer/latest/api-explorer.zip) to help you build skills.

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


