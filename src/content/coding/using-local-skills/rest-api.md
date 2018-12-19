---
title: REST API
layout: onboarding.hbs
columns: three
order: 4
---

# {{title}}

## Skill Management

### SaveSkillToRobot
Uploads a skill to the robot and makes it immediately available for the robot to run.

Endpoint: POST{robot-ip-address}/api/alpha/sdk/skill/deploy

Parameters
* Skill (byte array) - A zipped file containing the two skill files. Both these files (one JSON meta file and one JavaScript code file) should have the same name. For more details, see [File Structure & Code Architecture](../architecture#file-structure-amp-code-architecture).
* ImmediatelyApply (boolean) - True or false. Specifies whether Misty immediately runs the uploaded skill.
* OverwriteExisting (boolean) - True or false. Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty .

```json
{
"Skill" : "SkillName",
"ImmediatelyApply": false,
"OverwriteExisting": true
}
```

Return Values
* Success (boolean) - Returns `true` if there are no errors related to this command.
