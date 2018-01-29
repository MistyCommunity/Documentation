---
title: Getting Started with Misty I
layout: onboarding.hbs
columns: two
order: 1
---

# {{title}}

Let's get started! ...

How to start programming a robot:
- Reference the Misty.API classes in your html: 
- MistyAjax.js - sends AJAX calls to robot
- MistyAPI.js - maps one-to-one to Misty's API endpoints, constructs payloads to pass to MistyAJAX.js.  You can call it directly once you have created a new MistyRobot by inputting the robot's ip address, port, and verbose level
-MistyRobot.js  - builds the Server URL based on the robot you are attempting to interact with and provides a wider and more user-friendly range of commands than Misty.API
- Run the SDK to see a sample of how to implement MistyRobot.js commands with buttons and inputs.  
- SampleUI.js contains all of the event listeners linked to these buttons.
- To get a map or a path, follow the SLAM instructions on the Index.html page.  In can be tricky at first, but you will get the hang of it.  
-Verbose Level (1-3) refers to the volume of console messages you would like to receive. Selecting 3 will give you a console message for the methods in all 3 classes, for example.  The console messages can be helpful when getting started but experiment with whichever level is most helpful to you. 

Ask questions. 

Share knowledge.
