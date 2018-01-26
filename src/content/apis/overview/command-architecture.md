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
- [Blockly](../../api-reference/blockly)
- [JavaScript](../../api-reference/all-functions)
- [CLI (Command Line Interface)](../../api-reference/cli)
- [HTTP / REST](../../api-reference/rest)
- [BLE / Bluetooth Classic](../../Advanced/ble)

## API Command Types
We have three type of commands:
- Action
- Configuration
- Information

Action commands are those which require the robot to perform physical (mechanical, audible, or visual) action. Information commands return information requested by the command. Configuration commands accept new values to be saved and/or used.

All commands are derived from the `ApiCommand`<T> base class.

To define a new API command:

1. Use the `ApiCommand`<T> abstract class to define new API commands.
2. Make the new `ApiCommand` class public.
3. Add an attribute `ApiCommand(ApiCommandGrouping.abc)` to the class.
4. Set properties accordingly.
5. Override the `GetResultAsync` abstract method to check Command Call arguments, confirm capabilities, get results, or prepare/call Action Command.

If an exception occurs at any time in `GetResultAsync`, an automatic response, containing this exception, is sent to the requestor.

Use type parameter `T` to define type of the response value you're going to send back to requestor. For action commands or commands that do not require a response, use the `bool` type to confirm acceptance or completion of the command call.
