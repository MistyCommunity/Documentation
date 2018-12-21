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

Arguments
* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* timeoutInSeconds (double) - Optional. The length of time to display the specified image.
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.ChangeDisplayImage(string fileName, [double timeoutInSeconds], [double alpha], [int prePause], [int postPause])
```

Returns
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.

<!-- misty.DeleteImageAssetFromRobot -->

### misty.DeleteImageAssetFromRobot
Enables you to remove an image file from Misty that you have previously saved to her storage.

**Note:** You can only delete image files that you have previously saved to Misty's storage. You cannot remove Misty's default system image files.

Arguments
* fileName (string) - The name of the file to delete, including its file type extension.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.DeleteImageAssetFromRobot(string filename, [int prePause], [int postPause]);
```

Returns
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

Want Misty to say something different or play a special tune when she recognizes someone? You can save your own audio files to Misty and control what she plays.

<!-- Audio - PRODUCTION>

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

Arguments
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

<!-- misty.Drive --> 
### misty.Drive
Drives Misty forward or backward at a specific speed until cancelled. Call `misty.Stop()` to cancel driving. 

When using the `misty.Drive()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Arguments
* linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
* angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Drive(double linearVelocity, double angularVelocity, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

### misty.DriveTime
Drives Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using the `misty.DriveTime()` command, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Arguments
- linearVelocity (double) - A percent value that sets the speed for Misty when she drives in a straight line. Default value range is from -100 (full speed backward) to 100 (full speed forward).
- angularVelocity (double) - A percent value that sets the speed and direction of Misty's rotation. Default value range is from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
- timeInMs (integer) - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
- degree (double) - (optional) The number of degrees to turn. **Note:** Supplying a `degree` value recalculates linear velocity.
- prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.DriveTime(double linearVelocity, double angularVelocity, int timeInMs, [double degree], [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.LocomotionTrack -->
### misty.LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

Arguments
- leftTrackSpeed (double) - A value for the speed of the left track, range: -100 (full speed backward) to 100 (full speed forward).
- rightTrackSpeed (double) - A value for the speed of the right track, range: -100 (full speed backward) to 100 (full speed forward).
- prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
- postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.LocomotionTrack(double leftTrackSpeed, double rightTrackSpeed, [int prePause], [int postPause])
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.Stop -->
### misty.Stop
Stops Misty's movement.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Stop([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Alpha - Locomotion -->

### misty.Halt - ALPHA

Stops all motor controllers, including drive motor, head/neck, and arm (for Misty II).

Arguments
* None

```JavaScript
misty.Halt()
```

You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area.

## Information

<!-- misty.GetAvailableWifiNetworks -->
### misty.GetAvailableWifiNetworks
Obtains a list of local WiFi networks and basic information regarding each.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetAvailableWifiNetworks([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (array) - An array containing one element for each Wi-Fi network discovered. Each element contains the following:
   * Name (string) - The name of the Wi-Fi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns `true` if the network is secure. Otherwise, `false`.

<!-- misty.GetBatteryLevel -->
### misty.GetBatteryLevel
Obtains Misty's current battery level.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetBatteryLevel([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (double) - Returns a value between 0 and 100 corresponding to the current battery level.

<!-- misty.GetDeviceInformation -->
### misty.GetDeviceInformation
Obtains device-related information for the robot.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetDeviceInformation([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

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


<!-- misty.GetHelp -->
### misty.GetHelp
Obtains information about a specified API command. Calling `misty.GetHelp()` with no parameters returns a list of all the API commands that are available.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* endpointName (string) - Command in "Api.<COMMAND>" format eg: "Api.GetListOfAudioClips". If no command name is specified, calling `misty.GetHelp()` returns a list of all  API commands.
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetHelp([string endpointName],[string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (string) - A string containing the requested help information.

<!-- Information - BETA -->

<!-- misty.GetBetaHelp - BETA -->
### misty.GetBetaHelp - BETA
Obtains information about a specified beta API command. Calling `misty.GetBetaHelp()` with no parameters returns a list of all the beta API commands that are available.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* endpointName (string) - A beta command name in "Api.<COMMAND>" format, e.g.: "Api.SetHeadPosition". If no command name is specified, `GetBetaHelp` returns a list of all the beta API commands.
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetBetaHelp([string endpointName],[string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (string) - A string containing the requested help information.

## LEDs

<!-- misty.ChangeLED --> 
### misty.ChangeLED

Changes the color of the LED light behind the logo on Misty's torso.

Arguments
* Red (byte) - A value between 0 and 255 specifying the red RGB color.
* Green (byte) - A value between 0 and 255 specifying the green RGB color.
* Blue (byte) - A value between 0 and 255 specifying the blue RGB color.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.ChangeLED(int red, int green, int blue, [int prePause], [int postPause]);
```
Returns
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.

## Faces

