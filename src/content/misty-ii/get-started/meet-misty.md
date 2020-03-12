---
title: Meet Misty
layout: onboarding.hbs
columns: one
order: 1
---

# {{title}}

Welcome to the Misty II Getting Started guide! This document provides a set of activities to familiarize developers with Misty II, her SDK, and her web-based developer tools.

Follow this guide to learn:

* how to use Misty's [Command Center](http://sdk.mistyrobotics.com/command-center) to discover your robot's capabilities and send basic commands before writing your own code
* how to use Misty's [API Explorer](http://sdk.mistyrobotics.com/api-explorer) to interact with Misty's REST API and generate sample code for your skills and robot applications
* how to install and run your own skills on Misty II via Misty's [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/index.html)

**Before you begin**, you need:
* a Misty II robot that's powered on and connected to your local Wi-Fi network.
* the IP address for your Misty II robot. You can find Misty's IP address in the [**Misty App**](../../../tools-&-apps/mobile/misty-app) for your mobile device. 

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you have not yet connected your Misty II robot to your Wi-Fi network, you can do so now by using the Misty App for iOS or Android. After you download the app, you can log in using the same credentials you use for the [Misty Community Forums](https://community.mistyrobotics.com/). If you don't yet have an account, you'll be asked to create one before you can log in. For more information, see the instructions in the [Misty App section of this documentation](../../../tools-&-apps/mobile/misty-app).
{{box op="end"}}

**Before getting started**, power on your robot and place Misty on the black foam block that arrived in her box. While Misty is designed to automatically detect obstacles and ledges, placing her on this foam block will ensure that she doesn’t accidentally roll off the table while you're coding.

![Misty sits on her block stand](/assets/images/misty-stand.gif)

## Sending Basic Commands

The [Command Center](http://sdk.mistyrobotics.com/command-center/index.html) is a graphic interface for sending commands to Misty without writing any code. Follow the steps in this section of the Getting Started guide to familiarize yourself with the different elements of the Command Center.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** For best results, we recommend using the Command Center with the latest version of the Google Chrome browser.
{{box op="end"}}

Follow these steps to start using the Command Center:

1. [Open up the Command Center](http://sdk.mistyrobotics.com/command-center) in a browser window.
2. Enter your robot's IP address in the upper-right hand corner of the page and click the **Connect** button. (You can find your robot's IP address in the Misty App.) Look for a "Connected successfully" message to appear at the bottom of the browser window.

Once connected, you can experiment with Misty's functionality by interacting with different elements of the Command Center. Here are a few things to try:

* Use the **Expression** section to change the color of Misty's chest LED, show a different image on her display, and have her play a sound.
  * Use the color picker or type in different RGB values and click the **Change LED** button. For example, if you wanted Misty's LED to be purple, use **Red**: `101`; **Green**: `73`; and **Blue**: `157`. ![Change LED animation](/assets/images/command-center-change-led-animation.gif)
  * Change Misty's eyes by choosing a different file from the **Change Display Image** menu. For example, try changing her eyes to `e_JoyGoofy2.jpg` or `e_Surprise.jpg`. ![Change display image animation](/assets/images/command-center-display-image-animation.gif)
  * Play a sound by choosing a file from the **Play Audio File** menu, like `s_Boredom.wav` or `s_Sleepy.wav`.![Play audio animation](/assets/images/command-center-play-audio-animation.gif)
* Use the **Movement** section to move Misty's head and arms. ![Head and arm movement controls](/assets/images/command-center-movement-animation.gif)
  * Move Misty's head by moving the sliders under **Head Movement**. Set a new **Pitch**, **Yaw**, or **Roll** position, and then click the **Set** button.
  * Move Misty's arms by moving the left or right slider and clicking the **Rotate Left Arm** or **Rotate Right Arm** button.
* To prepare Misty for the Hello World tutorial series, use the **Perception** section to train Misty to recognize your face. ![Face Training interface](/assets/images/command-center-face-training-animation.gif)
  1. To make sure Misty's head is positioned for effective face training, use the **Pitch**, **Yaw** and **Roll** commands under the **Movement** section to align Misty’s gaze with yours. Then, in the **Perception** section, go to **Face Training** and type your name in the **Name to Train** field. Make sure to enter a single word without spaces.
  2. Click the **Start Face Training** button. Wait 10-15 seconds for face training to complete. The main Command Center window displays pop-up status messages during the face training process.
  3. When face training is complete, you can click the **Get Learned Faces** button to see the labels for people Misty can recognize. Check for your name to make sure Misty learned your face.
* Use Misty's camera to take a picture.
  * Use the head movement controls to point Misty's visor at something you'd like to photograph. In the **4K Camera** section, click the **Take + Display Photo** button to see what Misty’s sees. ![Take Picture controls](/assets/images/command_center_take_photo.png)

## Exploring Misty's API

You can use Misty's [API Explorer](http://sdk.mistyrobotics.com/api-explorer) to browse Misty's list of REST API endpoints, send requests to Misty, experiment with different parameters, and generate code samples for Misty's REST API and on-robot JavaScript API. This section of the Getting Started guide teaches how to start using the API Explorer to send commands directly to your robot.

Follow these steps to start learning about the API Explorer:

1. Follow the link at the top of the Command Center to open up the [API Explorer](http://sdk.mistyrobotics.com/api-explorer) web page. If Misty is still connected to the Command Center when you do this, this connection carries over to the API Explorer, and there's no need to reconnect. If not, you'll need to use Misty's IP address to connect your robot to the API Explorer.
2. Start by changing the color of Misty's chest LED. Open the **Expression** group in the left-hand side of the page and select the **ChangeLED** command.
3. Under the **Parameters** section, add a value between `0` and `255` in the **Red**, **Green**, and **Blue** fields. For example, if you want her LED to be fuschia, use **Red**: `204`, **Green**: `0`, **Blue**: `204`.
4. Click **Send Request** to send the command and change the LED. The full sequence looks like this: ![API Explorer ChangeLED animation](/assets/images/api-explorer-send-request-animation.gif)
5. Next let’s play an audio clip from Misty's built-in speakers. Select the **Expression** group from the list on the left-hand side of the page, and click on the **PlayAudioClip** command. 
6. Enter the file name for one of Misty's default system audio files into the **FileName** field. Try using `s_Joy3.wav,`,
`s_Amazement.wav`, or ` s_Annoyance.wav`. Set the volume to a number between `10` and `100`, and then click **Send Request**. ![API Explorer play audio clip parameters](/assets/images/api_explorer_playAudio_params.png)
1. Lastly, let’s change Misty's eyes. Select the **ChangeDisplayImage** command from the list of commands. Enter `e_Disgust.jpg`, `e_Admiration.jpg`, or `e_Fear.jpg` into the **FileName** field, and click **Send Request**.

## Uploading Skills with Skill Runner

The [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/index.html) web page allows you to install, run, and manage skills on Misty. This section of the Misty II Getting Started guide teaches how to use the Skill Runner to deploy the sample `mistySeesYou` skill to Misty. When you run this skill, Misty looks for your face and reacts when she sees you.

You can download the files for the `mistySeesYou` skill from the [`mistySeesYou` repository in the MistySampleSkills GitHub organization](https://github.com/MistySampleSkills/mistySeesYou). This repository includes:
* `mistySeesYou.js`, which contains the JavaScript that Misty executes when she runs the skill
* `mistySeesYou.json`, which contains a JSON object with metadata and and parameters required to run a skill

Create a new folder on your desktop called **mistySeesYou**. Download the `mistySeesYou` skill files to that folder. Then, follow these steps to install and run the skill on your Misty II:

1. Follow the link at the top of the API Explorer to open up the [Skill Runner](http://sdk.mistyrobotics.com/skill-runner) web page. If Misty is still connected to the API Explorer when you do this, this connection carries over to the Skill Runner, and there's no need to reconnect. If not, you'll need to use Misty's IP address to connect your robot to the Skill Runner.
2. Open your browser's web console to view debug messages, error messages, and other data Misty sends to the Skill Runner web page. To open the web console in Chrome, use **Ctrl + Shift + J** (Windows) **Ctrl + Shift + X** (Linux) **Cmd + Option + J** (Mac).
3. Under the **Install** section of the Skill Runner, click **Choose a file**. Navigate to the folder where you downloaded the `mistySeesYou.js` and `mistySeesYou.json` files. Select **both files** and then click **Open**.
4. When the skill uploads, it appears in the **Manage** section of the Skill Runner page. Find the **mistySeesYou** skill and click **Start** to run it, or stop to **stop the skill.**

## What's Next?

Now that you've spent some time with Misty and her tools, you're ready to write your first robot skill. We suggest working through Misty's [Hello World Tutorial Series](../../../misty-ii/get-started/hello-world) next. You can also explore how to use the [Visual Studio Code extension](../../../tools-&-apps/plugins-&-extensions/misty-skills-extension) for writing skills and deploying them to Misty from within Visual Studio Code.

## Getting Support

If you get stuck or have questions while developing for and interacting with your Misty II robot, there are several ways to get help.

* For **questions about coding Misty**, post in the Community Forums first. This gives other developers – in addition to all of the Misty staff – the ability to jump in and help. The [Support](https://community.mistyrobotics.com/c/support), [Feature Requests](https://community.mistyrobotics.com/c/wishlist), and [Bug](https://community.mistyrobotics.com/c/bugs) categories (in particular) are monitored for immediate response from 9am-6pm Mountain Time on weekdays and from 9am-4pm Mountain Time on weekends.
* For **customer support** – for example, for shipping questions, or issues with Misty's general functionality – email us at support@mistyrobotics.com. Our email support hours are 9 AM to 5 PM MST Monday through Friday.

## Additional Resources

You can find sample code, tools, wrappers, CAD files for Misty's exterior parts and mounting points, and other useful resources for building with Misty in the [MistyCommunity organization](https://github.com/MistyCommunity) on GitHub. For a curated collection of templates, skills, and robot applications from the community of Misty II developers, see [MistySampleSkills](https://github.com/MistySampleSkills/) on GitHub.