---
title: Misty JavaScript Extension for VSC
layout: coding-tools.hbs
columns: one
order: 
---

# {{title}}

You can use the Misty JavaScript extension for [Visual Studio Code](https://code.visualstudio.com/) to aid in skill development. This extension provides a list of the available methods in Misty's on-robot JavaScript API. It offers autocomplete, tabbed parameter entry, and information about each method. It also provides basic commands for uploading, running, and stopping skills on Misty from within the Visual Studio Code editor.

## Downloading the Extension

You can download and install the extension from the Visual Studio marketplace. Search for the extension in Visual Studio Code, or [download the extension](https://marketplace.visualstudio.com/items?itemName=MistyRobotics.mistyjavascript) from the web.

## Using Autocomplete

With the extension enabled, start typing `misty` in a JavaScript code file to start getting autocomplete and command information.

![VSC Extension autocomplete example](/assets/images/vsc-plugin-autocomplete.gif)

## Using Commands

When the Misty JavaScript extension is enabled, you can run commands directly from your VSC window to upload a skill, upload and run a skill, or to stop the skills that Misty is currently running. This makes it possible to edit and update your skill code on Misty without leaving your text editor.

The list of currently available commands is:

* Upload
* Upload and Run
* Stop Skills

To view and use these commands:

1. Make sure Misty is powered on and connected to the same local Wi-Fi network as your computer.
2. Open the JavaScript and/or JSON files for a skill in Visual Studio Code.
3. Press **Command+Shift+P** (Mac) or **Control+Shift+P** (Windows).
4. Type **Misty:** to see the list of commands, and select the command you want to use.

![List of commands in VSC plugin](/assets/images/misty-skills-vsc-commands.gif)

To **upload** a skill:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Upload**.
3. Enter Misty's IP address. (You can find Misty's IP address in the [Misty companion app](../../../tools-&-apps/mobile/misty-app)).
4. Watch for the notification that the upload is complete.

To **upload and run** a skill:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Upload and Run**.
3. Enter Misty's IP address. (You can find the IP address in the [Misty companion app](../../../tools-&-apps/mobile/misty-app)).
4. Watch for the notification that the upload is complete and wait for your skill to run.


{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When you use the Misty JavaScript extension to run a skill, the extension connects to Misty's WebSocket server to stream debug messages and other [`SkillData`](../../../misty-ii/robot/sensor-data/#skilldata) event messages to your VSC console.
{{box op="end"}}



{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you run the **Upload** or **Upload and Run** command, the Misty JavaScript extension compresses the entire directory for the currently active file into a .zip file and attempts to upload this file to Misty using the [SaveSkillToRobot](../../../misty-ii/rest-api/api-reference/#saveskilltorobot) endpoint. Loading a skill onto Misty this way also uploads any image and audio files from the compressed directory to Misty and associates them with the skill.

An upload will fail if the directory you attempt to upload does not contain the [JSON `meta`](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#file-structure-amp-code-architecture) file for the skill. If there is a problem with an upload, the extension displays an error notification in your Visual Studio Code window. Click this notification to see more details about the error.

For more information about loading skills onto Misty, see [Loading & Running a JavaScript Skill.](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill)
{{box op="end"}}

To **stop skills**:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Stop Skills**.
3. Enter Misty's IP address. (You can find the IP address in the Misty [Misty companion app](../../../tools-&-apps/mobile/misty-app).)
4. Watch for the notification that the command was successful and wait for Misty to stop skill execution.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When you use the **Misty: Stop Skills** command, the Misty JavaScript extension stops skill execution by sending a POST request to the REST endpoint for Misty's [CancelSkill](../../../misty-ii/rest-api/api-reference/#cancelskill) command.
{{box op="end"}}