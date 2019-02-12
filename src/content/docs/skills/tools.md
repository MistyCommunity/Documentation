---
title: Tools
layout: coding.hbs
columns: one
order: 6
---

# {{title}}

## Misty Skill Runner

The Misty Skill Runner web tool is a graphic interface for some of the skill-management actions that you would otherwise need to handle via a REST client. 

Access to Skill Runner is currently limited to a small group of field trial robot testers. If you are a field trial tester, you can access your Skill Runner download in the Field Trials section of the [Community forums](https://community.mistyrobotics.com/). 

![Skill runner home page](../../../assets/images/skill-runner.png)

To use Skill Runner to upload and run a skill, follow the steps below. 

1. Compress and save your skill’s `Meta` and `Code` files into a .zip file with the same name as your skill.
2. Open Skill Runner and connect to Misty using your robot’s IP address.
3. Open up your browser’s JavaScript console for the Skill Runner page, so you can see what’s happening.
4. Select **Upload Zip File** under “Save Skill to Robot.”![Upload Zip File](../../../assets/images/skill-runner-save-skill.png)
5. Select the .zip file you just created. Observe the JavaScript console for a success message confirming that the upload request was received.
6. Once the file has been uploaded to Misty, click **Reload Skills** at the top of the page. This ensures that your robot and latest code changes are in sync. Observe the JavaScript console for a log message verifying the skills have been loaded. ![Reload Skills](../../../assets/images/skill-runner-reload-skills.png)
7. To run your skill, enter the skill’s name under “Run Skill” and click **Run**. Continue observing the console; as events are triggered, you’ll see debug messages in the console. ![Run Skills](../../../assets/images/skill-runner-run-skill.png)

**Note:** You can generate useable `meta` file content with the Generate Meta Template controls in Skill Runner.

## Visual Studio Code Extension

You can use the Misty skills extension for [Visual Studio Code](https://code.visualstudio.com/) to aid in skill development. This extension provides a list of the available methods in Misty's on-robot JavaScript API.

Access to the Misty skills extension is currently limited to a small group of field trial robot testers. If you are a field trial tester, you can access your extension download in the Field Trials section of the [Community forums](https://community.mistyrobotics.com/). 

![Visual Stuio Code Methods](../../../assets/images/vsc-extension-2.png)

As well as auto-complete, tabbed parameter entry, and information about each method:![Visual Stuio Code Methods](../../../assets/images/vsc-extension-1.png)

To install the extension, use the [Visual Studio Code Extensions Manager](https://code.visualstudio.com/docs/editor/extension-gallery). Select **Install from VSIX** in the dropdown menu.

To activate the extension when writing a skill:
* On Mac OS - **Press Command+Shift+P** and select MistySkills. Type `misty` to start getting autocomplete and command information.
* On Windows - Press **Conrol+Shift+P** and select MistySkills. Type `misty` to start getting autocomplete and command information.

## Working with the API Explorer Code

You can use the code and examples in the [API Explorer download package](https://s3.amazonaws.com/misty-releases/api-explorer/latest/api-explorer.zip) to help you build skills.

### index.html & default.css

These files contain the user interface and styles for the Misty API Explorer.

### SampleUI.js

This file defines the handlers for the ```index.html``` page events. Use `SampleUI.js` to see examples of all of the event listeners linked to the various buttons rendered in ```index.html```. For example, Select a mood or Change LED.

### MistyRobot.js

This file builds the server URL based on the robot you're interacting with. It provides a wider and more user-friendly range of commands than `MistyAPI.js`.

```SampleUI.js``` calls ```MistyRobot.js``` to processes user actions by sending commands through ```MistyAPI.js``` and ```MistyWebSocket.js```.

### MistyAPI.js

This file is a one-to-one wrapper for most of Misty's API endpoints. It constructs payloads to pass to `MistyAjax.js`. You can call it directly once you have created a new `MistyRobot` by inputting the robot's IP address, port, and verbose level.

### MistyWebSocket.js

This file allows you to subscribe to and unsubscribe from Misty's WebSockets.

### MistyAjax.js

A simple wrapper for Ajax ```GET``` and ```POST``` requests, this file sends Ajax calls to Misty.