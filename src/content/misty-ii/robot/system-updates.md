---
title: System Updates
layout: onboarding.hbs
columns: one
order: 6
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

You can check the software versions on your Misty by sending a request to the endpoint for the [`GetDeviceInformation`](../../../misty-ii/rest-api/api-reference/#getdeviceinformation) command. Look for the values of the following properties in the JSON object that Misty returns:
* `robotVersion`
* `hardwareInfo.mcBoard.firmware`
* `hardwareInfo.rtcBoard.firmware`
* `sensoryServicesAppVersion`

## Release History

### 2020.04.21

This is the current version of Misty's software.

* [2020.04.21 Release Notes](https://community.mistyrobotics.com/t/2020-04-21-system-update/2757)

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.16.1.10505 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.16.1.9 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.16.1.9 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.16.1 |  1.1.14.3 |

### 2020.04.07

* [2020.04.07 Release Notes](https://community.mistyrobotics.com/t/2020-04-07-system-update/2720)
* View the [developer documentation](/v1.16.0.10487) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.16.0.10487 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.16.0.247 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.16.0.247 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.16.0 |  1.1.14.3 |

### 2020.03.31

* [2020.03.31 Release Notes](https://community.mistyrobotics.com/t/2020-03-31-system-update/2709)
* View the [developer documentation](/v1.15.1.10476) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.15.1.10476 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.15.1.236 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.15.1.236 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.15.1 |  1.1.14.3 |

### 2020.03.25

* [2020.03.25 Release Notes](https://community.mistyrobotics.com/t/2020-03-25-system-update/2694)
* View the [developer documentation](/v1.14.3.10447) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.14.3.10447 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.14.3.207 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.14.3.207 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.14.3 |  1.1.14.3 |

### 2020.03.19

* [2020.03.19 Release Notes](https://community.mistyrobotics.com/t/2020-03-19-release-notes/2672)
* View the [developer documentation](/v1.14.2.10427) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.14.2.10427 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.14.2.187 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.14.2.187 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.14.2 |  1.1.14.3 |

### 2020.02.25

* [2020.02.25 Release Notes](https://community.mistyrobotics.com/t/2020-02-25-system-update/2607)
* View the [developer documentation](/v1.13.0.10362) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.13.0.10362 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.13.0.122 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.12.8.122|  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.13.0 |  1.1.14.3 |

### 2020.02.20

* [2020.02.20 Release Notes](https://community.mistyrobotics.com/t/2020-02-20-system-update/2581)
* View the [developer documentation](/v1.12.8.10353) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.12.8.10353 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.12.8.113 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.12.8.113|  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.12.8 |  1.1.14.3 |

### 2020.02.18

* [2020.02.18 Release Notes](https://community.mistyrobotics.com/t/2020-02-18-system-update/2566)
* View the [developer documentation](/v1.12.7.10330) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.12.7.10330 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.12.7.90 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.12.7.90 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.12.7 |  1.1.14.3 |

### 2020.01.23


* [2020.01.23 Release Notes](https://community.mistyrobotics.com/t/2020-01-23-system-update/2472)
* View the [developer documentation](/v1.11.0.10219) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.11.0.10219 |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.11.0.235 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.11.0.235 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.11.0 |  1.1.14.3 |

### 2020.01.15

* [2020.01.15 Release Notes](https://community.mistyrobotics.com/t/2020-01-15-system-update/2434)
* View the [developer documentation](/v1.10.1.10188) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.10.1.10188  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.10.1.204 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.10.1.204 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.10.1 |  1.1.14.3 |

### 2020.01.09

* [2020.01.09 Release Notes](https://community.mistyrobotics.com/t/2020-01-09-system-update/2423)
* View the [developer documentation](/v1.9.2.10155) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.9.2.10155  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.9.2.171 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.9.2.171 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.9.2 |  1.1.14.3 |

### 2019.12.17

* [2019.12.17 Release Notes](https://community.mistyrobotics.com/t/2019-12-17-system-update/2380)
* View the [developer documentation](/v1.8.4.10075) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.8.4.10075  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.8.4.91 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.8.4.91 |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.8.4 |  1.1.14.3 |

### 2019.12.03

* [2019.12.03 Release Notes](https://community.mistyrobotics.com/t/2019-12-03-system-update/2313)
* View the [developer documentation](/v1.7.4.9986) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.7.4.9986  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.7.4.2 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.7.4.2  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.7.4 |  1.1.14.3 |

### 2019.11.20

* [2019.11.20 Release Notes](https://community.mistyrobotics.com/t/2019-11-19-release-notes/2209)
* View the [developer documentation](/v1.6.2.9915) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.6.2.9915  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.6.2.187 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.6.2.187  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.6.2 |  1.1.14.3 |

### 2019.11.05

* [2019.11.05 Release Notes](https://community.mistyrobotics.com/t/2019-11-05-system-update/2117)
* View the [developer documentation](/v1.5.3.9838) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---| 
| `robotVersion`  | 1.5.3.9838  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.5.3.110 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.5.3.110  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.5.3 |  1.1.14.3 |

### 2019.10.22

* [2019.10.22 Release Notes](https://community.mistyrobotics.com/t/2019-10-22-release-notes/2041)
* View the [developer documentation](/v1.4.4.0) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.4.4.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.4.4.32 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.4.4.32  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.4.4  |  1.1.14.3 |

### 2019.10.08

* [2019.10.08 Release Notes](https://community.mistyrobotics.com/t/2019-10-08-release-notes/1948)
* View the [developer documentation](/v1.3.9.0) for this version of the robot's software.

| Device Information  | Misty II |  Misty I |
|---|---|---|
| `robotVersion`  | 1.3.9.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.3.9.216 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.3.9.216  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.3.9  |  1.1.14.3 |

### 2019.09.24

* [2019.09.24 Release Notes](https://community.mistyrobotics.com/t/9-24-2019-release-notes/1833)
* View the [developer documentation](/v1.3.0.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.3.0.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.3.0.79 |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.3.0.79  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.3.0  |  1.1.14.3 |

### 2019.09.12

* [2019.09.12 Release Notes](https://community.mistyrobotics.com/t/9-12-2019-release-notes/1785)
* View the [developer documentation](/v1.2.3.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.2.3.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.2.3.14  |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.2.3.14  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.2.3  |  1.1.14.3 |

### 2019.09.10

* [2019.09.10 Release Notes](https://community.mistyrobotics.com/t/9-10-2019-release-notes/1759)
* View the [developer documentation](/v1.1.1.0) for this version of the robot's software.

| Device Information  | Misty II|  Misty I |
|---|---|---|
| `robotVersion`  | 1.1.1.0  |  1.1.14.0 |
| `hardwareInfo.mcBoard.firmware`  | 1.1.1.253  |  1.1.14.3 |
| `hardwareInfo.rtcBoard.firmware` | 1.1.1.253  |  1.1.14.3 |
| `sensoryServicesAppVersion`  | 1.1.1  |  1.1.14.3 |

## Patches

Certain improvements to Misty's software have been released as patches that you apply manually, instead of as part of the automatic OTA update process. You can find download links and information about these patches in the sections below 

### 2020.01.07 Android Patch

This patch greatly improves Misty's ability to map an area and track within an existing map. [Download the patch and find installation instructions](https://community.mistyrobotics.com/t/2020-01-07-misty-ii-android-patch-for-improved-slam-performance/2415) in the Community Forums.

Applying this patch makes the following changes to Misty’s Android OS:

* Modifies Android OS settings and limits verbosity of kernel debug messages to greatly improve Misty’s simultaneous localization and mapping (SLAM) performance.
* Adds new ports to the list that Misty’s 820 Wi-Fi connection forwards to the robot’s 410 processor. The new ports make it possible to use Misty’s Wi-Fi IP address – instead of her 410 IP address – when you deploy .NET skills and attach a debugger from Visual Studio.
* Applies a fix for an issue wherein playing a loud sound from Misty’s speakers would prevent the robot from recording audio.
* Disables the default setting to allow adb connections over Misty’s Wi-Fi IP address. You can still use adb over a connection to your robot’s hardwired USB-to-Ethernet IP address. If you want to manually enable adb over Wi-Fi before or after you apply this patch, you can do so by [following the instructions in the Community Forums](https://community.mistyrobotics.com/t/2020-01-07-misty-ii-android-patch-for-improved-slam-performance/2415).
* Enables Misty to run scripts (like the one for this patch) as part of the OTA update process.