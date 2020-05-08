---
title: Docs Home
layout: coding.hbs
columns: one
order: 1
---

<h1>Docs Home</h1>

Welcome to the Misty Robotics developer documentation!

When you write code for Misty, you can quickly build skills and controller applications that make use of the unique characteristics of an autonomous, roaming robot with personality.

What’s a skill? A skill is code you write to make Misty do something. When you write a skill, you:

1. Take some of Misty’s sensory data (vision, audio, touch, distance, etc.).
2. Process that data using Misty’s API or send it off to a cloud service.
3. Have Misty do something in response:
   * drive to check out a sound
   * express amusement
   * take a video
   * or anything you like

At a high level, there are three approaches you can take when you write code for Misty:

* You can write a skill using Misty's [**JavaScript SDK**](./misty-ii/coding-misty/javascript-sdk-architecture). You write code for Misty's on-robot JavaScript API and upload it to the robot. This code runs internally on Misty and can interact with external data, such as cloud calls and non-Misty API calls.
* You can write a skill using Misty's [**.NET SDK (Beta)**](./misty-ii/dotnet-sdk/overview). Skills you write with Misty's .NET SDK assemble into background tasks that run alongside Misty's own software on Windows IoT Core.
* You can write a robot application using Misty's [**REST API & WebSocket connections**](./misty-ii/rest-api/overview). With this approach, your code runs on an external device (say, in desktop browser or on a Raspberry Pi) and not onboard the robot.

Can't find what you're looking for in the developer documentation? Post your question to the [Misty Community Forums](https://community.mistyrobotics.com/)!