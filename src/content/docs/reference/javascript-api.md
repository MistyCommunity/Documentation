---
title: On-Robot JavaScript API
layout: coding.hbs
columns: three
order: 1
---

# {{title}}

Use Misty's on-robot JavaScript API to write skills that run locally on your robot. To learn about the architecture of this API, see [On-Robot JavaScript API Architecture](../../../docs/skills/local-skill-architecture).

**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.

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

### misty.GetAudioList

Lists all audio files (default system files and user-added files) currently stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

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

* Result (array) - Returns an array of audio file information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### misty.GetImage
Obtains a system or user-uploaded image file currently stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

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
misty.GetImage("Angry.png", true);
```

### misty.GetImageList
Obtains a list of the images stored on Misty.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

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

* Result (array) - Returns an array containing one element for each image currently stored on Misty. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each element in the array contains the following:
   * Height (integer) - The height of the image file.
   * Name (string) - The name of the image file.
   * Width (integer) - The width of the image file.
   * UserAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### misty.SaveAudio
Saves an audio file to Misty. Maximum size is 3 MB.

```JavaScript
// Syntax
misty.SaveAudio(string fileName, string dataAsByteArrayString, [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs])
```

Arguments
* fileName (string) - The name of the audio file. This command accepts all audio format types, however Misty currently cannot play OGG files.
* dataAsByteArrayString (string) - The audio data, passed as a string containing a byte array.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the audio file, while a value of `false` tells Misty not to play the file.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the file should not overwrite any existing files on Misty.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SaveAudio("Filename.wav", "137,80,78,71,13,1...", false, false);
```


### misty.SaveImage
Saves an image to Misty in the form of a byte array string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, and .png. Maximum file size is 3 MB. **Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

```JavaScript
// Syntax
misty.SaveImage(string fileName, string dataAsByteArrayString, [int width], [int height], [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs]
```

Arguments
* fileName (string) - The name of the image file to save.
* dataAsByteArrayString (string) - The image data, passed as a string containing a byte array.
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

### misty.WriteSerial

**Available for Misty II Only**

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

