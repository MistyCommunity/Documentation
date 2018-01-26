---
title: Command Line Interface
layout: apis.hbs
columns: two
order: 2
---

# {{title}}

## Introduction

The Command Line Interface (CLI) is a quick and comprehensive way to manipulate robot via text based terminal with a set of short, easy to remember commands.

All commands follow the following format:
~~~
key_word <arg_1> ... <arg_n> [opt_arg_1] ... [opt_arg_n]
~~~

Where:

* Key_word is a command name/abbreviation,
* <arg_...> is a required argument,
* [opt_arg_..] is an optional argument.

To simplify parsing we are relying on arguments order. Therefore optional arguments must tail required.

## CLI Commands

### Action ###
These commands require robot to perform physical (mechanical, audible or visual) action
##### arm or a (Move arm)
Move left or right arm to a specified position at a specified speed
###### Format:
arm \<side> \<position> [speed]
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
side|l or r|Y|Selection of left (l) or right (r) arm to move.
position|-90 to 90|Y|Arm position; -90 means "down" position and 90 means "up" position.
speed|0 to 255|N|Speed; 0 means stand still and 255 means max speed.  Default value is 127.
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:

* **arm l 90 255** - Raise left arm up with max speed
* **arm r 0 127** - Raise right arm up to horizontal position with ~ half the max speed.
------------
##### ce or eyes (Move arm)
The command changes robot's screen to show eyes image, defined by image_id (string). Image must be uploaded and defined beforehand.
###### Format:
ce \<valence> \<arousal> \<dominance>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
valence|-0.5, 0 or 0.5|Y|Valence value that corresponds to the eye asset
arousal|-0.5, 0 or 0.5|Y|Arousal value that corresponds to the eye asset
dominance|-0.5, 0 or 0.5|Y|Dominance value that corresponds to the eye asset

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
Below are the valid parameters mapping to eye asset image.
~~~
Sad = "Valence": -0.5, "Arousal": -0.5, "Dominance": -0.5
Angry = "Valence": -0.5, "Arousal": 0.5, "Dominance": 0.5
Tired = "Valence": 0, "Arousal": -0.5, "Dominance": -0.5
Curious = "Valence": 0, "Arousal": 0, "Dominance": -0.5
Content = "Valence": 0, "Arousal": 0, "Dominance": 0.5
Surprise = "Valence": 0, Arousal": 0.5, "Dominance": 0
Calm = "Valence": 0.5, "Arousal": -0.5, "Dominance": -0.5
Jubilation = "Valence": 0.5, "Arousal": 0.5, "Dominance": -0.5
~~~
* **ce -0.5 -0.5 -0.5** - Change to display sad eye image

------------
##### ci, di or img (Change display image)
The command changes robot's screen to show an image, defined by image_name (string). Image must be uploaded and defined beforehand.
###### Format:
ce \<image>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
image|name string|Y|String, which represents an ID - unique name for an image file, usually filename w/o extension


###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **ci MistyLogo** - Changes image to "MistyLogo" image

------------

##### d (Drive)
The command drives robot backward or forward with linear_velocity (-255..255), turning left or right with angular_velocity (-255 .. 255)
###### Format:
d \<linear_velocity> \<angular_velocity>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
linear_velocity|-255 to 255|Y|Speed value for going straight.  Negative value represents backward movement and positive value represents forward movement.
angular_velocity |-255 to 255|Y|Speed value for turning.  Negative value represents counter clockwise movement and positive value represents clockwise movement.

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **d 255 0** - Drive forward with max speed
* **d -127 0**  - Drive backwards with half speed

------------
##### dt (Drive Time)
The command drives robot with linear_velocity in either backward or forward direction as well as turning left or right with angular_velocity for a given duration
###### Format:
dt \<linear_velocity> \<angular_velocity> \<duration>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
linear_velocity|-255 to 255|Y|Speed value for going straight.  Negative value represents backward movement and positive value represents forward movement.
angular_velocity |-255 to 255|Y|Speed value for turning.  Negative value represents counter clockwise movement and positive value represents clockwise movement.
duration |0 to 30000|Y|Duration for driving in milliseconds.  Maximum is 30 seconds.

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **dt 255 0 5000** - Drive forward at max speed for 5 seconds

