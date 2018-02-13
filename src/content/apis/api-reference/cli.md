---
title: Command Line Interface
layout: apis.hbs
columns: two
order: 2
---

# {{title}}

## Introduction

The Command Line Interface (CLI) is a quick and comprehensive way to manipulate Misty via a text-based terminal program.

All commands follow the following format:

`key_word <arg_1> ... <arg_n> [opt_arg_1] ... [opt_arg_n]`

Where:

* `key_word` is a command name/abbreviation
* `<arg_n>` is a required argument
* `[opt_arg_n]` is an optional argument

The order of the arguments are significant. Any required arguments are first, followed by any optional arguments.

## Action Commands ##


### arm | a (Move arm) (beta)
Moves Misty's left or right arm at a given speed to a specified position.

###### Format:
`arm \<side> \<position> [speed]`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
side|l or r|Y| specifies whether to move the left (l) or right (r) arm
position|-90 to 90|Y|arm position; -90 equals fully down and 90 equals fully up
speed|0 to 255|N|speed; 0 equals no movement and 255 equals maximum speed;  default value is 127

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Examples:
`arm l 90 255`  
Raise left arm up at maximum speed.

`arm r 0 127`  
Raise right arm up to horizontal position at approximately half maximum speed.


------------
### ce | eyes (Change eyes)
Changes the image displayed for Misty's eyes.

###### Format:
`ce \<valence> \<arousal> \<dominance>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
valence|-0.5, 0 or 0.5|Y|The valence value for the eye asset
arousal|-0.5, 0 or 0.5|Y|The arousal value for the eye asset
dominance|-0.5, 0 or 0.5|Y|The dominance value for the eye asset

Below are the values that correspond to Misty's default eye images for a given "feeling":

Feeling | Valence | Arousal | Dominance
--- | --- | --- | ---
Sad | -0.5 | -0.5 | -0.5
Angry | -0.5 | 0.5 | 0.5
Tired | 0 | -0.5| -0.5
Curious | 0 | 0 | -0.5
Content | 0 | 0 | 0.5
Surprise | 0 | 0.5 | 0
Calm | 0.5 | -0.5 | -0.5
Jubilation | 0.5 | 0.5 | -0.5

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`ce -0.5 -0.5 -0.5`  
Change to display sad eye image.


------------
### ci | di | img (Change display image)
Sets the current image being displayed on Misty's screen. The image must be previously uploaded to Misty.

###### Format:
`ce \<image>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
image|name string|Y|String, which represents an ID - unique name for an image file, usually filename w/o extension

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`ci MistyLogo`  
Changes image to "MistyLogo" image


------------
### d (Drive)
The command drives robot backward or forward with linear_velocity (-255..255), turning left or right with angular_velocity (-255 .. 255)

###### Format:
`d \<linear_velocity> \<angular_velocity>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
linear_velocity|-255 to 255|Y|Speed value for going straight.  Negative value represents backward movement and positive value represents forward movement.
angular_velocity |-255 to 255|Y|Speed value for turning.  Negative value represents counter clockwise movement and positive value represents clockwise movement.

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`d 255 0`  
Drive forward with max speed

`d -127 0`  
Drive backwards with half speed


------------
### dt (Drive time)
The command drives robot with linear_velocity in either backward or forward direction as well as turning left or right with angular_velocity for a given duration
###### Format:
`dt \<linear_velocity> \<angular_velocity> \<duration>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
linear_velocity|-255 to 255|Y|Speed value for going straight.  Negative value represents backward movement and positive value represents forward movement.
angular_velocity |-255 to 255|Y|Speed value for turning.  Negative value represents counter clockwise movement and positive value represents clockwise movement.
duration |0 to 30000|Y|Duration for driving in milliseconds.  Maximum is 30 seconds.

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`dt 255 0 5000`  
Drive forward at max speed for 5 seconds


------------
### fp (Follow path)
The command tells the robot to move following the given path.  The command requires that the SLAM system is active and running and the robot has already obtained a map of the area of interest.

###### Format:
`fp \<waypoints>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
waypoints |string coordinates|Y|A string in JSON format containg (x,y) coordinates obtained from the map

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`fp "[{\"X\": 10, \"Y\": 10}, {\"X\": 7, \"Y\": 5}, {\"X\": 1, \"Y\": 0}]"`  
Commands robot to follow the path defined by these waypoints.


------------
### head (Move head)
The command tells the robot to move its head in all three axis (yaw, pitch, roll) at the given speed.

###### Format:
`head \<pitch> \<roll> \<yaw> \<speed>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
pitch |-90 to 90|Y|Angle value around the axis
roll |-90 to 90|Y|Angle value around the axis
yaw |-90 to 90|Y|Angle value around the axis
speed |0 to 255|Y|Speed that the head will move

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`head -90 0 0 127`  
Commands robot to move the head up


------------
### s (Stop locomotion)
The command tells the robot to stop locomotion action.

###### Format:
`s`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`s`  
Commands robot to stop moving


-------------------
### lt (Locomotion track)
The command tells the robot to move its locomotion tracks.

###### Format:
`lt \<left> \<right>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
left |-255 to 255|Y|Speed value for the left track.  Positive means forward and negative means backward.
right |-255 to 255|Y|Speed value for the right track.  Positive means forward and negative means backward.

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`lt -200 100`  
Commands robot to turn right

`lt 150 150`  
Commands robot to move straight forward


-------------------
### led (Change LED state)
The command changes the chest LED state on the robot.

###### Format:
`led \<red> \<green> \<blue>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
red |-0 to 255|Y|Red value for the LED color.
green |-0 to 255|Y|Green value for the LED color.
blue |-0 to 255|Y|Blue value for the LED color.

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`led 66 134 244`  
Change chest LED on the robot to blue color.


