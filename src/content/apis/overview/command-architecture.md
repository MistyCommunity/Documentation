---
title: API Introduction
layout: apis.hbs
columns: two
order: 1
---

# {{title}}

## API Functional Areas
The  Misty Robot API contains 40 discrete commands that allow you to interact with your robot programmatically. Commands allow you to get general device information (such as firmware version or battery level) and to control the main robot device components:

- Drive Motors
- Camera
- Speakers
- Display
- Microphone
- Sensor
- General Information

Typically, each functional area has individual commands related to action (e.g. `ChangeDisplayImage`), configuration (e.g. `SaveImageAssetToRobot`), or information (e.g `GetListofVideoClips`).

## API Protocol Types
Commands are sent via one or more transport protocols and are available through various interfaces:
- [JavaScript](../../api-reference/all-functions)
- [CLI (Command Line Interface)](../../api-reference/cli)
- [HTTP / REST](../../api-reference/rest)
- [BLE / Bluetooth Classic](../../Advanced/ble)

You can also test commands with [Blockly](../../../../../onboarding/3-ways-to-interact-with-misty/blockly) and the [Misty API Explorer](../../../../../onboarding/3-ways-to-interact-with-misty/api-explorer).


## API Command Types
Misty's commands are grouped into the following categories:

- **Action**
  - Drive Misty
  - Perform mapping or tracking
  - Play sound files
  - Change the LED color
  - Use face training and recognition
  - Move Misty's arms or head
  - Change the display


- **Configuration**
  - Save audio or image files to Misty
  - Connect Misty to WiFi
  - Get SLAM (simultaneous localization and mapping) data


- **Information**  
  - Get asset, sensor, device, and battery data
  - Troubleshoot problems
  - Obtain configuration information

Action commands are those which require the robot to perform physical (mechanical, audible, or visual) action. Configuration commands accept new values to be saved and/or used. Information commands return information requested by the command.
