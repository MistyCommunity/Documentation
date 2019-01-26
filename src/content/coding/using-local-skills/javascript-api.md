---
title: JavaScript API
layout: coding.hbs
columns: three
order: 3
---

# {{title}}

Use the JavaScript API to write skills for Misty that run locally on your robot. For more about local skills, see [Local Skill Architecture](../architecture).

**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.

## Images & Display

<!-- Images & Display - PRODUCTION -->

### misty.ChangeDisplayImage
Displays an image on Misty's screen. Optionally, `misty.ChangeDisplayImage()` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. You can use the [`SaveImageAssetToRobot`](../../using-remote-commands/rest/#saveimageassettorobot-byte-array-string-) command in Misty's REST API to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

```JavaScript
// Syntax
misty.ChangeDisplayImage(string fileName, [double timeoutInSeconds], [double alpha], [int prePause], [int postPause])
```

Arguments

* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* timeoutInSeconds (double) - Optional. The length of time to display the specified image. 
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.ChangeDisplayImage("Happy.png", 10, 0.5, 0, 0);
```

<!-- misty.DeleteImageAssetFromRobot -->

### misty.DeleteImageAssetFromRobot
Enables you to remove an image file from Misty that you have previously saved to her storage.

**Note:** You can only delete image files that you have previously saved to Misty's storage. You cannot remove Misty's default system image files.

```JavaScript
// Syntax
misty.DeleteImageAssetFromRobot(string filename, [int prePause], [int postPause]);
```

Arguments

* fileName (string) - The name of the file to delete, including its file type extension.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.DeleteImageAssetFromRobot("DeleteMe.png");
```

<!-- misty.GetListOfImages -->
### misty.GetListOfImages
Obtains a list of the images stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

```JavaScript
// Syntax
misty.GetListOfImages([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause])
```

Arguments

* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.GetListOfImages();

