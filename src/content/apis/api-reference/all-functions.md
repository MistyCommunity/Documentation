---
title: JavaScript
layout: apis.hbs
columns: one
order: 4
---

# {{title}}


## Display & LED

Misty comes with a set of default "eyes" that display onscreen. But we encourage you to get creative and upload your own Misty "eyes" or other images. Misty's chest LED is also configurable.


##### ChangeLED
Changes the color of the LED light behind the logo on Misty's torso.

Arguments:
* Red (int) - the red RGB color value.
* Green (int) - the green RGB color value.
* Blue (int) - the blue RGB color value.


##### ChangeDisplayImage
Sets the current image being displayed on Misty's screen. Use `SaveImageAssetToRobot` to upload images to Misty.

Arguments:
* FilenameWithoutPath (string) - The name of previously uploaded file containing the image to display. Do not include the file path. Valid image file types are .jpg, .jpeg, .gif, .png.


##### GetListOfImages
Obtains a list of the images stored on Misty.

Arguments:
* None


##### RevertDisplay
Changes the display to the previous image or eye state.

Arguments:
* None


##### SaveImageAssetToRobot
Saves an image file to Misty. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB.

**Note: Misty's screen is 480 x 272 pixels in size. Because Misty does not adjust the scaling of images, for best results use an image with proportions similar to this.**

Arguments:
* FilenameWithoutPath (string) - The name of image file to upload.
* DataAsByteArrayString (string) - The image data, passed as a String containing a byte array.
* Width (integer) - The width of the image in pixels.
* Height (integer) - The height of the image in pixels.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately displays the uploaded image file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.


## Audio

Want Misty to say something different or play a special tune when she recognizes someone? You can save your own audio files to Misty and control what she plays.

##### PlayAudioClip
Plays an audio clip that has been previously uploaded to Misty. Use `SaveAudioAssetToRobot` to upload audio files to Misty.

Arguments:
* AssetId (string) - The name of the file to play.


##### GetListOfAudioClips
Obtains a list of the default audio clips stored on Misty.

Arguments:
* None


##### GetListOfAudioFiles
Obtains a list of default and user-uploaded audio files currently stored on Misty.

Arguments:
* None


##### SaveAudioAssetToRobot
Saves an audio file to Misty. Maximum size is 3 MB.

Arguments:
* FilenameWithoutPath (string) - Name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play OGG files.
* DataAsByteArrayString (string) - The audio data, passed as a String containing a byte array.
* ImmediatelyApply (boolean) - True or False. Specifies whether Misty immediately plays the uploaded audio file.
* OverwriteExisting (boolean) - True or False. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty.


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

Arguments:
- LinearVelocity - Double - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity - Double - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note: For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.**
- TimeMs - Integer - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
- Degree - Double - (optional) The number of degrees to turn. **Note: Supplying a `Degree` value recalculates linear velocity.**


##### LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Arguments:
* LeftTrackSpeed (integer) - A value between -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.
* RightTrackSpeed (integer) - A value between -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.


##### Stop
Stops Misty's movement.

Arguments:
* None


## Information

##### GetBatteryLevel
Obtains Misty's current battery level.

Arguments:
* None

##### GetDeviceInformation
Obtains a list of Misty's devices and their associated information.

Arguments:
* None

##### GetHelp
Obtains information about a specified API command. Calling `GetHelp` with no parameters returns a list of all the API commands that are available.

Arguments:
* Command in "Api.<CommandName>" format eg: "Api.GetListOfAudioClips"


## Configuration

##### ConnectWiFi
Connects Misty to a specified WiFi source.

Arguments:
* NetworkName (string) - The WiFi network name (SSID).
* Password (string) - The WiFi network password.

##### GetStoreUpdateAvailable
Checks to see if there is an update available for Misty.

Arguments:
* None


## Beta - Faces
You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area. 


##### StartFaceDetection - BETA
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

Arguments:
* None


##### StartFaceTraining - BETA
Starts Misty learning a face and assigns a user-specified ID to that face. This process should take less than 15 seconds.

Arguments:
* FaceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.


##### StartFaceRecognition - BETA
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `StartFaceDetection` command to detect and store face IDs in Misty's memory.

Arguments:
* None


##### StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Arguments:
* None

##### CancelFaceTraining - BETA
Cancels face training that is currently in progress.

Arguments:
* None


##### StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Arguments:
* None


## Beta - Head Movement

Misty's ability to accurately position her head is currently under development.

##### MoveHead - BETA
Moves Misty's head in one of three axes (tilt, turn, or up-and-down). **Note: For Misty I, the MoveHead command can only control the up-down movement of Misty's head.**

Arguments:
* Pitch (double) - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.
* Roll (double) - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5. This value is ignored for Misty I.
* Yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5. This value is ignored for Misty I.
* Velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.

##### MoveHeadToLocation - BETA
Moves Misty's head to a specified up-down or left-right location.

Arguments:
* Location (string) - "left", "right", "down" or "up".
* Velocity (double) - The speed at which to move the head. Value range: 0 to 10.

##### SetHeadPosition - BETA
Moves Misty's head to a given position along one of three axes (tilt, turn, or up-and-down).

Arguments:
* Axis (string) - The axis to change. Values are "yaw" (turn), "pitch" (up and down), or "roll" (tilt).
* Position (double) - The position to move Misty's head along the given axis. Value range: -5 to 5.
* Velocity (double) - The speed of the head movement. Value range: 0 to 10.


## Alpha - Mapping

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [API Explorer](../../../../../onboarding/3-ways-to-interact-with-misty/api-explorer).


##### SlamStartMapping - ALPHA
Starts Misty mapping an area.

Arguments:
* None

##### SlamStartTracking - ALPHA
Starts Misty tracking her location.

Arguments:
* None


##### SlamStopMapping - ALPHA
Stops Misty mapping an area.

Arguments:
* None

##### SlamStopTracking - ALPHA
Stops Misty tracking her location.

Arguments:
* None

##### SlamGetMap - ALPHA
Obtains the current map Misty has generated.

Arguments:
* None

##### SlamReset - ALPHA
Resets the SLAM sensors.

Arguments:
* None

##### FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify.

Arguments:
* Path - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Path` values from a map that Misty has previously generated.  *Note: X values specify directions forward and backward. Sideways directions are specified by Y values.*

