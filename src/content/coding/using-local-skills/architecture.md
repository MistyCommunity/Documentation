---
title: Architecture
layout: onboarding.hbs
columns: three
order: 1
---

# {{title}}

When you write a local skill, your code runs internally on Misty and takes advantage of Misty’s capabilities as a standalone “edge” computing device. Local skills can also interact with external data and use non-Misty API calls to cloud services, etc.

**IMPORTANT! Local skills are a pre-release, “alpha” technology and are subject to frequent change.** Any local skills you create for Misty may need updates before release to reflect ongoing development of the local skill architecture and implementation. Local skills will be publicly available at the time when Misty II ships.

You can read this architecture section to understand the details of how to write local skills. However, you can also simply start right in with the [local skill tutorials](../tutorials) and just skim the following list to get an idea of what you might want to read about later:

* **Command Syntax.** The local skill command syntax differs slightly from that of remote skill commands. 
* **Data Handling: Events and Callbacks.** Both stored and live data from the robot are made available to a local skill via callback functions.
  * “Get” Data Callbacks
  * Sensor Event Callbacks
  * Timed or Triggered Event Callbacks
* **Data Handling: Variables.** There are two ways to store persistent data with local skills: as a global variable or as “set” data.
* **Command Type Reference.** There are several command types available to local skills, with some usage differences among them.
  * Action Commands
  * Get Commands
  * Event Commands
  * Helper Commands
  * Skill Management Commands
* **File Structure & Code Architecture.** There are two required file types for a local skill: a “meta” JSON file and a “code” JavaScript file.
* **Loading & Running a Local Skill.** There are currently two options for how you load and run skills.
* **Starting & Stopping a Local Skill.** Currently, local skills running on Misty I must be triggered to start/stop from an external request.

## Command Syntax

In a local skill, the syntax for using a command is:

```JavaScript
misty.<COMMAND>(parameters);
```

So, for example, to change the color of Misty’s logo LED, you would call the `ChangeLED()` command like this:

```JS
misty.ChangeLED(255, 0, 0);
```

When used with local skills, most of Misty’s commands also allow you to pass in optional “pre-pause” and “post-pause” values, to add delays before the command is run or after. When we show a command, optional parameters are inside brackets. So the `Drive()` command is represented as:

```JS
misty.Drive(double linearVelocity, double angularVelocity, [int prePause], [int postPause]);
```

If you use a given optional parameter (such as `postPause`), you must place a value in any preceding optional parameter (such as `prePause`). For example:

```JS
misty.Drive(50, 10, 0, 1000);
```

An example of using the optional pre- and post-pause parameters with the `Drive()` command might be:

```JS
misty.Drive(50, 10, 500, 1000);
misty.Stop();
```

In this case, the `Drive()` command would wait 500 milliseconds, start the robot driving at the given linear and angular velocities, then pause execution for 1000 milliseconds (this would pause the skill execution but not the driving itself). After the 1000 millisecond delay, the `Stop()` command would run, bringing the movement of the robot itself to a halt.

## Data Handling: Events & Callbacks

You typically get two kinds of information from your robot:

* Stored data, such as the list of audio files currently saved on the robot. This is the type of data you could obtain with one of Misty’s “Get” commands, for example.
* Live sensor “event” data, such as distance information, face detection events, etc.

Both types of data are made available to local skills via callbacks, so you must implement callback methods to be informed when data is ready.

The syntax and usage of callback commands for these two types of data varies. Additionally, there is a third category of callbacks you can create for Misty: timed or triggered callbacks. Their usage and syntax are described at the end of this section.

### “Get” Data Callbacks

For “get” callback functions, the callback name is by default set to be  `_<COMMAND>` (you can use your own callback name if desired). So, for example, the default callback function for `GetDeviceInformation` would be `_GetDeviceInformation`.

A “get” callback function must have exactly one parameter. That parameter holds the data returned through the callback. Note that a local skill callback returns data as an object, not as a JSON string value. An example use of a callback to obtain an audio list and play a random sound is as follows:

```JS
StartMySkill();

function StartMySkill() {
	misty.GetListOfAudioClips();
}

function _GetListOfAudioClips(callbackData) {
    var audioList = callbackData.Result;
    if (audioList.length > 0) {
        var randomInt = Math.floor(Math.random() * audioList.length);
        var currentSound = audioList[randomInt].Name;
        misty.PlayAudioClip(currentSound);
    }
}
```

