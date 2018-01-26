---
title: JavaScript
layout: apis.hbs
columns: two
order: 4
---

# {{title}}

## Action Commands ##

### AnimateDisplayImages
Play a series of images with specified duration apart.

------------
### ChangeDisplayImage
Change the image to be displayed on the screen
###### Arguments:
* Image file (string) - to be displayed.  Only the file name; no path.

------------
### ChangeEyes
Change the eye image to be displayed on the screen.  The command takes in affect state as arguments and choose the eye image matching that state.
###### Arguments:
* Valence (double) - value between -1 and 1
* Arousal (double) - value between -1 and 1
* Dominance (double) - value between -1 and 1
------------
### ChangeEyeSprite
Change the eye image to be displayed on the screen.
###### Arguments:
* Image sprite file (string) - to be displayed.  Only the file name; no path.
* Scale (double) - scale to use to dislay the image
------------
### ChangeLED
Change color of the chest LED
###### Arguments:
* Red (int) - the red rgb color value
* Green (int) - the green rgb color value
* Blue (int) - the blue rgb color value
------------
### DriveTime
Drive the robot using given velocities for a duration of time
###### Arguments:
* LinearVelocity (double) - the value is adjusted according to robot's hardware, is recalculated if degree is passed in
* AngularVelocity (double) - the value is adjusted according to robot's hardware
* Degree (double) - the degrees to turn, recalculates linear velocity if passed in (optional)
* Time (integer) - in milliseconds that the robot will drive for
------------
### FollowPath
Tell the robot to follow waypoints path or path in string format, only one of these is necessary - this should probably be updated for one common input
###### Arguments:
* Waypoints (List) - list of GridCell (x,y) coordinates
* Path (List) - waypoints string to be converted into waypoints

------------
### LocomotionTrack
Control the tracks on the robot to move at certain speed
###### Arguments:
* LeftTrackSpeed (integer) - value between -128 to 127.  Negative value indicates backward direction and positive value indicates forward direction.
* RightTrackSpeed (integer) - value between -128 to 127.  Negative value indicates backward direction and positive value indicates forward direction.
------------
### MoveArm
Move arms of the robot
###### Arguments:
* Hand (string) - indicating RightArm or LeftArm
* Position (double) - location to move the arm to (up/down)
* Velocity (double) - the speed to move the arm
------------
### MoveHead
Move the head of the robot
###### Arguments:
* Pitch (double) - value for the pitch axis
* Roll (double) - value for the roll axis
* Yaw (double) - value for the yaw axis
* Velocity (double) - speed to move the head at
------------
### SetHeadPosition
Move the head of the robot
###### Arguments:
* Axis (string) - the axis to change - "yaw", "pitch", or "roll"
* Position (double) - the position to update to
* Velocity (double) - speed to move the head at
------------
### MoveHeadToLocation
Move the head of the robot to a predefined basic location
###### Arguments:
* Location (string) - "left", "right", "down" or "up"
* Velocity (double) - speed to move the head at
------------
### PlayAudioClip
Play specified audio file on the robot
###### Arguments:
* AssetId (string) - id of the audio asset to play

------------
### ScaleImageAsset
Scale image on the display
###### Arguments:
* ImageFilenameWithoutPath (string) - file name of image
* ImageScale (double) - scale value to use
------------
### SetAffectState
Set robot affect state value
###### Arguments:
* Valence (double) - value between 0 and 1
* Arousal (double) - value between 0 and 1
* Dominance (double) - value between 0 and 1
------------
### Stop
Stop the robot from locomoting
###### Arguments:
* None

------------

## Configuration  Commands ##

### AddAudioClip - Not implemented
Add new audio file to the robot's assets
###### Arguments:
* Id (string) - id of the file
* FileName (string) - name of the file
* Data (byte[]) - audio data
------------
### SetNetworkConnection
Configure WiFi network
###### Arguments:
* NetworkName (string) - SSID name of the WiFi network
* Password (string) - WiFi network password
------------
### SaveAudioAssetToRobot
Save audio file to the robot
###### Arguments:
* FilenameWithoutPath (string) - audio file name (.wav, .mp3)
* DataAsByteArrayString (string) - audio data
* ImmediatelyApply (boolean) - indicate whether to use the file immediately after save
* OverwriteExisting (boolean) - indicate whether to overwrite the file if the filename already exists
------------
### SaveEyeSpriteToRobot
Save eye sprite image to the robot
###### Arguments:
* FilenameWithoutPath (string) - file name (.jpg, .gif, .png)
* DataAsByteArrayString (string) - file data
* Width (integer) - image file width
* Height (integer) - image file height
* ImmediatelyApply (boolean) - indicate whether to use the file immediately after save
* OverwriteExisting (boolean) - indicate whether to overwrite the file if the filename already exists
------------
### SaveFileToFolder  Not Implemented
Save file to robot
###### Arguments:
* FilenameWithoutPath (string) - file name
* DataAsByteArrayString (string) - file data
* OverwriteExisting (boolean) - indicate whether to overwrite the file if the filename already exists
------------
### SaveImageAssetToRobot
Save image file to the robot
###### Arguments:
* FilenameWithoutPath (string) - file name (.jpg, .gif, .png)
* DataAsByteArrayString (string) - file data
* Width (integer) - image file width
* Height (integer) - image file height
* ImmediatelyApply (boolean) - indicate whether to use the file immediately after save
* OverwriteExisting (boolean) - indicate whether to overwrite the file if the filename already exists
------------
### SendConfigurationToBlockly
Send robot's configuration and known capabilities to blockly client so the client can choose the display blocks that are applicable to the robot
###### Arguments:
* None

------------
### SlamGetMap
Get map from SLAM system
###### Arguments:
* None

------------
### SlamGetPath
Get waypoint path from SLAM system
###### Arguments:
* Destination (GridCell) - (x,y) coordinate of the destination to move the robot to

------------
### SlamInitialize
Initialize SLAM system
###### Arguments:
* None

------------
### SlamShutdown
Shutdown SLAM system
###### Arguments:
* None

------------
### SlamStartMapping
Tell SLAM system to start mapping the surrounding
###### Arguments:
* None

------------
### SlamStartTracking
Tell SLAM system to start tracking the robot's current position as the robot moves around
###### Arguments:
* None

------------
### SlamStopMapping
Tell SLAM system to stop mapping the surrounding
###### Arguments:
* None

------------
### SlamStopTracking
Tell SLAM system to stop tracking the robot's current position
###### Arguments:
* None

------------
## Information  Commands ##

### GetListOfAudioClips
Get current list of audio clips on the robot - robot default files
###### Arguments:
* None

------------

### GetListOfAudioFiles
Get current list of audio files on the robot - robot default files and user uploaded files
###### Arguments:
* None

------------
### GetHelp
Get more help text for specified command
###### Arguments:
* Command in "Api.<CommandName>" format eg: "Api.GetListOfAudioClips"

------------
### GetStringSensorReadings
Get sensor (string) value from robot's selfstate
###### Arguments:
* None

------------
### GetListOfVideoClips
Get current list of video files on the robot
###### Arguments:
* None

------------
