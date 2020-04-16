---
title: Skill Runner
layout: onboarding-tools.hbs
columns: one
order: 3
---

# {{title}}

The Misty [Skill Runner](http://sdk.mistyrobotics.com/skill-runner/) web tool is a graphic interface for some of the skill-management actions that you would otherwise need to handle via a REST client. Use the Skill Runner to install, start, stop, and delete JavaScript and .NET skills.

![Skill runner home page](/assets/images/skill-runner.png)

## Setting up Skill Runner

When using Skill Runner, make sure your computer and Misty are connected to the same Wi-Fi network. Follow these steps to connect Misty to Skill Runner:

1. Open Skill Runner in a new browser window.
2. Enter Misty's IP address in the **Robot IP Address** field at the top of the page and select **Connect**.

When Misty connects, the text on the button displays **Connected** and the **Manage** section populates with the skills currently installed on your robot.

## Viewing Debug Messages (and Other Skill Data)

When Misty connects to Skill Runner, the web page subscribes to [`SkillData`](../../../misty-ii/robot/sensor-data/#skilldata) events through a WebSocket connection to Misty. `SkillData` event messages include debug messages, error messages, and other data on-robot skills publish during skill execution. When you run a skill from the Skill Runner page, these messages print to the console in your web browser.

![Skill Runner web console](/assets/images/skill-runner-run-skill.gif)

We recommend using Skill Runner in Chrome browsers for best results. To open the web console in Chrome, use:
* **Ctrl + Shift + J** (Windows/Linux)
* **Cmd + Option + J** (Mac)

## Installing Skills with Skill Runner

Use the **Install** interface to install and update JavaScript or .NET skills.

![Skill Runner Install Interface](/assets/images/skill-runner-install.png)

### Uploading a JavaScript Skill

To upload a JavaScript skill:

1. Make sure your robot is powered on, fully-booted, and connected to the same Wi-Fi network as your computer.
2. Open the Skill Runner web page and connect to your robot using the IP address provided by the Misty App.
3. Select **JavaScript** from the **Install** section. 
4. Drag-and-drop your skill files onto the **Install** box, or click the box to find the files in your computer's file system.
5. The Skill Runner web page displays a message when the upload is complete. You can then start, stop, or delete your skill from the **Manage** section.

![Skill Runner install animation](/assets/images/skill-runner-upload-skill-animation.gif)

{{box op="start" cssClass="boxed noteBox"}}
**Important!** When you install a new skill on Misty, you must upload the JavaScript `code` file and the JSON `meta` file at the same time. You can upload image and audio assets associated with a skill by including these asset files when you upload the skill.
{{box op="end"}}

To update the code for an existing skill, or to associate new image and audio assets with that skill, upload the new or changed files to Misty along with the JSON `meta` file for the skill. Misty uses the `meta` file to identify which existing skill the new files belong to.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When updating an existing skill, make sure the JavaScript `code` file and the JSON `meta` file you upload use the same name as the original skill files.
{{box op="end"}}

### Uploading a .NET Skill

To install a .NET skill using the Skill Runner web page, you must have access to the skill's app package. [Follow these steps to create the app package](../../../misty-ii/dotnet-sdk/getting-started/#creating-a-net-skill-app-package). Then, use the instructions below to upload the app package to your robot. 

1. If you haven't done so already, compress the entire app package directory into a .zip file.
2. Make sure your robot is powered on, fully-booted, and connected to the same Wi-Fi network as your computer.
3. Open the Skill Runner web page and connect to your robot using the IP address provided by the Misty App.
4. Select **.NET** from the **Install** section. 
5. Drag-and-drop the .zip file with the app package onto the **Install** box, or click the box to find the file in your computer's file system.
6. When prompted, enter the credentials for accessing Misty's Windows Device Portal. These credentials are printed on the bottom of your robot, and are the same as the credentials used when [connecting to Misty's file system](../../../misty-ii/robot-misty-ii/#connecting-to-misty-39-s-file-system).
7. Wait for the skill to upload. For .NET skills, this can take several seconds.
8. The Skill Runner web page displays a message when the upload is complete. You can then start, stop, or delete your skill from the **Manage** section.

## Generating a JSON Meta File

You can use the Skill Runner to generate JSON `meta` files for your skills. The Skill Runner **Generate** interface automatically populates various fields in the `meta` file and associates a randomized 128 bit GUID with the `UniqueID` parameter. For more information about `meta` files, see [JavaScript SDK Architecture](../../../misty-ii/javascript-sdk/javascript-skill-architecture).

![Skill Runner Generate animation](/assets/images/skill-runner-generate-meta-animation.gif)

To generate a `meta` template for your skill:

1. Enter your skill's name.
2. Choose **Display** to view the file's contents in a modal on the Skill Runner page, or choose **Download** to download the `.json` file to your computer.
3. Click **Generate JSON Meta Template**.

## Starting, Stopping, and Deleting Skills

Use the **Manage** interface to start, stop, and uninstall Misty's skills. The **Manage** section automatically populates with a list of the skills on your robot when you connect Misty to the Skill Runner page.

![Skill Runner manage interface](/assets/images/skill-runner-manage.png)

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** In the **Manage** section, each skill installed on the connected robot is labeled with either **JS** or **C#**. This label indicates whether the skill was built with Misty's JavaScript SDK or her .NET SDK.  
{{box op="end"}}

### Starting a Skill

To start a skill, select the **Start** button next to the skill's name.

![Start a skill](/assets/images/skill-runner-start-skill.png)

### Stopping a Skill

When a skill is running, the **Start** button turns red and displays **Stop**. Click this button to stop the skill.

![Stop a skill](/assets/images/skill-runner-stop-skill.png)

### Uninstalling a Skill

To uninstall a skill, select the **Delete** button next to the skill's name.

![Uninstall a skill](/assets/images/skill-runner-delete.png)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When you delete a .NET skill, the Skill Runner asks you for the credentials used to access Misty's Windows Device Portal. These credentials are printed on the bottom of your robot, and are the same as the credentials used when [connecting to Misty's file system](../../../misty-ii/robot-misty-ii/#connecting-to-misty-39-s-file-system).
{{box op="end"}}

### Reloading Skills

Most of the time, Misty loads new or updated skills into her skill system right away. You can usually start a newly installed or updated skill without manually reloading all of the skills on your robot. In some cases, however, the system may install a skill without loading that skill and preparing it to run. (For example, installing a skill before Misty is fully booted can lead to a situation where the skill is saved to the robot's storage without being loaded into the skill system.)

If you think your Misty II has not loaded the most recent version of a skill into her skill system, you can click the **Force Skill Reload** button on the Skill Runner web page to manually reload all of the skills on your robot. This button uses the [`ReloadSkills`](../../../misty-ii/rest-api/api-reference/#reloadskills) operation from Misty's REST API to force your robot to reload all existing JavaScript and .NET skills.

![Force Reload Skills button](/assets/images/skill-runner-force-reload-skills.png)

### Advanced Options

To view the **Advanced Options** for a skill, select the **Advanced Options** button.

![Advanced Options Button](/assets/images/skill-runner-advanced.png)

You can use the advanced options interface to start a skill with additional parameters that aren't specified in the skill's `meta` file, or to [send a user event](../../../misty-ii/rest-api/api-reference/#triggerskillevent) with a specific payload to the skill.

![Advanced Options Modal](/assets/images/skill-runner-advanced-modal.png)