“Get” callbacks may be set up with callback rules and a skill to trigger for the callback instead of calling back into the same skill. The available callback rules are `Synchronous`, `Override`, and `Abort`.
* `Synchronous` tells the system to run the new callback thread and to continue running any other threads the skill has started.
* `Override` tells the system to run the new callback thread but to stop running commands on any other threads, including the thread the callback was called within. The system only runs the thread the callback was triggered in, once the callback comes back.
* `Abort` tells the system to ignore the new callback thread if the skill is still doing work on any other threads (including the original thread the callback was called within). For “get” callbacks, using abort in this case would mean that the data requested would not be received.

Sample “get” callback with a callback rule:

```js
misty.GetListOfAudioClips("synchronous", 500, 1000);
```

Sample “get” callback with a callback rule and including the ID of a skill to trigger:

```js
misty.SlamGetMap("override", "9d50efbd-af53-4cd3-9659-c0faf648263d", 500, 10);
```

### Sensor Event Callbacks
For event callback functions, you set an event name (`eventName`) of your choice at the time you register for the event using the `misty.RegisterEvent()` function. The name of the callback function name is set automatically to be the same as your event name, prefixed with an underscore. The `messageType` value is whatever the predefined `Type` property value is for the data stream [as listed here](../../using-remote-commands/websocket-reference).

The `misty.RegisterEvent()` function has the following form:

```js
misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive], [string callbackRule], [string skillToCall]);
```

So at its most simple, registering to receive callback data for a `SelfState` event might look like:

```js
misty.RegisterEvent("UpdatedAwareness", "SelfState", 1000, true);
```

Note that the `misty.RegisterEvent()` command may optionally be set up with callback rules and a skill to trigger for the callback instead of calling back into the same skill. The available callback rules are `Synchronous`, `Override`, and `Abort`.
* `Synchronous` tells the system to run the new callback thread and to continue running any other threads the skill has started.
* `Override` tells the system to run the new callback thread but to stop running commands on any other threads, including the thread the callback was called within. The system only runs the thread the callback was triggered in, once the callback comes back.
* `Abort` tells the system to ignore the new callback thread if the skill is still doing work on the original thread the callback was called within. For event callbacks, the new callback is ignored until all current processes are finished running, then the event is processed the next time it is sent.

Before registering an event callback, you can use the `AddPropertyTest()` command to create one or more property comparison tests to specify the event data that the system sends:

```js
AddPropertyTest(string eventName, string property, string inequality, string valueAsString, string valueType);
```

**Note:** If you do not specify a property test, the system returns the full data object for the event. 

You can also use the `AddReturnProperty()` command to add any additional return property fields you may need:

```js
misty.AddReturnProperty(string eventName, string eventProperty);
```

An event callback function must have one parameter to store the data returned through the callback, so an example of an event callback might be:

```js
function _UpdatedAwareness(callbackData) {
    //do work with data
}
```

Putting these together, an example of registering events with property comparison tests (based on the direction of Misty’s movement) might look like this:

```js
function RegisterEvents(goingForward) {
     
    if (goingForward) {
        misty.UnregisterEvent("BackTOF");   	
        misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
        misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.6, "double");
        misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100, false);
    }
    else {  	
        misty.UnregisterEvent("FrontTOF");
        misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
        misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.6, "double");
        misty.RegisterEvent("BackTOF", "TimeOfFlight", 100, false);
    }
}
```

Finally, when an event callback is triggered, note that by default it unregisters the callback to prevent more commands from overriding the initial call, which can become an issue with fast-triggering events. To handle this, you have two choices:
* You can re-register the event in the event callback function.
* To keep the event alive and not unregister on a callback, you can pass true for the keepAlive parameter when you register the event.

### Timed or Triggered Event Callbacks
Using the `RegisterTimerEvent()` function, you can create an event that sends a callback after a certain period of time:

```js
misty.RegisterTimerEvent(string eventName, int callbackTimeInMs, bool keepAlive);
```

By default, that event is triggered once and removed, but you can choose to have it call back until unregistered. To do this, you can specify true for the `keepAlive` parameter when registering for the timer event. This causes the event to automatically reset when the callback is triggered.

For example, you can set the `callbackTimeInMs` parameter to 5 seconds and specify `keepAlive` to be true. Then, after the callback is triggered, the timer resets and the callback will be called again every 5 seconds until the timer event is unregistered with `UnregisterEvent` or is automatically unregistered when the skill ends.

You can also create a triggered event to call back to the skill when a specific command is called. That event is triggered once and removed, but you can immediately re-register as needed in the callback:

