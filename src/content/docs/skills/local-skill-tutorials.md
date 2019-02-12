---
title: On-Robot Skill Tutorials
layout: coding.hbs
columns: three
order: 4
---

# {{title}}

In these tutorials you will learn everything you need to know to begin writing skills using Misty's on-robot JavaScript API. Each tutorial introduces a new aspect of skill development to expose the full breadth of Misty's capabilities and potential.

## Time-of-Flight

In this tutorial we create a simple skill that changes Misty’s chest LED, drives her forward for 10 seconds, and tells her to stop if she detects an object in her path. We go over how to send commands, subscribe to sensor events, and structure your skill data. Let’s get started!

When you write a skill using Misty's on-robot JavaScript API, the following elements are required:

* a `.js` "code" file with the logic used to define how the skill functions
* a `.json` "meta" file with rules that describe how Misty should execute the code in the corresponding "code" file.

The JavaScript "code" and JSON "meta" files for a skill **must** be given the same name.

To begin, create a `.js` file and call it `HelloWorld_TimeOfFlight.js`. Then create a `.json` file and give it the same name. When the skill is complete, we use [Skill Runner](../../skills/tools/#misty-skill-runner) to upload these files to the directories specified above.

### Writing the Meta File

The `.json` file includes fields that set certain specifications for your skill. You need to create a GUID to uniquely identify your skill, which can be generated [here](https://www.guidgenerator.com/online-guid-generator.aspx). Use this to set the value of `UniqueId`. In the `Name` field, enter the name used for the `.js` file and the `.json` file (`HelloWorld_TimeOfFlight`) to ensure they are referenced correctly. Many of the parameters below have default values that are automatically set. For now, use the values shown in the example for the remaining fields. Save this file with the name `HelloWorld_TimeOfFlight.json`.

```json
{
    "Name": "HelloWorld_TimeOfFlight",
    "UniqueId": "e46c1b29-9d46-4f38-945f-673fa4b7c2bd",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false
}
```

### Writing the Code File 

To issue any command to Misty in the local environment, we call methods on the `misty` object. Start by writing a debug message so we’re notified when the skill is started. To do this, call `misty.Debug()` and pass in a meaningful message. These messages will show up in your browser’s JavaScript console if you’re using the [Skill Runner](../../skills/tools/#misty-skill-runner) tool to run the skill.

```JavaScript
misty.Debug("starting skill helloworld_timeofflight");
```

Now let’s use the very simple `misty.ChangeLED()` function to control the color of your robot’s chest LED. The method takes three arguments, which correspond to the RGB parameters required to specify the LED color as described [here](https://docs.mistyrobotics.com/docs/reference/rest/#changeled). The code below will turn the LED green (for go!)

```JavaScript
misty.ChangeLED(0, 255, 0);
```

Then, we issue one of Misty’s drive commands, `DriveTime()`. The `DriveTime()` command accepts three parameters: `linearVelocity`, `angularVelocity`, and `time`. You can learn more about how these parameters will affect Misty’s movement in the documentation. In this case, we want Misty to drive forward slowly in a straight line for 10 seconds, so we set `linearVelocity` = 10, `angularVelocity` = 0, and `time` = 10000 (the unit of measure for this parameter is milliseconds). 

```JavaScript
misty.DriveTime(50, 0, 10000);
```

We’ve instructed Misty to drive forward for 10 seconds and come to a stop. But there’s a major flaw in this code. What if there is an object in Misty’s way? We want her to come to a stop, rather than plowing through it. In order to handle this type of event, we need to look at data coming back from Misty’s sensors. To do this we will subscribe to events from one of Misty’s many websocket streams available to us: namely `TimeOfFlight`. 

Once we have subscribed to `TimeOfFlight`, we’ll receive event data back from Misty telling us how far objects are away from her. See the template for registering for an event here:

```JavaScript
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = “synchronous”], [string skillToCall = null]);
```

We call `RegisterEvent()` and pass in the name we want to designate for the event (`"FrontTOF"`), and the name of the websocket stream we are subscribing to (`"TimeOFFlight"`). By default, when a callback triggers for an event, the event is automatically unregistered. Make sure your register event method matches the code snippet below. 

```JavaScript
misty.RegisterEvent("FrontTOF", "TimeOfFlight");
```

Before we register to the event in our code, we can add property comparison tests to filter the data we receive. In this example, the first property test checks that we are only looking at data from the time-of-flight sensor we’re concerned with. The field we’re testing is `SensorPosition` and we’re checking that the data received is only coming from the time-of-flight sensor in the front center of Misty’s base, pointing in her direction of travel. Therefore, we only let through messages where `SensorPosition == Center`.

```JavaScript
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
```

The second property test ensures we are only looking at data where the distance to the object detected is less than 0.2m. We don’t want our skill to react to things further away than about 6 inches.

```JavaScript
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
```

Whenever we subscribe to an event, we receive the data back within a callback function. This function is triggered whenever messages are sent that pass the property tests. The callback is automatically given the name `_<event>`. So in this case, the callback name is automatically set to `_FrontTOF()`. The data is passed directly into the callback and can accessed through an argument passed into `_FrontTOF()`, which we’ll call `data`.

```JavaScript
function _FrontTOF(data) {

}
```

Once we receive the data via the callback, we can access the distance the object was detected and the sensor position it was detected at.

```JavaScript
function _FrontTOF(data) {
   let frontTOF = data.PropertyTestResults[0].PropertyParent;
   misty.Debug(“Distance: ” + frontTOF.DistanceInMeters);
   misty.Debug(“Sensor Position: ” + frontTOF.SensorPosition);
}
```

Call `Stop()` to issue a stop command to Misty, then `ChangeLED()` and pass in the values `(255, 0, 0)` to turn the LED red (for stop!) and log a message to notify us that the skill has finished.

```JavaScript
misty.Stop();
misty.ChangeLED(255, 0, 0);
misty.Debug("ending skill helloworld ");
```

Save the code file with the name `HelloWorld_TimeOfFlight.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill). 

See the full contents of the `HelloWorld_TimeOfFlight.js` file here for reference.

```JavaScript
// Print a message to indicate the skill has started
misty.Debug("starting skill helloworld_timeofflight");

// Issue commands to change LED and start driving
misty.ChangeLED(0, 255, 0); // green, GO!
misty.DriveTime(10, 0, 10000);

// Register for TimeOfFlight data and add property tests
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("FrontTOF", "TimeOfFlight");

// FrontTOF callback function
function _FrontTOF(data) {
    // Get property test results
    let frontTOF = data.PropertyTestResults[0].PropertyParent;

    // Print distance object was detected and sensor
    misty.Debug(frontTOF.DistanceInMeters);
    misty.Debug(frontTOF.SensorPosition);
    // Issue commands to change LED and stop driving
    misty.Stop();
    misty.ChangeLED(255, 0, 0); // red, STOP!
    misty.Debug("ending skill helloworld_timeofflight ");
}
```

## Play Audio

In this tutorial, we get the list of audio files stored on Misty and play one at random.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_PlayAudio`". Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_PlayAudio.json`.

```json
{
    "Name": "HelloWorld_PlayAudio",
    "UniqueId": "a3190228-c92d-40ec-8014-32dbbae84f74",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false
}
```

### Writing the Code File

We start by creating a debug message so we’re notified when the skill starts. Then we call the `GetListOfAudioClips()` method to fetch the list of audio files currently stored on the robot.

```JavaScript
misty.GetListOfAudioClips();
```

Each command’s callback is automatically set to be `_<COMMAND>`. When the data is returned, the callback runs.

```JavaScript
function _GetListOfAudioClips(data) { 

}
```

We should check if the data has been received successfully (e.g. is not empty or null) with an `if` statement. The array of audio file data will be located in the callback response under `Result`. Let’s save this to a variable: `audioArr`. Then, we use the JavaScript methods `Math.random()` and `Math.floor()` to generate a random whole number from 0 and one less than the length of the audio list:

```JavaScript
if(data) {
    let audioArr = data.Result;
    let randNum = Math.floor(Math.random() * audioArr.length);
}
```

Use the random number to pick a file at random from the list and assign the name of that file to a variable. To see the name of the file that was chosen use `misty.Debug()` and pass in the audio file name saved in the `randSound` variable:

```javaScript
let randSound = audioArr[randNum].Name;
misty.Debug(randSound);
```

Finally, we call another Misty command, `PlayAudioClip()`, and pass in the random file name to play the audio clip. 

```JavaScript
misty.PlayAudioClip(randSound);
```

Note: All of this logic needs to be contained within `_GetListOfAudioClips()` to ensure that it does not run until the audio list has been populated. 

Save the code file with the name `HelloWorld_PlayAudio.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill).

See the complete `HelloWorld_PlayAudio.js` skill file here for reference.

```JavaScript
// Print a debug message to indicate the skill has started
misty.Debug("starting skill helloworld_playaudio");

// Issue command to fetch list of audio clips
misty.GetListOfAudioClips();

// Callback to handle data returned by GetListOfAudioClips()
function _GetListOfAudioClips(data) {
    // Check if data was received
    if (data) {
        // Capture the array of files
        let audioArr = data.Result;

        // Generate a random number and use it to choose a filename at 
        // random from the list
        let randNum = Math.floor(Math.random() * audioArr.length);
        let randSound = audioArr[randNum].Name;
        // Print the name of the file
        misty.Debug(randSound);

        // Issue command to play the audio clip
        misty.PlayAudioClip(randSound);
    }
}
```

## Record Audio
In this tutorial we learn how to record audio and play it back to the user. This involves two very simple commands: `StartRecordingAudio()` and `StopRecordingAudio()`. 

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_RecordAudio`". Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_RecordAudio.json`.

```json
{
    "Name": "HelloWorld_RecordAudio",
    "UniqueId": "2697a7f3-0cc5-4180-bb03-84bae827e751",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false
}
```

### Writing the Code File

Start by calling `StartRecordingAudio()` to tell the microphone to start recording. Pass in the name you want to assign to the resulting audio clip. Use `Pause()` to establish a duration for how long you want the recording to last, then call `StopRecordingAudio()` to halt the recording process and save the clip. Call `Pause()` again for 2000ms to give Misty time to save the recording.

```JavaScript
   misty.StartRecordingAudio("RecordingExample.wav");
   misty.Pause(5000);
   misty.StopRecordingAudio();
   misty.Pause(2000);
```

Once the clip has been saved, check that the recording was saved correctly. To do this, call `GetListOfAudioFiles()`. As mentioned in previous tutorials, the callback function (automatically named `_<COMMAND>`) will run once the data is ready to be received.

```JavaScript
misty.GetListOfAudioFiles();
function _GetListOfAudioFiles(data) {

}
```

Now that we have the data, we want to check that our recording shows up in the list. Once way to do this is to create a boolean variable to indicate whether the list contains the file. Then, loop through the list and check if the name of any of the audio files match the name of your recording. If it does, change the boolean from `false` to `true`. **Note:** This logic needs to be contained within the callback, as it uses the data received from the `GetListOfAudioFiles()` command.

```JavaScript
let containsNewFile = false;
for (let i = 0; i < audioArr.length; i++) {
   if (audioArr[i].Name === "RecordingExample.wav") {
      containsNewFile = true;
   }
}
```

If the list contains the recording, we can call `PlayAudioClip()` to play the recording and end the program. Otherwise, use `Debug()` to print an error message, as something went wrong with the process.

```JavaScript
if (containsNewFile) {
   misty.PlayAudioClip("RecordingExample.wav", 500, 500);
} else {
   misty.Debug("file was not found");
}
```

Save the code file with the name `HelloWorld_RecordAudio.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill).

See the complete `HelloWorld_RecordAudio.js` file here for reference.

```JavaScript
// Print a debug message to indicate the skill has started
misty.Debug("starting skill helloworld_recordaudio");

// Send commands to start recording audio, pause for  five seconds 
// to record, then stop recording audio
misty.StartRecordingAudio("RecordingExample.wav");
misty.Pause(5000);
misty.StopRecordingAudio();

// Pause to give Misty time to save the recording
misty.Pause(2000);

// Send request to fetch list of audio files
misty.GetListOfAudioFiles();

// Define the callback for request
function _GetListOfAudioFiles(data) {
    // Get the array of audio files from the data returned 
    // by GetListOfAudioFiles()
    let audioArr = data.Result;

    // Initialize a variable to tell us if the list contains 
    // the recorded audio file
    let containsNewFile = false;
    // Loop through list and compare file names to the
    // name specified for the recording
    for (let i = 0; i < audioArr.length; i++) {
        if (audioArr[i].Name === "RecordingExample.wav") {
            // If there's a match, track it by updating
            // the value of containsNewFile to true
            containsNewFile = true;
        }
    }

    // If list contains recording, issue a command to play the recording
    if (containsNewFile) {
        misty.PlayAudioClip("RecordingExample.wav", 500, 500);
    } else {
        // If the list does not contain the recording, print an error message
        misty.Debug("file was not found");
    }
}
```

## Face Detection

In this tutorial we learn how to use Misty's face detection abilities to trigger an event. If Misty detects a face she will play a sound, change her LED to white, and end the skill. If she does not detect a face within a reasonable amount of time, the LED will turn off, and the skill will end.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_FaceDetection`". Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_FaceDetection.json`.

```json
{
    "Name": "HelloWorld_FaceDetection",
    "UniqueId": "63b2cac5-4674-43ce-a048-670303a339ec",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false
}
```

### Writing the Code File

In order to tell if Misty has detected a face, we register an event to receive data from computer vision events. Call `misty.RegisterEvent()` and pass in a name for the event (this example uses `"FaceDetection"` to keep it simple), the data stream we are subscribing to (`"ComputerVision"`), and a value specifying how frequently we want to receive data (in this case, every `250` milliseconds).

```JavaScript
misty.RegisterEvent("FaceDetection", "ComputerVision", 250);
```

Now that we have the event set up, we can send the command to start face detection. This command is different in that it initiates the process for Misty to start _looking_ for a face, while the event is only set up to trigger if a face is _detected_. Both parts are necessary to handle skills that include face detection.

```JavaScript
misty.StartFaceDetection();
```

Within the callback (automatically named `_FaceDetection()`) we should log a debug message to indicate that a face has been detected, send a command to play an audio clip, and another to change the LED. Then we can send a command to stop face detection. Once the code in this callback finishes, the skill will automatically end after 5 seconds of inactivity.

```JavaScript
function _FaceDetection() {
   misty.Debug("Face detected!”);

   misty.PlayAudioClip("005-OoAhhh.wav");
   misty.ChangeLED(255, 255, 255); // white
   misty.StopFaceDetection();
};
```

With what we have so far, the skill will run indefinitely if no face is detected. To make the skill more complete, we need to write code to handle this “no face” situation. To accomplish this, let’s register for a timer event to trigger if no face was detected after 15 seconds. We register for this event just after we register for `"FaceDetection"` in our `misty.RegisterEvent()` method.

```JavaScript
misty.RegisterTimerEvent("FaceDetectionTimeout", 15000);
```

Then within the callback (again, automatically named `_FaceDetectionTimeout()`), we log a debug message to indicate the timeout was called, turn the LED off, and send the command to stop face detection. After this command has been issued, Misty will be inactive and the skill will automatically end after 5 seconds. 

```JavaScript
function _FaceDetectionTimeout() {
   misty.Debug("face detection timeout called, it's taking too long...");

   misty.ChangeLED(0, 0, 0); // black
   misty.StopFaceDetection();
};
```

Save the code file with the name `HelloWorld_FaceDetection.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill).

See the complete `HelloWorld_FaceDetection.js` file here for reference.

```JavaScript
// Debug message to indicate the skill has started
misty.Debug("starting skill helloworld_facedetection");

// Register for face detection events and for a timer event 
// to cancel execution if no face is detected within 15 seconds
misty.RegisterEvent("FaceDetection", "ComputerVision", 250);
misty.RegisterTimerEvent("FaceDetectionTimeout", 15000);

// Issue a command to start face detection
misty.StartFaceDetection();

// FaceDetection event callback
function _FaceDetection() {
    // Debug message to indicate a face was detecteed
    misty.Debug("Face detected!");
    // Play an audio clip, change the color of Misty's chest LED, and
    // issue a command to stop face detection.
    misty.PlayAudioClip("005-OoAhhh.wav");
    misty.ChangeLED(255, 255, 255); // white
    misty.StopFaceDetection();
};


// FaceDetectionTimeout callback
function _FaceDetectionTimeout() {
    // Debug message to indicate the timer event was triggered
    misty.Debug("face detection timeout called, it's taking too long...");

    // Change the color of Misty's chest LED and issue a command
    // to stop face detection.
    misty.ChangeLED(0, 0, 0); // black
    misty.StopFaceDetection();
};
```

## Timer Events

In this tutorial we use timed events to trigger a change in Misty's LED every second. Timed events allow us to specify an amount of time to pass before an event occurs and the callback is triggered. In addition, we introduce global variables and demonstrate how they persist across new threads.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_TimerEvent"`. Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_TimerEvent.json`.

```json
{
    "Name": "HelloWorld_TimerEvent",
    "UniqueId": "8a380289-2939-4e81-94d9-86d511b7a8ce",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false
}
```

### Writing the Code File

When registering for a timed event use the `RegisterTimerEvent()` method, we pass in the name of the event we want to create, the amount of time (in ms) we want Misty to wait before triggering the callback function, and we set the `keepAlive` parameter to `true` in order to have the event trigger the callback automatically every 3 seconds until it is unregistered. After the line of code to register for the timer event, we send our first command to change Misty’s LED to white below the timer event. This will turn the LED on for the first 3 seconds our skill runs, before the first callback is fired.

```JavaScript
misty.RegisterTimerEvent("TimerEvent", 3000, true);
misty.ChangeLED(255, 255, 255); // white
```

Define a global variable to track the amount of callbacks that have been triggered. In order for the data to persist across new threads created by callbacks, prefix the name of the variable with an underscore. Initialize the value of the variable as `0`. Declare it above the `RegisterTimerEvent()` method. **Note:** Do not include a type when creating global variables.

```JavaScript
_count = 0;
```

In the callback function (automatically named `_TimerEvent()`) start by checking if the value of `_count` is less than `5` using an `if...then` statement. If so, increment `_count` by one to keep track of the amount of times we are changing the LED. Then, generate three random values between `0` and `255` and pass them in to `misty.ChangeLED()` to trigger a change in Misty’s chest LED.

```JavaScript
if (_count < 5) {
    _ count = _count + 1;

    let value1 = Math.floor(Math.random() * (256));
    let value2 = Math.floor(Math.random() * (256));
    let value3 = Math.floor(Math.random() * (256));
    misty.ChangeLED(value1, value2, value3);
} else { }
```

The `else` statement will trigger once the value of `_count` has reached `5`. At this point, we want the skill to end. Start by unregistering for the timer event by calling `misty.UnregisterEvent()` and passing in the name designated for the event. Then turn the LED off by passing in zero values for `misty.ChangeLED()` and log a debug message.

```JavaScript
else {
    misty.UnregisterEvent("TimerEvent");
    misty.ChangeLED(0, 0, 0); // off
    misty.Debug("ending skill helloworld_timerevent");
}
```

Using timed events, we have told Misty to change her chest LED to a random color in three-second intervals. We have demonstrated how we can use global variables prefixed with an underscore to have data persist across threads created in our program as callbacks are triggered.

Save the code file with the name `HelloWorld_TimerEvent.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill).

See the complete `HelloWorld_TimerEvent.js` file here for reference.

```JavaScript

// Debug message to indicate the skill has started
misty.Debug("starting skill helloworld_timerevent");

// Set a global variable to track the amount of callbacks triggered
_count = 0;

// Register for the timer event, specifying the duration of the timer
misty.RegisterTimerEvent("TimerEvent", 3000, true);

// Callback specified for Timer event
function _TimerEvent() {
    // Check if the value of _count is less than 5
    if (_count < 5) {
        // Increment the value of _count by 1
        _count = _count + 1;

        // Specify random RGB values and issue command to change LED
        let value1 = Math.floor(Math.random() * (256));
        let value2 = Math.floor(Math.random() * (256));
        let value3 = Math.floor(Math.random() * (256));
        misty.ChangeLED(value1, value2, value3);
    } else {
        // Otherwise, turn off LED, unregister for the timer event and
        // signal the end of the skill
        misty.UnregisterEvent("TimerEvent");
        misty.ChangeLED(0, 0, 0); // off
        misty.Debug("ending skill helloworld_timerevent");
    }
}
```

## External Requests

In this tutorial we learn how Misty can access external data from the internet and deliver it back to Misty. We write a skill that fetches an audio file from an external resource, saves it to Misty, and plays it immediately. To do this, we use the `SendExternalRequest()` command to send a `GET` request to download a sound from [soundbible.com](http://soundbible.com/).

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_ExternalRequest"`. Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_ExternalRequest.json`.

```JSON
{
    "Name": "HelloWorld_ExternalRequest",
    "UniqueId": "523c7187-706e-4313-a657-0fa11d8bbdd4",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false,
    "Parameters": { }
}
```

### Writing the Code File

The code file is simple, focusing on the use of `misty.SendExternalRequest()`. The `misty.SendExternalRequest()` prototype is as follows:

```JavaScript
misty.SendExternalRequest(string method, string resourceURL, string authorizationType, string token, string returnType, string jsonArgs, bool saveAssetToRobot, bool applyAssetAfterSaving, string fileName, [string callbackMethod], [string callbackRule], [string skillToCallOnCallback], [int prePause], [int postPause]);
```

In this example we send a `GET` request, so we use the string `GET` for the first (`method`) parameter.

The second parameter (`resourceURL`) should contain the full URL of the host and resource to access. In this example, the full `resourceURL` is:

```JavaScript
http://soundbible.com/grab.php?id=1949&type=mp3. 
```

For some requests additional authorization may be necessary. This is where the third (`authorization`) and fourth (`token`) parameters come into play. In this example, no authorization is required, so we can enter `null` for the third and fourth parameters.

The fifth required parameter (`returnType`) indicates the expected media type of the data returned by the request. In this example we expect to receive an .mp3 file, so we enter the string `audio/mp3`. If you expect to receive an image, you can enter the string `image/jpeg` (or another image type), or enter a text type if you expect the data to contain text. If the return type is provided by the external resource in the response to the request, you can pass `null` for this parameter.

The sixth required parameter (`jsonArgs`) holds the data to send with `POST` requests. Because this example uses a `GET` request, `jsonArgs` can be set to null. **Note:** When you have no data to send with a `POST` request, some services may require you to use a string with an empty JSON payload (`"{}"`) instead of `null`. When you pass `null` for the `jsonArgs` parameter to a service where this is the case, the service returns an error message to indicate the value of args cannot be null or empty.

The optional `saveAssetToRobot`, `applyAssetAfterSaving`, and `fileName` parameters tell Misty how to handle images and audio files returned by requests. Pass `true` for `saveAssetToRobot` to have Misty save the file to local storage. Pass `true` to `applyAssetAfterSaving` to play the audio file immediately after it is saved (or, if the returned file is an image, to display it on Misty's screen). The string you pass for `fileName` specifies a name for the saved file (this example uses `sound`).

The optional `callbackMethod`, `callbackRule`, and `skillToCallOnCallback` parameters designate a function or skill to receive the data returned by the request and indicate the callback rule Misty should follow to execute the callback. Read more about callbacks and callback rules in [Data Handling: Events & Callbacks](../../skills/local-skill-architecture/#data-handling-events-amp-callbacks). This example does not use a callback function, so you can omit these parameters, or pass `null` if you want to use the `prePause` and `postPause` parameters that follow them. Note that `prePause` and `postPause` are optional in `misty.SendExternalRequest()`.

The final form of `misty.SendExternalRequst()` in this tutorial is:

```JavaScript
misty.SendExternalRequest(
    "GET", /*method*/
    "http://soundbible.com/grab.php?id=1949&type=mp3", /*resourceURL*/
    null, /*authorizationType*/
    null, /*token*/
    "audio/mp3", /*returnType*/
    null, /*jsonArgs*/
    true, /*saveAssetToRobot*/
    true, /*applyAssetAfterSaving*/
    "sound", /*fileName*/
    null, /*callbackMethod*/
    null, /*callbackRule*/
    null, /*skillToCallOnCallback*/
    0, /*prePause*/
    0/*postPause*/
    );
```

When the response is ready, Misty receives the file, saves it to local storage, and immediately plays through her built-in speakers. The final step is to have Misty send us a debug message to indicate skill execution is complete:

```JavaScript
// Debug message to indicate the skill is complete
misty.Debug("The skill is complete!!")
```

Save the code file with the name `HelloWorld_ExternalRequest.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill). 

See the full contents of the `HelloWorld_ExternalRequest.js` file here for reference.

```JavaScript
// Debug message to indicate when skill execution begins
misty.Debug("Starting skill HelloWorld_ExternalRequest");

// Use misty.SendExternalRequest() to access an audio file hosted at soundbible.com. 
misty.SendExternalRequest(
    "GET", /*method: pass the HTTP method to send with the request*/
    "http://soundbible.com/grab.php?id=1949&type=mp3", /*resourceURL: pass the entire URL of the request*/
    null, /*authorizationType: pass null if no authorization is required*/
    null, /*token: pass a string with the authorization token*/
    "audio/mp3", /*returnType: pass the media type of the data you expect the request to return*/
    null, /*jsonArgs: pass null if no args are required*/
    true, /*saveAssetToRobot: pass true to save the returned file to the robot*/
    true, /*applyAssetAfterSaving: pass true to immediately play the returned audio file*/
    "sound", /*fileName: pass the name to give the saved file*/
    null, /*callbackMethod: pass null if no callback method is used*/
    null, /*callbackRule: pass null if no callback method is used*/
    null, /*skillToCallOnCallback: pass null if the response is not passed into a skill*/
    0, /*prePause*/
    0/*postPause*/
    );

// Debug message to indicate when skill execution completes
misty.Debug("The skill is complete!!")
```

## Trigger Skill

In this tutorial, we learn how a skill can trigger other skills. In this case, the first skill will trigger additional skills when the first skill receives certain external stimuli: face recognition and time-of-flight events. We register for two events and have them trigger two new skills.

### Writing the Meta Files

This tutorial covers a total of three skills, so there are a total of three `.js ` code files and three `.json` meta files. The three meta files used in the tutorial are shown here. Use the values in these example to fill out the parameters, and save each file with the names below:

`HelloWorld_TriggerSkill1.json`:

```JSON
{
    "Name": "HelloWorld_TriggerSkill1",
    "UniqueId": "01190e52-3d72-4a9c-ba26-ea483fbdbdea",
    "Description": "Local 'Hello, World!' tutorial series",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": true,
    "WriteToLog": false
}
```

`HelloWorld_TriggerSkill2.json`:


```JSON
{
    "Name": "HelloWorld_TriggerSkill2",
    "UniqueId": "28c7cb66-91d4-4c8f-a8af-bb667ce18099",
    "Description": "Local 'Hello, World!' tutorial series",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": true,
    "WriteToLog": false
}
```

`HelloWorld_TriggerSkill3.json`:

```JSON
{
    "Name": "HelloWorld_TriggerSkill3",
    "UniqueId": "f6cc6095-ae40-4507-a9ef-4c7638bf3ad5",
    "Description": "Local 'Hello, World!' tutorial series",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": true,
    "WriteToLog": false
}
```

### Writing the Code Files

The first skill file we’ll look at, `HelloWorld_TriggerSkill1.js`, acts as our “parent” skill. The purpose of this skill is to register for our `TimeOfFlight` and `FaceRecognition` events. As the “child” skills are triggered by these events, this skill then runs in the background. 

We start by calling the `misty.RegisterEvent()` command. In it, we register for `FaceRecognition` events with an event name of `ComputerVision`. Set    `debounceMS` to `5000`, `keepAlive` to `true`, and the callback rule to `Synchronous`. This is all typical for event registration.

The difference from normal event registration happens when we use an optional parameter (`skillToCall`) to designate which skill we want the `FaceRecognition` event to trigger. We do that by providing by the GUID of that skill. In this case the face recognition event is going to trigger the `HelloWorld_TriggerSkill2.js` skill, so we provide the GUID for _that_ skill here. In this case, it’s `28c7cb66-91d4-4c8f-a8af-bb667ce18099`.

```JavaScript
misty.RegisterEvent("FaceRecognition", "ComputerVision", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");
```

We also want to add a return property check above the registration call, to return just the property `PersonName` for use in our callback. Pass in the name of the event first, then the property we want.

```JSON
misty.AddReturnProperty("FaceRecognition", "PersonName");
```

Finally, we need to send the command to start face recognition as well. This command tells Misty to start looking for a face to recognize (in tandem with the   `ComputerVision` event subscription).

```JavaScript
 misty.StartFaceRecognition();
```

Putting the pieces together, shown below is first half of the parent skill; the commands relating to face recognition.

```JavaScript
// Add a return property check to return just the property PersonName for use in our callback. Pass in the name of the event first, then the property we want.
misty.AddReturnProperty("FaceRecognition", "PersonName");
// Register for FaceRecognition events with an event name of ComputerVision. Set debounceMS to 5000, keepAlive to true, and the callback rule to Synchronous. Pass in the GUID for HelloWorld_TriggerSkill2.
misty.RegisterEvent("FaceRecognition", "ComputerVision", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");
// Send command to start face recognition
misty.StartFaceRecognition();
```

Next, we want to register for another event, `BackTOF`. This event triggers whenever the rear time-of-flight sensor is activated and passes our property test. This in turn kicks off the third skill, `HelloWorld_TriggerSkill3.js`.

Start by calling `RegisterEvent` and registering for `TimeOfFlight` as `BackTOF`. Pass in `5000` for `debounceMS`, set `keepAlive` to `true`, and specify the callback rule as `Synchronous`. Similar to our previous registration, pass in the GUID for our third skill for the last parameter (in our case, `f6cc6095-ae40-4507-a9ef-4c7638bf3ad5). Above our registration call, add two property tests to confirm we’re only receiving data from our rear-facing time of flight sensor and that the distance an object is detected is less than 0.5 meters. 

```JavaScript
//  add two property tests to confirm we’re only receiving data from our rear-facing time of flight sensor and that the distance an object is detected is less than 0.5 meters. 
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<", 0.5, "double");
// register for TimeOfFlight as BackTOF. Pass in 5000 for debounceMS, set keepAlive to true, and specify the callback rule as Synchronous. Similar to our previous registration, pass in the GUID for HelloWorld_TriggerSkill3 for the last parameter.
misty.RegisterEvent("BackTOF", "TimeOfFlight", 5000, true, "Synchronous", "f6cc6095-ae40-4507-a9ef-4c7638bf3ad5");
```

With both of our event registrations finished, our “parent” skill is complete. Note that we don’t create callbacks for the events in the “parent” skill -- those are handled in the “child” skills.

For reference, here is the entire skill file for `HelloWorld_TriggerSkill1.js`.

```JavaScript
// add a return property check to return just the property PersonName for use in our callback. Pass in the name of the event first, then the property we want.
misty.AddReturnProperty("FaceRecognition", "PersonName");
// register for FaceRecognition events with an event name of ComputerVision. Set debounceMS to 5000, keepAlive to true, and the callback rule to Synchronous. Pass in the GUID for HelloWorld_TriggerSkill2.
misty.RegisterEvent("FaceRecognition", "ComputerVision", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");
// send command to start face recognition
misty.StartFaceRecognition();

//  add two property tests to confirm we’re only receiving data from our rear-facing time of flight sensor and that the distance an object is detected is less than 0.5 meters. 
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<", 0.5, "double");
// register for TimeOfFlight as BackTOF. Pass in 5000 for debounceMS, set keepAlive to true, and specify the callback rule as Synchronous. Similar to our previous registration, pass in the GUID for HelloWorld_TriggerSkill3 for the last parameter.
misty.RegisterEvent("BackTOF", "TimeOfFlight", 5000, true, "Synchronous", "f6cc6095-ae40-4507-a9ef-4c7638bf3ad5");
```

As discussed above, the first “child” skill handles face recognition events. We start by defining a function for the callback (automatically named `_<Event>`) and passing in an argument to hold the data from the event. Within the callback, send a debug message to notify the user that the new skill has been triggered.

```JavaScript
function _FaceRecognition(data) {
   misty.Debug(“TriggerSkill part 2 has been triggered.”);
}
```

Note: Because we designated the GUID for _this_ skill (`HelloWorld_TriggerSkill2.js`) as the skill to call back in the registration call for `FaceRecognition` within our “parent” skill, this skill starts automatically when the event callback is triggered.

Next, define a variable, `personName` to hold the name of the face detected (or “unknown person” if the face was not recognized). You can access this information within `data.AdditionalResults`. 

```JavaScript
// define a variable, personName to hold the name of the face detected (or “unknown person” if the face was not recognized). You can access this information within data.AdditionalResults. 
let personName = data.AdditionalResults[0];
```

Then, use an if statement to check if `personName` is equal to unknown person. If so, the face was not recognized. In this case, we want to send a command to change the LED to red and send a debug message from Misty saying “I don’t know you…”. Otherwise, the face was recognized, and we send a command to change the LED to green and send a debug message greeting the user by name.

```JS
if (personName == "unknown person") {
    // if the person is not recognized, change the LED to red and print "I don't know you" to the console.
    misty.ChangeLED(255, 0, 0); // red
    misty.Debug("I don't know you...");
} else {
    // If the person is recognized, change the LED to green and greet the person in the console.
    misty.ChangeLED(0, 255, 0); // green
    misty.Debug("Hello there " + personName + "!");
}
```

You’ll remember that earlier when we registered for our face recognition event, we set `debounceMS` to `5000`. The reason for this is that we need to give the triggered skill time to process the information, then automatically cancel before the callback is triggered again. The triggered skill can be triggered multiple times from the “parent” skill, _but only if it isn’t already running_. If the event callback is triggered while `HelloWorld_TriggerSkill2.js` is still running, it does not run again. _This is because you cannot have multiple instances of the same skill running at once._

For reference, here is the entire skill file for `HelloWorld_TriggerSkill2.js`.

```JavaScript
// callback for face recognition event
function _FaceRecognition(data) {
	// send a debug message to notify the user that the new skill has been triggered.
	misty.Debug("TriggerSkill part 2 has been triggered.");
	// define a variable, personName to hold the name of the face detected (or “unknown person” if the face was not recognized). You can access this information within data.AdditionalResults. 
	let personName = data.AdditionalResults[0];
	// check if person was recognized
	if (personName == "unknown person") {
		// if the person is not recognized, change the LED to red and print "I don't know you" to the console.
		misty.ChangeLED(255, 0, 0); // red
		misty.Debug("I don't know you...");
	} else {
		// If the person is recognized, change the LED to green and greet the person in the console.
		misty.ChangeLED(0, 255, 0); // green
		misty.Debug("Hello there " + personName + "!");
	}
}
```

The third skill is designated for our time-of-flight event. Start by defining a function for the callback for `BackTOF`. Pass in an argument to access the data. Then, within the callback write a debug message indicating that skill number three has been triggered.

```JS
// callback for time of flight event
function _BackTOF(data) {
    // log a debug message indicating a new skill is triggered
}
```

Define a variable `distance` to hold the value of the distance an object was detected. We can access this from our property test results (contained in the response). Dig into the results to locate the value we want.

```JS
// Define a variable distance to hold the value of the distance an object was detected. We can access this from our property test results (contained in data.PropertyTestResults[1].PropertyParent.DistanceInMeters)
let distance = data.PropertyTestResults[1].PropertyParent.DistanceInMeters;
```

Then, use an `if` statement to check that the distance is less than `0.1m`. If so, play an “irritated” sounding audio clip, send a debug message indicating the distance an object detected was ‘too close’, and have Misty drive forward a short distance. Otherwise, send a command to play a ‘happy’ sounding clip, and send a debug message indicating the object is far enough away (it isn’t invading Misty’s personal space).

```JS
if (distance < 0.1) {
    // If an object is detected closer than 10 cm, play an “irritated” sounding audio clip, send a debug message indicating the distance an object detected was ‘too close’, and have Misty drive forward a short distance. 
    misty.PlayAudioClip("002-Ahhh.wav", 100);
    misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
    misty.DriveTime(50, 0, 1000);
} else {
    // If no object is detected closer than 10 cm, send a command to play a ‘happy’ sounding clip, and send a debug message indicating the object is far enough away (it isn’t invading Misty’s personal space).
    misty.PlayAudioClip("004-WhaooooO.wav", 100);
    misty.Debug("An object was detected " + distance + " meters behind me. That's okay.");
}
```

Just like before in our second skill, we specified the callback to trigger once every 5000 ms to give the triggered skill time to cancel before being started again. 

For reference, here is the entire skill file for `HelloWorld_TriggerSkill3.js`.

```JS
// callback for time of flight event
function _BackTOF(data) {
    // log a debug message indicating a new skill is triggered
    misty.Debug("TriggerSkill part 3 has been triggered.");
    // Define a variable distance to hold the value of the distance an object was detected. We can access this from our property test results (contained in data.PropertyTestResults[1].PropertyParent.DistanceInMeters)
    let distance = data.PropertyTestResults[1].PropertyParent.DistanceInMeters;
    // Check the value of distance
    if (distance < 0.1) {
        // If an object is detected closer than 10 cm, play an “irritated” sounding audio clip, send a debug message indicating the distance an object detected was ‘too close’, and have Misty drive forward a short distance. 
        misty.PlayAudioClip("002-Ahhh.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
        misty.DriveTime(50, 0, 1000);
    } else {
        // If no object is detected closer than 10 cm, send a command to play a ‘happy’ sounding clip, and send a debug message indicating the object is far enough away (it isn’t invading Misty’s personal space).
        misty.PlayAudioClip("004-WhaooooO.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's okay.");
    }
}
```

Congratulations, triggering callbacks across skills is a valuable tool you can add to your Misty-programming experience! Save the code files, and see the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill).

## Head & Arm Movement (Misty II)

In this tutorial we write a skill that moves Misty's head and arms. There are a variety of movement commands we could use, each taking different types of values (`position`, `degrees`, or `radians`). In this tutorial, we’re using the set of Misty’s movement commands that use `position` values.

**Note:** Because Misty I robots do not have arms, and because their heads can only move along a single axis (pitch), this skill only works with Misty II.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_HeadArms"`. Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_HeadArms.json`.

```json
{
    "Name": "HelloWorld_HeadArms",
    "UniqueId": "3eb34dc8-14f6-4af3-872a-ce14f168211f",
    "Description": "Local 'Hello, World!' tutorial series.",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": true,
    "WriteToLog": false
}
```

### Writing the Code File

The code file for this skill is separated into two parts. In the first section, we write the logic describing how Misty should move her head. The second section describes how Misty should move her arms.

#### Moving Misty's Head

There are three axes of movement (also described as “three degrees of freedom”) with Misty’s neck:
* pitch (up or down)
* yaw (turning left or right)
* roll (tilting left or right)

When we move Misty’s head by position, we provide a value for the position of her head along each axis of movement when the movement is complete. That position value ranges from `-5` to `5`, which maps to Misty’s full range of neck motion. Additionally, Misty can move her head at varying velocities, which we specify as a percentage of max speed.

For our skill, we register to receive time-of-flight (distance) events and have Misty move her head in response these events. We start by calling `misty.RegisterEvent()`. We pass in the name we want to designate for the event (`"FrontTOF"`), and the name of the sensor data stream to subscribe to (`"TimeOfFlight"`). Pass in `100` for the third parameter (`debounce`) to receive data from `TimeOfFlight` events once every 100 milliseconds.

```JavaScript
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100);
```

Above where we register to the event in our code, we can add property comparison tests to filter the data we receive. In this example, the first property test checks that we are only looking at data from front-facing time-of-flight sensors. The field we’re testing is `SensorPosition` and we’re checking that the data received is not coming from the time-of-flight sensors in the back of Misty’s base. Therefore, we only let through messages where `SensorPosition !== Back`.

```JavaScript
misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
```

The second property test ensures we are only looking at data where the distance to the object detected is less than 0.2 meters. We don’t want Misty to move her head until she detects something closer than about 6 inches.

```JavaScript
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
```

When we receive any of our specified time-of-flight events, the callback `_FrontTOF()` runs. It’s in `_FrontTOF()` that we’re going to perform the actual head movement. This function is triggered whenever messages are sent that pass the property tests. The callback is automatically given the name `_<event>`, so in this case, the callback name is set to `_FrontTOF()`. For more on events and callbacks, see [Data Handling: Events & Callbacks](../../skills/local-skill-architecture/#data-handling-events-amp-callbacks).


```JavaScript
function _FrontTOF() {

}
```

Inside the `_FrontTOF()` callback, we call [`misty.MoveHeadPosition()`](../../../docs/reference/javascript-api/#misty-moveheadposition). We pass in a position value for each axis of movement (`pitch`, `roll`, and `yaw`), for `velocity`, and for the optional `prePause` and `postPause` values. For example, in the following command we’re telling Misty to tilt her head upward to the limit of her motion in the `pitch` direction (`-5`), but not to move along the `roll` (`0`) or `yaw` (`0`) axes. We also tell Misty to move her head at a moderate velocity (`60`), and we specify `0` and `1500` for the `prePause` and `postPause` values to tell Misty to pause for a second and a half after executing the command.

```JavaScript
misty.MoveHeadPosition(-5, 0, 0, 60, 0, 1500);
```

Within the `_FrontTOF()` callback, we actually call `misty.MoveHeadPosition()` multiple times with a variety of parameters, so we can move Misty’s head in different ways. To make things interesting, we can also add in commands to change the LED and make sounds in between the head movement commands.

```JavaScript
misty.ChangeLED(0, 255, 255); // aqua
misty.PlayAudioClip("001-OooOooo.wav");

// pitch
misty.MoveHeadPosition(-5, 0, 0, 60, 0, 1500); // pitch up
misty.MoveHeadPosition(5, 0, 0, 60, 0, 1500); // pitch down
misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // pitch center

misty.ChangeLED(255, 0, 255); // magenta
misty.PlayAudioClip("004-WhaooooO.wav");

// yaw
misty.MoveHeadPosition(0, 0, -5, 60, 0, 1500); // yaw left
misty.MoveHeadPosition(0, 0, 5, 60, 0, 1500); // yaw right
misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // yaw center

misty.ChangeLED(255, 255, 0); // yellow
misty.PlayAudioClip("004-EuuEuuuuu.wav");

// roll
misty.MoveHeadPosition(0, -5, 0, 60, 0, 1500); // roll left
misty.MoveHeadPosition(0, 5, 0, 60, 0, 1500); // roll right
misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // roll center

misty.ChangeLED(0, 0, 0); // off
misty.PlayAudioClip("010-Hummmmmm.wav");
```

#### Moving Misty's Arms

Now that we’ve moved Misty’s head in response to sensing things in front of her, we can exercise arm movement. We want Misty to move her arms when she senses something at a given distance behind her. To do this, within the `_FrontTOF()` callback we register for back time-of-flight events.

```JavaScript
// register for back TOF and add property tests
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("BackTOF", "TimeOfFlight", 100);
```

We register for `BackTOF` events by adding property tests checking that `SensorPosition` equals `Back` and the `DistanceInMeters` is less than or equal to `0.2`. We then call `misty.RegisterEvent()` and pass in the name for the event, `BackTOF`. When `BackTOF` is triggered, the callback runs. And it’s within the `_BackTOF()` callback that we send the actual commands to move Misty’s arms.

Like head movement, arm movement can be controlled three ways, by position, radians, or degrees. In this example, we’ll use position via the `misty.MoveArmPosition()` command. With this command you can designate which arm to move (`Left` or `Right`), the position to move it to (a range from `0` to `10`), the velocity (a percentage of max speed), and provide optional `prePause` and `postPause` values (in ms). Here, we tell Misty to move her left arm up at a moderate speed to the limit of her motion.

```JavaScript
misty.MoveArmPosition("Left", 10, 60, 0, 1500);
```

As we did with head movement, within the callback we can call `misty.MoveArmPosition()` multiple times, with different parameters to move her arms in a variety of ways. And we can again include commands to change the LED and make sounds in between the arm movement commands. Once the movements are finished, we log a debug message indicating the skill is complete.

```JavaScript
function _BackTOF() {
    misty.ChangeLED(0, 255, 0) // lime
    misty.PlayAudioClip("006-Urhurra.wav");

    // left
    misty.MoveArmPosition("Left", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Left", 0, 60, 0, 1500); // down

    misty.ChangeLED(128, 0, 0) // maroon
    misty.PlayAudioClip("001-EeeeeeE.wav");

    // right
    misty.MoveArmPosition("Right", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Right", 10, 60, 0, 1500); // down

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudioClip("010-Hummmmmm.wav");

    misty.Debug("ending skill HelloWorld_HeadArms");
}
```

When the skill runs, Misty registers for `FrontTOF` events. When an event is triggered that passes the specified property tests, she moves her head and registers for `BackTOF` events. When a `BackTOF` event occurs that passes the specified property tests, she moves 
her arms and ends skill execution.

Save the code file with the name `HelloWorld_HeadArms.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill). 

See the complete `HelloWorld_HeadArms.js` file here for reference.

```JavaScript
// debug message to indicate the skill has started
misty.Debug("starting skill HelloWorld_HeadArms");

// register for front TOF and add property tests
misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100);

// front TOF callback, head
function _FrontTOF(data) {
    misty.Debug(data);
    misty.ChangeLED(0, 255, 255); // aqua
    misty.PlayAudioClip("001-OooOooo.wav");

    // pitch
    misty.MoveHeadPosition(-5, 0, 0, 60, 0, 1500); // pitch up
    misty.MoveHeadPosition(5, 0, 0, 60, 0, 1500); // pitch down
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // pitch center

    misty.ChangeLED(255, 0, 255); // magenta
    misty.PlayAudioClip("004-WhaooooO.wav");

    // yaw
    misty.MoveHeadPosition(0, 0, -5, 60, 0, 1500); // yaw left
    misty.MoveHeadPosition(0, 0, 5, 60, 0, 1500); // yaw right
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // yaw center

    misty.ChangeLED(255, 255, 0); // yellow
    misty.PlayAudioClip("004-EuuEuuuuu.wav");

    // roll
    misty.MoveHeadPosition(0, -5, 0, 60, 0, 1500); // roll left
    misty.MoveHeadPosition(0, 5, 0, 60, 0, 1500); // roll right
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // roll center

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudioClip("010-Hummmmmm.wav");

    // register for back TOF and add property tests
    misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
    misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.2, "double");
    misty.RegisterEvent("BackTOF", "TimeOfFlight", 100);
}

// back TOF callback, arms
function _BackTOF() {
    misty.ChangeLED(0, 255, 0) // lime
    misty.PlayAudioClip("006-Urhurra.wav");

    // left
    misty.MoveArmPosition("Left", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Left", 0, 60, 0, 1500); // down

    misty.ChangeLED(128, 0, 0) // maroon
    misty.PlayAudioClip("001-EeeeeeE.wav");

    // right
    misty.MoveArmPosition("Right", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Right", 0, 60, 0, 1500); // down

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudioClip("010-Hummmmmm.wav");

    misty.Debug("ending skill HelloWorld_HeadArms");
}
```

## Bump Sensors (Misty II)

In this tutorial we learn how to interact with Misty’s bump sensors. We use a ["Get" type of command](../../skills/local-skill-architecture/#get-commands) to fetch the list of audio clips on Misty's local storage, and we assign different audio files to unique global variables. We then register for bump sensor events and write logic to have Misty play a different audio clip when you press each of her bump sensors.

**Note:** Because Misty I robots do not have bump sensors, this skill only works with Misty II.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_Bump Sensors"`. Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_BumpSensors.json`.

```json
{
    "Name": "HelloWorld_BumpSensors",
    "UniqueId": "01190e52-3d72-4a9c-ba26-ea483fbdbdea",
    "Description": "Local 'Hello, World!' tutorial series",
    "StartupRules": [ "Manual", "Robot" ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": true,
    "WriteToLog": false
}
```

### Writing the Code File

The code file consists of two main parts. In the first part, we retrieve the list of audio clips on Misty, assign four of these clips to global variables so we can use them throughout our skill, and register for bump sensor events. In the second part, we set up the bump sensor event callback to have Misty play a different sound each time her bump sensors activate. 

To begin, send a debug message to indicate the skill is running.

```JavaScript
misty.Debug("HelloWorld_BumpSensors is running")
```

Then call `misty.GetListOfAudioClips()` to fetch the list of audio clips on Misty's local storage. Data returned by "Get" type commands must be passed into a callback function to be used in your skill. For the first parameter of `misty.GetListOfAudioClips()`, designate a name for the callback function to run when the audio data is ready (`_GetListOfAudioClips`). Pass `"synchronous"` for the second parameter (`callbackRule`). 

```JavaScript
misty.GetListOfAudioClips("_GetListOfAudioClips","synchronous");
```

The `_GetListOfAudioClips()` callback triggers when the data from `misty.GetListOfAudioClips()` is ready. We use this callback to handle the data and make it available to the rest of our skill. For more information about data and callbacks, see ["Get" Data Callbacks](../../skills/local-skill-architecture/#-get-data-callbacks)

Next write the logic for the `_GetListOfAudioClips()` callback function. Declare the function and pass in a parameter (here we use `data`) to access the audio data returned by `misty.GetListOfAudioClips()`.

```JavaScript
function _GetListOfAudioClips(data) {

}
```

When the list of audio clips is available, we can assign the names of different audio files to four unique global variables. We access the names of audio files by digging into the response data from `misty.GetListOfAudioClips()`, which contains an array of audio file data. In Misty's on-robot JavaScript API, global variables are prefixed with an underscore (i.e. `_globalVar`) and do not require identifiers such as `var`, `let`, or `const`.

In the `_GetListOfAudioClips()` callback, assign the first four results in the audio data array to four unique global variables. These variables can be accessed from within the callback we write to handle bump sensor events, where we'll map them to each of Misty's bump sensors.

```JavaScript
_audio1 = data.Result[0].Name;
_audio2 = data.Result[1].Name;
_audio3 = data.Result[2].Name;
_audio4 = data.Result[3].Name;
```

Next we register for bump sensor events. Call `misty.RegisterEvent()` and pass in a name to designate for the event (for simplicity, we use `BumpSensor`). Next, pass in the message type to subscribe to (also `BumpSensor`), a small value for the `debounce` parameter (`200`), and `true` for `keepAlive` to ensure the event does not unregister when the callback is triggered.

```JavaScript
misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);
```

Above the registration command, use `misty.AddPropertyTest()` to check that `isContacted == true`. Bump sensor messages are sent both when a sensor is pressed **and** when it’s released. This property test filters out data sent when sensors are released, so the `_BumpSensor()` callback only triggers when a bump sensor is pressed. The value of `isContacted` is a boolean, so the fifth parameter we pass to `misty.AddPropertyTest()` must be `boolean`.

```JavaScript
misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
```

The callback for our bump sensor event triggers when any of Misty's sensors are pressed. To determine which sensor is activated, we use the `sensorName` property sent with each bump sensor event message. To access this data in the `_BumpSensor()` callback, call `misty.AddReturnProperty()` above the event registration command. Pass in the name of the event (`BumpSensor`) and the property to return information about (`sensorName`).
 
```JavaScript
misty.AddReturnProperty("BumpSensor", "sensorName");
```

The full `_GetListOfAudioClips()` callback looks like this.

```JavaScript
function _GetListOfAudioClips(data) {
   _audio1 = data.Result[0].Name;
   _audio2 = data.Result[1].Name;
   _audio3 = data.Result[2].Name;
   _audio4 = data.Result[3].Name;

   misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
   misty.AddReturnProperty("BumpSensor", "sensorName");
   misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);
}
```

Within the `_BumpSensor()` callback, dig into the response data to access the name of the activated sensor. Assign this value to a variable called `sensorName`. The name of any return properties we specify with `misty.AddReturnProperty()` are located in `data.AdditionalResults`.

```JavaScript
function _BumpSensor(data) {
    let sensorName = data.AdditionalResults[0];
}
```

We want to issue a `misty.PlayAudioClip()` command with a different audio file each time a bump sensor activates. To do this, write a `switch` statement and pass in the `sensorName` variable. The value of `sensorName` will be string indicating which of the four bump sensors was pressed: `"Bump_FrontRight"`, `"Bump_FrontLeft"`, `"Bump_RearRight"`, or `"Bump_RearLeft"`. Declare a case for each of these values. Within each case, send a debug message indicating which sensor was pressed. Then issue a `misty.PlayAudioClip()` command and pass in one of the global variables to which we assigned an audio file in the `_GetListOfAudioClips()` callback. For the second parameter (`volume`), pass an integer between 1 and 100.

```JavaScript
switch (sensorName) {
    case "Bump_FrontRight":
        misty.Debug("front right bump sensor was pressed")
        misty.PlayAudioClip(_audio1, 75);
        break

    case "Bump_FrontLeft":
        misty.Debug("front left bump sensor was pressed")
        misty.PlayAudioClip(_audio2, 75);
        break

    case "Bump_RearRight":
        misty.Debug("rear right bump sensor was pressed")
        misty.PlayAudioClip(_audio3, 75);
        break

    case "Bump_RearLeft":
        misty.Debug("rear left bump sensor was pressed")
        misty.PlayAudioClip(_audio4, 75);
        break
}
```

The `_BumpSensor()` callback triggers when a bump sensor event passes our property comparison test. When this callback triggers, we determine which sensor was pressed and issue a command to play a specific audio file. The entire `_BumpSensor()` callback looks like this:

```JavaScript
function _BumpSensor(data) {
    let sensorName = data.AdditionalResults[0];

    switch (sensorName) {
        case "Bump_FrontRight":
            misty.Debug("front right bump sensor was pressed")
            misty.PlayAudioClip(_audio1, 75);
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor was pressed")
            misty.PlayAudioClip(_audio2, 75);
            break

        case "Bump_RearRight":
            misty.Debug("rear right bump sensor was pressed")
            misty.PlayAudioClip(_audio3, 75);
            break

        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor was pressed")
            misty.PlayAudioClip(_audio4, 75);
            break
    }
}
```

When this skill runs, Misty retrieves the list of audio clips in her local storage and associates the names of four audio files with unique global variables. She then registers for bump sensor events. Each time an event occurs, Misty determines which bump sensor was pressed and plays the sound associated with that sensor.

**Note:** By default on-robot skills timeout after 300 seconds, so this skill automatically stops executing after 5 minutes. This duration can be changed by changing the value of the `TimeoutInSeconds` property in the meta file. 

Save the code file with the name `HelloWorld_BumpSensors.js`. See the documentation on using [Misty Skill Runner](../../skills/tools/#misty-skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../skills/local-skill-architecture/#loading-amp-running-a-local-skill). 

See the complete `HelloWorld_BumpSensor.js` file here for reference. 

```JavaScript
// Send a debug message to indicate the skill is running
misty.Debug("HelloWorld_BumpSensors is running")

// Fetch audio list and designate a callback 
// to run when the data is available
misty.GetListOfAudioClips("_GetListOfAudioClips","synchronous");

// Handle the data returned by misty.GetListOfAudioClips 
function _GetListOfAudioClips(data) {
   // Assign the names of audio files from the list to global variables
   _audio1 = data.Result[0].Name;
   _audio2 = data.Result[1].Name;
   _audio3 = data.Result[2].Name;
   _audio4 = data.Result[3].Name;

   // Use a property test test to isolate bump sensor
   // messages where isContacted is true
   misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
   // Add the value for the sensorName property to the bump sensor
   // data that can be accessed in the callback
   misty.AddReturnProperty("BumpSensor", "sensorName");
   // register for BumpSensor events
   misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);
}

// Handle data sent by BumpSensor events
function _BumpSensor(data) {
    // Assign the value of the sensorName property to a variable
    let sensorName = data.AdditionalResults[0];

    // determine which sensor is pressed. Send a debug 
    // message indicating the sensor location and play an audio
    // clip command with an audio file name unique to each bump sensor
    switch (sensorName) {
        // If the front right sensor is pressed, play the audio clip 
        // assigned to _audio1
        case "Bump_FrontRight":
            misty.Debug("front right bump sensor pressed")
            misty.PlayAudioClip(_audio1, 75);
            break
        // If the FrontLeft sensor is pressed, play the audio clip
        // assigned to _audio2 
        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed")
            misty.PlayAudioClip(_audio2, 75);
            break
        // If the RearRight sensor is pressed, play the audio clip
        // assigned to _audio3
        case "Bump_RearRight":
            misty.Debug("rear right bump sensor pressed")
            misty.PlayAudioClip(_audio3, 75);
            break
        // If the RearLeft sensor is pressed, play the audio clip
        // assigned to _audio4
        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor pressed")
            misty.PlayAudioClip(_audio4, 75);
            break
    }
}
```



