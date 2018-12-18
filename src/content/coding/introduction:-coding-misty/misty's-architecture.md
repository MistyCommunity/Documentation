---
title: Misty's Architecture
layout: onboarding.hbs
columns: one
order: 2
---

# {{title}}

## System architecture -- what does our stack look like?

## Local vs. Remote

There are two basic types of skill architecture for Misty:
* **Remote:** Your code runs on an external device (say, in desktop browser or on a Raspberry Pi) and not onboard the robot. 
* **Local:** You upload your code to the robot, and it runs internally on Misty. Local skills can interact with external data (cloud calls, non-Misty API calls, etc).

**Important!** Misty has supported remote skills for some time. Local skills are a pre-release, “alpha” technology and are subject to frequent change. Any local skills you create for Misty may need updates before release to reflect these changes in the local skill architecture and implementation.

**Note:** Because the language currently used for local skills is JavaScript, but because local skills do not run in a browser, it’s likely that local skill development will differ from standard browser-based JavaScript development. We don't yet know all this ways this might be the case, so we encourage you to let us know if you find issues and limitations with this implementation.


## Modes: Autonomous, Stochastic, Deterministic

## Self vs World

## Limitations

## Etc.
