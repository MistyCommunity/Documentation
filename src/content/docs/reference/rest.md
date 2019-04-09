---
title: REST API
layout: coding.hbs
columns: three
order: 2
---

# {{title}}

With the REST API, you can send commands to Misty from a REST client or browser. There is also a community owned [Python wrapper](https://github.com/MistyCommunity/Wrapper-Python) available for the Misty REST API.

To create skills for Misty, you'll need to send commands to Misty and get data back from Misty. To send commands to Misty, you can call the REST API. To get live updating data back from Misty, you'll need to use a [WebSocket connection](../../skills/remote-command-architecture#subscribing-amp-unsubscribing-to-a-websocket). You can visit the [Misty Community Tutorials](https://github.com/MistyCommunity/Tutorials) repository for example skills.

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

## Images & Display

Misty comes with a set of default "eyes" that display onscreen. But we encourage you to get creative and upload your own Misty "eyes" or other images. Misty's chest LED is also configurable.


### DisplayImage

Displays an image on Misty's screen. Optionally, `DisplayImage` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. Use `SaveImage` to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

Endpoint: POST &lt;robot-ip-address&gt;/api/images/display

Parameters
- FileName (string) - Name of the previously uploaded file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
- TimeOutSeconds (double) - Optional. The length of time to display the specified image.
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

### SaveImage (Byte Array String)
Saves an image to Misty in the form of a byte array string. Optionally, proportionately reduces the size of the saved image.

Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3 MB.

**Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

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

**Note:** Images can be reduced in size but not enlarged. Because Misty does not adjust the proportions of images, for best results use an image with proportions similar to her screen (480 x 272 pixels).

**Note:** Make sure to set the content-type in the header of the POST call to `multipart/form-data`. Uploading files to Misty this way does not work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest).

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


### DeleteImage
Enables you to remove an image file from Misty that you have previously uploaded.

**Note:** You can only delete image files that you have previously uploaded to Misty. You cannot remove Misty's default system image files.

Endpoint: POST &lt;robot-ip-address&gt;/api/images/delete

Parameters
* FileName (string) - The name of the file to delete, including its file type extension.

```json
    {
      "FileName": "ExampleImage.png"
    }
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Beta - Images & Display -->

### ClearDisplayText - BETA
Force-clears an error message from Misty’s display. **Note:** This command is provided as a convenience. You should not typically need to call `ClearDisplayText`.

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/text/clear

Parameters
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### GetRecordedVideo - BETA

Downloads Misty's most recent video recording to your browser or REST client.

**Note:** Misty records videos in MP4 format at a resolution of 1080x1920 pixels. A single video may be larger than 10 megabytes and can take several seconds to download.

Endpoint: GET &lt;robot-ip-address&gt;/api/video

Parameters

* None

Return Values

* An MP4 video file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

### StartRecordingVideo - BETA
Starts recording video with Misty's 4K Camera. Misty records videos in MP4 format at a resolution of 1080 x 1920 pixels.

Use the `StopRecordingVideo` command to stop recording a video. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call `StopRecordingVideo`.

Misty only saves the most recent video recording to her local storage. Recordings are saved with the filename `MistyVideo.mp4`, and this file is overwritten with each new recording.

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/video/startrecord

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

### StopRecordingVideo - BETA

Stops recording video with Misty's 4K camera.

Use this command after calling `StartRecordingVideo`. Video recordings cannot be longer than 10 seconds. Misty stops recording automatically if a video reaches 10 seconds before you call this command.

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/video/stoprecord

Parameters

* None

Return Values

* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Images & Display - ALPHA -->

### GetImage - ALPHA
Obtains a system or user-uploaded image file currently stored on Misty

Endpoint: GET &lt;robot-ip-address&gt;/api/images?FileName=&lt;name-of-image-file.extension&gt;

Example:

`http://&lt;robot-ip-address&gt;/api/images?FileName=happy.png&Base64=false`

Parameters  
**Note:** Because GET requests do not contain payloads, the parameter for this request must be included in the URL as seen above.
- FileName (string) - The name of the image file to get, including the file type extension.
- Base64 (boolean) - Optional. Sending a request with `true` returns the image data as a downloadable Base64 string. Sending a request with `false` displays the image in your browser or REST client immediately after the image is taken. Default is `true`.

```json
{
  "FileName": "Content.jpg",
  "Base64": false
}
```

Return Values
- Result (object) - An object containing image data and meta information. This object is only sent if you pass `true` for Base64.
  - base64 (string) - A string containing the Base64-encoded image data.
  - format (string) - The type and format of the image returned.
  - height (integer) - The height of the image in pixels.
  - name (string) - The name of the image.
  - width (integer) - The width of the image in pixels.

```json
{
  "base64": "data:image/jpeg;base64,/9j/4AAQ...",
  "format": "image/jpeg",
  "height": 270.0,
  "name": "ExampleFile.jpg",
  "width": 450.0,
}
```

### TakePicture - ALPHA

Takes a photo with Misty’s 4K camera. Optionally, saves the photo to Misty and proportionately reduces the size of the photo.

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


### TakeFisheyePicture - ALPHA
Takes a photo using Misty’s Occipital Structure Core depth sensor.

**Important!** Make sure to use `StartSlamStreaming` to open the data stream from Misty's depth sensor before using this command, and use `StopSlamStreaming` to close the data stream after using this command.

Endpoint: GET &lt;robot-ip-address&gt;/api/cameras/fisheye?Base64=&lt;bool&gt;

Parameters  
**Note:** Because GET requests do not contain payloads, the parameter for this request must be included in the URL as seen above.
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

### TakeDepthPicture - ALPHA
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

### StartSlamStreaming - ALPHA
Opens the data stream from the Occipital Structure Core depth sensor, so you can obtain image and depth data when Misty is not actively tracking or mapping.

**Important!** Always use `StopSlamStreaming` to close the depth sensor data stream after sending commands that use Misty's Occipital Structure Core depth sensor. Using `StopSlamStreaming` turns off the laser in the depth sensor and lowers Misty's power consumption. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/streaming/start

Parameters 
- None

Return Values
- Result (boolean) - Returns `true` if there are no errors related to this command.

### StopSlamStreaming - ALPHA
Closes the data stream from the Occipital Structure Core depth sensor. This command turns off the laser in the depth sensor and lowers Misty's power consumption.

**Important!** Always use this command to close the depth sensor data stream after using `StartSlamStreaming` and any commands that use Misty's Occipital Structure Core depth sensor. Note that Misty's 4K camera may not work while the depth sensor data stream is open.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/streaming/stop

Parameters
- None

Return Values
- Results (boolean) - Returns `true` if there are no errors related to this command.

## Audio

Want Misty to say something different or play a special tune when she recognizes someone? You can save your own audio files to Misty and control what she plays.

### GetAudioList
Lists all audio files (default system files and user-uploaded files) currently stored on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/audio/list

Parameters
- None

Return Values
* Result (array) - Returns an array of audio file information. Each item in the array contains the following:
   * Name (string) - The name of the audio file.
   * userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

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

**Note:** Make sure to set the `content-type` in the header of the POST call to [`multipart/form-data`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#multipartform-data). Uploading files to Misty this way does _not_ work with JQuery’s AJAX, but does work with XHR (XMLHttpRequest).

Parameters
- File (object) - The audio file to save to Misty. This command accepts all audio format types, however Misty currently cannot play OGG files.
- FileName (string) - Optional. The name the file will have on Misty. Must include the file type extension. If unspecified, the audio file will be saved with the same name as the source file.
- ImmediatelyApply (boolean) - Optional. A value of `true` tells Misty to immediately play the uploaded audio file, while a value of `false` tells Misty not to play the file.
- OverwriteExisting (boolean) - Optional. A value of `true` indicates the uploaded file should overwrite a file with the same name, if one currently exists on Misty. A value of `false` indicates the uploaded file should not overwrite any existing files on Misty.

Return Values
- Result (array) - An array of information about the audio file, with the following fields:
  - name (string) - The name of the file that was saved.
  - userAddedAsset (boolean) - If `true`, the file was added by the user. If `false`, the file is one of Misty's system files.

<!-- Beta - Audio -->

### StartRecordingAudio - BETA
Directs Misty to initiate an audio recording and save it with the specified file name. Misty records audio with a far-field microphone array and saves it as a byte array string. To stop recording, you must call the `StopRecordingAudio` command. If you do not call `StopRecordingAudio`, Misty automatically stops recording after 60 seconds.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/start

Parameters
* FileName (string) - The name to assign to the audio recording. This parameter must include a `.wav` file type extension at the end of the string.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopRecordingAudio - BETA
Directs Misty to stop the current audio recording. You must use this command after calling the `StartRecordingAudio` command. If you do not call `StopRecordingAudio`, Misty automatically stops recording after 60 seconds.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/record/stop

Parameters
* None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### DeleteAudio - BETA
Enables you to remove an audio file from Misty that you have previously uploaded.

**Note:** You can only delete audio files that you have previously uploaded to Misty. You cannot remove Misty's default system audio files.

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/audio/delete

Parameters
* FileName (string) - The name of the file to delete, including its file type extension.

```json
    {
      "FileName": "ExampleSong.wav"
    }
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Alpha - Audio -->

### GetAudioFile - ALPHA
Obtains a system or user-uploaded audio file currently stored on Misty.

Endpoint: GET &lt;robot-ip-address&gt;/api/audio?FileName={name-of-audio-file.extension}

Parameters  
**Note:** Because GET requests do not include payloads, the parameter for this request must be included in the URL as seen above.
- FileName (string): The name of the audio file to get, including its file type extension.

```markup
http://<robot-ip-address>/api/audio?FileName=ExampleAudio.mp3
```

Return Values
- An audio file that plays in your browser or REST client. You can save the file by manually downloading it either from your browser or from a REST client such as Postman.

### SetDefaultVolume - ALPHA
Sets the default loudness of Misty's speakers for audio playback.

Endpoint: POST &lt;robot-ip-address&gt;/api/audio/volume

Parameters
- Volume (integer): A value between 0 and 100 for the loudness of the system audio. 0 is silent, and 100 is full volume. By default, the system volume is set to 100.

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Locomotion

The following commands allow you to programmatically drive and stop Misty. If you want to directly drive Misty, you can use her [companion app](../../../docs/apps/companion-app).

To programmatically obtain live data streams back from Misty that include movement, position, and proximity data, you can [subscribe](../../skills/remote-command-architecture#subscribing-amp-unsubscribing-to-a-websocket) to her LocomotionCommand, HaltCommand, TimeOfFlight, and SelfState [WebSockets](../../reference/sensor-data). To directly observe this data, you can use the [API Explorer](../../../docs/apps/api-explorer/#opening-a-websocket).

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
- TimeMs (integer) - A value in milliseconds that specifies the duration of movement. Value range: 0 to 1000 ms, able to increment by 500 ms.
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


### LocomotionTrack
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


### Stop
Stops Misty's movement.

Endpoint: POST &lt;robot-ip-address&gt;/api/drive/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

<!-- Alpha - Locomotion -->

### Halt - ALPHA

Stops all motor controllers, including drive motor, head/neck, and arm (for Misty II).

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/robot/halt

Parameters
* None

Return Values
* None

## Information

### GetAvailableWifiNetworks
Obtains a list of local WiFi networks and basic information regarding each.

Endpoint: GET &lt;robot-ip-address&gt;/api/networks

Parameters
- None

Return Values
* Result (array) - An array containing one element for each WiFi network discovered. Each element contains the following:
   * Name (string) - The name of the WiFi network.
   * SignalStrength (integer) - A numeric value for the strength of the network.
   * IsSecure (boolean) - Returns a value of `true` if the network is secure. Otherwise, `false`.


### GetBatteryLevel
Obtains Misty's current battery level.

Endpoint: GET &lt;robot-ip-address&gt;/api/battery

Parameters
- None

Return Values
* Result (double) - A value between 0 and 100 corresponding to the current battery level.


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
- None

Return Values
* Result (string) - A string containing the requested help information.


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

<!-- Beta - Information -->

## LEDs

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

## Configuration

###  SetNetworkConnection
Connects Misty to a specified WiFi source.

Endpoint: POST &lt;robot-ip-address&gt;/api/wifi

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

<!-- Alpha - Configuration -->

### GetStoreUpdateAvailable - ALPHA

Checks whether a system update is available. 

Endpoint: &lt;robot-ip-address&gt;/api/system/updates

Parameters
* None

Return Values
* Result (boolean) - Returns a value of `true` if an update is available. Otherwise, `false`.

### PerformSystemUpdate - ALPHA

Downloads and installs a system update if one is available.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/system/update

Parameters
* None

Return Values
* Result (boolean) - Returns a value of `true` if an update is available. Otherwise, `false`.

### PerformTargetedUpdate - ALPHA

Attempts to install updates for specified components of your robot. 

**Note:** Only use this command when a system update fails to update every component of your robot. Always attempt a full system update before using this command. The version numbers for individual components are returned by the `GetDeviceInformation` command. You can make sure individual components are up-to-date by comparing these version numbers to the most recent release notes on the [Misty Community](https://community.mistyrobotics.com/) site.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/system/update/target

Parameters
- Components (array) - A list of strings indicating the specific components to update. Use `"MC"` to update the motor controller firmware, `"RT"` to update the real-time controller firmware, and `"SensoryServices"` to update the Sensory Services application. Updates to the Sensory Services application include firmware updates for the Occipital Structure Core depth sensor.

```json
{
    "Components": [ "MC", "RT", "SensoryServices" ]
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Faces

You can have Misty detect any face she sees or train her to recognize people that you choose. Note that, like most of us, Misty sees faces best in a well-lit area.

The following commands allow you to programmatically use Misty's face detection and recognition abilities. If you want to directly experiment with these, you can use the [API Explorer](../../../docs/apps/api-explorer/#face-training-amp-recognition-beta).

To programmatically obtain live data streams back from Misty that include face detection and recognition data, you can [subscribe](../../skills/remote-command-architecture/#getting-data-from-misty) to her FaceDetection and FaceRecognition [WebSockets](../../reference/sensor-data). To directly observe this data, you can use the [API Explorer](../../../docs/apps/api-explorer/#opening-a-websocket).


### StartFaceDetection - BETA
Initiates Misty's detection of faces in her line of vision. This command assigns each detected face a random ID.

When you are done having Misty detect faces, call StopFaceDetection.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/detection/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StartFaceTraining - BETA
Trains Misty to recognize a specific face and applies a user-assigned ID to that face.

This process should take less than 15 seconds and will automatically stop when complete. To halt an in-progress face training, you can call CancelFaceTraining.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/training/start

Parameters
- FaceId (string) - A unique string of 30 characters or less that provides a name for the face. Only alpha-numeric, -, and _ are valid characters.

```json
{
  "FaceId": "Joe_Smith"
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StartFaceRecognition - BETA
Directs Misty to recognize a face she sees, if it is among those she already knows. To use this command, you previously must have used either the `StartFaceDetection` command or the `StartFaceTraining` command to detect and store one or more face IDs in Misty's memory.

When you are done having Misty recognize faces, call StopFaceRecognition.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/recognition/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopFaceDetection - BETA
Stops Misty's detection of faces in her line of vision.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/detection/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### CancelFaceTraining - BETA
Halts face training that is currently in progress. A face training session stops automatically, so you do not need to use the CancelFaceTraining command unless you want to abort a training that is in progress.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/training/cancel

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopFaceRecognition - BETA
Stops the process of Misty recognizing a face she sees.

Endpoint: POST &lt;robot-ip-address&gt;/api/faces/recognition/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### GetKnownFaces - BETA
Obtains a list of the names of faces on which Misty has been successfully trained.

Endpoint: GET &lt;robot-ip-address&gt;/api/faces

Parameters
- None

Return Values
* Result (array) - A list of the user-supplied names for faces that Misty has been trained to recognize.


### ForgetAllFaces - BETA
Removes records of previously trained faces from Misty's memory.

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/faces/clearall

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


## Head Movement

Misty's ability to accurately position her head is currently under development.

### MoveHead - BETA
Moves Misty's head in one of three axes (tilt, turn, or up-down). **Note:** For Misty I, the MoveHead command can only control the up-down movement of Misty's head.

Endpoint: POST &lt;robot-ip-address&gt;/api/head

Parameters
- Pitch (double) - Number that determines the up or down movement of Misty's head movement. Value range: -5 to 5.
- Roll (double) - Number that determines the tilt ("ear" to "shoulder") of Misty's head. Misty's head will tilt to the left or right. Value range: -5 to 5. This value is ignored for Misty I.
- Yaw (double) - Number that determines the turning of Misty's head. Misty's head will turn left or right. Value range: -5 to 5. This value is ignored for Misty I.
- Velocity (double) - Number that represents speed at which Misty moves her head. Value range: 0 to 10.

```json
{
  "Pitch": 3,
  "Roll": 3,
  "Yaw": -2,
  "Velocity": 6
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### SetHeadPosition - BETA
Moves Misty's head to a given position along one of three axes (tilt, turn, or up-and-down).

Endpoint: POST &lt;robot-ip-address&gt;/api/beta/head/position

Parameters
- Axis (string) - The axis to change. Values are "yaw" (turn), "pitch" (up and down), or "roll" (tilt).
- Position (double) - The position to move Misty's head along the given axis. Value range: -5 to 5.
- Velocity (double) - The speed of the head movement. Value range: 0 to 10.

```json
{   
  "Axis ": "yaw",
  "position": 3,
  "Velocity": 6
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Arm Movement

### MoveArm

**Available for Misty II Only**

Moves one of Misty's arms. You can use either degrees, radians, or a positional value to control the `MoveArm` command.

Endpoint: POST &lt;robot-ip-address&gt;/api/arms

Parameters
* Arm (string) - The arm to move. You must use either `left` or `right`.
* Position (double) - Optional. You must pass a value for either the `Position`, `Degrees`, or `Radians` parameter. A value from 0 to 10 specifying the direction the arm should point. A value of 0 points the arm straight down, a value of 5 points the arm forward, and 10 points the arm straight up. 
* Degrees (double) - Optional. You must pass a value for either the `Position`, `Degrees`, or `Radians` parameter. A value from 0 to -180 specifying the direction the arm should point. 0 points the arm straight down, -90 points the arm forward, and -180 points the arm straight up.
* Radians (double) - Optional. You must pass a value for either the `Position`, `Degrees`, or `Radians` parameter. A value from 0 to -3.14 specifying the direction the arm should point. 0 points the arm straight down, -1.57 points the arm forward, and -3.14 points the arm straight up.
* Velocity (double) - Optional. A value of 0 to 100, specifying the speed with which the arm should move. If no value is specified, Misty's arm moves at its highest velocity.

```JSON
{
  "Arm": "left",
  "Position": 10,
  "Velocity": 100
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

### MoveArms

**Available for Misty II Only**

Moves one or both of Misty's arms. You can control both arms simultaneously or one at a time.

Endpoint: POST &lt;robot-ip-address&gt;/api/arms/set

Parameters
* LeftArmPosition (double) - Optional. A value from 0 to 10 specifying the direction the arm should point. 0 points the arm straight down, 5 points the arm forward, and 10 points the arm straight up.
* RightArmPosition (double) - Optional. A value from 0 to 10 specifying the direction the arm should point. 0 points the arm straight down, 5 points the arm forward, and 10 points the arm straight up.
* LeftArmVelocity (double) - Optional. A value of 0 to 100 specifying the speed with which the left arm should move. If no value is specified, Misty's arm moves at its highest velocity.
* RightArmVelocity (double) - Optional. A value of 0 to 100, specifying the speed with which the right arm should move. If no value is specified, Misty's arm moves at its highest velocity.

```JSON
{
  "LeftArmPosition": 10,
  "RightArmPosition": 10,
  "LeftArmVelocity": 50,
  "RightArmVelocity": 5,
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


## Mapping & Tracking

"SLAM" refers to simultaneous localization and mapping. This is a robot's ability to both create a map of the world and know where they are in it at the same time. Misty's SLAM capabilities and hardware are under development. For a step-by-step mapping exercise, see the instructions with the [API Explorer](../../../docs/apps/api-explorer/#mapping-amp-tracking-alpha).

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

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

### ResetSlam - ALPHA

Resets the SLAM sensors.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/reset

Parameters

- None

Return Values

- Result (boolean) - Returns `true` if there are no errors related to this command.

### StartMapping - ALPHA

Starts Misty mapping an area.

**Note:** If you are mapping with a **Misty I** or **Misty II prototype**, please be aware of the following:
* The USB cable connecting the headboard to the Occipital Structure Core depth sensor is known to fail in some Misty prototypes. This can cause intermittent or non-working mapping and localization functionality.
* Misty prototypes can only create and store one map at a time, and a map must be created in a single mapping session.
* Mapping a large room with many obstacles can consume all of the memory resources on the processor used for mapping and crash the device.
* Some Misty I and some Misty II prototypes may generate inaccurate maps due to depth sensor calibration flaws.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/map/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StartTracking - ALPHA
Starts Misty tracking her location.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/track/start

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopMapping - ALPHA
Stops Misty mapping an area.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/map/stop

Parameters
- None

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.


### StopTracking - ALPHA
Stops Misty tracking her location.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/slam/track/stop

Parameters
- None

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

### GetSlamPath - ALPHA

Obtain a path from Misty’s current location to a specified set of X,Y coordinates. Pass the waypoints this command returns to the path parameter of `FollowPath` for Misty to follow this path to the desired location.

**Note:** `GetMap` obtains the occupancy grid for the most recent map Misty has generated. Use this grid to determine the X and Y coordinates of the destination. The X coordinate of a given cell is the index of the array for the cell. The Y coordinate of a cell is the index of that cell within its array. 

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.

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


### DriveToLocation - ALPHA

Drives to a designated waypoint.

**Important!** Make sure to use `StartTracking` before using this command to have Misty start tracking her location, and use `StopTracking` to have her stop tracking her location after she arrives at the specified location.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/drive/location

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

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/drive/path

Parameters
- Path (comma-separated list of sets of integers) - A list containing 1 or more sets of integer pairs representing X and Y coordinates. You can obtain `Path` values from a map that Misty has previously generated.  **Note:** X values specify directions forward and backward. Sideways directions are specified by Y values.

```json
{
  "Path":"10:20,15:25,30:40"
}
```

Return Values
* Result (boolean) - Returns `true` if there are no errors related to this command.

## Backpack Communication

### WriteSerial - ALPHA

**Available for Misty II Only**

Sends data to Misty's universal asynchronous receiver-transmitter (UART) serial port. Use this command to send data from Misty to an external device connected to the port.

Note that Misty can also receive data a connected device sends to the UART serial port. To use this data you must subscribe to [`SerialMessage`](../../reference/sensor-data/#serialmessage) events.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/serialport

Parameters

* Message (string) - The data Misty sends to the UART serial port, passed as a string value.

```json
{
  "Message": "your-data"
}
```

Return Values

- Result (boolean) - Returns `true` if no errors related to this request.

## Skill Management Commands

### GetRunningSkills - ALPHA

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

### GetSkills - ALPHA

Obtains a list of the skills currently uploaded onto the robot.

Endpoint: GET &lt;robot-ip-address&gt;/api/skills

Parameters
* (None)

Return Values
* Result (array) - An array containing the names and meta file information for all of the skills on the robot.

<!-- CancelSkill -->
### CancelSkill - ALPHA
Stops a specified running skill (or all running skills if no name is specified).

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skills/cancel

Parameters
* Skill (string) - As specified with the Name value in the skill’s meta file, the name of the skill to run. Use an empty payload to cancel all running skills.

```json
{
	"Skill": "SkillName"
}

```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.


<!-- LoadSkill -->
### LoadSkill - ALPHA
Makes a previously uploaded skill available for the robot to run and updates the skill for any changes that have been made.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skills/load

Parameters
* Skill (string) - The name of the skill to load.

```json
{
  "Skill": "SkillName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

<!-- ReloadSkills --> 
### ReloadSkills - ALPHA
Makes all previously uploaded skills available for the robot to run and updates any skills that have been edited. **Note:** The `ReloadSkills` command runs immediately, but there may be a significant delay after the call completes before all skills are fully loaded onto the robot if there are many to load.

Endpoint: POST &lt;robot-ip-address&gt;/api/sdk/reload

Parameters
* (None)

Return Values
* Result (boolean) - Returns `true` if no errors related to this request. 

<!-- RunSkill -->
### RunSkill - ALPHA
Immediately runs a previously uploaded skill.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skill

Parameters`
* Skill (string) - As specified with the `Name` value in the skill’s meta file, the name of the skill to run. You can also pass the `UniqueID` for a skill.
* Method (string) - Optional. A specific method within a skill to run, which can be useful for testing. If no value is specified for the Method parameter, `RunSkill` by default starts running the skill from the beginning.

```json
{
  "Skill": "SkillName",
  "Method": "methodName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.


### SaveSkillToRobot - ALPHA
Uploads a skill to the robot and makes it immediately available for the robot to run.

**Note:** To send a file with this request, make sure to set the `content-type` in the header of the `POST` call to `multipart/form-data`.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skill/deploy

Parameters
* File (file) - A zipped file containing the two skill files. Both these files (one JSON meta file and one JavaScript code file) should have the same name. For more details, see the [File Structure & Code Architecture](../../skills/local-skill-architecture/#file-structure-amp-code-architecture) section.
* ImmediatelyApply (boolean) - Specifies whether Misty immediately runs the uploaded skill.
* OverwriteExisting (boolean) - Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty .

```json
{
  "File" : "SkillName.zip",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - A list of key-value pairs with the names of the code and meta skill files saved to the robot.

<!-- TriggerSkillEvent -->
### TriggerSkillEvent - ALPHA
Triggers an event within a skill. The skill must be running already for Misty to trigger the event within the skill.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skills/event

Parameters
* UniqueId (string) - As specified in the skill’s JSON meta file, the 128-bit GUID for the skill that holds the event to trigger.
* EventName (string) - The name of the event to trigger. 
* Payload (JSON string) -  Any arguments needed for the event.

```json
 {
  "UniqueId" : "b307c917-beb8-47e8-9bbf-1c57e8cd4d4b",
  "EventName": "UserEvent",
  "Payload": { "test": "two" }
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

<!-- UnloadSkill -->
### UnloadSkill - ALPHA
Makes a skill unavailable to be run which is currently onboard the robot, but does not remove the skill from the robot’s memory.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skills/unload

Parameters
* Skill (string) - The name of the skill to unload.

```json
{
  "Skill": "SkillName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

### UnloadAllSkills - ALPHA
Makes all skills onboard the robot unavailable to be run, but does not remove the skills from the robot’s memory.

Endpoint: POST &lt;robot-ip-address&gt;/api/alpha/sdk/skills/unloadall

Parameters
* (None)

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.