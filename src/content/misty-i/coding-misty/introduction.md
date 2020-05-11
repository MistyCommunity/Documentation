---
title: Introduction to Skills
layout: onboarding-misty-i.hbs
columns: one
order: 1
---

# {{title}}



This article provides an overview of developing skills for Misty. It describes how Misty works with your code, and it explores some of the differences between developing for Misty and developing for other platforms. It also provides guidelines for sharing skills and collaborating with other developers in the [Misty Community](https://community.mistyrobotics.com).

---

## What is a Skill?

A skill is an application you develop for the Misty platform. While you can build many different types of skills, most involve some combination of the following:

1. gathering some of Misty's sensory data
2. processing that data using Misty's API, or sending it off to a cloud service
3. having Misty do something in response

For example, you might write skills to have Misty do the following:

* roam an office to greet people she recognizes
* respond with sound and movement when you touch her on the head or chin
* patrol an area to capture photos, videos, and audio recordings while reporting changes in the environment

The first step in building a skill is deciding what you want the skill to do. Then, you can choose to write the skill using Misty's on-robot JavaScript API, her REST API, or both. When you're ready, you can share your code with other developers in the Misty Community.

## Using Misty's APIs

Misty has two basic types of skill architecture. You can write skills using Misty's on-robot JavaScript API, or you can use her REST API.

When you write a skill using Misty's [on-robot JavaScript API](../../coding-misty/local-skill-architecture), you upload your code to the robot and it runs internally on Misty. This differs from writing a skill with [Misty's REST API](../../coding-misty/remote-command-architecture), where your code runs on an external device (say, in desktop browser or on a Raspberry Pi) and not onboard the robot.

Misty's on-robot JavaScript and REST APIs include many of the same commands, but they differ in architecture and implementation.

### Misty's On-Robot JavaScript API

