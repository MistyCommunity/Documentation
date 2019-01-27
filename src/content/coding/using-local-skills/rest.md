---
title: REST API
layout: coding.hbs
columns: three
order: 4
---

# {{title}}

## URL & Message Formats

Use the following URL format when sending commands to the robot:
```markup
http://<robot-ip-address>/api/<Endpoint>
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

**Note:** Not all of Misty's API is equally complete. You may see some commands labeled "Beta" or "Alpha" because the related hardware, firmware, or software is still under development. Feel free to use these commands, but realize they may behave unpredictably at this time.

## Skill Management Commands

<!-- SaveSkillToRobot -->

<!--- GetSkills -->
### GetSkills - ALPHA
Obtains a list of the skills currently uploaded onto the robot.

Endpoint: GET <robot-ip-address>/api/alpha/sdk/skills

Parameters
* (None)

Return Values
* Result (array) - An array containing the names and meta file information for all of the skills on the robot.

<!-- CancelSkill -->
### CancelSkill - ALPHA
Stops a specified running skill (or all running skills if no name is specified).

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skills/cancel

Parameters
* Skill (string) - As specified with the Name value in the skill’s meta file, the name of the skill to run. Use an empty payload to cancel all running skills.

```json
{
	"Skill": "SkillName"
}

```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.


<!-- LoadSkill -->
### LoadSkill - ALPHA
Makes a previously uploaded skill available for the robot to run and updates the skill for any changes that have been made.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skills/load

Parameters
* Skill (string) - The name of the skill to load.

```json
{
  "Skill": "SkillName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

<!-- ReloadSkills --> 
### ReloadSkills - ALPHA
Makes all previously uploaded skills available for the robot to run and updates any skills that have been edited. **Note:** The `ReloadSkills` command runs immediately, but there may be a significant delay after the call completes before all skills are fully loaded onto the robot if there are many to load.

Endpoint: POST <robot-ip-address>/api/sdk/reload

Parameters
* (None)

Return Values
* Result (boolean) - Returns `true` if no errors related to this request. 

<!-- RunSkill -->
### RunSkill - ALPHA
Immediately runs a previously uploaded skill.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skill

Parameters`
* Skill (string) - As specified with the `Name` value in the skill’s meta file, the name of the skill to run. You can also pass the `UniqueID` for a skill.
* Method (string) - Optional. A specific method within a skill to run, which can be useful for testing. If no value is specified for the Method parameter, `RunSkill` by default starts running the skill from the beginning.

```json
{
  "Skill": "SkillName",
  "Method": "methodName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.


### SaveSkillToRobot - ALPHA
Uploads a skill to the robot and makes it immediately available for the robot to run.

**Note:** To send a file with this request, make sure to set the `content-type` in the header of the `POST` call to `multipart/form-data`.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skill/deploy

Parameters
* File (file) - A zipped file containing the two skill files. Both these files (one JSON meta file and one JavaScript code file) should have the same name. For more details, see the [File Structure & Code Architecture](../architecture/#file-structure-amp-code-architecture) section.
* ImmediatelyApply (boolean) - Specifies whether Misty immediately runs the uploaded skill.
* OverwriteExisting (boolean) - Indicates whether the file should overwrite a file with the same name, if one currently exists on Misty .

```json
{
  "File" : "SkillName.zip",
  "ImmediatelyApply": false,
  "OverwriteExisting": true
}
```

Return Values
* Result (array) - A list of key-value pairs with the names of the code and meta skill files saved to the robot.

<!-- TriggerSkillEvent -->
### TriggerSkillEvent - ALPHA
Triggers an event within a skill. The skill must be running already for Misty to trigger the event within the skill.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skills/event

Parameters
* UniqueId (string) - As specified in the skill’s JSON meta file, the 128-bit GUID for the skill that holds the event to trigger.
* EventName (string) - The name of the event to trigger. 
* Payload (JSON string) -  Any arguments needed for the event.

```json
 {
  "UniqueId" : "b307c917-beb8-47e8-9bbf-1c57e8cd4d4b",
  "EventName": "UserEvent",
  "Payload": { "test": "two" }
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

<!-- UnloadSkill -->
### UnloadSkill - ALPHA
Makes a skill unavailable to be run which is currently onboard the robot, but does not remove the skill from the robot’s memory.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skills/unload

Parameters
* Skill (string) - The name of the skill to unload.

```json
{
  "Skill": "SkillName"
}
```

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.

### UnloadAllSkills - ALPHA
Makes all skills onboard the robot unavailable to be run, but does not remove the skills from the robot’s memory.

Endpoint: POST <robot-ip-address>/api/alpha/sdk/skills/unloadall

Parameters
* (None)

Return Values
* Result (boolean) - Returns `true` if no errors related to this request.




