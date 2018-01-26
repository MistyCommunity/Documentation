---
title: REST API
layout: apis.hbs
columns: two
order: 1
---
# {{title}}

The Misty REST API allows one to send commands from a REST client or browser to control and obtain information about the robot.
## POST Commands

To send information to the robot, send using the http POST method via a REST client such as POSTMAN:

![POSTMAN example](..\..\..\assets\images\post-example.PNG)

## GET Commands

To retrieve information about the robot, one can either send the command from a browser or use the http GET method in a REST client.

Example of a GET command in the browser:

![GET example](..\..\..\assets\images\browser-get-example.PNG)

If using POSTMAN for GET commands, make sure to remove content type from the header.

![POSTMAN example](..\..\..\assets\images\content-type-instructions.PNG)

## URL Format

To interact with API commands through a rest client or browser, use the following URL format:

```
http://{robot-ip-address}:{port}/Api/{CommandName}
```

![rest_URL_example](..\..\..\assets\images\rest_URL_example.PNG)

## Payload Format

Misty uses JSON to format Rest API data. Use this format when creating the payload:

```json
{
  "key0": "value0",
  "key1": "value1",
  "key2": "value2"
}
```

## Commands

The commands are grouped into the following categories:

- **Action**
  - Display image files
  - Play sound files
  - Manipulate LED screen
  - Move robot


- **Configuration**
  - Save files to robot
  - Obtain configuration information
  - Connect robot to WiFi


- **Information**  
  - Obtain specifics of various assets in Misty
  - Troubleshoot problems

------

### Action

##### AnimateDisplayImage *(Not Fully Implemented)*

Begin slideshow with photos that have been uploaded to the robot. Specify duration between images.

Parameters

- OrderedListOfFilenamesWithoutPaths - String - Series of photos to display on screen ( Valid image file types are .jpg, .jpeg, .gif, .png.  Maximum file size allowed is 3MB)
- MillisecondsBtwImages - String - Number (in form of string) that sets the duration between images

```json
{
  "OrderedListOfFilenamesWithoutPaths":"image.jpg, image2.jpg, image3.png",
  "MillisecondsBtwImages":"500"
}
```

##### CancelFaceTraining

Cancel training of the face.

Parameters

- None

##### ChangeDisplayImage

Change the image displayed on screen using uploaded image.

Parameters

- FilenameWithoutPath - String - Name of  uploaded file with image to display ( Valid image file types are .jpg, .jpeg, .gif, .png.  Maximum file size allowed is 3MB)

```json
{   
  "FilenameWithoutPath":"example.jpg"
}
```

##### ChangeEyes

Change the eyes displayed on robot by manipulating the robots affect.

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

##### ChangeEyeSprite *(Not Fully Implemented)*

Upload new image to change robot's eyes.

Parameters

- SpriteFilenameWithoutPath - String - Name referencing file to be displayed on screen
- SpriteScale - Double - Number representing scale of image

```json
{
  "SpriteFilenameWithoutPath":"example.jpg",
  "SpriteScale":1
}
```

##### ChangeLED

Change the color of LED screen on robot.

Parameters

- Red (int) - the red rgb color value
- Green (int) - the green rgb color value
- Blue (int) - the blue rgb color value

```json
{
  "red":255,
  "green":0,
  "blue":0
}
```

##### DriveTime

Drive robot forward or backward at a specific speed for a set amount of time.

Parameters

- LinearVelocity - Double - Number that sets the speed value when robot is driving in a straight line (default value range: -1.222 to 1.042 ***Note: value range for linear velocity is hardware dependent***)


- AngularVelocity - Double - Number that sets the speed value when robot is driving at an angle (default value range: -8.19 to 8.19 ***Note: value range for angular velocity is hardware dependent***)


- TimeMs - Integer - Number that sets duration of movement (value range: 0 to 1000 ms, able to increment by 500 ms)

- Degree - Double - (optional) the degrees to turn, will recalculate linear velocity

```json
{
  "LinearVelocity":1,
  "AngularVelocity":4,
  "TimeMS":500
}
```

##### DriveToLocation

Drive robot to the locations sets that are provided.

Parameters

- Waypoints - List of Sets of Integers - List containing 1 to many sets of number pairs that represent X and Y coordinates (values based on previously generated map)

```json
{  
  "Waypoints": "(10,20),(20,20),(20,10)"
}
```

##### FollowPath

Drive robot in a set path based on specific coordinates.

Parameters

- Waypoints - List of Sets of Integers - List containing 1 to many sets of number pairs that represent X and Y coordinates (values based on previously generated map)

```json
{  
  "Waypoints": "(10,20),(20,20),(20,10)"
}

OR

{
  "Path":"10:20,15:25,30:40"
}
```

##### GetLearnedFaces

Get a list of Face IDs that have already been saved on the robot.

Parameters

- None

##### LocomotionTrack

Drive robot left, right, or forward depending on track speed specified for both left and right tracks.

Parameters

- LeftTrackSpeed - Integer - Number that determines speed of left track (value range: -128 to 127)

- RightTrackSpeed - Integer - Number that determines speed of right track (value range: -128 to 127)

