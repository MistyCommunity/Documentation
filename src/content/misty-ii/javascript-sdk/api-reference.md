---
title: API Reference
layout: coding.hbs
columns: three
order: 4
---

# {{title}}

Misty's JavaScript API provides a powerful set of commands for writing JavaScript skills for your Misty II. To learn more about the architecture of a JavaScript skill, see [JavaScript SDK Architecture](../../../misty-ii/javascript-sdk/javascript-skill-architecture).


{{box op="start" cssClass="boxed noteBox"}}
**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these beta and alpha commands, but realize they may behave unpredictably at this time, and their functionality is likely to change with future system updates.
{{box op="end"}}

## Asset

Misty comes with a set of default images that you can display onscreen and sounds that you can play through her speakers. We encourage you to get creative and use your own image and audio assets in your skills.

### misty.DeleteAudio

Enables you to remove an audio file from Misty that you have previously saved. **Note:** You can only delete audio files that you have saved to Misty. You cannot remove Misty's default system audio files.

```JavaScript
// Syntax
misty.DeleteAudio(string fileName, [int prePauseMs], [int postPauseMs]);
```

Arguments
* fileName (string) - The name of the file to delete, including its file type extension.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DeleteAudio("DeleteMe.wav");
```

### misty.DeleteImage
Enables you to remove an image file from Misty that you have previously saved to her storage.

**Note:** You can only delete image files that you have previously saved to Misty's storage. You cannot remove Misty's default system image files.

```JavaScript
// Syntax
misty.DeleteImage(string fileName, [int prePauseMs], [int postPauseMs]);
```

Arguments

* fileName (string) - The name of the file to delete, including its file type extension.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DeleteImage("DeleteMe.png");
```

### misty.GetAudioFile

Obtains a system or user-uploaded audio file currently stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore (in this case, `_GetAudioFile()`). For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
misty.GetAudioFile(string fileName, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments  
* fileName (string) - The name of the audio file to get, including its file type extension.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If blank, the system passes data into the default `_GetAudioFile()` callback function.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetAudioFile("001-EeeeeeE.wav", false);

function _GetAudioFile(data)
{
	misty.Debug(JSON.stringify(data));
}
```

* Result (object) - An object containing audio data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * `Base64`: A base64-encoded string for the audio file data.
  * `ContentType`: The content type of the media encoded in the base64 string.
  * `Name`: The filename of the returned audio file.

### misty.GetAudioList

Lists all audio files (default system files and user-added files) currently stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetAudioList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetAudioList();
```

Returns

<!-- TODO: review return values -->

* Result (array) - Returns an array of audio file information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### misty.GetImage
Obtains a system or user-uploaded image file currently stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
misty.GetImage(string fileName, [string callback], [bool base64 = true], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* fileName (string) - The name of the image file to get, including its file type extension.
* base64 (boolean) - Optional. Passing in `true` returns the image data as a Base64 string. Passing in `false` returns the image. Defaults to `true`. 
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetImage("Angry.png");

function _GetImage(data)
{
	misty.Debug(JSON.stringify(data));
}
```
- Result (object) - An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - Name (string) - The name of the image
  - Height (integer) - The height of the image in pixels.
  - Width (integer) - The width of the image in pixels.
  - SystemAsset (boolean) - Whether the image is one of Misty's default image assets.
  - ContentType (string) - The type and format of the image returned.
  - Base64 (string) - A string containing the Base64-encoded image data.

### misty.GetImageList
Obtains a list of the images stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetImageList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetImageList();
```

Returns

* Result (array) - Returns an array containing one element for each image currently stored on Misty. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each element in the array contains the following:
   * Height (integer) - The height of the image file.
   * Name (string) - The name of the image file.
   * Width (integer) - The width of the image file.
   * UserAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### misty.SaveAudio
Saves an audio file to Misty. Maximum size is 3 MB. Accepts audio files formatted as `.wav`, `.mp3`, `.wma`, and `.aac`.

```JavaScript
// Syntax
misty.SaveAudio(string fileName, string data, [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs])
```

Arguments
* fileName (string) - The name of the audio file.
* data (string) - The audio data, passed as a string containing a base64 string .
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the audio file, while a value of `false` tells Misty not to play the file.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the file should not overwrite any existing files on Misty.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SaveAudio("Filename.wav", "137,80,78,71,13,1...", false, false);
```


### misty.SaveImage
Saves an image to Misty in the form of a base64 string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, and .png. Maximum file size is 3 MB. **Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

```JavaScript
// Syntax
misty.SaveImage(string fileName, string data, [int width], [int height], [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs]
```

Arguments
* fileName (string) - The name of the image file to save.
* data (string) - The image data, passed as a string containing a base64 string.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the saved image file, while a value of `false` tells Misty not to display the image.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the saved file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the saved file should not overwrite any existing files on Misty.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SaveImage("Filename.jpg", "137,80,78,71,13,1...", 500, 1000, false, false);
```

## Backpack

### misty.GetSerialSensorValues

Obtains a list of the most recent messages Misty has received through the universal asynchronous receiver-transmitter (UART) serial port on her back. This list of messages clears each time the system reboots.

```JavaScript
// Syntax
misty.GetSerialSensorValues([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSerialSensorValues()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSerialSensorValues()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Return Values

- Result (array) - A list of string values, where each value is a message Misty received through the UART serial port on her back. Messages are sequenced in reverse chronological order, with the most recent message being the last value in the array. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.WriteSerial

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

Note that Misty can also receive data a connected device sends to the UART serial port. To use this data you must subscribe to [`SerialMessage`](../../../misty-ii/robot/sensor-data/#serialmessage) events.

```JavaScript
// Syntax
misty.WriteSerial(string message, [int prePauseMs], [int postPauseMs])
```

Arguments
* message (string) - The data Misty sends to the UART serial port, passed as a string value.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.WriteSerial("your-data");
```

## Event

### misty.AddPropertyTest

Creates a property comparison test to specify which data the system sends for a registered event. Use property tests to filter unwanted data out of event messages.


```JavaScript
// Syntax
misty.AddPropertyTest(string eventName, string property, string inequality, string valueAsString, string valueType, [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - The name of the event to create a property comparison test for.
* property (string) - The property of the event to compare. For the full list of properties for each event, see the documentation for Misty's different [Event Types](../../../misty-ii/robot/sensor-data/).
* inequality (string) - The comparison operator to use in the property comparison test, passed as a string. Accepts `"=>"`, `"=="`, `"!=="`, `">"`, `"<"`, `">="`, `"<="`, `"exists"`, `"empty"`, or `"delta"`.
* valueAsString (string) - The value of the property to compare against, passed as a string. For the full list of values for each event property, see [Event Types](../../../misty-ii/robot/sensor-data).
* valueType (string) - The type of the value specified in `"valueAsString"`. Accepts `"double"`, `"float"`, `"integer"`, "`string"`, `"datetime"`, or "`boolean`"
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.AddPropertyTest("EventName", "SensorPosition", "==", "Back", "string");
```

### misty.AddReturnProperty

Adds an additional return property field for a registered event.

```JavaScript
// Syntax
misty.AddReturnProperty(string eventName, string eventProperty, [int prePauseMs], [int postPauseMs]);
```

Use the `misty.AddReturnProperty()` method to add the values of specific properties from an event message to the data object passed to the callback function for the event. When the event callback handles the data object for an event, the data object includes the values of any properties added with `misty.AddReturnProperty()` in an array called `AdditionalResults`.

You can add multiple return properties to the same event. The order of values in the `AdditionalResults` array matches the order in which you added those properties to the event in your skill code. For an example of how this works, see how the following code adds return properties to a `BumpSensor` event:

```JavaScript
// Add the value of the sensorName and isContacted properties of
// BumpSensor event to the data you want to receive with "Bumped"
// event messages
misty.AddReturnProperty("Bumped", "sensorName");
misty.AddReturnProperty("Bumped", "isContacted");
// Register for BumpSensor events
misty.RegisterEvent("Bumped", "BumpSensor", 50 ,true);

function _Bumped(data) {
     // The value of sensorName is at index 0
     var sensor = data.AdditionalResults[0]
     // The value of isContacted is at index 1
     var isContacted = data.AdditionalResults[1]
     misty.Debug("Sensor: " + sensor + ", is contacted: " + isContacted)
}
```

Arguments
* eventName (string) - The name of the event to add a return property field for.
* eventProperty (string) - The additional property to return.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.AddReturnProperty("EventName", "DistanceInMeters");
```


### misty.RegisterEvent

Register to receive messages with live event data from one of Misty's sensors. 

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Sensor Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#sensor-event-callbacks).

```JavaScript
// Syntax
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed [here](../../../misty-ii/robot/sensor-data).
* debounce (integer) - Sets the frequency in milliseconds with which event data is sent. 
* keepAlive (boolean) - Optional. Pass `true` to keep the callback function registered to the event after the callback function is triggered. By default, when an event callback is triggered, the event unregisters the callback to prevent more commands from overriding the initial call. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.RegisterEvent("EventName", "TimeOfFlight", 1000, false);
```

Returns

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#sensor-event-callbacks).

### misty.RegisterSimpleEvent

Registers for an event and applies a filter to event messages. Events you register for with the `misty.RegisterSimpleEvent()` command only return messages for events that pass the property comparison test you specify in the command's arguments.

```JavaScript
// Syntax
misty.RegisterSimpleEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string property], [string inequality], [string valueAsString], [string valueType], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed [here](../../../misty-ii/robot/sensor-data).
* debounce (integer) - Sets the frequency in milliseconds with which event data is sent. 
* keepAlive (boolean) - Optional. Pass `true` to keep the callback function registered to the event after the callback function is triggered. By default, when an event callback is triggered, the event unregisters the callback to prevent more commands from overriding the initial call. 
* property (string) - The property of the event to compare. For the full list of properties for each event, see [Event Types](../../../misty-ii/robot/sensor-data/).
* inequality (string) - The comparison operator to use in the property comparison test, passed as a string. Accepts `"=>"`, `"=="`, `"!=="`, `">"`, `"<"`, `">="`, `"<="`, `"exists"`, `"empty"`, or `"delta"`.
* valueAsString (string) - The value of the property to compare against, passed as a string. For the full list of values for each event property, see [Event Types](../../../misty-ii/robot/sensor-data).
* valueType (string) - The type of the value specified in `"valueAsString"`. Accepts `"double"`, `"float"`, `"integer"`, "`string"`, `"datetime"`, or "`boolean`"
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#sensor-event-callbacks).


### misty.RegisterTimerEvent

Creates an event that calls a callback function after a specified period of time. For an example of using this function, see the [Timer Event tutorial](../../../misty-ii/javascript-sdk/tutorials/#timer-events).

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).

```JavaScript
// Syntax
misty.RegisterTimerEvent(string eventName, int callbackTimeInMs, [bool keepAlive], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - The name for the timer event. Note that the name you give to this timer event determines the name automatically assigned to your related callback function. That is, the system sets the name of the callback function to be the same as this event name, prefixed with an underscore (`_<eventName>`). For example, for an event name of `MyTimerEvent`, your callback function must use the name `_MyTimerEvent`. 
* callbackTimeInMs (integer) - The amount of time in milliseconds to wait before the system calls the callback function. For example, passing a value of 3000 causes the system to wait 3 seconds.
* keepAlive (boolean) -  Optional. By default (`false`) this timer event calls your callback only once. If you pass `true`, your callback function is called in a loop, with a frequency determined by `callbackTimeInMs`. To end the loop, call the `misty.UnregisterEvent()` function in your code.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.RegisterTimerEvent("EventName", 5000, false);
```

Returns

* Data sent by the timed event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).

### misty.RegisterUserEvent

Creates an event that calls a callback function at a point of your choosing. You trigger the event by making a REST call to the `<robot-ip-address>/api/skills/event` endpoint with the appropriate payload for the callback and/or skill.

Once you register the event with `misty.RegisterUserEvent()`, to trigger the event you must make a REST call to the event endpoint with a POST command:

```http
POST <robot-ip-address>/api/skills/event
```

With a JSON body similar to:
```JSON
{
    "UniqueId" : "b307c917-beb8-47e8-9bbf-1c57e8cd4d4b",
    "EventName": "UserEventName",
    "Payload": { "mydata": "two" }
}
```

The `UniqueId` and `EventName` values are required and must match the ID of the skill to call and the event name you used in that skill. You should place any payload data you wish to send to the skill in the `Payload` field.

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).

```JavaScript
// Syntax
misty.RegisterUserEvent(string eventName, [bool keepAlive], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments
* eventName (string) - The name for the event. Note that the name you give to this event determines the name automatically assigned to your related callback function. That is, the system sets the name of the callback function to be the same as this event name, prefixed with an underscore (`_<eventName>`). For example, for an event name of `MyUserEvent`, your callback function must use the name `_MyUserEvent`. 
* keepAlive (bool) - Optional. By default (`false`) the event is triggered only once. If you pass `true`, you can trigger the event repeatedly. To remove this event, call the `misty.UnregisterEvent()` function in your code.
* callbackRule (string) - Optional. By default (`Synchronous`) the system runs the triggered callback concurrently with any other running threads. Other values are `Override` and `Abort`. `Override` tells the system to run the new callback thread but to stop running commands on any other threads, including the thread the callback was called within. The system only runs the thread the callback was triggered in, once the callback comes back. `Abort` tells the system to ignore the new callback thread if the skill is still doing work on any other threads (including the original thread the callback was called within). 
* skillToCall (string) - Optional. The unique ID of a skill to call when the event is triggered. Use this value if the callback function is not defined in the same skill as the user event is registered in.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.RegisterUserEvent("EventName", false);
```

Returns

* Data sent by the user event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).

