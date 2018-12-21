---
title: REST API
layout: onboarding.hbs
columns: three
order: 4
---

# {{title}}

## URL & Message Formats

Use the following URL format when sending commands to the robot:
```markup
http://{robot-ip-address}/api/{Endpoint}
```
Misty uses JSON to format REST API data. Use this format when creating the payload:
```json
{
  "key0": "value0",
  "key1": "value1",
  "key2": "value2"
}
```
All successful commands return a status and the result of the call:
```json
[
  {
    "result": true,
    "status": "Success"
  }
]
```
If there is an issue, Misty returns an HTTP error code and error message.

## Skill Management

Use these commands to manage and interact with the skills on your robot. 

### SaveSkillToRobot
Uploads a skill to the robot and makes it immediately available for the robot to run.

Endpoint: POST {robot-ip-address}/api/alpha/sdk/skill/deploy
