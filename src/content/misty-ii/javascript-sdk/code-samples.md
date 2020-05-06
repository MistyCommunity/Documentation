---
title: Code Samples
layout: coding.hbs
columns: three
order: 2
---

# {{title}}

This document provides code samples for Misty's JavaScript SDK. Each sample shows how to use a different element of the robot's functionality in a JavaScript skill. You can run many of these samples on your robot without any modification, or you can refer to these samples when coding similar functionality in your own JavaScript skills for Misty II.

To run the code samples from this page on your robot, you can [download the skill files for each sample from the Misty Community JavaScript-SDK repository on GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Sample%20Code). Install the skill files on your robot by [uploading them to Misty via the Skill Runner](../../../tools-&-apps/web-based-tools/skill-runner/#uploading-a-new-skill) web tool. Alternately, refer to these code samples (or copy and paste them into your own skills) when working on similar functionality in your own skill development.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This collection of code samples will grow as we add new features and functionality to the Misty platform. If you can't find a sample you're looking for, or if you'd like to request a sample that doesn't exist yet, you can let us know by posting in the [Community Forums](https://community.mistyrobotics.com/).
{{box op="end"}}

## Cameras & Computer Vision

Misty's JavaScript API provides methods for facial detection and recognition, taking pictures, recording videos, and other functionality related to the robot's cameras and computer vision system. The code samples in this section show how to use some of these capabilities in your JavaScript skills.

### faceDetection
This sample shows how to code Misty to react when she detects a face in her field of view.

In this sample, we use the `misty.RegisterEvent()` method from Misty's JavaScript API to register for face recognition (`FaceRecognition`) event messages. Data from `FaceRecognition` event messages gets passed into a callback function where we write the code that defines how the robot should respond. In this case, Misty responds by raising her arms, showing her happy eyes, and changing the color of her chest LED.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
// Sets Misty's arms and head to a neutral position, and prints a debug
// message that the movement is underway.
misty.Debug("Moving arms and head to neutral position");
_timeoutToNormal();

// Starts Misty's face detection process, so we can register for
// (and receive) FaceRecognition event messages.
misty.StartFaceDetection();

// Sets up our FaceRecognition event listener.
function registerFaceDetection() {
    // Creates a property test for FaceDetect event messages to check
    // whether the message has a "Label" value before passing
    // the event message into the callback.
    misty.AddPropertyTest("FaceDetect", "Label", "exists", "", "string");
    // Registers a new event listener for FaceRecognition events. (We
    // call this event listener FaceDetect, but you can use any name
    // you like. Giving event listeners a custom name means you can
    // create multiple event listeners for the same type of event in a
    // single skill.) Our FaceDetect event listener has a debounce of
    // 1000 ms, and we set the fourth argument (keepAlive) to true,
    // which tells the system to keep listening for FaceDetect events
    // after the first message comes back.
    misty.RegisterEvent("FaceDetect", "FaceRecognition", 1000, true);
}

// Defines how Misty should respond to FaceDetect event messages. Data
// from each FaceDetect event is passed into this callback function.
function _FaceDetect(data) {
    // Prints a debug message with FaceDetect event data
    misty.Debug(JSON.stringify(data));
    misty.ChangeLED(148, 0, 211); // Changes LED to purple
    misty.DisplayImage("e_Joy.jpg"); // Displays happy eyes
    misty.MoveArmDegrees("both", -80, 100); // Raises both arms

    // Registers for a timer event to invoke the _timeoutToNormal
    // callback function after 5000 milliseconds.
    misty.RegisterTimerEvent("timeoutToNormal", 5000, false);
}

registerFaceDetection();

// Sets Misty's arms, head, LED, and display image to a neutral
// configuration.
function _timeoutToNormal() {
    misty.Pause(100);
    misty.MoveHeadDegrees(0, 0, 0, 40); // Faces head forward
    misty.MoveArmDegrees("both", 70, 100); // Lowers arms
    misty.ChangeLED(0, 255, 0); // Changes LED to green
    misty.DisplayImage("e_DefaultContent.jpg"); // Show default eyes
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, when the system sends an event message, our skill passes that message into a callback function with the same name as our registered event listener, prefixed with an underscore. (In this case, that's `_FaceDetect()`). You can customize the name of this callback method by passing in a different name as an optional argument when you call the `misty.RegisterEvent()` method.
{{box op="end"}}

### faceRecognition

This sample shows how to code Misty to recognize faces she detects in her field of view. She reacts differently when she detects your face than she does when she detects an unknown face.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Before you run this code, you'll need to train Misty to recognize your face. Then, replace the `"<Your-Name>"` string in the `_FaceRec()` callback function with the name Misty associates with your face. You can train Misty to recognize your face by using the Command Center. For more information, see the [Face Training & Recognition section](
https://docs.mistyrobotics.com/tools-&-apps/web-based-tools/command-center/#face-training-amp-recognition) of the Command Center documentation.
{{box op="end"}}

In this sample, we use the `misty.RegisterEvent()` method from Misty's JavaScript API to register for face recognition (`FaceRecognition`) event messages. Data from `FaceRecognition` event messages gets passed into a callback function where we write the code that defines how the robot should respond. In this case, when Misty sees an unknown person, she raises her arms, changes her LED to red, and raises an eyebrow. When she sees you, she changes her LED to purple, raises her arms, and shows her happy eyes.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
/ This block sets Misty's arms and head to a neutral position, and
// prints a debug message that the movement is underway.
misty.Debug("Moving arms and head to neutral position");
_timeoutToNormal();

// Starts Misty's face recognition process, so we can register for (and
// receive) FaceRecognition event messages.
misty.StartFaceRecognition();

// Sets up our FaceRecognition event listener.
function registerFaceRec() {
    // Creates a property test for FaceRec event messages to check
    // whether the message has a "Label" value before passing
    // the event message into the callback.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers a new event listener for FaceRecognition events. (We
    // call this event listener FaceRec, but you can use any name
    // you like. Giving event listeners a custom name means you can
    // create multiple event listeners for the same type of event in a
    // single skill.) Our FaceRec event listener has a debounce of
    // 1000 ms, and we set the fourth argument (keepAlive) to true,
    // which tells the system to keep listening for FaceRec events
    // after the first message comes back.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, true);
}

// Defines how Misty should respond to FaceRec event messages. Data
// from each FaceRec event is passed into this callback function.
function _FaceRec(data) {
    // Gets the value of the Label property in the FaceRecognition
    // event message.
    var faceDetected = data.PropertyTestResults[0].PropertyValue;

    // Tells Misty how to react if the face is unknown.
    if (faceDetected == "unknown person") {
        misty.ChangeLED(255, 0, 0); // Changes LED to red
        misty.DisplayImage("e_Disgust.jpg"); // Raises eyebrows
        misty.MoveArmDegrees("both", -80, 100); // Raises both arms
    }
    // Tells Misty how to react when she sees you. Replace
    // "<Your-Name>" below with the label you have trained Misty to
    // associate with your face.
    else if (faceDetected == "Johnathan") {
        misty.ChangeLED(148, 0, 211); // Changes LED to purple
        misty.DisplayImage("e_Joy.jpg"); // Shows happy eyes
        misty.MoveArmDegrees("both", -80, 100); // Raises both arms
    }

    // Registers for a timer event to invoke the _timeoutToNormal
    // callback function after 5000 milliseconds.
    misty.RegisterTimerEvent("timeoutToNormal", 5000, false);
}

registerFaceRec();

// Sets Misty's arms, head, LED, and display image to a neutral
// configuration.
function _timeoutToNormal() {
    misty.Pause(100);
    misty.MoveHeadDegrees(0, 0, 0, 40); // Faces head forward
    misty.MoveArmDegrees("both", 70, 100); // Lowers arms
    misty.ChangeLED(0, 255, 0); // Changes LED to green
    misty.DisplayImage("e_DefaultContent.jpg"); // Show default eyes
}
```

{{box op="start" cssClass="boxed noteBox" }}
**Note:** By default, when the system sends an event message, our skill
passes that message into a callback function with the same name as our
registered event listener, prefixed with an underscore. (In this case,
that's `_FaceRec()`). You can customize the name of this callback
method by passing in a different name as an optional argument when you
call the `misty.RegisterEvent()` method.
{{box op="end"}}

### takePicture
This sample shows how to code Misty to take a picture with her RGB camera, save the picture to her local storage, and show it on her display. We also have Misty play her default camera shutter sound, so you can hear (as well as see) when she's taken the picture.

```javascript
// Plays Misty's her camera shutter sound at 100% of max volume. This
// sound is one of Misty's default system audio files.
misty.PlayAudio("s_SystemCameraShutter.wav", 100);

// Takes a picture and saves it with the name "photoSaveTest".
// Sets the width of the picture to 320 and the height to 240. The
// first boolean argument tells Misty to save the picture, and the
// second tells Misty to show the picture on her display as soon as
// it's been saved to her local storage.
misty.TakePicture("photoSaveTest", 320, 240, true, true);
```

## External Requests

The code samples in this section show how to use the `misty.SendExternalRequest()` method to get data and media files from resources hosted on the web. To learn more about the arguments we pass into this method, see the [`misty.SendExternalRequest()`](../../../misty-ii/javascript-sdk/api-reference/#misty-sendexternalrequest) reference documentation.

### externalRequest_getAudio

This sample shows how to code Misty to get an audio file from an external resource. In this case, Misty saves the audio file to her local storage and plays it back through her onboard speakers.

```javascript
// The URL of the resource to which we send our external request.
// In this example, the resource hosted at this URL is an ominous
// recording of a self-destruction countdown. (We promise your robot
// won't actually self-destruct!)
const url = "http://www.moviesoundclips.net/download.php?id=2631&ft=wav"

// Sends the request to download the audio file.
misty.SendExternalRequest("GET", url, null, null, "{}", true, true, "downloadAudio.wav");
```

### externalRequest_getData

This sample shows how to code Misty to get data from an external web API. In this case, Misty sends a request to the [Weatherstack API](https://weatherstack.com/)
and parses the response to print a message with information about the current weather to `SkillData` event listeners.

This sample makes use of the `params` field in the JSON meta file. We store the Weatherstack API key and the name of a city in the `params` field of the meta file ([shared on GitHub here](https://github.com/MistyCommunity/JavaScript-SDK/blob/master/Sample%20Code/externalRequest_getData/externalRequest_getData.json)) to make it easier for other developers to update the skill with their own unique information. Before you run this skill, you'll need to replace the `key` and `city` values in the `externalRequest_getData.json` file with your own Weatherstack access key and the name of the city in which you live. You can get a Weatherstack API access key for free by [signing up for an account on their website](https://weatherstack.com/signup/free).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Storing sensitive data (like API keys and credentials) in
the JSON file (instead of hard-coding them into your skill) is a good practice to follow, especially
when you plan to share your code with other developers. Always remember
to remove private or sensitive information from your skill files before
sharing them on GitHub, in the Misty Community, or elsewhere online.
{{box op="end"}}

```javascript
// Sends a request to the Weatherstack API, using parameters from the
// skill's JSON meta file to fill out the key and city in the resource
// URL. In your skill code, you can reference any values assigned to
// properties in the params object in the skill's JSON meta file by
// calling _params.<propertyName>. In our case, we use
// _params.key and _params.city, respectively.
misty.SendExternalRequest(
    "GET",
    "http://api.weatherstack.com/current?access_key="+_params.key+"&query="+_params.city
    )

// Parses the response data to get the current condition in
// _params.city and prints this data in a debug message.
function _SendExternalRequest(data) {
    // Parses callback data to pull out response object data. This is
    // the response from our external resource.
    _data = JSON.parse(data.Result.ResponseObject.Data)
    // Parses the response to get the current condition in _params.city
    _condition = _data.current.weather_descriptions[0].toLowerCase();
    // Prints the current condition as a debug message.
    misty.Debug("Misty here! Just letting you know it's " + _condition + " in " + _params.city);
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, when the system sends an external request, our skill
passes the response from the external resource into a callback
function with the same name as the external request command, prefixed
with an underscore (i.e. `_SendExternalRequest()`). You can change the
name of this callback function by passing in a different name as an
optional argument when you call the `misty.RegisterEvent()` method.
{{box op="end"}}

## Locomotion

Many of the drive commands in Misty's JavaScript API use data from Misty's IMU sensor to determine how much power to send to the motor for each drive track. Because these commands are aware of Misty's current heading, you can use them to have the robot drive in specific patterns. Additionally, Misty's built-in hazards system prevents the robot from executing commands that could bring it harm, like driving over the edge of a high surface. The hazards system sends data each time the robot enters a "hazard" state, and you can use this data to programmatically change the direction your robot is moving. 

As a brief introduction to using these commands, the code samples in this section shows how you can programmatically drive Misty in a circle or code the robot's reaction when she enters a "hazard" state.

### driveCircle

This sample shows one option for coding Misty to drive in a circle.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The `circleDrive()` function in this sample expects Misty's heading (yaw value from `IMU`) to be 0 when it runs. Misty's heading is set to 0 when Misty boots up; however, because this heading updates continuously as Misty moves around, we can't be sure what the heading will be when you run this sample. To work around this, the first call on the `misty.DriveArc()` method in this sample rotates Misty back to a heading of 0.
{{box op="end"}}

```javascript
// Rotates Misty back to an absolute heading of 0 over 4000ms
misty.DriveArc(0, 0.0, 4000, false);
// Pauses skill execution for 4000ms (when rotation is complete)
misty.Pause(4000);

// Starting from a heading of 0, drives Misty in a 0.5m radius circle.
// Misty drives the circumference of each 1/4 segment of the circle
// over 3000 ms. Driving the full circumference takes ~12 seconds.
function circleDrive() {

    for (var i = 1; i <= 4; i++) {
        misty.DriveArc(i*90, 0.5, 3000, false);
        misty.Pause(2900);
    };

    // Loop to continue driving in a circle. Misty continues driving
    // until the skill is canceled or times out. Remove this line if
    // Misty should only drive in one full circle.
    circleDrive();
}

circleDrive();
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This is not the only way to programmatically drive Misty in a circle. Another option is to use Misty's current absolute heading to calculate new heading values to pass into calls on the `misty.DriveArc()` method.
{{box op="end"}}

### hazardNotification

This sample shows how to register for hazard notification (`HazardNotification`) event messages. Once you've registered for these
messages, you can use them to program Misty to back up and find another direction when she stops driving due to an obstacle or a cliff in her path.

In this sample, we use the `misty.RegisterEvent()` method from Misty's JavaScript API to register for `HazardNotification` event messages. Data from `HazardNotification` event messages gets passed into a callback function where we write the code that defines how the robot should respond. In our case, this callback function prints an array with the names of the triggered hazards as a debug message. If the message shows that Misty is in a hazards state, we change her LED to white, meaning it's not safe for her to drive. If misty is NOT in a hazard state, we change the LED to white, meaning it is safe for her to drive.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
// Changes LED to white
misty.ChangeLED(255, 255, 255);

// Tells the system to print the value of the BumpSensorsHazardState
// property in the AdditionalResults array that comes back with
// "Hazard" event messages. This value tells us which hazard state
// an event message is associated with. This sample only uses data
// from the bump sensor hazard states; however, you could add
// additional return properties of HazardNotification event messages
// to programmatically respond to other types of hazard states.
misty.AddReturnProperty("Hazard", "BumpSensorsHazardState");

// Registers a new event listener for HazardNotification events. (We
// call this event listener Hazard, but you can use any name you like.
// Giving event listeners a custom name means you can create multiple
// event listeners for the same type of event in a single skill.) Our
// Hazard event listener has a debounce of 0 ms - HazardNotification
// event messages are sent whenever a hazard state changes, and do not
// use timed intervals - and we set the fourth argument (keepAlive) to
// true, which tells the system to keep listening for Hazard events
// after the first message comes back.
misty.RegisterEvent("Hazard", "HazardNotification", 0, true);

// Defines how Misty should respond to Hazard event messages. The
// data from each Hazard event is passed into this callback function.
function _Hazard(data) {

    var safe = false;
    
    // Prints a debug message with the contents of the
    // AdditionalResults array. Then, assigns this array to a variable.
    misty.Debug(JSON.stringify(data.AdditionalResults));
    const dataIn = data.AdditionalResults;

    // Loops through the dataIn array to check which bump sensor
    // hazards are in a hazards state, and stores the SensorNames of
    // those hazards in the triggers array.
    var triggers = [];
    dataIn.forEach(sensor => {
        sensor.forEach(sensorData => {
            sensorData.InHazard ? triggers.push(sensorData.SensorName) : {}
        });
    });
    // Checks the length of the triggers array. If not empty, prints
    // a debug message with the contents of the triggers array. If
    // empty, no bump sensors are in a hazards state, and we
    // toggle safe to be true.
    triggers.length ? misty.Debug(triggers) : safe = true;

    // If safe is true, then we change the LED to white (it's safe for
    // Misty to drive). If safe is still false, we change the LED to
    // red (it's not safe to drive).
    safe ? misty.ChangeLED(255, 255, 255) : misty.ChangeLED(255, 0, 0);
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** By default, when the system sends an event message, our skill
passes that message into a callback function with the same name as our
registered event listener, prefixed with an underscore. (In this case,
that's `_Hazard()`). You can customize the name of this callback method
by passing in a different name as an optional argument when you call
the `misty.RegisterEvent()` method.
{{box op="end"}}

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** You can extend this sample to write a skill that has Misty autonomously roam her environment, programmatically changing direction each time she bumps into something. Try checking which bump sensor is in a hazard state, and use Misty's driving commands to program her to back up and choose a new direction. Add an additional return property for `TimeOfFlightSensorsHazardState` to incorporate the hazard states of Misty's time-of-flight sensors into the flow.
{{box op="end"}}

To learn more about Misty's hazards system, see the [Hazards System documentation](../../../misty-ii/robot/misty-ii/#hazards-system).

## Sensors & Event Data

When you write a JavaScript skill for Misty, you can register event listeners to process data from her sensors and internal systems. You can use this data to program Misty's reaction to certain events (i.e. bumping into an object, hearing a sound, or being touched on the head). This section provides code samples that show how to register for different kinds of data from Misty's sensors. It also includes samples that show how to filter out unwanted event messages and register for timer events.

### audioLocalization

This sample shows how to code Misty to localize audio. When this code runs, Misty starts sending audio localization event messages and prints the degree of any arrival speech as a debug message.

In this sample, we use two methods from Misty's JavaScript API to register for audio localization (`SourceTrackDataMessage`) events. We use the `misty.RegisterEvent()` method to create a new event listener for messages from Misty's audio localization system, and we use the `misty.AddReturnProperty()` method to tell the system which `SourceTrackDataMessage` property values those event messages should include.

When Misty sends an audio localization event message, that message data gets passed into a callback function where we write the code that defines how the robot should respond.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** For audio localization events, the direction Misty's head is facing is her 0/360 degrees. The system calculates the degree of arrival speech relative to this position. We start this sample by positioning Misty's head to face the same direction as her body, but keep in mind that this won't always be the case.
{{box op="end"}}

```javascript
// Prepares Misty to start listening for audio.
misty.MoveHeadDegrees(-15, 0, 0, 50);
registerAudioLocalization();

// Misty must be recording audio to stream audio localization data.
// When this sample starts, Misty starts recording audio to a new file
// called "deleteThis.wav"
misty.StartRecordingAudio("deleteThis.wav");
misty.ChangeLED(0, 0, 255); // Changes LED to blue; "I'm listening!"
// Stops recording after 10 seconds. Extend this duration to keep Misty
// listening longer.
misty.Pause(10000);
misty.StopRecordingAudio();
misty.ChangeLED(0, 255, 0); // Changes LED to green; "Done listening!"

// Sets up our SourceTrackDataMessage event listener.
function registerAudioLocalization() {
    // Tells the system to print the value of the DegreeOfArrivalSpeech
    // property in the AdditionalResults array that comes back with
    // "DegreeOfArrivalSpeech" events. This value indicates the angle
    // relative to the direction Misty's head is facing where she
    // detected the loudest voice.
    misty.AddReturnProperty("soundIn", "DegreeOfArrivalSpeech");
    // Registers a new event listener for SourceTrackDataMessage events.
    // (We call this event listener soundIn, but you can use any name
    // you like. Giving event listeners a custom name means you can
    // create multiple event listeners for the same type of event in a
    // single skill.) Our soundIn event listener has a debounce
    // of 100 ms, and we set the fourth argument (keepAlive) to true,
    // which tells the system to keep listening for
    // SourceTarckDataMessage events after the first message comes back
    misty.RegisterEvent("soundIn", "SourceTrackDataMessage", 100, true);
}

// Defines how Misty should respond to soundIn events. Data from each
// soundIn event is passed into this callback function.
function _soundIn(data) {
    // Prints the degree of arrival speech as a debug message.
    misty.Debug(data.AdditionalResults[0].toString() + " <- degree of arrival for detected audio");
}

```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** This sample prints the degree of arrival speech as a debug message. You can extend this sample by adding code to find Misty's current heading (yaw value from `IMU`), and to calculate a new heading for Misty, so that she can turn to face the person she hears speaking.
{{box op="end"}}

### bumpSensor

This sample shows how to code Misty to play different sounds when you trigger the bump sensors on her base.

In this sample, we use two methods from Misty's JavaScript API to register for bump sensor (`BumpSensor`) event messages. We use the `misty.RegisterEvent()` method to create a new event listener for messages from Misty's bump sensors, and we use the `misty.AddReturnProperty()` method to tell the system which `BumpSensor` property values those event messages should include.

When Misty sends a `BumpSensor` event message, that message data gets passed into a callback function where we write the code that defines how the robot should respond.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
// Tells the system to print the value of the sensorName property
// in the AdditionalResults array that comes back with "Bumped"
// event messages. This value tells us which sensor a Bumped event
// message is associated with.
misty.AddReturnProperty("Bumped", "sensorName");

// Tells the system to print the value of the isContacted property
// in the AdditionalResults array that comes back with "Bumped"
// event messages. This value is true when a sensor is pressed, and
// false when a sensor is released.
misty.AddReturnProperty("Bumped", "IsContacted");

// Registers a new event listener for BumpSensor events. (We call this
// event listener Bumped, but you can use any name you like. Giving
// event listeners a custom name means you can create multiple event
// listeners for the same type of event in a single skill.) Our Bumped
// event listener has a debounce of 50 ms, and we set the fourth
// argument (keepAlive) to true, which tells the system to keep
// listening for Bumped events after the first message comes back.
misty.RegisterEvent("Bumped", "BumpSensor", 50 ,true);

// Defines how Misty should respond to Bumped event messages. The
// data from each Bumped event is passed into this callback function.
function _Bumped(data) {
    // Assigns the values of sensorPosition and isPressed (the first
    // and second elements in our AdditionalResults array) to variables
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];

    // If isPressed is true, prints a debug message telling us which
    // sensor was touched. If isPressed is false, prints a debug
    // message telling us which sensor was released.
    isPressed ? misty.Debug(sensor+" is Pressed") : misty.Debug(sensor+" is Released");

    // If isPressed is true, plays a different sound depending which
    // sensor is touched.
    if (isPressed) {
        if (sensor == "Bump_FrontRight") {
            misty.PlayAudio("s_Joy2.wav");
        }
        else if (sensor == "Bump_FrontLeft") {
            misty.PlayAudio("s_Awe3.wav");
        }
        else if (sensor == "Bump_RearLeft") {
            misty.PlayAudio("s_PhraseHello.wav");
        }
        else if (sensor == "Bump_RearRight") {
            misty.PlayAudio("s_Fear.wav");
        }
        else {
            misty.Debug("Sensor Name Unknown");
        }
    }
};
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty can react to events in a variety of ways. To make the
reactions in this sample more expressive, add code to the conditional
blocks that run inside in the `_Bumped()` callback function. As a basic
example, you can change the image on Misty's display to her happy eyes
by calling `misty.DisplayImage("e_Joy.jpg")`, or change the color of her
chest LED to red by calling `misty.ChangeLED(255, 255, 255)`
{{box op="end"}}

### capTouch

This sample shows how to code Misty to play different sounds when you touch the capacitive touch sensors on her head and chin.

In this sample, we use two methods from Misty's JavaScript API to register for capacitive touch (`TouchSensor`) event messages. We use the `misty.RegisterEvent()` method to create a new event listener for messages from Misty's capacitive touch sensors, and we use the `misty.AddReturnProperty()` method to tell the system which `TouchSensor` property values those event messages should include.

When Misty sends a `TouchSensor` event message, that message data gets passed into a callback function where we write the code that defines how the robot should respond.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
// Tells the system to print the value of the sensorPosition property
// in the AdditionalResults array that comes back with "Touched"
// event messages. This value tells us which sensor a Touched event
// message is associated with.
misty.AddReturnProperty("Touched", "sensorPosition");

// Tells the system to print the value of the isContacted property
// in the AdditionalResults array that comes back with "Touched"
// event messages. This value is true when a sensor is touched, and
// false when a sensor is released.
misty.AddReturnProperty("Touched", "isContacted");

// Registers a new event listener for TouchSensor events. (We call this
// event listener Touched, but you can use any name you like. Giving
// event listeners a custom name means you can create multiple event
// listeners for the same type of event in a single skill.) Our Touched
// event listener has a debounce of 50 ms, and we set the fourth
// argument (keepAlive) to true, which tells the system to keep
// listening for Touched events after the first message comes back.
misty.RegisterEvent("Touched", "TouchSensor", 50 ,true);

// Defines how Misty should respond to Touched event messages. The
// data from each Touched event is passed into this callback function.
function _Touched(data) {
    // Assigns the values of sensorPosition and isPressed (the first
    // and second elements in our AdditionalResults array) to variables
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];

    // If isPressed is true, prints a debug message telling us which
    // sensor was touched. If isPressed is false, prints a debug
    // message telling us which sensor was released.
    isPressed ? misty.Debug(sensor+" is Touched") : misty.Debug(sensor+" is Released");

    // If isPressed is true, plays a different sound depending which
    // sensor is touched.
    if (isPressed) {
        if (sensor == "Chin") {
            misty.PlayAudio("s_PhraseOwwww.wav");
        }
        else if (sensor == "HeadRight") {
            misty.PlayAudio("s_PhraseEvilAhHa.wav");
        }
        else if (sensor == "HeadLeft") {
            misty.PlayAudio("s_Distraction.wav");
        }
        else if (sensor == "HeadFront") {
            misty.PlayAudio("s_Acceptance.wav");
        }
        else if (sensor == "HeadBack") {
            misty.PlayAudio("s_Disapproval.wav");
        }
        else if (sensor == "Scruff") {
            misty.PlayAudio("s_Grief.wav");
        }
        else {
            misty.Debug("Sensor Name Unknown");
        }
    }
};
```

{{box op="start" cssClass="boxed noteBox"}}
**Tip:** Misty can react to events in a variety of ways. To make the
reactions in this sample more expressive, add code to the conditional
blocks that run inside in the `_Touched()` callback function. As a basic
example, you can change the image on Misty's display to her happy eyes
by calling misty.DisplayImage(`"e_Joy.jpg"`), or change the color of her
chest LED to red by calling `misty.ChangeLED(255, 255, 255)`
{{box op="end"}}

### propertyTest

This sample shows how to code Misty to apply a property test to event listeners, so that Misty ignores messages from an event that do not meet the requirements you define in your code.

You can use property tests any time you register a new event listener. In this sample, we filter messages from Misty's time-of-flight sensors, so that our event callback only triggers when the front-center sensor detects an obstacle closer than 15 cm. This event listener ignores messages that come from the other time-of-flight sensors, and it doesn't pass along data from the front center sensor unless its distance reading is less than or equal to 15 cm.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To test this code, start the skill without any obstacles in front of Misty's front center time-of-flight sensor. Then, slowly bring your hand closer to the front of Misty's base. When the front center sensor detects that your hand is closer than 0.15 cm, Misty's LED should change to red.
{{box op="end"}}

```javascript
// Creates a property test for FrontTOF event messages to check
// whether the value of the SensorPosition property is equal to
// "Center". The FrontTOF listener ignores any TimeOfFlight messages
// where this is not the case.
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");

// Creates a property test for FrontTOF event messages to check
// whether the value of the DistanceInMeters property is less than or
// equal to 0.15. The FrontTOF listener ignores any TimeOfFlight
// messages where this is not the case.
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.15, "double"); 

// Registers a new event listener for TimeOfFlight events. (We call
// this event listener FrontTOF, but you can use any name you like.)
// Our FrontTOF event listener has a debounce of 0 ms, and we set the
// fourth argument (keepAlive) to false, which tells the system to stop
// listening for FrontTOF events after the first message comes back.
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 0, false);

// Changes LED to purple
misty.ChangeLED(144, 0, 230);

// Defines how Misty should respond to FrontTOF events. Remember, this
// callback function ONLY triggers when Misty detects on obstacle
// closer than 0.15 cm with her front center sensor.
function _FrontTOF(data) {
    // Prints the value of the DistanceInMeters property from our front
    // center time-of-flight sensor. Event messages that pass a
    // property test are pushed to the PropertyTestResults array in the
    // data that gets passed into our event callback.
    misty.Debug(data.PropertyTestResults[0].PropertyParent.DistanceInMeters);
    misty.ChangeLED(255, 0, 0); // Changes LED to red
    misty.PlayAudio("s_Amazement.wav"); // Plays an amazed sound
}
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** The full list of time-of-flight sensor positions is:
* `Center`
* `Left`
* `Right`
* `Back`
* `DownFrontRight`
* `DownFrontLeft`
* `DownBackRight`
* `DownBackLeft`
{{box op="end"}}

### randomLED

This sample shows how to use the `misty.RegisterTimerEvent()` method to create a timer event in your skill code. Here, we use this method to change the color of Misty's LED to a new, random color once every second.

```javascript
// A helper function that returns a random value between min and max.
// In this sample, we use this to randomize the values we pass into
// the misty.ChangeLED() command.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Registers for a timer event called LEDDance to invoke the LEDDance()
// _LEDDance() callback function every 1000 ms (1 second). To change
// how quickly the LED changes colors, adjust the value of the second
// argument in this function.
misty.RegisterTimerEvent("LEDDance", 1000, true);

// Sets up the callback function for the LEDDance timer event.
function _LEDDance() {
    // Changes Misty's LED. Uses the getRandomInt() function to
    // generate random values for the the red, green, and blue
    // arguments.
    misty.ChangeLED(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
}
```

### timeOfFlights

This sample shows how to code Misty to react when she detects an object within a certain distance of her range (outward-facing) time-of-flight sensors. You can use this sample as a template to customize your own reactions to time-of-flight events.

In this sample, we use two methods from Misty's JavaScript API to register for time-of-flight (`TimeOfFlight`) event messages. We use the `misty.RegisterEvent()` method to create a new event listener for messages from Misty's time-of-flight sensors, and we use the `misty.AddPropertyTest()` method to filter out event messages that don't match the criteria we set. When Misty sends a `TimeOfFlight` event message, that message data gets passed into a callback function where we write the code that defines how the robot should respond.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
// Creates a property test for TOF event messages to check whether the
// value of the type property is "range". (This TOF listener ignores
// any messages sent by Misty's "edge" (downward-facing) sensors).
misty.AddPropertyTest("TOF", "type", "==", "Range", "string"); 

// Creates a property test for TOF event messages to check
// whether the value of the DistanceInMeters property is less than or
// equal to 0.20. The TOF listener ignores any TimeOfFlight
// messages where this is not the case.
misty.AddPropertyTest("TOF", "DistanceInMeters", "<=", 0.20, "double"); 

// Registers a new event listener for TimeOfFlight events. (We call
// this event listener TOF, but you can use any name you like.)
// Our TOF event listener has a debounce of 0 ms, so it streams data
// as fast as the sensors can send it, and we set the fourth argument
// (keepAlive) to false, which tells the system to stop
// listening for TOF events after the first message comes back.
misty.RegisterEvent("TOF", "TimeOfFlight", 0, false);

// Changes LED to purple
misty.ChangeLED(144, 0, 230);

// Defines how Misty should respond to TOF events. This
// callback only triggers the first time Misty detects an
// obstacle within 0.20 cm of a range ToF sensor.
function _TOF(data) {
    // Prints the value of the DistanceInMeters property. Event
    // messages that pass a property test are pushed to the
    // PropertyTestResults array in the data that gets passed into our
    // event callback.
    misty.Debug(data.PropertyTestResults[0].PropertyParent.DistanceInMeters);
    misty.ChangeLED(235, 150, 50); // Changes LED to orange
    misty.PlayAudio("s_Amazement.wav"); // Plays an amazed sound
    misty.UnregisterAllEvents(); // Unregister all event listeners
}
```

### wakeWord

This sample shows how to code Misty to respond when she hears the "Hey, Misty!" key phrase.

When you call the `misty.StartKeyPhraseRecognition()` command, Misty listens for the key phrase by continuously sampling audio from the environment and comparing that audio to her trained key phrase model (in this case, "Hey, Misty!"). Misty does not create or save audio recordings while listening for the key phrase.

You must start key phrase recognition before Misty can send `KeyPhraseRecognized` event messages. We follow these steps to code Misty to respond to the "Hey, Misty!" key phrase:

1. Issue a `misty.StartKeyPhraseRecognition()` command.
2. Register a listener for `KeyPhraseRecognized` events. When Misty hears the key phrase, she sends a message to `KeyPhraseRecognized` event listeners. Note that Misty stops listening for the key phrase each time she hears the wake word, and you'd need to issue another command to start key phrase recognition to start her listening again.
3. Write the code to handle what Misty should do when she hears the key phrase inside the event callback. For example, you might have Misty turn to face you or start recording audio to hand off to a third-party service for additional processing.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** We left a lot of comments in this sample for developers who are new to the Misty platform. Feel free to ignore these comments if you already know the basics of coding JavaScript skills for Misty.
{{box op="end"}}

```javascript
detectWakeWord();

// Sets up wake word detection
function detectWakeWord() {
   misty.Debug("Starting key phrase recognition...");
   misty.StartKeyPhraseRecognition(false);
   // Registers a new event listener for KeyPhraseRecognized events.
   // (We call this event listener heyMisty, but you can use any name
   // you like. Giving event listeners a custom name means you can
   // create multiple event listeners for the same type of event in a
   // single skill.) Our heyMisty event listener has a debounce of
   // 10 ms, and we set the fourth argument (keepAlive) to true,
   // which tells the system to keep listening for heyMisty events
   // after the first message comes back.
   misty.RegisterEvent("heyMisty","KeyPhraseRecognized", 10, false);
   misty.Debug("Started wake word detection. Misty will play a sound when she hears 'Hey Misty'.");
}

/*
Note: By default, when the system sends an event message, our skill
passes that message into a callback function with the same name as our
registered event listener, prefixed with an underscore. (In this case,
that's "_heyMisty()"). You can customize the name of this callback
method by passing in a different name as an optional argument when you
call the misty.RegisterEvent() method.
*/

// Defines the callback function that Misty executes when she hears the
// key phrase. (In this example, we just print a debug message and
// change Misty's LED to green.)
function _heyMisty() {
   misty.Debug("Key phrase recognized!");
   misty.ChangeLED(0, 255, 0);
}
```

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To have Misty record what you say (for example, if you want to use speech to invoke other actions), you need to send a `misty.StartRecordingAudio()` command after receiving a ``KeyPhraseRecognized`` event message. You can then do something with that audio file in your code, like hand it off to a third-party service for additional processing. Misty will not record audio and listen for the "Hey, Misty!" key phrase at the same time. Sending a command to start recording audio automatically stops key phrase recognition. To have Misty start listening for the key phrase after recording an audio file, you must issue another `misty.StartKeyPhraseRecognition()` command.
{{box op="end"}}

## External Hardware

You can augment Misty's native capabilities by using external microcontrollers, sensors, and other third party hardware in your skills. External hardware can connect to the Universal Asynchronous Receiver-Transmitter (UART) serial and Universal Serial Bus (USB) ports on Misty's back. The code sample in this section shows how Misty can send and receive data through the UART serial port in a JavaScript skill.

### serialReadWrite

This sample shows how to code Misty to send/receive messages to/from a microcontroller connected to the UART serial port on her back.

In this sample, we use two methods from Misty's JavaScript API to register for incoming serial message (`SerialMessage`) events. We use the `misty.RegisterEvent()` method to create a new event listener for messages from the UART serial port, and we use the `misty.AddReturnProperty()` method to tell the system which `SerialMessage` property values those event messages should include.

For an example of the code that runs on the microcontroller to send messages to Misty, see the [Misty (Arduino Compatible) Backpack topic](https://docs.mistyrobotics.com/misty-ii/robot/misty-ii/#misty-arduino-compatible-backpack) in the developer documentation.

```javascript
subscribeToBackpackData();

// Sets up our SerialMessage event listener.
function subscribeToBackpackData() {
    // Tells the system to print the value of the SerialMessage
    // property in the AdditionalResults array that comes back with
    // "backpackMessage" events. This value is the message from the
    // connected microcontroller.
    misty.AddReturnProperty("backpackMessage", "SerialMessage");
    // Registers a new event listener for SerialMessage events. (We
    // call this event listener backpackMessage, but you can use any
    // name you like. Giving event listeners a custom name means you
    // can create multiple event listeners for the same type of event
    // in a single skill.) Our backpackMessage event listener has a
    // debounce of 50 ms, and we set the fourth argument (keepAlive)
    // to true, which tells the system to keep listening for FaceRec
    // events after the first message comes back.
    misty.RegisterEvent("backpackMessage", "SerialMessage", 50, true);
}

// Defines how Misty should respond to backpackMessage events. Data
// from each backpackMessage event is passed into this callback
// function.
function _backpackMessage(data) {
    // Prints the contents of the message from the connected
    // microcontroller as a debug message.
    misty.Debug(data.AdditionalResults[0].Message);
}

// Sends a message from Misty to a microcontroller connected to the
// UART serial port on her back.
misty.WriteSerial("Hello! This is serial RX/TX, testing from Misty!!");
```

