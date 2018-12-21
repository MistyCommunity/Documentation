---
title: Tools
layout: onboarding.hbs
columns: three
order: 5
---

# {{title}}

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