---
title: Tutorials
layout: coding.hbs
columns: three
order: 4
---

# {{title}}

The tutorials in this section provide detailed instructions on writing JavaScript skills that use different features of Misty II and her JavaScript SDK. Each tutorial introduces a new aspect of JavaScript skill development to expose the full breadth of Misty's capabilities and potential.

## Time-of-Flight

In this tutorial we create a simple skill that changes Misty’s chest LED, drives her forward for 10 seconds, and tells her to stop if she detects an object in her path. We go over how to send commands, subscribe to sensor events, and structure your skill data. Let’s get started!

When you write a skill using Misty's JavaScript SDK, the following elements are required:

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

Now let’s use the very simple `misty.ChangeLED()` function to control the color of your robot’s chest LED. The method takes three arguments, which correspond to the RGB parameters required to specify the LED color as described [here](../../../misty-ii/rest-api/api-reference/#changeled). The code below will turn the LED green (for go!)

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

Save the code file with the name `HelloWorld_TimeOfFlight.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill). 

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
**Note:** All of this logic needs to be contained within `_GetAudioList()` to ensure that it does not run until the audio list has been populated.
{{box op="end"}} 

Save the code file with the name `HelloWorld_PlayAudio.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

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

Save the code file with the name `HelloWorld_RecordAudio.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

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

   misty.PlayAudio("s_Joy3.wav");
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

Save the code file with the name `HelloWorld_FaceDetection.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

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
    misty.PlayAudio("s_Joy3.wav");
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

Save the code file with the name `HelloWorld_TimerEvent.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

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

Even though your skills run locally on Misty, they can still send requests to use external data from the internet. This sample skill fetches the current weather conditions of a designated city, then prints those conditions in a debug message. To do this, we use the `misty.SendExternalRequest()` command to send a GET request to the [Weatherstack API](https://weatherstack.com/) to obtain the data.

To run this skill, you must first create an account with Weatherstack and generate an access key to use with their API. You can [create an account with Weatherstack on their web page](https://weatherstack.com/signup/free).

### Writing the Meta File

Once you have your access key from Weatherstack, you can set up the meta file for the skill. For this tutorial, we set the API key and the city to query as parameters in the JSON meta file. Create a new meta file for this skill, and refer to the following example to fill out the parameters. In the `Parameters` object, replace the value of the`key` parameter with your Weatherstack API access key, and change the value of the `city` key to a city of your choosing. Save this file with the name `HelloWorld_ExternalRequest.json`.

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
    "Parameters": {
        "key": "<your-Weatherstack-api-key>",
        "city": "Boulder"
    }
}
```

### Writing the Code File

The code file is simple, focusing on the use of the `misty.SendExternalRequest()` method. As a reminder, the syntax for the  `misty.SendExternalRequest()` method is as follows:

```javascript
// Syntax
misty.SendExternalRequest(string method, string resource, [string authorizationType], [string token], [string arguments], [bool save], [bool applyAssetAfterSaving], [string fileName], [string contentType], [string callback], [string callbackRule], [string skillToCall], [int prePauseMs], [int postPauseMs]);
```

In this skill we are sending a `GET` request, so we use the string `GET` for the first (`method`) parameter.

The second parameter (`resource`) should contain the full URL of the resource to access. In this example, the URL includes the Weatherstack API base URL, our Weatherstack access key, and the name of the city to query. Values for the access key and the city we want to use are stored in the `Parameters` object we defined in the JSON meta file. To reference these values from the meta file in our skill code, we can use the globally available `_params` object.

In our meta file, the `city` parameter holds the name of the city we want query, and the `key` parameter holds the access key from Weatherstack. Therefore, here in the code file, `_params.key` holds our access key, and `_params.city` holds the string `Boulder`. We can append these values to the Weatherstack API base URL when we pass in a value for the `resource` argument for `misty.SendExternalRequest()`. The value for that argument looks like this:

```javascript
"http://api.weatherstack.com/current?access_key="+_params.key+"&query="+_params.city
```

When you send requests that require additional authorization, or when you want to return image or audio file data, you need to make use of the other arguments in `misty.SendExternalRequest()`. In this example, because Weatherstack doesn't require additional authorization, and because our data comes back as a JSON object, we can leave the remaining arguments empty.

The final form of `misty.SendExternalRequest()` in this tutorial is:

```javascript
misty.SendExternalRequest(
    "GET",
    "http://api.weatherstack.com/current?access_key="+_params.key+"&query="+_params.city
    )
```

When Misty receives response data from Weatherstack, that data is passed into the callback (which is automatically set to `_SendExternalRequest()`):

```javascript
function _SendExternalRequest(data) {

}
```

In the callback, we parse the response data to find the current condition in the queried city. We can assign that condition to a variable as shown here:

```javascript
    _data = JSON.parse(data.Result.ResponseObject.Data)
    _condition = _data.current.weather_descriptions[0].toLowerCase();
```

The final step is to have Misty send us the data back through a debug message:

```javascript
misty.Debug("Misty here! Just letting you know it's " + _condition + " in " + _params.city);
```

The complete code file for the skill should look like this:

```javascript
// Send a request to the Weatherstack API, using parameters from the
// skill's JSON meta file for the access_key and city params in the
// resource URL.
misty.SendExternalRequest(
    "GET",
    "http://api.weatherstack.com/current?access_key="+_params.key+"&query="+_params.city
    )

// Parse the response data to get the current condition in _params.city
// and print this in a string to the dev console in the Skill Runner
// web page.
function _SendExternalRequest(data) {
    _data = JSON.parse(data.Result.ResponseObject.Data)
    _condition = _data.current.weather_descriptions[0].toLowerCase();
    misty.Debug("Misty here! Just letting you know it's " + _condition + " in " + _params.city);
}
```

Save the code file with the name `HelloWorld_ExternalRequest.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

You can also [download the code for this skill from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/External%20Requests).

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

We also want to add a return property check above the registration call, to return just the property `Label` for use in our callback. Pass in the name of the event first, then the property we want.

```json
misty.AddReturnProperty("FaceRecognition", "Label");
```

Finally, we need to send the command to start face recognition as well. This command tells Misty to start looking for a face to recognize (in tandem with the   `FaceRecognition` event subscription).

```javascript
 misty.StartFaceRecognition();
```

Putting the pieces together, shown below is first half of the parent skill; the commands relating to face recognition.

```javascript
// Return only the Label property
misty.AddReturnProperty("FaceRecognition", "Label");

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
// Return only the Label property
misty.AddReturnProperty("FaceRecognition", "Label");

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

As discussed above, the first “child” skill handles face recognition events. We start by defining a function for the callback (automatically named `_<Event>`) and passing in an argument to hold the data from the event. Within the callback, send a debug message to notify the user that the new skill has been triggered.

```javascript
function _FaceRecognition(data) {
   misty.Debug(“TriggerSkill part 2 has been triggered.”);
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Because we designated the GUID for _this_ skill (`HelloWorld_TriggerSkill2.js`) as the skill to call back in the registration call for `FaceRecognition` within our "parent" skill, this skill starts automatically when the event callback is triggered.
{{box op="end"}}

Next, define a variable, `label`, to hold the label of the face detected (or `"unknown person"` if the face was not recognized). You can access this information within `data.AdditionalResults`. 

```javascript
// Store the name of the detected face
let label = data.AdditionalResults[0];
```

Then, use an if statement to check if `label` is equal to unknown person. If so, the face was not recognized. In this case, we want to send a command to change the LED to red and send a debug message from Misty saying “I don’t know you…”. Otherwise, the face was recognized, and we send a command to change the LED to green and send a debug message greeting the user by name.

```javascript
if (label == "unknown person") {
    // Change LED
    misty.ChangeLED(255, 0, 0); // red
    misty.Debug("I don't know you...");
}
else {
    // Change LED
    misty.ChangeLED(0, 255, 0); // green
    misty.Debug("Hello there " + label + "!");
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
    let label = data.AdditionalResults[0];
    if (label == "unknown person") {
        // Change LED
        misty.ChangeLED(255, 0, 0); // red
        misty.Debug("I don't know you...");
    }
    else {
        // Change LED
        misty.ChangeLED(0, 255, 0); // green
        misty.Debug("Hello there " + label + "!");
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
    misty.PlayAudio("s_Anger.wav", 100);
    misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
    // Drive forward
    misty.DriveTime(50, 0, 1000);
}
else {
    // Play happy audio clip
    misty.PlayAudio("s_Joy.wav", 100);
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
        misty.PlayAudio("s_Anger.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's too close!");
        // Drive forward
        misty.DriveTime(50, 0, 1000);
    }
    else {
        // Play happy audio clip
        misty.PlayAudio("s_Joy.wav", 100);
        misty.Debug("An object was detected " + distance + " meters behind me. That's okay.");
    }
}
```

Congratulations! Triggering callbacks across skills is a valuable tool you can add to your Misty-programming toolkit. Save the code files, and see the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill).

[Download the code files for this tutorial from GitHub.](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Trigger%20Skill)

## Head & Arm Movement

In this tutorial we write a skill that moves Misty's head and arms. There are a variety of movement commands we could use, each taking different types of values (`position`, `degrees`, or `radians`). In this tutorial, we’re using the set of Misty’s movement commands that use `position` values.

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

```javascript
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100);
```

Above where we register to the event in our code, we can add property comparison tests to filter the data we receive. In this example, the first property test checks that we are only looking at data from front-facing time-of-flight sensors. The field we’re testing is `SensorPosition` and we’re checking that the data received is not coming from the time-of-flight sensors in the back of Misty’s base. Therefore, we only let through messages where `SensorPosition !== Back`.

```javascript
misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
```

The second property test ensures we are only looking at data where the distance to the object detected is less than 0.2 meters. We don’t want Misty to move her head until she detects something closer than about 6 inches.

```javascript
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
```

When we receive any of our specified time-of-flight events, the callback `_FrontTOF()` runs. It’s in `_FrontTOF()` that we’re going to perform the actual head movement. This function is triggered whenever messages are sent that pass the property tests. The callback is automatically given the name `_<event>`, so in this case, the callback name is set to `_FrontTOF()`. For more on events and callbacks, see [Data Handling: Events & Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#data-handling-events-amp-callbacks).


```javascript
function _FrontTOF() {

}
```

Inside the `_FrontTOF()` callback, we call [`misty.MoveHeadDegrees()`](../../../misty-ii/javascript-sdk/api-reference/#misty-moveheaddegrees). We pass in values for each axis of movement (`pitch`, `roll`, and `yaw`), for `velocity` or `duration`, and for the optional `prePauseMs` and `postPauseMs` arguments.

For example, in the following command we tell Misty to tilt her head upward to the limit of her motion in the `pitch` direction (`-40`), but not to move along the `roll` (`0`) or `yaw` (`0`) axes. We also tell Misty to move her head at a moderate velocity (`60`), and we pass in a `null` value for the `duration` argument. (If we didn't specify a `velocity`, we could use `duration` to indicate how long the movement should take.) We then specify `0` and `1500` for the `prePauseMs` and `postPauseMs` values to tell Misty to pause for a second and a half after executing the command.

```javascript
misty.MoveHeadDegrees(-40, 0, 0, 60, null, 0, 1500);
```

Within the `_FrontTOF()` callback, we actually call `misty.MoveHeadDegrees()` multiple times with a variety of parameters, so we can move Misty’s head in different ways. To make things interesting, we can also add in commands to change the LED and make sounds in between the head movement commands.

```javascript
misty.ChangeLED(0, 255, 255); // aqua
misty.PlayAudio("s_Awe.wav");

