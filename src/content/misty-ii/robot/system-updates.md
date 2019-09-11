---
title: System Updates
layout: onboarding.hbs
columns: one
order: 4
---

# {{title}}

This topic provides information about Misty's system updates. Read this page to learn about Misty's update process, find links to release notes, and (soon) access documentation for historical software and firmware versions.

## Installing System Updates

Misty’s software updates are delivered as over-the-air (“OTA”) updates, and Misty checks for updates each time she boots up. 
[Release notes](https://community.mistyrobotics.com/c/announcements/releases) are published to the Community Forums each time we deploy a system update for the robot. New releases are typically available within 24-48 hours of being deployed (the precise timing varies by region). If Misty doesn’t automatically download a release when she boots up, you can check to see if the update is available via Misty’s [Command Center](http://sdk.mistyrobotics.com/command-center/).

Misty reboots once during a system update. The system disables all commands except `Halt` and `Stop` while Misty is updating. If Misty starts installing an update while she’s charging, do not disconnect her from her power source until the update is finished and her eyes are fully open.

If you have issues with a system update or need technical assistance for other reasons, for the quickest response you can:

* Post a message to the [Support](https://community.mistyrobotics.com/groups/support) category in the Community forums. Mention [@support](https://community.mistyrobotics.com/groups/support) in your post.
* Contact the Misty support team through the chat embedded in this site, or by emailing [help@mistyrobotics.com](mailto:help@mistyrobotics.com).

## Checking Software and Firmware Versions

You can check the software versions on your Misty by sending a request to the endpoint for the [`GetDeviceInformation`](../../..//misty-ii/reference/rest/#getdeviceinformation) command. Look for the values of the following properties in the JSON object that Misty returns:
* `robotVersion`
* `hardwareInfo.mcBoard.firmware`
* `hardwareInfo.rtcBoard.firmware`
* `sensoryServicesAppVersion`

## Release History

### 2019.09.10 System Update

This is the current version of Misty's software.

* [Release Notes](https://community.mistyrobotics.com/t/9-10-2019-release-notes/1759)

| Device Information  | Misty II|  Misty I (No Updates) |
|---|---|---|
| `robotVersion`  | 1.1.1.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.1.1.253  |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.1.1.253  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.1.1  |  1.1.14.3 |