------------
##### fp (Follow Path)
The command tells the robot to move following the given path.  The command requires that the SLAM system is active and running and the robot has already obtained a map of the area of interest.
###### Format:
fp \<waypoints>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
waypoints |string coordinates|Y|A string in JSON format containg (x,y) coordinates obtained from the map

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **fp "[{\"X\": 10, \"Y\": 10}, {\"X\": 7, \"Y\": 5}, {\"X\": 1, \"Y\": 0}]"** - Commands robot to follow the path defined by these waypoints.

------------
##### head (Move Head)
The command tells the robot to move its head in all three axis (yaw, pitch, roll) at the given speed.
###### Format:
head \<pitch> \<roll> \<yaw> \<speed>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
pitch |-90 to 90|Y|Angle value around the axis
roll |-90 to 90|Y|Angle value around the axis
yaw |-90 to 90|Y|Angle value around the axis
speed |0 to 255|Y|Speed that the head will move

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **head -90 0 0 127** - Commands robot to move the head up

------------

##### s (Stop locomotion)
The command tells the robot to stop locomotion action.
###### Format:
s
###### Parameters:

None

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **s** - Commands robot to stop moving

-------------------
##### lt (Locomotion Track)
The command tells the robot to move its locomotion tracks.
###### Format:
lt \<left> \<right>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
left |-255 to 255|Y|Speed value for the left track.  Positive means forward and negative means backward.
right |-255 to 255|Y|Speed value for the right track.  Positive means forward and negative means backward.


###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **lt -200 100** - Commands robot to turn right
* **lt 150 150** - Commands robot to move straight forward
-------------------

##### led (Change LED state)
The command changes the chest LED state on the robot.
###### Format:
led \<red> \<green> \<blue>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
red |-0 to 255|Y|Red value for the LED color.
green |-0 to 255|Y|Green value for the LED color.
blue |-0 to 255|Y|Blue value for the LED color.

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **led 66 134 244** - Change chest LED on the robot to blue color.

-------------------

##### pac (Play Audio Clip)
The command play an audio clip stored on the robot.  Note that the file needs to be uploaded onto the robot before hand.
###### Format:
pac \<sound>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
sound |String|Y|Name of the audio file without path.

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **pac Meow** - Play Meow sound file on the robot.

-------------------

##### sli (SLAM Initialize)
The command initializes the SLAM system.
###### Format:
sli
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **sli** - Initialize SLAM system.

----------------------------
##### sls (SLAM Shutdown)
The command shutdowns the SLAM system.
###### Format:
sls
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **sls** - Shutdown SLAM system.

----------------------------
##### slbm (SLAM Begin Mapping)
The command starts mapping using the SLAM system.
###### Format:
slbm
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **slbm** - Start mapping

----------------------------
##### slsm (SLAM Stop Mapping)
The command stops mapping on the SLAM system.
###### Format:
slsm
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **slsm** - Stop mapping.

----------------------------
##### slbt (SLAM Beginning Tracking)
The command start tracking on the SLAM system.
###### Format:
slbt
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **slbt** - Start tracking.

----------------------------
##### slst (SLAM Stop Tracking)
The command stop tracking on the SLAM system.
###### Format:
slst
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **slst** - Stop tracking.

----------------------------
##### slgm (SLAM Get Map)
The command gets map from the SLAM system.
###### Format:
slgm
###### Parameters:

None
###### Response:

**Occupancy Grid** - Essentially a grid cell containing width, height and state value in each cell indicating occupied status.

###### Example:
* **slgm** - Get map.

----------------------------
##### slgp (SLAM Get Path)
The command gets path to the specified destination (indicated by the x,y coordinate in the map obtained) from the SLAM system.
###### Format:
slgp \<x> \<y>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
x |0 to 0xFFFFFFFF|Y|Integer value of the x position in the map
y |0 to 0xFFFFFFFF|Y|Integer value of the y position in the map

