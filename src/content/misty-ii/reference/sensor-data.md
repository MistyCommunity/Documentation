---
title: Sensor & Skill Data Types
layout: coding.hbs
columns: three
order: 3
---

# {{title}}

The following are Misty’s available sensor and skill data types. You receive this data when you register for events using Misty's on-robot JavaScript API or when you subscribe to a WebSocket connection from an external device.

You can filter all data types to (a) return only a specified subset of the data and (b) check current values before the data is sent.

**Note**: All of Misty's sensor & skill data structures are subject to change.

**Important:** If your Misty is using the `Current` version of Misty's WebSocket system, WebSocket event messages do not include `SensorName` or `Type` key/value pairs. Use Misty's [GetWebsocketVersion](../../../misty-ii/reference/rest/#getwebsocketversion) command to find out which version your robot is using, and use [SetWebsocketVersion](../../../misty-ii/reference/rest/#setwebsocketversion) to switch versions.

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

## FaceRecognition

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

## WorldState

The ```WorldState``` WebSocket sends data about the environment Misty is perceiving, including:
* the locations of perceived objects
* the times they were perceived

```WorldState``` WebSocket messages are sent even if the data has not changed, as the data is sent via timed updates, instead of being triggered by events. The ```WorldState``` WebSocket can send data as frequently as every 100ms, though it is set by default to 250ms. To avoid having to handle excess data, you can change the message frequency for the WebSocket with the ```DebounceMs``` field, as shown in the ```lightSocket.js``` JavaScript helper.

## BatteryCharge

The `BatteryCharge` data stream provides information about the state of Misty's battery, including charge percentage, voltage, and charging status. By default, the `BatteryCharge` data stream sends messages at timed intervals of five seconds.

Sample `BatteryCharge` data:

```JSON
{
  "eventName": "BatteryChargeEvent",
  "message": {
    "chargePercent": null,
    "created": "2019-07-23T16:49:27.558817Z",
    "current": -0.441,
    "healthPercent": null,
    "isCharging": false,
    "sensorId": "charge",
    "state": "Discharging",
    "temperature": 83,
    "trained": false,
    "voltage": 8.203
  }
}
```

## ActuatorPosition

The `ActuatorPosition` data stream provides information about the position of the actuators responsible for controlling the movement of Misty's head and arms. `ActuatorPosition` data is sent at timed intervals you define when you register for `ActuatorPosition` messages.

In the `ActuatorPosition` data object, the value of the `sensorName` property is the name of the actuator you are receiving information about (`Actuator_HeadPitch`, `Actuator_HeadYaw`, `Actuator_HeadRoll`, `Actuator_LeftArm`, or `Actuator_RightArm`).  The `value` property holds a number indicating the position of the actuator (in degrees).

**Note:** When you subscribe to the `ActuatorPosition` data stream, you should specify which actuator you want to receive messages about. For example, the following code from Misty's on-robot JavaScript API shows how to use a property comparison test to get data from the sensor for the actuator responsible for controlling the movement of Misty's right arm:

```JavaScript
// Register for ActuatorPosition data for the actuator for Misty's right arm
misty.AddPropertyTest("ActuatorPosition", "sensorName", "==", "Actuator_RightArm", "string");
misty.RegisterEvent("ActuatorPosition", "ActuatorPosition", 1000, true);

// Callback function that triggers each time ActuatorPosition data is sent
function _ActuatorPosition(data) {
// Do something with the data
}
```

Sample `ActuatorPosition` data:

```JSON
ActuatorPosition {
    "eventName": "ActuatorPosition",
    "message": {
        "actuatorId": "NBQEA0",
        "created": "2019-01-09T20:15:38.0870356Z",
        "expiry": "2019-01-09T20:15:39.0870356Z", 
        "sensorId": "ala",
        "sensorName": "Actuator_LeftArm",
        "value":-5.09
    },
    "type":"ActuatorPosition"
}
```

## BumpSensor

The `BumpSensor` data stream sends information each time one of the bump sensors on Misty's base is pressed or released. In the `BumpSensor` data object, the value of the `sensorName` property is the name of the bump sensor that triggered the event (`Bump_FrontRight`, `Bump_FrontLeft`, `Bump_RearRight`, or `Bump_RearLeft`). The value of the `isContacted` property is a boolean indicating whether the bump sensor was pressed (`true`) or released (`false`).The `BumpSensor` data object also provides “pose” information about Misty at the time of the event. For more about pose, see the [mapping section of the Command Center documentation](../../../tools-&-apps/web-based-tools/command-center/#navigation-alpha).

For an example that shows how to register for and use data from `BumpSensor` events with Misty's on-robot JavaScript API, see the [Bump Sensors skill tutorial](../../../misty-ii/coding-misty/local-skill-tutorials/#bump-sensors).

Sample `BumpSensor` data:

```JSON
BumpSensor {
    "eventName": "BumpSensor",
    "message": {
        "created": "2019-01-09T20:32:27.1036178Z",
        "expiry": "2019-01-09T20:32:27.2286178Z",
        "isContacted": true,
        "pose": {
            "bearing": -0.5585993432483588,
            "created": "2019-01-09T16:36:46.7089139Z",
            "distance": 0.14150971628586034,
            "elevation": 0,
            "frameId": "RobotBaseCenter",
            "framesProvider": {
                "rootFrame": {
                    "created": "2019-01-09T16:36:46.6151597Z",
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
                "bearing": -0.5585993432483588,
                "distance": 0.14150971628586034,
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
                "x": 0.11999999731779099,
                "y": -0.07500000298023224,
                "yaw": 0,
                "z": 0
            },
            "pitch": 0,
            "roll": 0,
            "x": 0.11999999731779099,
            "y": -0.07500000298023224,
            "yaw": 0,
            "z": 0
        },
        "sensorId": "bfr",
        "sensorName": "Bump_FrontRight"
    },
    "type":"BumpSensor"
}
```

## DriveEncoders

The `DriveEncoders` data stream provides information about the angular velocity (in degrees per second) and rotation (in degrees) for Misty's left and right encoders. `DriveEncoders` data is sent at timed intervals you define when you register for `DriveEncoders` messages.

Sample `DriveEncoders` sensor data:

```JSON
{
  "eventName": "DriveEncodersEvent",
  "message": {
    "created": "2019-07-23T16:54:05.7372361Z",
    "leftDistance": 626,
    "leftVelocity": 249,
    "rightDistance": 676,
    "rightVelocity": 247,
    "sensorId": "enc"
  }
}
```

## IMU

The IMU data stream provides information from Misty's Inertial Measurement Unit (IMU) sensor. It includes information about:
* the pitch, yaw, and roll orientation angles of the sensor (in degrees)
* the force (in meters per second) currently applied to the sensor along its pitch, yaw, and roll rotational axes
* the force (in meters per second squared) currently applied to the sensor along its X, Y, and Z axes

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's IMU orients its heading to 0/360 degrees each time Misty boots up or resets her real-time controller. For Misty, a `yaw` value of 0/360 degrees does **not** represent true north unless Misty is facing true north when the IMU orients its heading. Additionally, because the IMU is located in Misty's torso, readings from the IMU only change when Misty's body moves. They do not change relative to the position of Misty's head.
{{box op="end"}}

`IMU` message properties:

* `pitch` (double) - Misty's orientation on her pitch rotational axis (in degrees). A positive number means Misty is pitched at an angle forward, and a negative number means she is pitched back.
* `roll` (double) - Misty's orientation on her roll rotational axis (in degrees). A positive number means Misty is tipped at an angle to her right, and a negative number means she is tipped to her left.
* `yaw` (double) - Misty's orientation on her yaw rotational axis (in degrees). (Use this value to determine Misty's current heading when sending `DriveHead` commands.) A positive number means Misty is rotated to the left, and a negative number means she is rotated to the right.
* `pitchVelocity` (double) - The force (in meters per second) currently applied to Misty along her `pitch` rotational axis.
* `rollVelocity` (double) - The force (in meters per second) currently applied to Misty along her `roll` rotational axis.
* `yawVelocity` (double) - The force (in meters per second) currently applied to Misty along her `yaw` rotational axis.
* `xAcceleration` (double) - The force (in meters per second squared) currently applied to Misty along her `x` axis. A positive value means Misty is accelerating forward, and a negative value means she is accelerating backward.
* `yAcceleration` (double) - The force (in meters per second squared) currently applied to Misty along her `y` axis. A positive value means Misty is accelerating to her left, and a negative value means she is accelerating to her right.
* `zAcceleration` (double) - The force (in meters per second squared) currently applied to Misty along her `z` axis. A positive value means Misty is accelerating up, and a negative value means Misty is accelerating down. When Misty is set on a level surface, this value should be a negative number that indicates the force of gravity on Misty's IMU sensor.

