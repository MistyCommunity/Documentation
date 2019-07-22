---
title: Docs Home
layout: coding.hbs
columns: one
order: 1
---

<h1>Docs Home</h1>

When you write code for Misty, you can quickly build skills that make use of the unique characteristics of an autonomous, roaming robot with personality.

What’s a skill? A skill is code you write to make Misty do something. When you write a skill, you:

1. Take some of Misty’s sensory data (vision, audio, touch, distance, etc.).
2. Process that data using Misty’s API or send it off to a cloud service.
3. Have Misty do something in response:
   * drive to check out a sound
   * express amusement
   * take a video
   * or anything you like

There are two basic types of skill architecture:

* [**On-Robot JavaScript API Architecture**](./misty-ii/coding-misty/local-skill-architecture). You write code using Misty's JavaScript API and upload it to the robot. This code runs internally on Misty and can interact with external data, such as cloud calls and non-Misty API calls.
* [**REST API & WebSocket Architecture**](./misty-ii/coding-misty/remote-command-architecture). Your code runs on an external device (say, in desktop browser or on a Raspberry Pi) and not onboard the robot.
