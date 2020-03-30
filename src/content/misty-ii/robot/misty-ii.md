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

* charging station
* charging station AC power supply (thin barrel jack)
* foam block stand for Misty II
* legal guide
* printed User Guide

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** Do not attempt to connect the AC power supply for the charging station to the port underneath Misty's base.

A separate AC power supply for charging Misty II via a wired connection may be shipped as an optional accessory. The barrel jack on this power supply is thicker than the power supply for the wireless charging station, and is designed to fit the power port underneath Misty's base. This power supply uses a different voltage than the power supply for Misty's wireless charging station. **Do not** attempt to use these power supplies interchangeably.
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

### Scruff Reflex

Misty ignores all commands she receives for as long as she detects someone touching the `CapTouch_Scruff` sensor in the handle on the back of her head. This behavior is designed is to prevent Misty from moving in ways that could damage her (or the human holding her) if she’s picked up while running a skill. This behavior does not cancel any running skills. It only causes Misty to ignore commands those skills invoke. When the `CapTouch_Scruff` touch sensor is released, Misty resumes execution of any new commands she receives.

### Hazards System

Misty's software includes a built-in hazards system that is intended to prevent your robot from executing commands that could cause her harm. This system uses data from Misty's sensors to prevent Misty from driving off of surfaces that could cause her to tip or fall, such as tables, desks, or stairs. It also stops Misty from continuing to drive when she senses an obstacle nearby, or when she detects that she has bumped into an object.

In addition to protecting your robot from harm, the hazards system sends an event message each time Misty enters or exits a hazards state. You can use these messages to programmatically alter Misty's course when she detects cliffs or obstacles while autonomously navigating her environment. See the [Event Types](../../../misty-ii/robot/sensor-data/#hazardnotification) section of these docs for details on using this data in your skills.

By default, Misty's bump and time-of-flight sensors put the robot into a hazard state in the following circumstances:
* when her edge time-of-flight sensors detect a drop distance of 0.06 meters (60 mm) or greater in the direction she is moving.
* when her range time-of-flight sensors detect an obstacle 0.15 meters (150 mm) or closer in the direction she is moving.
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

## Connecting to Misty's File System

You can access your robot's file system by connecting to the her file server over your local network connection.

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



## Extending Misty's Hardware

You can augment Misty's native capabilities by using external microcontrollers, sensors, and other third party hardware in your skills. Additionally, you can expand her physical form by 3D printing custom attachments and accessories.

### Designing Custom Attachments

Misty's arms, backpack attachment, magnetic headpiece, and trailer hitch can all be removed and replaced with your own custom designs. In addition to these mounting points, you can modify your robot's appearance and functionality by designing attachments for placement anywhere on her exterior.

Find CAD files for Misty's mounting points and exterior parts in the [Misty_II_CAD repository on GitHub](https://github.com/MistyCommunity/Misty_II_CAD).

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When designing custom attachments for use with Misty, keep the following in mind:

* Protect Misty's motors by keeping your custom attachments light.
* Design your custom attachments to avoid interfering with Misty's [head and arm movement ranges](#coordinate-system-amp-movement-ranges). If possible, build your parts to easily detach from the robot in the event they catch on something while Misty is running a skill.
* Avoid covering Misty's heat sinks and the fan intake areas on her head, neck, and chassis. Make sure your attachments do not interfere with Misty's treads, and avoid covering Misty's time-of-flight sensors to keep the hazards system functional.
{{box op="end"}}


### Using External Hardware

External devices can connect to the Universal Asynchronous Receiver-Transmitter (UART) serial and Universal Serial Bus (USB) ports on Misty's back. Remove the magnetic backpack attachment to access these ports.

The USB port can be used with a USB-to-Ethernet adapter to connect Misty to your local network. Misty’s API/SDK does not currently have access to the USB port’s data interface, but this port can be used to supply power to external devices. The UART serial port enables communication between Misty's skills and an external device. The configuration of the pins on this port simplifies connection between Misty and her [Arduino-compatible backpack](../../../misty-ii/robot/misty-ii/#misty-arduino-compatible-backpack). You can also connect your own microcontroller, a Raspberry Pi, or other UART serial-enabled hardware.

The UART serial and USB port channels have separate, isolated power controllers that allow Misty to supply power to external hardware. The USB port can provide up to 500 mA, and the pins for the UART serial port are configured as follows:

* **RX (receiver)**: Receives messages sent to Misty from an external device.
* **GND (ground)**: The grounding pin for the electrical circuit.
* **TX (transmitter)**: Transmits messages from Misty to connected hardware.
* **3V**: Supplies up to 1A of power to the connected hardware at 3.3v.

### Misty (Arduino-Compatible) Backpack

The Misty (Arduino-Compatible) Backpack is a microcontroller designed to connect to the UART serial port on Misty’s back in a plug-and-play fashion, without any modification.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you did not purchase the Misty (Arduino-Compatible) Backpack, the "backpack" shipped with your robot does not contain a microcontroller. You can still use Misty's generic backpack to extend her hardware by connecting your own external device to her UART serial port.
{{box op="end"}}

### Programming the Misty (Arduino-Compatible) Backpack