<!-- Faces - BETA>

<!-- misty.CancelFaceTraining - BETA -->
### misty.CancelFaceTraining - BETA
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the `misty.CancelFaceTraining()` command unless you want to abort a training that is in progress.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.CancelFaceTraining([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.ClearLearnedFaces - BETA -->
### misty.ClearLearnedFaces - BETA
Removes records of previously trained faces from Misty's memory.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.GetLearnedFaces - BETA --> 
### misty.GetLearnedFaces - BETA
Obtains a list of the names of faces on which Misty has been successfully trained.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackRule (string) - Optional. Designates the callback rule for this command. Available callback rules are `”synchronous”`, `”override”`, and `”abort”`. Defaults to `”synchronous”`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetLearnedFaces([string callbackRule = “synchronous”], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

* Result (string) - A list of the names for faces that Misty has been trained to recognize.

<!-- misty.StartFaceDetection - BETA -->  
### misty.StartFaceDetection - BETA
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call `misty.StopFaceDetection()`.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StartFaceDetection([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.StartFaceRecognition - BETA -->
### misty.StartFaceRecognition - BETA
Directs Misty to recognize a face she sees, if it is among those she has previously detected. To use this command, you must have previously used the `misty.StartFaceDetection()` command to detect and store face IDs in Misty's memory.

When you are done having Misty recognize faces, call `misty.StopFaceRecognition()`.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StartFaceRecognition([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.StartFaceTraining - BETA -->
### misty.StartFaceTraining - BETA
Starts Misty learning a face and assigns a name to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call `misty.CancelFaceTraining()`.

Arguments
* faceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StartFaceTraining(string faceId, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.StopFaceDetection - BETA -->
### misty.StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopFaceDetection([int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.StopFaceRecognition - BETA -->
### misty.StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopFaceRecognition([int prePause], [int postPause])
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Head Movement

<!-- misty.MoveHeadDegrees --> 
### misty.MoveHeadDegrees
Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `misty.MoveHeadDegrees()` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from approximately -9.5 (fully up) to 34.9 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value specifying the tilt (“ear” to “shoulder”) of Misty’s head. Misty’s head tilts to the left or right. Values range from -43.0 (fully left) to 43.0 (fully right). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadDegrees(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.MoveHeadPosition -->
### misty.MoveHeadPosition

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `MoveHeadPosition` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from -5 (fully up) to 5 (fully down).
* roll (double) - A value specifying the tilt (“ear” to “shoulder”) of Misty’s head. Values range from -5 (head tilted fully to the left shoulder) to 5 (head fully to the right shoulder). This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -5 (fully right) to 5 (fully left). This value is ignored for Misty I.
* velocity (double) - A value from 0 to 100 specifying the speed at which Misty moves her head.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadPosition(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.MoveHeadRadians -->
### misty.MoveHeadRadians

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `MoveHeadPosition` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value in radians specifying the position of Misty’s head along the up-down axis. Values range from -0.1662 (fully up) to 0.6094 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value in radians specifying the tilt (“ear” to “shoulder”) of Misty’s head. Values range from -0.75 (head tilted fully to the left shoulder) to 0.75 (head fully to the right shoulder). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value in radians specifying the turn to the left or right of Misty’s head. Values range from -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
 This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadRadians(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.SetHeadDegrees -->
### misty.SetHeadDegrees

Moves Misty’s head to a given degree along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `”yaw”` (turn), `”pitch”` (up-and-down), or `”roll”` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.  
* position (double) - Indicates the degree to move Misty’s head to along the given axis. The value range for pitch is -9.5 (fully up) to 35.0 (fully down); for roll, --43.0 (fully left) to 43.0 (fully right); for yaw, -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. 
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadDegrees(string axis, double position, [double velocity,] [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

### misty.SetHeadPosition

Moves Misty’s head to a given position along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `”yaw”` (turn), `”pitch”` (up-and-down), or `”roll”` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.
* position (double) - Indicates the position to move Misty’s head to along the given axis. Value range is -5 to 5. For pitch, -5 is fully up and 5 is fully down. For roll, -5 is fully left and 5 is fully right. For yaw, -5 is fully right and 5 is fully left.
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadPosition(string axis, double position, double velocity, [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- misty.SetHeadRadians -->
### misty.SetHeadRadians

Moves Misty’s head to a given radian along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `”yaw”` (turn), `”pitch”` (up-and-down), or `”roll”` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.
* position (double) - Indicates the radian to move Misty’s head to along the given axis. The value range for pitch is -0.1662 (fully up) to 0.6094 (fully down); for roll, -0.75 (fully left) to 0.75 (fully right); for yaw, -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadRadians(string axis, double position, [double velocity,] [int prePause], [int postPause]);
```

Returns
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Arm Movement

## Mapping & Tracking

## Events & Timing

## Data

## Debugging