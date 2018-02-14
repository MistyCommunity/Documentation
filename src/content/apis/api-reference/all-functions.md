---
title: JavaScript
layout: apis.hbs
columns: two
order: 4
---

# {{title}}

## Action Commands ##

### CancelFaceTraining
Cancels face training that is currently in progress.

Arguments:
* None


### ChangeDisplayImage
Sets the current image being displayed on Misty's screen. Use `SaveImageAssetToRobot` to upload images to Misty.

Arguments:
* FilenameWithoutPath (string) - The name of previously uploaded file containing the image to display. Do not include the file path. Valid image file types are .jpg, .jpeg, .gif, .png. 


### ChangeEyes (beta)
Changes the image displayed for Misty's eyes.

Arguments:
* Valence (double) - value between -1 and 1
* Arousal (double) - value between -1 and 1
* Dominance (double) - value between -1 and 1


### ChangeLED
Changes the color of the LED light behind the logo on Misty's torso.

Arguments:
* Red (int) - the red RGB color value.
* Green (int) - the green RGB color value.
* Blue (int) - the blue RGB color value.


### DriveTime
Drives Misty forward or backward at a specific speed for a set amount of time.

Arguments:
* LinearVelocity (double) - Number that sets the speed value when Misty is driving in a straight line. Default value range: -1.222 to 1.042. ***Note: The value range for linear velocity is hardware dependent.***
* AngularVelocity (double) - Number that sets the speed value when Misty is driving at an angle. Default value range: -8.19 to 8.19. ***Note: The value range for angular velocity is hardware dependent.***
* Time (integer) - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
* Degree (double) - (optional) The number of degrees to turn. *Note: Supplying a `Degree` value recalculates linear velocity.*


### DriveToLocation (beta)
Drives Misty to a location you specify. To use `DriveToLocation`, you only need to provide Misty's destination. Misty determines the path she follows to arrive at the specified location.

Arguments:
* Waypoints (integer pair) - A pair of integers representing X and Y coordinates. You can obtain `Waypoint` values from a map that Misty has previously generated. *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*


### FollowPath
Drives Misty on a path defined by coordinates you specify.

Arguments:
* Waypoints (List of integer pairs) - A list containing 1 or more sets of GridCell (x,y) coordinates. You can obtain `Waypoint` values from a map that Misty has previously generated.  *Note: x values specify directions forward and backward. Sideways directions are specified by y values.*


### GetLearnedFaces (beta)
Obtains a list of face IDs that previously have been saved on Misty.

Arguments:
* None


### LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Arguments:
* LeftTrackSpeed (integer) - A value between -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.
* RightTrackSpeed (integer) - A value between -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.


### MoveArm (beta)
Moves Misty's left or right arm at a specific speed to a chosen position.

Arguments:
* Arm (string) - "Left" or "Right" to indicate the arm Misty moves.
* Position (string) - Double - Number that controls the position of the arm. Value range: 0 (up) to 10 (down).
* Velocity (double) - Number that controls the speed of the arm movement. Value range: 0 to 10.


### MoveHead (beta)
Moves Misty's head in one of three axes (tilt, turn, or up-and-down).

Arguments:
* Pitch (double) - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.
* Roll (double) - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5.
* Yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5.
* Velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.


### MoveHeadToLocation (beta)
Moves Misty's head to a specified up-down or left-right location.

Arguments:
* Location (string) - "left", "right", "down" or "up".
* Velocity (double) - The speed at which to move the head. Value range: 0 to 10.


### SetHeadPosition
Move the head of the robot

Arguments:
* Axis (string) - the axis to change - "yaw", "pitch", or "roll"
* Position (double) - the position to update to
* Velocity (double) - speed to move the head at


### MoveHeadToLocation
Move the head of the robot to a predefined basic location

Arguments:
* Location (string) - "left", "right", "down" or "up"
* Velocity (double) - speed to move the head at


### PerformSystemUpdate
Performs a system update, if there are updates available.

Arguments:
* None


### PlayAudioClip
Plays an audio clip that has been previously uploaded to Misty. Use `SaveAudioAssetToRobot` to upload audio files to Misty.

Arguments:
* AssetId (string) - The name of the file to play.


