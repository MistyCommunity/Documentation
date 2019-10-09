---
title: System Updates
layout: onboarding.hbs
columns: one
order: 4
---

# {{title}}

This topic provides information about Misty's system updates. Read this page to learn about Misty's update process, find links to release notes, and access documentation for historical software and firmware versions.

## Installing System Updates

Misty’s software updates are delivered as over-the-air (“OTA”) updates, and Misty checks for updates each time she boots up. 
[Release notes](https://community.mistyrobotics.com/c/announcements/releases) are published to the Community Forums each time we deploy a system update for the robot. New releases are typically available within 24-48 hours of being deployed (the precise timing varies by region). If Misty doesn’t automatically download a release when she boots up, you can check to see if the update is available via Misty’s [Command Center](http://sdk.mistyrobotics.com/command-center/).

Misty reboots once during a system update. The system disables all commands except `Halt` and `Stop` while Misty is updating. If Misty starts installing an update while she’s charging, do not disconnect her from her power source until the update is finished and her eyes are fully open.

If you have issues with a system update or need technical assistance for other reasons, for the quickest response you can:

* Post a message to the [Support](https://community.mistyrobotics.com/groups/support) category in the Community forums.
* Contact the Misty support team through the chat embedded in this site, or by emailing [support@mistyrobotics.com](mailto:support@mistyrobotics.com).

## Checking Software and Firmware Versions

You can check the software versions on your Misty by sending a request to the endpoint for the [`GetDeviceInformation`](../../..//misty-ii/reference/rest/#getdeviceinformation) command. Look for the values of the following properties in the JSON object that Misty returns:
* `robotVersion`
* `hardwareInfo.mcBoard.firmware`
* `hardwareInfo.rtcBoard.firmware`
* `sensoryServicesAppVersion`

## Release History

To see Misty's release history and find links to documentation for previous software versions, go to the [System Updates](https://docs.mistyrobotics.com/misty-ii/robot/system-updates/#release-history) page in the current version of the developer documentation.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You are viewing the documentation for `robotVersion 1.3.0.0`. The documentation for the current version of Misty's software is hosted at [`docs.mistyrobotics.com`](https://docs.mistyrobotics.com). The documentation for previous robot software versions is hosted at `docs.mistyrobotics.com/v<robotVersion>`
{{box op="end"}}