###### Response:

**"[{\"X\": 10, \"Y\": 10}, {\"X\": 7, \"Y\": 5}, {\"X\": 1, \"Y\": 0}]"** - A string representing an array of (x,y) coordinates indicating the path to the destination

###### Example:
* **slgp 25 100** - Get path to the destination (25,100) on the map.

----------------------------

##### sas (Set Affect State)
The command changes affect state on the robot.
###### Format:
sas \<valence> \<arousal> \<dominance>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
valence|-1 to 1|Y|Valence value to be set
arousal|-1 to 1|Y|Arousal value to be set
dominance|-1 to 1|Y|Dominance value to be set

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **sas 0 0.5 0** - Set the affect state on the robot to be high arousal ex. surprise emotion


----------------------------

##### wifi (Set WiFi)
The command set WiFi network on the robot.
###### Format:
wifi \<ssid> \<password>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
ssid|String|Y|WiFi network name
password|String|Y|WiFi network password

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **wifi testnetwork default** - Set the robot on testnetwork WiFi network which has default as password


----------------------------
### Configuration ###
These commands accept new values or settings to be saved and/or used on the robot



### Information ###
These commands return information about the robot
##### b (Get Battery)
Read the robot's current battery level
###### Format:
b
###### Parameters:

None
###### Response:

**0 to 100** - Percent of battery charge value

-----------------

##### gal or gacl (Get Audio [Clips] List)
The command returns a list of audio clip assets stored in the robot's memory. Audio clip must be uploaded and defined beforehand.
###### Format:
gal
###### Parameters:

None

###### Response:

**[audioAssetName1, audioAssetName2, .. audioAssetNameN]** - A list of stored audio clip assets on the robot

###### Example:
* **gal** - Returns currently defined(stored in robot) audio assets.

-----------------

##### gdi (Get Device Information)
The command returns information about the robot.
###### Format:
gdi
###### Parameters:

None

###### Response:

**** -

###### Example:
* **gdi** - Returns robot's information

-----------------

##### gil (Get Image List)
The command returns a list of image assets stored in robot's memory. Images must be uploaded and defined beforehand.
###### Format:
gil
###### Parameters:

None

###### Response:

**[imageAssetName1, imageAssetName2, .. imageAssetNameN]** - A list of stored image assets

###### Example:
* **gil** - Returns current image assets.

-----------------

##### gel (Get Eyes Image List)
The command returns a list of eye image assets stored in robot's memory. Eyes sets must be uploaded and defined beforehand.
###### Format:
gel
###### Parameters:

None

###### Response:

**[eyesAssetName1, eyesAssetName2, .. eyesAssetNameN]** - A list of stored eye sets assets

###### Example:
* **gel** - Returns current eye set assets.

------------
##### gs (Get Sensor value)
The command returns current value of the sensor defined by sensor_id.
###### Format:
gs \<sensor_id>
###### Parameters:

|Argument|Values|Required?|Description
---|:---:|:---:|---
sensor_id |string|Y|String, which represents an ID - unique name for a robot's sensor

###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **gs ToF_0** - Gets Time of Flight sensor 0's current value.

------------
##### h or help (Display Help Information)
The command displays helpful information and detailed description of available CLI commands.
###### Format:
help
###### Parameters:

None
###### Response:

**OK or FAIL** - Boolean value represents whether the command was executed

###### Example:
* **help** - Display help information.

## Design Specs
* Commands should be short and easy to type.
* Commands should be comprehensive, i.e. easy to guess what it is for
* All Command should be well documented, short help must be available via CLI itself.
* Commands should have minimum required arguments and all optional arguments must have "default" values which have to be well documented.

An API command-handling subsystem relies on API Channels to provide pipelines between HomeRobot App and external sources. The main Role of the Channel to receive a command, parse the command, convert it to ApiCommandCall, fire an onCommandReceived event, get a response from the robot app and send a response to the requesting external source. Therefore CLI API requires a separate specific ApiCommandChannel.