The Misty (Arduino-Compatible) Backpack uses a microcontroller pre-programmed with a bootloader that allows you to upload code exactly as you would with a normal Arduino, without requiring an external hardware programmer.

Follow these steps to use the [Arduino IDE](https://www.arduino.cc/en/Main/Software) to write programs for the Misty (Arduino-Compatible) Backpack:
1. Install the [Arduino IDE](https://www.arduino.cc/en/Main/Software).
2. Connect the Misty backpack to your computer via the backpack's USB micro port.
3. Open the IDE and select **Tools** from the top menu.
   * From the **Board** sub-menu, select **Arduino Pro or Pro Mini**.
   * From the **Processor** sub-menu, select **ATmega328P (3.3V, 8MHz)**. ![Arduino IDE Tools selection](/assets/images/arduino-ide-tools-selection.png)
4. Write your sketch and upload it to the microcontroller.

For more information about writing a sketch, see the [reference materials](https://www.arduino.cc/reference/en/) and [tutorials](https://www.arduino.cc/en/Tutorial/HomePage) hosted on the Arduino website.

In the code you write for Misty's Arduino-compatible backpack (or any other Arduino microcontroller), you use the [Serial](https://www.arduino.cc/reference/en/language/functions/communication/serial/) library to configure communication between the microcontroller and Misty. In the `setup()` function of your sketch, use the [`Serial.begin()`](https://www.arduino.cc/reference/en/language/functions/communication/serial/begin) function to set the data transfer rate to 9600 baud. Then, in the `loop()` function, use [`Serial.println()`](https://www.arduino.cc/reference/en/language/functions/communication/serial/println) to send data to Misty.

```C++
void setup() {
  Serial.begin(9600);
}
  
void loop() {
    delay(1000);
    Serial.println("{\"message\":\"Hello!\"}");
}
```

We recommend formatting data you send as JSON string to make it easier to parse in your skill code.

To read messages sent to Misty, you register for [`SerialMessage`](../../../misty-ii/robot/sensor-data/#serialmessage) events in your skill code. `SerialMessage` events occur when Misty receives a message through the RX pin of her UART serial port. By default, the data for `SerialMessage` events is processed by a `_SerialMessage()` callback function. You define how this callback handles the message in your skill code.

```JS
// Return the value of the "SerialMessage" property in the
// SerialMessage data object
misty.AddReturnProperty("SerialMessage", "SerialMessage");

// Register for SerialMessage events. Set the debounce rate to 0, or
// use the rate defined in the sketch. Set keepAlive to true, so
// the event does not un-register after the first _SerialMessage()
// callback.
misty.RegisterEvent("SerialMessage", "SerialMessage", 0, true);

function _SerialMessage(data) {
    try {
        if(data !== undefined && data !== null) {
            var obj = JSON.parse(data.AdditionalResults[0].Message);
            var message = obj.message;
        }
    }
    catch(exception) {
        misty.Debug("Exception" + JSON.stringify(exception));
    }
}
```

To send messages from Misty to an external device, you can use the [`misty.WriteSerial()`](../../../misty-ii/javascript-sdk/api-reference/#misty-writeserial) function. If you are running your skill on a remote device, you can send a request to the REST endpoint for the [`WriteSerial`](../../../misty-ii/rest-api/api-reference/#writeserial) command.

## Misty II Specs

Misty is packed with sophisticated hardware and software features that contribute to her ruggedness and extensibility as a platform.

### Size

* Height: 35.56 cm / 14 in
* Depth: 25.4 cm / 10 in
* Width: 20.32 cm / 8 in
* Weight: 2.7 kg / 6 lbs

### Processors

* Qualcomm® Snapdragon 820™ mobile processor
* Qualcomm® Snapdragon 410™ processor

### Computer Vision

* Occipital Structure Core depth sensor for 3D maps
* 166° diagonal field of view wide-angle Structure Core camera (106° horizontal x 60° vertical)
* 4K camera
* Facial recognition
* Deep-learning AI using Qualcomm® Snapdragon™ Neural Processing

### Sound

* 3 far-field microphones using Qualcomm® FluenceTM PRO 
* 2 high-fidelity speakers with engineered sound box and bass port

### Touch

* 6 capacitive touch sensors on head and chin

### Distance and Obstacle Detection

* 8 IR-based time-of-flight sensors (3 forward, 1 rear, 4 edge/downward)
* 10 bump sensors (3 tied in parallel on each front corner, 2 tied in parallel on each rear corner)

### Movement

* Patent-pending 3-degree of freedom neck
* Easily customizable moving arms
* Sturdy track-driving tread system
* Trailer hitch to pull a payload

### Display & Light

* 4” LCD image display/screen
* Bright LED flashlight
* Multi-color LED chest light

### Connectivity

* 2.4 and 5 Ghz Wi-Fi connection
* Bluetooth and Bluetooth Low Energy capabilities 

### Extensibility

* USB/Serial-connected backpack for hardware extension
* Arduino-compatible Backpack (optional)
* Magnetic helmet connection point

### Operating Systems

* Windows IoT Core™ (Main)
* Android™ 8 (navigation/computer vision)

![Misty II Specs](/assets/images/mii-specs.png)
