---
title: Misty App
layout: onboarding-tools.hbs
columns: one
order: 1
---

# {{title}}

The Misty App is a mobile app for Android and iOS devices that you can use to set up Misty's Wi-Fi connection. You can also use the app to drive Misty and see information about her software. You can download the Misty App from the [App Store (iOS)](https://apps.apple.com/us/app/misty-app/id1296946424) or [Google Play (Android)](https://play.google.com/store/apps/details?id=com.mistyrobotics.Companion&hl=en_US).

{{box op="start" cssClass="boxed noteBox"}}
**Note:**

* It's not generally recommended for multiple users to each use a separate instance of the Misty companion app to connect and send commands to a single Misty robot. If more than one person does connect to Misty at the same time, as in a class or group development environment, they will need to take turns sending commands, or Misty may appear to respond unpredictably.
* When using the Misty companion app, **make sure your phone and Misty are on the same Wi-Fi network**.
{{box op="end"}}

## Connecting Misty to Bluetooth and Wi-Fi

{{box op="start" cssClass="boxed noteBox"}}
**Note:** You can only connect Misty to Wi-Fi networks that have password protection. Misty cannot be connected to open networks at this time. Misty does support both 2.4 GHz and 5 GHz Wi-Fi networks. If you are using a network without password protection or one that requires additional layers of authentication, see [this support thread](https://community.mistyrobotics.com/t/nontraditional-network-wifi-ideas/861) or contact us for help.
{{box op="end"}}

1. Power up your Misty robot and wait for her eyes to appear fully open.
2. Turn on Bluetooth on your phone or tablet and make sure your device is connected to your preferred Wi-Fi network. Additionally, because Bluetooth and Wi-Fi broadcasts are considered to be location data, you must enable location services on your device before using the Misty App to connect to your robot.
3. Download and launch the Misty App. (If you have trouble downloading the app for your device, please send a note to **support@mistyrobotics.com**.)
4. Once you've launched the app, connect to Misty via Bluetooth by standing close to Misty **with the Misty App open on your device**.
5. When the Bluetooth broadcast succeeds, the app displays a list of Misty robots that your app can connect to. Select your Misty from the list. **Note:** If you are in a room with more than one Misty, you may need to locate your Misty's serial number by checking the label on the bottom of your robot. ![Misty App Misty Serial Number Screen](/assets/images/companion_app_serial_number.png)
6. When Misty connects to your device, the Misty App displays a list of nearby Wi-Fi networks. Select your network from the list, and follow the prompt to enter your password. The full sequence for connecting Misty looks like this: ![Connect to Misty flow](/assets/images/misty-app-animation-1.gif)
7. If the connection fails initially or at any point when you are using the app, you'll see a screen that allows you to try reconnecting to Misty. If you cannot successfully connect Misty to Wi-Fi, check for and install any updates to the companion app. ![Misty App reconnect screen](/assets/images/companion_app_connection_fail.png)
8. Once the Wi-Fi connection succeeds, you should see the Misty App **Home** screen. Confirm that the Wi-Fi status is **Connected** and that a valid IP address for Misty appears onscreen. We suggest writing down this IP address, as you will need it to upload skills to Misty and connect to her web-based tools. ![Misty App connect animation](/assets/images/misty-app-animation-2.gif)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** While it’s usually easiest to use the companion app to connect Misty to your home Wi-Fi network, sometimes there can be issues with this method. In that case, you can use the [Command Center](../../../tools-&-apps/web-based-tools/command-center/#connecting-wi-fi) and the USB-to-Ethernet adaptor that came with your robot to connect Misty instead.
{{box op="end"}}

## Changing Wi-Fi Networks

When Misty is already connected to a network, you can follow these steps to connect her to a different network:

1. From the bottom of the **Home** screen, select the **Settings** icon.![Misty App home screen](/assets/images/companion_app_home_4.jpg)
2. Tap your network name next to the **WiFi** field. ![Change Wi-Fi list](/assets/images/misty-app-change-wi-fi.jpg)
3. Select your new network from the list, and follow the prompt to enter your password.


## Getting Information about Misty

The **My Misty** screen provides information on Misty’s Bluetooth and Wi-Fi connections, her IP address, software versions, and more.

1. From the bottom of the **Home** screen, select the **My Misty** icon. ![Misty App home screen](/assets/images/companion_app_home_4.jpg)
2. The **My Misty** screen allows you to view connectivity, software, and hardware information. ![Misty App My Misty screen](/assets/images/companion_app_my_misty.jpg)

## Driving Misty with the Misty App

1. From the **Home** screen, select the **Drive** icon at the bottom of the screen. ![Misty App home screen](/assets/images/companion_app_home_4.jpg)
2. On the driving control screen, you can see a speed slider control, a "joystick" directional control, and a +/- control (to move Misty's head up or down). Start Misty driving at a slower speed by moving the speed control left, toward the "tortoise". To speed up, move the control to the right, toward the "hare". ![Misty App Drive screen](/assets/images/companion_app_drive_1.png)
3. Control the direction that Misty drives by moving one finger around the “joystick”. Pressing at the points at the top and bottom of the circle drives Misty straight forward or backward. Pressing in the areas to the left and right of the circle rotates Misty.