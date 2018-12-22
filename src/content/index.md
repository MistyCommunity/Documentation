---
title: Docs Home
layout: onboarding.hbs
columns: one
order: 1
---

<h1>Docs Home</h1>

When you write code for Misty, you can quickly build skills that make use of the unique characteristics of an autonomous, roaming robot with personality.

What’s a skill? A skill is your JavaScript app, running on the robot. When you write a skill, you:
1. Take some of Misty’s sensory data (vision, audio, touch, distance, etc.).
2. Process that data on the robot using Misty’s API or send it off to a cloud service.
3. Have Misty do something in response:
   * drive to check out a sound
   * express amusement
   * take a video
   * or anything you like

There are two basic types of skill architecture:
* [**Local**](./coding/using-local-skills/architecture). You upload your code to the robot, and it runs internally on Misty. Local skills can also interact with external data, such as cloud calls and non-Misty API calls.
* [**Remote**](./coding/using-remote-commands/architecture). Your code runs on an external device (say, in desktop browser or on a Raspberry Pi) and not onboard the robot. 
