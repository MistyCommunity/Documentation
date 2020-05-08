---
title: REST API
layout: coding-misty-i.hbs
columns: three
order: 2
---

# {{title}}

With the REST API, you can send commands to Misty from a REST client or browser. There is also a community owned [Python wrapper](https://github.com/MistyCommunity/Wrapper-Python) available for the Misty REST API.

To create skills for Misty, you'll need to send commands to Misty and get data back from Misty. To send commands to Misty, you can call the REST API. To get live updating data back from Misty, you'll need to use a [WebSocket connection](../../coding-misty/remote-command-architecture#using-mistys-websocket-server). You can visit the [REST-API repository on GitHub](https://github.com/MistyCommunity/REST-API) for sample code and tutorials.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.
{{box op="end"}}

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
All successful commands return a status and the result of the call:
```json
[
  {
    "result": true,
    "status": "Success"
  }
]
```
If there is an issue, Misty returns an HTTP error code and error message.

## Asset

Misty comes with a set of default images that you can display onscreen and sounds that you can play through her speakers. We encourage you to get creative and use your own image and audio assets in your skills.

### DeleteAudio

Enables you to remove an audio file from Misty that you have previously uploaded.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You can only delete audio files that you have previously uploaded to Misty. You cannot remove Misty's default system audio files.
{{box op="end"}}

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

Removes an image file from Misty that you have previously uploaded.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You can only delete image files that you have previously uploaded to Misty. You cannot remove Misty's default system image files.
{{box op="end"}}

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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Because GET requests do not include payloads, the query parameter for this request must be included in the URL.
{{box op="end"}}

Parameters  

* FileName (string): The name of the audio file to get, including its file type extension.

```markup
http://<robot-ip-address>/api/audio?FileName=ExampleAudio.mp3
```

Return Values

* An audio file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Because GET requests do not contain payloads, the query parameter for this request must be included in the URL.
{{box op="end"}}

Parameters

* FileName (string) - The name of the image file to get, including the file type extension.
* Base64 (boolean) - Optional. Sending a request with `true` returns the image data as a downloadable Base64 string. Sending a request with `false` displays the image in your browser or REST client immediately after the image is taken. Default is `true`.

```json
{
  "FileName": "Content.jpg",
  "Base64": false
}
```

Return Values

* Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for Base64.
  * base64 (string) - A string containing the Base64-encoded image data.
  * format (string) - The type and format of the image returned.
  * height (integer) - The height of the image in pixels.
  * name (string) - The name of the image.
  * width (integer) - The width of the image in pixels.

```json
{
  "base64": "data:image/jpeg;base64,/9j/4AAQ...",
  "format": "image/jpeg",
  "height": 270.0,
  "name": "ExampleFile.jpg",
  "width": 450.0,
}
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

### SaveAudio (Byte Array String)
Saves an audio file to Misty. Maximum size is 3 MB.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio

Parameters
- FileName (string) - The name of the audio file to upload. This command accepts all audio format types, however Misty currently cannot play OGG files.
- DataAsByteArrayString (string) - The audio data, passed as a string containing a byte array.
- ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the uploaded audio file, while a value of `false` tells Misty not to play the file.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

```json
{
  "FilenameWithoutPath": "example.wav",
  "DataAsByteArrayString": "34,88,90,49,56,...",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - Returns an array of information about the audio file, with the following fields:
   * Name (string) - The name of the file that was saved.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.


### SaveAudio (Audio File)

Saves an audio file to Misty. Maximum size is 3 MB.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Make sure to set the `content-type` in the header of the POST call to [`multipart/form-data`](https://developer.mozilla.org/en-US/docs/web/HTTP/Basics_of_HTTP/MIME_types#multipartform-data). Uploading files to Misty this way does _not_ work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest).
{{box op="end"}}

Parameters

- File (object) - The audio file to save to Misty. This command accepts all audio format types, however Misty currently cannot play OGG files.
- FileName (string) - Optional. The name the file will have on Misty. Must include the file type extension. If unspecified, the audio file will be saved with the same name as the source file.
- ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the uploaded audio file, while a value of `false` tells Misty not to play the file.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

Return Values
- Result (array) - An array of information about the audio file, with the following fields:
  - name (string) - The name of the file that was saved.
  - userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.


### SaveImage (Byte Array String)

Saves an image to Misty in the form of a byte array string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/images

Parameters

* FileName (string) - The name of the image file to upload.
* DataAsByteArrayString (string) - The image data, passed as a string containing a byte array.
* Width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image. 
* Height (integer) -  Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image.
* ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the uploaded image file, while a value of `false` tells  Misty not to display the image.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

```json
{
  "FileName": "example.jpg",
  "DataAsByteArrayString": "30,190,40,24,...",
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

### SaveImage (Image File)

Saves an image file to Misty. Optionally, proportionately reduces the size of the saved image.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Be sure to set the content-type in the header of the POST call to `multipart/form-data`. Uploading files to Misty this way does not work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest).
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/images

Parameters
* File (object) - The image file to save to Misty. Valid image file types are .jpg, .jpeg, .gif, and .png. 
* Width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). Important: To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image. 
* Height (integer) -  Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image.
* ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the uploaded image file, while a value of `false` tells  Misty not to display the image.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

Return Values
* Result (array) - Returns an array of information about the image with the following fields:
* height (integer) - The height of the image in pixels.
* name (string) - The name of the saved file.
* userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.
* width (integer) - The width of the image in pixels.

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

Displays an image on Misty's screen. Optionally, `DisplayImage` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. Use `SaveImage` to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

Endpoint: POST &lt;robot-ip-address&gt;/api/images/display

Parameters
- FileName (string) - Name of the previously uploaded file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
- TimeoutSeconds (double) - Optional. The length of time to display the specified image.
- Alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image.

```json
{
  "FileName": "pink_sunset.jpg",
  "TimeOutSeconds": 5,
  "Alpha": 0.5
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### PlayAudio

Plays an audio file that has been previously uploaded to Misty. Use `SaveAudio` to upload audio files to Misty.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/play

Parameters

- AssetId (string) - The ID of the file to play. You must pass a value for either the `AssetId` or `FileName` parameter.
- FileName (string) - The name of the file to play. You must pass a value for either the `AssetId` or `FileName` parameter.
- Volume (integer) - Optional. A value between 0 and 100 for the loudness of the audio clip. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.

```json
{
  "AssetId": "ExampleSong"
}
```

Return Values

* Result (string) - Returns a string with any errors related to this command.

## External Requests

### SendExternalRequest (Misty I) - ALPHA

Sends an HTTP request from Misty to an external server. You can use `SendExternalRequest` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

Endpoint: POST &lt;robot-ip-address&gt;/api/request

Parameters

* Method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* Resource (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* AuthorizationType (string) - The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* Token (string) - The authentication credentials required to access the resource. Use `null` if no credentials are required.
* Arguments (string) - The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* ReturnType (string) - The [Multipurpose Internet Mail Extension (MIME)](https://developer.mozilla.org/en-US/docs/web/HTTP/Basics_of_HTTP/MIME_types) type indicating the nature and format of the expected response, i.e. `text/plain`.
* Save (bool) - If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* Apply (bool) - A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* FileName (string) - The name to give the saved file, including the appropriate file type extension.

```json
{
  "Method": "GET",
  "Resource": "http://soundbible.com/grab.php?id=1949%26type=mp3",
  "AuthorizationType": null,
  "Token": null,
  "Arguments": "{}",
  "ReturnType": "audio/mp3",
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

To programmatically obtain live data streams back from Misty that include movement, position, and proximity data, you can [subscribe](../../coding-misty/remote-command-architecture#using-mistys-websocket-server) to her LocomotionCommand, HaltCommand, TimeOfFlight, and SelfState [WebSockets](../../reference/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

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

### MoveHead

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the MoveHead command can only control the up-down movement of Misty's head.

Endpoint: POST &lt;robot-ip-address&gt;/api/head

Parameters

- Pitch (double) - Value that determines the up or down movement of Misty's head movement.
- Roll (double) - Value that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right.
- Yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right.
- Velocity (double) - Optional. The percentage of max velocity that indicates how quickly Misty should move her head. Value range: 0 to 100. Defaults to 10.
- Units (string) -  Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's head. Defaults to `degrees`.

```json
{
  "Pitch": 3,
  "Roll": 3,
  "Yaw": -2,
  "Velocity": 6
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
{{box op="end"}}

**Value Ranges (By Unit) for Each Direction of Head Movement**

|| degrees | position | radians |
|-----|---------|----------|---------|
| pitch | -9.5 (up) to 34.9 (down) | -5 (up) to 5 (down) |-0.1662 (up) to 0.6094 (down) |
| roll | -43 (left) to 43 (right) | -5 (left) to 5 (right) |-0.75 (left) to 0.75 (right) |
| yaw | -90 (right) to 90 (left) | -5 (right) to 5 (left) |-1.57 (right) to 1.57 (left) |

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### Halt

Stops all motor controllers, including drive motor, head/neck, and arm (for Misty II).

Endpoint: POST &lt;robot-ip-address&gt;/api/halt

Parameters
* None

Return Values
* None

### Stop
Stops Misty's movement.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Navigation

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#navigation-alpha).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you are mapping with a **Misty I**, please be aware of the following:

* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.
{{box op="end"}}

### StartSlamStreaming

Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `StopSlamStreaming` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Using `StopSlamStreaming` turns off the laser in the depth sensor and lowers Misty's power consumption. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/streaming/start

Parameters 
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### StopSlamStreaming
Closes the data stream from the Occipital Structure Core depth sensor. This command turns off the laser in the depth sensor and lowers Misty's power consumption.

**Important!** Always use this command to close the depth sensor data stream after using `StartSlamStreaming` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/streaming/stop

Parameters
- None

Return Values
- Results (boolean) - Returns `true` if there are no errors related to this command.

### TakeDepthPicture
Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of “unknown” values in the form of `NaN` (“not a number”) values.

**Important!** Make sure to use `StartSlamStreaming` to open the data stream from Misty's depth sensor before using this command, and use `StopSlamStreaming` to close the data stream after using this command.

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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Make sure to use `StartSlamStreaming` to open the data stream from Misty's depth sensor before using this command, and use `StopSlamStreaming` to close the data stream after using this command.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/fisheye?Base64=&lt;bool&gt;

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Because GET requests do not contain payloads, the query parameter for this request must be included in the URL.
{{box op="end"}}

Parameters  

- Base64 (boolean) - Sending a request with `true` returns the image data as a downloadable Base64 string, while sending a request of `false` displays the photo in your browser or REST client immediately after it is taken. Default is `true`. **Note:** Images generated by this command are not saved in Misty's memory. To save an image to your robot for later use, pass `true` for `Base64` to obtain the image data, download the image file, then call `SaveImage` to upload and save the image to Misty.

Return Values
- Result (object) -  An object containing image data and meta information. This object is only sent if you pass `true` for `Base64`.
    - base64 (string) - A string containing the Base64-encoded image data.
    - format (string) - The type and format of the image returned.
    - height (integer) - The height of the picture in pixels.
    - name (string) - The name of the picture.
    - width (integer) - The width of the picture in pixels.

```json
{
  "base64": "data:image/png;base64,iVBORw0KG...",
  "format": "image/png",
  "height": 480.0,
  "name": "OccipitalVisibleImage",
  "width": 640.0,
}
```

### DriveToLocation - ALPHA

Drives to a designated waypoint.

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/coordinates

Parameters

* Destination (string) - A colon-separated integer pair that represents the X and Y coordinates of the destination. **Note:** `GetMap` obtains the occupancy grid for the most recent map Misty has generated. Use this grid to determine the X and Y coordinates of the destination. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

```json
“Destination": “10:25"
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path.

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the end of the path.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/path

Parameters
- Waypoints (array of objects) - A list of objects, where each object includes the X and Y coordinates for a waypoint on the path that Misty should follow. Misty travels to each waypoint in the order they appear in this array. **Note:** X values specify forward and backward movement, and Y values indicate movement to Misty's left or right.

```json
{
  "Waypoints":[
    {"X": 0, "Y": 0},
    {"X": 5, "Y": 5},
    {"X": 5, "Y": 10}
    ]
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### GetMap - ALPHA

Obtains occupancy grid data for the most recent map Misty has generated. **Note:** To obtain a valid response from `GetMap`, Misty must first have successfully generated a map. 

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


"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#navigation-alpha).


{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you are mapping with a **Misty I**, please be aware of the following:

* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.
{{box op="end"}}

### GetSlamPath - ALPHA

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the path parameter of `FollowPath` for Misty to follow this path to the desired location.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** `GetMap` obtains the occupancy grid for the most recent map Misty has generated. Use this grid to determine the X and Y coordinates of the destination. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array.
{{box op="end"}} 

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.
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


### GetSlamStatus - ALPHA
Obtains values representing Misty's current activity and sensor status.

Endpoint: GET &lt;robot-ip-address&gt;/api/slam/status

Parameters
- None

Return Values
* Status (integer) - Value 1 is an integer value where each bit is set to represent a different activity mode:
  1 - Idle
  2 - Exploring
  3 - Tracking
  4 - Recording
  5 - Resetting

Example: If Misty is both exploring and recording, then bits 2 and 4 would be set => 0000 1010 => Status = 10.

* Slam Status (integer) - Value 2 is an integer value representing the status of Misty's sensors, using the SlamSensorStatus enumerable.

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

### ResetSlam - ALPHA

Resets the SLAM sensors.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/reset

Parameters

- None

Return Values

- Result (boolean) - Returns `true` if there are no errors related to this command.

### StartMapping - ALPHA

Starts Misty mapping an area.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:

* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StartTracking - ALPHA
Starts Misty tracking her location.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/track/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopMapping - ALPHA
Stops Misty mapping an area.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/map/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopTracking - ALPHA
Stops Misty tracking her location.

Endpoint: POST &lt;robot-ip-address&gt;/api/slam/track/stop

Parameters

- None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

## Perception

The following commands allow you to programmatically take pictures, record sounds or videos, and have misty detect and learn to recognize faces. 

Like most of us, Misty sees faces best in a well-lit area. If you want to directly experiment with face recognition commands, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#perception).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../coding-misty/remote-command-architecture/#getting-data-from-misty) to her FaceRecognition [WebSocket](../../reference/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

### CancelFaceTraining

Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the CancelFaceTraining command unless you want to abort a training that is in progress.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/training/cancel

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### GetKnownFaces

Obtains a list of the names of faces on which Misty has been successfully trained.

Endpoint: GET &lt;robot-ip-address&gt;/api/faces

Parameters

* None

Return Values

* Result (array) - A list of the user-supplied names for faces that Misty has been trained to recognize.

### ForgetAllFaces

Removes records of previously trained faces from Misty's memory.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/faces

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### ForgetFace

Removes records of a specific trained face from Misty's memory.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/faces?FaceId=&lt;"FaceId"&gt;

Parameters

* FaceId (string) - The name of the face to remove.

Returns

* Result (array) - Returns `true` if no errors related to this command.


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

### StartRecordingAudio
Directs Misty to initiate an audio recording and save it with the specified file name. Misty records audio with a far-field microphone array and saves it as a byte array string. To stop recording, you must call the `StopRecordingAudio` command. If you do not call `StopRecordingAudio`, Misty automatically stops recording after 60 seconds.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/start

Parameters
* FileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

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

### StopRecordingAudio
Directs Misty to stop the current audio recording. You must use this command after calling the `StartRecordingAudio` command. If you do not call `StopRecordingAudio`, Misty automatically stops recording after 60 seconds.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/stop

Parameters
* None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### TakePicture

Takes a photo with Misty’s 4K camera. Optionally, saves the photo to Misty and proportionately reduces the size of the photo.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you call the `TakePicture` command immediately after using the RGB camera to record a video, there may be a few seconds delay before Misty takes the photograph.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/rgb

Example:

`http://<robot-ip-address>/api/cameras/rgb?base64=false&FileName=MyPicture&Width=300&Height=200&DisplayOnScreen=true&OverwriteExisting=true`

Parameters

* Base64 (boolean) - Sending a request with `true` returns the image data as a downloadable Base64 string, while sending a request of `false` displays the photo in your browser or REST client immediately after it is taken. Default is `true`.
* FileName (string) - Optional. The filename to assign to the image file for the captured photo. Note that if you do not specify a filename, Misty does not save the photo to her local storage.
* Width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of a photo you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image. 
* Height (integer) -  Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of a photo you must supply values for both `Width` and `Height`. Note that if you supply disproportionate values for `Width` and `Height`, the system uses the proportionately smaller of the two values to resize the image.
* DisplayOnScreen (boolean) - Optional. If `true` **and** a `FileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `FileName` value is provided, does nothing.
* OverwriteExisting (boolean) - Optional. Indicates whether Misty should overwrite an image with the same filename as the captured photo if one exists on her local storage. Passing in `true` overwrites a file with the same name. Passing in `false` prevents an existing file with the same name from being overwritten. In the case that `OverwriteExisting` is set to `false` and a photo already exists with the same filename as the newly captured photo, the new photo is not saved to Misty. Defaults to `false`.

```json
{
  "Base64": true,
  "FileName": "MyPicture",
  "Width": 300,
  "Height": 200,
  "DisplayOnScreen": true,
  "OverwriteExisting": true
}
```

Return Values

* Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for Base64.
  * Base64 (string) - A string containing the Base64-encoded image data.
  * Format (string) - The type and format of the image returned.
  * Height (integer) - The height of the image in pixels.
  * Name (string) - The name of the image.  
  * Width (integer) - The width of the image in pixels. 



### GetRecordedVideo - BETA

Downloads Misty's most recent video recording to your browser or REST client.

{{box op="start" cssClass="boxed noteBox"}}
Misty records videos in .mp4 format at a resolution of 1080 x 1920 pixels. A single video may be larger than 10 megabytes and can take several seconds to download.
{{box op="end"}}

Endpoint: GET &lt;robot-ip-address&gt;/api/video

Parameters

* None

Return Values

* An MP4 video file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

### StartRecordingVideo - BETA
Starts recording video with Misty's 4K Camera. Misty records videos in MP4 format at a resolution of 1080 x 1920 pixels.

Use the `StopRecordingVideo` command to stop recording a video. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call `StopRecordingVideo`.

Misty only saves the most recent video recording to her local storage. Recordings are saved with the filename `MistyVideo.mp4`, and this file is overwritten with each new recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you call the `StartRecordingVideo` command immediately after using the RGB camera to take a picture, there may be a few seconds delay before Misty starts recording.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/video/record/start

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopRecordingVideo - BETA

Stops recording video with Misty's 4K camera.

Use this command after calling `StartRecordingVideo`. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call this command.

Endpoint: POST &lt;robot-ip-address&gt;/api/video/record/stop

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

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

```json
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

<!-- RunSkill -->
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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To send a file with this request, make sure to set the `content-type` in the header of the `POST` call to `multipart/form-data`.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/skills

Parameters

* File (file) - A zipped file containing the two skill files and any images or audio files you want to associate with the skill. The code and meta files (one JSON meta file and one JavaScript code file) should have the same name. For more details, see the [File Structure & Code Architecture](../../coding-misty/local-skill-architecture/#file-structure-amp-code-architecture) section.
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

### LoadSkill - ALPHA
Makes a previously uploaded skill available for the robot to run and updates the skill for any changes that have been made.

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/load

Parameters
* Skill (string) - The name of the skill to load.

```json
{
  "Skill": "SkillName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

### ReloadSkills - ALPHA

Makes all previously uploaded skills available for the robot to run and updates any skills that have been edited. **Note:** The `ReloadSkills` command runs immediately, but there may be a significant delay after the call completes before all skills are fully loaded onto the robot if there are many to load.

Endpoint: POST &lt;robot-ip-address&gt;/api/skills/reload

Parameters

* (None)

Return Values

* Result (boolean) - Returns `true` if no errors related to this request. 


## System

### ClearDisplayText

Force-clears an error message from Misty’s display. **Note:** This command is provided as a convenience. You should not typically need to call `ClearDisplayText`.

Endpoint: POST &lt;robot-ip-address&gt;/api/text/clear

Parameters
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### ConnectToSavedWifi

Connects Misty to a saved Wi-Fi network.

Endpoint: POST &lt;robot-ip-address&gt;/api/networks

Parameters

* NetworkId (string) - The name of the network to connect to.

```json
{
  "NetworkID": "MyNetworkName"
}
```

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### ForgetWifi

Deletes information about a Wi-Fi network from Misty’s list of saved networks. If you send this command without any parameters, Misty deletes information for all of her saved networks.

Endpoint: DELETE &lt;robot-ip-address&gt;/api/networks

Parameters

* NetworkId (string) - Optional. The network to remove from Misty’s list of saved networks.

```json
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


### GetBatteryLevel
Obtains Misty's current battery level, along with other information about the battery.

Endpoint: GET &lt;robot-ip-address&gt;/api/battery

Parameters
- None

Return Values
* Result (object) - An object with information about the status of Misty's battery. Includes the following properties:
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


### GetDeviceInformation
Obtains device-related information for the robot.

Endpoint: GET &lt;robot-ip-address&gt;/api/device

Parameters
- None

Return Values
* Result (object) - An object containing information about the robot, with the following fields.
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

```json
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

Obtains the robot's recent log files. Log file data is stored for 7 days. Calling `GetLogFile` with no parameters returns all available log data.

Endpoint:

* GET &lt;robot-ip-address&gt;/api/logs for all data
* GET &lt;robot-ip-address&gt;/api/logs/?date={date string} for a specific date

Examples:

`<robot-ip-address>/api/logs`

`<robot-ip-address>/api/logs?date=2018/9/24`

`<robot-ip-address>/api/logs?date=September/24/2018`

Parameters
- Date (string) - Optional. A date within the last 7 days. Dates must be formatted as: `MonthName/Date/FourDigitYear` or `FourDigitYear/MonthNumber/Date`.

Return Values
* Result (list) - Compiled log file data. Or, an error if the date is invalid or no log data is found.

### GetLogLevel

Obtains Misty's current log level.

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

Endpoint: GET &lt;robot-ip-address&gt;/api/logs/level

Parameters

* None

Return Values

* result (string) - A string value indicating the robot's current log level.

### GetStoreUpdateAvailable

Checks whether a system update is available. 

Endpoint: &lt;robot-ip-address&gt;/api/system/updates

Parameters

* None

Return Values

* Result (boolean) - Returns a value of `true` if an update is available. Otherwise, `false`.

### GetWebsocketNames

Obtains information about a specified WebSocket class. Calling `GetWebsocketNames` with no parameters returns information about all of Misty’s available WebSocket connections.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** For examples of subscribing to WebSocket data, see the sample skills in the MistyCommunity GitHub repo. For more detailed information about each of Misty’s WebSocket connections, see [Sensor & Skill Data Types](../../../misty-i/reference/sensor-data/).
{{box op="end"}}
 
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

Endpoint: GET <robot-ip-address>/api/websocket/version

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

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Only use this command when a system update fails to update every component of your robot. Always attempt a full system update before using this command. The version numbers for individual components are returned by the `GetDeviceInformation` command. You can make sure individual components are up-to-date by comparing these version numbers to the most recent release notes on the [Misty Community](https://community.mistyrobotics.com/) site.
{{box op="end"}}

Endpoint: POST &lt;robot-ip-address&gt;/api/system/update/component

Parameters
- Components (array) - A list of strings indicating the specific components to update. Use `"MC"` to update the motor controller firmware, `"RT"` to update the real-time controller firmware, and `"SensoryServices"` to update the Sensory Services application. Updates to the Sensory Services application include firmware updates for the Occipital Structure Core depth sensor.

```json
{
    "Components": [ "MC", "RT", "SensoryServices" ]
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetDefaultVolume

Sets the default loudness of Misty's speakers for audio playback.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/volume

Parameters
- Volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetLogLevel

Sets Misty's log level. Misty's log level can be set to `Debug`, `Info`, `Warn`, or `Error`.

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

Endpoint: POST &lt;robot-ip-address&gt;/api/logs/level

Parameters:

* LogLevel (string) - The level to set the log to. Accepts `Debug`, `Info`, `Warn`, or `Error`.

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

### SetWebsocketVersion

Sets the active WebSocket system to the `Current` or `Deprecated` version of the system.

* If `Current`, WebSocket event messages do not include the `SensorName` or `Type` key/value pairs.
* If `Deprecated`, Websocket event messages do include the `SensorName` and `Type` key/value pairs.

Endpoint: POST <robot-ip-address>/api/websocket/version

Parameters

* version (string): The version of Misty's WebSocket system to use. Accepts `Current` or `Deprecated`.

```json
{
  "version": "Current"
}
```

Return Values

* Results (bool) - Returns `true` if no errors related to this command.
