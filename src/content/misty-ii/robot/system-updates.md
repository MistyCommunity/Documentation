---
title: System Updates
layout: onboarding.hbs
columns: one
order: 4
---

# {{title}}

This topic provides information about Misty's system updates. The sections below include information about the update process, links to release notes, and access to documentation for historical software and firmware versions.

Misty's updates can include:

* New images and audio assets
* Motor controller firmware updates
* Real-time controller firmware updates
* Occipital Structure Core depth sensor firmware updates
* Home Robot application updates (running on Windows IoT Core)
* Sensory Services application updates (running on Android)
* Windows OS updates

## Installing System Updates

Misty’s software updates are delivered as over-the-air (“OTA”) updates, and Misty checks for updates each time she boots up. [Release notes](https://community.mistyrobotics.com/c/announcements/releases) are published to the Community Forums each time we deploy a system update for the robot. New releases are typically available within 24-48 hours of being deployed (the precise timing varies by region). If Misty doesn’t automatically download a release when she boots up, you can check to see if the update is available via Misty’s [Command Center](http://sdk.mistyrobotics.com/command-center/).

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

### 2019.11.20

This is the current version of Misty's software.

* [2019.11.20 Release Notes](https://community.mistyrobotics.com/t/2019-11-19-release-notes/2209)

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.6.2.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.6.2.187 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.6.2.187  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.6.2 |  1.1.14.3 |

### 2019.11.05

* [2019.11.05 Release Notes](https://community.mistyrobotics.com/t/2019-11-05-system-update/2117)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.5.3.0) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.5.3.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.5.3.110 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.5.3.110  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.5.3 |  1.1.14.3 |

### 2019.10.22

* [2019.10.22 Release Notes](https://community.mistyrobotics.com/t/2019-10-22-release-notes/2041)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.4.4.0) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.4.4.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.4.4.32 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.4.4.32  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.4.4  |  1.1.14.3 |

### 2019.10.08

* [2019.10.08 Release Notes](https://community.mistyrobotics.com/t/2019-10-08-release-notes/1948)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.3.9.0) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.3.9.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.3.9.216 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.3.9.216  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.3.9  |  1.1.14.3 |

### 2019.09.24

* [2019.09.24 Release Notes](https://community.mistyrobotics.com/t/9-24-2019-release-notes/1833)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.3.0.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.3.0.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.3.0.79 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.3.0.79  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.3.0  |  1.1.14.3 |

### 2019.09.12

* [2019.09.12 Release Notes](https://community.mistyrobotics.com/t/9-12-2019-release-notes/1785)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.2.3.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.2.3.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.2.3.14  |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.2.3.14  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.2.3  |  1.1.14.3 |

### 2019.09.10

* [2019.09.10 Release Notes](https://community.mistyrobotics.com/t/9-10-2019-release-notes/1759)
* View the [developer documentation](https://docs.mistyrobotics.com/v1.1.1.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.1.1.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.1.1.253  |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.1.1.253  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.1.1  |  1.1.14.3 |