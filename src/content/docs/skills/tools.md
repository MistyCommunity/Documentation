---
title: Tools
layout: coding.hbs
columns: one
order: 6
---

# {{title}}

## Visual Studio Code Extension

You can use the Misty skills extension for [Visual Studio Code](https://code.visualstudio.com/) to aid in skill development. This extension provides a list of the available methods in Misty's on-robot JavaScript API.

Access to the Misty skills extension is currently limited to a small group of field trial robot testers. If you are a field trial tester, you can access your extension download in the Field Trials section of the [Community forums](https://community.mistyrobotics.com/).

![Visual Studio Code Methods](../../../assets/images/vsc-extension-2.png)

As well as auto-complete, tabbed parameter entry, and information about each method:![Visual Studio Code Methods](../../../assets/images/vsc-extension-1.png)

To install the extension, use the [Visual Studio Code Extensions Manager](https://code.visualstudio.com/docs/editor/extension-gallery). Select **Install from VSIX** in the dropdown menu.

To activate the extension when writing a skill:
* On Mac OS - **Press Command+Shift+P** and select MistySkills. Type `misty` to start getting autocomplete and command information.
* On Windows - Press **Control+Shift+P** and select MistySkills. Type `misty` to start getting autocomplete and command information.

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
