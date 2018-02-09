---
title: REST API
layout: apis.hbs
columns: two
order: 1
---
# {{title}}

With the REST API, you can send commands from a REST client or browser to control and get information from Misty.

## POST Commands

Use the HTTP POST method via a REST client such as POSTMAN to send a command to Misty:

![POSTMAN example](..\..\..\assets\images\post-example.PNG)

## GET Commands

To retrieve information from Misty, you can either send the HTTP GET command from a browser or use a REST client.

An example of sending a GET method in the browser:

![GET example](..\..\..\assets\images\browser-get-example.PNG)

If using POSTMAN for GET commands, make sure to remove content type from the header.

![Content-Type in POSTMAN](..\..\..\assets\images\POSTMAN1.png)

## URL Format

To interact with API commands through a REST client or browser, use the following URL format:

```
http://{robot-ip-address}:{port}/Api/{CommandName}
```

![rest_URL_example](..\..\..\assets\images\rest_URL_example.PNG)

## Payload Format

Misty uses JSON to format REST API data. Use this format when creating the payload:

```json
{
  "key0": "value0",
  "key1": "value1",
  "key2": "value2"
}
```

## Commands

Misty's REST commands are grouped into the following categories:

- **Action**
  - Drive Misty
  - Perform mapping or tracking
  - Play sound files
  - Change the LED color
  - Use face training and recognition
  - Move Misty's arms or head
  - Change the display


- **Configuration**
  - Save audio or image files to Misty
  - Connect Misty to WiFi
  - Get SLAM (simultaneous localization and mapping) data


- **Information**  
  - Get asset, sensor, device, and battery data
  - Troubleshoot problems
  - Obtain configuration information

------

### ACTION


##### CancelFaceTraining

Cancels face training that is currently in progress.

Parameters

- None

##### ChangeDisplayImage

Sets the current image being displayed on Misty's screen. Use `SaveImageAssetToRobot` to upload images to Misty.

Parameters

- FilenameWithoutPath - String - Name of previously uploaded file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png.

```json
{   
  "FilenameWithoutPath":"example.jpg"
}
```

##### ChangeEyes (beta)

Changes the image displayed for Misty's eyes.

Parameters

- Valence - Double - Number indicating the Valence value of the affect (value range: -1 to 1)

- Arousal - Double - Number indicating the Arousal value of the affect (value range: -1 to 1)

- Dominance- Double - Number indicating the Dominance value of the affect (value range: -1 to 1)

```json
{
  "Valence": 0.5,
  "Arousal": 0.3,
  "Dominance": 0.7
}
```


##### ChangeLED

Changes the color of the LED light behind the logo on Misty's torso.

Parameters

- Red (int) - the red RGB color value.
- Green (int) - the green RGB color value.
- Blue (int) - the blue RGB color value.

```json
{
  "red":255,
  "green":0,
  "blue":0
}
```

##### DriveTime

Drives Misty forward or backward at a specific speed for a set amount of time.

Parameters

- LinearVelocity - Double - Number that sets the speed value when Misty is driving in a straight line. Default value range: -1.222 to 1.042. ***Note: The value range for linear velocity is hardware dependent.***

- AngularVelocity - Double - Number that sets the speed value when Misty is driving at an angle. Default value range: -8.19 to 8.19. ***Note: The value range for angular velocity is hardware dependent.***

- TimeMs - Integer - Number that sets duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.

- Degree - Double - (optional) The number of degrees to turn. *Note: Supplying a `Degree` value recalculates linear velocity.*

```json
{
  "LinearVelocity":1,
  "AngularVelocity":4,
  "TimeMS":500
}
```

##### DriveToLocation (beta)

Drives Misty to a location you specify. To use `DriveToLocation`, you only need to provide Misty's destination. Misty determines the path she follows to arrive at the specified location.

Parameters

- Waypoints - Integer pair - A pair of integers representing X and Y coordinates. You can obtain `Waypoint` values from a map that Misty has previously generated. *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

```json
{  
  "X":"20",
  "Y":"30"
}
```

##### FollowPath

Drives Misty on a path defined by coordinates you specify.

Parameters

- Waypoints - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Waypoint` values from a map that Misty has previously generated.  *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

Or:

- Path - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Path` values from a map that Misty has previously generated.  *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

