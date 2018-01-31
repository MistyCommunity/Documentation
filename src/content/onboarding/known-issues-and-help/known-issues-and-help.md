---
title: Known Issues
layout: onboarding.hbs
columns: two
order: 3
---

# {{title}}

## Mapping Tips

1. For best control, we recommend that mapping be done at this time via the API and Blockly instead of with the companion app.
2. Verify that the mapping sensors are working. The Occipital laser near Misty’s right eye should be glowing blue.
3. Drive Misty around to see if a map generates.
4. Drive slowly to give the tracking system the best chance to fill in all details. Adjusting the speed with the slider on the companion app towards the left will slow Misty down and increase mapping effectiveness.
5. Make wider turns (in arcs) to improve mapping results.
6. If tracking is lost, try backing up for one second. Misty may find her way again and renew her mapping activities.
7. If Misty loses her connection while mapping (indicated when the two dots disappear from the companion app’s Bluetooth icon), close the app and restart it, then reconnect as before.
8. If Misty loses pose after generating a map, she will need to generate a new map and start over.

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
* Updates of Misty’s software will occur automatically. We’ll provide release notes prior to each update.