When you use Misty's on-robot JavaScript API, your code runs locally on your robot. Each skill you write this way runs from a single JavaScript code file. You [upload this code file to Misty](../../../misty-i/coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill) along with a .json meta file that defines some of the initial settings and parameters that Misty will use when running the skill. If the skill uses image or audio assets that don't yet exist on the robot, you can upload these assets at the same time you upload your skill code. Learn more about this process in the [File Structure & Code Architecture](../../../misty-ii/coding-misty/local-skill-architecture/#file-structure-amp-code-architecture) section.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** If you're used to writing JavaScript for the web, you may be familiar with  manipulating the [DOM](https://developer.mozilla.org/en-US/docs/web/api/Document_Object_Model) in your code. With Misty, there is no DOM for your code to manipulate. Skills you write with Misty's on-robot JavaScript API cannot use the various [objects and data types](https://developer.mozilla.org/en-US/docs/web/api/Document_Object_Model/Introduction#Important_Data_Types) present in the DOM.
{{box op="end"}}

The syntax for using a command in Misty's JavaScript API is:

```javascript
misty.<COMMAND>(parameters);
```

So, for example, to change the color of Misty’s logo LED, you would call the
`misty.ChangeLED()` command like this:

```javascript
misty.ChangeLED(255, 0, 0);
```

In addition to methods for using Misty's robot capabilities, the on-robot JavaScript API includes methods for:

* sending debug messages
* saving data to Misty
* handling data from sensor and skill events
* controlling the flow of your code's execution
* sending external requests to third party web APIs
* starting and stopping the execution of other JavaScript code files on Misty

Follow these links to learn more about coding with Misty's on-robot JavaScript API:

* [Architecture](../../../misty-i/coding-misty/local-skill-architecture)
* [Tutorials](../../../misty-i/coding-misty/local-skill-tutorials)
* [Reference Documentation](../../../misty-i/reference/javascript-api)

#### When Should I Use Misty's On-Robot JavaScript API?

Code you write with Misty's on-robot JavaScript API executes locally on the robot. This means you can expect Misty to respond to commands immediately after they execute in your code. This differs from using Misty's REST API, where you can expect some latency between the execution of a command and Misty's response. 

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Writing skills that can run entirely on Misty offers portability and allows you to easily package and redistribute skills for reuse. Being able to encapsulate and reuse skills is the key to having a robot that does many tasks.
{{box op="end"}}

Consider using Misty's on-robot JavaScript API when:

* you want your skill to be portable, so that Misty can run it without depending on or requiring an external device
* you want to be able to package and share your functionality with other developers or Misty owners
* you need Misty to respond to commands immediately after they execute in your code
* your skill does not require input from another interface (like text from a computer)

#### Uploading Skill Files to Misty

After you write the JavaScript code for a skill, you must upload your files onto the robot before you can run it. To learn how to load a skill onto Misty, see [Loading & Running On-Robot Skills](../../../misty-i/coding-misty/local-skill-architecture/#loading-amp-running-an-on-robot-skill).

### Misty's REST API

With Misty's REST API, your code runs on an external device and makes HTTP requests to Misty over your local Wi-Fi connection. You send requests to Misty's REST API the same way you interact with other RESTful web APIs. The code you write to send these requests can execute from a web page, a microcontroller (like an Arduino), or any other device that can send web requests.

Writing a skill with Misty's REST API typically involves two things: 

* getting data from Misty's sensors via WebSocket connections
* sending requests to Misty's REST API endpoints

The structure and syntax for sending requests to Misty's REST API endpoints depends on the programming language and libraries you use to write your skill. For an example of sending requests with JavaScript from your web browser, see [Sending Commands to Misty](https://docs.mistyrobotics.com/misty-i/coding-misty/remote-command-architecture/#sending-requests-to-misty).

#### When Should I Use Misty's REST API?

Code you write for Misty's REST API runs on a device outside Misty to send requests over your local Wi-Fi network. This can introduce some latency between the moment your skill sends a request and Misty's execution of the associated command.

It also means you can integrate the capabilities of the device from which the code executes into your skill. For example, if you use Misty's REST API to write skill for Misty to learn someone's face, you can design a web interface with a form where this person can type their name and send it to Misty.

Consider using Misty's REST API when:

* you want to write a skill for Misty using a language other than JavaScript
* your skill depends on the integration of a graphic interface, like a web page
* your skill uses the capabilities of an external device that cannot communicate with Misty directly through her built-in UART serial port
* you want to use JavaScript features that are not supported by Misty's JavaScript engine
* your skill uses third-party services not yet supported by Misty's on-robot API

Follow these links to learn more about Misty's REST API:

* [Architecture](../../../misty-i/coding-misty/remote-command-architecture)
* [Tutorials](../../../misty-i/coding-misty/remote-command-tutorials)
* [Reference Documentation](../../../misty-i/reference/rest)

### Integrating Misty's APIs

Misty's REST API includes a set of commands for interacting with the code that runs locally on the robot. You use these REST API commands to upload and remove skill files, to initiate and stop the execution of skills, and to perform other skill management tasks.

Additionally, Misty's REST API provides a command to trigger an event in a skill running locally on the robot. This makes it possible to pass data from an external device into the callback functions for events in an on-robot skill. You can use this command to integrate code that runs on an external device with code that runs locally on Misty.

### Community Resources

You can find helper libraries, code samples, wrappers, and other useful tools for skill development in the [Misty Robotics Community](https://github.com/MistyCommunity) on GitHub.

For examples of working skills that use a variety of Misty's capabilities, see [Misty Skill Samples](https://github.com/MistySampleSkills/) on GitHub.

## Sharing Skills & Applications

When you are ready to share a skill or application with other developers, you can post your code in the [Misty Community Forums](https://community.mistyrobotics.com/). Our recommendation for sharing skills and applications is as follows:

* Remove any passwords, credentials, API keys, or tokens your skill uses from your code.
    1. If your code uses 3rd party services, we recommend you create a `credentials.json` file where you can store the relevant details.
    2. To help your fellow developers, annotate your code in the places where the skill or application uses these accounts and credentials. You can list the details and instructions about how to acquire and use credentials in the skill in a `README` file in the same repository as the skill.
* Create a repository that you maintain on GitHub or somewhere else where other developers can download your code.
* License your repository. You can use whichever license you'd like. For more information about choosing a license, see GitHub's article on [Licensing a Repository](https://help.github.com/en/articles/licensing-a-repository).
* Create a new topic in the [Misty Skills category of the Misty Community forums](https://community.mistyrobotics.com/c/misty-skills).
* Set the first post in your topic to be a wiki. This will allow you and other contributors to suggest changes to the original post as development on your skill continues.
   1. To set your post to be a wiki, select the three-dots icon from the menu below the post. ![Discourse Wik Step 1](/assets/images/discourse-wiki-step-1.png)
   2. Select the wrench icon. ![Discourse Wik Step 2](/assets/images/discourse-wiki-step-2.png)
   3. Select the **Make Wiki** option from the menu.![Discourse Wik Step 3](/assets/images/discourse-wiki-step-3.png)
* Update the original post when you make changes to your code.
