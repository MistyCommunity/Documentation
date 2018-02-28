---
title: REST API
layout: apis.hbs
columns: three
order: 1
---
# {{title}}

With the REST API, you can send commands from a REST client or browser to control and get information from Misty.

## POST & GET Examples

<p class="img">
![POSTMAN example](..\..\..\assets\images\post-example.PNG)
</p>

Use the HTTP POST method via a REST client such as POSTMAN to send a command to Misty:

To retrieve information from Misty, you can either send the HTTP GET command from a browser or use a REST client.

<p class="img">
![GET example](..\..\..\assets\images\browser-get-example.PNG)
</p>

An example of sending a GET method in the browser:

<p class="img">
![Content-Type in POSTMAN](..\..\..\assets\images\POSTMAN1.png)
</p>

If using POSTMAN for GET commands, make sure to remove content type from the header.

## URL & Payload Formats

To interact with API commands through a REST client or browser, use the following URL format:

```
http://{robot-ip-address}:{port}/Api/{CommandName}
```


Misty uses JSON to format REST API data. Use this format when creating the payload:

```json
{
  "key0": "value0",
  "key1": "value1",
  "key2": "value2"
}
```


## Display & LED

Misty comes with a set of default "eyes" that display onscreen. But we encourage you to get creative and upload your own Misty "eyes" or other images. Misty's chest LED is also configurable.


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


##### ChangeDisplayImage
Sets the current image being displayed on Misty's screen. Use `SaveImageAssetToRobot` to upload images to Misty.

Parameters
- FilenameWithoutPath - String - Name of previously uploaded file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png.

```json
{   
  "FilenameWithoutPath":"example.jpg"
}
```


##### GetListOfImages
Obtains a list of the images currently stored on Misty.

Parameters
- None


##### RevertDisplay
Displays the image that was shown prior to the current image.

Parameters
- None


##### SaveImageAssetToRobot
Saves an image file to Misty. Valid image file types are .jpg, .jpeg, .gif, .png. The maximum file size is 3 MB.

**Note: Misty's screen is 480 x 272 pixels in size. Because Misty does not adjust the scaling of images, for best results use an image with proportions similar to this.**

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


## Audio

Want Misty to say something different or play a special tune when she recognizes someone? You can save your own audio files to Misty and control what she plays.


##### PlayAudioClip
Plays an audio clip that has been previously uploaded to Misty. Use `SaveAudioAssetToRobot` to upload audio files to Misty.

Parameters    
- AssetId - String - The name of the file to play.

```json
{
  "AssetId":"ExampleSong"
}
```


##### GetListOfAudioClips
Obtains a list of the default audio clips currently stored on Misty.

Parameters
- None


##### GetListOfAudioFiles
Obtains a list of default and user-uploaded audio files currently stored on Misty.

Parameters
- None


##### SaveAudioAssetToRobot
Saves an audio file to Misty. Maximum size is 3 MB.

Parameters
- FilenameWithoutPath - String - Name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play OGG files.
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


## Locomotion

Experiment with driving Misty. She's eager to explore...

##### DriveTime
Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using the DriveTime command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Parameters
- LinearVelocity - Double - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity - Double - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note: For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.**
- TimeMs - Integer - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
- Degree - Double - (optional) The number of degrees to turn. **Note: Supplying a `Degree` value recalculates linear velocity.**

```json
{
  "LinearVelocity":1,
  "AngularVelocity":4,
  "TimeMS":500
}
```


##### LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Parameters
- LeftTrackSpeed - Integer - A value for the speed of the left track, range: -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.
- RightTrackSpeed - Integer - A value for the speed of the right track, range: -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.

```json
{   
  "LeftTrackSpeed":30,
  "RightTrackSpeed":70
}
```


##### Stop
Stops Misty's movement.

Parameters
- None


## Information

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


## Configuration

#####  ConnectWiFi
Connects Misty to a specified WiFi source.

Parameters
- NetworkName - String - The WiFi network name (SSID).
- Password - String - The WiFi network password.

```json
{
  "NetworkName": "MistyWiFi",
  "Password": "M!styR0x"
}
```


## Beta - Faces

You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area.


##### StartFaceDetection - BETA
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call StopFaceDetection.

Parameters
- None


##### StartFaceTraining - BETA
Trains Misty to recognize a specific face and applies a user-assigned ID to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call CancelFaceTraining.

Parameters
- FaceId - string - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.

```json
{
  "FaceId":"Unique_Cat_Name-1337"
}
```


##### StartFaceRecognition - BETA
Directs Misty to recognize a face she sees, if it is among those she alerady knows. To use this command, you previously must have used either the `StartFaceDetection` command or the `StartFaceTraining` command to detect and store one or more face IDs in Misty's memory.

When you are done having Misty recognize faces, call StopFaceRecognition.

Parameters
- None


##### StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Parameters
- None


##### CancelFaceTraining - BETA
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the CancelFaceTraining command unless you want to abort a training that is in progress.

Parameters
- None


##### StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Parameters
- None


## Beta - Head Movement

Misty's ability to accurately position her head is currently under development.

##### MoveHead - BETA
Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note: For Misty I, the MoveHead command can only control the up-down movement of Misty's head.**

Parameters
- Pitch - Double - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.
- Roll - Double - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5. This value is ignored for Misty I.
- Yaw - Double - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5. This value is ignored for Misty I.
- Velocity - Double - Number that represents speed at which Misty moves her head. Value range: 0 to 10.

```json
{
  "Pitch":3,
  "Roll":3,
  "Yaw": -2,
  "Velocity": 6
}
```

##### MoveHeadToLocation - BETA
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

##### SetHeadPosition - BETA
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


## Alpha - Mapping & Tracking

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [API Explorer](../../../../../onboarding/3-ways-to-interact-with-misty/api-explorer).


##### SlamGetStatus - ALPHA
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

##### SlamReset - ALPHA
Resets the SLAM sensors.

Parameters
- None

##### SlamStartMapping - ALPHA
Starts Misty mapping an area.

Parameters
- None

##### SlamStartTracking - ALPHA
Starts Misty tracking her location.

Parameters
- None

##### SlamStopMapping - ALPHA
Stops Misty mapping an area.

Parameters
- None

##### SlamStopTracking - ALPHA
Stops Misty tracking her location.

Parameters
- None

##### SlamGetMap - ALPHA
Obtains the current map Misty has generated.

Parameters
- None

##### FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify.

Parameters
- Path - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Path` values from a map that Misty has previously generated.  *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

```json
{
  "Path":"10:20,15:25,30:40"
}
```