// pitch
misty.MoveHeadDegrees(-40, 0, 0, 90, null, 0, 1500); // pitch up
misty.MoveHeadDegrees(26, 0, 0, 90, null, 0, 1500); // pitch down
misty.MoveHeadDegrees(0, 0, 0, 90, null, 0, 1500); // pitch center

misty.ChangeLED(255, 0, 255); // magenta
misty.PlayAudio("s_Awe2.wav");

// yaw
misty.MoveHeadDegrees(0, 0, -81, 90, null, 0, 1500); // yaw left
misty.MoveHeadDegrees(0, 0, 81, 90, null, 0, 1500); // yaw right
misty.MoveHeadDegrees(0, 0, 0, 90, null, 0, 1500); // yaw center

misty.ChangeLED(255, 255, 0); // yellow
misty.PlayAudio("s_Awe3.wav");

// roll
misty.MoveHeadDegrees(0, -40, 0, 90, null, 0, 1500); // roll left
misty.MoveHeadDegrees(0, 40, 0, 90, null, 0, 1500); // roll right
misty.MoveHeadDegrees(0, 0, 0, 90, null, 0, 1500); // roll center

misty.ChangeLED(0, 0, 0); // off
misty.PlayAudio("s_DisorientedConfused.wav"");
```

#### Moving Misty's Arms

Now that we’ve moved Misty’s head in response to sensing things in front of her, we can exercise arm movement. We want Misty to move her arms when she senses something at a given distance behind her. To do this, within the `_FrontTOF()` callback we register for back time-of-flight events.

```javascript
// register for back TOF and add property tests
misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("BackTOF", "TimeOfFlight", 100);
```

We register for `BackTOF` events by adding property tests checking that `SensorPosition` equals `Back` and the `DistanceInMeters` is less than or equal to `0.2`. We then call `misty.RegisterEvent()` and pass in the name for the event, `BackTOF`. When `BackTOF` is triggered, the callback runs. And it’s within the `_BackTOF()` callback that we send the actual commands to move Misty’s arms.

Like head movement, arm movement can be controlled three ways, by position, radians, or degrees. In this example, we’ll use position via the `misty.MoveArmDegrees()` command. With this command you can designate which arm to move (`left` or `right`), the position to move it to (a range from `90` to `-29`), the velocity or duration, and provide optional `prePauseMs` and `postPauseMs` values (in ms). Here, we tell Misty to move her left arm up at a moderate speed to the limit of her motion.

```javascript
misty.MoveArmDegrees("left", -29, 60, null, 0, 1500);
```

As we did with head movement, within the callback we can call `misty.MoveArmDegrees()` multiple times with different parameters to move her arms in a variety of ways. And we can again include commands to change the LED and make sounds in between the arm movement commands. Once the movements are finished, we log a debug message indicating the skill is complete.

```javascript
function _BackTOF() {
    misty.ChangeLED(0, 255, 0) // lime
    misty.PlayAudio("s_Joy.wav");

    // left
    misty.MoveArmDegrees("left", -29, 60, null, 0, 1500); // up
    misty.MoveArmDegrees("left", 90, 60, null, 0, 1500); // down

    misty.ChangeLED(128, 0, 0) // maroon
    misty.PlayAudio("s_Joy2.wav");

    // right
    misty.MoveArmDegrees("right", -29, 60, null, 0, 1500); // up
    misty.MoveArmDegrees("right", 90, 60, null, 0, 1500); // down

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudio("s_Joy3.wav");

    misty.Debug("ending skill HelloWorld_HeadArms");
}
```

When the skill runs, Misty registers for `FrontTOF` events. When an event is triggered that passes the specified property tests, she moves her head and registers for `BackTOF` events. When a `BackTOF` event occurs that passes the specified property tests, she moves 
her arms and ends skill execution.

Save the code file with the name `HelloWorld_HeadArms.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill). 