function _GetListOfImages(data) {
    _imageList = JSON.stringify(data);
    misty.Debug(_imageList)
}
```

Returns

* Result (array) - Returns an array containing one element for each image currently stored on Misty. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information. Each element in the array contains the following:
   * Height (integer) - The height of the image file.
   * Name (string) - The name of the image file.
   * Width (integer) - The width of the image file.
   * UserAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

### misty.SaveImageAssetToRobot
Saves an image to Misty in the form of a byte array string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB. **Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

```JavaScript
// Syntax
misty.SaveImageAssetToRobot(string fileName, string dataAsByteArrayString, [int width], [int height], [bool immediatelyApply], [bool overwriteExisting], [int prePause], [int postPause]
```

Arguments
* fileName (string) - The name of the image file to save.
* dataAsByteArrayString (string) - The image data, passed as a string containing a byte array.
* width (integer) - Optional. A whole number greater than 0 specifying the desired image width (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* height (integer) - Optional. A whole number greater than 0 specifying the desired image height (in pixels). **Important:** To reduce the size of an image you must supply values for both `width` and `height`. Note that if you supply disproportionate values for `width` and `height`, the system uses the proportionately smaller of the two values to resize the image.
* immediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately display the saved image file, while a value of `false` tells Misty not to display the image.
* overwriteExisting (boolean) - Optional. A value of `true` indicates the saved file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the saved file should not overwrite any existing files on Misty.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.SaveAudioAssetToRobot("Filename.wav", "137,80,78,71,13,1...", false, false);
```

<!-- Images & Display - BETA -->

### misty.ClearDisplayText - BETA
Force-clears an error message from Misty’s display. **Note:** This command is provided as a convenience. You should not typically need to call `misty.ClearDisplayText()`.

```JavaScript
// Syntax
misty.ClearDisplayText ([int prePause], [int postPause])
```

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.ClearDisplayText();
```

<!-- Images & Display - ALPHA -->

<!-- misty.GetImage - ALPHA -->
### misty.GetImage - ALPHA
Obtains a system or user-uploaded image file currently stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

```JavaScript
misty.GetImage(string imageName, [bool base64 = true] [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Arguments  
* imageName (string) - The name of the image file to get, including its file type extension.
* base64 (boolean) - Optional. Passing in `true` returns the image data as a Base64 string. Passing in `false` returns the image. Defaults to `true`. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.GetImage("Angry.png", true);

function _GetImage(data) {
    _imageData = JSON.stringify(data);
    misty.Debug(_imageData);
}
```

Returns

- Result (object) - An object containing image data and meta information. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the image in pixels.
  - name (string) - The name of the image.
  - width (integer) - The width of the image in pixels.


<!-- misty.SlamGetDepthImage -->
### misty.SlamGetDepthImage - ALPHA
Provides the current distance of objects from Misty’s Occipital Structure Core depth sensor. Note that depending on the scene being viewed, the sensor may return a large proportion of "unknown" values in the form of `NaN` ("not a number") values.

**Note:** Make sure to use `misty.SlamStartStreaming()` to open the data stream from Misty's depth sensor before using this command. Mapping or tracking does not need to be active to use this command.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

```JavaScript
// Syntax
misty.SlamGetDepthImage([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example

// Use misty.SlamStartStreaming() to open the
// data stream from Misty's depth sensor before
// calling misty.SlamGetDepthImage()
misty.SlamStartStreaming();

misty.SlamGetDepthImage();

// Callback function to call when data
// from misty.SlamGetDepthImage is ready
function _SlamGetDepthImage(data) {
    _depthImageData = JSON.stringify(data);
    misty.Debug(_depthImageData);
}

// Use misty.SlamStopStreaming() to close the
// data stream from the depth sensor after
// obtaining a depth image
misty.SlamStopStreaming(20000);
```

Returns

- Result (object) - An object containing depth information about the image matrix, with the following fields. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
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
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamGetVisibleImage([bool base64], [string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause])
```

Returns

- Result (object) -  An object containing image data and meta information. This object is only sent if you pass `true` for `Base64`. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the picture in pixels.
  - name (string) - The name of the picture.
  - width (integer) - The width of the picture in pixels.

<!-- misty.SlamStartStreaming - ALPHA -->
### misty.SlamStartStreaming - ALPHA
Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `misty.SlamStopStreaming()` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Calling `misty.SlamStopStreaming()` turns off the laser in the depth sensor and lowers Misty's power consumption. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPause` is not used.

```JavaScript
misty.SlamStartStreaming([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SlamStopStreaming - ALPHA -->
### misty.SlamStopStreaming - ALPHA
Closes the data stream from the Occipital Structure Core depth sensor. Calling this command turns off the laser in the depth sensor and lowers Misty's power consumption.

**Important!** Always use this command to close the depth sensor data stream after using `misty.SlamStartStreaming()` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPause` is not used.

```JavaScript
misty.SlamStopStreaming([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`_<COMMAND>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.TakePicture([bool base64], [string fileName], [int width], [int height], [bool DisplayOnScreen], [bool OverwiteExisting], [string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for `Base64`. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
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
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetListOfAudioClips([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

<!-- TODO: test return values -->

* Result (array) - Returns an array of audio file information. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the audio file was added by the user. If `false`, the file is one of Misty's default audio files. **Note:** `misty.GetListOfAudioClips()` should always return false.


 <!-- misty.GetListOfAudioFiles -->
### misty.GetListOfAudioFiles
Lists all audio files (default system files and user-added files) currently stored on Misty.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetListOfAudioFiles([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

<!-- TODO: review return values -->

* Result (array) - Returns an array of audio file information. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information. Each item in the array contains the following:
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
misty.PlayAudioClip(string fileName, [int volume], [int prePause], [int postPause]);
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
* fileName (string) - The name of the file to delete, including its file type extension.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.DeleteAudioAssetFromRobot(string fileName, [int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.StopRecordingAudio - BETA -->
### misty.StopRecordingAudio - BETA
Directs Misty to stop the current audio recording and saves the recording to the robot under the `fileName` name specified in the call to `misty.StartRecordingAudio()`. Use this command after calling the `misty.StartRecordingAudio()` command. If you do not call `misty.StopRecordingAudio()`, Misty automatically stops recording after 60 seconds.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopRecordingAudio([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns true if there are no errors related to this command. -->


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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.Stop -->
### misty.Stop
Stops Misty's movement.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Stop([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- Alpha - Locomotion -->

### misty.Halt - ALPHA

Stops all motor controllers, including drive motor, head/neck, and arm (for Misty II).

```JavaScript
// Syntax
misty.Halt([int prePause], [int postPause])
```

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.Halt();
```

## Information

<!-- misty.GetAvailableWifiNetworks -->
### misty.GetAvailableWifiNetworks
Obtains a list of local WiFi networks and basic information regarding each.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetAvailableWifiNetworks([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (array) - An array containing one element for each Wi-Fi network discovered. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information. Each element contains the following:
   * Name (string) - The name of the Wi-Fi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns `true` if the network is secure. Otherwise, `false`.

<!-- misty.GetBatteryLevel -->
### misty.GetBatteryLevel
Obtains Misty's current battery level.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetBatteryLevel([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (double) - Returns a value between 0 and 100 corresponding to the current battery level. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- misty.GetDeviceInformation -->
### misty.GetDeviceInformation
Obtains device-related information for the robot.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetDeviceInformation([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (object) - An object containing information about the robot, with the following fields. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
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
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetHelp([string endpointName], [string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (string) - A string containing the requested help information. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- Information - BETA -->

<!-- misty.GetBetaHelp - BETA -->
### misty.GetBetaHelp - BETA
Obtains information about a specified beta API command. Calling `misty.GetBetaHelp()` with no parameters returns a list of all the beta API commands that are available.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* endpointName (string) - A beta command name in "Api.<COMMAND>" format, e.g.: "Api.SetHeadPosition". If no command name is specified, `GetBetaHelp` returns a list of all the beta API commands.
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetBetaHelp([string endpointName],[string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (string) - A string containing the requested help information. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

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
<!-- Returns
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`. -->

## Faces


You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area.

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.ClearLearnedFaces - BETA -->
### misty.ClearLearnedFaces - BETA
Removes records of previously trained faces from Misty's memory.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

<!-- Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.GetLearnedFaces - BETA --> 
### misty.GetLearnedFaces - BETA
Obtains a list of the names of faces on which Misty has been successfully trained.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetLearnedFaces([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (string) - A list of the names for faces that Misty has been trained to recognize. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

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
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.StopFaceDetection - BETA -->
### misty.StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopFaceDetection([int prePause], [int postPause]);
```

### misty.StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.StopFaceRecognition([int prePause], [int postPause])
```


## Head Movement

### misty.MoveHeadDegrees
Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `misty.MoveHeadDegrees()` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from approximately -9.5 (fully up) to 34.9 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value specifying the tilt ("ear" to "shoulder") of Misty’s head. Misty’s head tilts to the left or right. Values range from -43.0 (fully left) to 43.0 (fully right). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadDegrees(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

### misty.MoveHeadPosition

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `MoveHeadPosition` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value specifying the position of Misty’s head along the up-down axis. Values range from -5 (fully up) to 5 (fully down).
* roll (double) - A value specifying the tilt ("ear" to "shoulder") of Misty’s head. Values range from -5 (head tilted fully to the left shoulder) to 5 (head fully to the right shoulder). This value is ignored for Misty I.
* yaw (double) - A value specifying the turn to the left or right of Misty’s head. Values range from -5 (fully right) to 5 (fully left). This value is ignored for Misty I.
* velocity (double) - A value from 0 to 100 specifying the speed at which Misty moves her head.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadPosition(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

### misty.MoveHeadRadians

Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the `MoveHeadPosition` command can only control the up-down movement of Misty's head.

Arguments
* pitch (double) - A value in radians specifying the position of Misty’s head along the up-down axis. Values range from -0.1662 (fully up) to 0.6094 (fully down). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* roll (double) - A value in radians specifying the tilt ("ear" to "shoulder") of Misty’s head. Values range from -0.75 (head tilted fully to the left shoulder) to 0.75 (head fully to the right shoulder). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. This value is ignored for Misty I.
* yaw (double) - A value in radians specifying the turn to the left or right of Misty’s head. Values range from -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
 This value is ignored for Misty I.
* velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveHeadRadians(double pitch, double roll, double yaw, [double velocity], [int prePause], [int postPause]);
```

<!-- misty.SetHeadDegrees -->
### misty.SetHeadDegrees

Moves Misty’s head to a given degree along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `"yaw"` (turn), `"pitch"` (up-and-down), or `"roll"` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.  
* position (double) - Indicates the degree to move Misty’s head to along the given axis. The value range for pitch is -9.5 (fully up) to 35.0 (fully down); for roll, --43.0 (fully left) to 43.0 (fully right); for yaw, -90.0 (fully right) to 90.0 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here. 
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadDegrees(string axis, double position, [double velocity,] [int prePause], [int postPause]);
```

### misty.SetHeadPosition

Moves Misty’s head to a given position along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `"yaw"` (turn), `"pitch"` (up-and-down), or `"roll"` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.
* position (double) - Indicates the position to move Misty’s head to along the given axis. Value range is -5 to 5. For pitch, -5 is fully up and 5 is fully down. For roll, -5 is fully left and 5 is fully right. For yaw, -5 is fully right and 5 is fully left.
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadPosition(string axis, double position, double velocity, [int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SetHeadRadians -->
### misty.SetHeadRadians

Moves Misty’s head to a given radian along one of three axes (tilt, turn, or up-and-down).

Arguments
* axis (string) - The axis to change. Values are `"yaw"` (turn), `"pitch"` (up-and-down), or `"roll"` (tilt). Passing a value of `"yaw"` or `"roll"` in a local skill running on Misty I robots does nothing.
* position (double) - Indicates the radian to move Misty’s head to along the given axis. The value range for pitch is -0.1662 (fully up) to 0.6094 (fully down); for roll, -0.75 (fully left) to 0.75 (fully right); for yaw, -1.57 (fully right) to 1.57 (fully left). Note that due to normal variations in the range of head motion available to each robot, the minimum and maximum values for your Misty may differ slightly from the values listed here.
* velocity (double) - The speed of the head movement. Value range: 0 to 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetHeadRadians(string axis, double position, [double velocity,] [int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

## Arm Movement

<!-- misty.MoveArmPosition -->
### misty.MoveArmPosition

**Available for Misty II Only**

Moves one of Misty's arms to a specified position.

Arguments
* armToMove (string) - The arm to move. Pass `"Left"` or `"Right"`.
* position (double) - The position to move the arm to. Value range: 0 - 10.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveArmPosition(string armToMove, double position, double velocity, [int prePause], [int postPause])
```

<!-- misty.MoveArmDegrees -->
### misty.MoveArmDegrees

**Available for Misty II Only**

Moves one of Misty's arms to a specified location in degrees.

Arguments
* armToMove (string) - The arm to move. Pass `"left"` or `"right"`.
* degrees (double) - The location in degrees to move the arm to. Value range: 0 - 180.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.MoveArmPosition(string armToMove, double degrees, double velocity, [int prePause], [int postPause])
```

<!-- misty.MoveArmRadians -->
### misty.MoveArmRadians

**Available for Misty II Only**

Moves one of Misty's arms to a specified location in radians.

Arguments
* armToMove (string) - The arm to move. Pass `"left"` or `"right"`.
* radians (double) - The location in radians to move the arm to. Value range: 0 to -3.14.
* velocity (double) - The velocity with which to move the arm. Velocity value is a percentage of maximum velocity. Value range: 0 - 100.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used. 

```JavaScript
misty.MoveArmPosition(string armToMove, double radians, double velocity, [int prePause], [int postPause])
```

## Mapping & Tracking

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [API Explorer](../../../onboarding/apps/api-explorer/#mapping-amp-tracking-alpha).

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

<!-- Mapping & Tracking - ALPHA>

<!-- misty.FollowPath - ALPHA -->
### misty.FollowPath - ALPHA
Drives Misty on a path defined by coordinates you specify. Note that Misty must have a map and be actively tracking before starting to follow a path. Misty will not be able to successfully follow a path if unmapped obstacles are in her way.

**Important!** Make sure to call `misty.SlamStartTracking()` to start Misty tracking her location before using this command, and call `misty.SlamStopTracking()` to stop Misty tracking her location after using this command.

Arguments
* path - List of sets of Integers - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `path` values from a map that Misty has previously generated.  *Note:* X values specify directions forward and backward. Sideways directions are specified by Y values.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.FollowPath(string path, [int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SlamGetMap - ALPHA -->
### misty.SlamGetMap - ALPHA

Obtains occupancy grid data for the most recent map Misty has generated. 

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

**Note:** To obtain a valid response from `SlamGetRawMap`, Misty must first have successfully generated a map. 

Misty’s maps are squares that are constructed around her initial physical location when she starts mapping. When a map is complete, it is a square with Misty’s starting point at the center.

The occupancy grid for the map is represented by a two-dimensional matrix. Each element in the occupancy grid represents an individual cell of space. The value of each element (0, 1, 2, or 3) indicates the nature of the space in those cells (respectively: "unknown", "open", "occupied", or "covered").

Each cell corresponds to a pair of X,Y coordinates that you can use with the `misty.FollowPath()`, `misty.DriveToLocation()`, and `misty.SlamGetPath()` commands. The first cell in the first array of the occupancy grid is the origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamGetMap([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (object) - An object containing the following key-value pairs. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.
  * grid (array of arrays) - The occupancy grid for the most recent map Misty has generated, represented by a matrix of cells. The number of arrays is equal to the value of the `height` parameter. The number of cells is equal to the product of `height` x `width`. Each individual value (0, 1, 2, or 3) in the matrix represents a single cell of space. 0 indicates "unknown" space, 1 indicates "open" space, 2 indicates "occupied" space, and 3 indicates "covered" space. Each cell corresponds to an X,Y coordinate on the occupancy grid. The first cell in the first array is the X,Y origin point (0,0) for the map. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. If no map is available, grid returns `null`.
  * height (integer) - The height of the occupancy grid matrix (in number of cells).
  * isValid (boolean) - Returns a value of `true` if the data returned represents a valid map. If no valid map data is available, returns a value of `false`.
  * metersPerCell (integer) - A value in square meters stating the size of each cell in the occupancy grid matrix.
  * originX (float) - The distance in meters from the X value of the occupancy grid origin (0,0) to the X coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to an X coordinate on the occupancy grid, use the formula 0 - (`originX` / `metersPerCell`). Round the result to the nearest whole number. 
  * originY (float) - The distance in meters from the Y value of the occupancy grid origin (0,0) to the Y coordinate of the physical location where Misty started mapping. The X,Y coordinates of Misty's starting point are always at the center of the occupancy grid. To convert this value to a Y coordinate on the occupancy grid, use the formula 0 - (`originY` / `metersPerCell`). Round the result to the nearest whole number. 
  * size (integer) - The total number of map cells represented in the grid array. Multiply this number by the value of meters per cell to calculate the area of the map in square meters.
  * width (integer) - The width of the occupancy grid matrix (in number of cells). 

<!-- misty.SlamGetPath - ALPHA -->
### misty.SlamGetPath - ALPHA

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the `path` parameter of `misty.FollowPath()` for Misty to follow this path to the desired location.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

**Important!** Make sure to call `misty.SlamStartTracking()` to start Misty tracking her location before using this command, and call `misty.SlamStopTracking()` to stop Misty tracking her location after using this command.

Arguments
* X (double) - The X coordinate of the destination.
* Y (double) - The Y coordinate of the destination.
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamGetPath(double X location, double Y location, [string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (array) - An array containing integer pairs. Each pair specifies the X,Y coordinates for a waypoint on the path. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- misty.SlamGetStatus -->
### misty.SlamGetStatus - ALPHA
Obtains values representing Misty's current activity and sensor status.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

Returns

* Status (integer) - Value 1 is an integer value where each bit is set to represent a different activity mode:
  1 - Idle
  2 - Exploring
  3 - Tracking
  4 - Recording
  5 - Resetting

Example: If Misty is both exploring and recording, then bits 2 and 4 would be set => 0000 1010 => Status = 10.

* Slam Status (integer) - Value 2 is an integer value representing the status of Mistys' sensors, using the SlamSensorStatus enumerable.

```c#
public enum SlamSensorStatus
{
  Unknown = 0,
  Connected = 1,
  Booting = 2,
  Ready = 3,
  Disconnected = 4,
  Error = 5,
  UsbError = 6,
  LowPowerMode = 7,
  RecoveryMode = 8,
  ProdDataCorrupt = 9,
  FWVersionMismatch = 10,
  FWUpdate = 11,
  FWUpdateComplete = 12,
  FWCorrupt = 13
}
```

**Note:** In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- misty.SlamReset - ALPHA -->
### misty.SlamReset - ALPHA
Resets Misty's SLAM sensors.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamReset([int prePause], [int postPause]);
```

<!-- Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SlamStartMapping - ALPHA -->
### misty.SlamStartMapping - ALPHA
Starts Misty mapping an area.

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamStartMapping([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SlamStartTracking - ALPHA -->
### misty.SlamStartTracking - ALPHA
Starts Misty tracking her location.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamStartTracking([int prePause], [int postPause]);
```

<!-- Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

### misty.SlamStopMapping - ALPHA
Stops Misty mapping an area.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this 
command, `postPause` is not used.

```JavaScript
misty.SlamStopMapping([int prePause], [int postPause]);
```

<!-- Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

<!-- misty.SlamStopTracking - ALPHA -->
### misty.SlamStopTracking - ALPHA
Stops Misty tracking her location.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SlamStopTracking([int prePause], [int postPause]);
```
<!-- 
Returns
* Result (boolean) - Returns `true` if there are no errors related to this command. -->

## Events & Timing

<!-- misty.AddPropertyTest -->
### misty.AddPropertyTest - ALPHA
Creates a property comparison test to specify which data the system sends for a registered event. Use property tests to filter unwanted data out of event messages.

Arguments
* eventName (string) - The name of the event to create a property comparison test for.
* property (string) - The property of the event to compare. For the full list of properties for each event, see [WebSocket Reference](../../using-remote-commands/websocket-reference).
* inequality (string) - The comparison operator to use in the property comparison test, passed as a string. Accepts `"=>"`, `"=="`, `"!=="`, `">"`, `"<"`, `">="`, `"<="`, `"exists"`, `"empty"`, or `"delta"`.
* valueAsString (string) - The value of the property to compare against, passed as a string. For the full list of values for each event property, see [WebSocket Reference](../../using-remote-commands/websocket-reference).
* valueType (string) - The type of the value specified in `"valueAsString"`. Accepts `"double"`, `"float"`, `"integer"`, "`string"`, `"datetime"`, or "`boolean`"
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.AddPropertyTest(string eventName, string property, string inequality, string valueAsString, string valueType, [int prePause], [int postPause]);
```

<!-- misty.AddReturnProperty -->
### misty.AddReturnProperty - ALPHA
Adds an additional return property field for a registered event.

Arguments
* eventName (string) - The name of the event to add a return property field for.
* eventProperty (string) - The additional property to return.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.AddReturnProperty(string eventName, string eventProperty, [int prePause], [int postPause]);
```

<!-- misty.CancelSkill --> 
### misty.CancelSkill - ALPHA
Cancel execution a specified skill.

Arguments
* uniqueID (string) - The unique GUID of the skill to cancel.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.CancelSkill(string skillName, [int prePause], [int postPause])
```

<!-- misty.Pause -->
### misty.Pause - ALPHA
Pause skill execution for a specified number of milliseconds.

Arguments
* delay (integer) - The duration in milliseconds to pause skill execution.

```JavaScript
misty.Pause(int delay)
```

<!-- misty.RandomPause -->
### misty.RandomPause - ALPHA
Pause skill execution for a random duration.

Arguments
* minimumDelay (integer) - The minimum duration in milliseconds to pause skill execution.
* maximumDelay (integer) - The maximum duration in milliseconds to pause skill execution. 

```JavaScript
misty.RandomPause(int minimumDelay, int maximumDelay)
```


<!-- misty.RegisterEvent -->
### misty.RegisterEvent - ALPHA
Register to receive messages with live event data from one of Misty's sensors. 

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Sensor Event Callbacks](../architecture/#sensor-event-callbacks).

Arguments
* eventName (string) - Sets an event name (of your choice) for the registered event. The name of the callback function is set automatically to be the same as your event name, prefixed with an underscore (`_<eventName>`). 
* messageType (string) - The name of the data stream to register for events from. Matches the predefined `Type` property value for the data stream as listed here.
* debounce (integer) - Sets the frequency in milliseconds with which event data is sent. 
* keepAlive (boolean) - Optional. Pass `true` to keep the callback function registered to the event after the callback function is triggered. By default, when an event callback is triggered, the event unregisters the callback to prevent more commands from overriding the initial call. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueID (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.


```JavaScript
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Data sent by the registered event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Sensor Event Callbacks](../architecture/#sensor-event-callbacks).

<!-- misty.RegisterTimerEvent -->
### misty.RegisterTimerEvent - ALPHA
Creates an event that calls a callback function after a specified period of time. For an example of using this function, see the [Timer Event tutorial](../tutorials/#timer-events).

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../architecture/#timed-or-triggered-event-callbacks).

Arguments
* eventName (string) - The name for the timer event. Note that the name you give to this timer event determines the name automatically assigned to your related callback function. That is, the system sets the name of the callback function to be the same as this event name, prefixed with an underscore (`_<eventName>`). For example, for an event name of `MyTimerEvent`, your callback function must use the name `_MyTimerEvent`. 
* callbackTimeInMs (integer) - The amount of time in milliseconds to wait before the system calls the callback function. For example, passing a value of 3000 causes the system to wait 3 seconds.
* keepAlive (boolean) -  By default (`false`) this timer event calls your callback only once. If you pass `true`, your callback function is called in a loop, with a frequency determined by `callbackTimeInMs`. To end the loop, call the `UnregisterEvent` function in your code.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`.
* skillToCallUniqueID (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.RegisterTimerEvent(string eventName, int callbackTimeInMs, bool keepAlive, [string callbackRule], [string skillToCallUniqueID], [int prePause], [int postPause]);
```

Returns

* Data sent by the timed event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../architecture/#timed-or-triggered-event-callbacks).

<!-- misty.RegisterUserEvent -->
### misty.RegisterUserEvent - ALPHA
Creates an event that calls a callback function at a point of your choosing. You trigger the event by making a REST call to the `api/alpha/sdk/skills/event` endpoint with the appropriate payload for the callback and/or skill.

Once you register the event with `misty.RegisterUserEvent()`, to trigger the event you must make a REST call to the event endpoint with a POST command:

```http
POST {robot-ip-address}/api/alpha/sdk/skills/event
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

**Note:** Event data must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for this command are given the same name as the correlated event, prefixed with an underscore: `_<eventName>`. For more on handling event data, see [Timed or Triggered Event Callbacks](../architecture/#timed-or-triggered-event-callbacks).

Arguments
* eventName (string) - The name for the event. Note that the name you give to this event determines the name automatically assigned to your related callback function. That is, the system sets the name of the callback function to be the same as this event name, prefixed with an underscore (`_<eventName>`). For example, for an event name of `MyUserEvent`, your callback function must use the name `_MyUserEvent`. 
* keepAlive (bool) - Optional. By default (`false`) the event is triggered only once. If you pass `true`, you can trigger the event repeatedly. To remove this event, call the `UnregisterEvent` function in your code.
* callbackRule (string) - Optional. By default (`Synchronous`) the system runs the triggered callback concurrrently with any other running threads. Other values are `Override` and `Abort`. `Override` tells the system to run the new callback thread but to stop running commands on any other threads, including the thread the callback was called within. The system only runs the thread the callback was triggered in, once the callback comes back. `Abort` tells the system to ignore the new callback thread if the skill is still doing work on any other threads (including the original thread the callback was called within). 
* skillToCall (string) - Optional. The unique ID of a skill to call when the event is triggered. Use this value if the callback function is not defined in the same skill as the user event is registered in.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.RegisterUserEvent(string eventName, [bool keepAlive], [string callbackRule], [string skillToCall], [int prePause], [int postPause])
```

Returns

* Data sent by the user event. Event data must be passed into a callback function to be processed and made available for use in your skill. For more information, see [Timed or Triggered Event Callbacks](../architecture/#timed-or-triggered-event-callbacks).

### misty.UnregisterAllEvents - ALPHA
Unregisters from all events for the skill in which this command is called.

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.UnregisterAllEvents([int prePause], [int postPause])
```

<!-- misty.UnregisterEvent -->
### misty.UnregisterEvent - ALPHA
Unregisters from a specified event.

Arguments
* eventName (string) - The name of the event to unregister from.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.UnregisterEvent(string eventName, [int prePause], [int postPause]);
```

## Debugging

<!-- misty.GetLogFile -->
### misty.GetLogFile

Obtains the robot's most recent log files. Note that log file data is stored for a maximum of 7 days.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called. 
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetLogFile([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* Result (list) - Compiled log file data. Or, an error if the date is invalid or no log data is found. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- misty.SetLogLevel -->
### misty.SetLogLevel - ALPHA
Sets the log level of the robot. The log level specifies where to write different types of messages sent by the system.

* `Debug`: `Debug` and `Info` messages are logged locally, on Misty's remote servers, and are pushed to WebSocket event listeners. `Warn` and `Error` messages are logged on Misty's remote servers and are pushed to WebSocket event listeners.
* `Info`: `Info` messages are logged locally and on Misty's remote servers. `Debug` messages are logged locally, on Misty's remote servers, and are pushed to WebSocket event listeners. `Warn` and `Error` messages are logged only on Misty's remote servers.
* `Warn`: `Warn` messages are logged locally and pushed to WebSocket listeners. `Debug` messages are logged locally, on Misty's remote servers, and pushed to WebSocket event listeners. `Warn` and `Error` messages are logged only on Misty's remote servers.
* `Error`: `Error` messages are logged locally and on Misty's remote servers. All other message types are logged locally, on Misty's remote servers, and are pushed to WebSocket event listeners.

Arguments
* level (string) - The level to set the log to. Accepts `Debug`, `Info`, `Warn`, or `Error`. 
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SetLogLevel(string level, [int prePause], [int postPause]);
```

<!-- misty.GetLogLevel -->
### misty.GetLogLevel - ALPHA
Obtains the current log level of the robot.

**Note:** With local skills, data returned by this and other "Get" type commands must be passed into a callback function to be processed and made available for use in your skill. By default, callback functions for "Get" type commands are given the same name as the correlated command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by "Get" type commands, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).

Arguments
* callbackMethod (string) - Optional. The name of the callback function to call when the data returned by this command is ready. If empty, the default callback function (`<_CommandName>`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks). 
* skillToCallUniqueId (string) - Optional. The unique id of a skill to trigger for the callback, instead of calling back into the same skill.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.GetLogLevel([string callbackMethod], [string callbackRule = "synchronous"], [string skillToCallUniqueId], [int prePause], [int postPause]);
```

Returns

* level (string) - The current log level of the robot. In a local skill, data returned by this command must be passed into a callback function to be processed and made available for use in your skill. See ["Get" Data Callbacks](../architecture/#-get-data-callbacks) for more information.

<!-- misty.Debug -->
### misty.Debug - ALPHA
Prints a message to the JavaScript console for the Skill Runner web page in your browser.

When you use Skill Runner to run a skill, the `SkillData` WebSocket connection is established at the time you connect to your robot. This enables printing debug messages to the JavaScript console. You can use `misty.Debug()` to send your own messages to the console. **Note:** If `BroadcastMode` is set to `off` in the meta file for a skill, no debug messages are sent.

```JavaScript
// Syntax
misty.Debug(string debugInfo, [int prePause], [int postPause]);
```

Arguments
* debugInfo (string) - The debug message to log to the console.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
// Example
misty.Debug("Hello, world!")
```

<!-- misty.Publish -->
### misty.Publish - ALPHA
Writes data to the robot's internal log.

Note that `misty.Publish()` writes data to the robot's internal log file, even when called in a skill with the value of `WriteToLog` set to `False` in its meta file. You can use the API Explorer to download your robot's log files, or send a GET request to the REST endpoint for the [`GetLogFile`](../../using-remote-commands/rest/#getlogfile) command. 

Arguments
* name (string) - A name for the data data to write to the robot's log.
* value (string, integer, double, or boolean) - The data to write to the robot's log. To write an object, you must serialize your data into a string using `JSON.stringify()`.

```JavaScript
misty.Publish(string name, string value)  
```

## Persistent Data

<!-- misty.Get -->
### misty.Get - ALPHA
Returns data saved to the robot using `misty.Set()`. 

Arguments
* key (string) - The key name of the data to return.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Get(string key, [int prePause], [int postPause]);
```

Returns
* value (string, boolean, integer, or double) - The data associated with the specified key.


<!-- misty.Keys --> 
### misty.Keys - ALPHA
Returns a list of all the available persistent data stored on the robot. 

Arguments
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Keys([int prePause], [int postPause]);
```

Returns
* keys (list) - A list of the keys and values for all available persistent data stored on the robot.


<!-- misty.Remove --> 
### misty.Remove - ALPHA
Removes specified data that has been saved to the robot with `misty.Set()`. 

Arguments
* key (string) - The key name of the data to remove.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.Remove(string key, [int prePause], [int postPause])
```

<!-- misty.Set --> 
### misty.Set - ALPHA
Saves data that can be validly updated and used across threads or shared between skills. 

**Important!** Data stored via the `misty.Set()` command **does not persist across a reboot** of the robot at this time.

Currently, any data saved to the robot this way is not automatically deleted and by default may be used across multiple skills. Data saved using `misty.Set()` must be one of these types: `string`, `bool`, `int`, or `double`. Alternately, you can serialize your data into a string using `JSON.stringify()` and parse it out again using `JSON.parse()`.

Arguments
* key (string) - The key name for the data to save.
* value (value ) - The data to save. Data saved using `misty.Set()` must be one of these types: `string`, `bool`, `int`, or `double`
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript 
misty.Set(string key, string value, [int prePause], [int postPause]);
```

## External Server Communication

<!-- misty.SendExternalRequest --> 

### misty.SendExternalRequest - ALPHA
Sends an HTTP request from Misty to an external server. You use `misty.SendExternalRequest()` to access resources that are available via Uniform Resource Identifiers (URIs), such as cloud-based APIs or data stored on a server in another location.

**Note:** In most cases, the external server's response to requests sent from the robot must be passed into a callback function to be processed and made available for use in your skills. By default, the callback function for this command is given the same name as the command, prefixed with an underscore: `_<COMMAND>`. For more on handling data returned by `misty.SendExternalRequest()`, see the [External Requests](../tutorials/#external-requests) tutorial.

Arguments
* method (string) - The [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (e.g. `GET`, `POST`, etc.) indicating the action to perform for the resource.
* resourceURL (string) - The full Uniform Resource Identifier of the resource, i.e. `"http://soundbible.com/grab.php?id=1949&type=mp3"`.
* authorization (string) - The authentication type required to access the resource, i.e. `"OAuth 1.0"`, `"OAuth 2.0"`, or `"Bearer Token"`. Use `null` if no authentication is required.
* token (string) - The authentication credentials required to access the resource. Use `null` if no credentials are required.
* arguments (string) - The arguments to send with the request, passed as a string written in JSON format with key-value pairs for each parameter option. If the request does not require additional arguments, pass `null` or an empty JSON string (`"{}"`).
* returnType (string) - The [Multipurpose Internet Mail Extension (MIME)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type indicating the nature and format of the expected response, i.e. `text/plain`.
* saveAssetToRobot (bool) - If `true`, the robot saves any media asset contained in the request response to the robot's local storage. If you do not want to save any returned assets, pass `false`. At this time, the `misty.SendExternalRequest()` command can save only image and audio files to Misty. 
* applyAssetAfterSaving (bool) - A value of `true` or `false` indicating whether to immediately use a media asset once it has been saved to Misty's local storage. Use `true` to immediately play an audio asset or display an image asset on Misty's screen. Note that to successfully apply a media asset, you must also pass `true` for the `saveAssetToRobot` parameter.
* fileNameWithExtension (string) - The name to give the saved file, including the appropriate file type extension.
* callbackMethod (string) - Optional. The name of the callback function to call when the returned data is received. If empty, a callback function with the default name (`_SendExternalRequest()`) is called.
* callbackRule (string) - Optional. The callback rule for this command. Available callback rules are `"synchronous"`, `"override"`, and `"abort"`. Defaults to `"synchronous"`. For a description of callback rules, see ["Get" Data Callbacks](../architecture/#-get-data-callbacks).
* skillToCallUniqueId (string) - Optional. The unique id of the skill to trigger for the callback function, if the callback is not defined in the current skill. 
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.SendExternalRequest(string method, string resourceURL, string authorizationType, string token, string returnType, string jsonArgs, bool saveAssetToRobot, bool applyAssetAfterSaving, string fileNameWithExtension, [string callbackMethod], [string callbackRule], [string skillToCallOnCallback], [int prePause], [int postPause]);
Returns
```

Returns

* Data (object) - An object containing the external server's response to the request. In most cases, data returned by the `misty.SendExternalRequest()` command must be passed into a callback function to be processed and made available for use in your skills. See the [External Requests](../tutorials/external-requests) tutorial for more information.

## Backpack Communication

### misty.WriteBackpackUart - ALPHA

**Available for Misty II Only**

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

Note that Misty can also receive data a connected device sends to the UART serial port. To use this data you must subscribe to [`StringMessage`](../../using-remote-commands/websocket-reference/#stringmessage) events.

```JavaScript
misty.WriteBackpackUart(string message, [int prePause], [int postPause])
```

Arguments
* message (string) - The data Misty sends to the UART serial port, passed as a string value.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.WriteBackpackUart("your-data");
```