### RevertDisplay
Changes the display to the previous image or eye state.

Arguments:
* None


### SetHeadPosition
Moves Misty's head to a given position along one of three axes (tilt, turn, or up-and-down).

Arguments:
* Axis (string) - The axis to change. Values are "yaw" (turn), "pitch" (up and down), or "roll" (tilt).
* Position (double) - The position to move Misty's head along the given axis. Value range: -5 to 5.
* Velocity (double) - The speed of the head movement. Value range: 0 to 10.


### SlamReset
Resets the SLAM sensors.

Arguments:
* None


### SlamStartMapping
Starts Misty mapping an area.

Arguments:
* None


### SlamStartTracking
Starts Misty tracking her location.

Arguments:
* None


### SlamStopMapping
Stops Misty mapping an area.

Arguments:
* None


### SlamStopTracking
Stops Misty tracking her location.

Arguments:
* None


### StartFaceDetection
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

Arguments:
* None


### StartFaceRecognition
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `StartFaceDetection` command to detect and store face IDs in Misty's memory.

Arguments:
* None


### StartFaceTraining
Starts Misty learning a face and assigns a user-specified ID to that face. This process should take less than 15 seconds.

Arguments:
* FaceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.


### Stop
Stops Misty's movement.

Arguments:
* None


### StopFaceDetection
Stops Misty's detection of faces in her line of vision.

Arguments:
* None


### StopFaceRecognition
Stops the process of Misty recognizing a face she sees.

Arguments:
* None


------------

## Configuration Commands ##


### ConnectWiFi
Connects Misty to a specified WiFi source.

Arguments:
* NetworkName (string) - The WiFi network name (SSID).
* Password (string) - The WiFi network password.


### SaveAudioAssetToRobot
Saves an audio file to Misty. Maximum size is 3 MB.

Arguments:
* FilenameWithoutPath (string) - Name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play OGG files.
* DataAsByteArrayString (string) - The audio data, passed as a String containing a byte array.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately plays the uploaded audio file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.


### SaveEyeSpriteToRobot (beta)
Saves an eye image to Misty.

Arguments:
* FilenameWithoutPath (string) - Name of the eye sprite file to upload. Files can be in .jpg, .gif, or .png format.
* DataAsByteArrayString (string) - The image data, passed as a String containing a byte array.
* Width (integer) - The width of the image in pixels.
* Height (integer) - The height of the image in pixels.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately displays the uploaded eye sprite file.
* OverwriteExisting (boolean) - iTrue or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.


### SaveImageAssetToRobot
Saves an image file to Misty. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB.

**Note: Misty's screen is 480 x 272 pixels in size. Because Misty does not adjust the scaling of images, for best results use an image with proportions similar to this.**

Arguments:
* FilenameWithoutPath (string) - The name of image file to upload.
* DataAsByteArrayString (string) - The image data, passed as a String containing a byte array. 
* Width (integer) - The width of the image in pixels.
* Height (integer) - The height of the image in pixels.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately displays the uploaded image file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.


### SlamGetMap
Obtains the current map Misty has generated.

Arguments:
* None


### SlamGetPath
Obtains a path for Misty to travel to the specified destination. *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

Arguments:
* Destination (GridCell) - An (x,y) coordinate value specifying the destination for Misty's path.



## Information Commands ##


### GetBatteryLevel
Obtains Misty's current battery level.

Arguments:
* None


### GetDeviceInformation
Obtains a list of Misty's devices and their associated information.

Arguments:
* None


### GetHelp
Obtains information about a specified API command. Calling `GetHelp` with no parameters returns a list of all the API commands that are available.

Arguments:
* Command in "Api.<CommandName>" format eg: "Api.GetListOfAudioClips"


### GetListOfAudioClips
Obtains a list of the default audio clips stored on Misty.

Arguments:
* None


### GetListOfAudioFiles
Obtains a list of default and user-uploaded audio files currently stored on Misty.

Arguments:
* None


### GetListOfImages
Obtains a list of the images stored on Misty.

Arguments:
* None


### GetStoreUpdateAvailable
Checks to see if there is an update available for Misty.

Arguments:
* None


### GetStringSensorValues
Obtains the value that was written to the user input serial port.

Arguments:
* None


------------