```json
{   
  "LeftTrackSpeed":30,
  "RightTrackSpeed":70
}
```

##### MoveArm

Move left or right arm at a specific speed to a chosen position.

Parameters

- Arm - String - Name that specifies which arm is to be moved (Left or Right)


- Position - Double - Number that controls the position of arm (value range: 0 (up) to 10 (down))


- Velocity - Double - Number that controls the speed of arm movement (value range: 0 to 10)

```json
{
  "arm":"Left",
  "position":2,
  "velocity":3
}
```

##### MoveHead

Choose range of head movement on three different axes and specify speed at which movement occurs.

Parameters

- Pitch - Double - Number that determines Misty's head movement on a side-to-side axis (head will move up and down) (value range: -5 to 5)


- Roll - Double - Number that determines Misty's head movement on a front-to-back axis (head will tilt left or right) (value range: -5 to 5)


- Yaw - Double - Number that determines Misty's head movement on a vertical axis (head will turn left or right) (value range: -5 to 5)

- Velocity - Double - Number that represents speed at which head movement occurs (value range: 0 to 10)

```json
{
  "Pitch":3,
  "Roll":3,
  "Yaw": -2,
  "Velocity": 6
}
```

##### MoveHeadToLocation

Move the head to a basic location

Parameters

- Location - string - "left", "right", "down" or "up"

- Velocity - double - speed to move the head at (value range: 0 to 10)

```json
{
  "Location":"left",
  "Velocity": 6
}
```

##### PerformSystemUpdate

Tell the robot to perform a system update if there are updates available.

Parameters

- None

##### PlayAudioClip

Play an audio clip that has been uploaded to Misty.

Parameters    

- AssetId - String - Name given to Audio Clip on file

```json
{
  "AssetId":"ExampleSong"
}
```

##### RevertDisplay

Change the display to the previous image or eye affect

Parameters

- None


##### ScaleImageAsset

Scale an image that has been uploaded to Misty.

Parameters

- ImageFilenameWithoutPath - String - Name given to Image file uploaded to misty ( Valid image file types are .jpg, .jpeg, .gif, .png.  Maximum file size allowed is 3MB)

- ImageScale - Double - Number given to change size of an image

```json
{
  "ImageFilenameWithoutPath": "example.jpg",
  "ImageScale": " ",
}
```

##### SetFaceId

Set the face id.

Parameters

- None

##### SetHeadPosition

Set the head position based upon an axis

Parameters

- Axis - string - the axis to change - "yaw", "pitch", or "roll"
- Position - double - the position to update to (value range: -5 to 5)
- Velocity - double - speed to move the head at (value range: 0 to 10)

```json
{   
  "Axis ":"yaw",
  "position":3,
  "Velocity": 6
}
```

##### StartFaceDetection

Start the process where the robot will detect faces in it's line of vision. This will assign each face that is detected a random id.

Parameters

- None

##### StartFaceRecognition

Start the process where the robot will recognize individuals that it has detected (during StartFaceDetection) with stored face ids in the robot's memory.

Parameters

- None

##### StartFaceTraining

Start the process where the robot will learn a face and the user can give the face an unique face id.  This process should take less than 15 seconds.

Parameters

- FaceId - string - a unique string of 30 characters or less that represents what this face should be referenced as.  Only Alphabet, Numeric, -, and _ are valid characters.

```json
{
  "FaceId":"Unique_Cat_Name-1337"
}
```

##### Stop

A quick way to stops the robot movement.

Parameters

- None

##### StopFaceDetection

Stop the process where the robot will detect faces.

Parameters

- None

##### StopFaceRecognition

Stop the process where the robot will recognize individuals.

Parameters

- None

------


### Configuration

##### AddAudioClip

Add audio clip to Misty so it can be accessed later.

Parameters

- Id - String - Id name given to represent audio file

- FileName - String - Name of audio file that has been uploaded  (all audio file format types accepted - system currently cannot play ogg files)

- Data - Byte[] - Array  -  Array that represents audio data in bytes.

```json
{
  "Id": "AudioId",
  "FileName": "AudioFile.wav",
  "Data": "[38,168,12,24,...]"
}
```

#####  ConnectWiFi

Connect Misty to WiFi.

Parameters

- NetworkName - String - Name of WiFi network
- Password - String -  Name of WiFi security string

```json
{
  "NetworkName": "MistyWiFi",
  "Password": "M!styR0x"
}
```

##### GetListOfEyeSprites

Returns a list of eye sprites.

Parameters

- None

##### GetListOfImages

Returns a list of images.

Parameters

- None

##### HallucinateObject

A way to add object into the world for testing purposes. ?????

Parameters

- Id - Integer - an unique id of the object in the world.
- Valence - Double - Number indicating the Valence value of the appraised affect of the object (value range: -1 to 1)


- Arousal - Double - Number indicating the Arousal value of the appraised affect of the object(value range: -1 to 1)


- Dominance- Double - Number indicating the Dominance value of the appraised affect of the object (value range: -1 to 1)
- Bearing- Double - Number indicating the bearing of the object in meters


- Elevation- Double - Number indicating the elevation of the object in meters


