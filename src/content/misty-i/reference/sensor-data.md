---
title: Sensor & Skill Data Types
layout: coding-misty-i.hbs
columns: three
order: 3
---

# {{title}}

The following are Misty’s available sensor and skill data types. You receive this data when you register for events using Misty's on-robot JavaScript API or when you subscribe to a WebSocket connection from an external device.

You can filter all data types to (a) return only a specified subset of the data and (b) check current values before the data is sent.

**Note**: All of Misty's sensor & skill data structures are subject to change.

**Important:** If your Misty is using the `Current` version of Misty's WebSocket system, WebSocket event messages do not include `SensorName` or `Type` key/value pairs. Use Misty's [GetWebsocketVersion](../../../misty-i/reference/rest/#getwebsocketversion) command to find out which version your robot is using, and use [SetWebsocketVersion](../../../misty-i/reference/rest/#setwebsocketversion) to switch versions.

## TimeOfFlight

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

## FaceRecognition (Beta)

You can subscribe to the ```FaceRecognition``` WebSocket to obtain data on both face detection and face recognition events.

The ```EventName``` value is the name you provide when you register the WebSocket connection.  

If face recognition is running on the robot, and a previously trained face is recognized, the ```PersonName``` value is the name previously assigned to that face. The ```PersonName``` value is ```unknown_person``` if an untrained/unknown face is detected. The ```PersonName``` value is ```null``` if face recognition is not currently running.

```TrackId``` is reserved data that may change in the future.

Sample FaceRecognition data for a face recognition event:
```javascript
FaceRecognition{
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
	"Type":"FaceRecognition"
}
```

## LocomotionCommand

`LocomotionCommand` WebSocket data is sent every time the linear or angular velocity of the robot changes. It is not sent at timed intervals.

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

## HaltCommand

```HaltCommand``` WebSocket data is sent every time the robot stops and contains the date and time of the event. It is not sent at timed intervals.

## SelfState

The ```SelfState``` WebSocket provides a variety of data about Misty’s current internal state, including:

* battery charge, voltage, and charging status
* IP address
* affect
* position and orientation ("pose")
* SLAM status
* sensor messages


{{box op="start" cssClass="boxed noteBox"}}
**Note:** There are a number of fields in the WebSocket data structure that are reserved for future use and which may be empty or contain ```null``` data:

* ```Acceleration```
* ```BumpedState```
* ```CurrentGoal```
* ```MentalState```
* ```Personality```
* ```PhysiologicalBehavior```
{{box op="end"}}

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

## WorldState

The ```WorldState``` WebSocket sends data about the environment Misty is perceiving, including:
* the locations of perceived objects
* the times they were perceived

```WorldState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```WorldState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the ```lightSocket.js``` JavaScript helper.

## BatteryCharge
The `BatteryCharge` data stream provides information about the state of Misty's battery, including charge percentage, voltage, and charging status. By default, the `BatteryCharge` data stream sends messages at timed intervals of five seconds.

Sample `BatteryCharge` data:

```json
BatteryCharge {
    "eventName": "BatteryCharge",
    "message": {
        "capacitymAh": 0,
        "chargePercent": 0,
        "created": "2019-04-30T15:37:17.0291086Z",
        "currentmAh": 0,
        "isCharging": false,
        "lastChargeCapacity": 0,
        "maxMeasuredCapacity": 0,
        "numberOfChargeCycles": 0,
        "sensorId": "charge",
        "state": "Unknown",
        "temperature": 0,
        "trained": false,
        "voltage": 11.895
    }
}
```

## AudioPlayComplete

`AudioPlayComplete` WebSocket data is sent every time Misty finishes playing an audio file. It is not sent at timed intervals.

```json
AudioPlayComplete {
    "eventName":"AudioPlayComplete",
    "message":{
        "created":"2019-04-08T20:54:36.7051135Z",
        "metaData":{
            "directory":"Idle",
            "duration":0,
            "name":"002-Ahhh.wav",
            "vad":[0,0,-0.5]
        }
    }
}
```

## SkillData

Subscribe to the `SkillData` named object to see debug messages, error messages, and other data on-robot skills publish during skill execution. Use the `misty.Debug()` command in a skill to send a `SkillData` message.

The value of the `BroadcastMode` parameter in a skill's .json meta file determines when the skill sends `SkillData` messages, and what kind of data those messages include.

* `Off` - The skill does not send `SkillData` messages.
* `Debug` - The skill prints error and debug messages to `SkillData` events.
* `Verbose` - In addition to error and debug messages, the skill sends a message for each command that Misty receives to `SkillData` events.

When you connect Misty to the Skill Runner to start and stop skills, the web page subscribes to `SkillData` events and skill messages print to the console in your web browser. You can create your own subscription to `SkillData` messages by connecting to Misty's WebSocket server.

**SkillData Message Examples**

This sample shows the `SkillData` message sent when a skill executes the `misty.Debug()` command with the string `"Hello, world!"`:
```json
{
  "eventName": "SkillData",
  "message": {
    "data": {
      "data": "Hello, world!"
    },
    "message": "Calling command 'Debug'",
    "timestamp": "2019-04-28T22:29:33.0441867Z",
    "truncated": false
  }
}
```

This sample shows the `SkillData` message sent when a skill executes a `misty.SendExternalRequest()` command. The `message.data` object provides information about the values passed in for the command's arguments.

```json
{
  "eventName": "SkillData",
  "message": {
    "data": {
      "method": "GET",
      "resource": "http://soundbible.com/grab.php?id=1949&type=mp3",
      "authorizationType": "null",
      "token": "null",
      "arguments": "null",
      "save": true,
      "apply": true,
      "fileName": "sound",
      "callback": "null",
      "callbackRule": "null",
      "skillToCall": "null",
      "prePauseMs": 0,
      "postPauseMs": 0
    },
    "message": "Calling command 'SendExternalRequest'",
    "timestamp": "2019-04-28T22:29:33.0285627Z",
    "truncated": false
  }
}
```

### Subscribing to SkillData Events

To subscribe to `SkillData` events, you open a WebSocket connection to Misty and send a subscription message to the `SkillData` named object.

This example shows how to subscribe to `SkillData` events in a web page using the [WebSocket API](https://developer.mozilla.org/en-US/docs/web/api/WebSockets_API). In the example, `SkillData` messages print to the web browser's console.

```javascript
//Misty's IP address
const ip = "<robot-ip-address>";

function streamSkillData() {
    //Open a WebSocket connection to Misty
    const ws = new WebSocket("ws://" + ip + "/pubsub");

    //Send a message to subscribe to SkillData events
    ws.onopen = function(event) {
        ws.send(JSON.stringify(
            {
            "Operation": "subscribe",
            "Type": "SkillData",
            "DebounceMs": null,
            "EventName": "SkillData",
            "Message": "",
            "ReturnProperty": null
            }
        ));
    }

    //Parse and log SkillData messages
    ws.onmessage = function(event) {
        var data = event.data
        console.log(data);
    };
};

streamSkillData();
```

Before you close the WebSocket connection, send a message to unsubscribe to `SkillData` events. You cannot set up a `SkillData` subscription when there is an open subscription with the same `EventName` you are trying to subscribe to.

```javascript
ws.send(JSON.stringify(
    {
    "Operation": "unsubscribe",
    "EventName": "SkillData",
    "Message": ""
    }
));
ws.close();
```