```js
misty.RegisterUserEvent(string eventName, string callbackMethod);
```

You can also trigger an event by making a REST call to the event endpoint with a POST command:

```html
POST {robot-ip-address}api/alpha/sdk/skills/event
```

With a JSON body similar to:

```json
{
    "UniqueId" : "b307c917-beb8-47e8-9bbf-1c57e8cd4d4b",
    "EventName": "UserEventName",
    "Payload": { "mydata": "two" }
}
```

The `UniqueId` and `EventName` values are required and must match the ID of the skill to call and the event name you used in that skill. You should place any payload data you wish to send to the skill in the `Payload` field.

## Data Handling: Variables
There are two ways to store persistent data with local skills:
* In a global variable, where the data is available (but not updated) across threads in a single skill
* As “set” data, where the data is available (and updated) across threads in a single skill and is shareable among skills

**Important!** There is no capability at this time to store variable data such that it persists across a reboot of the robot.

You can create global variables and use them across all “get” and “event” callbacks within a single skill. Global variables are copied over to new threads as they are created from callbacks. Global variables must be declared at the top of a skill, are prefixed with an underscore, and are not declared as `var`, `const`, etc.

Note that the value of a global variable is only preserved going forward. That is, if you have a thread running that spawns a new thread (via a “get” or “event” callback) but then continues to process, the global value will not update for the original thread; only the child thread will update that value going forward. 

In this example, `_imageCount` is declared and used as a global variable:

```js
_imageCount = 72;

StartSkill();

function StartSkill() {
    misty.GetListOfImages();
}

function _GetListOfImages(response) {
    if (response.Result.length != _imageCount) {
        misty.Debug("Wrong number of expected images!");
        misty.PlayAudioClip("SadSound.wav", 50);
    }
}
```

In cases where you need persistent data that can be (a) validly updated across threads or (b) shared between skills, you need to use the cross-skill `Set()` command:

```js
misty.Set(string key, string value);
```

Data saved using `Set()` must be one of these types: `string`, `bool`, `int`, or `double`. Alternately, you can serialize your data into a string using `JSON.stringify()` and parse it out again using `JSON.parse()`.

Additional commands that operate on data across skills are described in the “Helper Commands” section below. 

<!-- TODO: Add link to Helper Commands section -->

## Command Types
The following briefly describe the categories of commands you have available to work with Misty.

### Action Commands
Action commands tell the robot to do something, but do not return data, so they do not require you to implement a callback. Most action commands -- such as `ChangeLED` or `Halt` -- are extremely simple to use. However calling others -- such as `SlamStartTracking` -- can require a specific pattern of calls (this first, that second) to work. For details on all action commands, see the [JavaScript API reference documentation](../javascript-api).

### Get Commands
Get commands obtain data from the robot, so they require you to implement a callback to be notified when they return. The callback should contain exactly one parameter, to hold the data being returned. See the “Get Data Callbacks” section above for more usage details.

<!-- TODO: add link to GET DATA CALLBACKS section -->

### Event Commands
All of the event command types require you to implement a callback to be notified when they return.

* **Sensor Events.** These commands (such as `RegisterEvent` and `AddPropertyTest`) allow you to be notified when sensor data that meets your criteria is available from Misty. See the “Sensor Event Callbacks” section above for more usage details.
* **Timed Events.** Using the `RegisterTimerEvent` command, you can create timed events that call back to the skill after a certain period of time.
* **Triggered Events.** With the `RegisterUserEvent` command, you can also create a triggered event to call back to the skill when an specific command is called. See the “Timed or Triggered Event Callbacks” section above for more details on using user-defined event callbacks.

<!-- TODO: Add link to Timed or Triggered Event Callbacks section -->

### Helper Commands
The system supplies the following types of helper commands to assist you in creating a local skill for Misty.

