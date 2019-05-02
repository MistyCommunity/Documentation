---
title: Skill Runner
layout: onboarding.hbs
columns: one
order: 4
---

# {{title}}

The Misty Skill Runner web tool is a graphic interface for some of the skill-management actions that you would otherwise need to handle via a REST client. 

Access to Skill Runner is currently limited to a small group of field trial robot testers. If you'd like to be a part of our Misty II Field Trial, you can [apply here](https://www.mistyrobotics.com/apply/).

![Skill runner home page](../../../assets/images/skill-runner.png)

To use Skill Runner to upload and run a skill, follow the steps below.

1. Compress and save your skill’s `Meta` and `Code` files into a .zip file with the same name as your skill.
2. Open Skill Runner and connect to Misty using your robot’s IP address.
3. Open up your browser’s JavaScript console for the Skill Runner page, so you can see what’s happening.
4. Select **Upload Zip File** under “Save Skill to Robot.”![Upload Zip File](../../../assets/images/skill-runner-save-skill.png)
5. Select the .zip file you just created. Observe the JavaScript console for a success message confirming that the upload request was received.
6. Once the file has been uploaded to Misty, click **Reload Skills** at the top of the page. This ensures that your robot and latest code changes are in sync. Observe the JavaScript console for a log message verifying the skills have been loaded. ![Reload Skills](../../../assets/images/skill-runner-reload-skills.png)
7. To run your skill, enter the skill’s name under “Run Skill” and click **Run**. Continue observing the console; as events are triggered, you’ll see debug messages in the console. ![Run Skills](../../../assets/images/skill-runner-run-skill.png)

**Note:** You can generate useable `meta` file content with the Generate Meta Template controls in Skill Runner.