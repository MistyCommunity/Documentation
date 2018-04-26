---
title: JavaScript
layout: apis.hbs
columns: three
order: 4
---

# {{title}}

You can use Misty's JavaScript API to send commands to Misty and obtain some basic data.

To [create skills](/onboarding/creating-skills/writing-skill) for Misty, you'll typically also need to get live updating data back from Misty. For that, you need to use a [WebSocket connection](/onboarding/creating-skills/writing-skill/#websocket-connections). You can visit the [Misty Community GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills) for example skills in JavaScript and Python.


## Display & LED

Misty comes with a set of default "eyes" that display onscreen. But we encourage you to get creative and upload your own Misty "eyes" or other images. Misty's chest LED is also configurable.


### ChangeLED
Changes the color of the LED light behind the logo on Misty's torso.

Arguments:
* Red (byte) - A value between 0 and 255 specifying the red RGB color.
* Green (byte) - A value between 0 and 255 specifying the green RGB color.
* Blue (byte) - A value between 0 and 255 specifying the blue RGB color.

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


### ChangeDisplayImage
Sets the current image being displayed on Misty's screen. Use `SaveImageAssetToRobot` to upload images to Misty.

Arguments:
* FileName (string) - The name of previously uploaded file containing the image to display. Do not include the file path. Valid image file types are .jpg, .jpeg, .gif, .png.

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


### GetListOfImages
Obtains a list of the images stored on Misty.

Arguments:
* None

Returns:
* Result (array) - Returns an array containing one element for each image currently stored on Misty. Each element contains the following:
   * Height (integer) - the height of the image file
   * Location (string) - full location path of the file on the robot's file structure
   * Name (string) - the name of the image file
   * Width (integer) - the width of the image file


### RevertDisplay
Changes the display to the previous image or eye state.

Arguments:
* None

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


### SaveImageAssetToRobot
Saves an image file to Misty. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB.

**Note: Misty's screen is 480 x 272 pixels in size. Because Misty does not adjust the scaling of images, for best results use an image with proportions similar to this.**

Arguments:
* FileName (string) - The name of image file to upload.
* DataAsByteArrayString (string) - The image data, passed as a String containing a byte array.
* Width (integer) - The width of the image in pixels.
* Height (integer) - The height of the image in pixels.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately displays the uploaded image file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.

Returns:
* Result (array) - Returns an array of information about the image file, with the following fields:
   * Name (string) - The name of the file that was saved.
   * Location (string) - The full path of the location of where the file is located on the robot's file system.


### DeleteImageAssetFromRobot
Enables you to remove an image file from Misty that you have previously uploaded.

**Note: You can only delete image files that you have previously uploaded to Misty. You cannot remove Misty's default system image files.**

Arguments:
* FileName (string) - The name of the file to delete, including its file type extension.

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


## Audio

Want Misty to say something different or play a special tune when she recognizes someone? You can save your own audio files to Misty and control what she plays.

### PlayAudioClip
Plays an audio clip that has been previously uploaded to Misty. Use `SaveAudioAssetToRobot` to upload audio files to Misty.

Arguments:
* AssetId (string) - The name of the file to play.

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


### GetListOfAudioFiles
Obtains a list of default and user-uploaded audio files currently stored on Misty.

Arguments:
* None

Return:
* Result (array) - Returns an array of audio file information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * Location (string) - The location of the file in the file directory.
   * Duration (double) - The length of time the audio file will play.
   * User Added Asset (boolean) - True or false. If true, the file was added by the user. If false, the file is one of Misty's default audio files.


### SaveAudioAssetToRobot
Saves an audio file to Misty. Maximum size is 3 MB.

Arguments:
* FileName (string) - Name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play OGG files.
* DataAsByteArrayString (string) - The audio data, passed as a String containing a byte array.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately plays the uploaded audio file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.

Returns:
* Result (array) - Returns an array of information about the audio file, with the following fields:
   * Name (string) - The name of the file that was saved.
   * Location (string) - The full path of the location of where the file is located on the robot's file system.