### misty.UnregisterAllEvents

Unregisters from all events for the skill in which this command is called.

```JavaScript
// Syntax
misty.UnregisterAllEvents([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.UnregisterAllEvents();
```

### misty.UnregisterEvent

Unregisters from a specified event.

```JavaScript
// Syntax
misty.UnregisterEvent(string eventName, [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - The name of the event to unregister from.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.UnregisterEvent("EventName");
```

## Expression

### misty.ChangeLED

Changes the color of the LED light behind the logo on Misty's torso.

```JavaScript
// Syntax
misty.ChangeLED(int red, int green, int blue, [int prePauseMs], [int postPauseMs]);
```

Arguments
* Red (integer) - A value between 0 and 255 specifying the red RGB color.
* Green (integer) - A value between 0 and 255 specifying the green RGB color.
* Blue (integer) - A value between 0 and 255 specifying the blue RGB color.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ChangeLED(0, 0, 0);
```

### misty.DisplayImage

Displays an image on Misty's screen. Optionally, `misty.DisplayImage()` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. You can use the [`SaveImage`](../../../misty-ii/rest-api/api-reference/#saveimage) command in Misty's REST API to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

```JavaScript
// Syntax
misty.DisplayImage(string fileName, [double alpha], [int prePauseMs], [int postPauseMs])
```

Arguments

* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePauseMsMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DisplayImage("e_Amazement.jpg");
```

### misty.GetBlinkSettings

Obtains the current settings for Misty's blinking behavior. To change these settings, use the [`misty.SetBlinkSettings()`](./#misty-setblinksettings) method.

```JavaScript
// Syntax
misty.GetBlinkSettings([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetBlinkSettings()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetBlinkSettings()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Return Values

* Result (object) - A data object with the following key/value pairs. (Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information).
  * blinkImages (object) - A set of key/value pairs indicating the blink mappings for each image on the robot. Each property in this object is the filename of an image asset saved to Misty. Each value is the image that Misty will "blink" when displaying that image on her screen.
  * openEyeMinMs (integer) - The minimum duration that Misty's eyes stay open while blinking.
  * openEyeMaxMs (integer) - The maximum duration that Misty's eyes stay open while blinking.
  * closedEyeMinMs (integer) - The minimum duration that Misty's eyes stay closed while blinking.
  * closedEyeMaxMs (integer) - The maximum duration that Misty's eyes stay closed while blinking.

### misty.PlayAudio

Plays an audio clip that has been previously saved to Misty's storage.

```JavaScript
// Syntax
misty.PlayAudio(string fileName, [int volume], [int prePauseMs], [int postPauseMs]);
```

Arguments
* fileName (string) - The name of the file to play.
* volume (integer) - Optional. A value between 0 and 100  for the loudness of the audio clip. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.PlayAudio("s_Sadness.wav", 100);
```

### misty.TransitionLED

Sets Misty's LED to transition between two colors.

```JavaScript
// Syntax
misty.TransitionLED(byte red, byte green, byte blue, byte red2, byte green2, byte blue2, string transitionType, int timeMs, [int prePauseMs], [int postPauseMs]);
```

When you use this command, Misty will continue the transition you specify until she is powered off or receives another command to change or transition her LED.

Parameters