- Distance- Double - Number indicating the distance of the object in meters

```json
{
  "Id": 1337,
  "Valence": 0.5,
  "Arousal": 0.3,
  "Dominance": 0.7,
  "Bearing": 34.0,
  "Elevation": 5280.1,
  "Distance": 3.14159
}
```

##### SaveAudioAssetToRobot

Save an audio file to Misty.

Parameters

- FilenameWithoutPath - String - Name of audio file uploaded to Misty (Accepts all audio format types - system currently cannot play ogg files)


- DataAsByteArrayString - String - Series of numbers that represent audio data in bytes

- ImmediatelyApply - Boolean - True or False used to indicate whether audio file will be immediately updated to audio list.

- OverwriteExisting - Boolean - True or False used to indicate whether the file should be overwritten if it exists.

```json
{
  "FilenameWithoutPath": "example.wav",
  "DataAsByteArrayString": "34,88,90,49,56,...",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

##### SaveEyeSpriteToRobot
Save eye image to Misty to be accessed later when changing eye sprite.

- FilenameWithoutPath - String - Name of image file uploaded to Misty


- DataAsByteArrayString - String -  Series of numbers that represent image data in bytes


- Width - Integer - Number indicating width of image

- Height - Integer - Number indicating height of image

- ImmediatelyApply - Boolean - True or False statement that determines whether Eye Sprite will immediately display on screen after saved

- OverwriteExisting - Boolean - True or False used to indicate whether the file should be overwritten if it exists.

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

##### SaveFileToFolder

Save a file to a folder in Misty.

Parameters

- FilenameWithoutPath - String - Name of file uploaded to Misty

- DataAsByteArrayString - String - Indicating file data in bytes

- OverwriteExisting - Boolean - True or False used to indicate whether the file should be overwritten if it exists.

```json
{
  "FilenameWithoutPath": "example.txt",
  "DataAsByteArrayString": "30,60,78,189,...",
  "OverwriteExisting": true
}
```

##### SaveImageAssetToRobot
Save an image file to Misty.

Parameters

- FilenameWithoutPath - String - Name of file that has been uploaded to misty

- DataAsByteArrayString - String - Series of numbers that represent image data in bytes

- Width - Integer - Number indicating width of image

- Height - Integer - Number indicating height of image

- ImmediatelyApply - Boolean - True or False statement that determines if image file will be immediately applied to Misty.

- OverwriteExisting - Boolean - True or False used to indicate whether the file should be overwritten if it exists.

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

##### SetAffectState

Choose the affect state of Misty based on three different variables.

Parameters

- Valence - Double - Number indicating the Valence value of the affect (value range: -1 to 1)
- Arousal - Double - Number indicating the Arousal value of the affect (value range: -1 to 1)
- Dominance- Double - Number indicating the Dominance value of the affect (value range: -1 to 1)

```json
{
  "Valence": 0.4,
  "Arousal": 0.5,
  "Dominance": 0.6
}
```

##### SlamGetMap

Obtain map generated by robot.

Parameters

- None

##### SlamGetPath

Obtain a map from the robot's location to the X,Y coordinates provided. Obtain robot's path after submitting destination of desired path.

Parameters

- X - Integer - x coordinate value.
- Y - Integer - y coordinate value.

```json
{
  "X": 13,
  "Y": 37
}
```

##### SlamGetStatus

Obtain two Values

- Value 1 represents the general state of the system as an integer value where each bit can be toggled to indicate a different mode of operation:
  1 - Exploring
  2 - Tracking
  3 - Recording

  (i.e. If the system is exploring and recording then bits 1 and 3 would be true => 00000101 => Status = 5)

- Value 2 is an integer value that represents the sensor status using the following enumerable:
  ​

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

##### SlamReset

Reset Slam sensors.

Parameters

- None

##### SlamStartMapping

Tell robot to start/stop mapping an area. User should move robot so mapping can take place.

Parameters

- None

##### SlamStartTracking

Tell robot to find it's location within it's surroundings.

Parameters

- None

##### SlamStopMapping

Terminate Slam mapping.

Parameters

- None

##### SlamStopTracking

Tell robot to stop tracking its location.

Parameters

- None

------

### Information

##### GetBatteryLevel

Obtain the robot's current battery level.

Parameters

- None

##### GetDeviceInformation

Obtain a list of the robot's devices and their associated information.

Parameters

- None

##### GetHelp

Send command to Misty to get help.  A call with no parameters will return a list of all the API commands that are available.

Parameters

- Command - String - the api command to get information about

```json
{
  "Command": "Api.GetListOfAudioClips"
}
```

##### GetListOfAudioClips

Obtain a list of robot defined audio clips that are on Misty.

Parameters

- None

##### GetListOfAudioFiles

Obtain a list of audio files that are stored on the robot.

Parameters

- None

##### GetListOfVideoClips

Obtain list of video clips that have been uploaded to Misty.

Parameters

- None

##### GetStoreUpdateAvailable

Checks to see if there is an update available for the robot.

Parameters

- None

##### GetStringSensorValues (NOT IMPLEMENTED)

The value that was written to the user input serial port.

Parameters

- None







####
