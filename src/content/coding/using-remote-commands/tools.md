---
title: Tools
layout: onboarding.hbs
columns: three
order: 5
---

# {{title}}

We supply two helper tools that make it easy to develop JavaScript skills for Misty:
* `lightClient.js` - The LightClient tool simplifies JavaScript access to the REST endpoints for sending commands to the robot
* `lightSocket.js` - The LightSocket tool streamlines opening, connecting, and subscribing to a WebSocket to receive data back from the robot 

Get both tools [at the Misty I GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills/Tools/javascript)

## Using the LightClient JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src="tools/lightClient.js"></script>
<script src="tools/lightSocket.js"></script>
<script src="app.js"></script>
```

The first step to creating an external skill is to create an instance of the LightClient class, passing in your robot's IP address and the amount of time in ms you want your program to wait before timing out if no response is detected (the default is 30 seconds). 

```javascript
let client = new LightClient("[robot IP address]", 10000);
```

Once you create an instance of LightClient, it's simple to send requests to Misty’s REST endpoints. Most of the URL for Misty’s REST commands are built into LightClient: 

```javascript
http://{ipAddress}/api/
```

In order to use a specific endpoint, just pass in the rest of the URL. For example, you can do the following to send a GET request to the `GetDeviceInformation()` command:

```javascript
client.GetCommand("info/device", function(data) {
    console.log(data);
});
```

Here’s another example of using LightClient to send a GET request to Misty, this time to obtain a list of the images currently stored on the robot:

```javascript
client.GetCommand("images", function(data) {
    console.log(data);
});
```

You will also want to send POST requests to the robot. For a POST command, in order to send data along with the request, just pass it to `lightClient.PostCommand` as the second argument. Be sure to use the `JSON.stringify()` method first, in order to convert the JavaScript value(s) to a JSON string.

For example, we can send a POST request to the `ChangeLED()` endpoint to change the color of Misty's chest logo LED to blue. If there are no errors, the callback returns true, and we log a success message.

Specify the RGB values and convert the data to a JSON string:

```javascript
let data = {
    "red": 0,
    "green": 0,
    "blue": 255
};
payload = JSON.stringify(data);
```

Send the request, including the data:

```javascript
client.PostCommand("led/change", payload, function(result) {
    if(result) {
        console.log("Request Successful")
    }
});
```


## Using the LightSocket JS Helper

Both the `lightClient.js` and `lightSocket.js` files should typically be located in a "tools" or "assets" folder. It’s important to reference the files prior to your application file in your .html page. For example:

```javascript
<script src="tools/lightClient.js"></script>
<script src="tools/lightSocket.js"></script>
<script src="app.js"></script>
```

As we did for LightClient, the first step in using `lightSocket.js` is to create an instance of the LightSocket class, passing in your robot's IP address. Then, you call the `Connect()` method to open a WebSocket connection.

```javascript
let socket = new LightSocket(ip);
socket.Connect();
```

In order to subscribe to a WebSocket using LightSocket, simply call the `Subscribe()` method. The arguments passed to the function correspond to the properties of `subscribeMsg` described in "Getting Data from Misty." See the function below for reference: 

```javascript
socket.Subscribe = function (eventName, msgType, debounceMs, property, inequality, value, returnProperty, eventCallback)
```

Here we create a `TimeOfFlight` WebSocket subscription for the center time-of-flight sensor, and log the data as we receive it:

```javascript
socket.Subscribe("CenterTimeOfFlight", "TimeOfFlight", 100, "SensorPosition", "=", "Center", null, function(data) {
    console.log(data);
});
```

It's always best practice to unsubscribe to the WebSocket connection after use, so at the end of your script, be sure to call the `Unsubscribe()` method:

```javascript
socket.Unsubscribe("CenterTimeOfFlight");
```


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
