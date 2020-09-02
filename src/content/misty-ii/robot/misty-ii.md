---
title: Misty II Overview
layout: onboarding.hbs
columns: one
order: 1
---

# {{title}}

Your Misty II robot has been designed and built by the Misty Robotics team. This document provides some quick, out-of-box setup steps and helpful details about using Misty II.

To avoid the risk of driving Misty off a high surface, we recommend either working with your robot on the floor, or temporarily elevating the treads so the robot cannot drive. To do this, you can place Misty on the the foam block stand that arrived in the box. While Misty **is** designed to automatically detect obstacles and ledges, placing her on this foam block will ensure that she doesn’t accidentally roll off the table while you're coding.

![Misty sits on her stand](/assets/images/misty-stand.gif)

## Unpacking the Misty II

Misty II arrives packed safely inside her carrying case. The easiest and safest way to remove Misty from her case is to open the latches and position the case vertically, so the robot is fully upright. With the case open, grip the Misty II by its torso (never by the arms) and gently slide it out of or into the case.

![Unpacking Misty](/assets/images/unpacking-misty.jpg)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The robot’s arms and related components can become damaged under excessive force. To avoid damaging your robot, never remove the Misty II from its packaging by pulling on its arms.
{{box op="end"}}

Misty II arrives with her magnetic headpiece and backpack attachments connected. In addition to the robot, the carrying case includes the following items:

* charging station - *Misty II Standard and Enhanced Editions only*
* charging station AC power supply (thin barrel jack) - *Misty II Standard and Enhanced Editions only*
* Misty II AC power supply (thick barrel jack) - *Misty II Basic only*
* foam block stand for Misty II
* legal guide
* printed User Guide

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** Do not attempt to connect the AC power supply for the charging station to the port underneath Misty's base.

If you purchased the Misty II Basic Edition, your robot arrives with a wired AC power supply that connects to the port underneath Misty's base. The barrel jack on this power supply is thicker than the power supply for the wireless charging station, and is designed to fit the power port underneath Misty's base. This power supply uses a different voltage than the power supply for Misty's wireless charging station. **Do not** attempt to use these power supplies interchangeably.
{{box op="end"}}

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty's packaging has been specially designed to protect your robot during shipping. You can keep the original packaging for shipping or for traveling with your robot in the future.
{{box op="end"}}

## Powering Up & Powering Down

We recommend powering up Misty on the floor, if possible, to avoid the risk of driving your robot off the edge of a table or other high surface. If you are experimenting with Misty on a table top, place her on the foam block stand that arrived in her carrying case to elevate her treads above the surface of the table.

### Turning Misty On

1. Toggle the power switch on Misty's base (located between the treads beneath the rear time-of-flight sensor).![Misty II power switch](/assets/images/mii-power.jpg)
2. The Misty Robotics logo first appears on the screen. Then Misty’s eyes appear, beginning in a closed state. The eyes gradually open as Misty boots up.![Misty II eyes closed](/assets/images/mii-waking.jpg)
3. When the eyes appear fully open, Misty is done booting up. This should take a little more than a minute. ![Misty II eyes open](/assets/images/mii-awake.png)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Your Misty II arrives with her battery charged and should not require additional charging before first use. When her battery is low, Misty may fail to respond to some API commands. If this happens you can restore functionality by connecting your robot to a power source and performing a manual reboot.
{{box op="end"}}

### Restarting Misty

If you need to restart Misty:

1. Turn off the power switch on Misty's base.
2. Wait 10 seconds.
3. Turn on the power switch on Misty's base again. Misty has rebooted when her eyes are fully open.

### Turning Misty Off

To turn off your robot, turn off the power switch on Misty’s base.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** There is no graceful shutdown at this time. When Misty’s battery gets below about 7 volts, she abruptly powers down.
{{box op="end"}}

## Connecting to Wi-Fi

You send REST commands to Misty and install skills on her system over your local Wi-Fi connection. When your robot is powered on, you can set up Misty's internet connection with the [Misty App](../../../tools-&-apps/mobile/misty-app/#connecting-misty-to-bluetooth-and-wi-fi).

## Charging Misty II

You can charge Misty with her wireless charging station, or you can plug Misty’s AC power supply (optional
accessory) directly into the port on her base. When charging while powered on, Misty's chest LED pulses orange.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's fans turn on while the robot is charging, even when Misty is turned off. These fans stay on for as long as the robot is charging.
{{box op="end"}}


{{box op="start" cssClass="boxed warningBox"}}
**Warning:** The AC power supply for charging Misty via a wired connection **is not** interchangeable with the power supply for the wireless charging station. **Do not** attempt to charge Misty by connecting her directly to the power supply for the wireless charging station, and **do not** attempt to connect the charging station to the AC power supply that connects directly to the port underneath Misty's base.
{{box op="end"}}

### Wireless Charging

To use Misty's wireless charging station, follow these steps:

