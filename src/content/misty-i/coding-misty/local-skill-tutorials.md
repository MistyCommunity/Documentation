---
title: On-Robot JavaScript API Tutorials
layout: coding-misty-i.hbs
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

To begin, create a `.js` file and call it `HelloWorld_TimeOfFlight.js`. Then create a `.json` file and give it the same name. When the skill is complete, we use [Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner/) to upload these files to the directories specified above.

### Writing the Meta File

The `.json` file includes fields that set certain specifications for your skill. You need to create a GUID to uniquely identify your skill, which can be generated [here](https://www.guidgenerator.com/online-guid-generator.aspx). Use this to set the value of `UniqueId`. In the `Name` field, enter the name used for the `.js` file and the `.json` file (`HelloWorld_TimeOfFlight`) to ensure they are referenced correctly. Many of the parameters below have default values that are automatically set. For now, use the values shown in the example for the remaining fields. Save this file with the name `HelloWorld_TimeOfFlight.json`.

```json
{
    "Name": "HelloWorld_TimeOfFlight",
    "UniqueId" : "652d4346-1b17-4515-974d-ce7ff901e3a1",
    "Description": "Time-of-flight tutorial skill",
    "StartupRules": ["Manual", "Robot"],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "SkillStorageLifetime": "Reboot",
    "WriteToLog": false,
    "Parameters": { }
}
```

### Writing the Code File 

To issue any command to Misty in the local environment, we call methods on the `misty` object. Start by writing a debug message so we’re notified when the skill is started. To do this, call `misty.Debug()` and pass in a meaningful message. These messages will show up in your browser’s JavaScript console if you’re using the [Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner/) tool to run the skill.

```javascript
misty.Debug("starting skill helloworld_timeofflight");
```

Now let’s use the very simple `misty.ChangeLED()` function to control the color of your robot’s chest LED. The method takes three arguments, which correspond to the RGB parameters required to specify the LED color as described [here](https://docs.mistyrobotics.com/misty-i/reference/rest/#changeled). The code below will turn the LED green (for go!)

```javascript
misty.ChangeLED(0, 255, 0);
```

Then, we issue one of Misty’s drive commands, `misty.DriveTime()`. The `misty.DriveTime()` command accepts three parameters: `linearVelocity`, `angularVelocity`, and `time`. You can learn more about how these parameters will affect Misty’s movement in the documentation. In this case, we want Misty to drive forward slowly in a straight line for 10 seconds, so we set `linearVelocity` = 50, `angularVelocity` = 0, and `time` = 10000 (the unit of measure for this parameter is milliseconds).

```javascript
misty.DriveTime(50, 0, 10000);
```

We’ve instructed Misty to drive forward for 10 seconds and come to a stop. But there’s a major flaw in this code. What if there is an object in Misty’s way? We want her to come to a stop, rather than plowing through it. In order to handle this type of event, we need to look at data coming back from Misty’s sensors. To do this we will subscribe to events from one of Misty’s many websocket streams available to us: namely `TimeOfFlight`. 

Once we have subscribed to `TimeOfFlight`, we’ll receive event data back from Misty telling us how far objects are away from her. See the template for registering for an event here:

```javascript
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = “synchronous”], [string skillToCall = null]);
```

We call `misty.RegisterEvent()` and pass in the name we want to designate for the event (`"FrontTOF"`), the name of the WebSocket stream we are subscribing to (`"TimeOFFlight"`), and the debounce time in milliseconds (`250`). By default, when a callback triggers for an event, the event is automatically unregistered. Make sure your register event method matches the code snippet below.

```javascript
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250);
```

Before we register to the event in our code, we can add property comparison tests to filter the data we receive. In this example, the first property test checks that we are only looking at data from the time-of-flight sensor we’re concerned with. The field we’re testing is `SensorPosition` and we’re checking that the data received is only coming from the time-of-flight sensor in the front center of Misty’s base, pointing in her direction of travel. Therefore, we only let through messages where `SensorPosition == Center`.

```javascript
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
```

The second property test ensures we are only looking at data where the distance to the object detected is less than 0.2m. We don’t want our skill to react to things further away than about 6 inches.

```javascript
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
```

Whenever we subscribe to an event, we receive the data back within a callback function. This function is triggered whenever messages are sent that pass the property tests. The callback is automatically given the name `_<event>`. So in this case, the callback name is automatically set to `_FrontTOF()`. The data is passed directly into the callback and can accessed through an argument passed into `_FrontTOF()`, which we’ll call `data`.

```javascript
function _FrontTOF(data) {

}
```

Once we receive the data via the callback, we can access the distance the object was detected and the sensor position it was detected at.

```javascript
function _FrontTOF(data) {
   let frontTOF = data.PropertyTestResults[0].PropertyParent;
   misty.Debug(“Distance: ” + frontTOF.DistanceInMeters);
   misty.Debug(“Sensor Position: ” + frontTOF.SensorPosition);
}
```

Call `misty.Stop()` to issue a stop command to Misty, then `misty.ChangeLED()` and pass in the values `(255, 0, 0)` to turn the LED red (for stop!) and log a message to notify us that the skill has finished.

```javascript
misty.Stop();
misty.ChangeLED(255, 0, 0);
misty.Debug("ending skill helloworld_timeofflight");
```

Save the code file with the name `HelloWorld_TimeOfFlight.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill). 

See the full JavaScript code file below or [download the code from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Time-of-Flight).

```javascript
// Print a message to indicate the skill has started
misty.Debug("starting skill helloworld_timeofflight");

// Issue commands to change LED and start driving
misty.ChangeLED(0, 255, 0); // green, GO!
misty.DriveTime(10, 0, 10000);

// Register for TimeOfFlight data and add property tests
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250);

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

We start by creating a debug message so we’re notified when the skill starts. Then we call the `GetAudioList()` method to fetch the list of audio files currently stored on the robot.

```javascript
misty.GetAudioList();
```

Each command’s callback is automatically set to be `_<COMMAND>`. When the data is returned, the callback runs.

```javascript
function _GetAudioList(data) { 

}
```

We should check if the data has been received successfully (e.g. is not empty or null) with an `if` statement. The array of audio file data will be located in the callback response under `Result`. Let’s save this to a variable: `audioArr`. Then, we use the JavaScript methods `Math.random()` and `Math.floor()` to generate a random whole number from 0 and one less than the length of the audio list:

```javascript
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

Finally, we call another Misty command, `PlayAudio()`, and pass in the random file name to play the audio clip. 

```javascript
misty.PlayAudio(randSound);
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** All of this logic must be contained within `_GetAudioList()` to ensure that it does not run until the audio list has been populated. 
{{box op="end"}}

Save the code file with the name `HelloWorld_PlayAudio.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

See the full JavaScript code file below or [download the code from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Play%20Audio).

```javascript
// Print a debug message to indicate the skill has started
misty.Debug("starting skill helloworld_playaudio");

// Issue command to fetch list of audio clips
misty.GetAudioList();

// Callback to handle data returned by GetAudioList()
function _GetAudioList(data) {
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
        misty.PlayAudio(randSound);
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

```javascript
   misty.StartRecordingAudio("RecordingExample.wav");
   misty.Pause(5000);
   misty.StopRecordingAudio();
   misty.Pause(2000);
```

Once the clip has been saved, check that the recording was saved correctly. To do this, call `GetAudioList()`. As mentioned in previous tutorials, the callback function (automatically named `_<COMMAND>`) will run once the data is ready to be received.

```javascript
misty.GetAudioList();
function _GetAudioList(data) {

}
```

Now that we have the data, we want to check that our recording shows up in the list. Once way to do this is to create a boolean variable to indicate whether the list contains the file. Then, loop through the list and check if the name of any of the audio files match the name of your recording. If it does, change the boolean from `false` to `true`. **Note:** This logic needs to be contained within the callback, as it uses the data received from the `GetAudioList()` command.

```javascript
let containsNewFile = false;
for (let i = 0; i < audioArr.length; i++) {
   if (audioArr[i].Name === "RecordingExample.wav") {
      containsNewFile = true;
   }
}
```

If the list contains the recording, we can call `PlayAudio()` to play the recording and end the program. Otherwise, use `Debug()` to print an error message, as something went wrong with the process.

```javascript
if (containsNewFile) {
   misty.PlayAudio("RecordingExample.wav", 100, 500);
}
else {
   misty.Debug("file was not found");
}
```

Save the code file with the name `HelloWorld_RecordAudio.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

See the complete JavaScript code below or [download the code for this tutorial from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Record%20Audio).

```javascript
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
misty.GetAudioList();

// Define the callback for request
function _GetAudioList(data) {
    // Get the array of audio files from the data returned 
    // by GetAudioList()
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
        misty.PlayAudio("RecordingExample.wav", 100, 500);
    }
    else {
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

In order to tell if Misty has detected a face, we register an event to receive data from computer vision events. Call `misty.RegisterEvent()` and pass in a name for the event (this example uses `"FaceRecognition"` to keep it simple), the data stream we are subscribing to (`"FaceRecognition"`), and a value specifying how frequently we want to receive data (in this case, every `250` milliseconds).

```javascript
misty.RegisterEvent("FaceRecognition", "FaceRecognition", 250);
```

Now that we have the event set up, we can send the command to start face detection. This command is different in that it initiates the process for Misty to start _looking_ for a face, while the event is only set up to trigger if a face is _detected_. Both parts are necessary to handle skills that include face detection.

```javascript
misty.StartFaceDetection();
```

Within the callback (automatically named `_FaceRecognition()`) we should log a debug message to indicate that a face has been detected, send a command to play an audio clip, and another to change the LED. Then we can send a command to stop face detection. Once the code in this callback finishes, the skill will automatically end after 5 seconds of inactivity.

```javascript
function _FaceRecognition() {
   misty.Debug("Face detected!”);

   misty.PlayAudio("005-OoAhhh.wav");
   misty.ChangeLED(255, 255, 255); // white
   misty.StopFaceDetection();
};
```

With what we have so far, the skill will run indefinitely if no face is detected. To make the skill more complete, we need to write code to handle this “no face” situation. To accomplish this, let’s register for a timer event to trigger if no face was detected after 15 seconds. We register for this event just after we register for `"FaceRecognition"` in our `misty.RegisterEvent()` method.

```javascript
misty.RegisterTimerEvent("FaceRecognitionTimeout", 15000);
```

Then within the callback (again, automatically named `_FaceRecognitionTimeout()`), we log a debug message to indicate the timeout was called, turn the LED off, and send the command to stop face detection. After this command has been issued, Misty will be inactive and the skill will automatically end after 5 seconds. 

```javascript
function _FaceRecognitionTimeout() {
   misty.Debug("face detection timeout called, it's taking too long...");

   misty.ChangeLED(0, 0, 0); // black
   misty.StopFaceDetection();
};
```

Save the code file with the name `HelloWorld_FaceDetection.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

See the complete JavaScript code below or [download the tutorial code from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Face%20Detection).

```javascript

misty.Debug("starting skill helloworld_facedetection");

// Register for face detection event
misty.RegisterEvent("FaceRecognition", "FaceRecognition", 250);
// Timer event cancels the skill
// if no face is detected after 15 seconds
misty.RegisterTimerEvent("FaceRecognitionTimeout", 15000);

misty.StartFaceDetection();

// FaceRecognition event callback
function _FaceRecognition() {
    misty.Debug("Face detected!");
    // Play an audio clip
    misty.PlayAudio("005-OoAhhh.wav");
    // Change LED to white
    misty.ChangeLED(255, 255, 255);
    // Stop face detection
    misty.StopFaceDetection();
};

// FaceRecognitionTimeout callback
function _FaceRecognitionTimeout() {
    misty.Debug("face detection timeout called, it's taking too long...");

    // Change LED to black
    misty.ChangeLED(0, 0, 0);
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

When registering for a timed event use the `misty.RegisterTimerEvent()` method, we pass in the name of the event we want to create, the amount of time (in ms) we want Misty to wait before triggering the callback function, and we set the `keepAlive` parameter to `true` in order to have the event trigger the callback automatically every 3 seconds until it is unregistered. After the line of code to register for the timer event, we send our first command to change Misty’s LED to white below the timer event. This will turn the LED on for the first 3 seconds our skill runs, before the first callback is fired.

```javascript
misty.RegisterTimerEvent("TimerEvent", 3000, true);
misty.ChangeLED(255, 255, 255); // white
```

Define a global variable to track the amount of callbacks that have been triggered. In order for the data to persist across new threads created by callbacks, prefix the name of the variable with an underscore. Initialize the value of the variable as `0`. Declare it above the `misty.RegisterTimerEvent()` method. **Note:** Do not include a type when creating global variables.

```javascript
_count = 0;
```

In the callback function (automatically named `_TimerEvent()`) start by checking if the value of `_count` is less than `5` using an `if...then` statement. If so, increment `_count` by one to keep track of the amount of times we are changing the LED. Then, generate three random values between `0` and `255` and pass them in to `misty.ChangeLED()` to trigger a change in Misty’s chest LED.

```javascript
if (_count < 5) {
    _ count = _count + 1;

    let value1 = Math.floor(Math.random() * (256));
    let value2 = Math.floor(Math.random() * (256));
    let value3 = Math.floor(Math.random() * (256));
    misty.ChangeLED(value1, value2, value3);
}
else {

}
```

The `else` statement will trigger once the value of `_count` has reached `5`. At this point, we want the skill to end. Start by unregistering for the timer event by calling `misty.UnregisterEvent()` and passing in the name designated for the event. Then turn the LED off by passing in zero values for `misty.ChangeLED()` and log a debug message.

```javascript
else {
    misty.UnregisterEvent("TimerEvent");
    misty.ChangeLED(0, 0, 0); // off
    misty.Debug("ending skill helloworld_timerevent");
}
```

Using timed events, we have told Misty to change her chest LED to a random color in three-second intervals. We have demonstrated how we can use global variables prefixed with an underscore to have data persist across threads created in our program as callbacks are triggered.

Save the code file with the name `HelloWorld_TimerEvent.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

See the complete JavaScript code below or [download the tutorial code from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Timer%20Events).

```javascript

misty.Debug("starting skill helloworld_timerevent");

// global variable to count callbacks
_count = 0;

// Register for TimerEvent
misty.RegisterTimerEvent("TimerEvent", 3000, true);

// TimerEvent callback
function _TimerEvent() {
    if (_count < 5) {
        // Increment _count by 1
        _count = _count + 1;

        // Change LED to random color
        let value1 = Math.floor(Math.random() * (256));
        let value2 = Math.floor(Math.random() * (256));
        let value3 = Math.floor(Math.random() * (256));
        misty.ChangeLED(value1, value2, value3);
    }
    else {
        // Unregister timer event
        misty.UnregisterEvent("TimerEvent");
        // Turn off LED
        misty.ChangeLED(0, 0, 0);
        // Signal skill end
        misty.Debug("ending skill helloworld_timerevent");
    }
}
```

## External Requests

In this tutorial, we write a skill that fetches an audio file from an external resource, saves the file to Misty, and plays it back through Misty's speakers. To do this, we use the `misty.SendExternalRequest()` method to send a `GET` request and download a sound from [soundbible.com](http://soundbible.com/).

### Writing the Meta File

Create a new `.json` meta file for this skill. Copy and paste the code from the example to fill out the parameters. Save this file with the name `HelloWorld_ExternalRequest.json`.

```json
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

The brief code file makes use of the `misty.SendExternalRequest()` method. The `misty.SendExternalRequest()` prototype is as follows:

```javascript
misty.SendExternalRequest(string method, string resourceURL, string authorizationType, string token, string returnType, string jsonArgs, bool saveAssetToRobot, bool applyAssetAfterSaving, string fileName, [string callback], [string callbackRule], [string skillToCallOnCallback], [int prePauseMs], [int postPauseMs]);
```

In this skill we are sending a `GET` request, so we use the string `GET` for the first (`method`) parameter.

The second parameter (`resourceURL`) should contain the full URL of the host and resource to access. In this example, the full `resourceURL` is:

```http
http://soundbible.com/grab.php?id=1949&type=mp3.
```

For some requests additional authorization may be necessary. This is where the third (`authorization`) and fourth (`token`) parameters come into play. In this example, no authorization is required, so we can enter `null` for the third and fourth parameters.

The fifth required parameter (`returnType`) indicates the expected media type of the data returned by the request. In this example we expect to receive an .mp3 file, so we enter the string `audio/mp3`. If you expect to receive an image, you can enter the string `image/jpeg` (or another image type), or enter a text type if you expect the data to contain text. If the return type is provided by the external resource in the response to the request, you can pass `null` for this parameter.

**Note for Misty II Developers:** The `misty.SendExternalRequest()` method on Misty II robots does **not** use the `returnType` parameter. If you are using this tutorial with a Misty II robot, skip this parameter. Do not pass `null`, `undefined`, or any other value for this parameter. [See the documentation on this method for more information.](../../../misty-ii/reference/javascript-api/#misty-sendexternalrequest-alpha)

The sixth required parameter (`jsonArgs`) holds the data to send with `POST` requests. Because this example uses a `GET` request, `jsonArgs` can be set to null. **Note:** When you have no data to send with a `POST` request, some services may require you to use a string with an empty JSON payload (`"{}"`) instead of `null`. When you pass `null` for the `jsonArgs` parameter to a service where this is the case, the service returns an error message to indicate the value of args cannot be null or empty.

The optional `saveAssetToRobot`, `applyAssetAfterSaving`, and `fileName` parameters tell Misty how to handle images and audio files returned by requests. Pass `true` for `saveAssetToRobot` to have Misty save the file to local storage. Pass `true` for `applyAssetAfterSaving` to play the audio file immediately after it is saved (or, if the returned file is an image, to display it on Misty's screen). The string you pass for `fileName` specifies a name for the saved file (this example uses `sound`).

The optional `callback`, `callbackRule`, and `skillToCallOnCallback` parameters designate a function or skill to receive the data returned by the request and indicate the callback rule Misty should follow to execute the callback. Read more about callbacks and callback rules in [Data Handling: Events & Callbacks](../../coding-misty/local-skill-architecture/#data-handling-events-amp-callbacks). This example does not use a callback function, so you can omit these parameters, or pass `null` if you want to use the `prePauseMs` and `postPauseMs` parameters that follow them. Note that `prePauseMs` and `postPauseMs` are optional in `misty.SendExternalRequest()`.

The final form of `misty.SendExternalRequest()` in this tutorial is:

```javascript
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
    null, /*callback*/
    null, /*callbackRule*/
    null, /*skillToCallOnCallback*/
    0, /*prePauseMs*/
    0/*postPauseMs*/
    );
```

When the response is ready, Misty receives the file, saves it to local storage, and immediately plays through her built-in speakers. The final step is to have Misty send us a debug message to indicate skill execution is complete:

```javascript
// Debug message to indicate the skill is complete
misty.Debug("The skill is complete!!")
```

Save the code file with the name `HelloWorld_ExternalRequest.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

See the complete JavaScript code below.

```javascript
misty.Debug("Starting skill HelloWorld_ExternalRequest");

// Get and play an audio file hosted on soundbible.com.
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
    null, /*callback*/
    null, /*callbackRule*/
    null, /*skillToCallOnCallback*/
    0, /*prePauseMs*/
    0/*postPauseMs*/
    );

// Signal skill ccmpletion
misty.Debug("The skill is complete!!")
```

## Trigger Skill

In this tutorial, we learn how a skill can trigger other skills. In this case, the first skill will trigger additional skills when the first skill receives certain external stimuli: face recognition and time-of-flight events. We register for two events and have them trigger two new skills.

### Writing the Meta Files

This tutorial covers a total of three skills, so there are a total of three `.js ` code files and three `.json` meta files. The three meta files used in the tutorial are shown here. Use the values in these example to fill out the parameters, and save each file with the names below:

`HelloWorld_TriggerSkill1.json`:

```json
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


```json
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

```json
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

We start by calling the `misty.RegisterEvent()` command. In it, we register for `FaceRecognition` events with an event name of `FaceRecognition`. Set `debounceMS` to `5000`, `keepAlive` to `true`, and the callback rule to `Synchronous`. This is all typical for event registration.

The difference from normal event registration happens when we use an optional parameter (`skillToCall`) to designate which skill we want the `FaceRecognition` event to trigger. We do that by providing by the GUID of that skill. In this case the face recognition event is going to trigger the `HelloWorld_TriggerSkill2.js` skill, so we provide the GUID for _that_ skill here. In this case, it’s `28c7cb66-91d4-4c8f-a8af-bb667ce18099`.

```javascript
misty.RegisterEvent("FaceRecognition", "FaceRecognition", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");
```

We also want to add a return property check above the registration call, to return just the property `PersonName` for use in our callback. Pass in the name of the event first, then the property we want.

```json
misty.AddReturnProperty("FaceRecognition", "PersonName");
```

Finally, we need to send the command to start face recognition as well. This command tells Misty to start looking for a face to recognize (in tandem with the   `FaceRecognition` event subscription).

```javascript
 misty.StartFaceRecognition();
```

Putting the pieces together, shown below is first half of the parent skill; the commands relating to face recognition.

```javascript
// Return only the PersonName property
misty.AddReturnProperty("FaceRecognition", "PersonName");

// Register for FaceRecognition events.
// For the callback, pass in the GUID for
// HelloWorld_TriggerSkill2.
misty.RegisterEvent("FaceRecognition", "FaceRecognition", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");

misty.StartFaceRecognition();
```

Next, we want to register for another event, `BackTOF`. This event triggers whenever the rear time-of-flight sensor is activated and passes our property test. This in turn kicks off the third skill, `HelloWorld_TriggerSkill3.js`.

Start by calling `RegisterEvent` and registering for `TimeOfFlight` as `BackTOF`. Pass in `5000` for `debounceMS`, set `keepAlive` to `true`, and specify the callback rule as `Synchronous`. Similar to our previous registration, pass in the GUID for our third skill for the last parameter (in our case, `f6cc6095-ae40-4507-a9ef-4c7638bf3ad5). Above our registration call, add two property tests to confirm we’re only receiving data from our rear-facing time of flight sensor and that the distance an object is detected is less than 0.5 meters. 

```javascript
// Return data only from rear-facing TOF sensors
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
// Return data only when an object is closer than 0.5m
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<", 0.5, "double");

// Register for TimeOfFlight events.
// For the callback, pass in the GUID for
// HelloWorld_TriggerSkill3.
misty.RegisterEvent("BackTOF", "TimeOfFlight", 5000, true, "Synchronous", "f6cc6095-ae40-4507-a9ef-4c7638bf3ad5");
```

With both of our event registrations finished, our “parent” skill is complete. Note that we don’t create callbacks for the events in the “parent” skill -- those are handled in the “child” skills.

For reference, here is the entire skill file for `HelloWorld_TriggerSkill1.js`.

```javascript
// Return only the PersonName property
misty.AddReturnProperty("FaceRecognition", "PersonName");

// Register for FaceRecognition events.
// For the callback, pass in the GUID for
// HelloWorld_TriggerSkill2.
misty.RegisterEvent("FaceRecognition", "FaceRecognition", 5000, true, "Synchronous", "28c7cb66-91d4-4c8f-a8af-bb667ce18099");

misty.StartFaceRecognition();

// Return data only from rear-facing TOF sensors
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
// Return data only when an object is closer than 0.5m
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<", 0.5, "double");

// Register for TimeOfFlight events.
// For the callback, pass in the GUID for
// HelloWorld_TriggerSkill3.
misty.RegisterEvent("BackTOF", "TimeOfFlight", 5000, true, "Synchronous", "f6cc6095-ae40-4507-a9ef-4c7638bf3ad5");
```

As discussed above, the first "child" skill handles face recognition events. We start by defining a function for the callback (automatically named `_<Event>`) and passing in an argument to hold the data from the event. Within the callback, send a debug message to notify the user that the new skill has been triggered.

```javascript
function _FaceRecognition(data) {
   misty.Debug("TriggerSkill part 2 has been triggered.");
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Because we designated the GUID for _this_ skill (`HelloWorld_TriggerSkill2.js`) as the skill to call back in the registration call for `FaceRecognition` within our “parent” skill, this skill starts automatically when the event callback is triggered.
{{box op="end"}}

Next, define a variable, `personName` to hold the name of the face detected (or “unknown person” if the face was not recognized). You can access this information within `data.AdditionalResults`. 

```javascript
// Store the name of the detected face
let personName = data.AdditionalResults[0];
```

Then, use an if statement to check if `personName` is equal to unknown person. If so, the face was not recognized. In this case, we want to send a command to change the LED to red and send a debug message from Misty saying “I don’t know you…”. Otherwise, the face was recognized, and we send a command to change the LED to green and send a debug message greeting the user by name.

```javascript
if (personName == "unknown person") {
    // Change LED
    misty.ChangeLED(255, 0, 0); // red
    misty.Debug("I don't know you...");
}
else {
    // Change LED
    misty.ChangeLED(0, 255, 0); // green
    misty.Debug("Hello there " + personName + "!");
}
```

You’ll remember that earlier when we registered for our face recognition event, we set `debounceMS` to `5000`. The reason for this is that we need to give the triggered skill time to process the information, then automatically cancel before the callback is triggered again. The triggered skill can be triggered multiple times from the “parent” skill, _but only if it isn’t already running_. If the event callback is triggered while `HelloWorld_TriggerSkill2.js` is still running, it does not run again. _This is because you cannot have multiple instances of the same skill running at once._

For reference, here is the entire skill file for `HelloWorld_TriggerSkill2.js`.

```javascript
// callback for face recognition event
function _FaceRecognition(data) {
    // Signal that new skill has been triggered.
    misty.Debug("TriggerSkill part 2 has been triggered.");
    // Store the name of the detected face
    let personName = data.AdditionalResults[0];
    if (personName == "unknown person") {
        // Change LED
        misty.ChangeLED(255, 0, 0); // red
        misty.Debug("I don't know you...");
    }
    else {
        // Change LED
        misty.ChangeLED(0, 255, 0); // green
        misty.Debug("Hello there " + personName + "!");
    }
}
```

The third skill is designated for our time-of-flight event. Start by defining a function for the callback for `BackTOF`. Pass in an argument to access the data. Then, within the callback write a debug message indicating that skill number three has been triggered.

```javascript
// TimeOfFlight callback
function _BackTOF(data) {
    // Signal that new skill has been triggered
    misty.Debug("TriggerSkill part 3 has been triggered.");
}
```

Define a variable `distance` to hold the value of the distance an object was detected. We can access this from our property test results (contained in the response). Dig into the results to locate the value we want.

```javascript
// Store the distance of the detected object
let distance = data.PropertyTestResults[1].PropertyParent.DistanceInMeters;
```

Then, use an `if` statement to check that the distance is less than `0.1m`. If so, play an “irritated” sounding audio clip, send a debug message indicating the distance an object detected was ‘too close’, and have Misty drive forward a short distance. Otherwise, send a command to play a ‘happy’ sounding clip, and send a debug message indicating the object is far enough away (it isn’t invading Misty’s personal space).

```javascript
if (distance < 0.1) {
    // Play irritated audio clip
    misty.PlayAudio("002-Ahhh.wav", 100);
    misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
    // Drive forward
    misty.DriveTime(50, 0, 1000);
}
else {
    // Play happy audio clip
    misty.PlayAudio("004-WhaooooO.wav", 100);
    misty.Debug("An object was detected " + distance + " meters behind me. That's okay.");
}
```

Just like before in our second skill, we specified the callback to trigger once every 5000 ms to give the triggered skill time to cancel before being started again. 

For reference, here is the entire skill file for `HelloWorld_TriggerSkill3.js`.

```javascript
// TimeOfFlight callback
function _BackTOF(data) {
    // Signal that new skill has been triggered
    misty.Debug("TriggerSkill part 3 has been triggered.");
    // Store the distance of the detected object
    let distance = data.PropertyTestResults[1].PropertyParent.DistanceInMeters;
    // Check the value of distance
    if (distance < 0.1) {
        // Play irritated audio clip
        misty.PlayAudio("002-Ahhh.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
        // Drive forward
        misty.DriveTime(50, 0, 1000);
    }
    else {
        // Play happy audio clip
        misty.PlayAudio("004-WhaooooO.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's okay.");
    }
}
```

Congratulations, triggering callbacks across skills is a valuable tool you can add to your Misty-programming experience! Save the code files, and see the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

[Download the code files for this tutorial from GitHub.](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Trigger%20Skill)