---
title: Tutorials
layout: onboarding.hbs
columns: three
order: 2
---

# {{title}}

In these tutorials you will learne verything you need to know to begin writing robust, intricate local skills for you rMisty robot. Each tutorial introuces a new aspect of skill development to expose the full breadth of Misty's capabilities and potential.

## Driving Misty

In this tutorial we create a simple skill that changes Misty’s chest LED, drives her forward for 10 seconds, and tells her to stop if she detects an object in her path. We go over how to send commands, subscribe to sensor events, and structure your skill data. Let’s get started!

The code for local skills is comprised of two parts. The logic used to define how the skill functions is located in a `.js` file located in the `/Code` directory under `/Skills`. In addition to this, there is a corresponding `.json` file in the `/Meta` directory. These files must have the same name. Create a `.js` file and call it `HelloWorld_TimeOfFlight.js`. Then create a `.json` file and give it the same name. When the skill is complete, we use Skill Runner to upload these files to the directories specified above.

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

### Writing the Code

To issue any command to Misty in the local environment, we call methods on the `misty` object. Start by writing a debug message so we’re notified when the skill is started. To do this, call `misty.Debug()` and pass in a meaningful message. These messages will show up in your browser’s JavaScript console if you’re using the [Skill Runner](https://www.skill-runner.mistyrobotics.com) tool to run the skill.

```JavaScript
misty.Debug("starting skill helloworld_timeofflight");
```

Now let’s use the very simple `misty.ChangeLED()` function to control the color of your robot’s chest LED. The method takes three arguments, which correspond to the RGB parameters required to specify the LED color as described [here](https://docs.mistyrobotics.com/apis/api-reference/rest/#changeled). The code below will turn the LED green (for go!)

```JavaScript
misty.ChangeLED(0, 255, 0);
```

Then, we issue one of Misty’s drive commands, `DriveTime()`. The `DriveTime()` command accepts three parameters: `l`inearVelocity`, `a`ngularVelocity`, and `time`. You can learn more about how these parameters will affect Misty’s movement in the documentation. In this case, we want Misty to drive forward slowly in a straight line for 10 seconds, so we set `linearVelocity` = 10, `angularVelocity` = 0, and `time` = 10000 (the unit of measure for this parameter is milliseconds). 

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

The second property test checks ensures we are only looking at data where the distance to the object detected is less than 0.2m. We don’t want our skill to react to things further away than about 6 inches.

```JavaScript
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
```

Whenever we subscribe to an event, we receive the data back within a callback function. This function is triggered whenever messages are sent that pass the property tests. The callback is automatically given the name `_<event>`. So in this case, the callback name is automatically set to `_FrontTOF()`. The data is passed directly into the callback and can accessed through an argument passed into `_`FrontTOF()`, which we’ll call `data`.

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

Congratulations! You have just written a local skill for Misty. See the documentation on using Skill Runner or the REST API to load your skill data onto Misty and run the skill from the browser. See the full contents of the `HelloWorld_TimeOfFlight.js` file here for reference:

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

## Playing Audio

In this tutorial, we get the list of audio files stored on Misty and play one at random.

### Writing the Meta File

In the meta file for this skill, set the value of `Name` to `"HelloWorld_PlayAudio`". Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_PlayAudio.json`.

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

### Writing the Code

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

Note: All of this logic needs to be contained within `_GetListOfAudioClips()` to ensure that it does not run until the audio list has been populated. See the complete `HelloWorld_PlayAudio.js` skill file here:

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

## Recording Audio
In this tutorial we learn how to record audio and play it back to the user. This involves two very simple commands: `StartRecordingAudio()` and `StopRecordingAudio()`. 

### Writing the Meta File

In the meta file for this skill, set the value of `Name` to `"HelloWorld_RecordAudio`". Use the values in the example to fill out the remaining parameters. Save this file with the name `HelloWorld_RecordAudio.json`.

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

See the complete `HelloWorld_RecordAudio.js` file below for reference.

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