-------------------
### pac (Play audio clip)
The command play an audio clip stored on the robot.  Note that the file must have been previously uploaded onto Misty.

###### Format:
`pac \<sound>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
sound |String|Y|Name of the audio file without path.

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`pac Meow`  
Play Meow sound file on the robot.


-------------------
### sli (SLAM initialize)
The command initializes the SLAM system.

###### Format:
`sli`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`sli`  
Initialize SLAM system.


----------------------------
### sls (SLAM shutdown)
The command shutdowns the SLAM system.

###### Format:
`sls`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`sls`  
Shutdown SLAM system.


----------------------------
### slbm (SLAM begin mapping)
The command starts mapping using the SLAM system.

###### Format:
`slbm`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slbm`  
Start mapping


----------------------------
### slsm (SLAM stop mapping)
The command stops mapping on the SLAM system.

###### Format:
`slsm`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slsm`  
Stop mapping.


----------------------------
### slbt (SLAM begin tracking)
The command start tracking on the SLAM system.

###### Format:
`slbt`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slbt`  
Start tracking.


----------------------------
### slst (SLAM stop tracking)
The command stop tracking on the SLAM system.

###### Format:
`slst`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
`slst`  
Stop tracking.


----------------------------
### slgm (SLAM get map)
The command gets map from the SLAM system.

###### Format:
`slgm`

###### Parameters:
None

###### Response:
**Occupancy Grid** - Essentially a grid cell containing width, height and state value in each cell indicating occupied status.

###### Example:
`slgm`  
Get map.


----------------------------
### slgp (SLAM get path)
The command gets path to the specified destination (indicated by the x,y coordinate in the map obtained) from the SLAM system.

###### Format:
`slgp \<x> \<y>`

###### Parameters:

Argument | Values | Required? | Description
--- | --- | --- | ---
x |0 to 0xFFFFFFFF|Y|Integer value of the x position in the map
y |0 to 0xFFFFFFFF|Y|Integer value of the y position in the map

###### Response:
A string representing an array of (x,y) coordinates indicating the path to the destination.

###### Example Command:
`slgp 25 100`  
Get path to the destination (25,100) on the map.

###### Example Response:
`"[{\"X\": 10, \"Y\": 10}, {\"X\": 7, \"Y\": 5}, {\"X\": 1, \"Y\": 0}]"`  

----------------------------
### sas (Set affect state)
The command changes affect state on the robot.

###### Format:
`sas \<valence> \<arousal> \<dominance>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
valence|-1 to 1|Y|Valence value to be set
arousal|-1 to 1|Y|Arousal value to be set
dominance|-1 to 1|Y|Dominance value to be set

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`sas 0 0.5 0`  
Set the affect state on the robot to be high arousal, e.g. surprise.


----------------------------
## Configuration Commands ##


### wifi (Set WiFi)
Connects Misty to a specified WiFi source.

###### Format:
`wifi \<ssid> \<password>`

###### Parameters:
Argument | Values | Required? | Description
--- | --- | --- | ---
ssid|String|Y|WiFi network name
password|String|Y|WiFi network password

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`wifi testnetwork default`  
Sets Misty on the "testnetwork" WiFi network, which has "default" as a password.


----------------------------

## Information Commands ##


### b (Get battery)
Obtains Misty's current battery level.

###### Format:
`b`

###### Parameters:
None

###### Response:
**0 to 100** - The percentage that Misty's battery is currently charged.


-----------------
### gal | gacl (Get audio [clips] list)
Obtains a list of default and user-uploaded audio files currently stored on Misty.

###### Format:
`gal`

###### Parameters:
None

###### Response:
`[audioAssetName1, audioAssetName2, .. audioAssetNameN]`  - A list of stored audio assets.

###### Example:
`gal`  
Obtains a list of the audio assets currently stored on Misty.


-----------------
### gdi (Get device information)
Obtains a list of Misty's devices and their associated information.

###### Format:
`gdi`

###### Parameters:
None

###### Response:
**** - 

###### Example:
`gdi`  
Obtains device information from Misty.


-----------------
### gil (Get image list)
Obtains a list of the image assets currently stored on Misty.

###### Format:
`gil`

###### Parameters:
None

###### Response:
`[imageAssetName1, imageAssetName2, .. imageAssetNameN]`  - A list of stored image assets.

###### Example:
`gil`  
Obtains the current image assets.


-----------------
### gel (Get eyes image list)
Obtains a list of the eye image assets currently stored on Misty.

###### Format:
`gel`

###### Parameters:
None

###### Response:
`[eyesAssetName1, eyesAssetName2, .. eyesAssetNameN]`  - A list of stored eye assets.

###### Example:
`gel`  
Obtains the current eye image assets.


------------
### gs (Get sensor value)
Obtains the current value of the specified sensor.

###### Format:
`gs \<sensor_id>`

###### Parameters:
|Argument|Values|Required?|Description
---|:---:|:---:|---
sensor_id |string|Y|the unique name for a given sensor

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`gs ToF_0`  
Obtains the current value for Time of Flight sensor 0.


------------
### h | help (Display help information)
Displays detailed descriptions of Misty's available CLI commands.

###### Format:
`help`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`help`  
Displays detailed descriptions of Misty's available CLI commands.

