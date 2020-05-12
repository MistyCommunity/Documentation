---
title: API Reference
layout: coding.hbs
columns: three
order: 3
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

```javascript
// Syntax
misty.DeleteAudio(string fileName, [int prePauseMs], [int postPauseMs]);
```

Arguments
* fileName (string) - The name of the file to delete, including its file type extension.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DeleteAudio("DeleteMe.wav");
```

### misty.DeleteImage

Removes an image file from Misty's storage.

```javascript
// Syntax
misty.DeleteImage(string fileName, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You can only delete image files that you have previously saved to Misty's storage. You cannot remove Misty's default system image files.
{{box op="end"}}

Arguments

* fileName (string) - The name of the file to delete, including its file type extension.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DeleteImage("DeleteMe.png");
```

### misty.DeleteVideo

Deletes a user-uploaded video file from Misty's storage.

```javascript
// Syntax
misty.DeleteVideo(string fileName, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only deletes user-uploaded video assets. To delete a video recording that Misty has created, you must use the [`DeleteVideoRecording`](./#misty-deletevideorecording) command.
{{box op="end"}}

Arguments

* fileName (string) - The name of the video file to delete, with the file type extension.

```javascript
// Example
misty.DeleteVideo("MyVid.mp4");
```

### misty.GetAudioFile

Obtains a system or user-uploaded audio file currently stored on Misty.

```javascript
// Syntax
misty.GetAudioFile(string fileName, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore (in this case, `_GetAudioFile()`). For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* fileName (string) - The name of the audio file to get, including its file type extension.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If blank, the system passes data into the default `_GetAudioFile()` callback function.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```javascript
// Syntax
misty.GetAudioList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetAudioList();

function _GetAudioList(data) {
  misty.Debug(data.Result);
}
```

Returns

* Result (array) - An array of objects with information about each of Misty's audio files. Each object in the array contains the key/value pairs listed below. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * SystemAsset (boolean) - If `true`, the file is one of Misty's default system audio files. If `false`, a user created the file.

### misty.GetImage

Obtains a system or user-uploaded image file.

```javascript
// Syntax
misty.GetImage(string fileName, [string callback], [bool base64 = true], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the onrobot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* fileName (string) - The name of the image file to get, including its file type extension.
* base64 (boolean) - Optional. Passing in `true` returns the image data as a Base64 string. Passing in `false` returns the image. Defaults to `true`. 
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetImage("Angry.png");

function _GetImage(data)
{
	misty.Debug(JSON.stringify(data));
}
```
Returns

- Result (object) - An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  - Name (string) - The name of the image
  - Height (integer) - The height of the image in pixels.
  - Width (integer) - The width of the image in pixels.
  - SystemAsset (boolean) - Whether the image is one of Misty's default image assets.
  - ContentType (string) - The type and format of the image returned.
  - Base64 (string) - A string containing the Base64-encoded image data.

### misty.GetImageList

Obtains a list of the images stored on Misty.

```javascript
// Syntax
misty.GetImageList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetImageList();
```

Returns

* Result (array) - Returns an array containing one element for each image currently stored on Misty. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each element in the array contains the following:
   * Height (integer) - The height of the image file.
   * Name (string) - The name of the image file.
   * SystemAsset (boolean) - If `true`, the file is one of Misty's default system audio files. If `false`, a user created the file.
   * Width (integer) - The width of the image file.

### misty.GetVideo

Obtains the Base64-encoded data for a user-uploaded video file currently stored on Misty.

```javascript
// Syntax
misty.GetVideo(string fileName, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

You can only use this command to obtain a user-uploaded video asset. To obtain a video recording that Misty has created, use the [`GetVideoRecording`](./#misty-getvideorecording) command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetVideo()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* fileName (string) - The name of the video to obtain, with the file type extension.
* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetVideo()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.GetVideo("MyVid.mp4");

function _GetVideo(data) {
    // Prints Base64-encoded video data as debug message
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (object) - An object containing video data and meta information about the file. Note that this object is only sent if you pass `true` for the `Base64` parameter. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. This object includes the following key/value pairs:
  * Base64 (string) - A string containing the Base64-encoded video data.
  * ContentType (string) - The type and format of the video returned.
  * Name (string) - The name of the video file.
  * SystemAsset (boolean) - Whether the video is one of Misty's default system assets.

### misty.GetVideoList

Obtains a list of the user-uploaded video assets saved to Misty's storage. 

```javascript
// Syntax
misty.GetVideoList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only obtains a list of user-uploaded video assets. To obtain a list of video recordings that Misty created, you must use the [`GetVideoRecordingsList`](./#misty-getvideorecordingslist) command.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetVideoList()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetVideoList()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetVideoList();

function _GetVideoList(data) {
    // Prints name of each user-uploaded video as a debug message
    for (var i = 0; i <= data.Result.length; i ++) {
        misty.Debug(data.Result[i].Name);
    }
}
```

Returns

* Result (array) - A list of objects with information about the user-uploaded videos on Misty's storage. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Each object includes the following key/value pairs:
  * Name (string) - The name of the video asset, with the file type extension.
  * SystemAsset (boolean) - Whether the video is one of Misty's default system assets.

### misty.GetVideoRecording

Gets the Base64 data for a video that Misty has created.

```javascript
// Syntax
misty.GetVideoRecording([string name], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

You can only use this command to download videos that Misty recorded. To get videos that you or another user has uploaded, use the [`GetVideo`](./#misty-getvideo) command.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty records videos in .mp4 format. Video recordings have a maximum resolution of 3840 x 2160 pixels and can be up to 3 minutes long. A single video file can be up to 225 MB and can take several minutes to download.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetVideoRecording()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* Name (string) - Optional. The filename of the video. If not supplied, defaults to `misty_video`.
* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetVideoRecording()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetVideoRecording("Feb1000");

function _GetVideoRecording(data) {
	// Prints video content type, name, and Base64-encoded data
	misty.Debug(JSON.stringify(data.Result.ContentType));
	misty.Debug(JSON.stringify(data.Result.Name));
	misty.Debug(JSON.stringify(data.Result.Base64));
}
```

Returns

* Result (object) - An object containing video data and other information about the file. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  * Base64 (string) - A string containing the Base64-encoded video data.
  * ContentType (string) - The type and format of the video returned. For all videos that Misty creates, the content type should be `video/mp4`.
  * Name (string) - The name of the video file.

### misty.SaveAudio

Saves an audio file to Misty. Maximum size is 3 MB. Accepts audio files formatted as .wav .mp3, .wma, and .aac.

```javascript
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

```javascript
// Example
misty.SaveAudio("Filename.wav", "137,80,78,71,13,1...", false, false);
```

### misty.SaveImage

Saves an image to Misty. Optionally, proportionately reduces the size of the saved image.

```javascript
// Syntax
misty.SaveImage(string fileName, string data, [int width], [int height], [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs]
```

Valid image file types are .jpg, .jpeg, .gif, and .png. Maximum file size is 3 MB. **Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

Arguments

* fileName (string) - The name of the image file to save.
* data (string) - A Base64-encoded string of the image data.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the saved image file, while a value of `false` tells Misty not to display the image.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the saved file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the saved file should not overwrite any existing files on Misty.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SaveImage("Filename.jpg", "137,80,78,71,13,1...", 500, 1000, false, false);
```

### misty.SaveVideo

Saves a video to Misty. 

```javascript
// Syntax
misty.SaveVideo(string fileName, string data, [bool immediatelyApply], [bool overwriteExisting], [int prePauseMs], [int postPauseMs]);
```

Accepted video file types are .mp4 and .wmv. Maximum file size is 6 MB

Arguments

* fileName (string) - The name of the video file to upload, with the file type extension.
* data (string) - A Base64-encoded string of the video data.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the uploaded video, while a value of `false` tells Misty not to play the video.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of false indicates the uploaded file should not overwrite any existing files on Misty.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

## Backpack

### misty.GetSerialSensorValues

Obtains a list of the most recent messages Misty has received through the universal asynchronous receiver-transmitter (UART) serial port on her back. This list of messages clears each time the system reboots.

```javascript
// Syntax
misty.GetSerialSensorValues([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSerialSensorValues()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSerialSensorValues()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Result (array) - A list of string values, where each value is a message Misty received through the UART serial port on her back. Messages are sequenced in reverse chronological order, with the most recent message being the last value in the array. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.WriteSerial

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

```javascript
// Syntax
misty.WriteSerial(string message, [int prePauseMs], [int postPauseMs])
```

Misty can also receive data through the UART serial port. To use this data you must subscribe to [`SerialMessage`](../../../misty-ii/robot/sensor-data/#serialmessage) events.

Arguments

* message (string) - The data Misty sends to the UART serial port, passed as a string value.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.WriteSerial("your-data");
```

## Event

### misty.AddPropertyTest

Creates a property comparison test to specify which data the system sends for a registered event. Use property tests to filter unwanted data out of event messages.


```javascript
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

```javascript
// Example
misty.AddPropertyTest("EventName", "SensorPosition", "==", "Back", "string");
```

### misty.AddReturnProperty

Adds an additional return property field for a registered event.

```javascript
// Syntax
misty.AddReturnProperty(string eventName, string eventProperty, [int prePauseMs], [int postPauseMs]);
```

Use the `misty.AddReturnProperty()` method to add the values of specific properties from an event message to the data object passed to the callback function for the event. When the event callback handles the data object for an event, that data includes the values of any properties added with `misty.AddReturnProperty()` in an `AdditionalResults` array.

Arguments

* eventName (string) - The name of the event to add a return property field for.
* eventProperty (string) - The additional property to return.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.AddReturnProperty("EventName", "DistanceInMeters");
```

You can add multiple return properties to the same event. The order of values in the `AdditionalResults` array matches the order in which you added those properties to the event in your skill code. For an example of how this works, see how the following code adds return properties to a `BumpSensor` event:

```javascript
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

### misty.RegisterEvent

Creates a listener that receives live data from one of Misty's [event types](../../../misty-ii/robot/sensor-data). 

```javascript
// Syntax
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Sensor Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#sensor-event-callbacks).
{{box op="end"}}

Arguments

* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed [here](../../../misty-ii/robot/sensor-data).
* debounce (integer) - Sets the frequency in milliseconds with which event data is sent. 
* keepAlive (boolean) - Optional. Pass `true` to keep the callback function registered to the event after the callback function is triggered. By default, when an event callback is triggered, the event unregisters the callback to prevent more commands from overriding the initial call. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.RegisterEvent("EventName", "TimeOfFlight", 1000, false);
```

Returns

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#sensor-event-callbacks).

### misty.RegisterSimpleEvent

Registers for an event and applies a filter to event messages. Events you register for with the `misty.RegisterSimpleEvent()` command only return messages for events that pass the property comparison test you specify in the command's arguments.

```javascript
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

Creates an event that invokes a callback function after a set duration.

```javascript
// Syntax
misty.RegisterTimerEvent(string eventName, int callbackTimeInMs, [bool keepAlive], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

You can use the `misty.RegisterTimerEvent()` method to implement looping behavior patterns, or to trigger logic just once after a set period of time. For an example, see the [Timer Event tutorial](../../../misty-ii/javascript-sdk/tutorials/#timer-events).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).
{{box op="end"}}

Arguments

* eventName (string) - The name for the timer event. Note that the name you give to this timer event determines the name automatically assigned to your related callback function. That is, the system sets the name of the callback function to be the same as this event name, prefixed with an underscore (`_<eventName>`). For example, for an event name of `MyTimerEvent`, your callback function must use the name `_MyTimerEvent`. 
* callbackTimeInMs (integer) - The amount of time in milliseconds to wait before the system calls the callback function. For example, passing a value of 3000 causes the system to wait 3 seconds.
* keepAlive (boolean) -  Optional. By default (`false`) this timer event calls your callback only once. If you pass `true`, your callback function is called in a loop, with a frequency determined by `callbackTimeInMs`. To end the loop, call the `misty.UnregisterEvent()` function in your code.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.RegisterTimerEvent("EventName", 5000, false);
```

Returns

* Data sent by the timed event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).

### misty.RegisterUserEvent

Creates a listener for custom user events. You can trigger a custom event by making a REST call to the [TriggerSkillEvent](../../../misty-ii/rest-api/api-reference/#triggerskillevent) endpoint, or by issuing a [`TriggerEvent`](../../../misty-ii/javascript-sdk/api-reference/#misty-triggerevent) command from another JavaScript or .NET skill that is running at the same time.

```javascript
// Syntax
misty.RegisterUserEvent(string eventName, [bool keepAlive], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#timed-or-triggered-event-callbacks).
{{box op="end"}}

Arguments

* eventName (string) - The name of the custom event. By default, callback functions for custom user events are given the same name as the event, prefixed with an underscore: `_<eventName>()`. For example, to handle the data that comes with a custom event called `MyUserEvent`, you must declare a callback function with the name `_MyUserEvent()`.
* keepAlive (bool) - Optional. Whether to keep the event listener active after receiving an event. By default, `keepAlive` is set to `false`, which means the callback only triggers the first time you receive this event in your skill. If you pass `true` for `keepAlive` when you register a listener for the event, you can trigger the event callback repeatedly. When `keepAlive` is `true`, you can still unregister the event listener by calling the [`misty.UnregisterEvent()`](../../../misty-ii/javascript-sdk/api-reference/#misty-unregisterevent) method in your skill code.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The `UniqueId` of a skill to call when the event is triggered. You only need to use this value when you define the event callback in a separate skill from the skill in which you register the event listener.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Register a listener for events called "MyEvents"
misty.RegisterUserEvent("MyEvent", true);

// With our event listener created, we can trigger the _MyEvent()
// callback function by sending a REST request to the TriggerSkillEvent
// endpoint, or by issuing a TriggerEvent command from a JavaScript or
// .NET skill that is running at the same time. 
function _MyEvent(data) {
    misty.Debug("Event received: " + data.EventName);
    misty.Debug(JSON.stringify(data));
    // Do something!
}
```

Returns

* data (JSON) - User event data. Data from user events must be passed into a callback function to be processed and made available for use in your skill. See [Triggered Event Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#triggered-event-callbacks) for more information. In addition to the custom data sent with with the event, user event messages always include the following key value pairs. These key/value pairs exist at the same level as the custom data sent with the event.
  * Source (string) - The custom name given to the source for this event. You set the value of the `Source` property when you issue a `TriggerSkillEvent` REST request or invoke a `TriggerEvent` command.
  * EventOriginator (string) - The event's origin. This value is `Skill` if the event came from a JavaScript or .NET skill, and it is `REST` if the event came from a call on the `TriggerSkillEvent` endpoint in Misty's REST API.
  * EventName (string) - The name of this event. You set the value of the `EventName` property issue a `TriggerSkillEvent` REST request or invoke a `TriggerEvent` command.

### misty.TriggerEvent

Broadcasts a custom event message (with custom event data) to event listeners in the current skill, and to listeners in other JavaScript or .NET skills that are running at the same time.

```javascript
// Syntax
misty.TriggerEvent(string eventName, string source, string data, [string allowedSkills], [int prePauseMs], [int postPauseMs])
```

Arguments

* eventName (string) - A name of your choice for the custom event. Use this name to register listeners for this event in JavaScript and .NET skills.
* source (string) - A name of your choice that describes the source of the event.
* data (string) - The data to send with the event, formatted as a JSON string (for example, `JSON.stringify({"Data": "Value"})`).
* allowedSkills (string) - A comma-separated list of one or more `UniqueId`s for each skill that is allowed to receive this event. To allow all skills to receive this event, use an empty string: `""`. **Note:** To receive events created with the `TriggerEvent` command, you must include the `UniqueId` of the broadcasting skill in the `TriggerPermissions` attribute for the listening skill. Alternatively, omitting the `TriggerPermissions` attribute from the meta data for a skill allows that skill to receive events from any running skills. With Misty's JavaScript SDK, you configure the `TriggerPermissions` attribute in the skill's JSON [meta file](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#meta-file). With Misty's .NET SDK, you configure the `TriggerPermissions` attribute as a property of the [`NativeRobotSkill`](../../../misty-ii/dotnet-sdk/dotnet-skill-architecture/#nativerobotskill) class.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used. 

Additionally, user-created events pass the following key/value pairs into the event callback, at the same level as the data passed in for the `data` argument:

* Source (string) - The custom name given to the source for this event.
* EventOriginator (string) - The event's origin. The value of the `EventOriginator` property for all events broadcast with the `TriggerEvent` command is `Skill`.
* EventName (string) - The name of this event, as defined in the `EventName` property.

```json
{
  "Data": "Value", // Data string
  "EventName": "MyEvent", // Name of the event
  "EventOriginator": "Skill", // Where the event came from
  "Source": "Sender" // Event source
}
```

This example demonstrates how to broadcast a custom event called `MyEvent`:

```javascript
// Example "broadcasting" skill:
misty.Debug("Starting skill: Sender");
misty.TriggerEvent("MyEvent", "Sender", JSON.stringify({"Data": "Value"}), "");
```

And this example demonstrates how to register for the custom event in the previous example:

```javascript
// Example "listening" skill:
misty.Debug("Starting skill: Listener");
misty.RegisterUserEvent("MyEvent", true);

function _MyEvent(data) {
    misty.Debug("Event received: " + data.EventName); // "MyEvent"
    misty.Debug(JSON.stringify(data)); // event data
    // Do something
}
```

### misty.UnregisterAllEvents

Unregisters all events in the skill from which this command is called.

```javascript
// Syntax
misty.UnregisterAllEvents([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.UnregisterAllEvents();
```

### misty.UnregisterEvent

Unregisters a specific event.

```javascript
// Syntax
misty.UnregisterEvent(string eventName, [int prePauseMs], [int postPauseMs]);
```

Arguments
* eventName (string) - The name of the event to unregister from.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.UnregisterEvent("EventName");
```

## Expression

### misty.ChangeLED

Changes the color of the LED light behind the logo on Misty's torso.

```javascript
// Syntax
misty.ChangeLED(int red, int green, int blue, [int prePauseMs], [int postPauseMs]);
```

Arguments

* Red (integer) - A value between 0 and 255 specifying the red RGB color.
* Green (integer) - A value between 0 and 255 specifying the green RGB color.
* Blue (integer) - A value between 0 and 255 specifying the blue RGB color.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ChangeLED(0, 0, 0);
```

### misty.DisplayImage

Displays an image on Misty's screen. You can use the [`SaveImage`](../../../misty-ii/rest-api/api-reference/#saveimage) command in Misty's REST API to upload images to Misty.

```javascript
// Syntax
misty.DisplayImage(string fileName, [double alpha], [int prePauseMs], [int postPauseMs])
```

By default, images you display with the `misty.DisplayImage()` method draw on the `DefaultImageLayer`. To display an image on a custom layer, use the [`misty.DisplayLayerImage()`](./#misty-displaylayerimage) method. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

Arguments

* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePauseMsMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisplayLayerImage

Displays an image on Misty's screen.

```javascript
// Syntax
misty.DisplayImage(string fileName, [string layer], [bool isUrl], [int prePauseMs], [int postPauseMs])
```

You can use this command to display images from Misty's local storage or to display images that are hosted on the web.

Misty uses the default image layer settings the first time she draws content with the `misty.DisplayLayerImage()` method. You can use the [`SetImageDisplaySettings`](./#misty-setimagedisplaysettings) command to adjust the settings and change the appearance for a specific image layer. Issuing a `SetImageDisplaySettings` command redraws the updated image layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The `DefaultImageLayer` is the only layer that does not automatically draw on top of other layers when the layer updates. `PlaceOnTop` is set to `false` for this layer by default, so that Misty's eyes do not re-draw on top of other media when Misty blinks. If you write to another layer and then update the `DefaultImageLayer`, the `DefaultImageLayer` updates *behind* the more recently updated layers, unless you use the [`SetImageDisplaySettings`](../../../misty-ii/rest-api/api-reference/#setimagedisplaysettings) command to change the default setting for the `PlaceOnTop` attribute for that layer. The `DefaultImageLayer` is the only layer on which Misty's default blinking behavior works. 
{{box op="end"}}

Arguments

* fileName (string) - Filename for the image to display. Valid image file types are `.jpg`, `.jpeg`, `.gif`, `.png`. Alternately, if `IsUrl` is true, the URL path for the image to display.
* layer (string) - Optional. The display layer to create or update with this command. If `null` or not supplied, the image displays on the default image layer (named `DefaultImageLayer`). 
* isUrl (boolean) - Optional. If `true`, the system treats the string you pass in for `FileName` as the URL address for an image hosted online.
* prePauseMsMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DisplayImage("e_Amazement.jpg");
```

### misty.DisplayText

Displays text on Misty's screen.

```javascript
// Syntax
misty.DisplayText(string text, [string layer], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default text layer settings the first time she draws content with the `DisplayText` command. You can use the [`SetTextDisplaySettings`](./#misty-settextdisplaysettings) command to adjust the settings and change the appearance for a specific text layer. Issuing a `SetTextDisplaySettings` command redraws the updated image layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* text (string) - The text to display.
* layer (string) - Optional. The layer on which to display the text. You can use this parameter to create a new text layer or to update an existing text layer. If not supplied, the text displays on the default text layer (named `DefaultTextLayer`).

```javascript
// Example
misty.DisplayText("Hello, world", "MyTextLayer");
```

### misty.DisplayVideo

Plays a video on Misty's screen.

```javascript
// Syntax
misty.DisplayVideo(string fileName, [string layer], [bool isUrl], [int prePauseMs], [int postPauseMs])
```

You can use this command to play videos you upload to Misty or videos that are hosted on the web. Use the [`SaveVideo`](./#misty-savevideo) command to upload a new video asset to your robot.

Misty uses the default video layer settings the first time she draws content with the `DisplayVideo` command. You can use the [`SetVideoDisplaySettings`](./#misty-setvideodisplaysettings) command to adjust the settings and change the appearance for a specific video layer. Issuing a `SetVideoDisplaySettings` command redraws the updated video layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.

The `DisplayVideo` command has the following limitations at this time:
* You cannot use the `DisplayVideo` command to play video recordings that Misty creates with the `StartRecordingVideo` command. Misty can only play user-uploaded videos on her display.
* Misty does not play audio for the videos she plays on her display.
{{box op="end"}}

Arguments

* fileName (string) - Filename for the video to play, with the file type extension. Valid video file types are .`mp4` and `.wmv`. Alternatively, if `IsURL` is `true`, the URL path for the video to play.
* layer (string) - Optional. The display layer to create or update with this command. If `null` or not supplied, the video plays on the default video layer (named `DefaultVideoLayer`). 
* isUrl (boolean) - Optional. If `true`, the system treats the string you pass in for `fileName` as the URL address for a video hosted online.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DisplayVideo("VideoAssetFilename.mp4", "MyVideoLayer");
```

### misty.DisplayWebView

Displays a webpage on Misty's display.

```javascript
// Syntax
misty.DisplayWebView(string URL, [string layer], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default webview layer settings the first time she draws content with the `DisplayWebView` command. You can use the [`SetWebViewDisplaySettings`](./#misty-setwebviewdisplaysettings) command to adjust the settings and change the appearance for a specific webview layer. Issuing a `SetWebViewDisplaySettings` command redraws the updated webview layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

Displaying webviews can consume a lot of computational resources. If you notice Misty's performance decrease while multiple webviews layers are active, you may consider deleting one or more webview layers.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* URL (string) - The URL for the web page to display.
* layer (string) - Optional. The display layer to create or update with this command. If `null` or not supplied, the webview displays on the default webview layer (named `DefaultWebViewLayer`). 

```javascript
// Example
misty.DisplayWebView("https://mistyrobotics.com");
```

### misty.GetBlinkSettings

Obtains the current settings for Misty's blinking behavior. To change these settings, use the [`misty.SetBlinkSettings()`](./#misty-setblinksettings) method.

```javascript
// Syntax
misty.GetBlinkSettings([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetBlinkSettings()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetBlinkSettings()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Result (object) - A data object with the following key/value pairs. (Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information).
  * BlinkImages (object) - A set of key/value pairs indicating the blink mappings for each image on the robot. Each property in this object is the filename of an image asset saved to Misty. Each value is the image that Misty will "blink" when displaying that image on her screen.
  * OpenEyeMinMs (integer) - The minimum duration that Misty's eyes stay open while blinking.
  * OpenEyeMaxMs (integer) - The maximum duration that Misty's eyes stay open while blinking.
  * ClosedEyeMinMs (integer) - The minimum duration that Misty's eyes stay closed while blinking.
  * ClosedEyeMaxMs (integer) - The maximum duration that Misty's eyes stay closed while blinking.


### misty.PauseAudio

Pauses audio playback.

```javascript
// Syntax
misty.PauseAudio([int prePauseMs], [int postPauseMs]);
```

To resume playback, issue a [`misty.PlayAudio()`](./#misty-playaudio) command with the filename or URL of the paused audio source as the value for the `FileName` parameter.

When you pause audio playback and then issue a command to play audio from a different source, Misty considers playback from the paused source to be complete. This causes the system to raise an [`AudioPlayComplete`](../../../misty-ii/robot/sensor-data/#audioplaycomplete) event for the paused source. The next time Misty plays audio from that source, playback starts at the beginning.

When you pause audio playback for a live stream, Misty does not resume playback from the paused location. Instead, when you issue a `misty.PlayAudio()` command to resume playback for that stream, Misty starts playing from the point in the stream that is currently live.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* None

```javascript
// Example
misty.PauseAudio();
```

### misty.PlayAudio

Starts playing one of the audio assets saved to Misty's local storage, **or** starts playing audio from an HTTP, HTTPS, or RTSP URL.

```javascript
// Syntax
misty.PlayAudio(string fileName, int volume, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** For streaming audio with RTSP, Misty supports a subset of [Android's supported audio formats](https://developer.android.com/guide/topics/media/media-formats#audio-formats). For best results, we recommend setting up your RTSP stream to use a format of AAC and a container format of MPEG-4/MOV or MPEG-TS.
{{box op="end"}}

Arguments

* FileName (string) - **Option 1**: The filename (with type extension) of an audio file saved on Misty's local storage (for example, `s_Awe.wav`). **Option 2:** The HTTP/HTTPS/RTSP URL of an external audio source. You can use this option to play audio files that are hosted on the web, or to stream audio over the internet or your local area network (for example, from an RTSP stream).
* Volume (integer) - Optional. A value between 0 and 100 for the loudness of the audio clip. 0 is silent, and 100 is full volume. Defaults to `null`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Examples

// Plays an audio asset from Misty's local storage
misty.PlayAudio("s_Amazement.wav");

// Plays an RTSP audio stream
misty.PlayAudio("rtsp://<streaming-url>");

// Plays the live audio feed for a radio station
misty.PlayAudio("http://audio.kuer.org:8000/high")

// Plays an audio file hosted on the web
misty.PlayAudio("https://ia802609.us.archive.org/9/items/Free_20s_Jazz_Collection/Eubie_Blake-Charleston_Rag_11KHz_64kb.mp3");
```

### misty.RemoveBlinkMappings

Removes blink mappings from one or more image assets.

```javascript
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

```javascript
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

```javascript
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
* BlinkImages (string) - Optional. The blink mapping for one or more image assets, formatted as a comma-separated string of image asset pairs. You set a new blink mapping for an image asset by using an "=" sign. (For example, to set the blink mapping for `e_SystemLogoPrompt.jpg` to `e_Sleepy4.jpg`, use `"e_SystemLogoPrompt.jpg=e_Sleepy4.jpg"`).  
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.SetDisplaySettings

Adjusts general display settings. Currently, this command is only used to revert the display settings, redraw the default image display layer, and set the image to Misty's default startup eyes.

```javascript
misty.SetDisplaySettings(bool revertToDefault, [int postPauseMs], [int prePauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* revertToDefault (boolean) - If `true`, deletes all display layers, and re-draws the default image display layer with Misty's default startup eyes.

```javascript
// Example
misty.SetDisplaySettings(true);
```

### misty.SetFlashlight

Turns the LED flashlight on Misty's head on or off.

```javascript
// Syntax
misty.SetFlashlight(bool on, [int prePauseMs], [int postPauseMs]);
```

Parameters

* on (bool) - Turns the flashlight on (`true`) or off (`false`).

```javascript
// Example
misty.SetFlashlight(true);
```

### misty.SetImageDisplaySettings

Updates settings for an image display layer.

```javascript
// Syntax
misty.SetImageDisplaySettings(string layer, [bool revertToDefault], [bool deleted], [bool visible], [double opacity], [int width], [int height], [string stretch], [bool placeOnTop], [int rotation], [string horizontalAlignment], [string verticalAlignment], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default image layer settings the first time she draws content with the [`DisplayImage`](./#misty-displayimage) command. You can use the `SetImageDisplaySettings` command to adjust the settings and change the appearance for a specific image layer. Issuing a `SetImageDisplaySettings` command redraws the updated image layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* layer (string) - The name of the layer to adjust the settings for. If `null`, adjusts the settings for the default image layer (named `DefaultImageLayer`).
* revertToDefault (boolean) - Optional. If `true`, updates layer to use default image layer settings.
* deleted (boolean) - Optional. If `true`, completely deletes the layer and all associated settings. Deleted layers no longer consume computational resources.
* visible (boolean) - Optional. If `false`, hides the layer, but does not delete it. Note that a layer continues to consume computational resources, even when it is not visible.
* opacity (double) - Optional. Opacity for this layer. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the layer appears but is transparent. Defaults to `1`.
* width (int) - Optional. The width (in pixels) of the image display element. Defaults to the width of Misty's display (480). Must be greater than 0.
* height (int) - Optional. The height (in pixels) of the image display element. Defaults to the height of Misty's display (272). Must be greater than 0.
* stretch (string) - Optional. How to resize the image to fill the image display element. Options are: `None` - does not resize the image; `Fill` - resizes image to fill the display element without preserving aspect ratio; `Uniform` - resizes image to fill the dimensions of the display element while preserving aspect ratio; and `UniformToFill` - resizes image to fill the dimensions of the display element while preserving the aspect ratio (if the aspect ratio of the image and the display element rectangles are different, the image is clipped to fit in the display element). Defaults to `UniformToFill`.
* placeOnTop (boolean) - Optional. If `true`, the layer redraws on top of Misty's display each time you update the image or settings for this layer. Defaults to `true` for all layers **except** the `DefaultImageLayer`. To prevent Misty's eyes from redrawing on top of other layers each time Misty blinks, the `PlaceOnTop` property is set to `false` by default for the `DefaultImageLayer`.
* rotation (int) - Optional. The rotation (in degrees) for the image display element on this layer. Positive values apply a clockwise rotation; negative values apply a counter-clockwise rotation. Defaults to 0.
* horizontalAlignment (string) - Optional. Horizontal alignment of the image display element relative to the edges of Misty's display. Options are: `Left` - aligns the element to the left of Misty's display; `Right` - aligns the element to the right of Misty's display; `Center` - centers the element horizontally within Misty's display; and `Stretch` - resizes the image to fill the provided horizontal space. Defaults to `Center`.
* verticalAlignment (string) - Optional. Vertical alignment of the image display element relative to the edges of Misty's display. Options are: `Bottom` - aligns the element to the bottom of Misty's display; `Top` - aligns the element to the top Misty's display; `Center` - centers the element vertically within Misty's display; and `Stretch` - resizes the element to fill the provided vertical space. Defaults to `Center`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time n milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Makes the image layer called "MyImageLayer" invisible
misty.SetImageDisplaySettings("MyImageLayer", null, false, false);
```

### misty.SetTextDisplaySettings

Updates settings for a text display layer.

```javascript
// Syntax
misty.SetTextDisplaySettings(string layer, [bool revertToDefault], [bool deleted], [bool visible], [double opacity], [int size], [int weight], [bool wrap], [string horizontalAlignment], [string verticalAlignment], [string style], [int red], [int green], [int blue], [int width], [int height], [bool placeOnTop], [string fontFamily], [int rotation], [int padLeft], [int padTop], [int padRight], [int padBottom], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default text layer settings the first time she draws content with the [`DisplayText`](./#misty-displaytext) command. You can use the `SetTextDisplaySettings` command to adjust the settings and change the appearance for a specific text display layer. Issuing a `SetTextDisplaySettings` command redraws the updated text layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To change the color of the font, you must supply RGB values for each of the `Red`, `Green`, and `Blue` parameters. Supplying a value for just one of these parameters does not apply a new color to the text.
{{box op="end"}}

Arguments

* layer (string) - The name of the text layer to adjust the settings for. If `null`, adjusts the settings for the default text layer (named `DefaultTextLayer`).
* revertToDefault (boolean) - Optional. If `true`, updates layer to use default text layer settings.
* deleted (boolean) - Optional. If `true`, completely deletes the layer and all clears all of the layer's settings. Deleted layers no longer consume computational resources.
* visible (boolean) - Optional. If `false`, hides the layer, but does not delete it. Note that a layer continues to consume computational resources, even when it is not visible.
* opacity (double) - Optional. Opacity for this layer. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the layer appears but is transparent. Defaults to `1`
* size (int) - Optional. Font size (in px). Must be greater than 0. Defaults to 50.
* weight (int) - Optional. Numerical value between 0-1000 that specifies font thickness. Use higher values for thicker font. Defaults to 400.
* wrap (boolean) - Optional. Whether strings of text longer than the width of the text display element should wrap onto the next line. Defaults to `true`.
* horizontalAlignment (string) - Optional. Horizontal alignment of the text within the text display element. Options are: `Left` - aligns the text to the left of the element; `Right` - aligns the text to the right of the element; and `Center` - centers the text horizontally in the element. Defaults to `Center`. **Note:** This property only applies to the alignment of text within the text display element. The text display element itself is always center-aligned relative to the edges of Misty's display.  
* verticalAlignment (string) - Optional. Vertical alignment of the text display element. Options are: `Bottom` - aligns the element to the bottom of Misty's display; `Top` - aligns the element to the top Misty's display; and `Center` - centers the element vertically within Misty's display. Defaults to `Center`. 
* style (string) - Optional. Applies an `Italic`, `Oblique`, or `Normal` style to the font. Defaults to `Normal`.
* red (int) - The red RGB color value for the font (0 - 255). Default is 255.
* green (int) - The green RGB color value for the font (0 - 255). Default is 255.
* blue (int) - The blue RGB color value for the font (0 - 255). Default is 255.
* width (int) - Optional. The width (in pixels) of the text display element. Defaults to the width of Misty's display (480). Must be greater than 0.
* height (int) - Optional. The height (in pixels) of the text display element. Defaults to the height of Misty's display (272). Must be greater than 0.
* placeOnTop (boolean) - Optional. If `true`, the layer redraws on top of Misty's display each time you update the text or settings for this layer. Defaults to `true`.
* fontFamily (string) - Optional. The font family to use for the text on this layer. No definitive list of supported fonts is available at this time. Defaults to Century Gothic.
* rotation (int) - Optional. The rotation (in degrees) for the text display element on this layer. Positive values apply a clockwise rotation; negative values apply a counter-clockwise rotation. Defaults to 0.
* padLeft (int) - Optional. The left padding (in pixels) of the text within the text display element. Default is 0.
* padTop (int) - Optional. The top padding (in pixels) of the text within the text display element. Default is 0. The `PadTop` property is still under implementation. Feel free to experiment with different values, but recognize that this property may behave unpredictably at this time.
* padRight (int) - The right padding (in pixels) of the text within the text display element. The `PadRight` property is still under implementation. Feel free to experiment with different values, but recognize that this property may behave unpredictably at this time.
* padBottom (int) - Optional. The bottom padding (in pixels) of the text within the text display element. Default is 0. The `PadBottom` property is still under implementation. Feel free to experiment with different values, but recognize that this property may behave unpredictably at this time.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Makes the text layer called "MyTextLayer" invisible
misty.SetTextDisplaySettings("MyTextLayer", null, false, false);
```


### misty.SetVideoDisplaySettings

Updates settings for a video display layer.

```javascript
// Syntax
misty.SetVideoDisplaySettings(layer string, [bool revertToDefault], [bool deleted], [bool visible], [double opacity], [int width], [int height], [string stretch], [int rotation], [bool placeOnTop], [string horizontalAlignment], [string verticalAlignment], [bool repeat], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default video layer settings the first time she draws content with the [`DisplayVideo`](./#misty-displayvideo) command. You can use the `SetVideoDisplaySettings` command to adjust the settings and change the appearance for a specific video layer. Issuing a `SetVideoDisplaySettings` command redraws the updated video layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* layer (string) - The name of the layer to adjust the settings for. If `null`, adjusts the settings for the default video layer (named `DefaultVideoLayer`).
* revertToDefault (boolean) - Optional. If `true`, updates layer to use default video layer settings.
* deleted (boolean) - Optional. If `true`, completely deletes the layer and all associated settings. Deleted layers no longer consume computational resources.
* visible (boolean) - Optional. If `false`, hides the layer, but does not delete it. Note that a layer continues to consume computational resources, even when it is not visible.
* opacity (double) - Optional. Opacity for this layer. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the layer appears but is transparent. Defaults to `1`.
* width (int) - Optional. The width (in pixels) of the video display element on this layer. Defaults to the width of Misty's display (480). Must be greater than 0.
* height (int) - Optional. The height (in pixels) of the video display element on this layer. Defaults to the height of Misty's display (272). Must be greater than 0.
* stretch (string) - Optional. How to resize the video to fill the allotted space. Options are: `None` - does not resize the video; `Fill` - resizes video to fill the space without preserving aspect ratio; `Uniform` - resizes video to fill the alloted space while preserving aspect ratio; and `UniformToFill` - resizes video to fill the dimensions of the alloted space while preserving the aspect ratio (if the aspect ratio of the video and the destination rectangles are different, the video is clipped to fit in the alloted space). Defaults to `UniformToFill`.
* rotation (int) - Optional. The rotation (in degrees) for the video display element on this layer. Positive values apply a clockwise rotation; negative values apply a counter-clockwise rotation. Defaults to 0.
* placeOnTop (boolean) - Optional. If `true`, this layer redraws on top of Misty's display each time you update the video or layer settings. Defaults to `true`.
* horizontalAlignment (string) - Optional. Horizontal alignment of the video display element relative to the edges of Misty's display. Options are: `Left` - aligns the element to the left of Misty's display; `Right` - aligns the element to the right of Misty's display; `Center` - centers the element horizontally within Misty's display; and `Stretch` - resizes the element to fill the provided horizontal space. Defaults to `Center`.
* verticalAlignment (string) - Optional. Vertical alignment of the video display element relative to the edges of Misty's display. Options are: `Bottom` - aligns the element to the bottom of Misty's display; `Top` - aligns the element to the top Misty's display; `Center` - centers the element vertically within Misty's display; and `Stretch` - resizes the element to fill the provided vertical space. Defaults to `Center`.
* repeat (boolean) - Optional. When `true`, the video on this layer repeats after it finishes playing. Defaults to `true`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Makes the video layer called "MyVideoLayer" invisible
misty.SetVideoDisplaySettings("MyVideoLayer", null, false, false);
```

### misty.SetWebViewDisplaySettings

Updates settings for a webview display layer.

```javascript
misty.SetWebViewDisplaySettings(string layer, [bool revertToDefault], [bool deleted], [bool visible], [int width], [int height], [string stretch], [bool placeOnTop], [string horizontalAlignment], [string verticalAlignment], [int prePauseMs], [int postPauseMs]);
```

Misty uses the default webview layer settings the first time she draws content with the [`DisplayWebView`](./#displaywebview) command. You can use the `SetWebViewDisplaySettings` command to adjust the settings and change the appearance for a specific webview layer. Issuing a `SetWebViewDisplaySettings` command redraws the updated webview layer on Misty's display. For more information about layers, see [Using Misty's Display](../../../misty-ii/robot/misty-ii/#using-misty-39-s-display).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* layer (string) - Optional. The name of the layer to adjust the settings for. If `null`, adjusts the settings for the default webview layer (named `DefaultWebViewLayer`).
* revertToDefault (boolean) - Optional. If `true`, updates layer to use default webview layer settings.
* deleted (boolean) - Optional. If `true`, completely deletes the layer and all associated settings. Deleted layers no longer consume computational resources.
* visible (boolean) - Optional. If `false`, hides the layer, but does not delete it. Note that a layer continues to consume computational resources, even when it is not visible.
* width (int) - Optional. The width (in pixels) of the webview element. Defaults to the width of Misty's display (480). Must be greater than 0.
* height (int) - Optional. The height (in pixels) of the webview element. Defaults to the height of Misty's display (272). Must be greater than 0.
* stretch (string) - Optional. How to resize the webview to fill the provided space. Options are: `None` - does not resize the webview; `Fill` - resizes webview to fill the provided space without preserving the aspect ratio; `Uniform` - resizes webview to fill the provided space while preserving aspect ratio; and `UniformToFill` - resizes webview to fill the provided space while preserving the aspect ratio (if the aspect ratio of the media and destination rectangles are different, the media is clipped to fit in the destination). The default setting for a webview layer is `UniformToFill`.
* placeOnTop (boolean) - Optional. If `true`, the layer redraws on top of Misty's display each time the layer, the webview, or the settings are updated. By default, the system draws all images on top of Misty's display when they are drawn the first time. Defaults to `true`.
* horizontalAlignment (string) - Optional. Horizontal alignment for the webview on this layer. Options are: `Left` - aligns the content to the left of the provided space; `Right` - aligns the content to the right of the provided space; `Stretch` - resizes the content to fill the provided horizontal space; and `Center` - centers the content horizontally in the provided space. The default `HorizontalAlignment` setting for a webview layer is `Center`.
* verticalAlignment (string) - Optional. Vertical alignment for the webview on this layer. Options are: `Bottom` - aligns the content to the bottom of the provided space; `Top` - aligns the content to the top of the provided space; `Stretch` - resizes the content to fill the provided vertical space; and `Center` - centers the content vertically in the provided space.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Makes the webview layer called "MyWebViewLayer" invisible
misty.SetWebViewDisplaySettings("MyWebViewLayer", null, false, false);
```

### misty.Speak

Starts Misty speaking text using her onboard text-to-speech engine.

```javascript
// Syntax
misty.Speak(string text, [bool flush = "false"], [string utteranceId], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

By default, Misty speaks in US English. To stop Misty speaking before she reaches the end of a text-to-speech utterance, use the [`misty.StopSpeaking`](./#misty-stopspeaking) command.

Misty raises a [`TextToSpeechComplete`](../../../misty-ii/robot/sensor-data/#texttospeechcomplete) event when she finishes speaking a text-to-speech utterance. To receive a `TextToSpeechComplete` event message for a given utterance in your skills, you must set an `utteranceId` when you issue the `Speak` command, and you must register a listener for `TextToSpeechComplete` events.

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

Use **either** the `time` or `strength` attribute, but not both.

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
* utteranceId (string) - Optional. An identifier of your choosing for this instance of the `Speak` command. You must set a value for `utteranceId` in order to receive a [`TextToSpeechComplete`](../../../misty-ii/robot/sensor-data/#texttospeechcomplete) event when Misty stops speaking this utterance.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.Speak("Hello, world!");
```

### misty.StopAudio

Stops audio playback. When you use this command, the system raises an [`AudioPlayComplete`](../../../misty-ii/robot/sensor-data/#audioplaycomplete) event for the stopped audio source.

```javascript
// Syntax
misty.StopAudio([int prePauseMs], [int postPauseMs]);
```

This command does **not** stop playback of onboard text-to-speech utterances that you create with the [`misty.Speak()`](./#misty-speak) command. To stop an onboard text-to-speech utterance, you must use the [`misty.StopSpeaking()`](./#misty-stopspeaking) command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopAudio();
```

### misty.StopSpeaking

Stops Misty speaking the currently playing text-to-speech utterance.

```javascript
// Syntax
misty.StopSpeaking([int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopSpeaking()
```

### misty.TransitionLED

Sets Misty's LED to transition between two colors.

```javascript
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
* timeMs (int) - The duration (in milliseconds) between each transition. Must be greater than `3`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
misty.TransitionLED(255, 0, 0, 0, 255, 0, "Breathe", 300)
```

## External Requests

### misty.SendExternalRequest

Sends an HTTP request from Misty to an external server. You can use `misty.SendExternalRequest()` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

```javascript
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

### misty.Drive

Drives Misty forward or backward at a specific speed until cancelled. Call `misty.Stop()` to cancel driving. 

```javascript
// Syntax
misty.Drive(double linearVelocity, double angularVelocity, [int prePauseMs], [int postPauseMs]);
```

When using the `misty.Drive()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Arguments
* linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
* angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Drive(0, 0);
```

### misty.DriveArc

Drives Misty in an arc. Misty continues driving until her current heading matches the desired absolute heading passed into this command.

```javascript
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

```javascript
// Example
// Misty drives in an arc with a 1m radius for 5 
// seconds to obtain an absolute heading of 180 degrees
misty.DriveArc(180, 1, 5000, false)
```

### misty.DriveHeading

Drives Misty forward or backward in a straight line. While driving, Misty continuously adjusts her current heading to maintain the desired absolute heading.

```javascript
// Syntax
misty.DriveHeading(double heading, double distance, double timeMs, bool reverse, [int prePauseMs], [int postPauseMs])
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
* reverse (boolean) - If `true`, Misty drives in reverse. Default is `false`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Misty drives forward 0.5m over 4 seconds and
// maintains an absolute heading of 90 degrees
misty.DriveHeading(90, 0.5, 4000, false);
```

### misty.DriveTime

Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

```javascript
// Syntax
misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
```

When using the `misty.DriveTime()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Arguments

- linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
- timeMs (integer) - A value in milliseconds that specifies the duration of movement. Misty will not drive if you pass in a value of less than 100 for this argument.
- degree (double) - (optional) The number of degrees to turn. **Note:** Supplying a `degree` value recalculates linear velocity.
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DriveTime(0, 0, 0);
```

### misty.DriveTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

```javascript
// Syntax
misty.DriveTrack(double leftTrackSpeed, double rightTrackSpeed, [int prePauseMs], [int postPauseMs])
```

Arguments
- leftTrackSpeed (double) - A value for the speed of the left track, range: -100 (full speed backward) to 100 (full speed forward).
- rightTrackSpeed (double) - A value for the speed of the right track, range: -100 (full speed backward) to 100 (full speed forward).
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DriveTrack(0, 0);
```

### misty.Halt

Stops all motor controllers, including drive motor, head/neck, and arm.

```javascript
// Syntax
misty.Halt([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Halt();
```

### misty.MoveArm

Moves one or both of Misty's arms.

```javascript
// Syntax
misty.MoveArm(string arm, double position, [double velocity], [double duration], [int prePauseMs], [int postPauseMs]);
```

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument.
{{box op="end"}}

Arguments

* arm (string) - The arm to move. You must use either `left`, `right`, or `both`.
* position (double) - The new position to move the arm to. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* velocity (double) - Optional. Velocity with which the arm (or arms) move. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for the arm or arms to reach the designated position. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArm("both", 0, 100);
```

### misty.MoveArmDegrees

Moves one of Misty's arms to a specified location in degrees.

```javascript
// Syntax
misty.MoveArmDegrees(string arm, double degrees, [double velocity], [double duration], [int prePauseMs], [int postPauseMs])
```

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)


{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument.
{{box op="end"}}

Arguments

* arm (string) - The arm to move. Use `left`, `right`, or `both`.
* degrees (double) - The location in degrees to move the arm (or arms) to. Value range: 90 (fully down) to -26 (fully up).
* velocity (double) - Optional. Velocity with which the arm (or arms) move. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for the arm (or arms) to reach the designated position. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArmDegrees("right", -90, 50);
```

### misty.MoveArmRadians

Moves one of Misty's arms to a specified location in radians.

```javascript
// Syntax
misty.MoveArmRadians(string arm, double radians, [double velocity], [double duration], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument.
{{box op="end"}}

Arguments

* arm (string) - The arm to move. Use `left`, `right`, or `both`.
* radians (double) - The position in `radians` to move the arm to. For information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)
* velocity (double) - Optional. Velocity with which the arm (or arms) move. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for the arm or arms to reach the designated position. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArmRadians("left", -1.5708, 50);
```


### misty.MoveArms

Moves one or both of Misty's arms. You can use this command to control both arms simultaneously or one at a time.

```javascript
// Syntax
misty.MoveArms(double leftArmPosition, double rightArmPosition, [double leftArmVelocity], [double rightArmvelocity], [double duration], [double prePauseMs], [double postPauseMs]);
```

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must specify values for either the arm velocity OR the `duration` arguments.
{{box op="end"}}

Arguments

* leftArmPosition (double) - Optional. The new position of Misty's left arm. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* rightArmPosition (double) - Optional. The new position of Misty's right arm. Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* leftArmVelocity (double) - Optional. The velocity with which the left arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* rightArmVelocity (double) - Optional. The velocity with which the right arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for both arms to reach the designated positions.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArms(0, 0, 100, 100);
```

### misty.MoveArmsDegrees

Moves one or both of Misty's arms. You can use this command to control both arms simultaneously or one at a time.

```javascript
// Syntax
misty.MoveArmsDegrees(double leftArmPosition, double rightArmPosition, [double leftArmVelocity], [double rightArmvelocity], [double duration], [double prePauseMs], [double postPauseMs]);
```

When moving Misty's arms, it's helpful to understand their orientation.

* At 0 degrees, Misty's arms point straight forward along her X axis, parallel to the ground.
* At +90 degrees, Misty's arms point straight down towards the ground.
* At +/- 180 degrees, Misty's arms would face straight back, pointing toward her backpack; however, Misty's arms are not currently configured to move to this position.
* At -90/+270 degrees, Misty's arms would point straight up towards her head, perpendicular to the ground; however, the upward movement of Misty's arm movement is currently limited to -29 degrees.

For more information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must specify values for either the arm velocity OR the `duration` arguments.
{{box op="end"}}

Arguments

* leftArmPosition (double) - Optional. The new position of Misty's left arm (in degrees). Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* rightArmPosition (double) - Optional. The new position of Misty's right arm (in degrees). Expects a value of 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.
* leftArmVelocity (double) - Optional. The velocity with which the left arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* rightArmVelocity (double) - Optional. The velocity with which the right arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for both arms to reach the designated positions.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArmsDegrees(0, 0, 100, 100);
```

### misty.MoveArmsRadians

Moves one or both of Misty's arms. You can use this command to control both arms simultaneously or one at a time.

```javascript
// Syntax
misty.MoveArmsRadians(double leftArmPosition, double rightArmPosition, [double leftArmVelocity], [double rightArmvelocity], [double duration], [double prePauseMs], [double postPauseMs]);
```

For information about Misty's arm movement ranges, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must specify values for either the arm velocity OR the `duration` arguments.
{{box op="end"}}

Arguments

* leftArmPosition (double) - Optional. The new position of Misty's left arm (in radians).
* rightArmPosition (double) - Optional. The new position of Misty's right arm (in radians).
* leftArmVelocity (double) - Optional. The velocity with which the left arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* rightArmVelocity (double) - Optional. The velocity with which the right arm moves. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* duration (double) - Optional. Time (in seconds) it takes for both arms to reach the designated positions.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveArmsRadians(-1.5708, -1.5708, 100, 100);
```

### misty.MoveHead

Moves Misty's head to a new position along its pitch, roll, and yaw axes.

```javascript
// Syntax
misty.MoveHead(double pitch, double roll, double yaw, [double velocity], [double duration], [string units], [int prePauseMs], [int postPauseMs]);
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

- pitch (double) - Where to move Misty's head along its *pitch* rotational axis. Pitch determines the up and down movement of Misty's head.
- roll (double) - Where to move Misty's head along its *roll* rotational axis. Roll determines the tilt ("ear" to "shoulder") movement of Misty's head.
- yaw (double) - Where to move Misty's head along its *yaw* rotational axis. Yaw determines how far Misty turns her head to the left or right.
- velocity (double) - Optional. The velocity with which the head moves. Velocity value is a percentage of maximum velocity. Value range: 0 to 100. Defaults to 10.
- duration (double) - Optional. Time (in seconds) Misty takes to move her head from its current position to its new position. When you use the `duration` argument, movement along each axis (pitch, roll, and yaw) completes at the same time, without regard to distance traveled.
- units (string) -  Optional. A string value of `degrees`, `radians`, or `position` that determines which unit to use in moving Misty's head. Defaults to `degrees`.
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.


```javascript
// Misty looks straight ahead
misty.MoveHead(0, 0, 0, 100);
```

### misty.MoveHeadDegrees
Moves Misty's head in one of three axes (tilt, turn, or up-down). For information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

```javascript
// Syntax
misty.MoveHeadDegrees(double pitch, double roll, double yaw, [double velocity], [double duration], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument. If you pass in values for both arguments, or if you pass in values for neither arguments, the system throws an exception.
{{box op="end"}}

Arguments

- pitch (double) - Where to move Misty's head along its *pitch* rotational axis. Pitch determines the up and down movement of Misty's head. Values range from approximately -40 (fully up) to 26 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
- roll (double) - Where to move Misty's head along its *roll* rotational axis. Roll determines the tilt ("ear" to "shoulder") movement of Misty's head. Values range from -40 (fully left) to 40 (fully right). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
- yaw (double) - Where to move Misty's head along its *yaw* rotational axis. Yaw determines how far Misty turns her head to the left or right. Values range from -81 (fully right) to 81 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
- velocity (double) - Optional. The velocity with which the head moves. Velocity value is a percentage of maximum velocity. Value range: 0 to 100. Defaults to 10.
- duration (double) - Optional. Time (in seconds) Misty takes to move her head from its current position to its new position. When you use the `duration` argument, movement along each axis (pitch, roll, and yaw) completes at the same time, without regard to distance traveled.
- prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveHeadDegrees(10, 10, 10, 100);
```

### misty.MoveHeadRadians

Moves Misty's head in one of three axes (tilt, turn, or up-down). For information about the range of movement in each direction, see [Coordinate System & Movement Ranges.](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges)

```javascript
// Syntax
misty.MoveHeadRadians(double pitch, double roll, double yaw, [double velocity], [double duration], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You must pass in a value for either the `duration` OR the `velocity` argument. If you pass in values for both arguments, or if you pass in values for neither arguments, the system throws an exception.
{{box op="end"}}

Arguments

* pitch (double) - Where to move Misty's head along its *pitch* rotational axis. Pitch determines the up and down movement of Misty's head. Values range from -0.1662 (fully up) to 0.6094 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - Where to move Misty's head along its *roll* rotational axis. Roll determines the tilt ("ear" to "shoulder") movement of Misty's head. Values range from -0.75 (head tilted fully to the left shoulder) to 0.75 (head fully to the right shoulder). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* yaw (double) - Where to move Misty's head along its *yaw* rotational axis. Yaw determines how far Misty turns her head to the left or right. Values range from -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* velocity (double) - Optional. The velocity with which the head moves. Velocity value is a percentage of maximum velocity. Value range: 0 to 100. Defaults to 10.
* duration (double) - Optional. Time (in seconds) Misty takes to move her head from its current position to its new position. When you use the `duration` argument, movement along each axis (pitch, roll, and yaw) completes at the same time, without regard to distance traveled.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.MoveHeadRadians(0.5708, 0.5708, 1.5708, 100);
```

### misty.Stop

Stops Misty's movement.

```javascript
// Syntax
misty.Stop([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```javascript
// Syntax
misty.DeleteSlamMap(string key, [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

Arguments

* key (string) - The unique `key` value of the map to delete. **Note:** This command does not work when passed the value for the `name` associated with a map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.DeleteSlamMap("Map_20190912_21.16.32.UTC");
```

### misty.FollowPath

Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path. Misty will not be able to successfully follow a path if unmapped obstacles are in her way.

```javascript
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

```javascript
// Example
misty.FollowPath("4:3,8:8,10:15");
```

### misty.GetMap

Obtains the occupancy grid data for Misty's currently active map.

```javascript
// Syntax
misty.GetMap([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

To obtain a valid response from `misty.GetMap()`, Misty must first have successfully generated a map. To change the currently active map, use the [`SetCurrentSlamMap`](../../../misty-ii/rest-api/api-reference/#setcurrentslammap) command in Misty's REST API.

Misty’s maps are squares that are constructed around her initial physical location when she starts mapping. When a map is complete, it is a square with Misty’s starting point at the center.

The occupancy grid for the map is represented by a two-dimensional matrix. Each element in the occupancy grid represents an individual cell of space. The value of each element (0, 1, 2, or 3) indicates the nature of the space in those cells (respectively: "unknown", "open", "occupied", or "covered").

Each cell corresponds to a pair of X,Y coordinates that you can use with the `misty.FollowPath()`, `misty.DriveToLocation()`, and `misty.GetSlamPath()` commands. The first cell in the first array of the occupancy grid is the origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetMap();
```

Returns

* Result (object) - An object containing the following key-value pairs. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Grid (array of arrays) - The occupancy grid for the most recent map Misty has generated, represented by a matrix of cells. The number of arrays is equal to the value of the `height` parameter. The number of cells is equal to the product of `height` x `width`. Each individual value (0, 1, 2, or 3) in the matrix represents a single cell of space. 0 indicates "unknown" space, 1 indicates "open" space, 2 indicates "occupied" space, and 3 indicates "covered" space. Each cell corresponds to an X,Y coordinate on the occupancy grid. The first cell in the first array is the X,Y origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. If no map is available, grid returns `null`.
  * Height (integer) - The height of the occupancy grid matrix (in number of cells).
  * IsValid (boolean) - Returns a value of `true` if the data returned represents a valid map. If no valid map data is available, returns a value of `false`.
  * MetersPerCell (integer) - A value in square meters stating the size of each cell in the occupancy grid matrix.
  * OriginX (float) - The distance in meters from the X value of the occupancy grid origin (0,0) to the X coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to an X coordinate on the occupancy grid, use the formula 0 - (`originX` / `metersPerCell`). Round the result to the nearest whole number. 
  * OriginY (float) - The distance in meters from the Y value of the occupancy grid origin (0,0) to the Y coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to a Y coordinate on the occupancy grid, use the formula 0 - (`originY` / `metersPerCell`). Round the result to the nearest whole number. 
  * Size (integer) - The total number of map cells represented in the grid array. Multiply this number by the value of meters per cell to calculate the area of the map in square meters.
  * Width (integer) - The width of the occupancy grid matrix (in number of cells). 

### misty.GetCurrentSlamMap

Obtains the key for the currently active map.

```javascript
// Syntax
misty.GetCurrentSlamMap([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetCurrentSlamMap()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetCurrentSlamMap()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.GetCurrentSlamMap();

function _GetCurrentSlamMap(data) {
    // Prints key for current map to SkillData event listeners
    // For example: Map_20191011_18.06.52.UTC
    misty.Debug(data.Result)
}
```

Returns

* Result (string) - The unique key associated with the currently active map. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetHazardSettings

Obtains the current hazards system settings for Misty's time-of-flight and bump sensors.

```javascript
// Syntax
misty.GetHazardSettings([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetHazardSettings()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetHazardSettings()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetHazardSettings();

function _GetHazardSettings(data) {
    misty.Debug(JSON.stringify(data));
}
```

Returns

* Result (object) - Describes the current hazards system settings for Misty's time-of-flight and bump sensors. Includes the following key/value pairs:
  * BumpSensors (array) - An array of objects that describe whether each bump sensor is enabled or disabled. Each object in the `bumpSensors` array includes the following key/value pairs:
    * Enabled (boolean) - Hazards are enabled for this bump sensor if `true`, and are disabled if `false`.
    * SensorName (string) - The name of this bump sensor. One of the following: `Bump_FrontRight`, `Bump_FrontLeft`, `Bump_RearRight`, or `Bump_RearLeft`.
  * TimeOfFlightSensors (array) - An array of objects that describe the distance threshold that triggers a hazard response for each of Misty's time-of-flight sensors. Includes the following key/value pairs:
    * SensorName (string) - The name of this time-of-flight sensor. One of the following: `TOF_Right`, `TOF_Center`, `TOF_Left`, `TOF_Back`, `TOF_DownFrontRight`, `TOF_DownFrontLeft`, `TOF_DownBackRight`, `TOF_DownBackLeft`.
    * Threshold (double) - The minimum distance (in meters) that triggers a hazard state for this time-of-flight sensor. A `threshold` value of `0` means hazards are disabled for this sensor.

### misty.GetSlamIrExposureAndGain

Obtains the current exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor.

```javascript
// Syntax
misty.GetSlamIrExposureAndGain([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/javascript-sdk/api-reference/#misty-startslamstreaming) command.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamIrExposureAndGain()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamIrExposureAndGain()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```javascript
// Syntax
misty.GetSlamMaps([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamMaps()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamMaps()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```json
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

```javascript
// Syntax
misty.GetSlamNavigationDiagnostics([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

The information in the data object for this command is primarily used by the Misty Robotics engineering and support staff to troubleshoot and root-cause issues with Misty's SLAM system. The contents of this data object are likely to change without notice in future system updates.

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamNavigationDiagnostics()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamNavigationDiagnostics()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

Returns

* Result (string) - A stringified JSON object with diagnostic information about the current status of Misty's SLAM system. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamPath

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the `path` parameter of `misty.FollowPath()` for Misty to follow this path to the desired location.

```javascript
// Syntax
misty.GetSlamPath(double X, double Y, [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

**Important!** Make sure to call `misty.StartTracking()` to start Misty tracking her location before using this command, and call `misty.StopTracking()` to stop Misty tracking her location after using this command.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* X (double) - The X coordinate of the destination.
* Y (double) - The Y coordinate of the destination.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetSlamPath(100, 250);
```

Returns

* Result (array) - An array containing integer pairs. Each pair specifies the X,Y coordinates for a waypoint on the path. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetSlamStatus

Obtains values representing the current activity and status of Misty's SLAM system. Check these values for information about the current status of Misty's depth sensor, the SLAM system, and to see information relevant to any ongoing mapping or tracking activities.

```javascript
// Syntax
misty.GetSlamStatus([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We suggest primarily using the values of `Status`/`StatusList` when coding SLAM functionality in your skills and robot applications, and only using the `SensorStatus` and `RunMode` values as supplemental information if needed or for debugging purposes.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamStatus()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetSlamStatus()>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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
    * 0x10000: `Docking_Station_Detector_Enabled` - The docking station detector is enabled.
    * 0x20000: `Docking_Station_Detector_Processing` - The docking station detector is processing frames.
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

```javascript
// Syntax
misty.GetSlamVisibleExposureAndGain([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty does not return valid values for exposure and gain if you invoke this command when the SLAM system is not streaming. To start SLAM streaming, issue a [`StartSlamStreaming`](../../../misty-ii/rest-api/api-reference/#startslamstreaming) command.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetSlamVisibleExposureAndGain()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetSlamVisibleExposureAndGain()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```json
{
   "Result": {
      "Exposure": 0.007987,
      "Gain": 2
   }
}
```

### misty.RenameSlamMap

Renames an existing map.

```javascript
// Syntax
misty.RenameSlamMap(string key, string name, [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

Arguments

* key (string) - The unique `key` value of the map to rename.
* name (string) - A new `name` value for the map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.RenameSlamMap("Map_20190912_21.16.06.UTC", "NewName");
```

### misty.ResetSlam

Resets Misty's SLAM sensors.

```javascript
// Syntax
misty.ResetSlam([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ResetSlam();
```

### misty.SetCurrentSlamMap

Sets a map to be the active map for tracking and relocalization.

```javascript
// Syntax
misty.SetCurrentSlamMap(string key, [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

Arguments

* key (string) - The unique `key` of the map to make active. **Note:** This command does not work when passed the value for the `name` associated with a map.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetCurrentSlamMap("Map_20190912_21.16.06.UTC");
```

### misty.SetSlamIrExposureAndGain

Sets the exposure and gain settings for the infrared cameras in the Occipital Structure Core depth sensor.

```javascript
// Syntax
misty.SetSlamIrExposureAndGain(double exposure, int gain, [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Changing the gain and exposure levels for the infrared cameras in the depth sensor can impact the performance of Misty's SLAM system. We recommend that you avoid changing these settings unless working with a member of the Misty support team.

If you issue a `SetSlamIrExposureAndGain` command when the SLAM system is not in a `streaming` state, the camera's settings will not update. To start SLAM streaming, issue a [`StartSlamStreaming`](./#misty-startslamstreaming) command.
{{box op="end"}}

Arguments

* Exposure (double) - Exposure levels for the infrared cameras in the depth sensor (in seconds). Range: `0.001` - `0.033`.
* Gain (integer) - Gain levels for the infrared cameras in the depth sensor (in dB). Range: `0` - `3`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetSlamIrExposureAndGain(0.014468, 3);
```

### misty.SetSlamVisibleExposureAndGain

Sets the exposure and gain settings for the fisheye camera in the Occipital Structure Core depth sensor.

```javascript
// Syntax
misty.SetSlamVisibleExposureAndGain(double exposure, double gain, [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you issue a `SetSlamVisibleExposureAndGain` command when the SLAM system is not in a `streaming` state, the camera's settings will not update. To start streaming, you can issue a [`StartSlamStreaming`](./#misty-startslamstreaming) command.
{{box op="end"}}

Arguments

* exposure (double) - Exposure levels for the fisheye camera in the depth sensor (in seconds). Range: `0.001` - `0.033`
* gain (integer) - Gain levels for the fisheye camera in the depth sensor (in dB). Range: `1` - `8`
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetSlamVisibleExposureAndGain(0.007987, 2);
```

### misty.StartLocatingDockingStation

Starts Misty locating the position and orientation (pose) of the docking station.

```javascript
// Syntax
misty.StartLocatingDockingStation([int startStreamingTimeout], [int enableIrTimeout], [bool enableAutoExposure], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

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
* enableAutoExposure (bool) - Optional. Whether Misty should automatically adjust the exposure for the IR cameras during docking station location. Default is `true`.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StartMapping

Starts Misty mapping an area.

```javascript
// Syntax
misty.StartMapping([int prePauseMs], [int postPauseMs]);
```

Misty saves each map she creates to local storage. Each map is associated with a unique key at the time of the map's creation. Map keys are formatted as date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`). To obtain a list of Misty's existing maps, use the [`GetSlamMaps`](../../../misty-ii/rest-api/api-reference/#getslammaps) command in Misty's REST API.

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's SLAM system can run out of memory, especially while mapping mapping large, complex areas. When this happens, the SLAM system shuts down, and Misty saves any progress made on the current map to her local storage.

This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartMapping();
```

### misty.StartSlamStreaming

Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

```javascript
// Syntax
misty.StartSlamStreaming([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Important!** Always use `misty.StopSlamStreaming()` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Calling `misty.StopSlamStreaming()` turns off the laser in the depth sensor and lowers Misty's power consumption.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartSlamStreaming();
```

### misty.StartTracking

Starts Misty tracking her location.

```javascript
// Syntax
misty.StartTracking([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartTracking();
```

### misty.StopLocatingDockingStation

Stops Misty locating the docking station.

```javascript
// Syntax
misty.StopLocatingDockingStation([int stopStreamingTimeout], [int disableIrTimeout], [int prePauseMs], [int postPauseMs])
```

This command is not functional with the Misty II Basic Edition.

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

```javascript
// Syntax
misty.StopMapping([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPauseMs` is not used.

```javascript
// Example
misty.StopMapping();
```

### misty.StopSlamStreaming

Closes the data stream from the Occipital Structure Core depth sensor. Calling this command turns off the laser in the depth sensor and lowers Misty's power consumption.

```javascript
// Syntax
misty.StopSlamStreaming([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

**Important!** Always use this command to close the depth sensor data stream after using `misty.StartSlamStreaming()` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPauseMs` is not used.

```javascript
// Example
misty.StopSlamStreaming();
```

### misty.StopTracking

Stops Misty tracking her location.

```javascript
// Syntax
misty.StopTracking([int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopTracking();
```

### misty.TakeDepthPicture

Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of "unknown" values in the form of `NaN` ("not a number") values.

```javascript
// Syntax
misty.TakeDepthPicture([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_TakeDepthPicture()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_TakeDepthPicture()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.TakeDepthPicture();
```

Returns

* Result (object) - An object containing depth information about the image matrix, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Height (integer) - The height of the matrix.
  * Image (array) - A matrix of size `height` x `width` containing individual values of type float. Each value is the distance in millimeters from the sensor for each pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. Note that as the robot moves further away from a scene being viewed, each pixel value will represent a larger surface area. Conversely, if it moves closer, each pixel value will represent a smaller area.
  * Width (integer) - The width of the matrix.

### misty.TakeFisheyePicture

Takes a photo using the camera on Misty’s Occipital Structure Core depth sensor.

```javascript
// Syntax
misty.TakeFisheyePicture([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.TakeFisheyePicture();

function _TakeFisheyePicture(data) {
  // Print the name and Base64-encoded data for the fisheye picture
  misty.Debug(JSON.stringify(data.Result.Name))
  misty.Debug(JSON.stringify(data.Result.Base64))
}
```

Returns

* Result (object) -  An object containing image data and meta information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
  * Base64 (string) - A string containing the Base64-encoded image data.
  * ContentType (string) - The type and format of the image returned. For pictures you take with the fisheye camera, this is `image/png`.
  * Height (integer) - The height of the picture in pixels.
  * Name (string) - The name of the picture. For pictures you take with the fisheye camera, this value is `OccipitalVisibleImage`.
  * Width (integer) - The width of the picture in pixels.
  * SystemAsset (bool) - Whether the image is a one of Misty's default system assets. For pictures you take with Misty's fisheye camera, this value is `false`.

### misty.UpdateHazardSettings

Changes the hazard system settings for Misty's bump and time-of-flight sensors. Use this command to enable or disable hazard triggers for all bump or time-of-flight sensors, or to adjust the hazard trigger settings for each sensor individually.

```javascript
// Syntax
misty.UpdateHazardSettings(bool revertToDefault, [bool disableTimeOfFlights], [bool disableBumpSensors], [string bumpSensorsEnabled], [string timeOfFlightThresholds], [int prePauseMs], [int postPauseMs])
```

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

Arguments:

* revertToDefault (boolean) - If `true`, sets Misty to use the default hazard system settings (listed above). No effect if `false`. Default is `false`.
* disableTimeOfFlights (boolean) - Optional. If `true`, disables hazards for all time-of-flight sensors by setting the `threshold` for each sensor to `0`. No effect if `false`. Default is `false`.
* disableBumpSensors (boolean) - Optional. If `true`, disables hazards for all bump sensors. No effect if `false`. Default is `false`. 
* bumpSensorsEnabled (string) - Optional. An array (passed in as a string) of up to four objects that you can use to turn hazards on or off for each of Misty's bump sensors. The `BumpSensorsEnabled` array only needs to include objects for the sensors that you want to adjust. The order of these objects in the array does not matter. Each object must include the following key/value pairs: 
  * sensorName (string) - The name of one of Misty's bump sensors. Expects `Bump_FrontRight`, `Bump_FrontLeft`, `Bump_RearRight`, or `Bump_RearLeft`.
  * enabled (boolean) - Enables or disables hazards for the correlated bump sensor. Bump sensor hazards are enabled (`true`) by default.
* timeOfFlightThresholds (array) - Optional. An array (passed in as a string) of up to eight objects that set the minimum distance threshold to trigger a hazard state for each of Misty's time-of-flight sensors. The `TimeOfFlightThresholds` array only needs to include objects for the sensors that you want to adjust. The order of these objects in the array does not matter. Each object must include the following key/value pairs: 
  * sensorName (string) - The name of one of Misty's time-of-flight sensors. Expects `TOF_DownFrontRight`, `TOF_DownFrontLeft`, `TOF_DownBackRight`, `TOF_DownBackLeft`, `TOF_Right`, `TOF_Left`, `TOF_Center`, or `TOF_Back`.
  * threshold (double) - The minimum distance (in meters) that triggers a hazard state for the correlated time-of-flight sensor. Setting the threshold to 0 for any sensor disables hazards for that sensor. Default threshold settings are listed in the table above.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

// Disables front right and rear right bump sensors
// Sets custom thresholds for all ToF sensors
misty.UpdateHazardSettings(false, false, false, 
	`[
        {"sensorName":"Bump_FrontRight","enabled":false},
        {"sensorName":"Bump_FrontLeft","enabled":true},
        {"sensorName":"Bump_RearRight","enabled":false},
        {"sensorName":"Bump_RearLeft","enabled":true}
	]`,
	`[
        {"sensorName":"TOF_DownFrontRight","threshold":0.05},
        {"sensorName":"TOF_DownFrontLeft","threshold":0.01},
        {"sensorName":"TOF_DownBackRight","threshold":1.0},
        {"sensorName":"TOF_DownBackLeft","threshold":0.01},
        {"sensorName":"TOF_Right","threshold": 0.01},
        {"sensorName":"TOF_Left","threshold":2.0},
        {"sensorName":"TOF_Center","threshold":0.5},
		{"sensorName":"TOF_Back","threshold":0.4}
	]`);
```

## Perception

The following commands allow you to programmatically take pictures, record sounds or videos, and have misty detect and learn to recognize faces. 

Like most of us, Misty sees faces best in a well-lit area. If you want to directly experiment with face recognition commands, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#perception).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../rest-api/overview/#getting-live-data-from-misty) to her FaceRecognition [WebSocket](../../../misty-ii/robot/sensor-data). To directly observe this data, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#opening-a-websocket).

### misty.CancelFaceTraining
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the `misty.CancelFaceTraining()` command unless you want to abort a training that is in progress.

```javascript
// Syntax
misty.CancelFaceTraining([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.CancelFaceTraining();
```

### misty.CaptureSpeech

Starts capturing speech in a new audio recording. Misty's chest LED pulses blue when she is recording audio or listening for the key phrase.

```javascript
// Syntax
misty.CaptureSpeech([bool requireKeyPhrase], [bool overwriteExisting], [int maxSpeechLength], [int silenceTimeout], [int prePauseMs], [int postPauseMs])
```

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording by using the `MaxSpeechLength` argument.

Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty cannot use her microphones for wake word detection or recording speech while actively streaming audio and video.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* RequireKeyPhrase (bool) - Optional. If `true`, Misty waits to start recording speech until she recognizes the key phrase. If `false`, Misty immediately starts recording speech. Defaults to `true`. 
*   OverwriteExisting (bool) - Optional. If `true`, the captured speech recording overwrites any existing recording saved under the default speech capture filename. (Note that Misty saves speech recordings she captures with this command under one of two default filenames: `capture_HeyMisty.wav` when `RequireKeyPhrase` is `true`, or `capture_Dialogue.wav` when `RequireKeyPhrase` is `false`.) If `OverwriteExisting` is `false`, Misty saves the speech recording under a unique, timestamped filename: `capture_{HeyMisty or Dialogue}_{Day}-{Month}-{Year}-{Hour}-{Minute}.wav`. Defaults to `true`. **Note:** If you program Misty to save each unique speech recording, you should occasionally delete unused recordings to prevent them from filling the memory on her 820 processor.
* MaxSpeechLength (int) - Optional. The maximum duration (in milliseconds) of the speech recording. If the length of an utterance exceeds this duration, Misty stops recording after the duration has elapsed, and the system triggers a `VoiceRecord` event with a message that Misty did not detect the end of the recorded speech. Range: `500` to `20000`. Defaults to `7500` (7.5 seconds).
* SilenceTimeout (int) - Optional. The maximum duration (in milliseconds) of silence that can precede speech before the speech capture mechanism times out. If Misty does not detect speech before the `SilenceTimeout` duration elapses, she stops listening for speech and triggers a `VoiceRecord` event with a message that she did not detect the beginning of speech. Range: `500` to `10000`. Defaults to `5000` (5 seconds).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

### misty.DeleteVideoRecording

Deletes a video recording.

```javascript
// Syntax
misty.DeleteVideoRecording(string name, [int prePause], [int postPause]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only deletes video recordings that Misty has created. To delete a user-uploaded video asset, you must use the [`DeleteVideo`](./#misty-deletevideo) command.
{{box op="end"}}

Arguments

* name (string) - The filename of the video to delete. Does not include the filetype extension.

```javascript
// Example
misty.DeleteVideoRecording("misty_video");
```

### misty.ForgetFaces

Removes records of trained faces from Misty's memory.

```javascript
// Syntax
misty.ForgetFaces(string FaceId, [int prePauseMs], [int postPauseMs]);
```

Arguments

* FaceId (string) - The ID of the face to remove. If `null`, clears all trained faces from Misty's memory.

```javascript
// Example
misty.ForgetFaces("John");
```

### misty.GetKnownFaces
Obtains a list of the names of faces on which Misty has been successfully trained.

```javascript
// Syntax
misty.GetKnownFaces([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetKnownFaces();
```

Returns

* Result (string) - A list of the names for faces that Misty has been trained to recognize. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetVideoRecordingsList

Obtains a list of filenames for each video recording saved to Misty's local storage.

```javascript
// Syntax
misty.GetVideoRecordingsList([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only returns a list of the video recordings that Misty has created. This list does not include user-uploaded video files. User-uploaded video assets appear in the response for the [`GetVideoList`](./#misty-getvideolist) command.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetVideoRecordingsList()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_GetVideoRecordingsList()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.GetVideoRecordingsList();

// Prints a debug message with a list of Misty's video recordings
function _GetVideoRecordingsList(data) {
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (array) - A comma-separated list of filenames for each video recording saved to Misty's local storage. Filenames do not include the file type extension. Misty saves all video recordings as `.mp4` files. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.RenameVideoRecording

Renames an existing video recording.

```javascript
misty.RenameVideoRecording(string oldName, string newName, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command only renames a video recording that Misty has created. You cannot use this command to rename a user-uploaded video file.
{{box op="end"}}

Arguments

* oldName (string) - The current (old) filename of the video recording to rename, without the file type extension.
* newName (string) - The new filename to associate with the video recording, without the file type extension. The name of a video recording can only include uppercase and lowercase alphanumeric characters, hyphens, and underscores (`[a-zA-Z0-9_-]`). Do not supply a file type extension; the system automatically uses the `.mp4` extension for Misty's video recordings. 

```javascript
// Example
misty.RenameVideoRecording("MyOldName", "MyNewName");
```

### misty.StartAvStreaming

Starts Misty streaming audio and video from her microphones and RGB camera to an external source.

```javascript
//Syntax
misty.StartAvStreaming(string URL, [int width], [int height], [int frameRate], [int videoBitRate], [int audioBitRate], [int audioSampleRate], [string userName], [string passWord], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed warningBox"}}
**Important!** Misty's AV stream is **NOT** encrypted at this time. Devices on the same network as your robot (or in between your robot and the streaming server or client) can intercept the stream, play back the content, and re-publish the stream outside of your local network. Additionally, you are responsible for securing and encrypting any media content you choose to stream from Misty to services or devices outside of your local network.
{{box op="end"}}

Valid resolutions (as `width` x `height`) for AV streaming are: 1920 x 1280, 1280 x 960, 640 x 480, and 320 x 240.

Misty supports the following modes for AV streaming:

* Misty can transmit a live audio and video data stream to an external media server that you configure to run on the same network as the robot. Misty supports streaming over Real-Time Messaging Protocol (RTMP) or Real Time Streaming Protocol (RTSP). You must create and host the media server yourself and configure the server to publish a stream you can view with a streaming client (like [VLC](https://www.videolan.org/vlc/)). 
* Misty can serve an RTSP stream herself, and you can view the stream with a client connected to the same network as the robot. Misty's server can stream to clients that use TCP or UDP to receive AV streaming data.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For lowest latency use RTSP instead of RTMP. To decrease latency further, adjust the network caching settings for your streaming client.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Notes:**

* By default, Misty's AV streaming service is disabled when the robot boots up. You must enable this service before you can start AV streaming. You can enable the AV streaming service with the [`EnableAvStreamingService`](./#misty-enableavstreamingservice) command.
* Enabling the AV streaming service automatically disables Misty's camera service. Misty cannot take pictures, record videos, or use computer vision functionality (such as face detection or face recognition) while the AV streaming service is enabled. For more information, see [AV Streaming Service](../../../misty-ii/robot/misty-ii/#av-streaming-service).
* Misty cannot use her microphones for wake word detection, recording audio, or capturing speech while actively streaming audio and video. 
* Misty's AV streaming service is unidirectional at this time. You can stream audio and video from Misty to an external device, but the robot cannot play live media streams.
* Misty's video stream is rotated 90 degrees counterclockwise. You can rotate the stream to the orientation you prefer by changing the settings in your streaming client.
* This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* URL (string) - **Option 1**: If transmitting a stream from Misty to an external media server, this value is the URL address for the streaming server. This value **must** match the URL used when you set up the streaming server. You must prefix the URL with either `rtmp://` or `rtsp://`, depending on the streaming protocol you want to use. **Option 2:** To use Misty as her own media server, use `rtspd:<port-number>`, where `<port-number>` is the port through which to publish the stream (for example, `rtspd:1935`). When the stream is live, you can view it in your media client by connecting to `rtsp://<robot-ip-address>:<port-number>` (for example, `rtsp://192.168.7.30:1935`).
* width (int) - Optional. The width (in pixels) of the video stream. The default resolution for video streaming (as `width` x `height`) is 1920 x 1080.
* height (int) - Optional. The height (in pixels) of the video stream. The default resolution for video streaming (as `width` x `height`) is 1920 x 1080.
* frameRate (int) - Optional. The frame rate at which Misty streams video. You must use a value greater than `1` and less than `30`. Default is `30`.  
* videoBitRate (int) - Optional. The bitrate (in bits per second) at which to encode streamed video data. Defaults to `5000000` (5 mbps). Valid values are between `256000` (256 kbps) and `20000000` (20 mbps).  
* audioBitRate (int) - Optional. The bitrate (in bits per second) at which to encode streamed audio data. Defaults to `128000` (128 kbps). Valid values are between `32000` (32 kbps) and `1000000` (1 mbps). 
* audioSampleRateHz (int) - Optional. The sample rate (in hz) at which to record audio for the audio stream. Defaults to `44100` (44.1 kHz). Supported sample rates include: `11025`, `12000`, `16000`, `22050`, `24000`, `32000`, `44100`, and `48000`.
* userName (string) - Optional. The username a stream must supply to transmit media to your external server. Not all servers require a username and password. You can change whether to require credentials when you set up your server.
* password (string) - Optional. The password for connecting to your external media server.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

// Sets Misty up to act as her own media server. Connect to this stream
// from a client on the same network as Misty. The URL for this stream
// would be: rtsp://<robot-ip-address>:1936
misty.StartAvStreaming("rtspd:1936", 640, 480);
```

### misty.StartFaceDetection

Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

```javascript
// Syntax
misty.StartFaceDetection([int prePauseMs], [int postPauseMs]);
```

When you are done having Misty detect faces, call [`misty.StopFaceDetection()`](./#misty-stopfacedetection).

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartFaceDetection();
```

### misty.StartFaceRecognition
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `misty.StartFaceDetection()` command to detect and store face IDs in Misty's memory.

When you are done having Misty recognize faces, call `misty.StopFaceRecognition()`.

```javascript
// Syntax
misty.StartFaceRecognition([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartFaceRecognition();
```

<!-- misty.StartFaceTraining - BETA -->
### misty.StartFaceTraining
Starts Misty learning a face and assigns a name to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call `misty.CancelFaceTraining()`.

```javascript
// Syntax
misty.StartFaceTraining(string faceId, [int prePauseMs], [int postPauseMs]);
```

Arguments
* faceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, `-`, and `_` are valid characters.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartFaceTraining("My_Face");
```

### misty.StartKeyPhraseRecognition

Starts Misty listening for the "Hey, Misty!" key phrase and configures Misty to capture a recording with any speech she detects after recognizing the key phrase. Misty's chest LED pulses blue when she is recording audio or listening for the key phrase.

```javascript
// Syntax
misty.StartKeyPhraseRecognition([bool captureSpeech], [bool overwriteExisting], [int maxSpeechLength], [int silenceTimeout], [string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

Misty waits to start recording until she detects speech. She then records until she detects the end of the utterance. By default, Misty records an utterance up to 7.5 seconds in length. You can adjust the maximum duration of a speech recording with the `MaxSpeechLength` argument.

There are two event types associated with key phrase recognition:

* Misty triggers a [`KeyPhraseRecognized`](../../../misty-ii/robot/sensor-data/#keyphraserecognized) event each time she recognizes the "Hey, Misty" key phrase.
* Misty triggers a [`VoiceRecord`](../../../misty-ii/robot/sensor-data/#voicerecord) event when she captures a speech recording.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty cannot use her microphones for wake word detection or recording speech while actively streaming audio and video.
{{box op="end"}}

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

```javascript
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

```javascript
// Syntax
misty.StartRecordingAudio(string filename, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed warningBox"}}
**Warning:** If you do not issue a `misty.StopRecordingAudio()` command, Misty will continue recording until the audio file is 1 GB. Attempting to retrieve a file this large from Misty can cause the system to crash.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Notes:**

* Misty cannot record audio and listen for the "Hey, Misty!" key phrase at the same time. Recording audio automatically disables [key phrase recognition](./#misty-startkeyphraserecognition).
* Misty cannot use her microphones to record audio while actively streaming audio and video. 
{{box op="end"}}

Arguments
* fileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StartRecordingAudio("RecordingExample.wav");
```

### misty.StartRecordingVideo

Starts recording video with Misty's 4K Camera.

```javascript
// Syntax
misty.StartRecordingVideo([string fileName], [bool mute], [int duration], [int width], [int height], [int prePauseMs], [int postPauseMs])
```

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

Arguments

* fileName (string) - Optional. The filename for the recorded video. Video recordings can only include uppercase and lowercase alphanumeric characters, hyphens, and underscores (`[a-zA-Z0-9_-]`). Do not supply a file type extension; the system automatically adds an extension of `.mp4`. If you do not supply a filename, the video recording is saved with the default filename of `misty_video`. **Important:** When you record a video with the same filename of a video that already exists on the robot, the new video recording automatically overwrites the existing recording.
* mute (bool) - Optional. Whether to mute audio while recording. Default is `false`.
* duration (int) - Optional. How long (in seconds) to record. Must be greater than `0`. The max duration for a video recording is 180 seconds (3 minutes). If you do not specify a value, Misty automatically stops recording after 30 seconds (default), or upon receiving a [`StopRecordingVideo`](./#misty-stoprecordingvideo) command.
* width (int) - Optional. Sets the resolution width (in pixels) for the video recording. When you specify a resolution, you must pass in values for both `width` and `weight`. See the command description for a list of valid resolutions.
* height (int) - Optional. Sets the resolution height (in pixels) for the video recording. When you specify a resolution, you must pass in values for both `width` and `height`. See the command description for a list of valid resolutions. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

// Records a 60-second video at recording resolution
// for current camera session
misty.StartRecordingVideo("MyVideo", false, 60);
```

### misty.StopAvStreaming

Stops Misty streaming audio and video.

```javascript
// Syntax
misty.StopAvStreaming([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StopFaceDetection

Stops Misty's detection of faces in her line of vision.

```javascript
// Syntax
misty.StopFaceDetection([int prePauseMs], [int postPauseMs]);
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopFaceDetection();
```

### misty.StopFaceRecognition

Stops the process of Misty recognizing a face she sees.

```javascript
// Syntax
misty.StopFaceRecognition([int prePauseMs], [int postPauseMs])
```

Arguments
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopFaceRecognition();
```

### misty.StopKeyPhraseRecognition

Stops Misty listening for the "Hey, Misty!" key phrase.

```javascript
// Syntax
misty.StopKeyPhraseRecognition([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.StopRecordingAudio

Directs Misty to stop the current audio recording and saves the recording to the robot under the `fileName` name specified in the call to `misty.StartRecordingAudio()`. Use this command after calling the `misty.StartRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

```javascript
// Syntax
misty.StopRecordingAudio([int prePauseMs], [int postPauseMs]);
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopRecordingAudio();
```

### misty.StopRecordingVideo

Stops recording video with Misty's 4K camera.

```javascript
// Syntax
misty.StopRecordingVideo([int prePauseMs], [int postPauseMs]);
```

If you do not call the `misty.StopRecordingVideo()` method, Misty automatically stops recording after the duration for the recording has elapsed. You set this duration when you call the [`misty.StartRecordingVideo()`](./#misty-startrecordingvideo) method. The default duration for a video recording is 10 seconds.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.StopRecordingVideo();
```

### misty.TakePicture

Takes a picture with Misty’s RGB camera. Optionally, saves the picture to Misty's local storage.

```javascript
// Syntax
misty.TakePicture([string fileName], [int width], [int height], [bool displayOnScreen = false], [bool overwriteExisting = false], [string callback = _TakePicture()], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

Valid resolutions (as `Width` x `Height`) for taking pictures are: 4160 x 3120, 3840 x 2160, 3264 x 2448, 3200 x 2400, 2592 x 1944, 2048 x 1536, 1920 x 1080, 1600 x 1200, 1440 x 1080, 1280 x 960, 1024 x 768, 800 x 600, 640 x 480, and 320 x 240.

These width and height values are reversed for the actual image that Misty returns when you call this command. The pictures Misty takes with her RGB camera are rotated 90 degrees counterclockwise. Misty reorients each picture 90 degrees clockwise during the encoding process.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Recording videos at 3840 x 2160 changes the max resolution for taking pictures to 3840 x 2160. If you record video at 1920 x 1080 (or lower), then Misty can use the highest resolution for taking pictures. If you try to record at 3840 x 2160 while using the highest resolution for taking pictures, the system automatically lowers the resolution for taking pictures to 3840 x 2160.

When Misty powers on, she starts a new camera session with a default resolution setting of 4160 x 3120 for taking pictures. If you take a picture without specifying a resolution, Misty uses the resolution that's already set in the current camera session. When you specify a different resolution than what is set in the current camera session, Misty resets the camera session to use the new resolution for taking pictures. This has the following implications:

* Misty cannot reset the camera session while actively recording video. If you try to take a picture at a new resolution while Misty is recording video, she takes a picture with the resolution settings for the current camera session (instead of the new resolution that you asked for).
* If Misty is already performing computer vision (CV) activities when the camera session resets, these activities automatically resume when the new camera session is ready. For more information, see the article on [Picture and Video Resolution](../../../misty-ii/robot/misty-ii/#picture-and-video-resolution).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* fileName (string) - Optional. The filename to assign to the image file for the captured photo. Note that if you do not specify a filename, Misty does not save the photo to her local storage.
* width (integer) - Optional. Optional. The desired image width (in pixels). When you specify a resolution, you must pass in values for both width and height. See the command description for a list of valid resolutions.
* height (integer) - Optional. The desired image height (in pixels). When you specify a resolution, you must pass in values for both width and height. See the command description for a list of valid resolutions.
* displayOnScreen (boolean) - Optional. If `true` **and** a `fileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `fileName` value is provided, does nothing. Defaults to `false`.
* overwriteExisting (boolean) - Optional. Indicates whether Misty should overwrite an image with the same filename as the captured photo if one exists on her local storage. Passing in `true` overwrites a file with the same name. Passing in `false` prevents an existing file with the same name from being overwritten. In the case that `overwriteExisting` is set to `false` and a photo already exists with the same filename as the newly captured photo, the new photo is not saved to Misty. Defaults to `false`.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_TakePicture()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.TakePicture("newImage", 1600, 1200, false, true);
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

```javascript
// Syntax
misty.CancelSkill(string skill, [int prePauseMs], [int postPauseMs])
```

Arguments

* Skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.CancelSkill("c3f9b33b-d895-48cf-8f15-cdcf5a866bde");
```

### misty.Debug

Publishes a debug message to `SkillData` event listeners.

```javascript
// Syntax
misty.Debug(string data, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When you run a skill with the [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/) tool, the web page subscribes to the `SkillData` event type via Misty's WebSocket server. This allows Misty to print error messages, debug messages, and other skill data to the console in your web browser. Use `misty.Debug()` to print your own messages to the console.
{{box op="end"}}

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Data you pass in to the `misty.Debug()` message must be a string. To send a data object, you can serialize your data into a string and parse it out on the client side of the `SkillData` subscription. If `BroadcastMode` is set to `off` in the meta file for a skill, the skill does not publish debug data.
{{box op="end"}}

Arguments

* data (string) - The debug message to publish.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Debug("Message")
```

### misty.Get

Returns data that a skill has saved to Misty's database with the `misty.Set()` method.

```javascript
// Syntax
misty.Get(string key, [string skillUniqueId], [int prePauseMs], [int postPauseMs]);
```

Call the `misty.Get()` method to access data created by the current skill, or to access data associated with another skill. To read data from another skill, that skill must grant *read permissions* to the skill that calls the `misty.Get()` method. You declare read permissions by updating the `ReadPermissions` attribute in a skill's meta file. Learn more about [Reading and Writing Data Across Skills](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).

Arguments

* key (string) - The key name for the data to return. Keys are **not** case sensitive. (For example, the `key` values `myKey`, `MyKey`, `mykey`, and `MYKEY` are identical in Misty's shared skill database.)
* skillUniqueId (string) - Optional. The Unique ID of the skill associated with the data to obtain. If `null` or empty, obtains the value for the `key` associated with the skill that calls the `misty.Get()` method. **Note:** In order to obtain data that's associated with another skill, that skill must [grant *read permissions* to the skill that calls the `misty.Get()` method](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Get("Key");
```

Returns

* value (string, boolean, integer, or double) - The data associated with the specified key.

### misty.GetRunningSkills

Obtains a list of the skills currently running on Misty.

```javascript
//Syntax
misty.GetRunningSkills([string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs])
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetRunningSkills()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
//Example
misty.GetRunningSkills();

function _GetRunningSkills(data) {
  misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (array) - A list of objects with meta information about the skills currently running on Misty. If no skills are currently running, this command returns an empty array. Note that in a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill (see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information). Each object in the list includes the following key-value pairs:
  * Description (string) - The description of the skill as it appears in the skill's meta file.
  * Name (string) - The name of the skill, as it appears in the skill's meta file.
  * StartupArguments (object) - An object with key-value pairs for each startup argument in the skill's meta file.
  * UniqueId (string) - The unique ID of the skill, from the skill's meta file.

### misty.Keys

Obtains a list of all existing keys for the long term data associated with a particular skill.

```javascript
// Syntax
misty.Keys([string skillUniqueId], [int prePauseMs], [int postPauseMs]);
```

Call the `misty.Keys()` method to access a list of the data keys associated with the current skill, or to access a list of the keys associated with another skill. To access a list of keys associated with another skill, that skill must grant *read permissions* to the skill that calls the `misty.Keys()` method. You declare read permissions by updating the `ReadPermissions` attribute in a skill's meta file. Learn more about [Reading and Writing Data Across Skills](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).

Arguments

* skillUniqueId (string) - Optional. The Unique ID of the skill for which to return data keys. If `null` or empty, Misty returns keys associated with the skill that calls the `misty.Keys()` method. **Note:** In order to get the keys associated with another skill, that skill must [grant *read permissions* to the skill that calls the `misty.Keys()` method](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Keys();
```

Returns

* Keys (list) - A list of the data keys associated with the chosen skill.

### misty.Pause

Pause skill execution for a specified number of milliseconds.

```javascript
// Syntax
misty.Pause(int prePauseMs)
```

Arguments

* prePauseMs (integer) - The duration in milliseconds to pause skill execution.

```javascript
// Example
misty.Pause(1000);
```

### misty.Publish

Writes a message to Misty's log file.

```javascript
// Syntax
misty.Publish(string name, string data)
```

The `misty.Publish()` method writes data to the robot's internal log file, even when called in a skill with the value of `WriteToLog` set to `False` in its meta file. You can use the Command Center to download your robot's log files, or send a GET request to the REST endpoint for the [`GetLogFile`](../../../misty-ii/rest-api/api-reference/#getlogfile) command.

Arguments

* name (string) - A name for the data to write to the robot's log.
* data (string, integer, double, or boolean) - The data to write to the robot's log. To write an object, you must serialize your data into a string using `JSON.stringify()`.ƒ

```javascript
// Example
misty.Publish("data-name", "data-value");
```

### misty.RandomPause

Pause skill execution for a random duration.

```javascript
// Syntax
misty.RandomPause(int minimumDelay, int maximumDelay)
```

Arguments

* minimumDelay (integer) - The minimum duration in milliseconds to pause skill execution.
* maximumDelay (integer) - The maximum duration in milliseconds to pause skill execution. 

```javascript
// Example
misty.RandomPause(1000, 2000);
```
### misty.Remove

Removes data that has been saved to the robot under a specific key with the `misty.Set()` method. 

```javascript
// Syntax
misty.Remove(string key, [string skillUniqueId], [int prePauseMs], [int postPauseMs])
```

Call the `misty.Remove()` method to delete keys associated with the current skill or another skill on the robot. To delete data that's associated with another skill, that skill must grant *write permissions* to the skill that calls the `misty.Remove()` method. You declare write permissions by updating the `WritePermissions` attribute in a skill's meta file. Learn more about [Reading and Writing Data Across Skills](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).

Arguments

* key (string) - The key name of the data to remove. Keys are **not** case sensitive. (For example, the `key` values `myKey`, `MyKey`, `mykey`, and `MYKEY` are identical to Misty's shared skill database.)
* skillUniqueId (string) - Optional. The Unique ID of the skill associated with the key to remove. If `null` or empty, Misty removes the key associated with the skill that calls the `misty.Remove()` method. **Note:** In order to delete data that's associated with another skill, that skill must [grant *write permissions* to the skill that calls the `misty.Remove()` method](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.Remove("Key");
```

### misty.RunSkill

Immediately runs a previously uploaded skill.

```javascript
// Syntax
misty.RunSkill(string skill, [string method], [int prePauseMs], [int postPauseMs])
```

Arguments

* skill (string) - The skill's unique GUID identification string. Use the value of the `UniqueId` parameter from the skill's JSON meta file.
* method (string) - Optional. A specific method within a skill to run, which can be useful for testing. If no value is specified for the `method` parameter, `RunSkill` by default starts running the skill from the beginning.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.RunSkill("bb20ff02-edac-475c-af0c-a06e81e5dc50");
```

### misty.Set

Saves data that can be validly updated and used across threads or shared between skills.

```javascript
// Syntax
misty.Set(string key, string value, [bool longTermStorage], [string skillUniqueId], [int prePauseMs], [int postPauseMs]);
```

Call the `misty.Set()` method to save or update data that's associated either with the current skill or with another skill. To save or update data that's associated with another skill, that skill must grant *write permissions* to the skill that calls the `misty.Set()` method. You declare write permissions by updating the `WritePermissions` attribute in a skill's meta file. Learn more about [Reading and Writing Data Across Skills](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).

Data saved using `misty.Set()` must be one of these types: `string`, `bool`, `int`, or `double`. Alternately, you can serialize your data into a string using `JSON.stringify()` and parse it out again using `JSON.parse()`.

By default, the data you save with the `misty.Set()` method clears from Misty's memory when Misty reboots. To enable long term storage, you must include an additional `SkillStorageLifetime` attribute in the skill's meta file. This attribute determines how long Misty can store data associated with a particular skill. You can set the value of `SkillStorageLifetime` to `Skill`, `Reboot`, or `LongTerm`.

* `Skill` - The data clears when the skill stops running.
* `Reboot` - The data clears the next time Misty reboots (default).
* `LongTerm` - The data persists across reboots and remains available until removed from the robot with the [`misty.Remove()`](./#misty-remove) command. 

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To save a piece of data that persists across reboots, you must:

* Set the `SkillStorageLifetime` attribute to `LongTerm` in the meta file for the skill to which the data belongs.
* Call the `misty.Set()` method with a value of `true` for the `longTermStorage` argument. If you fail to declare that a piece of data should be saved to long term storage when you call the `misty.Set()` method, that data will be cleared when Misty reboots, even if you have enabled long term storage in the meta file for your skill.
* Call the `misty.Set()` argument from within the skill with which to associate the data.
{{box op="end"}}

Arguments

* key (string) - The key name for the data to save. Keys are **not** case-sensitive. (For example, the `key` values `myKey`, `MyKey`, `mykey`, and `MYKEY` are identical to Misty's shared skill database.)
* value (string, bool, int, or double) - The data to save. Data Misty saves with the `misty.Set()` method must be one of these types: `string`, `bool`, `int`, or `double`.
* longTermStorage (boolean) - Optional. Whether this piece of data persists across reboots. To save a piece of data that persists across reboots, you must set the `SkillStorageLifetime` attribute for the skill to `LongTerm` **in addition** to setting the value of this argument to `true`. Defaults to `false`. 
* skillUniqueId (string) - Optional. The Unique ID of the skill to associate this data with. If `null` or empty, Misty associates the data with the skill that calls the `misty.Set` method. **Note:** In order to save new data (or update existing data) that's associated with another skill, that skill must [grant *write permissions* to the skill that calls the `misty.Set()` method](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#reading-and-writing-data-across-skills).
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next comm
and in the skill. If no command follows this command, `postPauseMs` is not used.

## System

### misty.AllowRobotUpdates

Changes the robot's settings to allow Misty II to automatically install system updates. Misty is configured to automatically download and install system updates by default. To prevent system updates, you must issue a `PreventRobotUpdates` command.

```javascript
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

```javascript
// Syntax
misty.AudioServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

For more information about enabling and disabling the audio service, see the [`DisableAudioService`](./#misty-disableaudioservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_AudioServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_AudioServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.AudioServiceEnabled();

function _AudioServiceEnabled(data) {
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (boolean) - Returns `true` if the audio service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.AvStreamingServiceEnabled

Describes whether the audio and video (AV) streaming service that runs on Misty's 820 processor is currently enabled.

```javascript
// Syntax
misty.AvStreamingServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

For more information about enabling and disabling the AV streaming service, see the [`DisableAvStreamingService`](./#misty-disableavstreamingservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, the AV streaming service is disabled when Misty boots up. The camera service and the AV streaming service cannot be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. 
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_AvStreamingServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_AvStreamingServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.AvStreamingServiceEnabled();

// Prints debug message with status of AV streaming service
function _AvStreamingServiceEnabled(data) {
    misty.Debug(JSON.stringify(data.Result));
}

```

Returns

* Result (boolean) - Returns `true` if the AV streaming service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.CameraServiceEnabled

Describes whether the camera service running on Misty's 820 processor is currently enabled.

```javascript
// Syntax
misty.CameraServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. By default, the camera service is enabled when Misty boots up. 
{{box op="end"}}

For more information about enabling and disabling the camera service, see the [`DisableCameraService`](./#misty-disablecameraservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_CameraServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_CameraServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example

misty.CameraServiceEnabled();

function _CameraServiceEnabled(data) {
    misty.Debug(JSON.stringify(data.Result));
}
```

Returns

* Result (boolean) - Returns `true` if the camera service is enabled. Otherwise, `false`. Data this command returns must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.ClearDisplayText

{{box op="start" cssClass="boxed warningBox"}}
**Deprecation Notice:** This command has been deprecated and will be removed from Misty's JavaScript API in a future release. Use [`misty.ClearErrorText()`](./#misty-clearerrortext) instead.
{{box op="end"}}

Force-clears an error message from Misty’s display. 

```javascript
// Syntax
misty.ClearDisplayText ([int prePauseMs], [int postPauseMs])
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ClearDisplayText();
```

### misty.ClearErrorText

Force-clears an error message from Misty’s display. 

```javascript
// Syntax
misty.ClearErrorText ([int prePauseMs], [int postPauseMs])
```

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ClearErrorText();
```

### misty.ConnectToSavedWifi

Connects Misty to a saved Wi-Fi network.

```javascript
// Syntax
misty.ConnectToSavedWifi(string networkId, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkId (string) - The name of the network to connect to.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ConnectToSavedWifi("MyHomeWifi")
```

### misty.DisableAudioService

Disables the audio service running on Misty's 820 processor.

```javascript
// Syntax
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
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with the audio service enabled.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisableAvStreamingService

Disables the audio and video (AV) streaming service running on Misty's 820 processor.

```javascript
// Syntax
misty.DisableAvStreamingService([int prePauseMs], [int postPauseMs]);
```

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

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisableCameraService

Disables the camera service running on Misty's 820 processor.

```javascript
// Syntax
misty.DisableCameraService([int prePauseMs], [int postPauseMs]);
```

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

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.DisableSlamService

Disables the SLAM service running on Misty's 820 processor.

```javascript
// Syntax
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

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The effects of this command do not persist across reboot. The 820 processor always boots with the SLAM service enabled.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableAudioService

Enables the audio service running on Misty's 820 processor.

```javascript
// Syntax
misty.EnableAudioService([int prePauseMs], [int postPauseMs]);
```

For more information about disabling and enabling the audio service, see the [`DisableAudioService`](./#misty-disableaudioservice) command description.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableAvStreamingService

Enables the audio and video (AV) streaming service running on Misty's 820 processor.

```javascript
// Syntax
misty.EnableAvStreamingService([int prePauseMs], [int postPauseMs]);
```

For more information about enabling and disabling the AV streaming service, see the [`DisableAvStreamingService`](.#misty-disableavstreamingservice) command description.

{{box op="start" cssClass="boxed noteBox"}}
**Note:**  By default, the AV streaming service is disabled when Misty boots up. The camera service and the AV streaming service cannot be enabled at the same time. Issuing a command to enable one of these services automatically disables the other.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Beta**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableCameraService

Enables the camera service running on Misty's 820 processor.

```javascript
// Syntax
misty.EnableCameraService([int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The camera service and the AV streaming service **cannot** be enabled at the same time. Issuing a command to enable one of these services automatically disables the other. By default, the camera service is enabled when Misty boots up. 
{{box op="end"}}

For more information about disabling and enabling the camera service, see the [`DisableCameraService`](./#misty-disablecameraservice) command description.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.EnableSlamService

Enables the SLAM service running on Misty's 820 processor.

```javascript
// Syntax
misty.EnableSlamService([int prePauseMs], [int postPauseMs]);
```

For more information about disabling and enabling the SLAM service, see the [`DisableSlamService`](./#misty-disableslamservice) command description.

This command is not functional with the Misty II Basic Edition.

Arguments

* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

### misty.ForgetWifi

Deletes information about a Wi-Fi network from Misty’s list of saved networks. If you call this method without any arguments, Misty deletes information for all of her saved networks.

```javascript
// Syntax
misty.ForgetWifi(string networkId, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkId (string) - Optional. The network to remove from Misty’s list of saved networks. If you call this method without any arguments, Misty deletes information for all of her saved networks.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.ForgetWifi("MyHomeWifi")
```

### misty.GetAvailableWifiNetworks

Obtains a list of local WiFi networks and basic information regarding each.

```javascript
// Syntax
misty.GetAvailableWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```javascript
// Syntax
misty.GetBatteryLevel([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
///Example
misty.GetBatteryLevel()

function _GetBatteryLevel(data) {
	// Prints bool value that tells us if Misty is charging
	misty.Debug(data.Result.IsCharging);
}
```

Returns

* Result (object) - An object with information about Misty's battery. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  * ChargePercent (double) - Decimal value representing current charge percent.
  * Created (string) - Timestamp that describes when the system created this message.
  * Current (int) - The current flowing into or discharging from the battery. This value is negative when the battery is discharging, and positive when the battery is being charged.
  * Expiry (string) - Timestamp describing the moment after which the values in this message should no longer be considered valid.
  * HealthPercent (double)
  * IsCharging (bool) - Returns `true` if the battery is charging. Otherwise, `false`.
  * SensorId (string) - The `sensorId` of the system component that returns the battery charge message (`charge`).
  * SensorName (string) - The `sensorName` of the system component that returns the battery charge message (`/Sensors/RTC/BatteryCharge`)
  * State (string) - The charge state of the battery. Possible values are:
    *  `Charging` (if battery is receiving current)
    *  `Discharging` (if battery is losing current)
    *  `Charged` (if battery is fully charged)
    *  `Unknown` (if you check the charge levels before Misty is fully booted, or if the RT board resets and the system has not yet learned the actual battery state)
    *  `Fault` (can occur if the charger does not detect the battery)
  * Temperature (int)
  * Trained (bool) - Returns `true` if the battery has been trained. Otherwise, `false`.
  * Voltage (double) - The battery's voltage.

### misty.GetCameraData

Obtains current properties and settings for Misty's 4K camera.

```javascript
// Syntax
misty.GetCameraData([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore (in this case, `_GetCameraData()`). For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetCameraData()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

Returns

* Result (object) - An object with details about the current properties and settings for Misty's 4K camera.  With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  * DroppedFrames (int) - Number of dropped frames.
  * FpsActual (double) -  Actual frames per second.
  * FpsRequested (double) - Requested frames per second.
  * Height (double) - Camera image height (in pixels).
  * Width (double) - Camera image width (in pixels).

### misty.GetDeviceInformation

Obtains device-related information for the robot.

```javascript
// Syntax
misty.GetDeviceInformation([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
//Example

// Use GetDeviceInformation to get robot's IP address
misty.GetDeviceInformation()

function _GetDeviceInformation(data) {
	// Prints IP address to debug listeners
	misty.Debug(data.Result.IPAddress);
}
```

Returns

* Result (object) - An object containing information about the robot, with the following fields. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.
   * AndroidHardwareId - The identification string for the Android hardware on this device.
   * AndroidOSVersion - A string that identifies the version of Android installed on this robot. Includes labels for any applied scripts and patches.
   * BatteryLevel - An object with details about Misty's battery level. Includes the same key/value pairs as the [`GetBatteryLevel` response](https://docs.mistyrobotics.com/misty-ii/rest-api/api-reference/#getbatterylevel).
   * CurrentProfileName - The name of the network that the robot is on.
   * HardwareInfo - An object with hardware and firmware version information for Misty's Real Time Controller (RTC) board and Motor Controller (MC) board.
   * IPAddress - The IP address of the robot.
   * NetworkConnectivity - The status of the robot's network connection. Possible values are Unknown, None, LocalAccess, LimitedInternetAccess, InternetAccess.
   * OccipitalDeviceInfo - An object with driver, firmware, and serial information for the robot's Occipital Structure Core depth sensor.
   * OutputCapabilities - An array listing the output capabilities for this robot.
   * RobotId - The robot's unique ID, if set. Default value is all zeros.
   * RobotVersion - The version number for the HomeRobot app running on the robot.
   * SensorCapabilities - An array listing the sensor capabilities for this robot.
   * SensoryServiceAppVersion - The version number for the Sensory Service app running on the robot.
   * SerialNumber - The unique serial number for this robot.
   * SKU - The SKU number for this robot. SKU numbers vary by robot model and color. White Standard Edition SKU: `060-000001`; Black Standared Edition SKU: `060-000002`; White Basic Edition SKU: `060-000003`; White Enhanced Edition SKU: `060-000004`.
   * WindowsOSVersion - The version of Windows IoT Core running on the robot.

### misty.GetHelp

Obtains information about a specified API command. Calling `misty.GetHelp()` with no arguments returns a list of all the API commands that are available.

```javascript
// Syntax
misty.GetHelp([string endpointName], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* endpointName (string) - Optional. A command in `"Api.<COMMAND>"` format eg: `"Api.GetAudioList"`. If no command name is specified, calling `misty.GetHelp()` returns a list of all  API commands.
* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetHelp();
```

Returns

* Result (string) - A string containing the requested help information. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information.

### misty.GetLogFile

Gets data from Misty's logs.

Pulls up to 3MB of the most recent log data from log files up to 14 days old. Log data returns in ascending order by date and time. If all log data exceeds 3MB, the oldest entry returned may be truncated.

```javascript
// Syntax
misty.GetLogFile([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty stores log files only for the most recent 14 day period. Log files from before this period are automatically cleared from the robot's local storage.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_GetLogFile()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, results are passed into the default `_GetLogFile()` callback function.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

Obtains the current local and remote log levels.

```javascript
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


{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_GetLogLevel()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks). 
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
//Example
misty.GetLogLevel()

function _GetLogLevel(data) {
	// Prints local log level
	misty.Debug(JSON.stringify(data.Result.Local));
	// Prints remote log level
	misty.Debug(JSON.stringify(data.Result.Remote));
}
```

Returns

* Result (string) - A an object with values indicating the current remote and local log levels. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. Includes the following key/value pairs:
  *  `Local` (string) - The current local log level.
  *  `Remote` (string) - The current remote log level.

### misty.GetRobotUpdateSettings

Obtains the robot's update settings and a timestamp for the last update attempt.

```javascript
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
  * AllowRobotUpdates (bool) - Indicates whether Misty is currently set to prevent or allow automatic system updates.
  * LastUpdateAttempt (string) - Timestamp for the last update attempt.

### misty.GetSavedWifiNetworks

Obtains Misty's list of saved network IDs.

```javascript
// Syntax
misty.GetSavedWifiNetworks([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetSavedWifiNetworks()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```json
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

```javascript
// Syntax
misty.GetSavedWifiNetworks([string websocketClass], [string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** For more detailed information about each of Misty’s WebSocket connections, see [Event Types](../../../misty-ii/robot/sensor-data/).
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Parameters

* websocketClass (string) - Optional. Specifies the WebSocket class to obtain information about. To recieve information about all of Misty's available WebSocket connections, pass an empty string.
* callback (string) - Optional. The name of the callback function to execute on data returned by this command. If empty, the default `_GetWebsocketNames()` function executes on callback data.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.GetWebsocketNames("");

// When data is ready, send it to debug listeners
function _GetWebsocketNames(data) {
   misty.Debug(JSON.stringify(data));
};
```

Returns

* Result (array) - An array of data objects with information about the WebSocket connections to which you can subscribe. With Misty's on-robot JavaScript API, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) for more information. The data object for each WebSocket class includes the following information:
  * Class (string) - The name of a given WebSocket class.
  * NestedProperties (array) - A list of properties for a given WebSocket class. Use these properties to declare conditions for events you want to receive information about when subscribing to messages from a WebSocket data stream.

### misty.PerformTargetedUpdate

Attempts to install updates for specified components of your robot. 

```javascript
// Syntax
misty.PerformTargetedUpdate(string components, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Only use this command when a system update fails to update every component of your robot. Always attempt a full system update before using this command. The version numbers for individual components are returned by the [`GetDeviceInformation`](./#misty-getdeviceinformation) command. You can make sure individual components are up-to-date by comparing these version numbers to the current release on the [System Updates](../../../misty-ii/robot/system-updates) page.
{{box op="end"}}

Arguments

* Components (string) - A comma-separated list of the specific components to update. Include `"MC"` to update the motor controller firmware, `"RT"` to update the real-time controller firmware, and `"SensoryServices"` to update the Sensory Services application. Updates to the Sensory Services application include firmware updates for the Occipital Structure Core depth sensor.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.PerformTargetedUpdate("MC,SensoryServices,RT");
```

### misty.PreventRobotUpdates

Changes the robot's settings to prevent Misty II from automatically installing system updates. To re-enable system updates, you must issue an `AllowRobotUpdates` command.

```javascript
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

```javascript
// Syntax
misty.RestartRobot([bool core], [bool sensoryServices], [int prePauseMs], [int postPauseMs]);
```

Arguments

* core (boolean): If `true`, restarts Misty's 410 processor.
* sensoryServices (boolean): If `true`, restarts Misty's 820 processor.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
// Restarts the 410 and the 820
misty.RestartRobot(true, true);
```

### misty.SetDefaultVolume

Sets the default volume of Misty's speakers for audio playback and onboard text-to-speech.

```javascript
// Syntax
misty.SetDefaultVolume(int volume, [int prePauseMs], [int postPauseMs]);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** While changing Misty's default volume during audio playback **does** change the volume of the currently playing audio, changing the volume while Misty is playing an utterance created with the `Speak` command does **not** change the volume for that utterance. However, Misty **does** use the newly set default volume the next time she runs a `Speak` command.
{{box op="end"}}

Arguments

* volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetDefaultVolume(100);
```

### misty.SetLogLevel

Sets Misty's local and remote logging levels. Use this method to determine which log message types the system writes to the local log file and to the remote Misty Robotics logging database.

```javascript
// Syntax
misty.SetLogLevel(string localLogLevel, string remoteLogLevel, [int prePauseMs], [int postPauseMs]);
```

Changing the log level applies a filter on the type of message the system writes to a given location. Log message types include:

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

Arguments

* localLogLevel (string) - The level to set for Misty's local logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.
* remoteLogLevel (string) - The level to set for Misty's remote logs. Accepts `Debug`, `Info`, `Warn`, `Error`, or `None`.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetLogLevel("Debug", "Info");
```

### misty.SetNetworkConnection

Connects Misty to a specified Wi-Fi source.

```javascript
// Syntax
misty.SetNetworkConnection(string networkName, string password, [int prePauseMs], [int postPauseMs])
```

Arguments

* networkName (string) - The Wi-Fi network name (SSID).
* password (string) - The Wi-Fi network password.
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
// Example
misty.SetNetworkConnection("myWiFiNetwork", "myWiFiPassword")
```

### misty.SetNotificationSettings

Changes the settings for Misty's default hardware notifications.

```javascript
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

```javascript
// Syntax
misty.SlamServiceEnabled([string callback], [string callbackRule = "synchronous"], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

For more information about enabling and disabling the SLAM service, see the [`DisableSlamService`](./#misty-disableslamservice) command description.

This command is not functional with the Misty II Basic Edition.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** With the on-robot JavaScript API, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_SlamServiceEnabled()`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
{{box op="end"}}

Arguments

* callback (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SlamServiceEnabled()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks).
* skillToCall (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePauseMs (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPauseMs (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPauseMs` is not used.

```javascript
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

```javascript
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

```javascript
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

```javascript
// Syntax
misty.ConvertIntentToCommand(string command, [string argument]...);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This command is currently in **Alpha**, and related hardware, firmware, or software is still under development. Feel free to use this command, but recognize that it may behave unpredictably at this time.
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** As an alpha feature, the `misty.ConvertIntentToCommand()` method is in active development, and it may not always produce the expected result. You can expect this method to be modified and improved with future updates to Misty's software.
{{box op="end"}}

Arguments:

* command (string) - A string that matches the internal name of a command from Misty's API. **Note:** The `misty.ConvertIntentToCommand()` method currently expects the value passed in for the the `command` argument to match an internal name that Misty uses to recognize and execute the command. Sometimes these internal command names differ from the method names used in Misty's JavaScript API. For example, calling the `misty.DisplayImage()` method in Misty's JavaScript API invokes the the command known internally as `ChangeDisplayImage`. You can find the internal names of Misty's commands by issuing a GET request to the `GetHelp` endpoint (`<robot-ip-address>/api/help`) and checking the values for the `id` keys in the response object.
* argument - (string) - One or more unique strings that hold the value for arguments to pass into the given `command`. 

When passing in values for more than one argument, you must pass in the value for each argument as a unique string. As an example, the following invokes Misty's `ChangeLED` command with unique values for the `red`, `green`, and `blue` arguments to change Misty's chest LED color.

```javascript
// Invokes the ChangeLED command
misty.ConvertIntentToCommand("ChangeLED", "0", "255", "0");
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** The `misty.ConvertIntentToCommand()` method simplifies the task of coding Misty to respond when you issue a voice command to invoke a command from her API. When you use Misty's [`StartKeyPhraseRecognition`](../../../misty-ii/rest-api/api-reference/#startkeyphraserecognition) command and register for [`KeyPhraseRecognized`](../../../misty-ii/robot/sensor-data/#keyphraserecognized) events, you can code Misty to start recording audio inside the `KeyPhraseRecognized` callback. You can then send this recorded audio off for processing by a third party service like [Dialogflow](https://dialogflow.com/) that's configured to identify the intent of a speaker from a given speech recording. Pass this intent (and any additional arguments that you parse out in your skill code) into your `misty.ConvertIntentToCommand()` method to have Misty execute the matching command.
{{box op="end"}}
