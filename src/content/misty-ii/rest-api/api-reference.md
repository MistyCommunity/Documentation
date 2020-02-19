---
title: API Reference
layout: coding.hbs
columns: three
order: 3
---

# {{title}}

With the REST API, you can send commands to Misty from a REST client or browser. There is also a community maintained [Python wrapper](https://github.com/MistyCommunity/Wrapper-Python) available for the Misty REST API.

To create skills for Misty, you'll need to send commands to Misty and get data back from Misty. To send commands to Misty, you can call the REST API. To get live updating data back from Misty, you'll need to use a [WebSocket connection](../../rest-api/overview#subscribing-amp-unsubscribing-to-a-websocket). You can visit the [Misty Community Tutorials](https://github.com/MistyCommunity/Tutorials) repository for example skills.

**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.

## URL & Message Formats

Use the following URL format when sending commands to the robot:

```markup
http://<robot-ip-address>/api/<Endpoint>
```

Misty uses JSON to format REST API data. Use this format when creating the payload:


```json
{
  "key0": "value0",
  "key1": "value1",
  "key2": "value2"
}
```

The `Content-Type` for all POST requests should be `application/json`, unless otherwise specified in this documentation.

All successful commands return a status and the result of the call.

```json
{
  "result": true,
  "status": "Success"
}
```

A `status` of `"Success"` indicates Misty received and was able to process the request. A status of `"Failed
"` indicates there was a problem, and is typically paired with an `error` string instead of a `result` value.

For most GET requests, the value for `result` is the response data from Misty. For example, when you send a request to the `GetImageList` endpoint, the value for `result` is an array of JSON-formatted objects with information about each image saved to Misty's local storage. Alternately, for most POST and DELETE requests, `result` returns a boolean value indicating whether the command was successful.


## Asset

Misty comes with a set of default images that you can display onscreen and sounds that you can play through her speakers. We encourage you to get creative and use your own image and audio assets in your skills.

### DeleteAudio
Enables you to remove an audio file from Misty that you have previously uploaded.

**Note:** You can only delete audio files that you have previously uploaded to Misty. You cannot remove Misty's default system audio files.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/audio

Parameters
* FileName (string) - The name of the file to delete, including its file type extension.

```json
    {
      "FileName": "ExampleSong.wav"
    }
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### DeleteImage
Enables you to remove an image file from Misty that you have previously uploaded.

**Note:** You can only delete image files that you have previously uploaded to Misty. You cannot remove Misty's default system image files.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/images

Parameters
* FileName (string) - The name of the file to delete, including its file type extension.

```json
    {
      "FileName": "ExampleImage.png"
    }
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### GetAudioFile

Obtains a system or user-uploaded audio file currently stored on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/audio?FileName={name-of-audio-file.extension}

Parameters

**Note:** Because GET requests do not include payloads, the parameter for this request must be included in the URL as seen above.
- FileName (string): The name of the audio file to get, including its file type extension.
- Base64 (boolean): Optional. Sending a request with `true` returns the audio file data as a downloadable Base64 string. Sending a request with `false` returns the audio file to your browser or REST client. Defaults to `false`.

```markup
http://<robot-ip-address>/api/audio?FileName=ExampleAudio.mp3
```

Return Values
- If you set `Base64` to `false`, returns an audio file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman. If you set `Base64` to `true`, returns the following key/value pairs:
  - `base64`: A base64-encoded string for the audio file data.
  - `contentType`: The content type of the media encoded in the base64 string.
  - `name`: The filename of the returned audio file.

### GetAudioList
Lists all audio files (default system files and user-uploaded files) currently stored on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/audio/list

Parameters
- None

Return Values
* Result (array) - Returns an array of audio file information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### GetImage
Obtains a system or user-uploaded image file currently stored on Misty

Endpoint: GET &lt;robot-ip-address&gt;/api/images?FileName=&lt;name-of-image-file.extension&gt;

Example:

`http://<robot-ip-address>/api/images?FileName=happy.png&Base64=false`

Parameters

**Note:** Because GET requests do not contain payloads, the parameter for this request must be included in the URL as seen above.
- FileName (string) - The name of the image file to get, including the file type extension.
- Base64 (boolean) - Optional. Sending a request with `true` returns the image data as a downloadable Base64 string. Sending a request with `false` displays the image in your browser or REST client immediately after the image is taken. Default is `true`.

```json
{
  "FileName": "e_Amazement.jpg",
  "Base64": false
}
```

Return Values
- Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for Base64.
  - base64 (string) - A string containing the Base64-encoded image data.
  - contentType (string) - The type and format of the image returned.
  - height (integer) - The height of the image in pixels.
  - name (string) - The name of the image.
  - systemAsset (boolean) - Whether the image is one of Misty's default image assets.
  - width (integer) - The width of the image in pixels.

```json
{
  "base64": "iVBORw0KGgoAAAANS....",
  "contentType": "image/png",
  "height": 270,
  "name": "Angry.png",
  "systemAsset": false,
  "width": 480
},
```

### GetImageList
Obtains a list of the images currently stored on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/images/list

Parameters
- None

Return Values
* Result (array) - Returns an array containing one element for each image currently stored on Misty. Each element contains the following:
   * Height (integer) - the height of the image file
   * Name (string) - the name of the image file
   * Width (integer) - the width of the image file
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### SaveAudio

Saves an audio file to Misty. Maximum size is 3 MB. Accepts audio files formatted as `.wav`, `.mp3`, `.wma`, and `.aac`.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio

Parameters
- FileName (string) - The name of the audio file to upload.
- Data (string) - The audio data, passed as a string containing base64 data. You must either supply a value for `Data` **or** specify a `File` to upload.
- File (object) - The audio file to save to Misty. Valid audio file types are `.wav`, `.mp3`, `.wma`, and `.aac`. **Note:** If uploading a file instead base64 data for the asset, make sure to set the `content-type` in the header of the POST call to [`multipart/form-data`](https://developer.mozilla.org/en-US/docs/web/HTTP/Basics_of_HTTP/MIME_types#multipartform-data). Uploading files to Misty this way does _not_ work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest). You must either supply a value for `Data` **or** specify a `File` to upload.
- ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the uploaded audio file, while a value of `false` tells Misty not to play the file.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

```json
{
  "FileName": "example.wav",
  "Data": "34,88,90,49,56,...",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - Returns an array of information about the audio file, with the following fields:
   * Name (string) - The name of the file that was saved.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### SaveImage

Saves an image to Misty. Optionally, proportionately reduces the size of the saved image.

Valid image file types are `.jpg`, `.jpeg`, `.gif`, `.png`. Maximum file size is 3 MB.

**Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

Endpoint: POST &lt;robot-ip-address&gt;/api/images

Parameters
* FileName (string) - The name of the image file to upload.
* Data (string) - The image data, passed as a base64 string. You must either supply a value for `Data` **or** specify a `File` to upload.
* File (object) - The image file to save to Misty. Valid image file types are `jpg`, `.jpeg`, `.gif`, and `.png`. **Note:** Make sure to set the content-type in the header of the POST call to `multipart/form-data`. Uploading files to Misty this way does not work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest). You must either supply a value for `Data` **or** specify a `File` to upload.
* Width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image.
* Height (integer) -  Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image.
* ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the uploaded image file, while a value of `false` tells  Misty not to display the image.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

```json
{
  "FileName": "example.jpg",
  "Data": "30,190,40,24,...",
  "Width": "300",
  "Height": "300",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - Returns an array of information about the image with the following fields:
  * height (integer) - The height of the image in pixels.
  * name (string) - The name of the saved file.
  * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.
  * width (integer) - The width of the image in pixels.

## Backpack

### GetSerialSensorValues

Obtains a list of the most recent messages Misty has received through the universal asynchronous receiver-transmitter (UART) serial port on her back. This list of messages clears each time the system reboots.

Endpoint: GET &lt;robot-ip-address&gt;/api/serial

Parameters

* None

Return Values

- Result (array) - A list of string values, where each value is a message Misty received through the UART serial port on her back. Messages are sequenced in reverse chronological order, with the most recent message being the last value in the array.

### WriteSerial

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

Note that Misty can also receive data a connected device sends to the UART serial port. To use this data you must subscribe to [`SerialMessage`](../../../misty-ii/robot/sensor-data/#serialmessage) events.

Endpoint: POST &lt;robot-ip-address&gt;/api/serial

Parameters

* Message (string) - The data Misty sends to the UART serial port, passed as a string value.

```json
{
  "Message": "your-data"
}
```

Return Values

- Result (boolean) - Returns `true` if no errors related to this request.

## Event

### TriggerSkillEvent
Triggers an event within a skill. The skill must be running already for Misty to trigger the event within the skill.

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/event

Parameters
* UniqueId (string) - As specified in the skill’s JSON meta file, the 128-bit GUID for the skill that holds the event to trigger.
* EventName (string) - The name of the event to trigger. 
* Payload (JSON string) -  Any arguments needed for the event.

```json
 {
  "UniqueId" : "b307c917-beb8-47e8-9bbf-1c57e8cd4d4b",
  "EventName": "UserEvent",
  "Payload": "{\"test\":\"two\"}"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

## Expression

### ChangeLED

Changes the color of the LED light behind the logo on Misty's torso.

Endpoint: POST &lt;robot-ip-address&gt;/api/led

Parameters

- Red (byte) - The red RGB color value (range 0 to 255).
- Green (byte) - The green RGB color value (range 0 to 255).
- Blue (byte) - The blue RGB color value (range 0 to 255).

```json
{
  "red": 255,
  "green": 0,
  "blue": 0
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### DisplayImage

Displays an image on Misty's screen.

You can use this command to display images from Misty's local storage or to display images that are hosted on the web.

Misty uses the default image layer settings the first time she draws content with the `DisplayImage` command. You can use the [`SetImageDisplaySettings`](./#setimagedisplaysettings) command to adjust the settings and change the appearance for a specific image layer. Issuing a `SetImageDisplaySettings` command redraws the updated image layer on Misty's display.

Endpoint: POST &lt;robot-ip-address&gt;/api/images/display

Parameters

* FileName (string) - Filename for the image to display. Valid image file types are `.jpg`, `.jpeg`, `.gif`, `.png`. Alternately, if `IsUrl` is true, the URL path for the image to display.
* Alpha (double) - Optional. Opacity for the layer on which the image displays. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the layer appears but is transparent. Defaults to 1.
* Layer (string) - Optional. The display layer to create or update with this command. If `null` or not supplied, the image displays on the default image layer (named `DefaultImageLayer`). 
* IsUrl (boolean) - Optional. If `true`, the system treats the string you pass in for `FileName` as the URL address for an image hosted online.

```json
{
  "FileName": "e_Joy2.jpg",
  "Alpha": 1
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### DisplayText

Displays text on Misty's screen.

Misty uses the default text layer settings the first time she draws content with the `DisplayText` command. You can use the [`SetTextDisplaySettings`](./#settextdisplaysettings) command to adjust the settings and change the appearance for a specific text layer. Issuing a `SetTextDisplaySettings` command redraws the updated image layer on Misty's display.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

POST &lt;robot-ip-address&gt;/api/text/display

Parameters

* Text (string) - The text to display.
* Layer (string) - Optional. The layer on which to display the text. You can use this parameter to create a new text layer or to update an existing text layer. If not supplied, the text displays on the default text layer (named `DefaultTextLayer`).

```json
{
	"Text": "Hello, world!",
	"Layer": "MyTextLayer",
}
```


Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### GetBlinkSettings

Obtains the current settings for Misty's blinking behavior. To change these settings, use the [`SetBlinkSettings`](./#setblinksettings) endpoint.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/blink/settings

Parameters:

* None

Returns:

* Result (object) - A data object with the following parameters:
  * blinkImages (object) - A set of key/value pairs indicating the blink mappings for each image on the robot. Each property in this object is the filename of an image asset saved to Misty. Each value is the image that Misty will "blink" when displaying that image on her screen.
  * openEyeMinMs (integer) - The minimum duration that Misty's eyes stay open while blinking.
  * openEyeMaxMs (integer) - The maximum duration that Misty's eyes stay open while blinking.
  * closedEyeMinMs (integer) - The minimum duration that Misty's eyes stay closed while blinking.
  * closedEyeMaxMs (integer) - The maximum duration that Misty's eyes stay closed while blinking.

```json
{
 "result": {
  "blinkImages": {
   "e_ApprehensionConcerned.jpg": "e_SystemBlinkStandard.jpg",
   "e_EcstacyStarryEyed.jpg": "e_SystemBlinkLarge.jpg",
   "e_Fear.jpg": "e_SystemBlinkStandard.jpg",
   "e_Rage4.jpg": "e_SystemBlinkLarge.jpg",
   "e_Surprise.jpg": "e_SystemBlinkLarge.jpg",
   "e_ContentLeft.jpg": "e_SystemBlinkStandard.jpg",
   "e_Joy2.jpg": "e_SystemBlinkStandard.jpg",
   "e_Terror.jpg": "e_SystemBlinkLarge.jpg",
   "e_SystemCamera.jpg": "e_SystemBlinkStandard.jpg",
   "e_Anger.jpg": "e_SystemBlinkStandard.jpg",
   "e_Rage.jpg": "e_SystemBlinkLarge.jpg",
   "e_Rage3.jpg": "e_SystemBlinkLarge.jpg",
   "e_Love.jpg": "e_SystemBlinkStandard.jpg",
   "e_Sleepy2.jpg": "e_SystemBlinkStandard.jpg",
   "e_Joy.jpg": "e_SystemBlinkStandard.jpg",
   "e_ContentRight.jpg": "e_SystemBlinkStandard.jpg",
   "e_Terror2.jpg": "e_SystemBlinkLarge.jpg",
   "e_Amazement.jpg": "e_SystemBlinkLarge.jpg",
   "e_TerrorLeft.jpg": "e_SystemBlinkLarge.jpg",
   "e_Sleepy3.jpg": "e_SystemBlinkStandard.jpg",
   "e_Sleepy.jpg": "e_SystemBlinkStandard.jpg",
   "e_Disoriented.jpg": "e_SystemBlinkStandard.jpg",
   "e_Sleepy4.jpg": "e_SystemBlinkStandard.jpg",
   "e_JoyGoofy2.jpg": "e_SystemBlinkLarge.jpg",
   "e_TerrorRight.jpg": "e_SystemBlinkLarge.jpg",
   "e_Sadness.jpg": "e_SystemBlinkStandard.jpg",
   "e_DefaultContent.jpg": "e_SystemBlinkStandard.jpg"
  },
  "closedEyeMaxMs": 200,
  "closedEyeMinMs": 100,
  "openEyeMaxMs": 8000,
  "openEyeMinMs": 1000
 },
 "status": "Success"
}
```

Sample response data for a `GetBlinkSettings` request:

```JSON
{
    "result": {
        "blinkImages": {
            "e_Love.jpg": "e_SystemBlinkStandard.jpg",
            "e_Joy2.jpg": "e_SystemBlinkStandard.jpg",
            "e_Sleepy4.jpg": "e_SystemBlinkStandard.jpg",
            "e_ContentRight.jpg": "e_SystemBlinkStandard.jpg",
            "e_Amazement.jpg": "e_SystemBlinkLarge.jpg",
            "e_Terror.jpg": "e_SystemBlinkLarge.jpg",
            "e_Anger.jpg": "e_SystemBlinkStandard.jpg",
            "e_Disoriented.jpg": "e_SystemBlinkStandard.jpg",
            "e_ApprehensionConcerned.jpg": "e_SystemBlinkStandard.jpg",
            "e_Fear.jpg": "e_SystemBlinkStandard.jpg",
            "e_Sleepy.jpg": "e_SystemBlinkStandard.jpg",
            "e_Terror2.jpg": "e_SystemBlinkLarge.jpg",
            "e_Sleepy2.jpg": "e_SystemBlinkStandard.jpg",
            "e_Sadness.jpg": "e_SystemBlinkStandard.jpg",
            "e_JoyGoofy2.jpg": "e_SystemBlinkLarge.jpg",
            "e_Rage4.jpg": "e_SystemBlinkLarge.jpg",
            "e_Rage.jpg": "e_SystemBlinkLarge.jpg",
            "e_ContentLeft.jpg": "e_SystemBlinkStandard.jpg",
            "e_Rage3.jpg": "e_SystemBlinkLarge.jpg",
            "e_DefaultContent.jpg": "e_SystemBlinkStandard.jpg",
            "e_EcstacyStarryEyed.jpg": "e_SystemBlinkLarge.jpg",
            "e_Surprise.jpg": "e_SystemBlinkLarge.jpg",
            "e_Joy.jpg": "e_SystemBlinkStandard.jpg",
            "e_TerrorLeft.jpg": "e_SystemBlinkLarge.jpg",
            "e_Sleepy3.jpg": "e_SystemBlinkStandard.jpg",
            "e_SystemCamera.jpg": "e_SystemBlinkStandard.jpg",
            "e_TerrorRight.jpg": "e_SystemBlinkLarge.jpg"
        },
        "closedEyeMaxMs": 200,
        "closedEyeMinMs": 100,
        "openEyeMaxMs": 8000,
        "openEyeMinMs": 1000
    },
    "status": "Success"
}
```

### PlayAudio

Plays an audio file that has been previously uploaded to Misty. Use `SaveAudio` to upload audio files to Misty.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/play

Parameters

- AssetId (string) - The ID of the file to play. You must pass a value for either the `AssetId` or `FileName` parameter.
- FileName (string) - The name of the file to play. You must pass a value for either the `AssetId` or `FileName` parameter.
- Volume (integer) - Optional. A value between 0 and 100 for the loudness of the audio clip. 0 is silent, and 100 is full volume. Defaults to `null`.

```json
{
  "FileName": "s_Amazement.wav"
}
```

Return Values

* Result (string) - Returns a string with any errors related to this command.

### RemoveBlinkMappings

Removes blink mappings from one or more image assets.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: DELETE &lt;robot-ip-address&gt;/api/blink/images

Parameters

* BlinkImages (array) - The list of images to remove blink mappings from.

```JSON
{
  "BlinkImages": ["Relaxed.png", "Protected.png"]
}
```

Return values

* Result (string) - Returns `true` if no errors related to this request.


### TransitionLED

Sets Misty's LED to transition between two colors.

When you use this command, Misty will continue the transition you specify until she is powered off or receives another command to change or transition her LED.

Endpoint: POST &lt;robot-ip-address&gt;/api/led/transition

Parameters

* Red (byte) - The red RGB color value for the first color (range 0 to 255).
* Green (byte) - The green RGB color value for the first color (range 0 to 255).
* Blue (byte) - The blue RGB color value for the first color (range 0 to 255).
* Red2 (byte) - The red RGB color value for the second color (range 0 to 255).
* Green2 (byte) - The green RGB color value for the first color (range 0 to 255).
* Blue2 (byte) - The blue RGB color value for the first color (range 0 to 255).
* TransitionType (string) - The transition type to use. Case sensitive. Accepts `Blink` (continuously blinks LED between the specified colors), `Breathe` (continuously fades LED between the specified colors), and `TransitOnce` (blinks LED from first color to second color only once). 
* TimeMs (int) - The duation (in milliseconds) between each transition. Must be greater than `3`.

```JSON
{
	"Red": 255,
	"Green": 0,
	"Blue": 0,
	"Red2": 0,
	"Green2": 255,
	"Blue2": 0,
	"TransitionType": "Breathe",
	"TimeMS": 500
}
```

Return values

* Result (string) - Returns `true` if no errors related to this request.

### SetBlinking

Turns Misty's eye blinking behavior on or off.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

To customize Misty's blinking behavior, use the [`SetBlinkSettings`](../../../misty-ii/rest-api/api-reference/#setblinksettings) command.
{{box op="end"}}

Misty stops blinking when there is an error message on her screen, and starts blinking again when the message clears.

Endpoint: POST &lt;robot-ip-address&gt;/api/blink

Parameters

* Blink (bool) - Passing in `true` turns blinking on, and passing in `false` turns blinking off. By default, blinking turns on when Misty starts up.

```JSON
{
  "Blink": true
}
```

Return values

* Result (string) - Returns `true` if no errors related to this request.

### SetBlinkSettings

Sets the duration that Misty's eyes stay open or closed while blinking. You can also use this command to add a blink mapping to an image asset. Optionally, reverts Misty's blink settings to their default configuration.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

Misty saves your custom blink settings to her local database, so there's no need to re-configure these settings each time she boots up.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/blink/settings

Parameters

* BlinkImages (string) - Optional. The blink mapping for one or more image assets, formatted as a comma-separated string of image asset pairs. You set a new blink mapping for an image asset by using an "=" sign. (For example, to set the blink mapping for `e_SystemLogoPrompt.jpg` to `e_Sleepy4.jpg`, use `"e_SystemLogoPrompt.jpg=e_Sleepy4.jpg"`).  
* OpenEyeMinMs (integer) - Optional. Sets the minimum duration that Misty's eyes stay open while blinking.
* OpenEyeMaxMs (integer) - Optional. Sets the maximum duration that Misty's eyes stay open while blinking.
* ClosedEyeMinMs (integer) - Optional. Sets the minimum duration that Misty's eyes stay closed while blinking.
* ClosedEyeMaxMs (integer) - Optional. Sets the maximum duration that Misty's eyes stay closed while blinking.
* RevertToDefault (boolean) - Optional. Use `true` to revert Misty's blink settings to the default configuration. Use `false` (or leave blank) to continue using your custom settings.

```JSON
{
  "BlinkImages": "e_SystemLogoPrompt.jpg=e_Sleepy4.jpg,e_SystemGearPrompt.jpg=e_Sleepy3.jpg,MyPic.jpg=e_Sleepy4.jpg",
  "OpenEyeMinMs" : 1000,
  "OpenEyeMaxMs" : 7000,
  "ClosedEyeMinMs" : 100,
  "ClosedEyeMaxMs" : 200,
  "RevertToDefault": false
}
```

Return values

* Result (string) - Returns `true` if no errors related to this request.

### SetFlashlight

Turns the LED flashlight on Misty's head on or off.

Endpoint: POST &lt;robot-ip-address&gt;/api/flashlight

Parameters

* On (bool) - Turns the flashlight on (`true`) or off (`false`).

```JSON
{
  "On": true
}
```

Return values

* Result (string) - Returns `true` if no errors related to this request.

## External Requests

### SendExternalRequest

Sends an HTTP request from Misty to an external server. You can use `SendExternalRequest` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command does not currently support uploading data as `multipart/form-data`, nor can you reference a file on the robot to upload with your external request.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/request

Parameters

* Method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* Resource (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* authorizationType (string) - Optional. The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* Token (string) - Optional. The authentication credentials required to access the resource. Use `null` if no credentials are required.
* Arguments (string) - Optional. The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* Save (bool) - Optional. If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* Apply (bool) - Optional. A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* FileName (string) - Optional. The name to give the saved file, including the appropriate file type extension.
* ContentType (string) - Optional. The content type of the data you are sending with the request. Defaults to `"application/json"`.

```JSON
{
  "Method": "GET",
  "Resource": "http://soundbible.com/grab.php?id=1949%26type=mp3",
  "Save": true,
  "Apply": true,
  "FileName": "externalAudioFile.mp3"
}
```

Return Values

* Data (object) - The external server's response to the request.

## Movement

The following commands allow you to programmatically drive and stop Misty and move her head and arms. 

If you want to directly drive Misty, you can use her [companion app](../../../tools-&-apps/mobile/misty-app).

To programmatically obtain live data streams back from Misty that include movement, position, and proximity data, you can [subscribe](../../rest-api/overview#subscribing-amp-unsubscribing-to-a-websocket) to her LocomotionCommand, HaltCommand, TimeOfFlight, and SelfState [WebSockets](../../../misty-ii/robot/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

### Drive
Drives Misty forward or backward at a specific speed until cancelled.

When using the Drive command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive

Parameters
- LinearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.

```json
{
  "LinearVelocity": 20,
  "AngularVelocity": 15,
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### DriveArc

Drives Misty in an arc. Misty continues driving until her current heading matches the desired absolute heading passed into this command.

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../misty-ii/robot/sensor-data/#imu) named object. To calculate Misty's velocity, use: `((desired_heading - current_heading) * (π/180) * radius) / (timeMs/1000)`.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/arc

Parameters

* Heading (double) - The absolute heading Misty should obtain when the arc is complete. To set the absolute heading, use either: 0 - 360, where 0 is straight ahead, 90 is directly to the left, 180 is straight behind, and 270 is directly to the right, or: -180 to 180, where 0 is straight ahead, 90 is directly to the left, 180 and -180 are straight behind, and -90 is directly to the right.
* Radius (double) - The radius (in meters) of the arc.
* TimeMs (double) -  The duration (in milliseconds) that Misty drives.
* Reverse (boolean) - Optional. If `true`, Misty drives in reverse. Default is `false`.

```JSON
{
  "Heading": 90,
  "Radius": 1,
  "TimeMs": 4000
}
```
Return Values:

* result (boolean) - Returns `true` if no errors related to this command.

Example JSON response for a successful request:

```JSON
{
  "result": "true",
  "status": "Success"
}
```

Example JSON response for a failed request:

```JSON
{
  "error": "Cannot drive  - Missing required double parameter 'Heading'. - Missing required double parameter 'Distance'. - Missing required double parameter 'TimeMs'.",
  "status": "Failed"
}
```

### DriveHeading

Drives Misty forward or backward in a straight line. While driving, Misty continuously adjusts her current heading to maintain the desired absolute heading.

For a smooth driving experience, Misty's current heading should be within two degrees of the desired absolute heading before she executes the `DriveHeading` command. Variations of greater than two degrees result in large correction velocities. You can use the `DriveArc` command to face Misty in the direction of the heading you want her to maintain. Then, use the `DriveHeading` command to drive Misty forward or backward in a straight line.

To get Misty's current heading, use the value for `yaw` from the [`IMU`](../../../misty-ii/robot/sensor-data/#imu) named object. To calculate Misty's velocity, use `distance / (timeMs/1000)`.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/hdt

Parameters

* Heading (double) - The absolute heading Misty should maintain. To set the absolute heading, use either: 0 - 360, where 0 is straight ahead, 90 is directly to the left, 180 is straight behind, and 270 is directly to the right, or: -180 to 180, where 0 is straight ahead, 90 is directly to the left, 180 and -180 are straight behind, and -90 is directly to the right.
* Distance (double) - The distance (in meters) that Misty should drive.
* TimeMs (double) - The duration (in milliseconds) that Misty should drive.
* Reverse (boolean) - If `true`, Misty drives in reverse. Default is `false`.

```JSON
{
  "Heading": 90,
  "Distance": 1,
  "TimeMs": 4000,
}
```

Return Values

* result (boolean) - Returns `true` if no errors related to this command.

Example JSON response for a successful request:

```JSON
{
  "result": "true",
  "status": "Success"
}
```

Example JSON response for a failed request:

```JSON
{
  "error": "Cannot drive  - Missing required double parameter 'Heading'. - Missing required double parameter 'Distance'. - Missing required double parameter 'TimeMs'.",
  "status": "Failed"
}
```

### DriveTime

Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using the DriveTime command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/time

Parameters
- LinearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- AngularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
- TimeMs (integer) - A value in milliseconds that specifies the duration of movement. Misty will not drive if you pass in a value of less than 100 for this parameter.
- Degree (double) - (optional) The number of degrees to turn. **Note:** Supplying a `Degree` value recalculates linear velocity.

```json
{
  "LinearVelocity": 1,
  "AngularVelocity": 4,
  "TimeMS": 500
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### DriveTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/track

Parameters
- LeftTrackSpeed (double) - A value for the speed of the left track, range: -100 (full speed backward) to 100 (full speed forward).
- RightTrackSpeed (double) - A value for the speed of the right track, range: -100 (full speed backward) to 100 (full speed forward).

```json
{   
  "LeftTrackSpeed": 30,
  "RightTrackSpeed": 70
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### Halt

Stops all motor controllers, including drive motor, head/neck, and arm.

Endpoint: POST &lt;robot-ip-address&gt;/api/halt

Parameters
* None

Return Values
* None

### MoveArm

Moves Misty's arms.

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

Endpoint: POST &lt;robot-ip-address&gt;/api/arms

Parameters
* Arm (string) - The arm to move. You must use either `left`, `right`, or `both`.
* Position (double) - The new position to move the arm to. Use the `Units` parameter to determine whether to use `position`, `degrees`, or `radians`. Defaults to `degrees`.
* Velocity (double) - Optional. A value of 0 to 100, specifying the speed with which the arm should move. Defaults to `null`.
* Units (string) - Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's arms.

```JSON
{
  "Arm": "left",
  "Position": -90,
  "Velocity": 100,
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### MoveArms

Moves one or both of Misty's arms. You can control both arms simultaneously or one at a time.

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

Endpoint: POST &lt;robot-ip-address&gt;/api/arms/set

Parameters
* LeftArmPosition (double) - Optional. The new position of Misty's left arm. Use the `Units` parameter to determine whether to use `position`, `degrees`, or `radians`. Defaults to `degrees`.
* RightArmPosition (double) - Optional. The new position of Misty's right arm. Use the `Units` parameter to determine whether to use `position`, `degrees`, or `radians`. Defaults to `degrees`.
* LeftArmVelocity (double) - Optional. A value of 0 to 100 specifying the speed with which the left arm should move. Defaults to `null`.
* RightArmVelocity (double) - Optional. A value of 0 to 100, specifying the speed with which the right arm should move. Defaults to `null`.
* Units (string) - Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's arms.

```JSON
{
  "LeftArmPosition": 90,
  "RightArmPosition": 90,
  "LeftArmVelocity": 50,
  "RightArmVelocity": 5
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### MoveHead

Moves Misty's head to a new position along its pitch, roll, and yaw axes.

For the value ranges (by unit) for each direction of head movement, see the table below:

|| degrees | position | radians |
|-----|---------|----------|---------|
| pitch | -40 (up) to 26 (down) | -5 (up) to 5 (down) |-0.1662 (up) to 0.6094 (down) |
| roll | -40 (left) to 40 (right) | -5 (left) to 5 (right) |-0.75 (left) to 0.75 (right) |
| yaw | -81 (right) to 81 (left) | -5 (right) to 5 (left) |-1.57 (right) to 1.57 (left) |

For more information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `Duration` OR the `Velocity` argument. If you pass in values for both arguments, or if you pass in values for neither arguments, the system throws an exception.
{{box op="end"}}


Endpoint: POST &lt;robot-ip-address&gt;/api/head

Parameters

- Pitch (double) - Value that determines the up or down position of Misty's head movement.
- Roll (double) - Value that determines the tilt ("ear" to "shoulder") of Misty's head.
- Yaw (double) - Number that determines the left to right turn position of Misty's head.
- Velocity (double) - Optional. The percentage of max velocity that indicates how quickly Misty should move her head. Value range: 0 to 100. Defaults to 10.
- Duration (double) - Optional. Time (in seconds) Misty takes to move her head from its current position to its new position.
- Units (string) -  Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's head. Defaults to `degrees`.

```json
{
  "Pitch": -40,
  "Roll": 0,
  "Yaw": 0,
  "Velocity": 60
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### Stop

Stops Misty's movement.

{{box op="start" cssClass="boxed warningBox"}}
**Important:** Under most circumstances, it is best to avoid calling the `Stop` command with a `Hold` value of `true`. Holding Misty's position can strain Misty's drive motors. Stopping Misty's driving without holding her position should suffice under most circumstances and can prolong the life of your robot's drive motors.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/stop

Parameters

- Hold (boolean) - Optional. Defaults to `false`. If `true`, Misty's drive motors remain engaged after Misty stops moving and attempt to hold the robot in its current position. This can be useful when Misty needs to stop moving while she's on an incline; sending a `Stop` command with a `Hold` value of `true` keeps the motors engaged, so that Misty does not roll down the slope. It is generally recommended to ignore the `Hold` parameter. Stopping Misty's driving without holding her position should suffice under most circumstances and can prolong the life of your robot's drive motors.

Return Values

- Result (boolean) - Returns `true` if there are no errors related to this command.


## Navigation

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#navigation).
{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty’s SLAM capabilities are an alpha feature. Experiment with mapping, but recognize that Misty’s ability to create maps and track within them is unreliable at this time.
{{box op="end"}}

### DeleteSlamMap

Deletes a map.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/slam/map

Parameters

* Key (string) - The unique `key` value of the map to delete. **Note:** This command does not work when passed the value for the `name` associated with a map.

```JSON
{
  "key": "Map_20190912_21.16.32.UTC",
}
```

Return Values

* Result (boolean) - Returns true if no errors related to this command.

### DriveToLocation

Drives to a designated waypoint.

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/coordinates

Parameters
* Destination (string) - A colon-separated integer pair that represents the X and Y coordinates of the destination. **Note:** `GetMap` obtains the occupancy grid for the most recent map Misty has generated. Use this grid to determine the X and Y coordinates of the destination. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array.

```json
“Destination": “10:25"
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### FollowPath

Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path. Misty will not be able to successfully follow a path if unmapped obstacles are in her way.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the end of the path.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/path

Parameters

- Path (string) - A string of comma-separated X:Y coordinates representing waypoints on a path for Misty to track through her currently active map. Each waypoint is a colon-separated integer pair representing the X and Y coordinates of a location on Misty's currently active map. Use `GetMap` to obtain the occupancy grid for Misty's current map, and use this grid to determine the X and Y coordinates of the destination.
- Velocity (double) - Optional. A fraction of Misty's max velocity. Determines how fast Misty moves when driving straight while following a path. Expects a decimal value greater than 0 and less than 1. Defaults to `0.5` (50% of max velocity) if not specified.
- FullSpinDuration (double) - Optional. Number of seconds it takes for Misty to complete a full spin (360 degrees) while following a path. Determines how fast Misty pivots or spins when changing direction. Defaults to `15` if not specified.
- WaypointAccuracy (double) - Optional. How close (in meters) the robot gets to a waypoint before considering itself to have reached that waypoint. Defaults to `0.1` if not specified.
- RotateThreshold (double) - Optional. The angle (in degrees) Misty's path following algorithm uses to determine when Misty should pivot toward a waypoint instead of continuing to drive straight. When following a path, Misty drives straight toward her next waypoint until the bearing between the waypoint and her current heading is greater than `RotateThreshold` degrees. When the bearing reaches this threshold, Misty pivots in the direction of the waypoint until the bearing is lower than `RotateThreshold`. When Misty reaches a waypoint, she spins to face the next waypoint and drives straight. As she approaches the waypoint, any error in the original spin causes the bearing angle to grow, causing Misty to stop and turn toward the waypoint; thus, Misty may stop and pivot multiple times between one waypoint and the next. Defaults to `10` if not specified.

```json
{
  "Path": "4:3,8:8,10:15"
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### GetMap

Obtains the occupancy grid data for Misty's currently active map.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

To obtain a valid response from `GetMap`, Misty must first have successfully generated a map. To change the currently active map, use the [`SetCurrentSlamMap`](./#setcurrentslammap) command.
{{box op="end"}}

Misty’s maps are squares that are constructed around her initial physical location when she starts mapping. When a map is complete, it is a square with Misty’s starting point at the center.

The occupancy grid for the map is represented by a two-dimensional matrix. Each element in the occupancy grid represents an individual cell of space. The value of each element (0, 1, 2, or 3) indicates the nature of the space in those cells (respectively: "unknown", "open", "occupied", or "covered").

Each cell corresponds to a pair of X,Y coordinates that you can use with the `FollowPath`, `DriveToLocation`, and `GetSlamPath` commands. The first cell in the first array of the occupancy grid is the origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/map

Parameters
 * None

Return Values
* Result (object) - An object containing the following key-value pairs:
  * grid (array of arrays) - The occupancy grid for the most recent map Misty has generated, represented by a matrix of cells. The number of arrays is equal to the value of the `height` parameter. The number of cells is equal to the product of `height` x `width`. Each individual value (0, 1, 2, or 3) in the matrix represents a single cell of space. 0 indicates “unknown" space, 1 indicates “open" space, 2 indicates “occupied" space, and 3 indicates “covered" space. Each cell corresponds to an X,Y coordinate on the occupancy grid. The first cell in the first array is the X,Y origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. If no map is available, grid returns `null`.
  * height (integer) - The height of the occupancy grid matrix (in number of cells).
  * isValid (boolean) - Returns a value of `true` if the data returned represents a valid map. If no valid map data is available, returns a value of `false`.
  * metersPerCell (integer) - A value in square meters stating the size of each cell in the occupancy grid matrix.
  * originX (float) - The distance in meters from the X value of the occupancy grid origin (0,0) to the X coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to an X coordinate on the occupancy grid, use the formula 0 - (`originX` / `metersPerCell`). Round the result to the nearest whole number. 
  * originY (float) - The distance in meters from the Y value of the occupancy grid origin (0,0) to the Y coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to a Y coordinate on the occupancy grid, use the formula 0 - (`originY` / `metersPerCell`). Round the result to the nearest whole number. 
  * size (integer) - The total number of map cells represented in the grid array. Multiply this number by the value of meters per cell to calculate the area of the map in square meters.
  * width (integer) - The width of the occupancy grid matrix (in number of cells). 


### GetCurrentSlamMap

Obtains the key for the currently active map.

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/map/current

Parameters

* None

Return Values

* result (string) - The unique key associated with the currently active map.

```JSON
{
    "result": "Map_20190912_21.16.32.UTC",
    "status": "Success"
}
```

### GetSlamIrExposureAndGain

Obtains the current exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/settings/ir

Parameters

* None

Return Values

* result (object) - An object with the following key/value pairs:
  * exposure (double) - The current exposure levels for the infrared cameras in the depth sensor (in seconds).
  * gain (integer) - The current gain levels for the infrared cameras in the depth sensor (in dB).

```JSON
{
    "result": {
        "exposure": 0.014468,
        "gain": 3
    },
    "status": "Success"
}
```

### GetSlamMaps

Obtains a list of keys and names for Misty's existing maps.

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/map/ids

Parameters

* None

Return Values

* result (array) - A list of objects representing Misty's existing maps. Each object has the following key/value pairs:
  * key (string) - The map's unique key value. Keys are date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`). The key for a map cannot be changed.
  * name (string) - A customizable string label for the map. When you create a map, the system saves the map with a name value that is the same as the map's key value. To change a map's name, use the [`RenameSlamMap`](./#renameslammap) command.

```JSON
{
  "result": [
    {
      "key": "Map_20190912_21.16.06.UTC",
      "name": "Map_20190912_21.16.06.UTC"
    },
    {
      "key": "Map_20190912_21.16.32.UTC",
      "name": "My Map"
    }
  ],
  "status": "Success"
}
```

### GetSlamNavigationDiagnostics

Obtains diagnostic information about Misty's navigation system.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

The information in the data object for this command is primarily used by the Misty Robotics engineering and support staff to troubleshoot and root-cause issues with Misty's SLAM system. The contents of this data object are likely to change without notice in future system updates.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/diagnostics

Parameters
* None

Return Values

* result (string) - A stringified JSON object with diagnostic information about the current status of Misty's SLAM system.

```JSON
{
  "result": "{\n    \"Navigation\": \"Report\",\n    \"trackingInfo\": {\n        \"numKeyFrames\": 0,\n        \"numKeyPoints\": 0,\n        \"numMapPoints\": 0,\n        \"numTrackedPoints\": 0,\n        \"occupancyGridSize\": [0, 0],\n        \"usingImuProcessModel\": false\n    }\n}",
  "status": "Success"
}
```

### GetSlamPath

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the path parameter of `FollowPath` for Misty to follow this path to the desired location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** `GetMap` obtains the occupancy grid for the most recent map Misty has generated. Use this grid to determine the X and Y coordinates of the destination. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array.

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/path

Parameters
* X (integer) - The X coordinate of the destination.
* Y (integer) - The Y coordinate of the destination.

```json
{
  "X": 13,
  "Y": 37
}
```

Return Values
* Result (array) - An array containing integer pairs. Each pair specifies the X,Y coordinates for a waypoint on the path.

### GetSlamStatus

Obtains values representing the current activity and status of Misty's SLAM system. Check these values for information about the current status of Misty's depth sensor, the SLAM system, and to see information relevant to any ongoing mapping or tracking activities.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We suggest primarily using the values of `Status`/`StatusList` when coding SLAM functionality in your skills and robot applications, and only using the `SensorStatus` and `RunMode` values as supplemental information if needed or for debugging purposes.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/status

Parameters

- None

Return Values

* `status` (int) - Number that describes the current status of the SLAM system. This number updates with information from the `sensorStatus` and `runMode` fields, as well as with other events that occur during a SLAM session. Note that this number represents several status codes simultaneously. You can convert this number to a binary value to see whether the bit field for a given status code is on (`1`) or off (`0`). As an example, the status code `33028` converts to a binary value of `1000000100000100`. In this binary value, the 3rd, 9th, and 16th bits are flipped. Those bits correspond to the status codes for `Exploring`, `LostPose`, and `Streaming`, respectively. (Note that the system also returns the string fields for all current status codes to the `statusList` array that comes back with a `GetSlamStatus` response.) The following hexadecimal values correspond to bit fields for each possible status code:
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
* `statusList` (array) - A list of the string values that describe the current status of the SLAM system. Can contain any of the values represented by the `status` field.
* `runMode` (string) - Current status of the navigation system. Possible values are:
  * `Uninitialized`
  * `Tracking`
  * `Exploring`
  * `Relocalizing`
  * `Paused`
  * `ExportingScene`
  * `NeedMoreMotionToInitMap`
  * `NotAvailable`
* `sensorStatus` (string) - Current status of the depth sensor sensor. Possible values are:
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


### GetSlamVisibleExposureAndGain

Obtains the current exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/settings/visible

Parameters

* None

Return Values

* result (object) - An object with the following key/value pairs:
  * exposure (double) - The current exposure levels for the fisheye camera in the depth sensor (in seconds).
  * gain (integer) - The current gain levels for the fisheye camera in the depth sensor (in dB).

```JSON
{
    "result": {
        "exposure": 0.007987,
        "gain": 2
    },
    "status": "Success"
}
```

### RenameSlamMap

Renames an existing map.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/rename  

Parameters

* Key (string) - The unique `key` value of the map to rename.
* Name (string) - A new `name` value for the map.

```JSON
{
  "Key": "Map_20190912_21.16.32.UTC",
  "Name": "KitchenMap3"
}
```

Return Values:

* Result (boolean) - Returns `true` if no errors related to this command. 

### ResetSlam

Resets the SLAM sensors.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/reset

Parameters

- None

Return Values

- Result (boolean) - Returns `true` if there are no errors related to this command.

### SetCurrentSlamMap

Sets a map to be Misty's currently active map for tracking and relocalization.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/current

Parameters

* Key (string) - The unique `key` of the map to make currently active. **Note:** This command does not work when passed the value for the `name` associated with a map.

```JSON
{
  "key": "Map_20190912_21.16.32.UTC",
}
```

Return Values:

* result (boolean) - Returns `true` if no errors related to this command.

### SetSlamIrExposureAndGain

Sets the exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Changing the gain and exposure levels for the infrared cameras in the depth sensor can impact the performance of Misty's SLAM system. We recommend that you avoid changing these settings unless working with a member of the Misty support team.

If you issue a `SetSlamIrExposureAndGain` command when the SLAM system is not in a `streaming` state, the camera's settings will not update. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/settings/ir

Parameters

* Exposure (double) - Exposure levels for the infrared cameras in the depth sensor (in seconds). Range: `0.001` - `0.033`.
* Gain (integer) - Gain levels for the infrared cameras in the depth sensor (in dB). Range: `0` - `3`.

```JSON
{
  "Exposure": 0.014468,
  "Gain": 3
}
```

Return Values

* Result (boolean) - Returns `true` if no errors related to this command.

### SetSlamVisibleExposureAndGain

Sets the exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you issue a `SetSlamVisibleExposureAndGain` command when the SLAM system is not in a `streaming` state, the camera's settings will not update. To start streaming, you can issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/settings/visible

Parameters

* Exposure (double) - Exposure levels for the fisheye camera in the depth sensor (in seconds). Range: `0.001` - `0.033`
* Gain (integer) - Gain levels for the fisheye camera in the depth sensor (in dB). Range: `1` - `8`

```JSON
{
  "Exposure": 0.007987,
  "Gain": 2
}
```

Return Values

* result (boolean) - Returns `true` if no errors related to this command.

### StartLocatingDockingStation

Starts Misty locating the position and orientation (pose) of the docking station.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

To use information about the pose of Misty's docking station in your skills and robot applications, you must both issue a `StartLocatingDockingStation` command and register a listener for the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type. We do not recommend that you attempt to locate the docking station while Misty is actively creating a map.
{{box op="end"}}

When you issue a `StartLocatingDockingStation` command, Misty uses the right infrared (IR) camera in the depth sensor to locate the front four IR reflectors embedded in the docking station. The system uses the location of these reflectors to calculate the pose for the point on the docking station where Misty should be centered to receive the best charge.

When Misty locates the station, `ChargerPoseMessage` event listeners receive relative pose data in the form of a column major homogeneous coordinate matrix. The right IR camera in Misty's depth sensor (from the robot's perspective) is the origin point for all docking station pose data. Read more about interpreting this data in the documentation for the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type.

To get docking station pose, Misty must be between 0.5 and 2 meters away from the docking station. The robot should also be facing in the general direction of the docking station. The station should be inside a cone of +/- 45 degrees originating from the robot's right IR camera.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/docking/start

Parameters

* startStreamingTimeout (int) - Optional. The number of one second intervals that must elapse with streaming stopped before the `StartLocatingDockingStation` command fails. The system checks the status of the streaming service this many times, with a pause of one second between each check. If streaming doesn't start before these status checks complete, then the `StartLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* enableIrTimeout (int) - Optional. The number of one second intervals that must elapse with infrared (IR) disabled before the `StartLocatingDockingStation` command fails. The system checks the status of the IR sensors this many times, with a pause of one second between each check. If the IR sensors are not enabled before these status checks complete, then the `StartLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.

Return Values

* result (boolean) - Returns `true` if no errors related to this command.

### StartMapping

Starts Misty mapping an area.

Misty saves each map she creates to local storage. Each map is associated with a unique key at the time of the map's creation. Map keys are formatted as date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`). To obtain a list of Misty's existing maps, use the [`GetSlamMaps`](./#getslammaps) command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartSlamStreaming

Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `StopSlamStreaming` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Using `StopSlamStreaming` turns off the laser in the depth sensor and lowers Misty's power consumption.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/streaming/start

Parameters 
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### StartTracking

Starts Misty tracking her location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/track/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopLocatingDockingStation

Stops Misty locating the docking station.

For more information about locating the docking station, see the documentation for the [`StartLocatingDockingStation`](./#startlocatingdockingstation) command and the [`ChargerPoseMessage`](../../../misty-ii/robot/sensor-data/#chargerposemessage) event type.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/docking/stop

Parameters

* StopStreamingTimeout (int) - Optional. The number of one second intervals that must elapse with streaming enabled before the `StopLocatingDockingStation` command fails. The system checks the status of the streaming service this many times, with a pause of one second between each check. If streaming doesn't stop before these status checks complete, then the `StopLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.
* DisableIrTimeout (int) - Optional. The number of one second intervals that must elapse with infrared (IR) enabled before the `StopLocatingDockingStation` command fails. The system checks the status of the IR sensors this many times, with a pause of one second between each check. If the IR sensors are not enabled before these status checks complete, then the `StopLocatingDockingStation` command fails. Passing `null`, no value, or a value of less than or equal to 0 causes the system to use the default value of 5 seconds.

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopMapping

Stops Misty mapping an area.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/stop

Parameters

- None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopSlamStreaming

Closes the data stream from the Occipital Structure Core depth sensor. This command turns off the laser in the depth sensor and lowers Misty's power consumption.

**Important!** Always use this command to close the depth sensor data stream after using `StartSlamStreaming` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/streaming/stop

Parameters

- None

Return Values

- Results (boolean) - Returns `true` if there are no errors related to this command.

### StopTracking

Stops Misty tracking her location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/track/stop

Parameters

- None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### TakeDepthPicture

Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of “unknown” values in the form of `NaN` (“not a number”) values.

Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/depth

Parameters
- None

Return Values
- Result (object) - An object containing depth information about the image matrix, with the following fields.
    - height (integer) - The height of the matrix.
    - image (array) - A matrix of size `height` x `width` containing individual values of type float. Each value is the distance in millimeters from the sensor for each pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around `2000`. Note that as the robot moves further away from a scene being viewed, each pixel value will represent a larger surface area. Conversely, if it moves closer, each pixel value would represent a smaller area.
    - width (integer) - The width of the matrix.

```json
{
  "height": 240,
  "image": [857.2632,853.8426,847.1372...],
  "width": 320
}
```

### TakeFisheyePicture

Takes a photo using Misty’s Occipital Structure Core depth sensor.

Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/fisheye

Parameters

**Note:** Because GET requests do not contain payloads, the parameter for this request must be included in the URL as seen above.
- Base64 (boolean) - Sending a request with `true` returns the image data as a downloadable Base64 string, while sending a request of `false` displays the photo in your browser or REST client immediately after it is taken. Default is `false`. **Note:** Images generated by this command are not saved in Misty's memory. To save an image to your robot for later use, pass `true` for `Base64` to obtain the image data, download the image file, then call `SaveImage` to upload and save the image to Misty.

Return Values
- Result (object) -  An object containing image data and meta information. This object is only sent if you pass `true` for `Base64`.
    - base64 (string) - A string containing the Base64-encoded image data.
    - contentType (string) - The type and format of the image returned.
    - height (integer) - The height of the picture in pixels.
    - name (string) - The name of the picture.
    - width (integer) - The width of the picture in pixels.

```json
{
  "base64": "iVBORw0KG...",
  "contentType": "image/png",
  "height": 480.0,
  "name": "OccipitalVisibleImage",
  "width": 640.0,
}
```

## Perception

The following commands allow you to programmatically take pictures, record sounds or videos, and have misty detect and learn to recognize faces. 

Like most of us, Misty sees faces best in a well-lit area. If you want to directly experiment with face recognition commands, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#perception).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../rest-api/overview/#getting-data-from-misty) to her FaceRecognition [WebSocket](../../../misty-ii/robot/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

### CancelFaceTraining

Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the CancelFaceTraining command unless you want to abort a training that is in progress.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/training/cancel

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### CaptureSpeech

Starts capturing speech in a new audio recording. Misty's chest LED pulses blue when she is recording audio or listening for the key phrase.

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording by using the `MaxSpeechLength` parameter.

Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/speech/capture

Parameters

* RequireKeyPhrase (bool) - Optional. If `true`, Misty waits to start recording speech until she recognizes the key phrase. If `false`, Misty immediately starts recording speech. Defaults to `true`. 
* OverwriteExisting (bool) - Optional. If `true`, the captured speech recording overwrites any existing recording saved under the default speech capture filename. (**Note:** Misty saves speech recordings she captures with this command under one of two default filenames: `capture_HeyMisty.wav` when `RequireKeyPhrase` is true, or `capture_Dialogue.wav` when `RequireKeyPhrase` is `false`.) If `OverwriteExisting` is `false`, Misty saves the speech recording under a unique, timestamped filename: `capture_{HeyMisty or Dialogue}_{Day}-{Month}-{Year}-{Hour}-{Minute}.wav` Defaults to `true`. **Note:** If you program Misty to save each unique speech recording, you should occasionally delete unused recordings to prevent them from filling the memory on her 820 processor.
* MaxSpeechLength (int) - Optional. The maximum duration (in milliseconds) of the speech recording. If the length of an utterance exceeds this duration, Misty stops recording after the duration has elapsed, and the system triggers a `VoiceRecord` event with a message that Misty did not detect the end of the recorded speech. Range: `500` to `20000`. Defaults to `7500` (7.5 seconds).
* SilenceTimeout (int) - Optional. The maximum duration (in milliseconds) of silence that can precede speech before the speech capture mechanism times out. If Misty does not detect speech before the `SilenceTimeout` duration elapses, she stops listening for speech and triggers a `VoiceRecord` event with a message that she did not detect the beginning of speech. Range: `500` to `10000`. Defaults to `5000` (5 seconds).

Return Values

* Result (bool) - Returns `true` if no issues related to this command.

### DeleteVideoRecording

Deletes a video recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only deletes video recordings that Misty has created. To delete a user-uploaded video asset, you must use the [`DeleteVideo`](./#deletevideo) command.
{{box op="end"}}

Endpoint: Delete &lt;robot-ip-address&gt;/api/videos/recordings

Parameters

* Name (string) - The filename of the video to delete. Does not include the filetype extension.

Return Values

* Result (boolean) - Returns `true` if no errors related to this command.

### ForgetFaces

Removes records of trained faces from Misty's memory.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/faces?FaceId=&lt;"FaceId"&gt;

Parameters

* FaceId (string) - Optional. The ID of the face to remove. If you do not pass in a value for this parameter, clears all trained faces from Misty's memory.

Returns

* Result (array) - Returns `true` if no errors related to this command.

### GetKnownFaces

Obtains a list of the names of faces on which Misty has been successfully trained.

Endpoint: GET &lt;robot-ip-address&gt;/api/faces

Parameters

* None

Return Values

* Result (array) - A list of the user-supplied names for faces that Misty has been trained to recognize.

### GetVideoFile

Downloads Misty's most recent video recording to your browser or REST client.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty records videos in MP4 format at a resolution of 1080x1920 pixels. A single video may be larger than 10 megabytes and can take several seconds to download.

This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/video

Parameters

* None

Return Values

* An MP4 video file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

### GetVideoRecording

Downloads a video recording to your browser or REST client.

You can only use this command to obtain Misty's video recordings. To obtain user-uploaded video assets, use the [`GetVideo`](./#getvideo) command.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty records videos in `.mp4` format. Video recordings can be up to 3840 x 2160 pixels in resolution, and can be up to 3 minutes in length. A single video file can be up to 225 megabytes. Larger video files may take a long time to download (for example, it may take about 2 minutes to download the largest, 225 megabyte recording).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/videos/recordings

Parameters

* Name (string) - Optional. The filename of the video recording to download. If not supplied, the default filename of `misty_video` is used.

Return Values

* An .mp4 video file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

### GetVideoRecordingsList

Obtains a list of filenames for each video recording saved to Misty's local storage.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only returns a list of the video recordings that Misty has created. This list does not include user-uploaded video files. User-uploaded video assets appear in the response for the [`GetVideoList`](./#GetVideoList) command.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/videos/recordings/list

Parameters

* None

Return Values

* result (array) - A comma-separated list of filenames for each video recording saved to Misty's local storage. Filenames do not include the file type extension. Misty saves all video recordings as `.mp4` files.

### RenameVideoRecording

Renames an existing video recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only renames a video recording that Misty has created. You cannot use this command to rename a user-uploaded video file.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/videos/recordings/rename

Parameters

* OldName (string) - The current (old) filename of the video recording to rename, without the file type extension.
* NewName (string) - The new filename to associate with the video recording, without the file type extension. The name of a video recording can only include uppercase and lowercase alphanumeric characters, hyphens, and underscores (`[a-zA-Z0-9_-]`). Do not supply a file type extension; the system automatically uses the `.mp4` extension for Misty's video recordings. 

```JSON
{
  "OldName": "oldVideoRecordingName",
  "NewName": "newVideoRecordingName"
}
```

Return Values

* Result (boolean) - Returns `true` if no errors related to this command.

### Speak

Misty speaks a string of text out loud. By default, Misty speaks in US English.


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

Endpoint: POST &lt;robot-ip-addres&gt;/api/tts/speak

Parameters

* Text (string) - The text to speak, along with any relevant SSML tags to customize speech synthesis.
* Flush (bool) - Optional. Whether to flush all previously enqueued `Speak` commands. Default is `false`.
* UtteranceId (string) - Optional. The identifier for this instance of the `Speak` command. For use with additional features not yet implemented.

```JSON
{ 
  "Text": "<speak>You say, <phoneme alphabet=\"XSAMPA\" ph=\"pI`kA:n\">pecan</phoneme>. I say, <phoneme alphabet=\"XSAMPA\" ph=\"pi.k{n\">pecan</phoneme>. </speak>",
  "Flush": false,
  "UtteranceId": "First"
}
```

Returns

* Result (array) - Returns `true` if no errors related to this command.

### StartAvStreaming

Starts Misty streaming audio and video from her microphones and RGB camera to an external source.

{{box op="start" cssClass="boxed warningBox"}}
**Important!** Misty's AV stream is **NOT** encrypted at this time. Devices on the same network as your robot (or in between your robot and the streaming server or client) can intercept the stream, play back the content, and re-publish the stream outside of your local network. Additionally, you are responsible for securing and encrypting any media content you choose to stream from Misty to services or devices outside of your local network.
{{box op="end"}}

Valid resolutions (as `width` x `height`) for AV streaming are: 1920 x 1280, 1280 x 960, 640 x 480, and 320 x 240.

Misty supports the following modes for AV streaming:

* Misty can transmit a live audio and video data stream to an external media server that you configure to run on the same network as the robot. Misty supports streaming over Real-Time Media Protocol (RTMP) or Real Time Streaming Protocol (RTSP). You must create and host the media server yourself and configure the server to publish a stream you can view with a streaming client (like [VLC](https://www.videolan.org/vlc/)). 
* Misty can serve an RTSP stream herself, and you can view the stream with a client connected to the same network as the robot.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For lowest latency use RTSP instead of RTMP. To decrease latency further, adjust the network caching settings for your streaming client.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Notes:**

* By default, Misty's AV streaming service is disabled when the robot boots up. You must enable this service before you can start AV streaming. You can enable the AV streaming service with the [`EnableAvStreamingService`](./#enableavstreamingservice) command.
* Enabling the AV streaming service automatically disables Misty's camera service. Misty cannot take pictures, record videos, or use computer vision functionality (such as face detection or face recognition) while the AV streaming service is enabled. For more information, see [AV Streaming Service](../../../misty-ii/robot/misty-ii/#av-streaming-service).
* Misty's AV streaming service is unidirectional at this time. You can stream audio and video from Misty to an external device, but the robot cannot play live media streams.
* Misty's video stream is rotated 90 degrees counterclockwise. You can rotate the stream to the orientation you prefer by changing the settings in your streaming client.
* This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/avstreaming/start

Parameters

* URL (string) - **Option 1**: If transmitting a stream from Misty to an external media server, this value is the URL address for the streaming server. This value **must** match the URL used when you set up the streaming server. You must prefix the URL with either `rtmp://` or `rtsp://`, depending on the streaming protocol you want to use. **Option 2:** To use Misty as her own media server, use `rtspd:<port-number>`, where `<port-number>` is the port through which to publish the stream (for example, `rtspd:1935`). When the stream is live, you can view it in your media client by connecting to `rtsp://<robot-ip-address>:<port-number>` (for example, `rtsp://192.168.7.30:1935`).
* Width (int) - Optional. The width (in pixels) of the video stream. The default resolution for video streaming (as `width` x `height`) is 1920 x 1080.
* Height (int) - Optional. The height (in pixels) of the video stream. The default resolution for video streaming (as `width` x `height`) is 1920 x 1080.
* FrameRate (int) - Optional. The frame rate at which Misty streams video. You must use a value greater than `1` and less than `30`. Default is `30`.  
* VideoBitRate (int) - Optional. The bitrate (in bits per second) at which to encode streamed video data. Defaults to `5000000` (5 mbps). Valid values are between `256000` (256 kbps) and `20000000` (20 mbps).  
* AudioBitRate (int) - Optional. The bitrate (in bits per second) at which to encode streamed audio data. Defaults to `128000` (128 kbps). Valid values are between `32000` (32 kbps) and `1000000` (1 mbps). 
* AudioSampleRateHz (int) - Optional. The sample rate (in hz) at which to record audio for the audio stream. Defaults to `44100` (44.1 kHz).
* UserName (string) - Optional. The username a stream must supply to transmit media to your external server. Not all servers require a username and password. You can change whether to require credentials when you set up your server.
* Password (string) - Optional. The password for connecting to your external media server.

```JSON
// This example sets Misty up to act as her own media server. Connect
// to this stream from a client on the same network as Misty. The URL
// for this stream would be: rtsp://<robot-ip-address>:1936
{
  "URL": "rtspd:1936",
  "Width": 640,
  "Height": 480
}
```

Return Values

* Result (boolean) - Returns `true` if no errors related to this command.

### StartFaceDetection

Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call StopFaceDetection.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/detection/start

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartFaceTraining

Trains Misty to recognize a specific face and applies a user-assigned ID to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call CancelFaceTraining.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/training/start

Parameters

* FaceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.

```json
{
  "FaceId": "Joe_Smith"
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartFaceRecognition

Directs Misty to recognize a face she sees, if it is among those she already knows. To use this command, you previously must have used either the `StartFaceDetection` command or the `StartFaceTraining` command to detect and store one or more face IDs in Misty's memory.

When you are done having Misty recognize faces, call StopFaceRecognition.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/recognition/start

Parameters

* None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartKeyPhraseRecognition

Starts Misty listening for the "Hey, Misty!" key phrase. Additionally, configures Misty to record speech she detects after recognizing the key phrase. Misty's chest LED blinks blue when she is recording audio or listening for the key phrase.

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording with the `MaxSpeechLength` parameter.

There are two event types associated with key phrase recognition:

* Misty triggers a [`KeyPhraseRecognized`](../../../misty-ii/robot/sensor-data/#keyphraserecognized) event each time she recognizes the "Hey, Misty" key phrase.
* Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/keyphrase/start

Parameters

* CaptureSpeech (bool) - Optional. If `true`, Misty starts recording speech after recognizing the "Hey, Misty" key phrase. By default, Misty saves speech recordings under the filename `capture_HeyMisty.wav`. Defaults to `true`.
*   MaxSpeechLength (int) - Optional. The maximum duration (in milliseconds) of the speech recording. If the length of an utterance exceeds this duration, Misty stops recording after the duration has elapsed, and the system triggers a VoiceRecord event with a message that Misty did not detect the end of the recorded speech. Range: 500 to 20000. Defaults to 7500 (7.5 seconds).  
* OverwriteExisting (bool) - Optional. If `true`, the captured speech recording overwrites any existing recording saved under the filename `capture_HeyMisty.wav`. If `false`, Misty saves the speech recording under a unique, timestamped filename: `capture_HeyMisty_{Day}-{Month}-{Year}-{Hour}-{Minute}.wav`. Defaults to `true`. **Note:** If you program Misty to save each unique speech recording, you should occasionally delete unused recordings to prevent them from filling the memory on the robot's 820 processor.
* SilenceTimeout (int) - Optional. The maximum duration (in milliseconds) of silence that can precede speech before the speech capture mechanism times out. If Misty does not detect speech before the `SilenceTimeout` duration elapses, she stops listening for speech and triggers a `VoiceRecord` event with a message that she did not detect the beginning of speech. Range: `500` to `10000`. Defaults to `5000` (5 seconds).

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.


{{box op="start" cssClass="boxed noteBox"}}
**Notes**

* When you issue a `StartKeyPhraseRecognition` command, Misty listens for the key phrase by continuously sampling audio from the environment and comparing that audio to her trained key phrase model ("Hey, Misty!"). Misty does **not** create or save audio recordings until **after** she recognizes the key phrase.
* Because Misty cannot record audio and listen for the "Hey, Misty!" key phrase at the same time, she stops listening for the key phrase when issued a separate command to start recording audio. To have Misty start listening for the key phrase after capturing speech, you must issue another `StartKeyPhraseRecognition` command.
* When Misty recognizes the key phrase, she automatically stops listening for key phrase events. In order to start Misty listening for the key phrase again, you need to issue another `StartKeyPhraseRecognition` command.

Follow these steps to code Misty to respond to the "Hey, Misty!" key phrase:

1. Invoke the `StartKeyPhraseRecognition` command. If needed, use the optional parameters to configure Misty's speech capture settings.
2. Register an event listener for `KeyPhraseRecognized` event messages to trigger a callback function when Misty recognizes the key phrase.
3. Register an event listener for `VoiceRecord` event messages to trigger a callback function when Misty captures a speech recording.
4. Write the code to handle what Misty should do when she recognizes the key phrase and captures a speech recording. For example, you might have Misty send the captured speech off to a third-party service for additional processing.
{{box op="end"}}

### StartRecordingAudio

Starts Misty recording audio. Misty saves audio recordings to her local storage as .wav files. To stop recording, you must call the `StopRecordingAudio` command.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/start

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** If you do not issue a `StopRecordingAudio` command, Misty will continue recording until the audio file is 1 GB. Attempting to retrieve a file this large from Misty can cause the system to crash.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty cannot record audio and listen for the "Hey, Misty!" key phrase at the same time. Recording audio automatically disables [key phrase recognition](./#startkeyphraserecognition).
{{box op="end"}}

Parameters
* FileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartRecordingVideo

Starts recording video with Misty's 4K Camera.

Valid resolutions (as `Width` x `Height`) for recording videos are: 3840 x 2160, 1920 x 1080, 1280 x 960, 640 x 480, and 320 x 240.

The videos Misty records with her RGB camera are rotated 90 degrees counterclockwise, and the width and height values listed above may be swapped for the actual video that Misty returns when you call this command. Video recordings that Misty creates have orientation information that enables media players to rotate and play back the video using the correct orientation; however, if you play the video in certain players, you will see that the actual video file itself is rotated 90 degrees counterclockwise.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Recording videos at 3840 x 2160 changes the max resolution for taking pictures to 3840 x 2160. If you record video at 1920 x 1080 (or lower), then Misty can use the highest resolution for taking pictures. If you try to record at 3840 x 2160 while using the highest resolution for taking pictures, the system automatically lowers the resolution for taking pictures to 3840 x 2160.

When Misty powers on, she starts a new camera session with a default resolution setting of 1920 x 1080 for recording videos. If you record a video without specifying a resolution, Misty uses the resolution that's already set in the current camera session. When you specify a different resolution than what is set in the current camera session, Misty resets the camera session to use the new resolution for recording videos. This has the following implications:

* Misty cannot reset the camera session while actively recording video. If you try to take a picture at a new resolution while Misty is recording video, she takes a picture with the resolution settings for the current camera session (instead of the new resolution that you asked for).
* If Misty is already performing computer vision (CV) activities when the camera session resets, these activities automatically resume when the new camera session is ready. For more information, see the article on [Picture and Video Resolution](../../../misty-ii/robot/misty-ii/#picture-and-video-resolution).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/videos/recordings/start
**Deprecated**: POST &lt;robot-ip-address&gt;/api/video/record/start

Parameters

* FileName (string) - Optional. The filename for the recorded video. Video recordings can only include uppercase and lowercase alphanumeric characters, hyphens, and underscores (`[a-zA-Z0-9_-]`). Do not supply a file type extension; the system automatically adds an extension of `.mp4`. If you do not supply a filename, the video recording is saved with the default filename of `misty_video`. **Important:** When you record a video with the same filename of a video that already exists on the robot, the new video recording automatically overwrites the existing recording.
* Mute (bool) - Optional. Whether to mute audio while recording. Default is `false`.
* Duration (int) - Optional. How long (in seconds) to record. Must be greater than `0`. The max duration for a video recording is 180 seconds (3 minutes). If you do not specify a value, Misty automatically stops recording after 30 seconds (default), or upon receiving a [`StopRecordingVideo`](./#stoprecordingvideo) command.
* Width (int) - Optional. Sets the resolution width (in pixels) for the video recording. When you specify a resolution, you must pass in values for both `Width` and `Height`. See the command description for a list of valid resolutions.
* Height (int) - Optional. Sets the resolution height (in pixels) for the video recording. When you specify a resolution, you must pass in values for both `Width` and `Height`. See the command description for a list of valid resolutions. 

```json
{
	"FileName": "MyVideo",
	"Mute": false,
	"Duration": 60,
	"Width": 1920,
	"Height": 1080
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopAvStreaming

Stops Misty streaming audio and video.

Endpoint: POST &lt;robot-ip-address&gt;/api/avstreaming/stop

Parameters

* None

Return Values

* Result (bool) - Returns `true` if no errors related to this command.

### StopFaceDetection

Stops Misty's detection of faces in her line of vision.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/detection/stop

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopFaceRecognition
Stops the process of Misty recognizing a face she sees.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/recognition/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopKeyPhraseRecognition

Stops Misty listening for the "Hey, Misty!" key phrase.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/keyphrase/stop

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopRecordingAudio
Directs Misty to stop the current audio recording. You must use this command after calling the `StartRecordingAudio` command. If you do not call `StopRecordingAudio`, Misty automatically stops recording after 60 seconds.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/stop

Parameters
* None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopRecordingVideo

Stops recording video with Misty's 4K camera.

If you do not call the `StopRecordingVideo` command, Misty automatically stops recording after the duration for the recording has elapsed. You set this duration when you call the [`StartRecordingVideo`](./#startrecordingvideo) command. The default video recording duration is 30 seconds.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/videos/recordings/stop<br>
**Deprecated Endpoint**: POST &lt;robot-ip-address&gt;/api/video/record/stop

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### TakePicture

Takes a picture with Misty’s RGB camera. Optionally, saves the picture to Misty's local storage.

Valid resolutions (as `Width` x `Height`) for taking pictures are: 4160 x 3120, 3840 x 2160, 3264 x 2448, 3200 x 2400, 2592 x 1944, 2048 x 1536, 1920 x 1080, 1600 x 1200, 1440 x 1080, 1280 x 960, 1024 x 768, 800 x 600, 640 x 480, and 320 x 240.

These width and height values are reversed for the actual image that Misty returns when you call this command. The pictures Misty takes with her RGB camera are rotated 90 degrees counterclockwise. Misty reorients each picture 90 degrees clockwise during the encoding process.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Recording videos at 3840 x 2160 changes the max resolution for taking pictures to 3840 x 2160. If you record video at 1920 x 1080 (or lower), then Misty can use the highest resolution for taking pictures. If you try to record at 3840 x 2160 while using the highest resolution for taking pictures, the system automatically lowers the resolution for taking pictures to 3840 x 2160.

When Misty powers on, she starts a new camera session with a default resolution setting of 4160 x 3120 for taking pictures. If you take a picture without specifying a resolution, Misty uses the resolution that's already set in the current camera session. When you specify a different resolution than what is set in the current camera session, Misty resets the camera session to use the new resolution for taking pictures. This has the following implications:

* Misty cannot reset the camera session while actively recording video. If you try to take a picture at a new resolution while Misty is recording video, she takes a picture with the resolution settings for the current camera session (instead of the new resolution that you asked for).
* If Misty is already performing computer vision (CV) activities when the camera session resets, these activities automatically resume when the new camera session is ready. For more information, see the article on [Picture and Video Resolution](../../../misty-ii/robot/misty-ii/#picture-and-video-resolution).
{{box op="end"}}


Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/rgb

Parameters

* Base64 (boolean) - Sending a request with `true` returns the image data as a downloadable Base64 string, while sending a request of `false` displays the photo in your browser or REST client immediately after it is taken. Default is `false`.
* FileName (string) - Optional. The filename to assign to the image file for the captured photo. If you do not supply a filename, Misty does not save the photo.
* Width (integer) - Optional. The desired image width (in pixels). When you specify a resolution, you must pass in values for both width and height. See the command description for a list of valid resolutions.
* Height (integer) -  Optional. The desired image height (in pixels). When you specify a resolution, you must pass in values for both width and height. See the command description for a list of valid resolutions.
* DisplayOnScreen (boolean) - Optional. If `true` **and** a `FileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `FileName` value is provided, does nothing.
* OverwriteExisting (boolean) - Optional. Indicates whether Misty should overwrite an image with the same filename as the captured photo if one exists on her local storage. Passing in `true` overwrites a file with the same name. Passing in `false` prevents an existing file with the same name from being overwritten. In the case that `OverwriteExisting` is set to `false` and a photo already exists with the same filename as the newly captured photo, the new photo is not saved to Misty. Defaults to `false`.

```json
{
  "Base64": true,
  "FileName": "MyPicture",
  "Width": 800,
  "Height": 600,
  "DisplayOnScreen": true,
  "OverwriteExisting": true
}
```

Return Values

* Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for Base64.
  * Base64 (string) - A string containing the Base64-encoded image data.
  * ContentType (string) - The type and format of the image returned.
  * Height (integer) - The height of the image in pixels.
  * Name (string) - The name of the image.  
  * Width (integer) - The width of the image in pixels. 

## Skill Management

### CancelSkill

Stops a specified running skill (or all running skills if no name is specified).

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/cancel

Parameters

* Skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.

```json
{
	"Skill": "523c7187-706e-4313-a657-0fa11d8bbdd4"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

### DeleteSkill

Removes the code, meta, and asset files for a skill from Misty's memory.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/skills?Skill=&lt;unique-id&gt;

Arguments

* Skill (string) - The unique ID of the skill to delete.

Returns

* Result (array) - Returns `true` if no errors related to this command.


### GetRunningSkills

Obtains a list of the skills currently running on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/skills/running

Parameters

- None

Return Values

- result (array) - A list of objects with meta information about the skills currently running on Misty. If no skills are currently running, this call returns an empty array. Each object in the list includes the following key-value pairs:
  - description (string) - The description of the skill as it appears in the skill's meta file.
  - name (string) - The name of the skill as it appears in the skill's meta file.
  - startupArguments (object) - An object with key-value pairs for each startup argument in the skill's meta file.
  - uniqueId (string) - The unique id of the skill as it appears in the skill's meta file.

```JSON
// SAMPLE RESULT
"result":[  
    {  
        "description":"A simple skill for Misty.",
        "name":"HelloWorld",
        "startupArguments":{  
            "skill":"HelloWorld",
            "uniqueId":"28c7cb66-91d4-4c8f-a8af-bb667ce18099"
        },
        "uniqueId":"28c7cb66-91d4-4c8f-a8af-bb667ce18099"
    }
]
```

### GetSkills

Obtains a list of the skills currently uploaded onto the robot.

Endpoint: GET &lt;robot-ip-address&gt;/api/skills

Parameters
* (None)

Return Values
* Result (array) - An array containing the names and meta file information for all of the skills on the robot.

### LoadSkill

Makes a previously uploaded skill available for the robot to run and updates the skill for any changes that have been made.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/load

Parameters

* Skill (string) - The unique GUID identification string for the skill to load.

```json
{
  "Skill": "491858a1-a022-41e3-92ad-7535db0ecfdd"
}
```

Return Values

* Result (boolean) - Returns `true` if no errors related to this request.

### ReloadSkills

Makes all previously uploaded skills available for the robot to run and updates any skills that have been edited. **Note:** The `ReloadSkills` command runs immediately, but there may be a significant delay after the call completes before all skills are fully loaded onto the robot if there are many to load.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/reload

Parameters
* (None)

Return Values
* Result (boolean) - Returns `true` if no errors related to this request. 


### RunSkill

Runs an on-robot skill that you have uploaded to Misty.

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/start

Parameters

* Skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.
* Method (string) - Optional. A specific method within a skill to run, which can be useful for testing. If no value is specified for the Method parameter, `RunSkill` by default starts running the skill from the beginning.

```json
{
  "Skill": "523c7187-706e-4313-a657-0fa11d8bbdd4",
  "Method": "methodName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.


### SaveSkillToRobot
Uploads a skill to the robot and makes it immediately available for the robot to run.

**Note:** To send a file with this request, make sure to set the `content-type` in the header of the `POST` call to `multipart/form-data`.

Endpoint: POST &lt;robot-ip-address&gt;/api/skills

Parameters

* File (file) - A zipped file containing the two skill files and any images or audio files you want to associate with the skill. The code and meta files (one JSON meta file and one JavaScript code file) should have the same name. For more details, see the [File Structure & Code Architecture](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#file-structure-amp-code-architecture) section.
* ImmediatelyApply (boolean) - Specifies whether Misty immediately runs the uploaded skill.
* OverwriteExisting (boolean) - Indicates whether the skill should overwrite a skill with the same name, if one currently exists on Misty.

```json
{
  "File" : "SkillName.zip",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - A list of key-value pairs with the names of the code and meta skill files saved to the robot.



## System

### AllowRobotUpdates

Changes the robot's settings to allow Misty II to automatically install system updates. Misty is configured to automatically download and install system updates by default. To prevent system updates, you must issue a `PreventRobotUpdates` command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/system/update/allow

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### ClearErrorText

Force-clears an error message from Misty’s display. 

**Note:** This command is provided as a convenience. You should not typically need to call `ClearErrorText`.

Endpoint: POST &lt;robot-ip-address&gt;/api/text/error/clear <br>
**Deprecated Endpoint**: POST &lt;robot-ip-address&gt;/api/text/clear

Parameters
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### ConnectToSavedWifi

Connects Misty to a saved Wi-Fi network.

Endpoint: POST &lt;robot-ip-address&gt;/api/networks

Parameters

* NetworkId (string) - The name of the network to connect to.

```JSON
{
  "NetworkID": "MyNetworkName"
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### DisableAudioService

Disables the audio service running on Misty's 820 processor.

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
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with the audio service enabled.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/services/audio/disable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### DisableAvStreamingService

Disables the audio and video (AV) streaming service running on Misty's 820 processor.

Disabling a specific service frees up memory on the 820 processor for other tasks, and can improve the performance of other services that use the same processor. As an example, you may consider disabling the AV streaming service before calling commands that use Misty's simultaneous localization and mapping (SLAM) system to improve the performance of SLAM activities.

Misty cannot execute commands that use the AV streaming service when the service is disabled. These commands include:

* `StartAvStreaming`
* `StopAvStreaming`

{{box op="start" cssClass="boxed noteBox"}}
**Note:**  By default, the AV streaming service is disabled when Misty boots up. The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/services/avstreaming/disable

Parameters

* None

Return Values

* result (boolean) - Returns `true` if no errors related to this command. 

### DisableCameraService

Disables the camera service running on Misty's 820 processor.

Disabling a specific service frees up memory on the 820 processor for other tasks, and can improve the performance of other services that use the same processor. As an example, you may consider disabling the audio and camera services before you start mapping or tracking within a map to improve the performance of Misty's simultaneous localization and mapping (SLAM) activities.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. By default, the camera service is enabled when Misty boots up. 
{{box op="end"}}

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
* `GetVideoRecording`
* `GetVideoRecordingsList`
* `DeleteVideoRecording`
* `RenameVideoRecording`

**Camera Service Event Types**
* `FaceRecognition`
* `FaceTraining`

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with the camera service enabled.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/services/camera/disable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### DisableSlamService

Disables the SLAM service running on Misty's 820 processor.

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
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with the SLAM service enabled.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/services/slam/disable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### EnableAudioService

Enables the audio service running on Misty's 820 processor.

For more information about disabling and enabling the audio service, see the [`DisableAudioService`](./#disableaudioservice) command description.

Endpoint: POST &lt;robot-ip-address&gt;/api/services/audio/enable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### EnableAvStreamingService

Enables the audio and video (AV) streaming service running on Misty's 820 processor.

For more information about enabling and disabling the AV streaming service, see the [`DisableAvStreamingService`](.#disableavstreamingservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, the AV streaming service is disabled when Misty boots up. The camera service and the AV streaming service cannot be enabled at the same time. Issuing a command to enable one of these services automatically disables the other.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/services/avstreaming/enable

Parameters

* None

Return Values

* result (boolean) - Returns `true` if no errors related to this command. 

### EnableCameraService

Enables the camera service running on Misty's 820 processor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. By default, the camera service is enabled when Misty boots up. 
{{box op="end"}}

For more information about disabling and enabling the camera service, see the [`DisableCameraService`](./#disablecameraservice) command description.

Endpoint: POST &lt;robot-ip-address&gt;/api/services/camera/enable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### EnableSlamService

Enables the SLAM service running on Misty's 820 processor.

For more information about disabling and enabling the SLAM service, see the [`DisableSlamService`](./#disableslamservice) command description.

Endpoint: POST &lt;robot-ip-address&gt;/api/services/slam/enable

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### ForgetWifi

Deletes information about a Wi-Fi network from Misty’s list of saved networks. If you send this command without any parameters, Misty deletes information for all of her saved networks.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/networks

Parameters

* NetworkId (string) - Optional. The network to remove from Misty’s list of saved networks.

```JSON
{
  "NetworkId": "NetworkToForget"
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### GetAvailableWifiNetworks

Obtains a list of local Wi-Fi networks and basic information regarding each.

Endpoint: GET &lt;robot-ip-address&gt;/api/networks/scan

Parameters

* None

Return Values

* Result (array) - An array containing one element for each Wi-Fi network discovered. Each element contains the following:
   * Name (string) - The name of the Wi-Fi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns a value of `true` if the network is secure. Otherwise, `false`.

### AudioServiceEnabled

Describes whether the audio service running on Misty's 820 processor is currently enabled.

For more information about enabling and disabling the audio service, see the [`DisableAudioService`](./#disableaudioservice) command description.

Endpoint: GET &lt;robot-ip-address&gt;/api/services/audio

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if the audio service is enabled. Otherwise, `false`.

### AvStreamingServiceEnabled

Describes whether the audio and video (AV) streaming service that runs on Misty's 820 processor is currently enabled.

For more information about enabling and disabling the AV streaming service, see the [`DisableAvStreamingService`](./#disableavstreamingservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, the AV streaming service is disabled when Misty boots up. The camera service and the AV streaming service cannot be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. 
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/services/avstreaming

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if the AV streaming service is enabled. Otherwise, `false`.

### GetBatteryLevel

Obtains Misty's current battery level, along with other information about the battery.

Endpoint: GET &lt;robot-ip-address&gt;/api/battery

Parameters
- None

Return Values
* Result (object) - An object with information about the status of Misty's battery. Includes the following properties:
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

Sample response data:

```JSON
{
 "result": {
  "chargePercent": null,
  "created": "2019-07-23T16:36:27.8514937Z",
  "current": 0.174,
  "expiry": "2019-07-23T16:36:37.8514937Z",
  "healthPercent": null,
  "isCharging": true,
  "sensorId": "charge",
  "sensorName": "/Sensors/RTC/BatteryCharge",
  "state": "Charging",
  "temperature": 16,
  "trained": false,
  "voltage": 8.364
 },
 "status": "Success"
}
```

### CameraServiceEnabled

Describes whether the camera service running on Misty's 820 processor is currently enabled.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. By default, the camera service is enabled when Misty boots up. 
{{box op="end"}}

For more information about enabling and disabling the camera service, see the [`DisableCameraService`](./#disablecameraservice) command description.

Endpoint: GET &lt;robot-ip-address&gt;/api/services/camera

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if the camera service is enabled. Otherwise, `false`.

### GetCameraData

Obtains current properties and settings for Misty's 4K camera.

Endpoint: GET &lt;robot-ip-address&gt;/api/camera

Parameters

* None

Return Values

* Result (object) - An object with details about the current properties and settings for Misty's 4K camera. Includes the following key/value pairs:
  * droppedFrames (int) - Number of dropped frames.
  * fpsActual (double) -  Actual frames per second.
  * fpsRequested (double) - Requested frames per second.
  * height (double) - Camera image height (in pixels).
  * width (double) - Camera image width (in pixels).

### GetDeviceInformation

Obtains device-related information for the robot.

Endpoint: GET &lt;robot-ip-address&gt;/api/device

Parameters
- None

Return Values
* Result (object) - An object containing information about the robot, with the following fields.
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

Example response:

```JSON
{
  "result": {
    "androidHardwareId": "2d41343ad7a9c631",
    "androidOSVersion": "OpenQ820_O_v4.1-OPM1.171019.026-scripts1.0.1-patch1.0.5",
    "batteryLevel": {
      "chargePercent": 1,
      "created": "2020-01-10T20:31:40.5321323Z",
      "current": -0.431,
      "healthPercent": 0.37,
      "isCharging": false,
      "sensorId": "charge",
      "state": "Charged",
      "temperature": 0,
      "trained": true,
      "voltage": 8.303
    },
    "currentNetworkId": 0,
    "currentProfileName": "DiamondMondays",
    "hardwareInfo": {
      "rtcBoard": {
        "boardId": "622607-540160565",
        "firmware": "1.9.2.171",
        "hardware": "75.0"
      },
      "mcBoard": {
        "boardId": "3407904-540488760",
        "firmware": "1.9.2.171",
        "hardware": "74.0"
      }
    },
    "ipAddress": "192.168.7.183",
    "networkConnectivity": "InternetAccess",
    "occipitalDeviceInfo": {
      "occipitalDriverVersion": null,
      "occipitalFirmwareVersion": null,
      "occipitalSerialNumber": null
    },
    "outputCapabilities": {
      "locomotion": "VyExVx",
      "actuator_HeadYaw": "2ABzJD",
      "actuator_HeadPitch": "Awb61F",
      "/Robot/DriveRaw/": "3nQDqK",
      "actuator_HeadRoll": "QSygCx",
      "actuator_RightArm": "dYV1Vt",
      "/Robot/HardwareController/": "v1wxLR",
      "actuator_LeftArm": "NBQEA0",
      "/Robot/AudioPlayback/speaker": "uDbbHh",
      "illumination": "KGBxV2",
      "/Robot/HdtDrive/": "KSV8O7",
      "resetImu": "a8RSHl",
      "/Robot/Display": "GHZjI7",
      "flashlight": "fi1CLM",
      "/Robot/TorsoRaw/": "VvNiY3",
      "halt": "y8arjY",
      "messageStream": "DypFfI",
      "user1": "QUZZTJ",
      "locomotionTrack": "a4Sia0",
      "firmwareConfiguration": "a7nu1I",
      "user2": "XXMSQe"
    },
    "robotId": "00A0C633B7CC-00800F117000~2d41343ad7a9c631~622607-540160565~3407904-540488760~x",
    "robotVersion": "1.9.2.10155",
    "sensorCapabilities": {
      "toF_Right": "toffr",
      "toF_Left": "toffl",
      "actuator_HeadYaw": "ahy",
      "actuator_HeadPitch": "ahp",
      "toF_DownBackRight": "tofdrr",
      "/Sensors/RTC/BatteryCharge": "charge",
      "currentSensor_HeadRoll": "cshr",
      "currentSensor_LeftArm": "csla",
      "currentSensor_RightTrack": "csrt",
      "actuator_HeadRoll": "ahr",
      "/Sensors/RTC/IMU": "imu",
      "actuator_RightArm": "ara",
      "bump_RearRight": "brr",
      "/Sensors/HardwareInfo/RtcBoard": "RtcBoard",
      "/Sensors/RTC/FirmwareLoggingReceiver": "fwlrec",
      "toF_DownFrontLeft": "tofdfl",
      "actuator_LeftArm": "ala",
      "hazardNotificationSensor": "hzrd",
      "/Sensors/HardwareInfo/McBoard": "McBoard",
      "/Sensors/OccipitalSlam": "slam",
      "hallucinated_OnlyOne": "hallucinated",
      "/Sensors/Microphone": "mic",
      "/Sensors/CapTouch": "cap",
      "currentSensor_LeftTrack": "cslt",
      "/Sensors/Pru": "pru",
      "currentSensor_HeadYaw": "cshy",
      "/Sensors/StringSensor": "string",
      "bump_FrontRight": "bfr",
      "toF_Back": "tofr",
      "driveEncoders": "enc",
      "toF_Center": "toffc",
      "bump_RearLeft": "brl",
      "bump_FrontLeft": "bfl",
      "toF_DownFrontRight": "tofdfr",
      "toF_DownBackLeft": "tofdrl",
      "currentSensor_RightArm": "csra",
      "currentSensor_HeadPitch": "cshp",
      "cV_4k": "cv"
    },
    "sensoryServiceAppVersion": "1.9.2",
    "serialNumber": "20193402645",
    "windowsOSVersion": "10.0.17763.253"
  },
  "status": "Success"
}
```

### GetHelp

Obtains information about a specified API command. Calling `GetHelp` with no parameters returns a list of all the API commands that are available.

Endpoint:

* GET &lt;robot-ip-address&gt;/api/help for a list of commands and endpoints
* GET &lt;robot-ip-address&gt;/api/help?command=endpoint/path for information on a specific endpoint. Example: `<robot-ip-address>/api/help?command=audio/play`

Parameters

* None

Return Values

* Result (string) - A string containing the requested help information.

### GetSavedWifiNetworks

Obtains Misty's list of saved network IDs.

Endpoint: GET &lt;robot-ip-address&gt;/api/networks

Parameters

* None

Return Values

* Result (array) - An array of objects with data about Misty's saved Wi-Fi networks.

Example JSON response for a successful request:

```JSON
{
  "result": [
    {
      "bssid": null,
      "detailedState": null,
      "frequency": 0,
      "hidden": false,
      "ipAddress": null,
      "linkSpeed": 0,
      "networkId": 0,
      "physicalAddress": null,
      "ssid": "\"NetworkName\"",
      "status": "Unknown",
      "supplicantState": null
    }
  ],
  "status": "Success"
}
```

### GetLogFile

Obtains log file data.

If no date is specified, pulls up to 3MB of the most recent log data from log files up to 14 days old. Log data returns in ascending order by date and time. If all log data exceeds 3MB, the oldest entry returned may be truncated.

If a date is specified, pulls up to 3MB of log data from that date. If log data from that date exceeds 3MB, the oldest entry may be truncated.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty stores log files only for the most recent 14 day period. Log files from before this period are automatically cleared from the robot's local storage.
{{box op="end"}}


Endpoint:

* GET &lt;robot-ip-address&gt;/api/logs for log data from current date
* GET &lt;robot-ip-address&gt;/api/logs/?date=&lt;date string&gt; for a specific date

Examples:

`<robot-ip-address>/api/logs` for current date.

`<robot-ip-address>/api/logs?date=2019/7/24`

`<robot-ip-address>/api/logs?date=July/24/2019`

Parameters
- Date (string) - Optional. The date of the log file to obtain. Dates must be formatted as: `MonthName/Date/FourDigitYear` or `FourDigitYear/MonthNumber/Date`.

Return Values

* Result (string) - Compiled log file data. Or, an error if the date is invalid or no log data is found.

### GetLogLevel

Obtains the current local and remote log level.

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

Endpoint: GET &lt;robot-ip-address&gt;/api/logs/level

Parameters

* None

Return Values

* result (string) - A an object with values indicating the current remote and local log levels. Includes the following key/value pairs:
  *  `local` (string) - The current local log level.
  *  `remote` (string) - The current remote log level.

```json
{
 "result": {
  "local": "Debug",
  "remote": "Info"
 },
 "status": "Success"
}
```

### GetRobotUpdateSettings

Obtains the robot's update settings and a timestamp for the last update attempt.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/system/update/settings

Parameters

* None

Return Values

* allowRobotUpdates (bool) - Indicates whether Misty is currently set to prevent or allow automatic system updates.
* lastUpdateAttempt (string) - Timestamp for the last update attempt.

```JSON
{
    "result": {
        "allowRobotUpdates": true,
        "lastUpdateAttempt": "2020-01-24T03:40:42.5573222Z"
    },
    "status": "Success"
}
```

### SlamServiceEnabled

Describes whether the SLAM service running on Misty's 820 processor is currently enabled.

For more information about enabling and disabling the SLAM service, see the [`DisableSlamService`](./#disableslamservice) command description.

Endpoint: GET &lt;robot-ip-address&gt;/api/services/slam

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if the SLAM service is enabled. Otherwise, `false`.

### GetStoreUpdateAvailable

Checks whether a system update is available. 

Endpoint: &lt;robot-ip-address&gt;/api/system/updates

Parameters

* None

Return Values

* Result (boolean) - Returns a value of `true` if an update is available. Otherwise, `false`.

### GetWebsocketNames

Obtains information about a specified WebSocket class. Calling `GetWebsocketNames` with no parameters returns information about all of Misty’s available WebSocket connections.

**Note:** For examples of subscribing to WebSocket data, see the sample skills in the MistyCommunity GitHub repo. For more detailed information about each of Misty’s WebSocket connections, see [Event Types](../../../misty-ii/robot/sensor-data/).

Endpoint:

GET &lt;robot-ip-address&gt;/api/websockets for information about all of Misty’s available WebSocket connections.

GET &lt;robot-ip-address&gt;/api/websockets?websocketClass=&lt;websocket-class-name&gt; for information about a specific WebSocket class. 

Example:

```
<robot-ip-address>/api/websockets?websocketClass=TimeOfFlight
```

Parameters

* websocketClass (string) - Optional. Specifies the WebSocket class to obtain information about. 

Return Values

* result (array) - An array of data objects with information about the WebSocket connections to which you can subscribe. The data object for each WebSocket class includes the following information:
  * class (string) - The name of a given WebSocket class.
  * nestedProperties (array) - A list of properties for a given WebSocket class. Use these properties to declare conditions for events you want to receive information about when subscribing to messages from a WebSocket data stream.

```json
{"result": [ { 
   "class": "TimeOfFlight",
   "nestedProperties": [ "SensorPosition", "DistanceInMeters", "Created", "Expiry", "SensorId", "SensorName" ]
} ]
```

### GetWebsocketVersion

Returns a string indicating which version of Misty's WebSocket system is currently in use.

* If `Current`, WebSocket event messages do not include the `SensorName` or `Type` key/value pairs. 
* If `Deprecated`, Websocket event messages do include the `SensorName` and `Type` key/value pairs.

Endpoint: GET &lt;robot-ip-address&gt;/api/websocket/version

Parameters

* None

Return Values

* version (string): The version of Misty's WebSocket system currently in use. Returns `Current` or `Deprecated`.

### PerformSystemUpdate

Downloads and installs a system update if one is available.

Endpoint: POST &lt;robot-ip-address&gt;/api/system/update

Parameters

* None

Return Values

* Result (boolean) - Returns a value of `true` if an update is available. Otherwise, `false`.

### PerformTargetedUpdate

Attempts to install updates for specified components of your robot. 

**Note:** Only use this command when a system update fails to update every component of your robot. Always attempt a full system update before using this command. The version numbers for individual components are returned by the `GetDeviceInformation` command. You can make sure individual components are up-to-date by comparing these version numbers to the most recent release notes on the [Misty Community](https://community.mistyrobotics.com/) site.

Endpoint: POST &lt;robot-ip-address&gt;/api/system/update/component

Parameters
- Components (array) - A list of strings indicating the specific components to update. Use `"MC"` to update the motor controller firmware, `"RT"` to update the real-time controller firmware, and `"SensoryServices"` to update the Sensory Services application. Updates to the Sensory Services application include firmware updates for the Occipital Structure Core depth sensor.
- OverrideBatteryCheck (boolean) - Optional. Whether to override the default battery level check when attempting to perform a targeted update.

```json
{
    "Components": [ "MC", "RT", "SensoryServices" ]
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### PreventRobotUpdates

Changes the robot's settings to prevent Misty II from automatically installing system updates. To re-enable system updates, you must issue an `AllowRobotUpdates` command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}


{{box op="start" cssClass="boxed warningBox"}}
**Important:** Prevent Misty from automatically installing system updates at your own risk. 

Misty’s system updates include significant feature improvements and address performance, reliability, and security issues. The Misty Robotics organization provides customer support for the **current release only**. If you must prevent Misty from taking system updates, we recommend re-enabling updates at the earliest possible convenience.

You may choose to temporarily prevent system updates when a release includes breaking API changes that you have not had time to update in the skills and robot applications you are using in production, or when you plan to use Misty in a setting where downloading and installing a system update may be disruptive. We do not recommend preventing system updates as a long-term solution for your skills and robot applications.

When you are troubleshooting issues with your skills and applications, always make sure the current software and firmware is installed on your robot. You can find the current software and firmware versions on the [System Updates](../../../misty-ii/robot/system-updates) page in Misty’s developer documentation.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/system/update/prevent

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### RestartRobot

Restarts Misty's 410 or 820 processor.

Endpoint: POST &lt;robot-ip-address&gt;/api/reboot

Parameters:

* Core (boolean): If `true`, restarts Misty's 410 processor.
* SensoryServices (boolean): If `true`, restarts Misty's 820 processor.

```json
{
  "Core": true,
  "SensoryServices": true
}
```

Return Values:

* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetDefaultVolume

Sets the default loudness of Misty's speakers for audio playback.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/volume

Parameters
- Volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetLogLevel

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

Endpoint: POST &lt;robot-ip-address&gt;/api/logs/level

Parameters:

* LocalLogLevel (string) - The level to set for Misty's local logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.
* RemoteLogLevel (string) - The level to set for Misty's remote logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.

Return Values

* result (bool) - Returns `true` if no errors related to this command.

###  SetNetworkConnection
Connects Misty to a specified WiFi source.

Endpoint: POST &lt;robot-ip-address&gt;/api/networks/create

Parameters
- NetworkName (string) - The Wi-Fi network name (SSID).
- Password (string) - The Wi-Fi network password.

```json
{
  "NetworkName": "MyWiFi",
  "Password": "superPassw0rd"
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetNotificationSettings

Changes the settings for Misty's default hardware notifications.

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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/notification/settings

Parameters:

* RevertToDefault (bool) - Optional. Sets Misty's hardware notifications to the default settings (`true`).
* LedEnabled (bool) - Optional. Enables (`true`) or disables (`false`) the default LED notifications.
* KeyPhraseEnabled (bool) - Optional. Enables (`true`) or disables (`false`) the wake word audio notification.
* KeyPhraseFile (string) - Optional. The filename of an audio file on Misty's system that the robot should play for wake word notifications.

```JSON
{
  "LedEnabled": false,
  "KeyPhraseEnabled": true,
  "KeyPhraseFile": "<new-wakeword-sound>.wav"
}
```

Return Values:

* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetWebsocketVersion

Sets the active WebSocket system to the `Current` or `Deprecated` version of the system.

* If `Current`, WebSocket event messages do not include the `SensorName` or `Type` key/value pairs.
* If `Deprecated`, Websocket event messages do include the `SensorName` and `Type` key/value pairs.

Endpoint: POST &lt;robot-ip-address&gt;/api/websocket/version

Parameters

* version (string): The version of Misty's WebSocket system to use. Accepts `Current` or `Deprecated`.

```JSON
{
  "version": "Current"
}
```

Return Values

* Results (bool) - Returns `true` if no errors related to this command.

### StartWifiHotspot

Starts Misty II broadcasting its own wireless network.

This command lets you use Misty II as a soft access point, which is useful in environments with no local networks, or networks that Misty can't connect to (such as captive networks).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Follow these steps to use Misty as a WiFi hotspot:

1. Boot up the robot.
2. Issue a `StartWifiHotspot` command.
3. Issue a [`GetDeviceInformation`](./#getdeviceinformation) command to access the network ID and password for Misty's access point. In the `GetDeviceInformation` response data, the network ID is stored in the `currentProfileName` field, and the password is stored in the `currentPreSharedKey` field. Use these credentials to connect your computer or another WiFi enabled device to Misty's access point.
4. Use Misty's standard IP address - `192.168.43.1` - to connect to the robot and issue commands from your connected device.
5. When you are finished using Misty as an access point, issue a `StopWifiHotspot` command.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** If you plan to use Misty as a hotspot in an environment where you are unable to connect to any wireless networks, you may consider writing a JavaScript or .NET skill that runs on startup to issue the commands that create the access point. You can code Misty to display the credentials for the access point on her screen, or even to speak them out loud. Otherwise you must find a way to issue the REST API commands to start broadcasting WiFi over a separate network connection.
{{box op="end"}}

POST &lt;robot-ip-address&gt;/api/networks/hotspot/start

Parameters

* None

Return Values

* result (boolean) - Returns `true` if no errors related to this command.

### StopWifiHotspot

Stops Misty II broadcasting its own wireless network.

To enable Misty as a soft access point, follow the steps in the documentation for the [`StartWifiHotspot`](./#startwifihotspot) command.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

POST &lt;robot-ip-address&gt;/api/networks/hotspot/stop

Parameters

* None

Return Values

* result (boolean) - Returns `true` if no errors related to this command.

### UpdateBaseHazardManagementSettings

Changes the hazard system settings for Misty's bump and time-of-flight sensors.

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** Our testing shows that Misty cannot safely drive over ledges of greater than 0.06 meters. Navigating drops higher than 0.06 meters can cause Misty to tip or fall and become damaged. You may find it useful to customize these settings while testing and developing your robot's skills, but DO SO AT YOUR OWN RISK. We always recommend working with Misty on her foam block while she's operating on a high surface like a desk or table. Always supervise your robot while she is operating in a new environment, and be ready to catch her in the event that she tips over a high ledge.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The settings for Misty's hazard system reset to the default values listed in the tables below each time the robot boots up. The changes you apply with this command do not save across reboot cycles.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

The default hazards settings for Misty's bump sensors are as follows:

| **`sensorName`** | **`enabled`** |
| -- | -- |
| `Bump_FrontRight` | `true` |
| `Bump_FrontLeft` | `true` |
| `Bump_RearRight` | `true` |
| `Bump_RearLeft` | `true` |

The default hazard settings for Misty's time-of-flight sensors are as follows:

|**`sensorName`**| **`threshold`** (in meters) |
|--|--|
|`TOF_DownFrontRight`| 0.06|
|`TOF_DownFrontLeft` | 0.06|
|`TOF_DownBackRight` |0.06|
|`TOF_DownBackLeft`|0.06|
|`TOF_Right` |0.215|
|`TOF_Left`|0.215|
|`TOF_Center`|0.215|
|`TOF_Back`|0.215|

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The `UpdateBaseHazardManagementSettings` endpoint expects a JSON payload with a `Content-Type` of `application/json`.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/hazard/updatebasesettings

Parameters:

* BumpSensorsEnabled (array) - A four element array of objects that turn hazards on or off for each of Misty's bump sensors. You must include an object for each of Misty's bump sensors, but the order of these objects in the `BumpSensorsEnabled` array does not matter. Each object must include the following key/value pairs: 
  * sensorName (string) - The name of one of Misty's bump sensors. Expects `Bump_FrontRight`, `Bump_FrontLeft`, `Bump_RearRight`, or `Bump_RearLeft`.
  * enabled (boolean) - Enables or disables hazards for the correlated bump sensor. Bump sensor hazards are enabled (`true`) by default.
* TimeOfFlightThresholds (array) - An eight element array of objects that set the minimum distance that will trigger a hazard state for each of Misty's time-of-flight sensors. You must include an object for each of Misty's time-of-flight sensors, but the order of these objects in the `TimeOfFlightThresholds` array does not matter. Each object must include the following key/value pairs: 
  * sensorName (string) - The name of one of Misty's time-of-flight sensors. Expects `TOF_DownFrontRight`, `TOF_DownFrontLeft`, `TOF_DownBackRight`, `TOF_DownBackLeft`, `TOF_Right`, `TOF_Left`, `TOF_Center`, or `TOF_Back`.
  * threshold (double) - The minimum distance (in meters) that will trigger a hazard state for the correlated time-of-flight sensor. Setting the threshold to 0 for any sensor disables hazards for that sensor. Default threshold settings are listed in the table above.

```JSON
// Example JSON payload. Sets bump and time-of-flight hazard settings
// to their current default values.
{
    "bumpSensorsEnabled":[
        {"sensorName":"Bump_FrontRight","enabled":true},
        {"sensorName":"Bump_FrontLeft","enabled":true},
        {"sensorName":"Bump_RearRight","enabled":true},
        {"sensorName":"Bump_RearLeft","enabled":true}
    ],
    "timeOfFlightThresholds":[
        {"sensorName":"TOF_DownFrontRight","threshold":0.06},
        {"sensorName":"TOF_DownFrontLeft","threshold":0.06},
        {"sensorName":"TOF_DownBackRight","threshold":0.06},
        {"sensorName":"TOF_DownBackLeft","threshold":0.06},
        {"sensorName":"TOF_Right","threshold":0.215},
        {"sensorName":"TOF_Left","threshold":0.215},
        {"sensorName":"TOF_Center","threshold":0.215},
        {"sensorName":"TOF_Back","threshold":0.215}
    ]
}
```

Return Values:
* Result (boolean) - Returns `true` if there are no errors related to this command.