```JSON
IMU {
    "eventName": "IMU",
    "message": {
        "created": "2019-01-09T21:47:53.7607457Z",
        "expiry": "2019-01-09T21:47:54.1607457Z",
        "pitch":11.193,
        "pitchVelocity": 0.057,
        "roll": 2.468,
        "rollVelocity": -0.1,
        "sensorId": "imu",
        "sensorName": null,
        "xAcceleration": 0.75,
        "yAcceleration": 0.73,
        "yaw": 2.004,
        "yawVelocity": 0.096,
        "zAcceleration": 9.80
    },
    "type":"IMU"
}
```

By default, Misty sends `IMU` data to listeners of `IMU` events once every five seconds.
{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty uses a **right-handed coordinate frame** to determine the value of each property returned in IMU event messages.
{{box op="end"}}

## SerialMessage

The `SerialMessage` data stream provides information sent to Misty by external hardware connected to the ports on her back. `SerialMessage` events trigger when Misty receives data sent through one of these ports.

To send `SerialMessage` data to Misty from an Arduino, use:

```C++
// ARDUINO

Serial.println("<your_data_to_Misty>")
```

Sending data to Misty as a JSON string can make it easier to parse the data in your skill code. This example shows how you can format data from a temperature and pressure sensor connected to an Arduino:

```C++
// ARDUINO

Serial.println("{\"temperature\":\""+String(<temp_value>)+"\",\"pressure\":\""+String(<pressure_value>)+"\"}");
```

Handle this data with Misty's on-robot JavaScript API by registering for `SerialMessage` events. Add `SerialMessage` as an additional return property, and parse the data in the `_SerialMessage()` callback that triggers when the data is ready.

```JavaScript
// MISTY 

// Register for SerialMessage events and add SerialMessage as a return property
misty.AddReturnProperty("SerialMessage", "SerialMessage");
misty.RegisterEvent("SerialMessage", "SerialMessage", 0, true);

function _SerialMessage(data) {
    if(data !== undefined && data !== null) {
        // Parse SerialMessage data and assign it to a variable
        var obj = JSON.parse(data.AdditionalResults[0].Message);
        var temp = obj.temperature;
        var pressure = obj.pressure;
    }
}
```

For more about events and callbacks, see the [Data Handling: Events & Callbacks](../../../misty-ii/coding-misty/local-skill-architecture/#data-handling-events-amp-callbacks) section of [On-Robot JavaScript API Architecture](../../../misty-ii/coding-misty/local-skill-architecture).

## TouchSensor

The `TouchSensor` data stream sends information each time one of the capacitive touch sensors on Misty's head is touched or released. In the `TouchSensor` data object, the value of the `sensorName` property is one of the following strings, indicating which sensor triggered the event:

* `CapTouch_Chin`
* `CapTouch_HeadLeft`
* `CapTouch_HeadRight`
* `CapTouch_HeadBack`
* `CapTouch_HeadFront`
* `CapTouch_Scruff`

The value of the `sensorPosition` property is a string indicating the location of the sensor. This value corresponds with the name of the sensor that triggered the event (i.e. when the `CapTouch_Chin` sensor triggers the event, the value of `sensorPosition` is `Chin`). The value of `isContacted` is a boolean indicating whether the sensor was touched (`true`) or released (`false`). The `TouchSensor` data object also provides “pose” information about Misty at the time of the event. For more about pose, see the [mapping section of the Command Center documentation](../../../tools-&-apps/web-based-tools/command-center/#navigation-alpha).


Sample `TouchSensor` data:

```JSON
TouchSensor{  
    "eventName":"TouchSensor",
    "message":{  
       "created":"2019-01-09T22:55:20.5300385Z",
       "expiry":"2019-01-09T22:55:21.5300385Z",
       "isContacted":true,
       "pose":{  
          "bearing":1.0303768429594167,
          "created":"2019-01-09T20:11:03.2951639Z",
          "distance":0.09899494809418499,
          "elevation":-0.9409567798080669,
          "frameId":"RobotHead",
          "framesProvider":{  
             "rootFrame":{  
                "created":"2019-01-09T20:11:03.2013843Z",
                "id":"RobotBaseCenter",
                "isStatic":true,
                "linkFromParent":{  
                   "isStatic":true,
                   "parentFrameId":"",
                   "transformFromParent":{  
                      "bearing":0,
                      "distance":0,
                      "elevation":0,
                      "pitch":0,
                      "quaternion":{  
                         "isIdentity":true,
                         "w":1,
                         "x":0,
                         "y":0,
                         "z":0
                      },
                      "roll":0,
                      "x":0,
                      "y":0,
                      "yaw":0,
                      "z":0
                   },
                   "transformToParent":{  
                      "bearing":3.141592653589793,
                      "distance":0,
                      "elevation":0,
                      "pitch":0,
                      "quaternion":{  
                         "isIdentity":true,
                         "w":1,
                         "x":0,
                         "y":0,
                         "z":0
                      },
                      "roll":0,
                      "x":0,
                      "y":0,
                      "yaw":0,
                      "z":0
                   }
                }
             }
          },
          "homogeneousCoordinates":{  
             "bearing":1.0303768429594167,
             "distance":0.09899494809418499,
             "elevation":-0.9409567798080669,
             "pitch":-1.399999976158142,
             "quaternion":{  
                "isIdentity":false,
                "w":0.7648422,
                "x":0,
                "y":-0.64421767,
                "z":0
             },
             "roll":0,
             "x":0.029999999329447746,
             "y":0.05000000074505806,
             "yaw":0,
             "z":0.07999999821186066
          },
          "pitch":-1.399999976158142,
          "roll":0,
          "x":0.029999999329447746,
          "y":0.05000000074505806,
          "yaw":0,
          "z":0.07999999821186066
       },
       "sensorId":"cap",
       "sensorName":"CapTouch_HeadLeft",
       "sensorPosition":"HeadLeft"
    },
    "type":"TouchSensor"
 }
```

## AudioPlayComplete

`AudioPlayComplete` WebSocket data is sent every time Misty finishes playing an audio file. It is not sent at timed intervals.

```JSON
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
```JSON
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

```JSON
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

This example shows how to subscribe to `SkillData` events in a web page using the [WebSocket API](https://developer.mozilla.org/en-US/docs/web/API/WebSockets_API). In the example, `SkillData` messages print to the web browser's console.

```JavaScript
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

```JavaScript
ws.send(JSON.stringify(
    {
    "Operation": "unsubscribe",
    "EventName": "SkillData",
    "Message": ""
    }
));
ws.close();
```

## SourceTrackDataMessage - ALPHA

The `SourceTrackDataMessage` named object provides information about the location and volume of the noise or spoken voice that Misty can detect.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty only sends audio localization event messages when she is actively recording audio. When using audio localization data in your skills, you need to call the `misty.StartRecordingAudio()` method in order to receive `SourceTrackDataMessage` or `SourceFocusConfigMessage` event messages.
{{box op="end"}}

Audio localization messages include the following data:
* `DegreeOfArrivalNoise`: An array where each element is a value between 0-360 that indicates the angle of arrival for a noise that Misty detects. This array can contain the degree of arrival noise for up to three unique sounds. Each value in this array represents the degree of arrival for a single sound.
* `DegreeOfArrivalSpeech`: A value between 0-360 that indicates the angle relative to Misty where she detected the loudest voice.
* `TimeOffset`: The time (in milliseconds) that Misty captured the audio sample relative to the start time of the audio recording. Misty records samples at roughly 20hz, or once every 50ms.
* `VoiceActivityPolar`: A 360 element array where each element is a value between 0 and 255 that indicates the level of sound activity detected at a particular angle. The higher the value, the more voice activity detected.
* `VoiceActivitySectors`: A four element array of boolean values indicating whether Misty detected voice activity in a particular sector. Each sector represents a 90 degree wedge of the area surrounding Misty. The front-facing wedge is offset, with Misty's face pointing toward the 45 degree angle down its center.

Sample `SourceTrackDataMessage` response data:

```JSON
{
  "eventName": "SourceTrackDataMessageEvent",
  "message": {
    "degreeOfArrivalNoise": [90],
    "degreeOfArrivalSpeech": 360,
    "timeOffset": 4925,
    "voiceActivityPolar": [6,6,6,5,5,5,5,5,5,4,4,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,3,3,2,2,3,5,6,5,4,4,4,5,6,6,6,7,7,8,8,9,9,9,9,9,10,10,10,10,10,10,9,9,9,10,10,10,9,8,7,7,7,7,8,8,8,7,7,7,6,6,5,5,5,4,4,4,4,3,3,3,2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,3,4,4,5,5,6,6,7,8,8,8,9,9,9,9,9,9,9,9,8,8,8,8,7,7,6,6,5,5,3,2,1,3,4,4,3,2,1,1,2,3,3,4,4,4,4,3,2,1,2,2,3,3,4,4,3,3,2,4,5,5,4,4,4,5,5,5,6,5,5,5,5,4,4,5,5,4,3,3,4,5,5,5,4,4,4,4,4,5,5,4,3,2,1,1,1,1,1,2,2,2,3,3,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,4,4,3,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,3,3,4,5,5,5,6,6,7,8,8,8,8,8,8,8,9,9,9,9,8,8,8,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6],
    "voiceActivitySectors": [false, false,false, false ]
  }
}
```

## SourceFocusConfigMessage - ALPHA

The `SourceFocusConfigMessage` named object provides meta information about the configuration of audio localization data. The system only sends this message once, when Misty starts recording audio.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty only sends `SourceFocusConfigMessage` data once, when she starts recording audio. When using audio localization data in your skills, you need to call the `misty.StartRecordingAudio()` method in order to receive `SourceTrackDataMessage` or `SourceFocusConfigMessage` event messages.
{{box op="end"}}

* `GainStep`: A value that indicates the spatial gain applied to the sector where Misty detects a voice. You can safely ignore this value.
* `SectorsEnabled`: A four element array of boolean values that indicate whether audio localization is enabled for a given sector. At this time, all sectors are enabled be default and cannot be disabled.
* `SectorStartAngles`: A four element array of integer values between 0 - 360 indicating the angle bounding the start of a given sector. Each sector represents a 90 degree wedge of the environment that surrounds Misty. Each sector stops at the angle where the next sector begins. These sectors correspond to the `VoiceActivitySectors` array in the `SourceTrackDataMessage` named object.

Sample `SourceFocusConfigMessage` response data:

```JSON
{
  "eventName": "SourceFocusConfigMessageEvent",
  "message": {
    "gainStep": 65535,
    "sectorsEnabled": [true, true, true, true],
    "sectorStartAngles": [135,45,315,225]
  }
}
```