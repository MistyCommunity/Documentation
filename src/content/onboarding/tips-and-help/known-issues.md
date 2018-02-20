---
title: Known Issues
layout: onboarding.hbs
columns: one
order: 3
---

# {{title}}

## Going off Tracks

Misty’s tracks can come off the wheels when she makes turns on some carpet types. This can cause the treads to bind up, and Misty stops moving. If this happens, reverse Misty to get the tracks back on, or simply “walk them” back in place using your hands.

## Connection Issues

If your robot name doesn’t show up in the app, or if you lose the Wi-Fi or Bluetooth connection (indicated when the two dots disappear from the Bluetooth icon in the app), close the app and restart it. Reconnect as previously.

## Other Known Issues & Tips

* There is no graceful shutdown at this time. When Misty’s battery gets below about 7 volts she abruptly powers down.
* Every time you create a new map, the former map is deleted. You can use the API to get a map and back it up, if desired.
* Get Path and Drive to Location do not function yet.
* Facial recognition works best in a well-lit area.
* Nothing runs resident on Misty at this point. Everything runs through BLE or HTTP.
* Mapping coordinates are currently inverted (X is vertical, Y is horizontal).
* Misty Robotics software updates will occur automatically. We’ll provide release notes prior to each update.
* At this time, updates of Misty's underlying operating system platforms (e.g. Windows IoT Core) may occur without warning. If you see an image of gears on Misty's screen, be aware that she is going through a system update.
* Currently, commands sent to Misty via Blockly can have a 2-3 second delay to initiate, with up to a 5-second delay between actions.