Note that Misty can also receive data a connected device sends to the UART serial port. To use this data you must subscribe to [`SerialMessage`](../../../docs/reference/sensor-data/#serialmessage) events.

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

### misty.AddPropertyTest - ALPHA
Creates a property comparison test to specify which data the system sends for a registered event. Use property tests to filter unwanted data out of event messages.


```JavaScript
// Syntax
misty.AddPropertyTest(string eventName, string property, string inequality, string valueAsString, string valueType, [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - The name of the event to create a property comparison test for.
* property (string) - The property of the event to compare. For the full list of properties for each event, see [Sensor & Skill Data Types](../../../docs/reference/sensor-data/).
* inequality (string) - The comparison operator to use in the property comparison test, passed as a string. Accepts `"=>"`, `"=="`, `"!=="`, `">"`, `"<"`, `">="`, `"<="`, `"exists"`, `"empty"`, or `"delta"`.
* valueAsString (string) - The value of the property to compare against, passed as a string. For the full list of values for each event property, see [Sensor & Skill Data Types](../../../docs/reference/sensor-data).
* valueType (string) - The type of the value specified in `"valueAsString"`. Accepts `"double"`, `"float"`, `"integer"`, "`string"`, `"datetime"`, or "`boolean`"
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.AddPropertyTest("EventName", "SensorPosition", "==", "Back", "string");
```

### misty.AddReturnProperty - ALPHA
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


### misty.RegisterEvent - ALPHA
Register to receive messages with live event data from one of Misty's sensors. 

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Sensor Event Callbacks](../../../docs/skills/local-skill-architecture/#sensor-event-callbacks).

```JavaScript
// Syntax
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed [here](../../../docs/reference/sensor-data).
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

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../../../docs/skills/local-skill-architecture/#sensor-event-callbacks).

### misty.RegisterSimpleEvent - ALPHA

Registers for an event and applies a filter to event messages. Events you register for with the `misty.RegisterSimpleEvent()` command only return messages for events that pass the property comparison test you specify in the command's arguments.

```JavaScript
// Syntax
misty.RegisterSimpleEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string property], [string inequality], [string valueAsString], [string valueType], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed [here](../../../docs/reference/sensor-data).
* debounce (integer) - Sets the frequency in milliseconds with which event data is sent. 
* keepAlive (boolean) - Optional. Pass `true` to keep the callback function registered to the event after the callback function is triggered. By default, when an event callback is triggered, the event unregisters the callback to prevent more commands from overriding the initial call. 
* property (string) - The property of the event to compare. For the full list of properties for each event, see [Sensor & Skill Data Types](../../../docs/reference/sensor-data/).
* inequality (string) - The comparison operator to use in the property comparison test, passed as a string. Accepts `"=>"`, `"=="`, `"!=="`, `">"`, `"<"`, `">="`, `"<="`, `"exists"`, `"empty"`, or `"delta"`.
* valueAsString (string) - The value of the property to compare against, passed as a string. For the full list of values for each event property, see [Sensor & Skill Data Types](../../../docs/reference/sensor-data).
* valueType (string) - The type of the value specified in `"valueAsString"`. Accepts `"double"`, `"float"`, `"integer"`, "`string"`, `"datetime"`, or "`boolean`"
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../../../docs/skills/local-skill-architecture/#sensor-event-callbacks).


### misty.RegisterTimerEvent - ALPHA
Creates an event that calls a callback function after a specified period of time. For an example of using this function, see the [Timer Event tutorial](../../../docs/skills/local-skill-tutorials/#timer-events).

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../docs/skills/local-skill-architecture/#timed-or-triggered-event-callbacks).

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

* Data sent by the timed event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../../../docs/skills/local-skill-architecture/#timed-or-triggered-event-callbacks).

### misty.RegisterUserEvent - ALPHA
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

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../docs/skills/local-skill-architecture/#timed-or-triggered-event-callbacks).

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

* Data sent by the user event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../../../docs/skills/local-skill-architecture/#timed-or-triggered-event-callbacks).

### misty.UnregisterAllEvents - ALPHA
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

### misty.UnregisterEvent - ALPHA
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
Displays an image on Misty's screen. Optionally, `misty.DisplayImage()` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. You can use the [`SaveImage`](../../../docs/reference/rest/#saveimage-byte-array-string-) command in Misty's REST API to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

```JavaScript
// Syntax
misty.DisplayImage(string fileName, [double timeoutSeconds], [double alpha], [int prePauseMs], [int postPauseMs])
```

Arguments

* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* timeoutSeconds (double) - Optional. The length of time to display the specified image. 
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePauseMsMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.DisplayImage("Happy.png");
```

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
misty.PlayAudio("Play.wav", 100);
```

### misty.SetFlashlight

**Available for Misty II Only**

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

### misty.SendExternalRequest (Misty I) - ALPHA

Sends an HTTP request from Misty to an external server. You use `misty.SendExternalRequest()` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

**Note:** In most cases, the external server's response to requests sent from the robot must be passed into a callback function to be processed and made available for use in your skills. By default, the callback function for this command is given the same name as the command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by `misty.SendExternalRequest()`, see the [External Requests](../../../docs/skills/local-skill-tutorials/#external-requests) tutorial.

```JavaScript
// Syntax
misty.SendExternalRequest(string method, string resource, string authorizationType, string token, string returnType, string arguments, bool save, bool applyAssetAfterSaving, string fileName, [string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* resourceURL (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* authorizationType (string) - The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* token (string) - The authentication credentials required to access the resource. Use `null` if no credentials are required.
* arguments (string) - The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* returnType (string) - The [Multipurpose Internet Mail Extension (MIME)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type indicating the nature and format of the expected response, i.e. `text/plain`.
* save (bool) - If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* apply (bool) - A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* fileName (string) - The name to give the saved file, including the appropriate file type extension.
* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SendExternalRequest()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Data (object) - An object containing the external server's response to the request. In most cases, data returned by the `misty.SendExternalRequest()` command must be passed into a callback function to be processed and made available for use in your skills. See the [External Requests](../../../docs/skills/local-skill-tutorials/#external-requests) tutorial for more information.

### misty.SendExternalRequest (Misty II) - ALPHA

Sends an HTTP request from Misty to an external server. You use `misty.SendExternalRequest()` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

**Note:** In most cases, the external server's response to requests sent from the robot must be passed into a callback function to be processed and made available for use in your skills. By default, the callback function for this command is given the same name as the command, prefixed with an underscore: `_SendExternalRequest()`. For more on handling data returned by `misty.SendExternalRequest()`, see the [External Requests](../../../docs/skills/local-skill-tutorials/#external-requests) tutorial.

```JavaScript
// Syntax
misty.SendExternalRequest(string method, string resourceURL, [string authorizationType], [string token], [string arguments], [bool save], [bool apply], [string fileName], [string callback], [string callbackRule], [string skillToCal], [int prePauseMs], [int postPauseMs]);
```

Arguments
* method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* resource (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* authorizationType (string) - Optional. The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* token (string) - Optional. The authentication credentials required to access the resource. Use `null` if no credentials are required.
* arguments (string) - Optional. The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* save (bool) - Optional. If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* apply (bool) - Optional. A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* fileName (string) - Optional. The name to give the saved file, including the appropriate file type extension.
* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SendExternalRequest()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Data (object) - An object containing the external server's response to the request. In most cases, data returned by the `misty.SendExternalRequest()` command must be passed into a callback function to be processed and made available for use in your skills. See the [External Requests](../../../docs/skills/local-skill-tutorials/#external-requests) tutorial for more information.

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

Stops all motor controllers, including drive motor, head/neck, and arm (for Misty II).

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


### misty.MoveArmPosition

**Available for Misty II Only**

Moves one of Misty's arms to a specified position.

```JavaScript
// Syntax
misty.MoveArmPosition(string arm, double position, double velocity, [int prePauseMs], [int postPauseMs])
```

Arguments
* arm (string) - The arm to move. Pass `"left"` or `"right"`.
* position (double) - The position to move the arm to. Value range: 0 - 10.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveArmPosition("left", 0, 10);
```

### misty.MoveArmDegrees

**Available for Misty II Only**

Moves one of Misty's arms to a specified location in degrees.

```JavaScript
// Syntax
misty.MoveArmDegrees(string arm, double degrees, double velocity, [int prePauseMs], [int postPauseMs])
```

Arguments
* arm (string) - The arm to move. Pass `"left"` or `"right"`.
* degrees (double) - The location in degrees to move the arm to. Value range: 0 to -180.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveArmDegrees("right", -90, 50);
```

### misty.MoveArmRadians

**Available for Misty II Only**

Moves one of Misty's arms to a specified location in radians.

```JavaScript
// Syntax
misty.MoveArmRadians(string arm, double radians, double velocity, [int prePauseMs], [int postPauseMs])
```

Arguments
* arm (string) - The arm to move. Pass `"left"` or `"right"`.
* radians (double) - The location in radians to move the arm to. Value range: 0 to -3.14.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used. 

```JavaScript
// Example
misty.MoveArmRadians("left", -1.5708, 50);
```

### misty.MoveHeadDegrees
Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `misty.MoveHeadDegrees()` command can only control the up-down movement of Misty's head.

```JavaScript
// Syntax
misty.MoveHeadDegrees(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments

* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from approximately -9.5 (fully up) to 34.9 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value specifying the tilt ("ear" to "shoulder") of Misty’s head. Misty’s head tilts to the left or right. Values range from -43.0 (fully left) to 43.0 (fully right). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveHeadDegrees(10, 10, 10, 100);
```

### misty.MoveHeadPosition

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `misty.MoveHeadPosition()` command can only control the up-down movement of Misty's head.

```JavaScript
// Syntax
misty.MoveHeadPosition(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments

* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from -5 (fully up) to 5 (fully down).
* roll (double) - A value specifying the tilt ("ear" to "shoulder") of Misty’s head. Values range from -5 (head tilted fully to the left shoulder) to 5 (head fully to the right shoulder). This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -5 (fully right) to 5 (fully left). This value is ignored for Misty I.
* velocity (double) - A value from 0 to 100 specifying the speed at which Misty moves her head.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveHeadPosition(0, 0, 0, 100);
```

### misty.MoveHeadRadians

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `MoveHeadPosition` command can only control the up-down movement of Misty's head.

```JavaScript
// Syntax
misty.MoveHeadRadians(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments

* pitch (double) - A value in radians specifying the position of Misty’s head along the up-down axis. Values range from -0.1662 (fully up) to 0.6094 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value in radians specifying the tilt ("ear" to "shoulder") of Misty’s head. Values range from -0.75 (head tilted fully to the left shoulder) to 0.75 (head fully to the right shoulder). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value in radians specifying the turn to the left or right of Misty’s head. Values range from -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
 This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.MoveHeadRadians(0.5708, 0.5708, 1.5708, 100);
```

### misty.SetHeadDegrees

Moves Misty’s head to a given degree along one of three axes (tilt, turn, or up-and-down).

```JavaScript
// Syntax
misty.SetHeadDegrees(string axis, double degrees, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments
* axis (string) - The axis to change. Values are `"yaw"` (turn), `"pitch"` (up-and-down), or `"roll"` (tilt). Passing a value of `"yaw"` or `"roll"` in a skill running on Misty I robots does nothing.  
* degrees (double) - Indicates the degree to move Misty’s head to along the given axis. The value range for pitch is -9.5 (fully up) to 35.0 (fully down); for roll, -43.0 (fully left) to 43.0 (fully right); for yaw, -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. 
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetHeadDegrees("yaw", 90, 100);
```

### misty.SetHeadRadians

Moves Misty’s head to a given radian along one of three axes (tilt, turn, or up-and-down).

```JavaScript
// Syntax
misty.SetHeadRadians(string axis, double position, double velocity, [int prePauseMs], [int postPauseMs]);
```

Arguments
* axis (string) - The axis to change. Values are `"yaw"` (turn), `"pitch"` (up-and-down), or `"roll"` (tilt). Passing a value of `"yaw"` or `"roll"` in a skill running on Misty I robots does nothing.
* position (double) - Indicates the radian to move Misty’s head to along the given axis. The value range for pitch is -0.1662 (fully up) to 0.6094 (fully down); for roll, -0.75 (fully left) to 0.75 (fully right); for yaw, -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetHeadRadians("yaw", 1.5708, 0);
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

### misty.DriveArc - ALPHA

**Available for Misty II Only**

Drives Misty in an arc. Misty continues driving until her current heading matches the desired absolute heading passed into this command.

Misty's velocity is equal to:

`((desired_heading - current_heading) * (π/180) * radius) / (timeMs/1000)`.

Misty's maximum angular velocity will not exceed 45 degrees per second, and her maximum linear velocity will not exceed 1 meter per second.

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../docs/reference/sensor-data/#imu) named object.

```JavaScript
// Syntax
misty.DriveArc(double heading, double radius, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
```

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

### misty.DriveHeading - ALPHA

**Available for Misty II Only**

Drives Misty forward or backward in a straight line. While driving, Misty continuously adjusts her current heading to maintain the desired absolute heading.

For a smooth driving experience, Misty's current heading should be within two degrees of the desired absolute heading before she executes the `misty.DriveHeading()` command. A variation of greater than two degrees results in large correction velocities. You can use the `misty.DriveArc()` command to face Misty in the direction of the heading you want her to maintain. Then, use the `misty.DriveHeading()` command to drive Misty forward or backward in a straight line.

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../docs/reference/sensor-data/#imu) named object.

**Note:** Misty's velocity is equal to `distance / (timeMs/1000)`. Misty's maximum angular velocity will not exceed 45 degrees per second, and her maximum linear velocity will not exceed 1 meter per second.

```JavaScript
// Syntax
misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
```

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

## Navigation

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [Command Center](../../../docs/apps/command-center/#navigation-alpha).

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

### misty.StartSlamStreaming
Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `misty.StopSlamStreaming()` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Calling `misty.StopSlamStreaming()` turns off the laser in the depth sensor and lowers Misty's power consumption. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

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

### misty.TakeDepthPicture
Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of "unknown" values in the form of `NaN` ("not a number") values.

**Note:** Make sure to use `misty.StartSlamStreaming()` to open the data stream from Misty's depth sensor before using this command. Mapping or tracking does not need to be active to use this command.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakeDepthPicture([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakeDepthPicture();
```

Returns

- Result (object) - An object containing depth information about the image matrix, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - height (integer) - The height of the matrix.
  - image (array) - A matrix of size `height` x `width` containing individual values of type float. Each value is the distance in millimeters from the sensor for each pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. Note that as the robot moves further away from a scene being viewed, each pixel value will represent a larger surface area. Conversely, if it moves closer, each pixel value will represent a smaller area.
  - width (integer) - The width of the matrix.

### misty.TakeFisheyePicture
Takes a photo using the camera on Misty’s Occipital Structure Core depth sensor.

**Note:** Make sure to use `misty.StartSlamStreaming()` to open the data stream from Misty's depth sensor before using this command. Mapping or tracking does not need to be active to use this command.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakeFisheyePicture([bool base64 = true], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments
* base64 (boolean) - Optional. Sending a request with `true` returns the image data as a Base64 string. Defaults to `true`. **Note:** Images generated by this command are not saved in Misty's memory. To save an image to your robot for later use, pass `true` for Base64 to obtain the image data, then pass the returned image data to `misty.SaveImage()`.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakeFisheyePicture(true);
```

Returns

- Result (object) -  An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the picture in pixels.
  - name (string) - The name of the picture.
  - width (integer) - The width of the picture in pixels.


<!-- misty.FollowPath - ALPHA -->
### misty.FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path. Misty will not be able to successfully follow a path if unmapped obstacles are in her way.

**Important!** Make sure to call `misty.StartTracking()` to start Misty tracking her location before using this command, and call `misty.StopTracking()` to stop Misty tracking her location after using this command.

```JavaScript
// Syntax
misty.FollowPath(string path, [int prePauseMs], [int postPauseMs]);
```

Arguments
* path (list of sets of integers) - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `path` values from a map that Misty has previously generated.  **Note:** X values specify directions forward and backward. Sideways directions are specified by Y values.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.FollowPath("100:250,125:275...");
```

### misty.GetMap - ALPHA

Obtains occupancy grid data for the most recent map Misty has generated. 

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

**Note:** To obtain a valid response from `misty.GetMap()`, Misty must first have successfully generated a map. 

Misty’s maps are squares that are constructed around her initial physical location when she starts mapping. When a map is complete, it is a square with Misty’s starting point at the center.

The occupancy grid for the map is represented by a two-dimensional matrix. Each element in the occupancy grid represents an individual cell of space. The value of each element (0, 1, 2, or 3) indicates the nature of the space in those cells (respectively: "unknown", "open", "occupied", or "covered").

Each cell corresponds to a pair of X,Y coordinates that you can use with the `misty.FollowPath()`, `misty.DriveToLocation()`, and `misty.GetSlamPath()` commands. The first cell in the first array of the occupancy grid is the origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

```JavaScript
// Syntax
misty.GetMap([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetMap();
```

Returns

* Result (object) - An object containing the following key-value pairs. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * grid (array of arrays) - The occupancy grid for the most recent map Misty has generated, represented by a matrix of cells. The number of arrays is equal to the value of the `height` parameter. The number of cells is equal to the product of `height` x `width`. Each individual value (0, 1, 2, or 3) in the matrix represents a single cell of space. 0 indicates "unknown" space, 1 indicates "open" space, 2 indicates "occupied" space, and 3 indicates "covered" space. Each cell corresponds to an X,Y coordinate on the occupancy grid. The first cell in the first array is the X,Y origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. If no map is available, grid returns `null`.
  * height (integer) - The height of the occupancy grid matrix (in number of cells).
  * isValid (boolean) - Returns a value of `true` if the data returned represents a valid map. If no valid map data is available, returns a value of `false`.
  * metersPerCell (integer) - A value in square meters stating the size of each cell in the occupancy grid matrix.
  * originX (float) - The distance in meters from the X value of the occupancy grid origin (0,0) to the X coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to an X coordinate on the occupancy grid, use the formula 0 - (`originX` / `metersPerCell`). Round the result to the nearest whole number. 
  * originY (float) - The distance in meters from the Y value of the occupancy grid origin (0,0) to the Y coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to a Y coordinate on the occupancy grid, use the formula 0 - (`originY` / `metersPerCell`). Round the result to the nearest whole number. 
  * size (integer) - The total number of map cells represented in the grid array. Multiply this number by the value of meters per cell to calculate the area of the map in square meters.
  * width (integer) - The width of the occupancy grid matrix (in number of cells). 

### misty.GetSlamPath - ALPHA

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the `path` parameter of `misty.FollowPath()` for Misty to follow this path to the desired location.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

**Important!** Make sure to call `misty.StartTracking()` to start Misty tracking her location before using this command, and call `misty.StopTracking()` to stop Misty tracking her location after using this command.

```JavaScript
// Syntax
misty.GetSlamPath(double X, double Y, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* X (double) - The X coordinate of the destination.
* Y (double) - The Y coordinate of the destination.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetSlamPath(100, 250);
```

Returns

* Result (array) - An array containing integer pairs. Each pair specifies the X,Y coordinates for a waypoint on the path. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamStatus - ALPHA
Obtains values representing Misty's current activity and sensor status.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSlamStatus([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetSlamStatus();
```

Returns
* Result (object) - A data object with the following key-value pairs. **Note:** With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Status (integer) - An integer value where each bit is set to represent a different activity mode: 1 - Idle, 2 - Exploring, 3 - Tracking, 4 - Recording, 5 - Resetting. For example, if Misty is both exploring and recording, then bits 2 and 4 would be set => 0000 1010 => Status = 10.
  * SensorStatus (integer) - A number representing the status of Misty's sensors, using the `SlamSensorStatus` enumerable.
  * RunMode (integer) - A number representing the status of Misty's navigation.

```c#
public enum SlamSensorStatus
{
Uninitialized = 0,
Connected = 1,
Booting = 2,
Ready = 3,
Disconnected = 4,
Error = 5,
UsbError = 6,
LowPowerMode = 7,
RecoveryMode = 8,
ProdDataCorrupt = 9,
CalibrationMissingOrInvalid = 10,
FWVersionMismatch = 11,
FWUpdate = 12,
FWUpdateComplete = 13,
FWUpdateFailed = 14,
FWCorrupt = 15,
EndOfFile = 16,
UsbDriverNotInstalled = 17,
Streaming = 18
}
```

### misty.ResetSlam - ALPHA
Resets Misty's SLAM sensors.

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

### misty.StartMapping - ALPHA
Starts Misty mapping an area.

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

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

### misty.StartTracking - ALPHA
Starts Misty tracking her location.

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

### misty.StopMapping - ALPHA
Stops Misty mapping an area.

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

### misty.StopTracking - ALPHA
Stops Misty tracking her location.

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

## Perception

The following commands allow you to programmatically take pictures, record sounds or videos, and have misty detect and learn to recognize faces. 

Like most of us, Misty sees faces best in a well-lit area. If you want to directly experiment with face recognition commands, you can use the [Command Center](../../../docs/apps/command-center/#perception).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../skills/remote-command-architecture/#getting-data-from-misty) to her FaceRecognition [WebSocket](../../reference/sensor-data). To directly observe this data, you can use the [Command Center](../../../docs/apps/command-center/#opening-a-websocket).

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

### misty.ForgetAllFaces
Removes records of previously trained faces from Misty's memory.

```JavaScript
// Syntax
misty.ForgetAllFaces([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.ForgetAllFaces();
```

### misty.ForgetFace

Removes records of a specific trained face from Misty's memory.

```JavaScript
// Syntax
misty.ForgetFace(string FaceId, [int prePauseMs], [int postPauseMs]);
```

Arguments

* FaceId (string) - The name of the face to remove.

```JavaScript
// Example
misty.ForgetFace("John");
```

### misty.GetKnownFaces
Obtains a list of the names of faces on which Misty has been successfully trained.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetKnownFaces([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetKnownFaces();
```

Returns

* Result (string) - A list of the names for faces that Misty has been trained to recognize. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

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

### misty.StartRecordingAudio
Directs Misty to initiate an audio recording and save it with the specified file name. Misty records audio with a far-field microphone array and saves it as a byte array string. To stop recording, you must call the `misty.StopRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

```JavaScript
// Syntax
misty.StartRecordingAudio(string filename, [int prePauseMs], [int postPauseMs]);
```

Arguments
* fileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.StartRecordingAudio("RecordingExample.wav");
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

### misty.TakePicture

Takes a photo with Misty’s 4K camera.

**Note:** When you call the `misty.TakePicture()` command immediately after using the camera to record a video, there may be a few seconds delay before Misty takes the photograph.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.TakePicture([bool base64 = true], [string fileName], [int width], [int height], [bool displayOnScreen = false], [bool overwriteExisting = false], [string callback = _TakePicture()], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* base64 (boolean) - Optional. Passing in `true` returns the image data as a Base64 string. Defaults to `true`.
* fileName (string) - Optional. The filename to assign to the image file for the captured photo. Note that if you do not specify a filename, Misty does not save the photo to her local storage.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* displayOnScreen (boolean) - Optional. If `true` **and** a `fileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `fileName` value is provided, does nothing. Defaults to `false`.
* overwriteExisting (boolean) - Optional. Indicates whether Misty should overwrite an image with the same filename as the captured photo if one exists on her local storage. Passing in `true` overwrites a file with the same name. Passing in `false` prevents an existing file with the same name from being overwritten. In the case that `overwriteExisting` is set to `false` and a photo already exists with the same filename as the newly captured photo, the new photo is not saved to Misty. Defaults to `false`.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_TakePicture()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.TakePicture(false, "newImage", 1200, 1600, false, true);
```

Returns

* Result (object) - An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
   * Base64 (string) - A string containing the Base64-encoded image data.
   * Format (string) - The type and format of the image returned.
   * Height (integer) - The height of the image in pixels.
   * Name (string) - The name of the image.
   * Width (integer) - The width of the image in pixels.

### misty.StartRecordingVideo - BETA
Starts recording video with Misty's 4K Camera. Misty records videos in MP4 format at a resolution of 1080 × 1920 pixels.

Use `misty.StopRecordingVideo()` to stop recording a video. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call `misty.StopRecordingVideo()`.

Misty only saves the most recent video recording to her local storage. Recordings are saved with the filename `MistyVideo.mp4`, and this file is overwritten with each new recording. To download a video from your robot, use the [`GetRecordedVideo`](../../../docs/reference/rest/#getrecordedvideo-beta) REST command.

**Note:** When you call the `misty.StartRecordingVideo()` command immediately after using the RGB camera to take a picture, there may be a few seconds delay before Misty starts recording.

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

### misty.StopRecordingVideo - BETA

Stops recording video with Misty's 4K camera.

Use this command after calling `misty.StartRecordingVideo()`. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call this command. To download a video from your robot, use the [`GetRecordedVideo`](../../../docs/reference/rest/#getrecordedvideo-beta) REST command.

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

Returns

- Result (object) - An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the image in pixels.
  - name (string) - The name of the image.
  - width (integer) - The width of the image in pixels.


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

### misty.GetRunningSkills

Obtains a list of the skills currently running on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
//Syntax
misty.GetRunningSkills([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int PostPause])
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

* result (array) - A list of objects with meta information about the skills currently running on Misty. If no skills are currently running, this command returns an empty array. Note that in a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill (see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information). Each object in the list includes the following key-value pairs:
  * description (string) - The description of the skill as it appears in the skill's meta file.
  * name (string) - the name of the skill, as it appears in the skill's meta file.
  * startupArguments (object) - An object with key-value pairs for each startup argument in the skill's meta file.
  * uniqueId (string) - The unique id of the skill, from the skill's meta file.


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

### misty.Debug - ALPHA

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

### misty.Get - ALPHA

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




### misty.Keys - ALPHA

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

### misty.Pause - ALPHA
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

### misty.Publish - ALPHA

Writes data to the robot's internal log.

Note that `misty.Publish()` writes data to the robot's internal log file, even when called in a skill with the value of `WriteToLog` set to `False` in its meta file. You can use the Command Center to download your robot's log files, or send a GET request to the REST endpoint for the [`GetLogFile`](../../../docs/reference/rest/#getlogfile) command.

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

### misty.RandomPause - ALPHA
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


### misty.Remove - ALPHA

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

### misty.Set - ALPHA

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

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).


```JavaScript
// Syntax
misty.GetAvailableWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetAvailableWifiNetworks();
```

Returns

* Result (array) - An array containing one element for each WiFi network discovered. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each element contains the following:
   * Name (string) - The name of the WiFi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns `true` if the network is secure. Otherwise, `false`.

<!-- misty.GetBatteryLevel -->
### misty.GetBatteryLevel
Obtains Misty's current battery level, along with other information about the battery.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetBatteryLevel([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetBatteryLevel();
```

Returns

* Result (object) - An object with information about Misty's battery. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following properties:
  * capacitymAh (int)
  * chargePercent (double)
  * created (string)
  * currentmAh (int)
  * expiry (string)
  * isCharging (bool)
  * lastChargeCapacity (int)
  * maxMeasuredCapacity (int)
  * numberOfChargeCycles (int)
  * sensorId (string)
  * sensorName (string)
  * state (string)
  * temperature (int)
  * trained (bool)
  * voltage (double)

### misty.GetDeviceInformation
Obtains device-related information for the robot.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetDeviceInformation([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetDeviceInformation();
```

Returns

* Result (object) - An object containing information about the robot, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
   * batteryLevel - The battery charge percentage (in decimal format) and the current battery voltage.
   * currentProfileName - The name of the network that the robot is on.
   * hardwareInfo - Hardware and firmware version information for both the Real Time Controller board and the Motor Controller board. 
   * ipAddress - The IP address of the robot.
   * networkConnectivity - The status of the robot's network connection. Possible values are Unknown, None, LocalAccess, LimitedInternetAccess, InternetAccess.
   * outputCapabilities - An array listing the output capabilities for this robot.
   * robotId - The robot's unique ID, if set. Default value is all zeros.
   * robotVersion - The version number for the HomeRobot app running on the robot.
   * sensorCapabilities - An array listing the sensor capabilities for this robot.
   * sensoryServiceAppVersion - The version number for the Sensory Service app running on the robot.
   * serialNumber - The unique serial number for the robot.
   * windowsOSVersion - The version of Windows IoT Core running on the robot.

### misty.GetHelp
Obtains information about a specified API command. Calling `misty.GetHelp()` with no parameters returns a list of all the API commands that are available.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetHelp([string endpointName], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* endpointName (string) - Optional. A command in `"Api.<COMMAND>"` format eg: `"Api.GetAudioList"`. If no command name is specified, calling `misty.GetHelp()` returns a list of all  API commands.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetHelp();
```

Returns

* Result (string) - A string containing the requested help information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetLogFile

Obtains the robot's most recent log files. Note that log file data is stored for a maximum of 7 days.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetLogFile([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetLogFile();
```

Returns

* Result (list) - Compiled log file data. Returns an error message if no log data is found. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetLogLevel

Obtains Misty's current log level.

```JavaScript
// Syntax
misty.GetLogLevel([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Misty's log level determines where the system writes different types of messages. Misty can write messages to her local log file and to a remote log file on a server owned by Misty Robotics.

If Misty's log level is set to `Debug`:

| Message Type: | Logged Locally | Logged Remotely |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |


If Misty's log level is set to `Info`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |

 If Misty's log level is set to `Warn`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     |              |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |

 If Misty's log level is set to `Error`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:-----------:|:------------:|
| Debug  |    &#x2713;      |              |
| Info   |    &#x2713;      |              |
| Warn   |    &#x2713;      |              |
| Error  |    &#x2713;      |&#x2713;             |
| Remote |    &#x2713;      |&#x2713;             |

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetLogLevel()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks). 
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.GetLogLevel();
```

Returns

* level (string) - The current log level of the robot. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSavedWifiNetworks

Obtains Misty's list of saved network IDs.

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSavedWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Arguments

* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetSavedWifiNetworks()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
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

* Result - An array of objects with data about Misty's saved Wi-Fi networks. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

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

**Note:** For more detailed information about each of Misty’s WebSocket connections, see [Sensor & Skill Data Types](../../../docs/reference/sensor-data/).

**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).

```JavaScript
// Syntax
misty.GetSavedWifiNetworks([string websocketClass], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Parameters

* websocketClass (string) - Optional. Specifies the WebSocket class to obtain information about. To recieve information about all of Misty's available WebSocket connections, pass an empty string.
* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetWebsocketNames()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks).
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

* result (array) - An array of data objects with information about the WebSocket connections to which you can subscribe. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../docs/skills/local-skill-architecture/#-quot-get-quot-data-callbacks) for more information. The data object for each WebSocket class includes the following information:
  * class (string) - The name of a given WebSocket class.
  * nestedProperties (array) - A list of properties for a given WebSocket class. Use these properties to declare conditions for events you want to receive information about when subscribing to messages from a WebSocket data stream.

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

Sets Misty's log level. Misty's log level can be set to `Debug`, `Info`, `Warn`, or `Error`.

```JavaScript
// Syntax
misty.SetLogLevel(string level, [int prePauseMs], [int postPauseMs]);
```

Misty's log level determines where the system writes different types of messages. Misty can write messages to her local log file and to a remote log file on a server owned by Misty Robotics. See the tables below for information about how Misty's log level determines where different message types are published.

If Misty's log level is set to `Debug`:

| Message Type: | Logged Locally | Logged Remotely |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |


If Misty's log level is set to `Info`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     | &#x2713;          |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |

 If Misty's log level is set to `Warn`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:------------:|:-------------:|
| Debug  |    &#x2713;      |             |
| Info   |     &#x2713;     |              |
| Warn   |     &#x2713;     | &#x2713;          |
| Error  |      &#x2713;    |  &#x2713;         |
| Remote |       &#x2713;   |   &#x2713;        |

 If Misty's log level is set to `Error`:

|    Message Type:    | Logged Locally    | Logged Remotely    |
|--------|:-----------:|:------------:|
| Debug  |    &#x2713;      |              |
| Info   |    &#x2713;      |              |
| Warn   |    &#x2713;      |              |
| Error  |    &#x2713;      |&#x2713;             |
| Remote |    &#x2713;      |&#x2713;             |


Arguments
* level (string) - The level to set the log to. Accepts `Debug`, `Info`, `Warn`, or `Error`. 
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```JavaScript
// Example
misty.SetLogLevel("Debug");
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