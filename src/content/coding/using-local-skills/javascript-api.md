---
title: Javascript API
layout: onboarding.hbs
columns: three
order: 3
---

# {{title}}

## Images & Display

<!-- Images & Display - PRODUCTION>

<!-- misty.ChangeDisplayImage -->

### misty.ChangeDisplayImage
Displays an image on Misty's screen. Optionally, `misty.ChangeDisplayImage()` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. You can use the [`SaveImageAssetToRobot`](../../using-remote-commands/rest/#saveimageassettorobot-byte-array-string-) command in Misty's REST API to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

Arguments:
* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* timeoutInSeconds (double) - Optional. The length of time to display the specified image.
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.ChangeDisplayImage(string fileName, [double timeoutInSeconds], [double alpha], [int prePause], [int postPause])
```

Returns:
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.

<!-- misty.DeleteImageAssetFromRobot -->

### misty.DeleteImageAssetFromRobot
Enables you to remove an image file from Misty that you have previously saved to her storage.

**Note:** You can only delete image files that you have previously saved to Misty's storage. You cannot remove Misty's default system image files.

Arguments:
* fileName (string) - The name of the file to delete, including its file type extension.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.DeleteImageAssetFromRobot(string filename, [int prePause], [int postPause]);
```

Returns:
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.

<!-- misty.GetListOfImages -->
### misty.GetListOfImages
Obtains a list of the images stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. Specifies the name of the callback function to call when the data returned by this command is ready. If empty, the default callback function ( `<_CommandName>`) is called. 
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetListOfImages([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause])
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (array) - Returns an array containing one element for each image currently stored on Misty. Each element contains the following:
   * Height (integer) - The height of the image file.
   * Name (string) - The name of the image file.
   * Width (integer) - The width of the image file.
   * UserAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

<!-- misty.SaveImageAssetToRobot -->
### misty.SaveImageAssetToRobot
Saves an image to Misty in the form of a byte array string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB. **Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