```json
{  
  "Waypoints": "(10,20),(20,20),(20,10)"
}
```

Or:

```json
{
  "Path":"10:20,15:25,30:40"
}
```

##### GetLearnedFaces (beta)

Obtains a list of face IDs that previously have been saved on Misty.

Parameters

- None

##### LocomotionTrack

Drives Misty left, right, or forward depending on the track speed specified for both left and right tracks.

Parameters

- LeftTrackSpeed - Integer - A value for the speed of the left track, range: -128 to 127.

- RightTrackSpeed - Integer - A value for the speed of the right track, range: -128 to 127.

```json
{   
  "LeftTrackSpeed":30,
  "RightTrackSpeed":70
}
```

##### MoveArm (beta)

Moves Misty's left or right arm at a specific speed to a chosen position.

Parameters

- Arm - String - "Left" or "Right" to indicate the arm Misty moves.

- Position - Double - Number that controls the position of the arm. Value range: 0 (up) to 10 (down).

- Velocity - Double - Number that controls the speed of the arm movement. Value range: 0 to 10.

```json
{
  "arm":"Left",
  "position":2,
  "velocity":3
}
```

##### MoveHead (beta)

Moves Misty's head in one of three axes (tilt, turn, or up-and-down).

Parameters

- Pitch - Double - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.

- Roll - Double - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5.

- Yaw - Double - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5.

- Velocity - Double - Number that represents speed at which Misty moves her head. Value range: 0 to 10.

```json
{
  "Pitch":3,
  "Roll":3,
  "Yaw": -2,
  "Velocity": 6
}
```

##### MoveHeadToLocation (beta)

Moves Misty's head to a specified up-down or left-right location.

Parameters

- Location - string - "left", "right", "down" or "up".

- Velocity - double - The speed at which to move the head. Value range: 0 to 10.

```json
{
  "Location":"left",
  "Velocity": 6
}
```

##### PerformSystemUpdate

Performs a system update, if there are updates available.

Parameters

- None

##### PlayAudioClip

Plays an audio clip that has been previously uploaded to Misty. Use `SaveAudioAssetToRobot` to upload audio files to Misty.

Parameters    

- AssetId - String - The name of the file to play.

```json
{
  "AssetId":"ExampleSong"
}
```

##### RevertDisplay

Changes the display to the previous image or eye state.

Parameters

- None


##### SetHeadPosition

Moves Misty's head to a given position along one of three axes (tilt, turn, or up-and-down).

Parameters

- Axis - string - The axis to change. Values are "yaw" (turn), "pitch" (up and down), or "roll" (tilt).
- Position - double - The position to move Misty's head along the given axis. Value range: -5 to 5.
- Velocity - double - The speed of the head movement. Value range: 0 to 10.

```json
{   
  "Axis ":"yaw",
  "position":3,
  "Velocity": 6
}
```


##### SlamReset

Resets the SLAM sensors.

Parameters

- None

##### SlamStartMapping

Starts Misty mapping an area.

Parameters

- None

##### SlamStartTracking

Starts Misty tracking her location.

Parameters

- None

##### SlamStopMapping

Stops Misty mapping an area.

Parameters

- None

##### SlamStopTracking

Stops Misty tracking her location.

Parameters

- None

##### StartFaceDetection

Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

Parameters

- None

##### StartFaceRecognition

Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `StartFaceDetection` command to detect and store face IDs in Misty's memory.

Parameters

- None

##### StartFaceTraining

Starts Misty learning a face and assigns a user-specified ID to that face. This process should take less than 15 seconds.

Parameters

- FaceId - string - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.

```json
{
  "FaceId":"Unique_Cat_Name-1337"
}
```

##### Stop

Stops Misty's movement.

Parameters

- None

##### StopFaceDetection

Stops Misty's detection of faces in her line of vision.

Parameters

- None

##### StopFaceRecognition

Stops the process of Misty recognizing a face she sees.

Parameters

- None

------


### CONFIGURATION


#####  ConnectWiFi

Connects Misty to a specified WiFi source.

Parameters

- NetworkName - String - Name of a WiFi network.
- Password - String -  Name of a WiFi security string.

```json
{
  "NetworkName": "MistyWiFi",
  "Password": "M!styR0x"
}
```

