---
title: Overview
layout: onboarding.hbs
columns: one
order: 1
---

# {{title}}

Misty II's .NET SDK provides tools for building, debugging, and deploying skills with Microsoft Visual Studio and the .NET framework. Skills you build with the .NET SDK assemble into background applications that run alongside Misty's software on Windows IoT Core. With Misty's .NET SDK, you can:

* Write skills in C#
* Leverage features of Visual Studio and the .NET framework such as autocomplete, IntelliSense, and live remote debugging
* Use external libraries in your skill code
* Test code before deployment by simulating input from sensors and other robot data

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's .NET SDK is currently in **Beta**. Related software, libraries, and documentation are still under development. We encourage you to experiment with these tools, but recognize that features and functionality may be unreliable at this time, and may change without notice.
{{box op="end"}}

## Requirements

Using Misty's .NET SDK requires the following:

* Misty II
* PC (or virtual machine) with Windows 10
* Microsoft Visual Studio, with **Windows Universal Platform workload** and **Windows 10 SDK libraries** (build 17763) installed

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You cannot use Misty's .NET SDK with Visual Studio for MacOS. Before you can build .NET skills on a Mac, you need to [use a tool like Boot Camp Assistant to install Windows 10 on your computer](https://support.apple.com/en-us/HT201468). You can then boot into Windows 10 and continue with this guide.
{{box op="end"}}

## Libraries & Tools

Misty's .NET SDK includes the following libraries and templates:

* [Misty Skill Extension](https://marketplace.visualstudio.com/items?itemName=MistyRobotics.MistySkillExtension) (Beta) - A Visual Studio extension that contains project templates for C# skills. When you create a new project with this template, Visual Studio automatically installs the Misty Robotics SDK libraries for use in your skill.
* [MistyRobotics.SDK](https://www.nuget.org/packages/MistyRobotics.SDK) (Beta) - Library used to build .NET skills for Misty
* [MistyRobotics.Common](https://www.nuget.org/packages/MistyRobotics.Common) (Beta) - Library with types and data objects commonly used across Misty's .NET skill projects
* [MistyRobotics.Tools](https://www.nuget.org/packages/MistyRobotics.Tools) (Beta) - Library with optional tools for programming Misty

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Comprehensive reference documentation for the public members of Misty's .NET SDK libraries is still under development. For now, we recommend using IntelliSense to browse the contents of the SDK libraries and access summaries of library classes and their members.
{{box op="end"}}