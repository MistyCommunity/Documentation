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


## Audio

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