Arguments
* fileName (string) - The name of the image file to save.
* dataAsByteArrayString (string) - The image data, passed as a string containing a byte array.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). Important: To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). Important: To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the saved image file, while a value of `false` tells Misty not to display the image.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the saved file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the saved file should not overwrite any existing files on Misty.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SaveImageAssetToRobot(string fileName, string dataAsByteArrayString, [int width], [int height], [bool immediatelyApply], [bool overwriteExisting], [int prePause], [int postPause]
```

<!-- TODO: Check return values>

<!-- Images & Display - BETA>

<!-- misty.ClearDisplayText - BETA -->

### misty.ClearDisplayText - BETA
Force-clears an error message from Misty’s display. **Note:** This command is provided as a convenience. You should not typically need to call `misty.ClearDisplayText()`.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.ClearDisplayText ([int prePause], [int postPause])
```

Returns
- Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Images & Display - ALPHA -->

<!-- misty.GetImage - ALPHA -->
### misty.GetImage - ALPHA
Obtains a system or user-uploaded image file currently stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments  
* imageName (string) - The name of the image file to get, including its file type extension.
* base64 (boolean) - Optional. Passing in `true` returns the image data as a Base64 string. Passing in `false` returns the image. Defaults to `true`. 
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetImage(string imageName, [bool base64 = true] [string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

- Result (object) - An object containing image data and meta information. 
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the image in pixels.
  - name (string) - The name of the image.
  - width (integer) - The width of the image in pixels.

<!-- misty.SlamGetDepthImage -->
### misty.SlamGetDepthImage - ALPHA
Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of “unknown” values in the form of `NaN` (“not a number”) values.

**Note:** Make sure to use `SlamStartStreaming` to open the data stream from Misty's depth sensor before using this command. Mapping or tracking does not need to be active to use this command.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. Specifies the name of the callback function to call when the data returned by this command is ready. If empty, the default callback function ( `_<COMMAND>`) is called.
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamGetDepthImage([string callbackMethod], [string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

- Result (object) - An object containing depth information about the image matrix, with the following fields.
  - height (integer) - The height of the matrix.
  - image (array) - A matrix of size `height` x `width` containing individual values of type float. Each value is the distance in millimeters from the sensor for each pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. Note that as the robot moves further away from a scene being viewed, each pixel value will represent a larger surface area. Conversely, if it moves closer, each pixel value will represent a smaller area.
  - width (integer) - The width of the matrix.

<!-- misty.SlamGetVisibleImage - ALPHA -->
### misty.SlamGetVisibleImage - ALPHA
Takes a photo using Misty’s Occipital Structure Core depth sensor.

**Note:** Make sure to use `SlamStartStreaming` to open the data stream from Misty's depth sensor before using this command. Mapping or tracking does not need to be active to use this command.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* Base64 (boolean) - True or False. Sending a request with `true` returns the image data as a Base64 string, while sending a request of `false` displays the photo immediately after it is taken. **Note:** Images generated by this command are not saved in Misty's memory. To save an image to your robot for later use, pass `true` for Base64 to obtain the image data, then pass the returned image data to `misty.SaveImageAssetToRobot()`.
* callbackMethod (string) - Optional. Specifies the name of the callback function to call when the data returned by this command is ready. If empty, the default callback function ( `_<COMMAND>`) is called.
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamGetVisibleImage([bool base64], [string callbackMethod], [string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause])
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

- Result (object) -  An object containing image data and meta information. This object is only sent if you pass `true` for `Base64`.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the picture in pixels.
  - name (string) - The name of the picture.
  - width (integer) - The width of the picture in pixels.

<!-- misty.SlamStartStreaming - ALPHA -->
### misty.SlamStartStreaming - ALPHA
Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

Important! Always use `misty.SlamStopStreaming()` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPause` is not used.

```JavaScript
misty.SlamStartStreaming([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.
<!-- misty.SlamStopStreaming - ALPHA -->
### misty.SlamStartStreaming - ALPHA
Closes the data stream from the Occipital Structure Core depth sensor.

Important! Always use this command to close the depth sensor data stream after using `misty.SlamStartStreaming()` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPause` is not used.

```JavaScript
misty.SlamStartStreaming([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.TakePicture - ALPHA -->

<!-- TODO: Research & revise. -->

### misty.TakePicture - ALPHA

Takes a photo with Misty’s 4K camera. Optionally, saves the photo to Misty and proportionately reduces the size of the photo.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* base64 (boolean) - Passing in `true` returns the image data as a Base64 string.
* fileName (string) - Optional. If specified, Misty saves the photo as an image asset with this name and adds the appropriate file type extension. If unspecified, Misty does not save the photo.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of a photo you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* displayOnScreen (boolean) - Optional. If `true` and a `fileName` is provided, displays the captured photo on Misty’s screen. If `false` or no `fileName` value is provided, does nothing.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the file should overwrite a file with the same name, if one currently exists on Misty. A value of false indicates the file should not overwrite any existing files on Misty.
* callbackMethod (string) - Optional. Specifies the name of the callback function to call when the data returned by this command is ready. If empty, the default callback function ( `_<COMMAND>`) is called.
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.TakePicture([bool base64], [string fileName], [int width], [int height], [bool DisplayOnScreen], [bool OverwiteExisting], [string callbackMethod], [string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (object) - An object containing image data and meta information. This object is only sent if you pass true for Base64.
   * Base64 (string) - A string containing the Base64-encoded image data.
   * Format (string) - The type and format of the image returned.
   * Height (integer) - The height of the image in pixels.
   * Name (string) - The name of the image.
   * Width (integer) - The width of the image in pixels.


## Audio

<!-- Audio - PRODUCTION>

<!-- misty.PlayAudioClip -->

<!-- misty.GetListOfAudioClips -->
### misty.GetListOfAudioClips

Lists the default system audio files currently stored on Misty.

Note that you can use the `misty.GetListOfAudioFiles()` command to list all audio files on the robot (system files and user uploads).

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetListOfAudioClips([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- TODO: test return values -->

* Result (array) - Returns an array of audio file information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the audio file was added by the user. If `false`, the file is one of Misty's default audio files. **Note:** `misty.GetListOfAudioClips()` should always return false.


 <!-- misty.GetListOfAudioFiles -->
### misty.GetListOfAudioFiles
Lists all audio files (default system files and user-added files) currently stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetListOfAudioFiles([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- TODO: review return values -->

* Result (array) - Returns an array of audio file information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If true, the file was added by the user. If false, the file is one of Misty's system files.



### misty.PlayAudioClip
Plays an audio clip that has been previously saved to Misty's storage.

Arguments:
* fileName (string) - The name of the file to play.
* volume (integer) - Optional. A value between 0 and 100  for the loudness of the audio clip. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.
command.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.PlayAudioClip(string FileName, [int volume], [int prePause], [int postPause]);
```

<!-- TODO: research return values>

<!-- misty.SaveAudioAssetToRobot -->
### misty.SaveAudioAssetToRobot
Saves an audio file to Misty. Maximum size is 3 MB.

Arguments
* fileName (string) - The name of the audio file. This command accepts all audio format types, however Misty currently cannot play OGG files.
* dataAsByteArrayString (string) - The audio data, passed as a string containing a byte array.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the audio file, while a value of `false` tells Misty not to play the file.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the file should not overwrite any existing files on Misty.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SaveAudioAssetToRobot(string fileName, string dataAsByteArrayString, [bool immediatelyApply], [bool overwriteExisting], [int prePause], [int postPause])
```

<!-- TODO: research return values>

<!-- Audio - BETA -->
<!-- misty.DeleteAudioAssetFromRobot -->
### misty.DeleteAudioAssetFromRobot - BETA

Enables you to remove an audio file from Misty that you have previously saved. **Note:** You can only delete audio files that you have saved to Misty. You cannot remove Misty's default system audio files.

Arguments
* FileName (string) - The name of the file to delete, including its file type extension.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.DeleteAudioAssetFromRobot(string fileName, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.

<!-- misty.StartRecordingAudio - BETA -->
### misty.StartRecordingAudio - BETA
Directs Misty to initiate an audio recording and save it with the specified file name. Misty records audio with a far-field microphone array and saves it as a byte array string. To stop recording, you must call the `misty.StopRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

Arguments
* fileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StartRecordingAudio(string filename, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.StopRecordingAudio - BETA -->
### misty.StopRecordingAudio - BETA
Directs Misty to stop the current audio recording and saves the recording to the robot under the `fileName` name specified in the call to `misty.StartRecordingAudio()` You must use this command after calling the `misty.StartRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopRecordingAudio([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns true if there are no errors related to this command.


<!-- Audio - ALPHA -->

<!-- TODO: ### misty.GetAudioFile - ALPHA -->

<!-- misty.SetDefaultVolume - ALPHA -->
### misty.SetDefaultVolume - ALPHA
Sets the default loudness of Misty's speakers for audio playback.

Arguments
* volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetDefaultVolume(int volume, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.



## Locomotion

## Faces

## Head Movement

## Arm Movement

## Mapping & Tracking

## Information

## LEDs

## Events & Timing

## Data

## Debugging