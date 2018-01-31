---
title: API Explorer
layout: onboarding.hbs
columns: two
order: 7
---

# {{title}}

Misty currently has 51 API endpoints. With the API Explorer, you can use these endpoints to try Misty out, without writing any code.
![API Explorer](../../../assets/images/api_client.png)

## Programming Misty with the API Explorer

As with the companion app and Blockly, when using the API Explorer, make sure your computer and Misty are on the same Wi-Fi network and using Bluetooth.

1. Open the API Explorer [in your web browser.](https://misty:MistyRocks!@api-client.mistyrobotics.io/). When loaded into your browser, you should see the API Explorer looking like the screenshot above.
2. Get the IP address of your robot from the Info tab of the companion app. Enter that IP address and hit the “Set up” button.
3. Confirm the browser is connected to your robot via its IP address:
    * Open your browser’s JavaScript console. (How you do this will vary among browsers and platforms.)
    * Click “Get Device Information” in the API Explorer.
    * You should see information relevant to your robot (such as the IP address) in the browser console. This confirms you’re connected.
4. Select the amount of console messages you’ll receive by setting the Verbose Level (1-3). Selecting 3 will give you a console message for each method in all 3 classes, for example. The console messages can be really helpful when getting started.
5. Experiment with setting Misty’s eyes, LED color, and movement.

Ready for more?

* Reference the `Misty.API` classes in your HTML:
    * `MistyAjax.js` - Sends AJAX calls to Misty.
    * `MistyAPI.js` - Maps one-to-one to Misty's API endpoints and constructs payloads to pass to `MistyAJAX.js`. You can call it directly once you have created a new `MistyRobot` by inputting the robot's IP address, port, and verbose level. 
    * `MistyRobot.js` - Builds the server URL based on the robot you are attempting to interact with and provides a wider and more user-friendly range of commands than `MistyAPI.js`.
* Use `SampleUI.js` to see examples of all of the event listeners linked to the various buttons rendered in index.html. For example, Select a mood or Change LED. 
* To get a map or a path, follow the SLAM instructions at the bottom of the index.html page. For full details, see the “Mapping” section.

## Mapping & Tracking with the API Explorer

**Note: Mapping is alpha.** The software that runs the Occipital sensor is alpha. Experiment with mapping, but recognize that it is unreliable at this time. 

### Mapping
1. In the API Explorer, scroll down to the SLAM: Explore & Get a Map section.
2. Select the Open Websocket button.
3. Select the Subscribe To Pose button. Note: You may not see the Current Pose fields (X, Y, and Last Pose) contain data until you start moving Misty.
4. Select the Start Mapping button. Drive Misty slowly around a small space (start with an area no more than 20’ x 20’). The Current Pose fields should now contain data that updates as Misty moves.
5. When done driving, select the Stop Mapping button.
6. Select the Get Map button and scroll down and see the map your robot generated. The red dot on the map is Misty. The blue-green areas should reflect the driveable terrain for Misty. The white areas are obstacles.

**Note: Without going through the steps above you may not be certain to have pose. Having pose means you know the robot’s location and orientation on a map in the world—how is the robot positioned in the world X, Y, Z coordinates.**

### Tracking
1. If you have successfully generated a map, try selecting the Start Tracking button. This should give you where you are on the map you generated.
2. Select the Stop tracking button.