See the complete JavaScript code below or [download the code for this tutorial from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Head%20%26%20Arm%20Movement).

```javascript
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
    misty.PlayAudio("s_Awe.wav");

    // pitch
    misty.MoveHeadDegrees(-40, 0, 0, 60, 0, 1500); // pitch up
    misty.MoveHeadDegrees(26, 0, 0, 60, 0, 1500); // pitch down
    misty.MoveHeadDegrees(0, 0, 0, 60, 0, 1500); // pitch center

    misty.ChangeLED(255, 0, 255); // magenta
    misty.PlayAudio("s_Awe2.wav");

    // yaw
    misty.MoveHeadDegrees(0, 0, -81, 60, 0, 1500); // yaw left
    misty.MoveHeadDegrees(0, 0, 81, 60, 0, 1500); // yaw right
    misty.MoveHeadDegrees(0, 0, 0, 60, 0, 1500); // yaw center

    misty.ChangeLED(255, 255, 0); // yellow
    misty.PlayAudio("s_Awe3.wav");

    // roll
    misty.MoveHeadDegrees(0, -40, 0, 60, 0, 1500); // roll left
    misty.MoveHeadDegrees(0, 40, 0, 60, 0, 1500); // roll right
    misty.MoveHeadDegrees(0, 0, 0, 60, 0, 1500); // roll center

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudio("s_DisorientedConfused.wav");

    // register for back TOF and add property tests
    misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
    misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.2, "double");
    misty.RegisterEvent("BackTOF", "TimeOfFlight", 100);
}

// back TOF callback, arms
function _BackTOF() {
    misty.ChangeLED(0, 255, 0) // lime
    misty.PlayAudio("s_Joy.wav");

    // left
    misty.MoveArmDegrees("left", -29, 60, 0, 1500); // up
    misty.MoveArmDegrees("left", 90, 60, 0, 1500); // down

    misty.ChangeLED(128, 0, 0) // maroon
    misty.PlayAudio("s_Joy2.wav");

    // right
    misty.MoveArmDegrees("right", -29, 60, 0, 1500); // up
    misty.MoveArmDegrees("right", 90, 60, 0, 1500); // down

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudio("s_Joy3.wav");

    misty.Debug("ending skill HelloWorld_HeadArms");
}
```

