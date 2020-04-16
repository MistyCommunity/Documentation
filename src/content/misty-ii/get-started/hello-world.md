---
title: Hello World Tutorial Series
layout: coding.hbs
columns: three
order: 2
---

# {{title}}

Welcome to the Misty II Hello World tutorial series! The topics on this page provide a series of brief tutorials on how to write and upload a JavaScript skill that brings Misty (and your code) to life. Once you've completed the series, you'll have the knowledge required to start coding more complicated skills for your Misty II.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** This tutorial series provides an introduction to Misty's JavaScript SDK. To learn about Misty's .NET SDK, see the [.NET SDK Getting Started guide](../../../misty-ii/dotnet-sdk/getting-started/). 
{{box op="end"}}


## Overview

The Hello World tutorial series is divided into six parts:

1. [Moving Misty's Head](./#moving-misty-39-s-head)
2. [Changing Misty's LED](./#changing-misty-39-s-led)
3. [Playing Sounds](./#playing-sounds)
4. [Driving Misty](./#driving-misty)
5. [Teaching Misty to Wave](./#teaching-misty-to-wave)
6. [Using Face Recognition](./#using-face-recognition)

In the first part of the series, you learn how to create and upload the files Misty needs to run a JavaScript skill. As you progress through the series, you add code to the original skill file, and update the skill on your robot to see how the additions change Misty's behavior. When you finish all of the sections, you'll have programmed your first fully working skill for the Misty II robotics development platform.

Watch the video for a quick overview of each section in the tutorial series:

{{box op="start" cssClass="videoBoxed youtubeBox"}}
<iframe width="600" height="337" src="https://www.youtube.com/embed/xBV2U2QuK2o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{{box op="end"}}

A complete example of the Hello World skill is [hosted on GitHub](https://github.com/MistyCommunity/JavaScript-SDK/tree/master/Tutorials/Hello%20World). Feel free to refer to these files at any time.

## Moving Misty's Head

This part of the Hello World tutorial series teaches how to create files for a JavaScript skill and upload them to Misty. You'll also write your first lines of code and teach Misty to move her head in a lifelike way.

![Misty moves her head](/assets/images/hello-world-movehead.gif)

---

Each skill you write with Misty's JavaScript SDK requires two files:

* a [JavaScript "code" file](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#code-file) with the logic and commands that Misty executes when the skill runs
* a [JSON "meta" file](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#meta-file) that provides the initial settings and parameters Misty needs to run the skill

To begin, open your favorite text editor. (If you don't have a preference, we suggest using [Visual Studio Code](https://code.visualstudio.com/), so that you can use the [Misty JavaScript Extension](../../../tools-&-apps/plugins-&-extensions/misty-skills-extension/); however, the extension is **not** required for this tutorial.) Create a new JavaScript file called `HelloWorld.js`, and save this file to a new directory called `HelloWorld`. Now you can start writing the code to bring Misty to life.

To appear lifelike, Misty's head movement should be spontaneous and random. You can achieve this by registering for a "timer" event and configuring it to invoke a callback function after a random interval of time. In our Hello World skill, we code this callback function to send Misty a head movement command with randomized movement values.

Because the Hello World skill uses random integers throughout, you can start by declaring a helper function called `getRandomInt()`. This function uses the built-in [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) and [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) JavaScript methods to return a random integer. Declare this function at the top of your `HelloWorld` code file:

```javascript
// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

Next we call methods from Misty's JavaScript API to move the robot's head at random. 

To issue a command to Misty in the local environment, we call methods on the `misty` object. For lifelike movement, we need to configure an event that triggers head movement commands after a randomized timed interval. The method for setting up a timer event with Misty's JavaScript API is `misty.RegisterTimerEvent()`.

When we call this method in our Hello World skill, we pass in values for the first three arguments. The first argument (`eventName`) sets a name for the registered event; the second argument (`callbackTimeInMs`) sets the duration before the event triggers; and the third (`keepAlive`) sets whether Misty should remain registered for this event after it triggers a callback function.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For more information about timed events, see the [`misty.RegisterTimerEvent()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-registertimerevent).
{{box op="end"}}

Copy the following into your `HelloWorld` skill code. This registers for a timer event named `look_around` that invokes a callback after 5000 - 10000 milliseconds. The value for `keepAlive` is set to `false`.

```javascript
misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
```

By default, timer events you create with the `misty.RegisterTimerEvent()` method invoke a callback function with the same `eventName`, prefixed with an underscore. In this case, the callback function is called `_look_around()`. Declare this function in your skill code:

```javascript
// The look_around timer event invokes this callback function.
function _look_around(repeat = true) {

}
```

We write the code to move Misty's head inside this `_look_around()` callback function. Misty's neck has three movement axes -- pitch (tilt up/down), roll (tilt left/right), and yaw (turn left/right). You can move Misty's head on any of these axes by using the `misty.MoveHeadDegrees()` method.

The first three arguments we pass in to the `misty.MoveHeadDegrees()` method tell Misty the position on each axis (in degrees) to which the robot should move her head. The value range for `pitch` is `29` (down) to `-40` (up); the range for `roll` is `-40` (left) to `40` (right); and the range for `yaw` is `-81` (right) to `81` (left). When all of these values are 0, Misty is looking straight ahead.

Additionally, the `misty.MoveHeadDegrees()` method provides arguments for setting **either** the `velocity` (the speed of the movement as a percentage of the maximum velocity for the motors involved), **or** the `duration` (how long the full movement should take, in seconds).

Using `duration` instead of `velocity` for head movement results in smoother motion, because it ensures that movement along each axis (pitch, roll, and yaw) starts and stops at the same time. Using `duration` tells the system that, regardless of how far the head must travel in each direction, the movement along each axis should take the same amount of time.

By contrast, using `velocity` only tells the motors how quickly to move. If you command Misty's head to move a shorter distance along the `pitch` axis than the `roll` axis, then movement along the `pitch` axis will finish first. When you use the `velocity` argument in your head movement commands, the movement along each axis is unlikely to complete at the same time.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For more information about this function, see the [`misty.MoveHeadDegrees()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-moveheaddegrees).
{{box op="end"}}

To achieve spontaneous, smooth head movement, we use the `getRandomInt()` helper function to return unique values for the `pitch`, `roll`, and `yaw` arguments each time our skill calls the `misty.MoveHeadDegrees()` method. We pass in a value of `null` for `velocity` (the fourth argument), and we use `1` (one second) for `duration`.

Copy the following `misty.MoveHeadDegrees()` method into your `_look_around()` callback function:

```javascript
function _look_around(repeat = true) {

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), // Random pitch position between -40 and 20
        getRandomInt(-30, 30), // Random roll position between -30 and 30
        getRandomInt(-40, 40), // Random yaw position between -40 and 40
        null, // Velocity. Nullable. (We use duration here, instead.)
        1); // Head movement duration, in seconds.
}
```

Misty should continue moving her head until the Hello World skill ends. To do this, you can use the `misty.RegisterTimerEvent()` method inside the `look_around()` event callback to create a loop where Misty re-registers for the `look_around` event each time the callback executes.

Copy the conditional block below into your `_look_around()` callback function. As long as `repeat` is set to `true`, Misty runs the head movement command on a loop until the skill ends.

```javascript
function _look_around(repeat = true) {

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), // Random pitch position between -40 and 20
        getRandomInt(-30, 30), // Random roll position between -30 and 30
        getRandomInt(-40, 40), // Random yaw position between -40 and 40
        null, // Velocity. Nullable. (We use duration here, instead.)
        1); // Head movement duration, in seconds.

        // If repeat is set to true, re-registers for the look_around
        // timer event, and Misty moves her head until the skill ends.
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(5, 10) * 1000,
        false);
}
```

The next step is to call the `misty.Debug()` method at the beginning of your skill code with a message to indicate the skill is starting. The `misty.Debug()` method prints messages to debug listeners, and you can use it to locate issues as you develop Misty's skills.

Copy the following into the beginning of your skill code:

```javascript
// Sends a message to debug listeners
misty.Debug("The HelloWorld skill is starting!")
```

The code file is complete! At this point, the contents of your `HelloWorld.js` file should look look like this:

```javascript
// Sends a message to debug listeners
misty.Debug("The HelloWorld skill is starting!")

// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = true) {

    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), // Random pitch position between -40 and 20
        getRandomInt(-30, 30), // Random roll position between -30 and 30
        getRandomInt(-40, 40), // Random yaw position between -40 and 40
        null, // Velocity. Nullable. (We use duration here, instead.)
        1); // Head movement duration, in seconds.

        // If repeat is set to true, re-registers for the look_around
        // timer event, and Misty moves her head until the skill ends.
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(5, 10) * 1000,
        false);
}

// Registers for a timer event  called look_around, and invokes the
// _look_around() callback after 5000 - 10000 milliseconds.
misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
```

### Generating the Meta File

Next we create the JSON meta file and install the skill on Misty. 

Follow these steps to generate a JSON file for your Hello World skill:

1. Open the [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/) web page in a new browser window and find the **Generate** section.
2. Type `HelloWorld` in the **New Skill Name** field.
3. Select the option to **Download** option and click **Generate JSON Meta Template**. The full sequence for generating a meta file looks like this: ![Generate meta file animation](/assets/images/skill-runner-generate-meta-animation.gif)
4. Locate the downloaded `HelloWorld.json` file save it to the `HelloWorld` directory you created for this skill earlier.
5. Open the `HelloWorld.json` file in your text editor. It should look something like this, with a different value for the `"UniqueID"` key:

```json
{
    "Name": "HelloWorld",
    "UniqueId": "f1a3b79a-4942-4133-9e4c-92aa9643c378",
    "Description": "My skill is amazing!",
    "StartupRules": [
        "Manual",
        "Robot"
    ],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 600,
    "CleanupOnCancel": false,
    "WriteToLog": false,
    "Parameters": {
        "int": 10,
        "double": 20.5,
        "string": "twenty"
    }
}
```

Make sure the value of the `"Name"` parameter is `"HelloWorld"`. You can ignore the rest of the parameters for now.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** value of `"UniqueId"` is randomized for each meta file the Skill Runner generates, and should be unique for each skill on your robot. The `"TimeOutInSeconds"` parameter describes how long the skill runs (in seconds) before Misty automatically cancels it. For details on the rest of the key/value pairs in the meta file, see the [Meta File documentation](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#meta-file).
{{box op="end"}}

### Installing the Hello World Skill

With the meta file saved, you're ready to install your skill on Misty. Follow these steps to do so:

1. In the [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/) web page, type Misty’s IP address into the Robot IP Address field in the upper right hand corner. (You can find Misty's IP address in the Misty App.) Click **Connect**.
2. Once the connection is established, find the **Install** section on the Skill Runner page. Make sure **JavaScript** is selected. Then, click **Choose files** and navigate to the `HelloWorld` directory where you saved the `HelloWorld.js` and `HelloWorld.json` files. Select both files and click **Open**, or drag and drop the files to upload them to Misty. ![Upload skill animation](/assets/images/skill-runner-upload-skill-animation.gif)
3. When the upload is complete, your new `HelloWorld` skill appears under the **Manage** section of the Skill Runner page. Find it and click **Start** to begin execution!
4. Open the web console to view additional information from the skills running on Misty (including debug messages). The keyboard shortcuts for opening the console in Chrome are **Ctrl + Shift + J** (Windows/Linux) or **Cmd + Option + J** (Mac). ![Run skill animation](/assets/images/skill-runner-run-skill.gif)
5. Click **Stop** to stop running the skill.

## Changing Misty's LED

This part of the Hello World tutorial series teaches how to pulse Misty's chest LED. 

![Misty's LED pulses purple](/assets/images/hello-world-changeled.gif)

If you've already completed the [first part of this tutorial series](./#moving-misty-39-s-head), you can add this code to your original `HelloWorld.js` code file, beneath where you wrote the code for moving Misty's head. 

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** While we recommend completing the Hello World Tutorial Series in order, the code you write in this section runs just fine without the code from earlier parts of the series. Just edit your code in a new JavaScript file and [generate a new JSON meta file](./#generating-the-meta-file) with the same skill name and filename.
{{box op="end"}}

When we pulse Misty's chest LED, the visual effect is such that Misty appears to be "breathing". This helps us achieve our goal of animating Misty and bringing the robot to life. In your own skills, you can use Misty's LED however you like. For example, use the LED as a way to notify users that something important has happened, or invent your own debugging system to have Misty change her LED color when executing a particular block of code.

To pulse Misty's LED in our Hello World skill, we use the `misty.TransitionLED()` method. This method sets Misty's LED to transition between two colors. It takes eight required arguments: `Red`, `Green`, and `Blue` (the [RGB color codes](https://www.rapidtables.com/web/color/RGB_Color.html) for the first color); `Red2`, `Green2`, and `Blue2` (the RGB color codes for the second color); `transitionType` (whether the LED should blink, breathe, or transition once); and `timeMs` (how long, in milliseconds, each transition should last).

Copy and paste the following into your Hello World skill. This code pulses Misty's LED from black (off) to purple once every second. You can change the RGB values, transition type, and duration to achieve different effects.

```javascript
// Calls TransitionLED command to pulse Misty's chest LED purple.
// Sets RGB values for starting color to 140, 0, and 220 (purple); sets
// RGB values for finishing color to 0, 0, and 0 (black, or LED off).
// Sets transitionType to "Breathe", and duration to 1000ms (1 second).

misty.TransitionLED(140, 0, 220, 0, 0, 0, "Breathe", 1000);

// Try changing the starting and finishing RGB values, transitionType,
// and duration to achieve different effects!
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When we use the `misty.TransitionLED()` method, Misty continues the transition until she is powered off or receives another command to change her LED. For more information about the `misty.TransitionLED()` method, see the [`misty.TransitionLED()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-transitionled).
{{box op="end"}}

Save your changes. Use the Skill Runner to [upload your modified `HelloWorld.js` file to Misty](./#installing-the-hello-world-skill).

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you upload a JavaScript code file with the same name as a skill that already exists on Misty, Misty overwrites the existing file with your new code. If you did not change the name of the JavaScript code file for your Hello World skill, then there's no need to upload a new JSON meta file to Misty.
{{box op="end"}}

When the upload is complete, run the skill from the **Manage** section of the Skill Runner web page.

## Playing Sounds

This part of the Hello World tutorial series teaches how to write code to have Misty play sounds.

![Misty plays a sound](/assets/images/hello-world-play-audio.gif)

If you started at the beginning of the Hello World series, you can add this code to the same `HelloWorld.js` code file, beneath where you wrote the code for changing Misty's LED.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** While we recommend completing the Hello World Tutorial Series in order, the code you write in this section runs just fine without the code from earlier parts of the series. Just edit your code in a new JavaScript file and [generate a new JSON meta file](./#generating-the-meta-file) with the same skill name and filename.
{{box op="end"}}

When we bring Misty to life, she should greet the world with in her own robot voice. Misty comes with several default system audio files, which you can play in your skills by calling the `misty.PlayAudio()` method. When you call this method, you pass in the name of the file that you want Misty to play.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For more information about this method, see the [`misty.PlayAudio()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-playaudio).
{{box op="end"}}

In our Hello World skill, Misty plays the `s_Amazement.wav` file at 100% of max volume. After she plays the sound, we use the `misty.Pause()` method to have Misty wait a few seconds before executing the next command. Copy the following into your `HelloWorld.js` code file:

```javascript
// Plays an audio file at max volume.
misty.PlayAudio("s_Amazement.wav", 100);
// Pauses for 3000 milliseconds before executing the next command.
misty.Pause(3000);
```

You can have Misty play a different sound by passing in a different `fileName` when you call the `misty.PlayAudio()` method. You can use the Command Center to see the names of all Misty's default audio files.

Save your changes and use the Skill Runner to [upload your modified `HelloWorld.js` file to Misty](./#installing-the-hello-world-skill). Start the skill to hear Misty play the sound.

## Driving Misty

This part of the Hello World tutorial series teaches how to programmatically drive Misty. When Misty executes the code from this section of the series, she slowly turns left and then right for a better view of her new home. 

![Misty turns left and right](/assets/images/hello-world-drive.gif)


If you started at the beginning of the Hello World series, you can add this code to the same `HelloWorld.js` code file you've been working on, beneath where you wrote the code for playing audio.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** While we recommend completing the Hello World Tutorial Series in order, the code you write in this section runs just fine without the code from earlier parts of the series. Just edit your code in a new JavaScript file and [generate a new JSON meta file](./#generating-the-meta-file) with the same skill name and filename.
{{box op="end"}}

{{box op="start" cssClass="boxed warningBox"}}
**Important!** The code you write in this section of the tutorial activates Misty's drive motors. Make sure to place Misty on the ground before you run this code. **DO NOT** run this code while Misty is set on a high surface. Always set Misty on the foam block that arrived in her carrying case when working with her on a desk or table.
{{box op="end"}}

To drive Misty in the Hello World tutorial, we use the `misty.DriveTime()` method. This method accepts values for linear velocity, angular velocity, and duration to drive Misty forward or backward at a set speed, with a given rotation, for a specified amount of time. 

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** The `misty.DriveTime()` argument expects the values used for `linearVelocity` and `angularVelocity` to be a percentage Misty's maximum velocity. When using the `misty.DriveTime()` method, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* If linear velocity is -100 and angular velocity is 0, Misty drives straight backward at full speed.
* If linear velocity is 100 and angular velocity is 0, Misty drives straight forward at full speed.
* If linear velocity is 0 and angular velocity is -100, Misty rotates clockwise at full speed.
* If linear velocity is 0 and angular velocity is 100, Misty rotates counter-clockwise at full speed.
* If linear velocity is not zero and angular velocity is not zero, Misty drives in a curve.

For more information about this command, see the [`misty.DriveTime()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-drivetime)
{{box op="end"}}

In our Hello World skill, we want Misty to turn slowly counter-clockwise, pause, then turn slowly clockwise. We do this with a sequence of `misty.DriveTime()` commands. We insert `misty.Pause()` commands after each call to `misty.DriveTime()` to prevent the next drive command from overriding the previous drive command before it completes. We call the `misty.Stop()` method to stop Misty driving at the end of the sequence.

Copy the following lines of code into your `HelloWorld.js` skill file, beneath where you wrote the code to play audio:

```javascript
misty.DriveTime(0, 30, 5000); // Turns Misty to her left
misty.Pause(6000); // Wait for turn to complete, =1 second
misty.DriveTime(0, -30, 5000); // Turns Misty to her right
misty.Pause(6000); // Wait for turns to complete, +1 second
misty.Stop(); // Stops driving motors
```

To change the speed and distance that Misty turns, modify the `angularVelocity` and `timeMs` values in your `misty.DriveTime()` commands. Pass in a positive value for `linearVelocity` to have Misty move forward, and use a negative value to have Misty move backward. We suggest starting at low speeds, like `30`/`-30`, and slowly incrementing these values to get a feel for how they affect Misty's movement.

You're now ready to update your skill. Save your changes, and use the Skill Runner to [upload your modified `HelloWorld.js` file to Misty](./#installing-the-hello-world-skill). **Remove Misty from her foam block and set her on the floor, with both her left and right treads firmly on the ground**. Start the skill to see Misty drive.

## Teaching Misty to Wave

This part of the Hello World tutorial series teaches how to programmatically move Misty's arms. When the code you write in this section executes, Misty raises her right arm and waves.

![Misty waves](/assets/images/hello-world-misty-wave.gif)


If you started at the beginning of the Hello World series, you can add this code to the same `HelloWorld.js` code file you've been working on, beneath where you wrote the code for driving Misty.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** While we recommend completing the Hello World Tutorial Series in order, the code you write in this section runs just fine without the code from earlier parts of the series. Just edit your code in a new JavaScript file and [generate a new JSON meta file](./#generating-the-meta-file) with the same skill name and filename.
{{box op="end"}}

In this tutorial, we use the `misty.MoveArmDegrees()` method to have Misty move her arms. This method specifies which arm should move (`left`, `right`, or `both`), the angle (in degrees) to which the arm should move, and how the velocity with which the movement should occur.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For more information about this command, see the [`misty.MoveArmDegrees()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-movearmdegrees)
{{box op="end"}}

To have Misty wave, we send a command to move Misty's right arm up, then pause before returning the arm to Misty's side. We wrap all this in a function called `waveRightArm()`, so we can use it later in the skill. Copy the following into your `HelloWorld.js` skill code:

```javascript
// Waves Misty's right arm!
function waveRightArm() {
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(3000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}

waveRightArm();
```

You're now ready to update your skill. Save your changes, and use the Skill Runner to [upload your modified `HelloWorld.js` file to Misty](./#installing-the-hello-world-skill). **Remove Misty from her foam block and set her on the floor, with both her treads firmly on the ground**. Start the skill to see Misty wave!

## Using Face Recognition

This part of the Hello World tutorial series teaches how to use face recognition data in your skill code. When the code you write in this section executes, Misty attempts to detect and recognize faces. If you've trained Misty on your own face, then Misty waves when she sees you. If Misty sees a person she doesn't know, she raises her eyebrows and plays a sound.

![Misty sees a face](/assets/images/hello-world-face-recognition.gif)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you haven't already trained Misty to recognize your face, [use the Command Center to do so](../../../tools-&-apps/web-based-tools/command-center/#face-training-amp-recognition) before working through this section of the tutorial.
{{box op="end"}}

If you started at the beginning of the Hello World series, you can add this code to the same `HelloWorld.js` code file you've been working on, beneath where you wrote the code that taught Misty to wave.

To begin, declare a function called `_registerFaceRed()`. We'll wrap the commands to start Misty looking for faces inside this function.

```javascript
// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {

}
```

We call the [`misty.StartFaceRecognition()`](../../../misty-ii/javascript-sdk/api-reference/#misty-startfacerecognition) method to start Misty's face recognition process. Copy this function (along with a call to [`misty.StopFaceRecognition()`](../../../misty-ii/javascript-sdk/api-reference/#misty-stopfacerecognition), to cancel any face recognition that's already underway) into your `_registerFaceRec()` function.

```javascript
// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
}
```

We can subscribe to data from Misty's face recognition system by registering for events from the [`FaceRecognition`](../../../misty-ii/robot/sensor-data/#facerecognition) named object. We use the `misty.RegisterEvent()` method to do this. The arguments we pass into the `misty.RegisterEvent()` method set a name for the event, specify the event type (in our case that's `FaceRecognition`), and set how often to receive event messages. We can also choose whether or not to keep the event registered after the first message is sent.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** To learn more about registering for events, see the [`misty.RegisterEvent()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-registerevent).
{{box op="end"}}

Copy the following method into your `_registerFaceRec()` function. Use `FaceRec` for `eventName`, `FaceRecognition` for `messageType`, and `1000` for `debounce`. Set `keepAlive` to `false`.

```javascript
// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();

    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}
```

By default, when the face recognition system sends an event, data from that event is passed into a callback function with the same name, prefixed by an underscore (in our case, `_FaceRec()`). The face recognition system can send events that do not include meaningful face recognition data - for example, the system returns a notification message without any event data each time a skill successfully registers for an event. To ignore these messages (and invoke the callback function ONLY when meaningful data is present), we pass the data through a property test.

We use the `misty.AddPropertyTest()` method to check event data against a custom property test, so we can control when the callback function should be invoked. In our skill, Misty should only invoke the `_FaceRec()` callback when she has actually detected a face. We can use the `misty.AddPropertyTest()` method to check the event data and make sure there is a value for the `Label` property (the label associated with the face, or "unknown person" if it's someone Misty doesn't recognize) before triggering the callback function. To do so, pass in `"Label"` as the `property` to check for, and `"exists"` as the inequality to use. Copy this into your `_registerFaceRec()` function.

```javascript
// Invoke this function to start Misty recognizing faces.
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "Label" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}
```

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** To learn more about property tests, see the [`misty.AddPropertyTest()` reference documentation](../../../misty-ii/javascript-sdk/api-reference/#misty-addpropertytest).
{{box op="end"}}

Now we can define the `_FaceRec()` callback function. Each time a `FaceRec` event passes our property test, that event data is passed into the `_FaceRec()` callback. Define this function in your skill code.

```javascript
// FaceRec events invoke this callback function.
function _FaceRec(data) {

}
```

We place the code that describes how Misty should react when she sees a face inside this `_FaceRec()` callback function. First, let's print the value of the `"Label"` property to [`misty.Debug()`](../../../misty-ii/javascript-sdk/api-reference/#misty-debug) listeners. Because we used a property test to check for the `"Label"` property, we can find the value of that property in the `data` object the callback function receives, at `data.PropertyTestResults[0].PropertyParent.Label`.

Copy the following code into your `_FaceRec()` callback function:

```javascript
/ FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);
}
```

Next, we define how Misty should react when she recognizes your face. We can use the `waveRightArm()` function we wrote [in an earlier part of this tutorial](./#teaching-misty-to-wave) series to have Misty wave to you. We can use the [`misty.DisplayImage()`](../../../misty-ii/javascript-sdk/api-reference/#misty-displayimage) and [`misty.PlayAudio()`](../../../misty-ii/javascript-sdk/api-reference/#misty-playaudio) methods to have Misty show her happy eyes and play a greeting sound.

Let's package this code inside an `if` statement that runs when the value of the `faceDetected` variable is equal to your name. (The `"<FaceID>"` string in this example is just a placeholder; make sure to replace this with your actual name for the skill to run properly.)

```javascript
/ FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <FaceID> below with your own name! If Misty
    // sees and recognizes you, she waves and looks happy.
    if (faceDetected == "<FaceID>") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("s_Joy3.wav");
        waveRightArm();
    }
}
```

If Misty sees someone she doesn't know, use the `misty.DisplayImage()` and `misty.PlayAudio()` methods to have her raise an eyebrow and play a confused sound. Copy this code into your `_FaceRec()` callback function.

```javascript
// FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <FaceID> below with your own name! If Misty
    // sees and recognizes you, she waves and looks happy.
    if (faceDetected == "<FaceID>") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("s_Joy3.wav");
        waveRightArm();
    }
    // If Misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("s_DisorientedConfused4.wav");
    };

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 7000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}
```

At the end of the `_FaceRec()` function, call the [`misty.RegisterTimerEvent()`](../../../misty-ii/javascript-sdk/api-reference/#misty-registertimerevent) method to trigger the `_registerFaceRec()` function after 7000 milliseconds. This ensures that Misty will continue looking for faces, and will greet whomever she sees until the skill ends.

The full `_FaceRec()` function should look like this:

```javascript
// FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <FaceID> below with your own name! If Misty
    // sees and recognizes you, she waves and looks happy.
    if (faceDetected == "<FaceID>") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("s_Joy3.wav");
        waveRightArm();
    }
    // If Misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("s_DisorientedConfused4.wav");
    };

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 7000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}
```

We're almost finished! At the end of your skill code, call the `_registerFaceRec()` function to start Misty recognizing faces and kick off the loop.

```javascript
// Starts Misty recognizing faces!
_registerFaceRec();
```

You're now ready to update your skill. Save your changes, and the Skill Runner to [upload your modified `HelloWorld.js` file to Misty](./#installing-the-hello-world-skill). **Remove Misty from her foam block and set her on the floor, with both her treads firmly on the ground**.

When you run the full Hello World skill, Misty starts looking for faces after she waves for the first time.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's face recognition works best in well-lit environments, and she recognizes faces best when they are directly in front of her visor at a range of closer than about six feet. Because Misty is likely to be on the floor when you run this skill, you may need to kneel down to get within range of her visor. You may also need to wait for Misty to turn her head to look at you, as the head movement commands created in the first part of this series continue to execute until the end of the skill.
{{box op="end"}}

## What's Next?

After you finish the Hello World tutorial series, try customizing the skill to make it your own. Here are a few ideas:
* Consider teaching Misty new faces, and adjusting the face recognition callback to have her greet different individuals in a unique way.
* Try modifying the code from the Changing Misty's LED section to use a different color for the chest LED.
* Experiment with different driving commands to have Misty drive around while she runs your skill.
* In the JSON meta file, increase the value of the `"TimeoutInSeconds"` key to keep the skill running longer.

The elements covered in this tutorial series just scratch the surface of what's possible with Misty. When you're ready, [read our introduction to coding Misty](../../../misty-ii/robot/introduction-to-skills) to learn more about all the different ways she can bring your code to life.