### DeleteAudioAssetFromRobot
Enables you to remove an audio file from Misty that you have previously uploaded.

**Note: You can only delete audio files that you have previously uploaded to Misty. You cannot remove Misty's default system audio files.**

Arguments:
* FileName (string) - The name of the file to delete, including its file type extension.

Returns:
* Success (boolean) - Returns true if there are no errors related to this call. Otherwise, false.


## Locomotion

The following commands allow you to programmatically drive and stop Misty. If you want to directly drive Misty, you can use her [companion app](/onboarding/3-ways-to-interact-with-misty/companion-app).

To programmatically obtain live data streams back from Misty that include movement, position, and proximity data, you can [subscribe](/onboarding/creating-skills/writing-skill/#sending-commands-and-subscribing-to-websockets) to her LocomotionCommand, HaltCommand, TimeOfFlight, and SelfState [WebSockets](/onboarding/creating-skills/writing-skill/#websocket-connections). To directly observe this data, you can use the [API Explorer](/onboarding/3-ways-to-interact-with-misty/api-explorer/#opening-a-websocket).

### Drive
Drives Misty forward or backward at a specific speed until cancelled.

When using the Drive command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

```JavaScript
{
  "LinearVelocity": 20,
  "AngularVelocity": 15,
}
```

Arguments:
- LinearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note: For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.**

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### DriveTime
Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using the DriveTime command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Arguments:
- LinearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note: For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.**
- TimeMs (integer) - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
- Degree (double) - (optional) The number of degrees to turn. **Note: Supplying a `Degree` value recalculates linear velocity.**

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Arguments:
- LeftTrackSpeed (double) - A value for the speed of the left track, range: -100 (full speed backward) to 100 (full speed forward).
- RightTrackSpeed (double) - A value for the speed of the right track, range: -100 (full speed backward) to 100 (full speed forward).

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### Stop
Stops Misty's movement.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


## Information

### GetBatteryLevel
Obtains Misty's current battery level.

Arguments:
* None

Returns:
* Result (double) - Returns a value between 0 and 100 corresponding to the current battery level.


### GetDeviceInformation
Obtains a list of Misty's devices and their associated information.

Arguments:
* None

Returns:
* Result (Set of Data) - returns a set of information about the device.
   * Windows OS Version (String) - The version of the OS of the robot.
   * Realtime Controller Hardware Version (String) - The hardware version for the realtime controller.
   * Realtime Controller Firmware Version (String) - The firmware version for the realtime controller.
   * IP Address (String) - The IP address of the device.
   * Output Capabilities (Array) - an array listing the output capabilities of the robot.
   * Sensor Capabilities (Array) - an array listing the sensor capabilities.


### GetHelp
Obtains information about a specified API command. Calling `GetHelp` with no parameters returns a list of all the API commands that are available.

Arguments:
* Command in "Api.<CommandName>" format eg: "Api.GetListOfAudioClips"

Returns:
* Result (string) - A string containing the requested help information.


## Configuration

### ConnectWiFi
Connects Misty to a specified WiFi source.

Arguments:
* NetworkName (string) - The WiFi network name (SSID).
* Password (string) - The WiFi network password.

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


## Beta - Faces
You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area.

The following commands allow you to programmatically use Misty's face detection and recognition abilities. If you want to directly experiment with these, you can use the [API Explorer](/onboarding/3-ways-to-interact-with-misty/api-explorer/#face-training-amp-recognition-beta).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](/onboarding/creating-skills/writing-skill/#sending-commands-and-subscribing-to-websockets) to her FaceDetection and FaceRecognition [WebSockets](/onboarding/creating-skills/writing-skill/#websocket-connections). To directly observe this data, you can use the [API Explorer](/onboarding/3-ways-to-interact-with-misty/api-explorer/#opening-a-websocket).


### StartFaceDetection - BETA
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call StopFaceDetection.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### StartFaceTraining - BETA
Starts Misty learning a face and assigns a user-specified ID to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call CancelFaceTraining.

Arguments:
* FaceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### StartFaceRecognition - BETA
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `StartFaceDetection` command to detect and store face IDs in Misty's memory.

When you are done having Misty recognize faces, call StopFaceRecognition.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### CancelFaceTraining - BETA
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the CancelFaceTraining command unless you want to abort a training that is in progress.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


## Beta - Head Movement

Misty's ability to accurately position her head is currently under development.

### MoveHead - BETA
Moves Misty's head in one of three axes (tilt, turn, or up-and-down). **Note: For Misty I, the MoveHead command can only control the up-down movement of Misty's head.**

Arguments:
* Pitch (double) - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.
* Roll (double) - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5. This value is ignored for Misty I.
* Yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5. This value is ignored for Misty I.
* Velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### MoveHeadToLocation - BETA
Moves Misty's head to a specified up-down or left-right location.

Arguments:
* Location (string) - "left", "right", "down" or "up".
* Velocity (double) - The speed at which to move the head. Value range: 0 to 10.

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SetHeadPosition - BETA
Moves Misty's head to a given position along one of three axes (tilt, turn, or up-and-down).

Arguments:
* Axis (string) - The axis to change. Values are "yaw" (turn), "pitch" (up and down), or "roll" (tilt).
* Position (double) - The position to move Misty's head along the given axis. Value range: -5 to 5.
* Velocity (double) - The speed of the head movement. Value range: 0 to 10.

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


## Beta - Information

### GetWebsocketHelp - BETA
Provides a list of available WebSocket data from Misty to which you can subscribe. For examples of subscribing to WebSocket data, check out the sample skills in the [MistyCommunity GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills).

Arguments:
* None

Returns:
* NestedProperties (array) - A list of WebSocket data classes to which you can subscribe. These include:
   * Command information
   * Sensor data
   * Battery status
   * Face detection/recognition information
   * Position and orientation
   * Movement updates
   * Proximity data from time-of-flight sensors



## Alpha - Mapping

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [API Explorer](../../../../../onboarding/3-ways-to-interact-with-misty/api-explorer).

### SlamGetStatus - ALPHA
Obtains values representing Misty's current activity and sensor status.

```c#
public enum SlamSensorStatus
{
  Unknown = 0,
  Connected = 1,
  Booting = 2,
  Ready = 3,
  Disconnected = 4,
  Error = 5,
  UsbError = 6,
  LowPowerMode = 7,
  RecoveryMode = 8,
  ProdDataCorrupt = 9,
  FWVersionMismatch = 10,
  FWUpdate = 11,
  FWUpdateComplete = 12,
  FWCorrupt = 13
}
```

Parameters
- None

Returns:
* Status (integer) - Value 1 is an integer value where each bit is set to represent a different activity mode:
  1 - Idle
  2 - Exploring
  3 - Tracking
  4 - Recording
  5 - Resetting

Example: If Misty is both exploring and recording, then bits 2 and 4 would be set => 0000 1010 => Status = 10.

* Slam Status (integer) - Value 2 is an integer value representing the status of Mistys' sensors, using the SlamSensorStatus enumerable.


### SlamReset - ALPHA
Resets the SLAM sensors.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SlamStartMapping - ALPHA
Starts Misty mapping an area.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SlamStartTracking - ALPHA
Starts Misty tracking her location.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SlamStopMapping - ALPHA
Stops Misty mapping an area.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SlamStopTracking - ALPHA
Stops Misty tracking her location.

Arguments:
* None

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.


### SlamGetMap - ALPHA
Obtains the current map Misty has generated.

Arguments:
* None

Returns:
* Result (Set of Elements) - returns the information about the slam map data.
   * grid (array) - a 2 dimensional array of values.
   * height (integer) - the height of the map
   * isValid (boolean) - weather or not the map is valid
   * metersPerCell (double) - the value that represents the number of meters that each cell reprecents in the grid array
   * width (integer) - the width of the map


### FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify.

Arguments:
* Path - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Path` values from a map that Misty has previously generated.  *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

Returns:
* Result (boolean) - Returns true if there are no errors related to this command.