* red (byte) - The red RGB color value for the first color (range 0 to 255).
* green (byte) - The green RGB color value for the first color (range 0 to 255).
* blue (byte) - The blue RGB color value for the first color (range 0 to 255).
* red2 (byte) - The red RGB color value for the second color (range 0 to 255).
* green2 (byte) - The green RGB color value for the first color (range 0 to 255).
* blue2 (byte) - The blue RGB color value for the first color (range 0 to 255).
* transitionType (string) - The transition type to use. Case sensitive. Accepts `Blink` (continuously blinks LED between the specified colors), `Breathe` (continuously fades LED between the specified colors), and `TransitOnce` (blinks LED from first color to second color only once). 
* timeMs (int) - The duation (in milliseconds) between each transition. Must be greater than `3`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
misty.TransitionLED(255, 0, 0, 0, 255, 0, "Breathe", 300)
```

### misty.RemoveBlinkMappings

Removes blink mappings from one or more image assets.

```JS
misty.RemoveBlinkMappings(string blinkImages, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* BlinkImages (string) - A stringified list of images to remove blink mappings from.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.SetBlinking

Turns Misty's eye blinking behavior on or off.

```JavaScript
// Syntax
misty.SetBlinking(bool blink, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To customize Misty's blinking behavior, use the `SetBlinkSettings` command in Misty's REST API.

This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Misty stops blinking when there is an error message on her screen, and starts blinking again when the message clears.

Arguments

* blink (bool) - Passing in `true` turns blinking on, and passing in `false` turns blinking off. By default, blinking turns on when Misty starts up.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetBlinking(true);
```

### misty.SetBlinkSettings

Sets the duration that Misty's eyes stay open or closed while blinking. You can also use this command to add a blink mapping to an image asset. Optionally, reverts Misty's blink settings to their default configuration.

```javascript
// Syntax
misty.SetBlinkSettings(bool revertToDefault, [int closedEyeMinMs], [int closedEyeMaxMs], [int openEyeMinMs], [int openEyeMaxMs], [string blinkImages], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

Misty saves your custom blink settings to her local database, so there's no need to re-configure these settings each time she boots up.
{{box op="end"}}

Arguments

* RevertToDefault (boolean) - Use `true` to revert Misty's blink settings to the default configuration. Use `false` to continue using your custom settings.
* ClosedEyeMinMs (integer) - Optional. Sets the minimum duration that Misty's eyes stay closed while blinking.
* ClosedEyeMaxMs (integer) - Optional. Sets the maximum duration that Misty's eyes stay closed while blinking.
* OpenEyeMinMs (integer) - Optional. Sets the minimum duration that Misty's eyes stay open while blinking.
* OpenEyeMaxMs (integer) - Optional. Sets the maximum duration that Misty's eyes stay open while blinking.
* BlinkImages (string) - Optional. A stringified JSON object that assigns a blink mapping for one or more image assets.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.SetFlashlight

Turns the LED flashlight on Misty's head on or off.

```JavaScript
// Syntax
misty.SetFlashlight(bool on, [int prePauseMs], [int postPauseMs]);
```

Parameters

* on (bool) - Turns the flashlight on (`true`) or off (`false`).

```JavaScript
// Example
misty.SetFlashlight(true);
```

## External Requests

### misty.SendExternalRequest

Sends an HTTP request from Misty to an external server. You can use `misty.SendExternalRequest()` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

```JavaScript
// Syntax
misty.SendExternalRequest(string method, string resourceURL, [string authorizationType], [string token], [string arguments], [bool save], [bool apply], [string fileName], [string contentType], [string callback], [string callbackRule], [string skillToCal], [int prePauseMs], [int postPauseMs]);
```

In most cases, the external server's response to requests Misty sends must be passed into a callback function to be processed and made available for use in your skills. By default, the callback function for this command has the same name as the command, prefixed with an underscore: `_SendExternalRequest()`. For more on handling data returned by `misty.SendExternalRequest()`, see the [External Requests](../../../misty-ii/javascript-sdk/tutorials/#external-requests) tutorial.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command does not currently support uploading data as `multipart/form-data`, nor can you reference a file on the robot to upload with your external request.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments
* method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* resource (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* authorizationType (string) - Optional. The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* token (string) - Optional. The authentication credentials required to access the resource. Use `null` if no credentials are required.
* arguments (string) - Optional. The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* save (bool) - Optional. If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* apply (bool) - Optional. A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* fileName (string) - Optional. The name to give the saved file, including the appropriate file type extension.
* contentType (string) - Optional. The content type of the data you are sending with the request. Defaults to `"application/json"`.
* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SendExternalRequest()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Data (object) - An object containing the external server's response to the request. In most cases, data returned by the `misty.SendExternalRequest()` command must be passed into a callback function to be processed and made available for use in your skills. See the [External Requests](../../../misty-ii/javascript-sdk/tutorials/#external-requests) tutorial for more information.

## Movement

<!-- misty.Drive --> 
### misty.Drive
Drives Misty forward or backward at a specific speed until cancelled. Call `misty.Stop()` to cancel driving. 

When using the `misty.Drive()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

```JavaScript
// Syntax
misty.Drive(double linearVelocity, double angularVelocity, [int prePauseMs], [int postPauseMs]);
```

Arguments
* linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
* angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Drive(0, 0);
```

### misty.DriveArc

Drives Misty in an arc. Misty continues driving until her current heading matches the desired absolute heading passed into this command.

```JavaScript
// Syntax
misty.DriveArc(double heading, double radius, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
```

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../misty-ii/robot/sensor-data/#imu) named object. To calculate Misty's velocity, use: `((desired_heading - current_heading) * (π/180) * radius) / (timeMs/1000)`.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* heading (double) - The absolute heading Misty should obtain when the arc is complete. To set the absolute heading, use either: 0 - 360, where 0 is straight ahead, 90 is directly to the left, 180 is straight behind, and 270 is directly to the right, or: -180 to 180, where 0 is straight ahead, 90 is directly to the left, 180 and -180 are straight behind, and -90 is directly to the right.
* radius (double) - The radius (in meters) of the arc.
* timeMs (double) -  The duration (in milliseconds) that Misty drives.
* reverse (boolean) - Optional. If `true`, Misty drives in reverse. Default is `false`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
// Misty drives in an arc with a 1m radius for 5 
// seconds to obtain an absolute heading of 180 degrees
misty.DriveArc(180, 1, 5000, false)
```

### misty.DriveHeading

Drives Misty forward or backward in a straight line. While driving, Misty continuously adjusts her current heading to maintain the desired absolute heading.

```JavaScript
// Syntax
misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
```

For a smooth driving experience, Misty's current heading should be within two degrees of the desired absolute heading before she executes the `misty.DriveHeading()` command. A variation of greater than two degrees results in large correction velocities. You can use the `misty.DriveArc()` command to face Misty in the direction of the heading you want her to maintain. Then, use the `misty.DriveHeading()` command to drive Misty forward or backward in a straight line.

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../misty-ii/robot/sensor-data/#imu) named object. To calculate Misty's velocity, use `distance / (timeMs/1000)`.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* heading (double) - The absolute heading Misty should maintain. To set the absolute heading, use either: 0 - 360, where 0 is straight ahead, 90 is directly to the left, 180 is straight behind, and 270 is directly to the right, or: -180 to 180, where 0 is straight ahead, 90 is directly to the left, 180 and -180 are straight behind, and -90 is directly to the right.
* distance (double) - The distance (in meters) that Misty should drive.
* timeMs (double) - The duration (in milliseconds) that Misty should drive.
* reverse (boolean) - Optional. If `true`, Misty drives in reverse. Default is `false`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
// Misty drives forward 0.5m over 4 seconds and
// maintains an absolute heading of 90 degrees
misty.DriveHeading(90, 0.5, 4000, false);
```

### misty.DriveTime
Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using the `misty.DriveTime()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

```JavaScript
// Syntax
misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
```

Arguments

- linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
- timeMs (integer) - A value in milliseconds that specifies the duration of movement. Misty will not drive if you pass in a value of less than 100 for this argument.
- degree (double) - (optional) The number of degrees to turn. **Note:** Supplying a `degree` value recalculates linear velocity.
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DriveTime(0, 0, 0);
```

### misty.DriveTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

```JavaScript
// Syntax
misty.DriveTrack(double leftTrackSpeed, double rightTrackSpeed, [int prePauseMs], [int postPauseMs])
```

Arguments
- leftTrackSpeed (double) - A value for the speed of the left track, range: -100 (full speed backward) to 100 (full speed forward).
- rightTrackSpeed (double) - A value for the speed of the right track, range: -100 (full speed backward) to 100 (full speed forward).
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DriveTrack(0, 0);
```

### misty.Halt

Stops all motor controllers, including drive motor, head/neck, and arm.

```JavaScript
// Syntax
misty.Halt([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Halt();
```

### misty.MoveArm

Moves one or both of Misty's arms.

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

Parameters

* arm (string) - The arm to move. You must use either `left`, `right`, or `both`.
* position (integer) - The new position to move the arm to. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* velocity (integer) - Optional. A value of 0 to 100, specifying the speed with which the arm should move.
* duration (integer) - Unused at this time. Can use `null` or `0`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JSON
// Example
misty.MoveArm("both", 0, 100);
```

### misty.MoveArms

Moves one or both of Misty's arms. You can use this command to control both arms simultaneously or one at a time.

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

Parameters
* leftArmPosition (double) - Optional. The new position of Misty's left arm. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* rightArmPosition (double) - Optional. The new position of Misty's right arm. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* leftArmVelocity (double) - Optional. A value of 0 to 100 specifying the speed with which the left arm should move.
* rightArmVelocity (double) - Optional. A value of 0 to 100, specifying the speed with which the right arm should move.
* duration (integer) - Unused at this time. Can use `null` or `0`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JS
// Example
misty.MoveArms(0, 0, 100, 100);
```

### misty.MoveArmDegrees

Moves one of Misty's arms to a specified location in degrees.

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

```JavaScript
// Syntax
misty.MoveArmDegrees(string arm, double degrees, double velocity, [int prePauseMs], [int postPauseMs])
```

Arguments
* arm (string) - The arm to move. Use `left`, `right`, or `both`.
* degrees (double) - The location in degrees to move the arm to. Value range: 90 (fully down) to -26 (fully up).
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveArmDegrees("right", -90, 50);
```

### misty.MoveArmRadians

Moves one of Misty's arms to a specified location in radians.

```JavaScript
// Syntax
misty.MoveArmRadians(string arm, double radians, double velocity, [int prePauseMs], [int postPauseMs])
```

Arguments
* arm (string) - The arm to move. Use `left`, `right`, or `both`.
* radians (double) - The position in `radians` to move the arm to. For information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveArmRadians("left", -1.5708, 50);
```

### misty.MoveHead

Moves Misty's head to a new position along its pitch, roll, and yaw axes.

```JavaScript
// Syntax
misty.MoveHead(double pitch, double roll, double yaw, double velocity, [double duration], [string units], [int prePauseMs], [int postPauseMs]);
```

**Value Ranges for Each Axis of Movement**

|| degrees |
|-----|----------|---------|
| pitch | -40 (up) to 26 (down) |
| roll | -40 (left) to 40 (right) |
| yaw | -81 (right) to 81 (left) |

For more information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument. If you pass in values for both arguments, or if you pass in values for neither arguments, the system throws an exception.
{{box op="end"}}

Arguments

- pitch (double) - Value that determines the up or down movement of Misty's head movement.
- roll (double) - Value that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right.
- yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right.
- velocity (double) - Optional. The percentage of max velocity that indicates how quickly Misty should move her head. Value range: 0 to 100. Defaults to 10.
- duration (double) - Optional. Time (in seconds) Misty takes to move her head from its current position to its new position.
- units (string) -  Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's head. Defaults to `degrees`.
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.


```JS
// Misty looks straight ahead
misty.MoveHead(0, 0, 0, 100);
```

### misty.MoveHeadDegrees
Moves Misty's head in one of three axes (tilt, turn, or up-down). For information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

```JavaScript
// Syntax
misty.MoveHeadDegrees(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments

* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from approximately -40 (fully up) to 26 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value specifying the tilt ("ear" to "shoulder") of Misty’s head. Misty’s head tilts to the left or right. Values range from -40 (fully left) to 40 (fully right). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -81 (fully right) to 81 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveHeadDegrees(10, 10, 10, 100);
```

### misty.MoveHeadRadians

Moves Misty's head in one of three axes (tilt, turn, or up-down). For information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

```JavaScript
// Syntax
misty.MoveHeadRadians(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments

* pitch (double) - A value in radians specifying the position of Misty’s head along the up-down axis. Values range from -0.1662 (fully up) to 0.6094 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value in radians specifying the tilt ("ear" to "shoulder") of Misty’s head. Values range from -0.75 (head tilted fully to the left shoulder) to 0.75 (head fully to the right shoulder). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* yaw (double) - A value in radians specifying the turn to the left or right of Misty’s head. Values range from -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveHeadRadians(0.5708, 0.5708, 1.5708, 100);
```

### misty.Stop
Stops Misty's movement.

```JavaScript
// Syntax
misty.Stop([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Stop();
```

## Navigation

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#navigation).
{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty’s SLAM capabilities are an alpha feature. Experiment with mapping, but recognize that Misty’s ability to create maps and track within them is unreliable at this time.
{{box op="end"}}

### misty.DeleteSlamMap

Deletes a map.

```js
// Syntax
misty.DeleteSlamMap(string key, [int prePauseMs], [int postPauseMs]);
```

Arguments

* key (string) - The unique `key` value of the map to delete. **Note:** This command does not work when passed the value for the `name` associated with a map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example
misty.DeleteSlamMap("Map_20190912_21.16.32.UTC");
```

### misty.FollowPath

Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path. Misty will not be able to successfully follow a path if unmapped obstacles are in her way.

```JavaScript
// Syntax
misty.FollowPath(string path, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Make sure to call `misty.StartTracking()` to start Misty tracking her location before using this command, and call `misty.StopTracking()` to stop Misty tracking her location after using this command.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments
* path (string) - A string of comma-separated X:Y coordinates representing waypoints on a path for Misty to track through her currently active map. Each waypoint is a colon-separated integer pair representing the X and Y coordinates of a location on Misty's currently active map. You can use the `GetMap` command in Misty's REST API to access the occupancy grid for Misty's current map, and use this grid to determine the X and Y coordinates of the destination.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.FollowPath("4:3,8:8,10:15");
```

### misty.GetMap

Obtains the occupancy grid data for Misty's currently active map.

```JavaScript
// Syntax
misty.GetMap([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To obtain a valid response from `misty.GetMap()`, Misty must first have successfully generated a map. To change the currently active map, use the [`SetCurrentSlamMap`](../../../misty-ii/rest-api/api-reference/#setcurrentslammap) command in Misty's REST API.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Misty’s maps are squares that are constructed around her initial physical location when she starts mapping. When a map is complete, it is a square with Misty’s starting point at the center.

The occupancy grid for the map is represented by a two-dimensional matrix. Each element in the occupancy grid represents an individual cell of space. The value of each element (0, 1, 2, or 3) indicates the nature of the space in those cells (respectively: "unknown", "open", "occupied", or "covered").

Each cell corresponds to a pair of X,Y coordinates that you can use with the `misty.FollowPath()`, `misty.DriveToLocation()`, and `misty.GetSlamPath()` commands. The first cell in the first array of the occupancy grid is the origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetMap();
```

Returns

* Result (object) - An object containing the following key-value pairs. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * grid (array of arrays) - The occupancy grid for the most recent map Misty has generated, represented by a matrix of cells. The number of arrays is equal to the value of the `height` parameter. The number of cells is equal to the product of `height` x `width`. Each individual value (0, 1, 2, or 3) in the matrix represents a single cell of space. 0 indicates "unknown" space, 1 indicates "open" space, 2 indicates "occupied" space, and 3 indicates "covered" space. Each cell corresponds to an X,Y coordinate on the occupancy grid. The first cell in the first array is the X,Y origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. If no map is available, grid returns `null`.
  * height (integer) - The height of the occupancy grid matrix (in number of cells).
  * isValid (boolean) - Returns a value of `true` if the data returned represents a valid map. If no valid map data is available, returns a value of `false`.
  * metersPerCell (integer) - A value in square meters stating the size of each cell in the occupancy grid matrix.
  * originX (float) - The distance in meters from the X value of the occupancy grid origin (0,0) to the X coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to an X coordinate on the occupancy grid, use the formula 0 - (`originX` / `metersPerCell`). Round the result to the nearest whole number. 
  * originY (float) - The distance in meters from the Y value of the occupancy grid origin (0,0) to the Y coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to a Y coordinate on the occupancy grid, use the formula 0 - (`originY` / `metersPerCell`). Round the result to the nearest whole number. 
  * size (integer) - The total number of map cells represented in the grid array. Multiply this number by the value of meters per cell to calculate the area of the map in square meters.
  * width (integer) - The width of the occupancy grid matrix (in number of cells). 


### misty.GetCurrentSlamMap

Obtains the key for the currently active map.

```js
// Syntax
misty.GetCurrentSlamMap([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSerialSensorValues()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetCurrentSlamMap()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example

misty.GetCurrentSlamMap();

function _GetCurrentSlamMap(data) {
    // Prints key for current map to SkillData event listeners
    // For example: Map_20191011_18.06.52.UTC
    misty.Debug(data.Result)
}
```

Returns

* result (string) - The unique key associated with the currently active map. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamIrExposureAndGain

Obtains the current exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor.

```JavaScript
// Syntax
misty.GetSlamIrExposureAndGain([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/javascript-sdk/api-reference/#misty-startslamstreaming) command.
{{box op="end"}}

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamIrExposureAndGain()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamIrExposureAndGain()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example
misty.StartSlamStreaming();
misty.Pause(1000);
misty.GetSlamIrExposureAndGain();

function _GetSlamIrExposureAndGain(data) {
    // Prints gain and exposure data
    misty.Debug("Gain: " + data.Result.Gain + ", Exposure: " + data.Result.Exposure);
}
misty.StopSlamStreaming();
```

Returns

* Result (object) - An object with the following key/value pairs. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Exposure (double) - The current exposure levels for the infrared cameras in the depth sensor (in seconds).
  * Gain (integer) - The current gain levels for the infrared cameras in the depth sensor (in dB).

### misty.GetSlamMaps

Obtains a list of keys and names for Misty's existing maps.

```JavaScript
// Syntax
misty.GetSlamMaps([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamMaps()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamMaps()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example

misty.GetSlamMaps();

function _GetSlamMaps(data) {
    // Prints  the name and key for each map to SkillData event listeners
    for (var i = 0; i <= data.Result.length; i ++) {
        misty.Debug("Map " + (i + 1) + " Key: " + JSON.stringify(data.Result[i].Key) + ", Name: " + JSON.stringify(data.Result[i].Name));
    }
}
```

Returns

* Result (array) - A list of objects representing Misty's existing maps. Each object has the following key/value pairs. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Key (string) - The map's unique key value. Keys are date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`). The key for a map cannot be changed.
  * Name (string) - A customizable string label for the map. When you create a map, the system saves the map with a name value that is the same as the map's key value. To change a map's name, use the [`RenameSlamMap`](./#misty-renameslammap) command.

```JSON
{
  "Result": [
    {
      "Key": "Map_20190912_21.16.06.UTC",
      "Name": "Map_20190912_21.16.06.UTC"
    },
    {
      "Key": "Map_20190912_21.16.32.UTC",
      "Name": "My Map"
    }
  ]
}
```

### misty.GetSlamNavigationDiagnostics

Obtains diagnostic information about Misty's navigation system.

```JavaScript
// Syntax
misty.GetSlamNavigationDiagnostics([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

The information in the data object for this command is primarily used by the Misty Robotics engineering and support staff to troubleshoot and root-cause issues with Misty's SLAM system. The contents of this data object are likely to change without notice in future system updates.
{{box op="end"}}

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a calfunction to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamNavigationDiagnostics()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamNavigationDiagnostics()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* result (string) - A stringified JSON object with diagnostic information about the current status of Misty's SLAM system. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamPath

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the `path` parameter of `misty.FollowPath()` for Misty to follow this path to the desired location.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

**Important!** Make sure to call `misty.StartTracking()` to start Misty tracking her location before using this command, and call `misty.StopTracking()` to stop Misty tracking her location after using this command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.GetSlamPath(double X, double Y, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* X (double) - The X coordinate of the destination.
* Y (double) - The Y coordinate of the destination.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetSlamPath(100, 250);
```

Returns

* Result (array) - An array containing integer pairs. Each pair specifies the X,Y coordinates for a waypoint on the path. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamStatus

Obtains values representing the current activity and status of Misty's SLAM system. Check these values for information about the current status of Misty's depth sensor, the SLAM system, and to see information relevant to any ongoing mapping or tracking activities.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We suggest primarily using the values of `Status`/`StatusList` when coding SLAM functionality in your skills and robot applications, and only using the `SensorStatus` and `RunMode` values as supplemental information if needed or for debugging purposes.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamStatus()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSlamStatus([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetSlamStatus()>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example

misty.GetSlamStatus();

function _GetSlamStatus(data) {
    // Prints StatusList array to SkillData listeners
    misty.Debug(JSON.stringify(data.Result.StatusList))
}
```

Returns
* Result (object) - A data object with the following key-value pairs. **Note:** With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * `Status` (int) - Number that describes the current status of the SLAM system. This number updates with information from the `SensorStatus` and `RunMode` fields, as well as with other events that occur during a SLAM session. Note that this number represents several status codes simultaneously. You can convert this number to a binary value to see whether the bit field for a given status code is on (`1`) or off (`0`). As an example, the status code `33028` converts to a binary value of `1000000100000100`. In this binary value, the 3rd, 9th, and 16th bits are flipped. Those bits correspond to the status codes for `Exploring`, `LostPose`, and `Streaming`, respectively. (Note that the system also returns the string fields for all current status codes to the `StatusList` array that comes back with a `GetSlamStatus` response.) The following hexadecimal values correspond to bit fields for each possible status code:
    * 0x0000: `Uninitialized` - The SLAM system is not yet initialized.
    * 0x0001: `Initializing` - The SLAM system is initializing.
    * 0x0002: `Ready` - Misty's depth sensor and the SLAM system are ready to start mapping and tracking.
    * 0x0004: `Exploring` - The SLAM system is mapping.
    * 0x0008: `Tracking` - The SLAM system is tracking.
    * 0x0010: `Recording` - The SLAM system is recording an `.occ` file to Misty's local storage.
    * 0x0020: `Resetting` - The SLAM system is in the process of shutting down and resetting.
    * 0x0040: `Rebooting` - The SLAM system is rebooting.
    * 0x0080: `HasPose` - The SLAM system has obtained pose.
    * 0x0100: `LostPose` - The SLAM system has lost pose after having obtained it.
    * 0x0200: `Exporting_Map` - The SLAM system is exporting a map after mapping is complete.
    * 0x0400: `Error` - There is an error with the SLAM system or with the depth sensor.
    * 0x0800: `Error_Sensor_Not_Connected` - The depth sensor is not connected.
    * 0x1000: `Error_Sensor_No_Permission` - The system does not have permission to use the depth sensor.
    * 0x2000: `Error_Sensor_Cant_Open` - The system cannot open the depth sensor for communication.
    * 0x4000: `Error_Error_Power_Down_Robot` - Unrecoverable error. Power down the robot and restart.
    * 0x8000: `Streaming` - The SLAM system is streaming.
  * `StatusList` (array) - A list of the string values that describe the current status of the SLAM system. Can contain any of the values represented by the `status` field.
  * `RunMode` (string) - Current status of the navigation system. Possible values are:
    * `Uninitialized`
    * `Tracking`
    * `Exploring`
    * `Relocalizing`
    * `Paused`
    * `ExportingScene`
    * `NeedMoreMotionToInitMap`
    * `NotAvailable`
  * `SensorStatus` (string) - Current status of the depth sensor sensor. Possible values are:
    * `Uninitialized`
    * `Connected`
    * `Booting`
    * `Ready`
    * `Disconnected`
    * `Error`
    * `USBError`
    * `LowPowerMode`
    * `RecoveryMode`
    * `ProdDataCorrupt`
    * `CalibMissingOrInvalid`
    * `FWVersionMismatch`
    * `FWUpdate`
    * `FWUpdateComplete`
    * `FWUpdateFailed`
    * `FWCorrupt`
    * `EndOfFile`
    * `USBDriverNotInstalled`
    * `Streaming`

### misty.GetSlamVisibleExposureAndGain

Obtains the current exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor.

```JavaScript
// Syntax
misty.GetSlamVisibleExposureAndGain([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamVisibleExposureAndGain()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamVisibleExposureAndGain()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example
misty.StartSlamStreaming();
misty.Pause(1000);
misty.GetSlamVisibleExposureAndGain();

function _GetSlamVisibleExposureAndGain(data) {
    // Prints gain and exposure data
    misty.Debug("Gain: " + data.Result.Gain + ", Exposure: " + data.Result.Exposure);
}
misty.SlamStopStreaming();
```

Returns

* Result (object) - An object with the following key/value pairs. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Exposure (double) - The current exposure levels for the fisheye camera in the depth sensor (in seconds).
  * Gain (integer) - The current gain levels for the fisheye camera in the depth sensor (in dB).

```JSON
{
   "Result": {
      "Exposure": 0.007987,
      "Gain": 2
   }
}
```

### misty.RenameSlamMap

Renames an existing map.

```js
// Syntax
misty.RenameSlamMap(string key, string name, [int prePauseMs], [int postPauseMs]);
```

Arguments

* key (string) - The unique `key` value of the map to rename.
* name (string) - A new `name` value for the map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JS
// Example
misty.RenameSlamMap("Map_20190912_21.16.06.UTC", "NewName");
```

### misty.ResetSlam

Resets Misty's SLAM sensors.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.ResetSlam([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ResetSlam();
```

### misty.SetCurrentSlamMap

Sets a map to be Misty's currently active map for tracking and relocalization.

```JavaScript
// Syntax
misty.SetCurrentSlamMap(string key, [int prePauseMs], [int postPauseMs]);
```

Arguments

* key (string) - The unique `key` of the map to make currently active. **Note:** This command does not work when passed the value for the `name` associated with a map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetCurrentSlamMap("Map_20190912_21.16.06.UTC");
```

### misty.StartLocatingDockingStation

Starts Misty locating the position and orientation (pose) of the docking station.

```JavaScript
// Syntax
misty.StartLocatingDockingStation([int startStreamingTimeout], [int enableIrTimeout], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

To use information about the pose of Misty's docking station in your skills and robot applications, you must both issue a `StartLocatingDockingStation` command and register a listener for the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type. We do not recommend that you attempt to locate the docking station while Misty is actively creating a map.
{{box op="end"}}

When you issue a `StartLocatingDockingStation` command, Misty uses the right infrared (IR) camera in the depth sensor to locate the front four IR reflectors embedded in the docking station. The system uses the location of these reflectors to calculate the pose for the point on the docking station where Misty should be centered to receive the best charge.

When Misty locates the station, `ChargerPoseMessage` event listeners receive relative pose data in the form of a column major homogeneous coordinate matrix. The right IR camera in Misty's depth sensor (from the robot's perspective) is the origin point for all docking station pose data. Read more about interpreting this data in the documentation for the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type.

To get docking station pose, Misty must be between 0.5 and 2 meters away from the docking station. The robot should also be facing in the general direction of the docking station. The station should be inside a cone of +/- 45 degrees originating from the robot's right IR camera.

Arguments

* startStreamingTimeout (int) - Optional. The number of one second intervals that must elapse with streaming stopped before the `StartLocatingDockingStation` command fails. The system checks the status of the streaming service this many times, with a pause of one second between each check. If streaming doesn't start before these status checks complete, then the `StartLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* enableIrTimeout (int) - Optional. The number of one second intervals that must elapse with infrared (IR) disabled before the `StartLocatingDockingStation` command fails. The system checks the status of the IR sensors this many times, with a pause of one second between each check. If the IR sensors are not enabled before these status checks complete, then the `StartLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StartMapping

Starts Misty mapping an area.

Misty saves each map she creates to local storage. Each map is associated with a unique key at the time of the map's creation. Map keys are formatted as date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`). To obtain a list of Misty's existing maps, use the [`GetSlamMaps`](../../../misty-ii/rest-api/api-reference/#getslammaps) command in Misty's REST API.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's SLAM system can run out of memory, especially while mapping mapping large, complex areas. When this happens, the SLAM system shuts down, and Misty saves any progress made on the current map to her local storage.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}


```JavaScript
// Syntax
misty.StartMapping([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartMapping();
```

### misty.StartSlamStreaming

Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `misty.StopSlamStreaming()` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Calling `misty.StopSlamStreaming()` turns off the laser in the depth sensor and lowers Misty's power consumption.

```JavaScript
// Syntax
misty.StartSlamStreaming([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartSlamStreaming();
```


### misty.StartTracking

Starts Misty tracking her location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.StartTracking([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartTracking();
```

### misty.StopLocatingDockingStation

Stops Misty locating the docking station.

```JavaScript
// Syntax
misty.StopLocatingDockingStation([int stopStreamingTimeout], [int disableIrTimeout], [int prePauseMs], [int postPauseMs])
```

For more information about locating the docking station, see the documentation for the [`StartLocatingDockingStation`](./#misty-startlocatingdockingstation) command and the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* stopStreamingTimeout (int) - Optional. The number of one second intervals that must elapse with streaming enabled before the `StopLocatingDockingStation` command fails. The system checks the status of the streaming service this many times, with a pause of one second between each check. If streaming doesn't stop before these status checks complete, then the `StopLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* disableIrTimeout (int) - Optional. The number of one second intervals that must elapse with infrared (IR) enabled before the `StopLocatingDockingStation` command fails. The system checks the status of the IR sensors this many times, with a pause of one second between each check. If the IR sensors are not enabled before these status checks complete, then the `StopLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StopMapping

Stops Misty mapping an area.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.StopMapping([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopMapping();
```

### misty.StopSlamStreaming
Closes the data stream from the Occipital Structure Core depth sensor. Calling this command turns off the laser in the depth sensor and lowers Misty's power consumption.

**Important!** Always use this command to close the depth sensor data stream after using `misty.StartSlamStreaming()` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

```JavaScript
// Syntax
misty.StopSlamStreaming([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopSlamStreaming();
```

### misty.StopTracking

Stops Misty tracking her location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}


```JavaScript
// Syntax
misty.StopTracking([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopTracking();
```

### misty.TakeDepthPicture

Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of "unknown" values in the form of `NaN` ("not a number") values.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakeDepthPicture([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakeDepthPicture();
```

Returns

- Result (object) - An object containing depth information about the image matrix, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - height (integer) - The height of the matrix.
  - image (array) - A matrix of size `height` x `width` containing individual values of type float. Each value is the distance in millimeters from the sensor for each pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. Note that as the robot moves further away from a scene being viewed, each pixel value will represent a larger surface area. Conversely, if it moves closer, each pixel value will represent a smaller area.
  - width (integer) - The width of the matrix.

### misty.TakeFisheyePicture

Takes a photo using the camera on Misty’s Occipital Structure Core depth sensor.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakeFisheyePicture([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakeFisheyePicture();
```

Returns

- Result (object) -  An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - base64 (string) - A string containing the Base64-encoded image data.
  - contentType (string) - The type and format of the image returned.
  - height (integer) - The height of the picture in pixels.
  - name (string) - The name of the picture.
  - width (integer) - The width of the picture in pixels.


## Perception

The following commands allow you to programmatically take pictures, record sounds or videos, and have misty detect and learn to recognize faces. 

Like most of us, Misty sees faces best in a well-lit area. If you want to directly experiment with face recognition commands, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#perception).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../rest-api/overview/#getting-data-from-misty) to her FaceRecognition [WebSocket](../../../misty-ii/robot/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

### misty.CancelFaceTraining
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the `misty.CancelFaceTraining()` command unless you want to abort a training that is in progress.

```JavaScript
// Syntax
misty.CancelFaceTraining([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.CancelFaceTraining();
```

### misty.CaptureSpeech

Starts capturing speech in a new audio recording. Misty's chest LED pulses blue when she is recording audio or listening for the key phrase.

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording by using the `MaxSpeechLength` argument.

Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```js
// Syntax

misty.CaptureSpeech([bool requireKeyPhrase], [bool overwriteExisting], [int maxSpeechLength], [int silenceTimeout], [int prePauseMs], [int postPauseMs])
```

Arguments

* RequireKeyPhrase (bool) - Optional. If `true`, Misty waits to start recording speech until she recognizes the key phrase. If `false`, Misty immediately starts recording speech. Defaults to `true`. 
*   OverwriteExisting (bool) - Optional. If `true`, the captured speech recording overwrites any existing recording saved under the default speech capture filename. (Note that Misty saves speech recordings she captures with this command under one of two default filenames: `capture_HeyMisty.wav` when `RequireKeyPhrase` is `true`, or `capture_Dialogue.wav` when `RequireKeyPhrase` is `false`.) If `OverwriteExisting` is `false`, Misty saves the speech recording under a unique, timestamped filename: `capture_{HeyMisty or Dialogue}_{Day}-{Month}-{Year}-{Hour}-{Minute}.wav`. Defaults to `true`. **Note:** If you program Misty to save each unique speech recording, you should occasionally delete unused recordings to prevent them from filling the memory on her 820 processor.
* MaxSpeechLength (int) - Optional. The maximum duration (in milliseconds) of the speech recording. If the length of an utterance exceeds this duration, Misty stops recording after the duration has elapsed, and the system triggers a `VoiceRecord` event with a message that Misty did not detect the end of the recorded speech. Range: `500` to `20000`. Defaults to `7500` (7.5 seconds).
* SilenceTimeout (int) - Optional. The maximum duration (in milliseconds) of silence that can precede speech before the speech capture mechanism times out. If Misty does not detect speech before the `SilenceTimeout` duration elapses, she stops listening for speech and triggers a `VoiceRecord` event with a message that she did not detect the beginning of speech. Range: `500` to `10000`. Defaults to `5000` (5 seconds).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example

// This sample illustrates using speech capture in a JavaScript skill

/* Event Listeners */

// Registers a listener for VoiceRecord event messages, and adds return
// properties to event listener so that we get all this data in the
// _VoiceRecord callback.
misty.AddReturnProperty("VoiceRecord", "Filename");
misty.AddReturnProperty("VoiceRecord", "Success");
misty.AddReturnProperty("VoiceRecord", "ErrorCode");
misty.AddReturnProperty("VoiceRecord", "ErrorMessage");
misty.RegisterEvent("VoiceRecord", "VoiceRecord", 10, false);

// Misty starts listening for key phrase. When recognized, Misty
// starts a new speech recording.
misty.CaptureSpeech(true);

/* Callbacks */

// Triggers when Misty finishes capturing a speech recording
function _VoiceRecord(data) {
   // Get data from AdditionalResults array
   var filename = data.AdditionalResults[0];
   var success = data.AdditionalResults[1];
   var errorCode = data.AdditionalResults[2];
   var errorMessage = data.AdditionalResults[3];

   // If speech capture is successful, tell us and play the recording
   if (success = true) {
      misty.Debug("Successfully captured speech! Listen closely...")
      misty.PlayAudio(filename);
   }
   // Otherwise, print the error message
   else {
      misty.Debug("Error: " + errorCode + ". " + errorMessage);
   }
}
```

### misty.ForgetFaces

Removes records of trained faces from Misty's memory.

```JavaScript
// Syntax
misty.ForgetFaces(string FaceId, [int prePauseMs], [int postPauseMs]);
```

Arguments

* FaceId (string) - The ID of the face to remove. If `null`, clears all trained faces from Misty's memory.

```JavaScript
// Example
misty.ForgetFaces("John");
```

### misty.GetKnownFaces
Obtains a list of the names of faces on which Misty has been successfully trained.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetKnownFaces([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetKnownFaces();
```

Returns

* Result (string) - A list of the names for faces that Misty has been trained to recognize. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.Speak

Misty speaks a string of text out loud. By default, Misty speaks in US English.

```JavaScript
// Syntax
misty.Speak(string text, [bool flush = "false"], [string utteranceId], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

The `Speak` command uses the text-to-speech (TTS) engine on Misty's 820 processor. At this time Misty's TTS engine supports a limited subset of [Speech Synthesis Markup Language (SSML) Version 1.0](https://www.w3.org/TR/2004/REC-speech-synthesis-20040907/). This includes support for the following SSML tags:

**`<speak>`**

The root SSML element. Required to engage SSML.

**`<speak>` Supported Attributes**

- `xml:lang`

Example:

```
<speak>
    How do you say <lang xml:lang=\"fr-FR\">Bonjour le monde</lang> in English?
</speak>
```

**`<p>`**

Represents a paragraph. Adds a pause at the end of a paragraph.

**`<p>` Supported Attributes**

- N/A

Example:

```
<speak>                                         
    <p>This is the first paragraph. There should be a pause after this text is spoken.</p>       
    <p>This is the second paragraph.</p> 
</speak>
```

**`<s>`**

Represents a sentence. Provides strong breaks before and after the tag.

**`<s>` Supported Attributes**

- N/A

Example:

```
<speak>
  <s>This is a sentence</s>
  <s>There should be a short pause before this second sentence</s>
  This sentence ends with a period and should have the same pause.
</speak>
```

**`<phoneme>`**

Manually control the pronunciation of a single phoneme. Only supports IPA and XSAMPA phonetic alphabets.

**`<phoneme>` Alphabets**

- IPA
  - Due to text encoding issues, some implementations that use IPA may not work. When this happens, you may try using XSAMPA instead.
- XSAMPA



**`<phoneme>` Supported Attributes**

- `alphabet` (followed by alphabet type)
- `ph` (`' '` and `\#` delimit multiple phonemes inside the `ph` attribute)

Example:

```
<speak>
  You say, <phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>. 
  I say, <phoneme alphabet="ipa" ph="ˈpi.kæn">pecan</phoneme>.
</speak>
```

**`<break>`**

Pauses speech.

**`<break>` Supported Attributes**

**Note:** Use one of these attributes, but not both.

- `time`: milliseconds of pause
- `strength`: 
  - `none` = 0 ms
  - `x-weak` = 100 ms
  - `weak` = 300 ms
  - `medium` = 600 ms
  - `strong` = 1000 ms
  - `x-strong` = 3000 ms
  
```
<speak>
  It's gonna be legen <break strength=\"x-strong\"/> wait for it <break strength=\"x-strong\"/> dary!
</speak>
```

**`<prosody>`**
Allows for adjusting pitch, rate and volume mid-speech.

**`<prosody>` Supported Attributes**

- `pitch`: Can use integer as percentage, or predefined values below.
  - `x-low` = 50
  - `low` = 75
  - `medium` = 100
  - `default` = 100 
  - `high` = 150
  - `x-high` = 200
- `rate`: Can use integer as milliseconds or predefined values below.
  - `x-slow` = 30 ms
  - `slow` = 60 ms
  - `medium` = 100 ms
  - `default` = 100 ms
  - `fast` = 250 ms
  - `x-fast` = 500 ms
- `volume`: Can use integer as percentage or predefined values below.
  - `silent` = 0
  - `x-low` = 25
  - `low` = 70
  - `medium` = 120
  - `default` = 120
  - `loud` = 300
  - `x-loud` = 450

Example:

```
<speak>
  I can talk at different speeds.
  <prosody rate=\"fast\">I can talk really fast</prosody>.
  <prosody rate=\"x-slow\">Or I can talk really slow</prosody>.
  I can talk at different volumes. 
  This is the default volume.
  <prosody volume=\"x-low\">I can whisper.</prosody>.
  <prosody volume=\"x-loud\">Or I can yell!</prosody>
</speak>
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You can enqueue many `Speak` commands without interrupting the text that Misty is currently speaking out loud. Each `Speak` command is added to a queue, and Misty speaks enqueued text in order until she receives a `Speak` command with `Flush = true` (which clears all previous `Speak` commands from the queue).
{{box op="end"}}

Arguments

* text (string) - The text to speak, along with any relevant SSML tags to customize speech synthesis.
* flush (bool) - Optional. Whether to flush all previously enqueued `Speak` commands. Default is `false`.
* utteranceId (string) - Optional. The identifier for this instance of the `Speak` command. For use with additional features not yet implemented.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example

misty.Speak("Hello, world!");
```

### misty.StartFaceDetection
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call `misty.StopFaceDetection()`.

```JavaScript
// Syntax
misty.StartFaceDetection([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartFaceDetection();
```

### misty.StartFaceRecognition
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `misty.StartFaceDetection()` command to detect and store face IDs in Misty's memory.

When you are done having Misty recognize faces, call `misty.StopFaceRecognition()`.

```JavaScript
// Syntax
misty.StartFaceRecognition([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartFaceRecognition();
```

<!-- misty.StartFaceTraining - BETA -->
### misty.StartFaceTraining
Starts Misty learning a face and assigns a name to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call `misty.CancelFaceTraining()`.

```JavaScript
// Syntax
misty.StartFaceTraining(string faceId, [int prePauseMs], [int postPauseMs]);
```

Arguments
* faceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, `-`, and `_` are valid characters.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartFaceTraining("My_Face");
```

### misty.StartKeyPhraseRecognition

Starts Misty listening for the "Hey, Misty!" key phrase and configures Misty to capture a recording with any speech she detects after recognizing the key phrase. Misty's chest LED pulses blue when she is recording audio or listening for the key phrase.

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording with the `MaxSpeechLength` argument.

There are two event types associated with key phrase recognition:

* Misty triggers a [`KeyPhraseRecognized`](../../../misty-ii/robot/sensor-data/#keyphraserecognized) event each time she recognizes the "Hey, Misty" key phrase.
* Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.

```js
// Syntax

misty.StartKeyPhraseRecognition([bool captureSpeech], [bool overwriteExisting], [int maxSpeechLength], [int silenceTimeout], [string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* captureSpeech (bool) - Optional. If `true`, Misty starts recording speech after recognizing the "Hey, Misty" key phrase. By default, Misty saves speech recordings under the filename `capture_heymisty.wav`. Defaults to `true`.
* overwriteExisting (bool) - Optional. If `true`, the captured speech recording overwrites any existing recording saved under the filename `capture_heymisty.wav`. If false, Misty saves the speech recording under a unique, timestamped filename: `capture_heymisty_{Day}-{Month}-{Year}-{Hour}-{Minute}.wav`. Defaults to `true`. **Note:** If you program Misty to save each unique speech recording, you should occasionally delete unused recordings to prevent them from filling the memory on her 820 processor.
* maxSpeechLength (int) - Optional. The maximum duration (in milliseconds) of the speech recording. If the length of an utterance exceeds this duration, Misty stops recording after the duration has elapsed, and the system triggers a `VoiceRecord` event with a message that Misty did not detect the end of the recorded speech. Range: `500` to `20000`. Defaults to `7500` (7.5 seconds).
* silenceTimeout (int) - Optional. The maximum duration (in milliseconds) of silence that can precede speech before the speech capture mechanism times out. If Misty does not detect speech before the `SilenceTimeout` duration elapses, she stops listening for speech and triggers a `VoiceRecord` event with a message that she did not detect the beginning of speech. Range: `500` to `10000`. Defaults to `5000` (5 seconds).
* callback (string) - Optional. The name of the callback function to call when Misty successfully invokes the `StartKeyPhraseRecognition` command. If empty, a callback function with the default name (`_StartKeyPhraseRecognition()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are "synchronous", "override", and "abort". Defaults to "synchronous". For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique ID of the skill to trigger for the callback function, if the callback is not defined in the current skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example

// The following illustrates how to use key phrase recognition in a
// JavaScript skill for Misty II

/* Event Listeners */

// Registers a listener for VoiceRecord event messages, and adds return
// properties to event listener so that we get all this data in the
// _VoiceRecord callback.
misty.AddReturnProperty("VoiceRecord", "Filename");
misty.AddReturnProperty("VoiceRecord", "Success");
misty.AddReturnProperty("VoiceRecord", "ErrorCode");
misty.AddReturnProperty("VoiceRecord", "ErrorMessage");
misty.RegisterEvent("VoiceRecord", "VoiceRecord", 10, false);

// Registers a listener for KeyPhraseRecognized event messages
misty.RegisterEvent("KeyPhraseRecognized", "KeyPhraseRecognized", 10, false);

misty.StartKeyPhraseRecognition();

/* Callbacks */

// Triggers when misty hears the key phrase
function _KeyPhraseRecognized() {
   misty.Debug("Key phrase recognized! Now listening for speech.");
}

// Triggers when Misty starts listening for the key phrase 
function _StartKeyPhraseRecognition() {
   misty.Debug("Now listening for the key phrase.");
}

// Triggers when Misty finishes capturing a speech recording
function _VoiceRecord(data) {
   // Get data from AdditionalResults array
   var filename = data.AdditionalResults[0];
   var success = data.AdditionalResults[1];
   var errorCode = data.AdditionalResults[2];
   var errorMessage = data.AdditionalResults[3];

   // If speech capture is successful, tell us and play the recording
   if (success = true) {
      misty.Debug("Successfully captured speech! Listen closely...")
      misty.PlayAudio(filename);
   }
   // Otherwise, print the error message
   else {
      misty.Debug("Error: " + errorCode + ". " + errorMessage);
   }
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Notes**

* When you issue a `misty.StartKeyPhraseRecognition()` command, Misty listens for the key phrase by continuously sampling audio from the environment and comparing that audio to her trained key phrase model ("Hey, Misty!"). Misty does **not** create or save audio recordings until **after** she recognizes the key phrase.
* Because Misty cannot record audio and listen for the "Hey, Misty!" key phrase at the same time, she stops listening for the key phrase when issued a separate command to start recording audio. To have Misty start listening for the key phrase after capturing speech, you must issue another `misty.StartKeyPhraseRecognition()` command.
* When Misty recognizes the key phrase, she automatically stops listening for key phrase events. In order to start Misty listening for the key phrase again, you need to issue another `,misty.StartKeyPhraseRecognition()` command.

Follow these steps to code Misty to respond to the "Hey, Misty!" key phrase:

1. Invoke the `misty.StartKeyPhraseRecognition()` command. If needed, use the optional parameters to configure Misty's speech capture settings.
2. Register an event listener for `KeyPhraseRecognized` event messages to trigger a callback function when Misty recognizes the key phrase.
3. Register an event listener for `VoiceRecord` event messages to trigger a callback function when Misty captures a speech recording.
4. Write the code to handle what Misty should do when she recognizes the key phrase and captures a speech recording. For example, you might have Misty send the captured speech off to a third-party service for additional processing.
{{box op="end"}}

### misty.StartRecordingAudio

Starts Misty recording audio. Misty saves audio recordings to her local storage as .wav files. To stop recording, you must call the `misty.StopRecordingAudio()` method.

```JavaScript
// Syntax
misty.StartRecordingAudio(string filename, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** If you do not issue a `misty.StopRecordingAudio()` command, Misty will continue recording until the audio file is 1 GB. Attempting to retrieve a file this large from Misty can cause the system to crash.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty cannot record audio and listen for the "Hey, Misty!" key phrase at the same time. Recording audio automatically disables [key phrase recognition](./#misty-startkeyphraserecognition).
{{box op="end"}}

Arguments
* fileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartRecordingAudio("RecordingExample.wav");
```

### misty.StartRecordingVideo

Starts recording video with Misty's 4K Camera. Misty records videos in MP4 format at a resolution of 1080 × 1920 pixels.

Use `misty.StopRecordingVideo()` to stop recording a video. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call `misty.StopRecordingVideo()`.

Misty only saves the most recent video recording to her local storage. Recordings are saved with the filename `MistyVideo.mp4`, and this file is overwritten with each new recording. To download a video from your robot, use the [`GetVideoFile`](../../../misty-ii/rest-api/api-reference/#getvideofile) REST command.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you call the `misty.StartRecordingVideo()` command immediately after using the RGB camera to take a picture, there may be a few seconds delay before Misty starts recording.

This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.StartRecordingVideo([int prePauseMs], [int postPauseMs])
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartRecordingVideo();
```

### misty.StopFaceDetection
Stops Misty's detection of faces in her line of vision.

```JavaScript
// Syntax
misty.StopFaceDetection([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopFaceDetection();
```

### misty.StopFaceRecognition
Stops the process of Misty recognizing a face she sees.

```JavaScript
// Syntax
misty.StopFaceRecognition([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopFaceRecognition();
```

### misty.StopKeyPhraseRecognition

Stops Misty listening for the "Hey, Misty!" key phrase.

```JavaScript
// Syntax
misty.StopKeyPhraseRecognition([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StopRecordingAudio
Directs Misty to stop the current audio recording and saves the recording to the robot under the `fileName` name specified in the call to `misty.StartRecordingAudio()`. Use this command after calling the `misty.StartRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

```JavaScript
// Syntax
misty.StopRecordingAudio([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopRecordingAudio();
```

### misty.StopRecordingVideo

Stops recording video with Misty's 4K camera.

Use this command after calling `misty.StartRecordingVideo()`. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call this command. To download a video from your robot, use the [`GetVideoFile`](../../../misty-ii/rest-api/api-reference/#getvideofile) REST command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.StopRecordingVideo([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StopRecordingVideo();
```

### misty.TakePicture

Takes a photo with Misty’s 4K camera.

**Note:** When you call the `misty.TakePicture()` command immediately after using the camera to record a video, there may be a few seconds delay before Misty takes the photograph.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakePicture([string fileName], [int width], [int height], [bool displayOnScreen = false], [bool overwriteExisting = false], [string callback = _TakePicture()], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* fileName (string) - Optional. The filename to assign to the image file for the captured photo. Note that if you do not specify a filename, Misty does not save the photo to her local storage.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* displayOnScreen (boolean) - Optional. If `true` **and** a `fileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `fileName` value is provided, does nothing. Defaults to `false`.
* overwriteExisting (boolean) - Optional. Indicates whether Misty should overwrite an image with the same filename as the captured photo if one exists on her local storage. Passing in `true` overwrites a file with the same name. Passing in `false` prevents an existing file with the same name from being overwritten. In the case that `overwriteExisting` is set to `false` and a photo already exists with the same filename as the newly captured photo, the new photo is not saved to Misty. Defaults to `false`.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_TakePicture()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakePicture("newImage", 1200, 1600, false, true);
```

Returns

* Result (object) - An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
   * Base64 (string) - A string containing the Base64-encoded image data.
   * ContentType (string) - The type and format of the image returned.
   * Height (integer) - The height of the image in pixels.
   * Name (string) - The name of the image.
   * Width (integer) - The width of the image in pixels.





## Skill Management





### misty.CancelSkill
Cancel execution a specified skill.


```JavaScript
// Syntax
misty.CancelSkill(string skill, [int prePauseMs], [int postPauseMs])
```

Arguments

* Skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.CancelSkill("c3f9b33b-d895-48cf-8f15-cdcf5a866bde");
```

### misty.Debug

Publishes a string to subscribers of the `SkillData` named object. Use this method to print debug messages to the console in your web browser when you use Skill Runner.

You can think of `misty.Debug()` as the Misty version of `console.log()`. When you use Skill Runner to run a skill, the web page subscribes to the `SkillData` named object via Misty's WebSocket connection. This allows Misty to print error messages, debug messages, and other skill data to the console in your web browser. Use `misty.Debug()` to print your own messages to the console.

**Note:** Data you pass into the `misty.Debug()` message must be a string. To send a data object, you can serialize your data into a string and parse it out on the client side of the `SkillData` subscription. If `BroadcastMode` is set to `off` in the meta file for a skill, the skill does not publish debug data.

```JavaScript
// Syntax
misty.Debug(string data, [int prePauseMs], [int postPauseMs]);
```

Arguments

* data (string) - The debug message to publish.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Debug("Message")
```

### misty.Get

Returns data saved to the robot using `misty.Set()`. 

```JavaScript
// Syntax
misty.Get(string key, [int prePauseMs], [int postPauseMs]);
```

Arguments

* key (string) - The key name of the data to return.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Get("Key");
```

Returns

* value (string, boolean, integer, or double) - The data associated with the specified key.


### misty.GetRunningSkills

Obtains a list of the skills currently running on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
//Syntax
misty.GetRunningSkills([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetRunningSkills()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
//Example
misty.GetRunningSkills();
```

Returns

* result (array) - A list of objects with meta information about the skills currently running on Misty. If no skills are currently running, this command returns an empty array. Note that in a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill (see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information). Each object in the list includes the following key-value pairs:
  * description (string) - The description of the skill as it appears in the skill's meta file.
  * name (string) - the name of the skill, as it appears in the skill's meta file.
  * startupArguments (object) - An object with key-value pairs for each startup argument in the skill's meta file.
  * uniqueId (string) - The unique id of the skill, from the skill's meta file.


### misty.Keys

Returns a list of all the available persistent data stored on the robot. 

```JavaScript
// Syntax
misty.Keys([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Keys();
```

Returns

* keys (list) - A list of the keys and values for all available persistent data stored on the robot.

### misty.Pause

Pause skill execution for a specified number of milliseconds.

```JavaScript
// Syntax
misty.Pause(int prePauseMs)
```

Arguments
* prePauseMs (integer) - The duration in milliseconds to pause skill execution.

```JavaScript
// Example
misty.Pause(1000);
```

### misty.Publish

Writes data to the robot's internal log.

Note that `misty.Publish()` writes data to the robot's internal log file, even when called in a skill with the value of `WriteToLog` set to `False` in its meta file. You can use the Command Center to download your robot's log files, or send a GET request to the REST endpoint for the [`GetLogFile`](../../../misty-ii/rest-api/api-reference/#getlogfile) command.

```JavaScript
// Syntax
misty.Publish(string name, string data)
```

Arguments

* name (string) - A name for the data to write to the robot's log.
* data (string, integer, double, or boolean) - The data to write to the robot's log. To write an object, you must serialize your data into a string using `JSON.stringify()`.ƒ

```JavaScript
// Example
misty.Publish("data-name", "data-value");
```

### misty.RandomPause

Pause skill execution for a random duration.

```JavaScript
// Syntax
misty.RandomPause(int minimumDelay, int maximumDelay)
```

Arguments
* minimumDelay (integer) - The minimum duration in milliseconds to pause skill execution.
* maximumDelay (integer) - The maximum duration in milliseconds to pause skill execution. 

```JavaScript
// Example
misty.RandomPause(1000, 2000);
```


### misty.Remove

Removes data that has been saved to the robot under a specific key with `misty.Set()`. 

```JavaScript
// Syntax
misty.Remove(string key, [int prePauseMs], [int postPauseMs])
```

Arguments

* key (string) - The key name of the data to remove.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.Remove("Key");
```

### misty.RunSkill

Immediately runs a previously uploaded skill.

```JavaScript
// Syntax
misty.RunSkill(string skill, [string method], [int prePauseMs], [int postPauseMs])
```

Arguments

* skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.
* method (string) - Optional. A specific method within a skill to run, which can be useful for testing. If no value is specified for the `method` parameter, `RunSkill` by default starts running the skill from the beginning.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.RunSkill("bb20ff02-edac-475c-af0c-a06e81e5dc50");
```

### misty.Set

Saves data that can be validly updated and used across threads or shared between skills.

Data saved using `misty.Set()` must be one of these types: `string`, `bool`, `int`, or `double`. Alternately, you can serialize your data into a string using `JSON.stringify()` and parse it out again using `JSON.parse()`.

By default, long term data saved by the `misty.Set()` command clears from Misty's memory when Misty reboots. To change this, you need to include an additional `SkillStorageLifetime` key in the meta file for your skill. The `SkillStorageLifetime` key determines how long data saved to Misty with the `misty.Set()` command remains available for use in your skills. You can set the value of `SkillStorageLifetime` to `Skill`, `Reboot`, or `LongTerm`.

* `Skill` - The data clears when the skill stops running.
* `Reboot` - The data clears the next time Misty reboots.
* `LongTerm` - The data persists across reboots and remains available until removed from the robot with the mi`sty.Remove()` command.

You can safely omit the `SkillStorageLifetime` key from the meta file if you do not want to modify the default behavior of persistent data for that skill.

```JavaScript
// Syntax
misty.Set(string key, string value, [bool longTermStorage], [int prePauseMs], [int postPauseMs]);
```

Arguments

* key (string) - The key name for the data to save.
* value (value) - The data to save. Data saved using `misty.Set()` must be one of these types: `string`, `bool`, `int`, or `double`.
* longTermStorage (boolean) - Whether to save the data to long term storage. Defaults to `false`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next comm
and in the skill. If no command follows this command, `postPauseMs` is not used.

## System

### misty.AllowRobotUpdates

Changes the robot's settings to allow Misty II to automatically install system updates. Misty is configured to automatically download and install system updates by default. To prevent system updates, you must issue a `PreventRobotUpdates` command.

```js
// Syntax
misty.AllowRobotUpdates([int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.AudioServiceEnabled

Describes whether the audio service running on Misty's 820 processor is currently enabled.

```JS
// Syntax
misty.AudioServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_AudioServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

For more information about enabling and disabling the audio service, see the [`DisableAudioService`](./#misty-disableaudioservice) command description.

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_AudioServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JS
// Example

misty.AudioServiceEnabled();

function _AudioServiceEnabled(data) {
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (boolean) - Returns `true` if the audio service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.CameraServiceEnabled

Describes whether the camera service running on Misty's 820 processor is currently enabled.

```JavaScript
// Syntax
misty.CameraServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

For more information about enabling and disabling the camera service, see the [`DisableCameraService`](./#misty-disablecameraservice) command description.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_CameraServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_CameraServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example

misty.CameraServiceEnabled();

function _CameraServiceEnabled(data) {
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (boolean) - Returns `true` if the camera service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.ClearDisplayText

Force-clears an error message from Misty’s display. **Note:** This command is provided as a convenience. You should not typically need to call `misty.ClearDisplayText()`.

```JavaScript
// Syntax
misty.ClearDisplayText ([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ClearDisplayText();
```

### misty.ConnectToSavedWifi

Connects Misty to a saved Wi-Fi network.

```JavaScript
// Syntax
misty.ConnectToSavedWifi(string networkId, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkId (string) - The name of the network to connect to.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ConnectToSavedWifi("MyHomeWifi")
```

### misty.DisableAudioService

Disables the audio service running on Misty's 820 processor.

```JS
misty.DisableAudioService([int prePauseMs], [int postPauseMs]);
```

Disabling a specific service frees up memory on the 820 processor for other tasks, and can improve the performance of of other services that use the same processor. As an example, you may consider disabling the audio and camera services before you start mapping or tracking within a map to improve the performance of Misty's simultaneous localization and mapping (SLAM) activities.

Misty cannot run commands or stream messages from event types that use the audio service when the audio service is disabled. These commands and event types are listed below.

**Audio Service Commands**
* `GetAudioFile`
* `GetAudioList`
* `DeleteAudio`
* `PlayAudio`
* `SaveAudio`
* `SetDefaultVolume`
* `StartKeyPhraseRecognition`
* `StartRecordingAudio`
* `StopKeyPhraseRecognition`
* `StopRecordingAudio`

**Audio Service Event Types**
* `AudioPlayComplete`
* `KeyPhraseRecognized`
* `SourceTrackDataMessage`
* `SourceFocusConfigMessage`

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with all services enabled.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisableCameraService

Disables the camera service running on Misty's 820 processor.

```JS
misty.DisableCameraService([int prePauseMs], [int postPauseMs]);
```

Disabling a specific service frees up memory on the 820 processor for other tasks, and can improve the performance of other services that use the same processor. As an example, you may consider disabling the audio and camera services before you start mapping or tracking within a map to improve the performance of Misty's simultaneous localization and mapping (SLAM) activities.

Misty cannot run commands or stream messages from event types that use the camera service when the camera service is disabled. These commands and event types are listed below.

**Camera Service Commands**
* `CancelFaceTraining`
* `ForgetFaces`
* `StartFaceDetection`
* `StopFaceDetection`
* `StartFaceTraining`
* `StartRecordingVideo`
* `StopFaceDetection`
* `StopFaceRecognition`
* `StopRecordingVideo`
* `TakePicture`
* `GetCameraData`
* `GetKnownFaces`
* `GetVideoFile`

**Camera Service Event Types**
* `FaceRecognition`
* `FaceTraining`

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with all services enabled.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisableSlamService

Disables the SLAM service running on Misty's 820 processor.

```JS
misty.DisableSlamService([int prePauseMs], [int postPauseMs]);
```

Disabling a specific service frees up memory on the 820 processor for other tasks, and can improve the performance of other services that use the same processor. As an example, you may consider disabling the audio and SLAM services before you start face recognition to improve the performance of face recognition activities.

Misty cannot run commands or stream messages from event types that use the SLAM service when the SLAM service is disabled. These commands and event types are listed below.

**SLAM Service Commands**
* `DeleteSlamMap`
* `GetMap`
* `GetCurrentSlamMap`
* `GetSlamIrExposureAndGain`
* `GetSlamMaps`
* `GetSlamNavigationDiagnostics`
* `GetSlamPath`
* `GetSlamStatus`
* `GetSlamVisibleExposureAndGain`
* `RenameSlamMap`
* `ResetSlam`
* `SetCurrentSlamMap`
* `SetSlamIrExposureAndGain`
* `SetSlamVisibleExposureAndGain`
* `StartMapping`
* `StartSlamStreaming`
* `StartTracking`
* `StopMapping`
* `StopSlamStreaming`
* `StopTracking`
* `TakeDepthPicture`
* `TakeFisheyePicture`

**SLAM Service Event Types**
* `SlamStatus`

Additionally, when the SLAM service is disabled, Misty does not stream valid data to event types that publish information from `SlamStatus` messages (such as `SelfState`).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with all services enabled.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableAudioService

Enables the audio service running on Misty's 820 processor.

```JS
// Syntax
misty.EnableAudioService([int prePauseMs], [int postPauseMs]);
```

For more information about disabling and enabling the audio service, see the [`DisableAudioService`](./#misty-disableaudioservice) command description.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableCameraService

Enables the camera service running on Misty's 820 processor.

```JS
// Syntax
misty.EnableCameraService([int prePauseMs], [int postPauseMs]);
```

For more information about disabling and enabling the camera service, see the [`DisableCameraService`](./#misty-disablecameraservice) command description.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableSlamService

Enables the SLAM service running on Misty's 820 processor.

```JS
// Syntax
misty.EnableSlamService([int prePauseMs], [int postPauseMs]);
```

For more information about disabling and enabling the SLAM service, see the [`DisableSlamService`](./#misty-disableslamservice) command description.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.ForgetWifi

Deletes information about a Wi-Fi network from Misty’s list of saved networks. If you call this method without any arguments, Misty deletes information for all of her saved networks.

```JavaScript
// Syntax
misty.ForgetWifi(string networkId, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkId (string) - Optional. The network to remove from Misty’s list of saved networks. If you call this method without any arguments, Misty deletes information for all of her saved networks.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ForgetWifi("MyHomeWifi")
```

### misty.GetAvailableWifiNetworks

Obtains a list of local WiFi networks and basic information regarding each.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).


```JavaScript
// Syntax
misty.GetAvailableWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetAvailableWifiNetworks();
```

Returns

* Result (array) - An array containing one element for each WiFi network discovered. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each element contains the following:
   * Name (string) - The name of the WiFi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns `true` if the network is secure. Otherwise, `false`.

### misty.GetBatteryLevel

Obtains Misty's current battery level, along with other information about the battery.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetBatteryLevel([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetBatteryLevel();
```

Returns

* Result (object) - An object with information about Misty's battery. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  * chargePercent (double) - Decimal value representing current charge percent.
  * created (string) - Timestamp that describes when the system created this message.
  * current (int) - The current flowing into or discharging from the battery. This value is negative when the battery is discharging, and positive when the battery is being charged.
  * expiry (string) - Timestamp describing the moment after which the values in this message should no longer be considered valid.
  * healthPercent (double)
  * isCharging (bool) - Returns `true` if the battery is charging. Otherwise, `false`.
  * sensorId (string) - The `sensorId` of the system component that returns the battery charge message (`charge`).
  * sensorName (string) - The `sensorName` of the system component that returns the battery charge message (`/Sensors/RTC/BatteryCharge`)
  * state (string) - The charge state of the battery. Possible values are:
    *  `Charging` (if battery is receiving current)
    *  `Discharging` (if battery is losing current)
    *  `Charged` (if battery is fully charged)
    *  `Unknown` (if you check the charge levels before Misty is fully booted, or if the RT board resets and the system has not yet learned the actual battery state)
    *  `Fault` (can occur if the charger does not detect the battery)
  * temperature (int)
  * trained (bool) - Returns `true` if the battery has been trained. Otherwise, `false`.
  * voltage (double) - The battery's voltage.

### misty.GetCameraData

Obtains current properties and settings for Misty's 4K camera.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore (in this case, `_GetCameraData()`). For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

{{box op="end"}}

```JavaScript
// Syntax
misty.GetCameraData([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetCameraData()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```js
// Example

// Requests camera data and passes it into _GetCameraDataCallback()
misty.GetCameraData("_GetCameraDataCallback");

// Handles response from GetCameraData command
function _GetCameraDataCallback(data) {
    // Log debug messages with values from GetCameraData response
    misty.Debug("width: " + data.Result.Width)
    misty.Debug("height: " + data.Result.Height)
    misty.Debug("fpsActual: " + data.Result.FpsActual)
    misty.Debug("fpsRequested: " + data.Result.FpsRequested)
    misty.Debug("droppedFrames: " + data.Result.DroppedFrames)
}
```

Return Values

* Result (object) - An object with details about the current properties and settings for Misty's 4K camera.  With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  * droppedFrames (int) - Number of dropped frames.
  * fpsActual (double) -  Actual frames per second.
  * fpsRequested (double) - Requested frames per second.
  * height (double) - Camera image height (in pixels).
  * width (double) - Camera image width (in pixels).

### misty.GetDeviceInformation

Obtains device-related information for the robot.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetDeviceInformation([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetDeviceInformation();
```

Returns

* Result (object) - An object containing information about the robot, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
   * androidHardwareId - The identification string for the Android hardware on this device.
   * androidOSVersion - A string that identifies the version of Android installed on this robot. Includes labels for any applied scripts and patches.
   * batteryLevel - An object with details about Misty's battery level. Includes the same key/value pairs as the [`GetBatteryLevel` response](https://docs.mistyrobotics.com/misty-ii/rest-api/api-reference/#getbatterylevel).
   * currentProfileName - The name of the network that the robot is on.
   * hardwareInfo - An object with hardware and firmware version information for Misty's Real Time Controller (RTC) board and Motor Controller (MC) board.
   * ipAddress - The IP address of the robot.
   * networkConnectivity - The status of the robot's network connection. Possible values are Unknown, None, LocalAccess, LimitedInternetAccess, InternetAccess.
   * occipitalDeviceInfo - An object with driver, firmware, and serial information for the robot's Occipital Structure Core depth sensor.
   * outputCapabilities - An array listing the output capabilities for this robot.
   * robotId - The robot's unique ID, if set. Default value is all zeros.
   * robotVersion - The version number for the HomeRobot app running on the robot.
   * sensorCapabilities - An array listing the sensor capabilities for this robot.
   * sensoryServiceAppVersion - The version number for the Sensory Service app running on the robot.
   * serialNumber - The unique serial number for the robot.
   * windowsOSVersion - The version of Windows IoT Core running on the robot.

### misty.GetHelp
Obtains information about a specified API command. Calling `misty.GetHelp()` with no parameters returns a list of all the API commands that are available.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetHelp([string endpointName], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* endpointName (string) - Optional. A command in `"Api.<COMMAND>"` format eg: `"Api.GetAudioList"`. If no command name is specified, calling `misty.GetHelp()` returns a list of all  API commands.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetHelp();
```

Returns

* Result (string) - A string containing the requested help information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetLogFile

Obtains log file data.

Pulls up to 3MB of the most recent log data from log files up to 14 days old. Log data returns in ascending order by date and time. If all log data exceeds 3MB, the oldest entry returned may be truncated.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty stores log files only for the most recent 14 day period. Log files from before this period are automatically cleared from the robot's local storage.
{{box op="end"}}

With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetLogFile()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetLogFile([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, results are passed into the default `_GetLogFile()` callback function.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetLogFile();

// Callback function to handle result
function _GetLogFile(data) {
    misty.Debug(JSON.stringify(data.Result));
};
```

Returns

* Result (string) - Compiled log file data. Returns an error message if no log data is found. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetLogLevel

Obtains the current local and remote log level.


```JavaScript
// Syntax
misty.GetLogLevel([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```


These log levels determine where the system writes different types of messages. Misty can write messages to her local log file and to a remote log file on a server owned by Misty Robotics. See the tables below for information about how the log level determines where different message types are published.

If the log level is set to `Debug`:

| Message Type: | Local Logs | Remote Logs |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |


If the log level is set to `Info`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:------------:|:-------------:|
| Debug  |          |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |

 If the log level is set to `Warn`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:------------:|:-------------:|
| Debug  |          |             |
| Info   |          |              |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |

 If the log level is set to `Error`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:-----------:|:------------:|
| Debug  |          |              |
| Info   |          |              |
| Warn   |          |              |
| Error  |    &#x2713;      |&#x2713;             |


**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetLogLevel()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks). 
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetLogLevel();
```

Returns

* result (string) - A an object with values indicating the current remote and local log levels. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  *  `local` (string) - The current local log level.
  *  `remote` (string) - The current remote log level.

### misty.GetRobotUpdateSettings

Obtains the robot's update settings and a timestamp for the last update attempt.

```JavaScript
// Syntax
misty.GetRobotUpdateSettings([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetRobotUpdateSettings()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetRobotUpdateSettings()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Result - An object with the following key/value pairs. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * allowRobotUpdates (bool) - Indicates whether Misty is currently set to prevent or allow automatic system updates.
  * lastUpdateAttempt (string) - Timestamp for the last update attempt.

### misty.GetSavedWifiNetworks

Obtains Misty's list of saved network IDs.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSavedWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetSavedWifiNetworks()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetSavedWifiNetworks();

// When data is ready, send it to debug listeners
function _GetSavedWifiNetworks(data) {
   misty.Debug(JSON.stringify(data));
};
```

Returns

* Result - An array of objects with data about Misty's saved Wi-Fi networks. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

Example JSON object for a saved WiFi network:

```JSON
{
   "bssid": null,
   "detailedState": null,
   "frequency": 0,
   "hidden": false,
   "ipAddress": null,
   "linkSpeed": 0,
   "networkId": 0,
   "physicalAddress": null,
   "ssid": "\"NetworkID\"",
   "status": "Unknown",
   "supplicantState": null
}
```

### misty.GetWebsocketNames

Obtains information about a specified WebSocket class. Calling `misty.GetWebsocketNames()` without specifying a class returns information about all of Misty’s available WebSocket connections.

**Note:** For more detailed information about each of Misty’s WebSocket connections, see [Event Types](../../../misty-ii/robot/sensor-data/).

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSavedWifiNetworks([string websocketClass], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Parameters

* websocketClass (string) - Optional. Specifies the WebSocket class to obtain information about. To recieve information about all of Misty's available WebSocket connections, pass an empty string.
* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetWebsocketNames()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetWebsocketNames("");

// When data is ready, send it to debug listeners
function _GetWebsocketNames(data) {
   misty.Debug(JSON.stringify(data));
};
```

Returns

* result (array) - An array of data objects with information about the WebSocket connections to which you can subscribe. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. The data object for each WebSocket class includes the following information:
  * class (string) - The name of a given WebSocket class.
  * nestedProperties (array) - A list of properties for a given WebSocket class. Use these properties to declare conditions for events you want to receive information about when subscribing to messages from a WebSocket data stream.

### misty.PreventRobotUpdates

Changes the robot's settings to prevent Misty II from automatically installing system updates. To re-enable system updates, you must issue an `AllowRobotUpdates` command.

```js
// Example
misty.PreventRobotUpdates([int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed warningBox"}}
**Important:** Prevent Misty from automatically installing system updates at your own risk. 

Misty’s system updates include significant feature improvements and address performance, reliability, and security issues. The Misty Robotics organization provides customer support for the **current release only**. If you must prevent Misty from taking system updates, we recommend re-enabling updates at the earliest possible convenience.

You may choose to temporarily prevent system updates when a release includes breaking API changes that you have not had time to update in the skills and robot applications you are using in production, or when you plan to use Misty in a setting where downloading and installing a system update may be disruptive. We do not recommend preventing system updates as a long-term solution for your skills and robot applications.

When you are troubleshooting issues with your skills and applications, always make sure the current software and firmware is installed on your robot. You can find the current software and firmware versions on the [System Updates](../../../misty-ii/robot/system-updates) page in Misty’s developer documentation.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.RestartRobot

Restarts Misty's 410 or 820 processor.

```JS
misty.RestartRobot([bool core], [bool sensoryServices], [int prePauseMs], [int postPauseMs]);
```

Arguments

* core (boolean): If `true`, restarts Misty's 410 processor.
* sensoryServices (boolean): If `true`, restarts Misty's 820 processor.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JS
misty.RestartRobot(false, true);
```

### misty.SetDefaultVolume

Sets the default loudness of Misty's speakers for audio playback.

```JavaScript
// Syntax
misty.SetDefaultVolume(int volume, [int prePauseMs], [int postPauseMs]);
```

Arguments

* volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetDefaultVolume(100);
```

### misty.SetLogLevel

Sets Misty's local and remote logging level. Use this to determine which messages the system writes to the local log file and to the remote logging database owned by Misty Robotics. The purpose of collecting this data remotely is to service debugging by Misty's engineering and support teams.

Each message in Misty's local log file is labeled as `DBG` (Debug), `INF` (Info), `WRN` (Warn), or `ERR` (Error). For a brief description of the information associated with each message type, see the following list:

* **Debug** messages include information the system writes to assist with systems and skill debugging. Debug messages can provide details about the WebSocket connections Misty establishes, events she triggers, skills she runs or cancels, and internal services she starts or stops. Debug-type messages are flagged in Misty's local log file with the `DBG` label.
* **Info** messages include system-defined routine application runtime information. They can also include details about the commands Misty executes, values from event messages, and information about Misty's network environment (like her current IP address). In Misty's local log file, Info-type messages are prefaced with the `INF` label. **Note:** In the current version of Misty's software, the system logs the occurrence of a command and whether it has been successful. It does not log such details as the parameters passed into the command, or the data returned in response messages for those commands. In earlier software versions, Misty published more details about command usage to her remote logs. To avoid logging details about parameters passed into a command or the data in the command's response, make sure you have the [most recent version of Misty's software](../../../misty-ii/robot/system-updates/#release-history) installed.
* **Warn** messages include details about issues the system is able to recover from on its own, without requiring user intervention. In Misty's local log file, Warn-type messages are flagged with the `WRN` label.
* **Error** messages include information the system writes when it encounters an issue that it cannot recover from or handle gracefully. They may also include an exception message. In Misty's local log file, Error-type messages are flagged with the `ERR` label.

Each logged statement includes a timestamp, a flag indicating the level of the message, the serial number for the robot that created the statement, and a label indicating which part of the system sent the message. In addition to these details, the system always logs the following information remotely for each log message, regardless of the log level you set:
* Product SKU
* Robot serial number (unique for each Misty II robot)
* The robot's "friendly name"
* Version details about the software and firmware installed on the robot

You can use the following options to set Misty's log level: `Debug`, `Info`, `Warn`, `Error`, or `None`. Note that Misty does not log Debug-type messages remotely. Setting the remote log level to Debug or Info is effectively the same.

If the log level is set to `Debug`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |

If the log level is set to `Info`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:------------:|:-------------:|
| Debug  |          |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |

 If the log level is set to `Warn`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:------------:|:-------------:|
| Debug  |          |             |
| Info   |          |              |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |

 If the log level is set to `Error`:

|    Message Type:    | Local Logs    | Remote Logs    |
|--------|:-----------:|:------------:|
| Debug  |          |              |
| Info   |          |              |
| Warn   |          |              |
| Error  |    &#x2713;      |&#x2713;             |

```JavaScript
// Syntax
misty.SetLogLevel(string localLogLevel, string remoteLogLevel, [int prePauseMs], [int postPauseMs]);
```

Arguments
* localLogLevel (string) - The level to set for Misty's local logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.
* remoteLogLevel (string) - The level to set for Misty's remote logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetLogLevel("Debug", "Info");
```

### misty.SetNetworkConnection

Connects Misty to a specified Wi-Fi source.

```JavaScript
// Syntax
misty.SetNetworkConnection(string networkName, string password, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkName (string) - The Wi-Fi network name (SSID).
* password (string) - The Wi-Fi network password.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetNetworkConnection("myWiFiNetwork", "myWiFiPassword")
```

### misty.SetNotificationSettings

Changes the settings for Misty's default hardware notifications.

```JavaScript
// Syntax
misty.SetNotificationSettings([bool revertToDefault], [bool LEDEnabled], [bool keyPhraseEnabled], [string keyPhraseFile], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Misty's default hardware notification settings are as follows:

**Audio Notifications**
* **Wake Word** - When Misty recognizes the "Hey, Misty!" key phrase, she plays the system audio file `s_SystemWakeWord.wav`

**LED Notifications**
* **Recording Audio** - While Misty is recording audio or listening for the "Hey, Misty!" key phrase, her chest LED pulses blue.
* **Charging** - While Misty is powered on and charging, her chest LED pulses orange. When her battery is fully charged and she is on/connected to her charger, the LED turns solid orange.
* **Face Training** - When you are training Misty on a new face, her chest LED displays the following notifications:
  * When the face detection phase of the training process is complete, the LED turns green.
  * When training is complete, the LED blinks green three times.
  * When training fails, the LED blinks red three times.
  * When Misty sees more than one face, the LED blinks yellow three times.
  * When Misty doesn't see a face, the LED turns yellow.
* **System Updates** - While Misty is performing a system update, the LED blinks white.

Arguments

* revertToDefault (bool) - Optional. Sets Misty's hardware notifications to the default settings (`true`).
* ledEnabled (bool) - Optional. Enables (`true`) or disables (`false`) the default LED notifications.
* keyPhraseEnabled (bool) - Optional. Enables (`true`) or disables (`false`) the wake word audio notification.
* keyPhraseFile (string) - Optional. The filename of an audio file on Misty's system that the robot should play for wake word notifications.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.SlamServiceEnabled

Describes whether the SLAM service running on Misty's 820 processor is currently enabled.

```JavaScript
// Syntax
misty.SlamServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_SlamServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).

For more information about enabling and disabling the SLAM service, see the [`DisableSlamService`](./#misty-disableslamservice) command description.

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SlamServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example

misty.SlamServiceEnabled();

function _SlamServiceEnabled(data) {
    misty.Debug(data.Result)
}
```

Returns

* Result (boolean) - Returns `true` if the SLAM service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.


### misty.StartWifiHotspot

Starts Misty II broadcasting its own wireless network.

```js
// Syntax
misty.StartWifiHotspot([int prePauseMs], [int postPauseMs]);
```

This command lets you use Misty II as a soft access point, which is useful in environments with no local networks, or networks that Misty can't connect to (such as captive networks).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Follow these steps to use Misty as a WiFi hotspot:

1. Boot up the robot.
2. Issue a `StartWifiHotspot` command.
3. Issue a [`GetDeviceInformation`](./#misty-getdeviceinformation) command to access the network ID and password for Misty's access point. In the `GetDeviceInformation` response data, the network ID is stored in the `currentProfileName` field, and the password is stored in the `currentPreSharedKey` field. Use these credentials to connect your computer or another WiFi enabled device to Misty's access point.
4. Use Misty's standard IP address - `192.168.43.1` - to connect to the robot and issue commands from your connected device.
5. When you are finished using Misty as an access point, issue a `StopWifiHotspot` command.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** If you plan to use Misty as a hotspot in an environment where you are unable to connect to any wireless networks, you may consider writing a JavaScript or .NET skill that runs on startup to issue the commands that create the access point. You can code Misty to display the credentials for the access point on her screen, or even to speak them out loud. Otherwise you must find a way to issue the commands to start broadcasting WiFi over a separate network connection.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StopWifiHotspot

Stops Misty II broadcasting its own wireless network.

```JS
// Syntax
misty.StopWifiHotspot([int prePauseMs], [int postPauseMs]);
```

To enable Misty as a soft access point, follow the steps in the documentation for the [`StartWifiHotspot`](./#misty-startwifihotspot) command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used

### misty.ConvertIntentToCommand

Translates a given string and set of arguments to invoke a command from Misty's API.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

```JavaScript
// Syntax
misty.ConvertIntentToCommand(string command, [string argument]...);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** As an alpha feature, the `misty.ConvertIntentToCommand()` method is in active development, and it may not always produce the expected result. You can expect this method to be modified and improved with future updates to Misty's software.
{{box op="end"}}

Arguments:

* command (string) - A string that matches the internal name of a command from Misty's API. **Note:** The `misty.ConvertIntentToCommand()` method currently expects the value passed in for the the `command` argument to match an internal name that Misty uses to recognize and execute the command. Sometimes these internal command names differ from the method names used in Misty's JavaScript API. For example, calling the `misty.DisplayImage()` method in Misty's JavaScript API invokes the the command known internally as `ChangeDisplayImage`. You can find the internal names of Misty's commands by issuing a GET request to the `GetHelp` endpoint (`<robot-ip-address>/api/help`) and checking the values for the `id` keys in the response object.
* argument - (string) - One or more unique strings that hold the value for arguments to pass into the given `command`. 

When passing in values for more than one argument, you must pass in the value for each argument as a unique string. As an example, the following invokes Misty's `ChangeLED` command with unique values for the `red`, `green`, and `blue` arguments to change Misty's chest LED color.

```JavaScript
// Invokes the ChangeLED command
misty.ConvertIntentToCommand("ChangeLED", "0", "255", "0");
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** The `misty.ConvertIntentToCommand()` method simplifies the task of coding Misty to respond when you issue a voice command to invoke a command from her API. When you use Misty's [`StartKeyPhraseRecognition`](../../../misty-ii/rest-api/api-reference/#startkeyphraserecognition) command and register for [`KeyPhraseRecognized`](../../../misty-ii/robot/sensor-data/#keyphraserecognized) events, you can code Misty to start recording audio inside the `KeyPhraseRecognized` callback. You can then send this recorded audio off for processing by a third party service like [Dialogflow](https://dialogflow.com/) that's configured to identify the intent of a speaker from a given speech recording. Pass this intent (and any additional arguments that you parse out in your skill code) into your `misty.ConvertIntentToCommand()` method to have Misty execute the matching command.
{{box op="end"}}