##### GetListOfEyeSprites (beta)

Obtains a list of the eye sprites stored on Misty.

Parameters

- None

##### GetListOfImages

Obtains a list of the images stored on Misty.

Parameters

- None

##### SaveAudioAssetToRobot

Saves an audio file to Misty.

Parameters

- FilenameWithoutPath - String - Name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play ogg files.

- DataAsByteArrayString - String - The audio data, passed as a String containing a byte array.

- ImmediatelyApply - Boolean - True or False. Specifies whether Misty immediately plays the uploaded audio file.

- OverwriteExisting - Boolean - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.

```json
{
  "FilenameWithoutPath": "example.wav",
  "DataAsByteArrayString": "34,88,90,49,56,...",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

##### SaveEyeSpriteToRobot (beta)
Saves an eye image to Misty.

- FilenameWithoutPath - String - Name of the eye sprite file to upload.

- DataAsByteArrayString - String -  The eye sprite data, passed as a String containing a byte array.

- Width - Integer - The width of the image in pixels.

- Height - Integer - The height of the image in pixels.

- ImmediatelyApply - Boolean - True or False. Specifies whether Misty immediately displays the uploaded eye sprite file.

- OverwriteExisting - Boolean - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.

```json
{
  "FilenameWithoutPath": "example.png",
  "DataAsByteArrayString": "30,90,12,187,...",
  "Width": 500,
  "Height": 500,
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```


##### SaveImageAssetToRobot
Saves an image file to Misty. Valid image file types are .jpg, .jpeg, .gif, .png. The maximum file size allowed is 3MB.

Parameters

- FilenameWithoutPath - String - The name of image file to upload.

- DataAsByteArrayString - String - The image data, passed as a String containing a byte array. 

- Width - Integer - The width of the image in pixels.

- Height - Integer - The height of the image in pixels.

- ImmediatelyApply - Boolean - True or False. Specifies whether Misty immediately displays the uploaded image file.

- OverwriteExisting - Boolean - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.

```json
{
  "FilenameWithoutPath": "example.jpg",
  "DataAsByteArrayString": "30,190,40,24,...",
  "Width": "300",
  "Height": "300",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```


##### SlamGetMap

Obtains the current map Misty has generated.

Parameters

- None

##### SlamGetPath

Obtains a path for Misty to travel to the specified destination. *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

Parameters

- X - Integer - The X-coordinate value for the destination.
- Y - Integer - Y-coordinate value for the destination.

```json
{
  "X": 13,
  "Y": 37
}
```

##### SlamGetStatus

Obtains values representing Misty's current activity and sensor status.

- Value 1 is an integer value where each bit is set to represent a different activity mode:
  1 - Exploring
  2 - Tracking
  3 - Recording

Example: If Misty is both exploring and recording, then bits 1 and 3 would be true => 00000101 => Status = 5.

- Value 2 is an integer value representing the status of Mistys' sensors, using the following enumerable:

```c#
public enum SlamSensorStatus
{
  Connected = 0,
  Ready = 1,
  Booting = 2,
  Disconnected = 3,
  UsbError = 4,
  Error = 5,
  Unknown = 6,
  ProdDataCorrupt = 7,
  FWCorrupt = 8,
  RecoveryMode = 9,
  LowPowerMode = 10
}
```

Parameters

- None


------

### INFORMATION

##### GetBatteryLevel

Obtains Misty's current battery level.

Parameters

- None

##### GetDeviceInformation

Obtains a list of Misty's devices and their associated information.

Parameters

- None

##### GetHelp

Obtains information about a specified API command. Calling `GetHelp` with no parameters returns a list of all the API commands that are available.

Parameters

- Command - String - The name of the API command to get information about.

```json
{
  "Command": "Api.GetListOfAudioClips"
}
```

##### GetListOfAudioClips

Obtains a list of the default audio clips stored on Misty.

Parameters

- None

##### GetListOfAudioFiles

Obtains a list of default and user-uploaded audio files currently stored on Misty.

Parameters

- None


##### GetStoreUpdateAvailable

Checks to see if there is an update available for Misty.

Parameters

- None

##### GetStringSensorValues

Obtains the value that was written to the user input serial port.

Parameters

- None