## Bump Sensors

In this tutorial we learn how to interact with Misty’s bump sensors. We use a ["Get" type of command](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#get-commands) to fetch the list of audio clips on Misty's local storage, and we assign different audio files to unique global variables. We then register for bump sensor events and write logic to have Misty play a different audio clip when you press each of her bump sensors.

### Writing the Meta File

Create a new `.json` meta file for this skill. Set the value of `Name` to `"HelloWorld_BumpSensors"`. Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_BumpSensors.json`.

```json
{
    "Name": "HelloWorld_BumpSensors",
    "UniqueId": "c07db3af-ee28-4d1f-b3c9-fc67c1e8246c",
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

```javascript
misty.Debug("HelloWorld_BumpSensors is running")
```

Then call `misty.GetAudioList()` to fetch the list of audio clips on Misty's local storage. Data returned by "Get" type commands must be passed into a callback function to be used in your skill. For the first parameter of `misty.GetAudioList()`, designate a name for the callback function to run when the audio data is ready (`_GetAudioList`). Pass `"synchronous"` for the second parameter (`callbackRule`). 

```javascript
misty.GetAudioList("_GetAudioList","synchronous");
```

The `_GetAudioList()` callback triggers when the data from `misty.GetAudioList()` is ready. We use this callback to handle the data and make it available to the rest of our skill. For more information about data and callbacks, see ["Get" Data Callbacks](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks)

Next write the logic for the `_GetAudioList()` callback function. Declare the function and pass in a parameter (here we use `data`) to access the audio data returned by `misty.GetAudioList()`.

```javascript
function _GetAudioList(data) {

}
```

When the list of audio clips is available, we can assign the names of different audio files to four unique global variables. We access the names of audio files by digging into the response data from `misty.GetAudioList()`, which contains an array of audio file data. When using Misty's JavaScript SDK to write a skill, global variables are prefixed with an underscore (i.e. `_globalVar`) and do not require identifiers such as `var`, `let`, or `const`.

In the `_GetAudioList()` callback, assign the first four results in the audio data array to four unique global variables. These variables can be accessed from within the callback we write to handle bump sensor events, where we'll map them to each of Misty's bump sensors.

```javascript
_audio1 = data.Result[0].Name;
_audio2 = data.Result[1].Name;
_audio3 = data.Result[2].Name;
_audio4 = data.Result[3].Name;
```

Next we register for bump sensor events. Call `misty.RegisterEvent()` and pass in a name to designate for the event (for simplicity, we use `BumpSensor`). Next, pass in the message type to subscribe to (also `BumpSensor`), a small value for the `debounce` parameter (`200`), and `true` for `keepAlive` to ensure the event does not unregister when the callback is triggered.

```javascript
misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);
```

Above the registration command, use `misty.AddPropertyTest()` to check that `isContacted == true`. Bump sensor messages are sent both when a sensor is pressed **and** when it’s released. This property test filters out data sent when sensors are released, so the `_BumpSensor()` callback only triggers when a bump sensor is pressed. The value of `isContacted` is a boolean, so the fifth parameter we pass to `misty.AddPropertyTest()` must be `boolean`.

```javascript
misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
```

The callback for our bump sensor event triggers when any of Misty's sensors are pressed. To determine which sensor is activated, we use the `sensorName` property sent with each bump sensor event message. To access this data in the `_BumpSensor()` callback, call `misty.AddReturnProperty()` above the event registration command. Pass in the name of the event (`BumpSensor`) and the property to return information about (`sensorName`).
 
```javascript
misty.AddReturnProperty("BumpSensor", "sensorName");
```

The full `_GetAudioList()` callback looks like this.

```javascript
function _GetAudioList(data) {
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

```javascript
function _BumpSensor(data) {
    let sensorName = data.AdditionalResults[0];
}
```

We want to issue a `misty.PlayAudio()` command with a different audio file each time a bump sensor activates. To do this, write a `switch` statement and pass in the `sensorName` variable. The value of `sensorName` will be string indicating which of the four bump sensors was pressed: `"Bump_FrontRight"`, `"Bump_FrontLeft"`, `"Bump_RearRight"`, or `"Bump_RearLeft"`. Declare a case for each of these values. Within each case, send a debug message indicating which sensor was pressed. Then issue a `misty.PlayAudio()` command and pass in one of the global variables to which we assigned an audio file in the `_GetAudioList()` callback. For the second parameter (`volume`), pass an integer between 1 and 100.

```javascript
switch (sensorName) {
    case "Bump_FrontRight":
        misty.Debug("front right bump sensor was pressed")
        misty.PlayAudio(_audio1, 75);
        break

    case "Bump_FrontLeft":
        misty.Debug("front left bump sensor was pressed")
        misty.PlayAudio(_audio2, 75);
        break

    case "Bump_RearRight":
        misty.Debug("rear right bump sensor was pressed")
        misty.PlayAudio(_audio3, 75);
        break

    case "Bump_RearLeft":
        misty.Debug("rear left bump sensor was pressed")
        misty.PlayAudio(_audio4, 75);
        break
}
```

The `_BumpSensor()` callback triggers when a bump sensor event passes our property comparison test. When this callback triggers, we determine which sensor was pressed and issue a command to play a specific audio file. The entire `_BumpSensor()` callback looks like this:

```javascript
function _BumpSensor(data) {
    let sensorName = data.AdditionalResults[0];

    switch (sensorName) {
        case "Bump_FrontRight":
            misty.Debug("front right bump sensor was pressed")
            misty.PlayAudio(_audio1, 75);
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor was pressed")
            misty.PlayAudio(_audio2, 75);
            break

        case "Bump_RearRight":
            misty.Debug("rear right bump sensor was pressed")
            misty.PlayAudio(_audio3, 75);
            break

        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor was pressed")
            misty.PlayAudio(_audio4, 75);
            break
    }
}
```

When this skill runs, Misty retrieves the list of audio clips in her local storage and associates the names of four audio files with unique global variables. She then registers for bump sensor events. Each time an event occurs, Misty determines which bump sensor was pressed and plays the sound associated with that sensor.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default on-robot JavaScript skills timeout after 300 seconds, so this skill automatically stops executing after 5 minutes. This duration can be changed by changing the value of the `TimeoutInSeconds` property in the meta file.
{{box op="end"}} 

Save the code file with the name `HelloWorld_BumpSensors.js`. See the documentation on using [Misty Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner) or the REST API to [load your skill data onto Misty and run the skill from the browser](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill). 

See the complete JavaScript code below or [download the code files from GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Bump%20Sensors).

```javascript
misty.Debug("HelloWorld_BumpSensors is running")

// Fetch list of audio clips
misty.GetAudioList("_GetAudioList","synchronous");

// Handle the list of audio clips
function _GetAudioList(data) {
   // Assign audio files from the list to global variables
   _audio1 = data.Result[0].Name;
   _audio2 = data.Result[1].Name;
   _audio3 = data.Result[2].Name;
   _audio4 = data.Result[3].Name;

   // Return data when a bump sensor is pressed
   misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
   // Return the sensorName property of
   // BumpSensor events
   misty.AddReturnProperty("BumpSensor", "sensorName");
   // Register for BumpSensor events
   misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);
}

// Handle BumpSensor event data
function _BumpSensor(data) {
    // Store the name of the touched sensor
    let sensorName = data.AdditionalResults[0];

    // Play a different audio clip when
    // each sensor is pressed
    switch (sensorName) {

        case "Bump_FrontRight":
            misty.Debug("front right bump sensor pressed")
            misty.PlayAudio(_audio1, 75);
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed")
            misty.PlayAudio(_audio2, 75);
            break

        case "Bump_RearRight":
            misty.Debug("rear right bump sensor pressed")
            misty.PlayAudio(_audio3, 75);
            break

        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor pressed")
            misty.PlayAudio(_audio4, 75);
            break
    }
}
```