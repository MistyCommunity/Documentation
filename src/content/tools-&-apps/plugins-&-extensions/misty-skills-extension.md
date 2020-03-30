---
title: Misty Skills Extension for VSC
layout: coding-tools.hbs
columns: one
order: 
---

# {{title}}

You can use the Misty Skills extension for [Visual Studio Code](https://code.visualstudio.com/) to aid in skill development. This extension provides a list of the available methods in Misty's on-robot JavaScript API. It offers auto-complete, tabbed parameter entry, and information about each method. It also provides basic commands for uploading, running, and stopping skills on Misty from within the Visual Studio Code editor.

### Installing the Misty Skills Extension

Follow these steps to install the Misty Skills extension:

1. [Click here to download the extension](https://misty-releases.s3.amazonaws.com/vsc-extension/latest/mistyskills-0.0.5.vsix).
2. Open Visual Studio Code.
3. Use **Ctrl** + **Shift** + **X** (Windows) or **Command** + **Shift** + **X** (Mac) to see your list of Installed extensions.
4. Use the menu at the top of this list to select the option to **Install from VSIX...**
5. Navigate to the folder where you downloaded the `.vsix` file and select it to install.

### Activating the Misty Skills Extension

To activate the extension when writing a skill:
* On Mac OS - Press **Command+Shift+P** and select MistySkills.
* On Windows - Press **Control+Shift+P** and select MistySkills.

With the extension activated, start typing `misty` in a JavaScript code file to start getting autocomplete and command information.

![VSC Extension autocomplete example](/assets/images/vsc-plugin-autocomplete.gif)

### Uploading, Running, and Stopping Skills

When the Misty Skills extension is active, you can run commands directly from your VSC window to upload a skill, upload and run a skill, or to stop the skills that Misty is currently running. This makes it possible to edit and update your skill code on Misty without leaving your text editor.

The list of currently available commands is:

* Upload
* Upload and Run
* Stop Skills

To view and use these commands:

1. Make sure Misty is powered on and connected to the same local Wi-Fi network as your computer.
2. Activate the Misty Skills extension in Visual Studio Code.
3. Press **Command+Shift+P** (Mac) or **Control+Shift+P** (Windows).
4. Type **Misty:** to see the list of commands, and select the command you want to use.

![List of commands in VSC plugin](/assets/images/misty-skills-vsc-commands.gif)

To **upload** a skill:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Upload and Run**.
3. Enter Misty's IP address. (You can find Misty's IP address in the [Misty companion app](../../../tools-&-apps/mobile/misty-app)).
4. Watch for the notification that the upload is complete.

To **upload and run** a skill:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Upload**.
3. Enter Misty's IP address. (You can find the IP address in the [Misty companion app](../../../tools-&-apps/mobile/misty-app)).
4. Watch for the notification that the upload is complete and wait for your skill to run.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you run the **Upload** or **Upload and Run** command, the Misty Skills extension compresses the entire directory for the currently active file into a .zip and attempts to upload this .zip to Misty using the [SaveSkillToRobot](../../../misty-ii/reference/rest/#saveskilltorobot) endpoint. Loading a skill onto Misty this way also uploads any image and audio files from the compressed directory to Misty and associates them with the skill.

An upload will fail if the directory you attempt to upload does not contain the [JSON `meta`](../../../misty-ii/coding-misty/javascript-sdk-architecture/#file-structure-amp-code-architecture) file for the skill. If there is a problem with an upload, the extension displays an error notification in your Visual Studio Code window. Click this notification to see more details about the error.

For more information about loading skills onto Misty, see [Loading & Running a JavaScript Skill.](../../../misty-ii/coding-misty/javascript-sdk-architecture/#loading-amp-running-a-javascript-skill)
{{box op="end"}}

To **stop skills**:

1. Follow the steps above to view the list of commands.
2. Select **Misty: Stop Skills**.
3. Enter Misty's IP address. (You can find the IP address in the Misty [Misty companion app](../../../tools-&-apps/mobile/misty-app).)
4. Watch for the notification that the command was successful and wait for Misty to stop skill execution.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When you use the **Misty: Stop Skills** command, the Misty Skills extension stops skill execution by sending a POST request to the REST endpoint for Misty's [CancelSkill](../../../misty-ii/reference/rest/#cancelskill) command.
{{box op="end"}}