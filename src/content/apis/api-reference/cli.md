---
title: Command Line Interface
layout: apis.hbs
columns: one
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

--------
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

--------
### d (Drive)
Moves Misty backward or forward with a given linear velocity and turns Misty left or right with a given angular velocity.

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

--------
### dt (Drive time)
Moves Misty with either backward or forward, as well as turning left or right, for a specified amount of time.
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

--------
### led (Change LED state)
Changes the color of the LED on Misty's torso.

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

--------
### lt (Locomotion track)
Moves Misty's tracks.

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

--------
### pac (Play audio clip)
Plays an audio clip stored on Misty.  Note that the file must have been previously uploaded onto Misty.

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

--------
### s (Stop locomotion)
Stops all locomotion and motor commands.

###### Format:
`s`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`s`  
Commands robot to stop moving

--------
### sli (SLAM initialize)
Initializes the SLAM system.

###### Format:
`sli`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`sli`  
Initialize SLAM system.

--------
### sls (SLAM shutdown)
Shuts down the SLAM system.

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

--------
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

--------
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

--------
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

--------
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



## Beta/Experimental Commands


### head (Move head) - BETA
Moves Misty's head on a given axis (yaw, pitch, roll) at a specified speed.

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


--------
### slbm (SLAM begin mapping) - BETA
Starts Misty mapping.

###### Format:
`slbm`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slbm`  
Start mapping


--------
### slsm (SLAM stop mapping) - BETA
Stops Misty mapping.

###### Format:
`slsm`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slsm`  
Stop mapping.


--------
### slbt (SLAM begin tracking) - BETA
Starts Misty tracking.

###### Format:
`slbt`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value indicating whether the command was executed.

###### Example:
`slbt`  
Start tracking.


--------
### slst (SLAM stop tracking) - BETA
Stops Misty tracking.

###### Format:
`slst`

###### Parameters:
None

###### Response:
**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
`slst`  
Stop tracking.


--------
### slgm (SLAM get map) - BETA
Obtains the current map Misty has created.

###### Format:
`slgm`

###### Parameters:
None

###### Response:
**Occupancy Grid** - Essentially a grid cell containing width, height and state value in each cell indicating occupied status.

###### Example:
`slgm`  
Get map.


--------
### fp (Follow path) - BETA
Moves Misty on a specified path. The command requires that the SLAM system is active and running and the robot has already obtained a map of the area of interest.

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