1. Connect the power supply for the wireless charging station to power. To prevent tripping hazards, wrap any extra length of the power cable around the nodes inside the rear compartment of the charging station.
2. Place the charging station on the floor.
3. Place Misty on the center of the charging station. Position her to be facing out, with her back against the rear compartment of the charging station, and make sure the arrows on Misty's base are lined up with the arrows on the charging station.![Misty II on her charging station](/assets/images/mii-charging.jpg)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When Misty is turned off, she automatically stops receiving a charge from the wireless charging station after charging for about four hours. This timeout occurs whether the robot is fully charged or not. To make sure Misty receives a full charge, we recommend powering her on before setting her on the wireless charging station.
{{box op="end"}}

### Wired Charging

Follow these steps to charge Misty via a wired connection:

1. Remove the rubber flap covering the power port underneath Misty’s base.
2. Connect Misty’s AC power supply (**not** the power supply for the wireless charging station) to her power port.
3. Connect the power supply to an outlet.

## Coordinate System & Movement Ranges

As you develop skills and robot applications, it can be helpful to understand a few key details about Misty's coordinate system and the range of movement allowed for her head and arm motors.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For a graphical representation of Misty's coordinate system and movement ranges, be sure to download the [Misty II Coordinate System & Movement Ranges PDF](https://misty-releases.s3.amazonaws.com/resources/Misty+II+Coordinate+System+%26+Movement+Ranges+-+Misty+Robotics.pdf).
{{box op="end"}}

* Misty uses a **right-handed coordinate frame** when orienting her body, head, and arms relative to her surroundings, when interpreting movement and locomotion commands, and when publishing sensor data.
* Most of Misty's commands and event types ingest and publish angular measurement data using degrees (instead of radians) as the default unit of measurement. As such, we recommend using degrees to calculate position and movement whenever you can.
* Misty's inertial measurement unit (IMU) orients its heading to `0/360` degrees each time Misty boots up. For Misty, an IMU `yaw` value of `0/360` degrees does **not** represent true north unless Misty is facing true north when the IMU orients its heading.
* Because the IMU is located in Misty's torso, readings from the IMU only change when Misty's body moves. They do not change relative to the position of Misty's head.
* A positional value of 0 degrees orients Misty's arms to point horizontally forward, directly in front of the robot. To prevent interference between the arms and the plastic lens protecting Misty's display, her arms cannot move higher than -29 degrees. Additionally, they cannot move lower than 90 degrees (pointing straight down).
* A positional value of 0 degrees for head movement in the roll, pitch, and yaw directions orients Misty's head to face straight forward, directly in front of the robot.
* The system returns audio localization data relative to the direction Misty's head is facing (instead of her torso). The heading of Misty's face is the `0/360` angle relative to incoming audio localization data.

## Default Behaviors

Misty II exhibits certain behaviors that override commands she receives from skills and robot applications. Some of these default behaviors are cosmetic, and others help prevent Misty from executing commands that could cause harm to Misty, the people around her, or her environment. The sections below describe some of these behaviors in detail, so you can understand how to work with (or around) them in your skill development.

### Chest LED Notifications

The following chest LED notifications are enabled by default. You can turn them off by sending a request to the [`SetNotificationSettings`](../../../misty-ii/rest-api/api-reference/#setnotificationsettings) endpoint in Misty's REST API.

* **Recording Audio** - While Misty is recording audio or listening for the "Hey, Misty!" key phrase, her chest LED pulses blue.
* **Charging** - While Misty is powered on and charging, her chest LED pulses orange. When her battery is fully charged and she is on/connected to her charger, the LED turns solid orange.
* **Face Training** - When you are training Misty on a new face, her chest LED displays the following notifications:
  * When the face detection phase of the training process is complete, the LED turns green.
  * When training is complete, the LED blinks green three times.
  * If training fails, the LED blinks red three times.
  * If Misty sees more than one face, the LED blinks yellow three times.
  * If Misty doesn't see a face, the LED turns yellow.
* **System Updates** - While Misty is performing a system update, the LED blinks white.

### Audio Notifications

The following audio notifications are enabled by default. You can turn them off by sending a request to the [`SetNotificationSettings`](../../../misty-ii/rest-api/api-reference/#setnotificationsettings) endpoint in Misty's REST API.

* **Wake Word** - When Misty recognizes the "Hey, Misty!" key phrase, she plays the system audio file `s_SystemWakeWord.wav`. You can change the default wake word sound by sending a request to the [`SetNotificationSettings`](../../../misty-ii/rest-api/api-reference/#setnotificationsettings) endpoint in Misty's REST API.

### Tally Light Notifications

The blue tally light beneath Misty's flashlight automatically turns on during certain activities to notify users that the robot is collecting personally identifiable information (PII) such as video recordings, audio recordings, and pictures. You cannot override tally light notifications. By default, the tally light turns on while Misty is:

* recording a video
* AV streaming
* creating a SLAM sensor (OCC) recording
* recording audio (both during manual audio recordings **and** during speech capture recordings)
* recognizing faces
* taking pictures with her RGB or fisheye camera
* taking a depth image

The tally light does **not** turn on when Misty is:

* **detecting** faces (without face recognition)
* mapping or  tracking
* listening for the wake word


### Scruff Reflex

Misty ignores all commands she receives for as long as she detects someone touching the `CapTouch_Scruff` sensor in the handle on the back of her head. This behavior is designed is to prevent Misty from moving in ways that could damage her (or the human holding her) if she’s picked up while running a skill. This behavior does not cancel any running skills. It only causes Misty to ignore commands those skills invoke. When the `CapTouch_Scruff` touch sensor is released, Misty resumes execution of any new commands she receives.

### Hazards System

Misty's software includes a built-in hazards system that is intended to prevent your robot from executing commands that could cause her harm. This system uses data from Misty's sensors to prevent Misty from driving off of surfaces that could cause her to tip or fall, such as tables, desks, or stairs. It also stops Misty from continuing to drive when she senses an obstacle nearby, or when she detects that she has bumped into an object.

In addition to protecting your robot from harm, the hazards system sends an event message each time Misty enters or exits a hazards state. You can use these messages to programmatically alter Misty's course when she detects cliffs or obstacles while autonomously navigating her environment. See the [Event Types](../../../misty-ii/robot/sensor-data/#hazardnotification) section of these docs for details on using this data in your skills.

By default, Misty's bump and time-of-flight sensors put the robot into a hazard state in the following circumstances:
* when her edge time-of-flight sensors detect a drop distance of 0.06 meters (60 mm) or greater in the direction she is moving.
* when her range time-of-flight sensors detect an obstacle 0.215 meters (215 mm) or closer in the direction she is moving.
* when one of her bump sensors becomes activated, indicating she has collided with an object.

When Misty detects an obstacle or an edge, she ignores any commands that would move her in the direction of the sensors that are in a hazard state. For example, when Misty is driving forward, she stops driving if one or more of the following happens:
* if one of her front-facing bump sensors is pressed
* if the front edge time-of-flight sensors detect a high ledge
* if the front range sensors detect an obstacle nearby

In this situation, after she stops driving, Misty ignores any forward drive commands until the system indicates none of her front bump or time-of-flight sensors are in a hazard state. To get out of a hazard state, you can code Misty to reverse directions and choose a new path.

### Misty's Max Speed

To enable the hazards system to work effectively, Misty's max speed is limited to ~450 mm/s. This is the highest speed at which Misty can safely detect most ledges and stop moving, without being carried over the edge by any built-up momentum. The hazards system will be enhanced in future updates to allow for increased performance and to increase Misty's default max speed.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** While edge detection has proven effective in most of our testing, there are still situations in which the robot may fail to catch herself. It's more difficult for the hazards system to detect an edge when Misty is driving backwards or on tables with rounded edges. The larger the radius of the curve, the harder it is for Misty to stop moving in time to prevent falling. Until further enhancements to the hazards system are in place, we recommend you continue to operate Misty using the foam block on high surfaces like tables, counter-tops, and desks, unless you are supervising Misty and can safely catch her in the event of a fall and have also done extensive testing with the robot in your specific environments.
{{box op="end"}}

## Using Misty's RGB Camera

This section provides an overview of Misty's RGB camera and the services used for different camera functions. For detailed descriptions of the commands you call to use these functions, see the API reference documentation. 

Misty's RGB camera is embedded in the center of her visor. Misty uses this camera to take pictures, record videos, and stream image data for computer vision (CV) activities like face training, face detection, and face recognition. You can also stream video from Misty's camera to an external media server, or directly to a streaming client on the same network as your robot.


### Camera Service

To use the camera for taking pictures, recording videos, and for CV activities, Misty's camera service must be enabled. By default, the camera service is enabled when Misty boots up. You can enable and disable the camera service manually by using the [`EnableCameraService`](../../../misty-ii/rest-api/api-reference/#enablecameraservice) and [`DisableCameraService`](../../../misty-ii/rest-api/api-reference/#disablecameraservice) commands.

Misty cannot run commands that use the camera service, or stream messages from any event types that use the camera service, when the camera service is disabled. You can find the full list of these commands and event types in the documentation for the [`DisableCameraService`](../../../misty-ii/rest-api/api-reference/#disablecameraservice) command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other.
{{box op="end"}}

### AV Streaming Service

To use the camera for AV streaming, Misty's AV streaming service must be enabled. **By default, the AV streaming service is disabled when Misty boots up.** You can enable and disable the camera service manually by using the [`EnableAvStreamingService`](../../../misty-ii/rest-api/api-reference/#enableavstreamingservice) and [`DisableAvStreamingService`](../../../misty-ii/rest-api/api-reference/#disableavstreamingservice) commands.



{{box op="start" cssClass="boxed noteBox"}}
**Notes:**

* The AV streaming service and the camera service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other.
* Misty cannot use her microphones for wake word detection, recording audio, or recording speech while actively streaming audio and video.
{{box op="end"}}

### Picture and Video Resolution

When Misty powers on, she starts up a new camera session with default resolution settings of 1920 x 1080 for recording videos and 4160 x 3120 for taking pictures. When you take a picture or start recording video without specifying a resolution, the system defaults to using the resolution already set for that action in the current camera session. When you specify a different resolution than what is set for that action in the current camera session, the session resets to use the new resolution settings. This has the following implications:

* Misty cannot reset the camera session while actively recording video. If you try to take a picture at a new resolution while Misty is recording video, she takes a picture with the resolution settings for the current camera session (instead of the new resolution that you asked for).
* If Misty is already performing computer vision (CV) activities when the camera session resets, these activities automatically resume when the new camera session is ready.
* Recording videos at 3840 x 2160 changes the max resolution for taking pictures to 3840 x 2160. If you record video at 1920 x 1080 (or lower), then Misty can use the highest possible resolution for taking pictures. If you record a video at 3840 x 2160 when the resolution for taking pictures is set to the highest resolution, the system automatically lowers the resolution for taking pictures to 3840 x 2160.

A camera session remains active with the new resolution settings until **a)** Misty receives a command to take a picture or record a video with different resolution settings, **b)** Misty reboots, or **c)** you disable and re-enable the camera service.

## Using Misty's Display

Misty's API enables you to show images, text, videos, and animated `.gifs` on the robot's display.

Misty uses a layering system to show different types of content. You can create as many layers as you like, and each layer can display one piece of content. The commands for displaying each type of content are:

* [`DisplayImage`](../../../misty-ii/rest-api/api-reference/#displayimage) (or [`DisplayLayerImage`](../../../misty-ii/javascript-sdk/api-reference/#misty-displaylayerimage) in Misty's JavaScript SDK)
* [`DisplayText`](../../../misty-ii/rest-api/api-reference/#displaytext)
* [`DisplayVideo`](../../../misty-ii/rest-api/api-reference/#displayvideo)
* [`DisplayWebView`](../../../misty-ii/rest-api/api-reference/#displaywebview)

You can use the following commands to adjust the settings for each layer you create:

* [`SetImageDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setimagedisplaysettings)
* [`SetTextDisplaySettings`](../../../misty-ii/rest-api/api-reference/#settextdisplaysettings)
* [`SetVideoDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setvideodisplaysettings)
* [`SetWebviewDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setwebviewdisplaysettings)

Additionally, you can use the [`SetDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setdisplaysettings) command to revert the display to its default settings. This command clears all layers and resets the display to show Misty's default `e_Content.jpg` eyes.

If you do not specify a layer when you call a display command, the content displays on the default layer for that command. The default layers for each media type are:
* `ErrorDisplayLayer`
* `DefaultImageLayer`
* `DefaultTextLayer`
* `DefaultVideoLayer`
* `DefaultWebViewLayer`

{{box op="start" cssClass="boxed noteBox"}}
**Notes:**

* The `ErrorDisplayLayer` is reserved for system error messages. You cannot write new content or change the settings for the `ErrorDisplayLayer`.
* The `DefaultImageLayer` is the only layer that does not automatically draw on top of other layers when the layer updates. `PlaceOnTop` is set to `false` for this layer by default, so that Misty's eyes do not re-draw on top of other media when Misty blinks. If you write to another layer and then update the `DefaultImageLayer`, the `DefaultImageLayer` updates *behind* the more recently updated layers, unless you use the [`SetImageDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setimagedisplaysettings) command to change the default setting for the `PlaceOnTop` attribute for that layer.
* The `DefaultImageLayer` is the only layer on which Misty's default blinking behavior works. 
{{box op="end"}}


## Connecting to adb

You can use the Android Debug Bridge (adb) command line tool to communicate with the Android operating system running on Misty's 820 processor. This is useful when you want to access assets stored on the 820, view additional logs, or configure settings exposed through Misty's Android device. You can [download adb for free from the Android developer documentation](https://developer.android.com/studio/command-line/adb).

Once you have installed adb, you can use it to establish a connection to your Misty II robot. There are two different methods we recommend for establishing this connection. Which method to use depends on the changes you have applied to your robot's Android operating system.

* If you have **not** applied the [Android patch for improved SLAM performance](https://community.mistyrobotics.com/t/2020-01-07-misty-ii-android-patch-for-improved-slam-performance/2415), you can connect to adb using Misty's Wi-Fi IP address. 
* If you **have** applied the Android patch **and** you created an `unblockwifiadb` file in the `\data\misty\` directory on the SDcard for Misty's 820 processor, you can connect to adb using Misty's Wi-Fi IP address.
* If you **have** applied the Android patch for improved SLAM performance and did **not** create an `unblockwifiadb` file in the `\data\misty\` directory on the SDcard for Misty's 820 processor, you can connect to adb using the IP address for a USB-to-Ethernet adapter connected to the USB port on Misty's back.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When the Android patch for improved SLAM performance has been applied, you can enable or disable adb over Wi-Fi at any time by following the steps in [Toggling adb over Wi-Fi](./#toggling-adb-over-wi-fi) below. 
{{box op="end"}}

### adb Over Wi-Fi

Once you have installed adb on your computer, you can connect to adb using your robot's Wi-Fi IP address. This is the same IP address that appears in the Misty App. Follow these steps:

1. Open a new command prompt / terminal window.
   * On Windows operating systems, you can open a new command prompt by launching the Start menu and searching for "command prompt".
   * On Mac operating systems, you can open a new terminal window by pressing **Command + Space**, searching for "terminal", and pressing **Enter**.
2. Enter `adb connect <Misty-Wi-Fi-ip-address>:5555`

You can now use adb to communicate with your robot's Android device.

### adb With a USB-to-Ethernet Adapter

You can connect to adb with the IP address for a USB-to-Ethernet adapter by following these steps:

1. [Follow these instructions](../../../misty-ii/dotnet-sdk/getting-started/#connecting-to-misty-39-s-410-ip-address) to get an IP address for connecting to Misty's 410 processor. This requires a USB-to-Ethernet adapter, which does not arrive with Misty and must be purchased separately.
2. Connect the USB end of the adapter to the port on your robot's back.
3. Open a new command prompt / terminal window.
4. Enter `sudo ssh -L 127.0.0.1:5555:10.10.10.100:5555 administrator@<USB-ETH-IP>`
   * **Note:** If you get an error that indicates ssh is using an obsolete cypher, your robot may be using an older version of Windows IoT. You can get around the issue by entering the following: `sudo ssh -c aes256-cbc -L 127.0.0.1:5555:10.10.10.100:5555 administrator@<USB-ETH-IP>`
5. Enter your robot's Windows administrator password to log in to the 410 via ssh. The Windows administrator password is [printed on the sticker underneath your robot](../../../misty-ii/robot/misty-ii/#connecting-to-misty-39-s-file-system).
6. Keep this connection established and open a second command line / terminal window. Enter: `adb connect 127.0.0.1:5555`

You can now use adb as normal until the initial connection is lost.

### Toggling adb Over Wi-Fi

If you have applied the [Android patch for improved SLAM performance](https://community.mistyrobotics.com/t/2020-01-07-misty-ii-android-patch-for-improved-slam-performance/2415), then you can enable adb over Wi-Fi by creating an `unblockwifiadb` file in the `\data\misty\` directory on the SDcard for Misty's 820 processor. If the `unblockwifiadb` file does not exist in the correct directory, then using adb with Misty's Wi-Fi IP address is disabled by default after you apply the patch.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The steps to create this file require an adb connection. You can create the file before **or** after you apply the Android patch. However, if you want to create the file **after** you apply the patch, then you must connect to adb using the IP address for a USB-to-Ethernet adapter. If you have not applied the patch, you can connect to adb using the Wi-Fi IP address provided in the Misty App.
{{box op="end"}}

**To enable adb over Wi-Fi:**

1. Open a new command prompt / terminal window.
2. Connect to adb.
   * If you have already applied the patch, then adb connections over Wi-Fi are disabled by default, and you must connect to adb using the IP address for Misty's USB-to-Ethernet adapter. Follow the steps in  **[adb With a USB-to-Ethernet Adapter](./#adb-with-a-usb-to-ethernet-adapter)**.
   * If you have not applied the patch, you can connect to adb using Misty's Wi-Fi IP address. In your prompt / terminal window, enter: `adb connect <wifi-ip-address>:5555` 
3. Create a new adb shell: `adb shell`
4. Enter the following commands:
   1. `su`
   2. `touch /data/misty/unblockwifiadb` (Note that the name of the file is case-sensitive.)
   3. `reboot`

Connecting to adb over Wi-Fi is now enabled.

**To disable adb over Wi-Fi:**

1. Open a new command prompt / terminal window.
2. Connect to adb.
   * If you have already applied the patch, then adb connections over Wi-Fi are disabled by default, and you must connect to adb using the IP address for Misty's USB-to-Ethernet adapter. Follow the steps in  **[adb With a USB-to-Ethernet Adapter](./#adb-with-a-usb-to-ethernet-adapter)**.
   * If you have not applied the patch, you can connect to adb using Misty's Wi-Fi IP address. In your prompt / terminal window, enter: `adb connect <wifi-ip-address>:5555` 
3. Create a new adb shell: `adb shell`
4. Enter the following commands:
   1. `su`
   2. `rm /data/misty/unblockwifiadb`
   3. `reboot`

Connecting to adb over Wi-Fi is now disabled by default. You can connect to adb (and recreate the file to enable adb over Wi-Fi) by connecting to adb with the IP address for a USB-to-Ethernet Adapter.

## Configuring Misty's Wake Word & Voice Activity Detection Engine

You can create an audio configuration file on Misty's 820 processor to change the robot's default wake word from "Hey, Misty" to "Hey, Snapdragon". You can also use this file to set Misty to use the WebRTC voice activity detection (VAD) engine for speech capture activities, instead of her default VAD engine.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Under conditions with low ambient noise, using "Hey, Snapdragon" can improve Misty's responsiveness during key phrase recognition by 40-80%. Additionally, using WebRTC for voice activity detection can improve end-of-speech detection and allow Misty to record human speech more accurately. We are still testing the advantages and disadvantages of using WebRTC for voice activity detection, and chose to release this implementation so that Misty's community of developers can experiment with us.
{{box op="end"}}

To change Misty's default wake word and VAD engine, create (or update) a configuration file with the name `audio_config.json` in the `/sdcard/audio/` directory of Misty's 820 processor. 

Follow these steps to create the configuration file and upload it to Misty. Use the `keyphrase` attribute to change Misty's default wake word, and use the `vad_engine` attribute to change the default VAD engine.

1. Create a file called `audio_config.json` on your computer with the following (case-sensitive) contents. You can omit key/value pairs for the attributes you don't want to change.

```json
{
    "misty_settings": {
        "keyphrase": "HeySnapdragon",
        "vad_engine": "WebRTC"
    }
}
```
2. Open a new command prompt / terminal window. Navigate to the path where `audio_config.json` is saved: `cd </path/to/audio_config.json>`
3. With Misty turned on and fully booted, [connect to adb](./#connecting-to-adb).
4. Enter the following command in your command prompt / terminal window to upload the file to Misty: `adb push audio_config.json /sdcard/audio`

You can revert Misty to use her default wake word or VAD engine by updating the `audio_config.json` file to remove the relevant key/value pairs. Alternatively, you can follow these steps to remove the `audio_config.json` file entirely:

1. With Misty turned on and fully booted, [connect to adb](./#connecting-to-adb).
2. Open a new command prompt / terminal window and enter the following:
   1. `adb shell`
   2. `rm sdcard/audio/audio_config.json`

## Connecting to Misty's File System

You can access your robot's Windows file system by connecting to the robot's 410 processor over your local network connection.

1. Power Misty on and make sure she is connected to the same network as your computer.
2. Connect to your robot's file system.
   1. On a Mac:
      1. Open **Finder**
      2. Select **Go &rarr; Connect to Server** from the top menu
      3. Enter `smb://<robot-ip-address>/c$`
   2. On Windows 10:
      1. Open **File Explorer**
      2. Navigate to the path `\\<robot-ip-address>\c$`
3. When prompted, enter the username and password printed on the sticker on the bottom of your robot's base. ![Windows 10 Login Credentials](/assets/images/windows-credentials.jpg)

## Misty II Specs

The Misty II platform is available in three models: *Basic*, *Standard*, and *Enhanced*. Each model is packed with sophisticated hardware and software features that contribute to the platform's ruggedness and extensibility. This section provides a bit more detail about the hardware, technologies, and capabilities you'll find in each model.

### Misty II Basic Edition

The **Misty II Basic Edition** provides a professional-grade platform robot at an affordable price. This model comes with all of the hardware and functionality of the Standard Edition **except** the Occipital Structure Core Depth Sensor and wireless charging pad. 

This model is designed for tasks that do not require the functionality that the depth sensor provides, such as auto-docking, sophisticated mapping, simultaneous localization and mapping (SLAM), and the creation of 3D images for use with CAD software. You can use this model to invent your own system for mapping and navigating within a space, but the API commands, event types, and data responses that require the depth sensor are not functional with the Misty II Basic Edition.

### Misty II Standard Edition

The **Misty II Standard Edition** is the original Misty II. It provides organizations and individual developers with a professional-grade platform robot that can take on a wide variety of assignments, including use cases that require auto-docking, SLAM, and the creation of 3D images for use with CAD software. This model is fully compatible with the APIs, event types, and data responses that Misty's depth sensor provides.

### Misty II Enhanced Edition

The **Misty II Enhanced Edition** has all the hardware and capabilities of the Standard Edition, **plus** an upgraded 820 processor. The Enhanced Edition features an **Open-Q™ 820Pro µSOM** (which replaces the Open-Q™ 820 µSOM used in the Standard Edition). This upgrade improves Misty's response time by about 10% during CPU-intensive tasks (like face recognition), and enables Misty to cover a much larger space during a single mapping session.

The Misty II Enhanced Edition can actively map for ~10 minutes, and can produce individual maps of 1600 to 2000 square feet, depending on environmental variables. By comparison, the Misty II Standard Edition can actively map for ~5 minutes, and can produce individual maps of around 800 to 1000 square feet.*

This model provides organizations and individual developers with a platform robot that can take on a wide variety of assignments, especially use cases that require the robot to create maps and navigate within a larger space. This model is fully compatible with the APIs, event types, and data responses that Misty's depth sensor provides.

{{box op="start" cssClass="boxed noteBox"}}
&ast; **Note:** Actual mapping duration and coverage depends on variables like environmental complexity and many other factors.
{{box op="end"}}

### Model Comparison

This table provides more information about the specifications for each Misty II model. Use it to select the model that best fits your needs.
<br><br><br>

<div class="table-scrollable">
   <table>
   <tr>
      <td>
      </td>
      <td><strong>Basic Edition</strong>
      </td>
      <td><strong>Standard Edition</strong>
      </td>
      <td><strong>Enhanced Edition</strong>
      </td>
   </tr>
   <tr>
      <td>Price
      </td>
      <td>$1,999 MSRP
      </td>
      <td>$2,999 MSRP
      </td>
      <td>$3,299 MSRP
      </td>
   </tr>
   <tr>
      <td>Size
      </td>
      <td><strong>Height:</strong> 35.56 cm / 14 in
   <br>
   <strong>Depth:</strong> 25.4 cm / 10 in
   <br>
   <strong>Width:</strong> 20.32 cm / 8 in
   <br>
   <strong>Weight:</strong> 2.6 kg / 5.7 lbs
      </td>
      <td><strong>Height:</strong> 35.56 cm / 14 in
   <br>
   <strong>Depth:</strong> 25.4 cm / 10 in
   <br>
   <strong>Width:</strong> 20.32 cm / 8 in
   <br>
   <strong>Weight:</strong> 2.7 kg / 6 lbs
      </td>
      <td><strong>Height:</strong> 35.56 cm / 14 in
   <br>
   <strong>Depth:</strong> 25.4 cm / 10 in
   <br>
   <strong>Width:</strong> 20.32 cm / 8 in
   <br>
   <strong>Weight:</strong> 2.7 kg / 6 lbs
      </td>
   </tr>
   <tr>
      <td>Windows IoT Core Processor
      </td>
      <td>Qualcomm® Snapdragon 410™
      </td>
      <td>Qualcomm® Snapdragon 410™
      </td>
      <td>Qualcomm® Snapdragon 410™
      </td>
   </tr>
   <tr>
      <td>Android 8 Processor
      </td>
      <td>Qualcomm® Snapdragon Open-Q™ 820 µSOM
      </td>
      <td>Qualcomm® Snapdragon Open-Q™ 820 µSOM
      </td>
      <td>Qualcomm® Snapdragon Open-Q™ 820Pro µSOM
      </td>
   </tr>
   <tr>
      <td>Programmability
      </td>
      <td>Compatible with Misty's JavaScript SDK, .NET SDK (Beta), REST API, and web-based tools. 
   <br><br>
   <strong>Note: </strong>API commands, event types, data, and tools that make use of the depth sensor are not functional with the Misty II Basic Edition. 
      </td>
      <td>Compatible with Misty's JavaScript SDK, .NET SDK (Beta), REST API, and web-based tools.
      </td>
      <td>Compatible with Misty's JavaScript SDK, .NET SDK (Beta), REST API, and web-based tools.
      </td>
   </tr>
   <tr>
      <td>Cameras
      </td>
      <td>4K RGB camera
      </td>
      <td>4K RGB Camera
   <br><br>
   166° diagonal field of view wide-angle Structure Core camera (106° horizontal x 60° vertical)
      </td>
      <td>4K RGB Camera
   <br><br>
   166° diagonal field of view wide-angle Structure Core camera (106° horizontal x 60° vertical)
      </td>
   </tr>
   <tr>
      <td>Depth Sensor
      </td>
      <td>None
      </td>
      <td>Occipital Structure Core depth sensor 
      </td>
      <td>Occipital Structure Core depth sensor 
      </td>
   </tr>
   <tr>
      <td>Audio Recording & Playback
      </td>
      <td>3 far-field microphones using Qualcomm® FluenceTM PRO
   <br><br>
   2 high-fidelity speakers with engineered sound box and bass port
      </td>
      <td>3 far-field microphones using Qualcomm® FluenceTM PRO
   <br><br>
   2 high-fidelity speakers with engineered sound box and bass port
      </td>
      <td>3 far-field microphones using Qualcomm® FluenceTM PRO
   <br><br>
   2 high-fidelity speakers with engineered sound box and bass port
      </td>
   </tr>
   <tr>
      <td>Touch Sensors
      </td>
      <td>6 capacitive touch sensors on head and chin
      </td>
      <td>6 capacitive touch sensors on head and chin
      </td>
      <td>6 capacitive touch sensors on head and chin
      </td>
   </tr>
   <tr>
      <td>Distance & Obstacle Detection
      </td>
      <td>8 IR-based time-of-flight sensors (3 forward, 1 rear, 4 edge/downward)
   <br><br>
   10 bump sensors (3 tied in parallel on each front corner, 2 tied in parallel on each rear corner)
      </td>
      <td>8 IR-based time-of-flight sensors (3 forward, 1 rear, 4 edge/downward)
   <br><br>
   10 bump sensors (3 tied in parallel on each front corner, 2 tied in parallel on each rear corner)
      </td>
      <td>8 IR-based time-of-flight sensors (3 forward, 1 rear, 4 edge/downward)
   <br><br>
   10 bump sensors (3 tied in parallel on each front corner, 2 tied in parallel on each rear corner)
      </td>
   </tr>
   <tr>
      <td>Movement & Locomotion
      </td>
      <td>Patent-pending 3-degree of freedom neck
   <br><br>
   Customizable moving arms
   <br><br>
   Sturdy track-driving tread system
      </td>
      <td>Patent-pending 3-degree of freedom neck
   <br><br>
   Customizable moving arms
   <br><br>
   Sturdy track-driving tread system
      </td>
      <td>Patent-pending 3-degree of freedom neck
   <br><br>
   Customizable moving arms
   <br><br>
   Sturdy track-driving tread system
      </td>
   </tr>
   <tr>
      <td>Display
      </td>
      <td>4” LCD display for images, animated .gifs, text, and videos playback
      </td>
      <td>4” LCD display for images, animated .gifs, text, and videos playback
      </td>
      <td>4” LCD display for images, animated .gifs, text, and videos playback
      </td>
   </tr>
   <tr>
      <td>Lights
      </td>
      <td>White LED flashlight
   <br><br>
   Blue LED "tally light"
   <br><br>
   Multi-color programmable LED chest light
      </td>
      <td>White LED flashlight
   <br><br>
   Blue LED "tally light"
   <br><br>
   Multi-color programmable LED chest light
      </td>
      <td>White LED flashlight
   <br><br>
   Blue LED "tally light"
   <br><br>
   Multi-color programmable LED chest light
      </td>
   </tr>
   <tr>
      <td>Connectivity
      </td>
      <td>2.4 and 5 Ghz Wi-Fi connection
   <br><br>
   Bluetooth and Bluetooth Low Energy capabilities
      </td>
      <td>2.4 and 5 Ghz Wi-Fi connection
   <br><br>
   Bluetooth and Bluetooth Low Energy capabilities
      </td>
      <td>2.4 and 5 Ghz Wi-Fi connection
   <br><br>
   Bluetooth and Bluetooth Low Energy capabilities
      </td>
   </tr>
   <tr>
      <td>Extensibility
      </td>
      <td>Universal Serial Bus (USB) - up to 500 mA power supply for external hardware
   <br><br>
   Universal Asynchronous Transmitter and Receiver (UART) serial port for data transfer between Misty and external devices
   <br><br>
   Compatible with Misty Backpack for Arduino and other microcontrollers
      </td>
      <td>Universal Serial Bus (USB) - up to 500 mA power supply for external hardware
   <br><br>
   Universal Asynchronous Transmitter and Receiver (UART) serial port for data transfer between Misty and external devices
   <br><br>
   Compatible with Misty Backpack for Arduino and other microcontrollers
      </td>
      <td>Universal Serial Bus (USB) - up to 500 mA power supply for external hardware
   <br><br>
   Universal Asynchronous Transmitter and Receiver (UART) serial port for data transfer between Misty and external devices
   <br><br>
   Compatible with Misty Backpack for Arduino and other microcontrollers
      </td>
   </tr>
      <tr>
      <td>Charging
      </td>
      <td>AC adapter for wired charging included with purchase
   <br><br>
   Wireless charging pad for wireless charging sold separately
      </td>
      <td>Wireless charging pad for wireless charging included with purchase
   <br><br>
   AC adapter for wired charging sold separately
      </td>
      <td>Wireless charging pad for wireless charging included with purchase
   <br><br>
   AC adapter for wired charging sold separately
      </td>
   </tr>
   <tr>
      <td> Purchase
      </td>
      <td text-align="center">
         <div>
         <br />
            <a href="https://shop.mistyrobotics.com/products/misty-ii-basic-edition" target="_blank" class="button button--purple">Buy Now</a>
         </div>
      </td>
         <td text-align="center">
         <div>
         <br />
            <a href="https://shop.mistyrobotics.com/products/misty-ii-standard-edition" target="_blank" class="button button--purple">Buy Now</a>
         </div>
      </td>
         <td text-align="center">
         <div>
         <br />
            <a href="https://shop.mistyrobotics.com/products/misty-ii-enhanced-edition" target="_blank" class="button button--purple">Buy Now</a>
         </div>
      </td>
   </table>
</div>
