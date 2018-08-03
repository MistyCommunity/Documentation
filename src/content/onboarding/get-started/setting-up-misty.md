---
title: Setting Up Misty
layout: onboarding.hbs
columns: one
order: 1
---

# {{title}}

Welcome! Your Misty I Developer Edition Prototype robot has been hand-built by the Misty Robotics team.

For safety and care during shipping, your robot arrives with a couple of items disconnected and with the final pieces of the case removed. Please start here for some quick words of advice on setting her up. You can also [watch this video](https://youtu.be/ROqzzQRf2qI) to see the setup process directly.

**Important:** While future versions of Misty will be much tougher, it’s important that you handle your Misty I Developer Edition Prototype robot with care. When carrying Misty, support the entire robot from the front and back, below the main chassis between the two tracks.

**Note:** To avoid the risk of driving Misty off a high surface, we recommend either working with the robot on the floor or temporarily elevating the wheels so the robot cannot drive. To do this, you can either place a couple of books underneath Misty between the wheels or use this handy [stand for Misty I](https://github.com/MistyCommunity/assets/blob/master/M1_Robot_Stand.STL) that you can 3D print.


## Connecting the Battery
While Misty's case is open is the ideal time to connect up your robot's battery. **Before doing so, please read the following important notes:**

 * Always use the battery that came with Misty.
 * Always use a power supply (12-volt, 3 Amp, **center positive**) with the same specifications as that which came with Misty. Using a differently configured power supply creates a high risk of fire.
 * If you encounter any resistance or difficulty plugging the power supply into the jack on the back of Misty: STOP. Pull the plug out and try again, rotating the plug if necessary, until the plug inserts smoothly. It’s possible to catch the ground leaf spring on the bottom of the jack with the power supply plug and create a short. This renders Misty inoperative.
 * **Never** unplug the power connectors inside Misty. These connectors can be reversed or otherwise improperly re-inserted and create a **high risk of fire**. ![Internal power connectors](../../../assets/images/internal_power_connectors.jpg)

To connect Misty's battery:

1. Set Misty on the floor.
2. On Misty's right side, you can see a battery and two sets of connecting plugs. ![disconnected battery plugs](../../../assets/images/3_arrival_state.jpg)
3. Plug the yellow connectors together. ![yellow battery connectors](../../../assets/images/4_yellow_connectors.jpg)
4. Plug the white connectors together. ![white battery connectors](../../../assets/images/5_white_connectors.jpg)
5. Gently make sure the battery and connectors are inserted into Misty. ![reinserting the battery](../../../assets/images/6_push_battery.jpg)
6. You can now plug the power adaptor into the back of Misty and into a power source. If the number on the battery charge indicator does not increase, unplug and replug the adaptor from Misty's power port. When Misty is fully charged, you should see values above 8 on the charge indicator. Note that Misty continues to use some power even when switched off, so her battery levels will drop even when she is powered down. A charge level lower than 7 may cause Misty to power down without warning. ![power adaptor plug](../../../assets/images/power_adaptor_plug.jpg)

Once you've plugged in the battery, you can assemble Misty's case and connect the Occipital Structure Core depth sensor.


## Assembling Misty's Case
Now that the battery is connected, you can put together the finishing pieces of Misty's case:

1. Undo the two small bolts that attach the plastic logo plate to the front of Misty's chest. Remove the plate and set it and the bolts aside. ![removing the logo plate](../../../assets/images/faceplate_removal.jpg)
2. Find the two plastic side panels that shipped with your robot, underneath Misty in the packaging. ![loose side panels](../../../assets/images/side_panels_loose.jpg)
3. Align the slots and gently attach each panel to one of Misty's sides. ![attaching side panels](../../../assets/images/side_panel_replacing.jpg) Each panel should easily drop into the slots as shown. ![panel after being attached](../../../assets/images/panel_on.jpg)
4. Once both side panels are attached, reattach Misty's logo plate, gently hand-tightening the bolts.


## Connecting the Occipital Structure Core Depth Sensor
The Occipital Structure Core depth sensor is your Misty robot's main way of mapping and seeing the world. The cable for this sensor is disconnected for shipping. It's simple to reattach as follows, but be sure to snap it in all the way. **You must feel a click when attaching the cable**, or it won't be seated fully and can't function.

1. Tucked behind Misty's faceplate, find the black USB cable with a loose end. ![loose Occipital cable](../../../assets/images/occipital_cable_loose.jpg)
2. Connect the loose end of the cable into the sensor's open USB port on Misty's right side. Make sure you feel a click when inserting the cable, to ensure it is fully seated. ![Occipital cable attached](../../../assets/images/occipital_cable_attached.jpg)


## Laser Awareness

There is a laser sensor located in the Occipital Structure Core depth sensor, above the right side of Misty's display screen.

Never stare directly into the laser. Do not directly touch the laser or remove the protective cover over the laser. Oils on your finger can cause the light to disperse into your eyes and increase the risk of physical damage.

![Misty laser warning](../../../assets/images/do_not_touch_laser.jpg)


## Cleaning the Time-of-Flight Sensors

**Note**: This is **not** something you need to do with your robot on arrival or perhaps ever, but it's good to know about, just in case.

A Misty I Developer Edition Prototype robot has a total of four time-of-flight sensors: three on the front and one on the back. These sensors obtain distance data for objects in Misty's environment and allow her to avoid obstacles as she moves. ![time-of-flight sensors](../../../assets/images/tof_sensors.jpg)

In some environments, the time-of-flight sensors may become dusty over time, which can cause them to return inaccurate distance data. If your robot has started running into objects that she would normally avoid, it's important to test the time-of-flight sensors to ensure they're functioning properly.

1. Open up the [API Explorer](../../3-ways-to-interact-with-misty/api-explorer) in a browser and connect it to your robot.
2. In the API Explorer, scroll down to the **Websockets** section and find the **Sensor Reading Websockets**. ![Sensor reading websockets](../../../assets/images/sensor_websockets.png)
3. Locate a ruler with centimeter markings and lay it so that the 0cm mark is even with one of Misty's time-of-flight sensors. (In the photo, we've started the test with the back sensor.) Place an object with a flat surface on the ruler facing the sensor at the 10cm mark. ![placing an object 10cm from the sensor](../../../assets/images/10_cm.jpg)
4. Use the API Explorer to subscribe to the time-of-flight sensor you are testing (in this case, the back sensor). Confirm that the sensor reading is reasonably close to 0.1 meters (10cm). **Note: Because it's challenging to place objects exactly 10cm from a sensor, values between 0.08 meters (8cm) and 0.12 meters (12cm) are typically close enough.** ![sensor reads 0.1 meters](../../../assets/images/back_tof_check.png)
5. Repeat this process for each of the four time-of-flight sensors. If any sensor consistently gives inaccurate readings, proceed with cleaning that sensor.
6. To clean a time-of-flight sensor, use a can of compressed air to blow any dust off.
7. After cleaning, re-test the sensor. If a time-of-flight sensor continues to provide inaccurate data after cleaning, contact us for assistance.


