---
title: API Introduction
layout: apis.hbs
columns: one
order: 1
---

# {{title}}

Welcome to Misty's API! You can control Misty programmatically via [JavaScript](../../api-reference/all-functions) and [REST](../../api-reference/rest) commands that allow you to:

- Drive Misty
- Perform mapping or tracking
- Play sound files
- Change her LED color
- Use face training and recognition
- Move Misty's head
- Change her display

You can also [create your own skills](/onboarding/creating-skills/writing-skill) for Misty. Doing this typically involves two things: sending commands to Misty and getting data back from Misty. To send commands to Misty, you call the REST or JavaScript APIs. To get live updating data back from Misty, you'll need to use a [WebSocket connection](/onboarding/creating-skills/writing-skill/#websocket-connections). Visit the Misty Community [GitHub repo](https://github.com/MistyCommunity/MistyI/tree/master/Skills) for example skills.

Try [Blockly](/onboarding/3-ways-to-interact-with-misty/blockly) and the [Misty API Explorer](/onboarding/3-ways-to-interact-with-misty/api-explorer) to test commands and easily explore Misty's capabilities.

**Note: Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.**