* **Persistent Data.** To create data that persists across skills, you must use one of the following helper commands to save (set) that data to the robot or to get that data from the robot: `Set`, `Get`, `Remove`, `Keys`. Persistent data must be saved as one of these types: `string`, `bool`, `int`, or `double`. Alternately, you can serialize your data into a string using `JSON.stringify()` and parse it out again using `JSON.parse()`. Currently, any data saved to the robot this way is not automatically deleted and by default may be used across multiple skills. **Important!** Data stored via the `Set()` command does not persist across a reboot of the robot at this time.
* **External Data.** Another type of helper command allows your local skill to use data from the Internet. The `SendExternalRequest()` command allows you to obtain remote data and optionally save it to the robot and/or use it immediately. See the [Hello, World: External Requests](../tutorials/#hello-world-external-requests) tutorial for an example of using this functionality. <!--TODO: Add link to sendexternalrequest tutorial-->
* **Pausing and Debugging.** There are a few additional helper commands you can use to help with your local skill: `Pause`, `RandomPause`, `Debug`, `CancelSkill`, and `Publish`. These commands are described in the [JavaScript API reference documentation](../javascript-api). Note: A local skill must have `BroadcastMode` set to `Verbose`, `Debug`, or `All` in the meta file for debug statements to be broadcast. By default, debug statements are set to `Off`.

### Skill Management Commands
The system provides some REST commands that you can use to control local skills from a remote device. For details on these, see the [JavaScript REST API reference documentation](../javascript-api). <!--TODO:--> Add Link These include commands to:
* Upload skills to the robot
* Load, reload, or unload one or more skills
* Run a skill
* Get a list of uploaded skills on the robot
* Cancel a running skill
* Trigger an event within a skill
 
## File Structure & Code Architecture
There are two basic file types required for a local skill: a “meta” JSON file and a “code” JavaScript file. On the robot, these files are located in the following directory structure:

<!-- TODO: cleanup the code samples below -->

```
User Folders\Music\SDKAssets\Misty\Skills\Meta\[filename.json]
User Folders\Music\SDKAssets\Misty\Skills\Code\[filename.js]
```

Each skill MUST have files of the same name in both the `Code` and `Meta` folders. For example:

```
User Folders\Music\SDKAssets\Misty\Skills\Meta\Roam.json
User Folders\Music\SDKAssets\Misty\Skills\Code\Roam.js
```

### Meta File

Every local skill must include a named meta file with a `.json` extension. This brief meta file enables Misty to understand what your skill does and how to execute your code. For example:

```json
{
    "Name": "sample_skill",
    "UniqueId" : "f34a3aa0-8341-4047-8b54-59d658620ecf",
    "Description": "My skill is amazing!",
    "StartupRules": ["Manual", "Robot"],
    "Language": "javascript",
    "BroadcastMode": "verbose",
    "TimeoutInSeconds": 300,
    "CleanupOnCancel": false,
    "WriteToLog": false,
    "Parameters": {
        "int":10,
        "double":20.5,
        "String":"twenty"
        "foo": "bar"
    }
}
```

The value for `UniqueId` should be a 128-bit GUID, and `Name` can be any value you want. To get up and running quickly with your own skill, you can duplicate the values we’ve provided and simply generate a new GUID for the `UniqueId` value.

Note that the `WriteToLog` value is optional, and that example meta files may include additional key/value pairs that are not currently in active use and may change in the future.

You can use the `Parameters` value(s) in the meta file to define any optional default parameters for the skill. You can then access these values in your code file via the global `_params` variable.

So, in the example below from the code file for a skill, we could create a global variable named `_global` that would hold the value `"bar"`, which was set in the meta sample above:

```js
_global = _params.foo;
```

### Code File
The `.js` code file contains the running code for your local skill. A valid JavaScript code file can be even simpler than a corresponding JSON `meta` file. Here’s an example of a complete, very simple code file for a local skill:

```js
misty.Debug("Hello, World!");
misty.ChangeLED(0, 255, 0);
```

Most local skills include callback functions and registering and unregistering of events. That’s because most local skills interact with data in some way. For example, when sensor data is sent from Misty to your code, it triggers an event, and this in turn executes the callback function for the registered event.

In the sample skill code file below, an event callback function is used to handle sensor data from one of Misty’s time-of-flight sensors:

```js
// Debug message to indicate the skill has started
misty.Debug("Starting my skill");

// Issue POST commands to change LED and start DriveTime
misty.ChangeLED(0, 255, 0); // green, GO!
misty.DriveTime(50, 0, 10000);

// Register for TOF and add property tests
misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100, true);

// Define the TOF callback
function _FrontTOF(data) {
    // Grab property test results
    let frontTOF = data.PropertyTestResults[0].PropertyParent;

    // Log distance object was detected and sensor
    misty.Debug(JSON.stringify(frontTOF.DistanceInMeters));
    misty.Debug(JSON.stringify(frontTOF.SensorPosition));

    misty.Stop();
    misty.ChangeLED(255, 0, 0);
    misty.Debug("Ending my skill")
}
```

Note that when a skill starts, the code within the skill automatically starts running. When a skill has finished executing (or has been cancelled), normal cleanup automatically begins. Normal cleanup drops any pending callbacks, deletes cached code, etc.

If `CleanupOnCancel` is set to true in the meta file, then when a skill is cancelled, additional commands are automatically issued to stop running processes that may have been started in the skill. These process might include facial detection / recognition / training, SLAM mapping / tracking / recording / streaming, and record audio. If `CleanupOnCancel` is set to `false`, then this additional cleanup does not occur when cancelled (`false` is currently the default value). Currently, this does not affect the behavior of the skill if it ends normally. These commands are not automatically issued in this case.

## Loading & Running a Local Skill
Once you’ve created the files for your skill, you must load them onto your robot before you can run them. The two methods for loading skills onto Misty are:
* the [Misty Skill Runner](https://skill-runner.mistyrobotics.com) web tool, which provides a simple upload feature
* a REST tool such as Postman that can send a `POST` request to the dedicated endpoint for skill deployment

### Using Skill Runner 
The Misty Skill Runner web tool is a graphic interface for some of the skill-management actions that you would otherwise need to handle via a REST client. For details on using Skill Runner to load and run a skill, see the Misty Skill Runner guide in the Tools seciton of these docs.

### Using Postman
There are many ways to send a `POST` request to the skill deployment endpoint, but here we’ll use Postman.

1. Compress and save your skill’s `Meta` and `Code` files into a .zip file with the same name as your skill.
2. To attach your skill .zip to the request, first navigate to the Headers section in Postman.
3. For the header key, enter “Content-Type”.
4. In the body section confirm that “form-data” is selected at the top.
5. For the header value, enter “multipart/form-data”.
6. For the body key, enter “skills”, then select “File” from the dropdown menu on the right.
7. In the body value section, click “Choose Files” and select the .zip file for your skill.
8. To add and load a skill onto the robot, send a POST request to `http://{your robot’s ip address}/api/alpha/sdk/skill/deploy` with the following parameters:
   * `Skill` (byte array) - A zipped file containing the two skill files (Meta and Code).
   * `ImmediatelyApply` (boolean) - `true` or `false`. Specifies whether the robot immediately runs the uploaded skill.
   * `OverwriteExisting` (boolean) - `True` or `False`. Indicates whether the file should overwrite a file with the same name, if one currently exists on this robot.
9. Look at the response to confirm the request was successful.
10. Open `SkillRunner.html` and connect to Misty using your robot’s IP address.
11. Open up your browser’s JavaScript console for the Skiller Runner page, so you can see what’s happening.
12. Click **Reload Skills** at the top of the page. This ensures that your robot and latest code changes are in sync. Observe the JavaScript console for a log message verifying the skills have been loaded.
13. To run your skill, enter the skill’s name under “Run Skill” and click **Run**. Continue observing the console; as events are triggered, you’ll see debug messages in the console.

## Starting & Stopping a Local Skill
Currently, local skills running on Misty I must be triggered to start/stop from an external command. This command can be sent via a REST client or as a JavaScript AJAX request.

To start a skill, send the `RunSkill POST` command with the following syntax. Note that the `Skill` value must be the same as the `Name` value for the skill in its JSON `meta` file.

```html
<!-- Endpoint -->
POST http://{robot-ip-address}/api/alpha/sdk/skill

<!-- Payload -->
{
    "Skill": "SkillName"
}
```

For example:

```html
<!-- Endpoint -->
POST http://{robot-ip-address}/api/alpha/sdk/skill

<!-- Payload -->
{
	"Skill": "Roam"
}
```

To stop a skill, send the `CancelSkill POST` command to the following endpoint, again using the Name value for the skill from its JSON `meta` file:

```html
<!-- Endpoint -->
POST http://{robot-ip-address}/api/alpha/sdk/cancel

<!-- Payload -->
{
	"Skill": "Roam"
}
```

To stop all running skills, send the same `POST` command with an empty payload (no skill name specified):

```html
<!-- Endpoint -->
POST http://{robot-ip-address}/api/alpha/sdk/cancel

<!-- Payload -->
{}
```

**Important!** Local skills are subject to a default timeout of 5 minutes. After 5 minutes the skill will cancel, even if it is performing actions or waiting on callbacks. This duration can be changed by providing a different `TimeoutInSeconds` value in the `meta` file. In addition, if a skill is not performing any actions nor waiting on any commands, it will automatically cancel after 5 seconds.