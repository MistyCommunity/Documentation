---
title: Command Center
layout: onboarding-tools.hbs
columns: one
order: 1
---

# {{title}}

You can use the [Command Center](http://sdk.mistyrobotics.com/command-center/) in your browser to try Misty’s capabilities and send basic commands to your robot before writing your own code. We recommend using the [Command Center](http://sdk.mistyrobotics.com/command-center/) with the latest version of the Google Chrome browser.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The Command Center is currently in a pre-release state. As such, not all features are fully functional, and the site may change before the release of Misty's SDK.
{{box op="end"}}

The [Command Center](http://sdk.mistyrobotics.com/command-center/) works by sending requests to Misty's [REST API](../../../misty-ii/rest-api/api-reference) endpoints. To see the full response for a request and other information about the commands you send to Misty, open the web console in your browser. **To open the web console in Chrome, use:**

* **Ctrl + Shift + J** (Windows/Linux)
* **Cmd + Option + J** (Mac)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** It's not generally recommended for multiple users to each use a separate instance of the [Command Center](http://sdk.mistyrobotics.com/command-center/) to connect and send commands to a single Misty robot. If more than one person does connect to Misty at the same time (as in a class or group development environment), each person should take turns sending commands, or Misty may appear to respond unpredictably.
{{box op="end"}}

## Setting up the Command Center

Before you connect Misty to an instance of the [Command Center](http://sdk.mistyrobotics.com/command-center/), **make sure your computer and Misty are on the same Wi-Fi network**.

1. [Open up the Command Center](http://sdk.mistyrobotics.com/command-center) in a browser window.
2. Enter the IP address of your robot (you can find your robot's IP address in the Misty companion app) and click the **Connect** button. Watch for the text on the **Connect** button to change to **Connected**. ![Connect to Misty](/assets/images/command-center-connect-animation.gif)
3. When Misty is connected, her serial number, battery level, and software version display in the topmost section of the web page.![Device Info](/assets/images/command_center_device_info.png)

To see more details about your robot, click **Get All Device Info**. Open the web console in your browser window to see the results.

## Movement

Use the **Movement** section to send Misty drive commands, drive Misty manually, and to move Misty's head and arms.

 ![Movement controls](/assets/images/command_center_movement.png)

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** You can use the red **Halt All Motors** button at any time to disable all of Misty's motor controllers.
{{box op="end"}}

### Locomotion

Use this section to send a [**DriveTime**](../../../misty-ii/rest-api/api-reference/#drivetime) command to Misty. Using this command allows you to drive Misty forward or backward at a set speed, with a given rotation, for a specified amount of time.

When using **Drive Time**, it helps to understand how linear velocity (speed in a straight line) and angular velocity (speed and direction of rotation) work together:

* Linear velocity (-100) and angular velocity (0) = driving straight backward at full speed.
* Linear velocity (100) and angular velocity (0) = driving straight forward at full speed.
* Linear velocity (0) and angular velocity (-100) = rotating clockwise at full speed.
* Linear velocity (0) and angular velocity (100) = rotating counter-clockwise at full speed.
* Linear velocity (non-zero) and angular velocity (non-zero) = Misty drives in a curve.

Follow these steps to send Misty a **DriveTime** command:

1. Use the **Linear Velocity** control to set the speed Misty travels in a straight line. The control can be set from -100 (full speed backward) to 100 (full speed forward).
2. Use the **Angular Velocity** control to set the speed and direction of Misty's rotation. The control can be set from -100 (full speed rotation clockwise) to 100 (full speed rotation counter-clockwise). **Note:** For best results when using angular velocity, we encourage you to experiment with using small positive and negative values to observe the effect on Misty's movement.
3. Use the **Duration (ms)** control to specify the amount of time Misty should drive.
4. Click **Drive**. Misty stops driving automatically when the time is up.

### Manual Driving

You can use the **Manual Driving** controls to drive Misty in a variety of directions.
 ![Manual driving controls](/assets/images/command_center_manual_drive.png)

1. Click a directional button to drive Misty in that direction. Misty will continue to drive in that direction until you specify a new direction or send a command to halt or stop driving.
2. Adjust the **Velocity** slider to change how fast Misty drives.
3. Use the center button to stop Misty's drive motors.

### Moving Misty's Head & Arms

You can use the **Movement** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/) to change the position of Misty's head and arms.

![Command Center head and arm movement controls](/assets/images/command-center-movement-animation.gif)

When Misty connects to the [Command Center](http://sdk.mistyrobotics.com/command-center/), the position of each slider updates to match the current position of Misty's head and arms. Adjust these sliders and click the associated button to change the position of Misty's head and arms.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Pitch head movement is all that can be controlled for Misty I robots.
{{box op="end"}}

## Expression

Misty comes with a number of default system image files that you can display on her screen, as well as default audio files that she can play. Use the **Expression** controls to interact with these assets or to upload and manage your own image, video, and audio files. You can also use this section to change the color of the LED on Misty's chest.

![Expression controls](/assets/images/command_center_expression.png)

### Adding custom image, video, and audio files to Misty

Please read the following before uploading custom assets to Misty:

* Valid image file types are `.jpg`, `.jpeg`, `.gif`, and `.png`. Because Misty does not adjust the scaling of images you upload with the [Command Center](http://sdk.mistyrobotics.com/command-center/), for best results use an image with proportions similar to that of Misty's screen (480 x 272 pixels)
* Valid video file types are `.mp4` and `.wmv`.
* Valid audio file types are `.wav`, `.mp4`, `.wma`, and `.aac`.
* The maximum size for files you upload with the command center is 6 MB.

Follow these steps to upload an image, video, or audio file to Misty:

1. To select a file to upload to Misty, either drag a file into the rectangular drop area, or click the text in the drop area browse for the file on your computer. **Note:** Use the **Image** section to upload both image files **and** video files.   
2. Once the upload is complete, you can locate the file in the relevant dropdown list to confirm the upload was successful.

### Working with audio files

You can use the controls in the **Audio** section to play, download, or delete the audio files on Misty. The list of audio files currently on Misty automatically populates in the **Audio** section when Misty connects to the [Command Center](http://sdk.mistyrobotics.com/command-center/).

* **To have Misty play an audio file**, choose the file to play from the list and click the **Play on Robot** button. Use the **Pause** and **Stop** buttons to pause or stop Misty's audio playback. **Note:** These buttons do **not** pause or stop audio playback in your web browser. 
* **To play an audio file in your web browser**, choose the file to play from the list and click the **Play in Browser** button
* **To download an audio file from Misty to your computer**, choose the file to download from the list and click the purple download button.
* **To delete an audio file from Misty**, choose the file to delete from the list and click the red delete button. **Note:** You can only delete audio or image files that you have previously uploaded to Misty.The [Command Center](http://sdk.mistyrobotics.com/command-center/) returns an error to the console in your web browser if you attempt to remove one of Misty's default system files.

### Working with image and video files

You can use the controls in the **Image** section to display, download, or delete the images and videos you have uploaded to Misty. The list of image and video files currently stored on Misty automatically populates in the **Image** section when Misty connects to the [Command Center](http://sdk.mistyrobotics.com/command-center/).

* **To have Misty display an image or play a video**, choose the file from the list and click the **Display on Robot** button.
* **To display an image or play a video in your web browser**, choose the file from the list and click the **Display Image** button.
* **To download an image or video from Misty to your computer**, choose the file from the list and click the purple download button.
* **To delete an image or video from Misty**, choose the file from the list and click the red delete button. **Note:** You can only delete files that you have uploaded to  Misty. The [Command Center](http://sdk.mistyrobotics.com/command-center/) returns an error if you attempt to remove one of Misty's default system files.

## Perception

You can use the **Perception** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/) to interact with Misty's face training and recognition capabilities, to take pictures, and to record audio or record video. Additionally, this section provides an interface for visualizing data from audio localization events.

![Command Center Perception controls](/assets/images/command_center_perception.png)

### Face Training & Recognition

To use face training and recognition, follow these steps.

1. Make sure that your robot is connected to the [Command Center](http://sdk.mistyrobotics.com/command-center/).
2. In the **Perception** section, go to **Face Training** and enter a name in the **Name to Train** input box.
3. Position a single person’s face in a well-lit area 1-6 feet from Misty’s camera. Do not attempt to train Misty to recognize more than one person at the same time.
4. Click **Start Face Training** and wait 10-15 seconds. There is no need to click **Stop Face Training**, unless you want to stop the process before it completes. You can observe the main [Command Center](http://sdk.mistyrobotics.com/command-center/) browser tab (not the JavaScript console) for pop-up status messages during the face training process. **Note**: Due to network variability, there can be up to several seconds of lag time between when you begin face training and when any status messages appear.
5. Once you've trained Misty on a person's face, you can click **Start Face Recognition**.
6. Position the person’s face in a well-lit area front of the camera.
7. Open the web console for the browser window. (Note that how you open the console varies among browsers and platforms.) Watch the browser console for face recognition data to come through. Face recognition data is sent at a rate of about once per second, but this timing may vary significantly.
8. When finished, click **Stop Face Recognition**.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The face detection and recognition data that Misty sends is described in detail in the [Event Types](../../../misty-ii/robot/sensor-data) section.
{{box op="end"}}

### Recording Video

Misty can use the RGB camera on her visor to create custom video recordings. You can use the [Command Center](http://sdk.mistyrobotics.com/command-center/) to start  recording, stop recording, and download recorded videos.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty records videos in `.mp4` format. Use the dropdown menu to set the recording resolution. By default, recordings you create with the Command Center are saved with the filename `misty_video`, and these files are overwritten with each new recording. To create multiple video recordings with unique filenames, use the [`StartRecordingVideo`](../../../misty-ii/rest-api/api-reference/#startrecordingvideo) command in Misty's API.
{{box op="end"}}

Click **Start Recording Video** to start Misty recording a video, and click **Stop Recording Video** to stop the recording. Click **Download Recorded Video** to download the most recent recorded video with the name `misty_video`.

### Taking Pictures

Misty can take pictures with her 4K camera as well as the ultra-wide vision camera on her Occipital Structure Core depth sensor.

Use the **Take Photo** controls to take a picture with Misty's 4K camera.
* Click **Take + Display Photo** to take a picture and display it in your browser.
* Click **Take + Download Photo** to download the picture to your computer.

Use the **Wide-Angle Vision Camera** controls to take a black-and-white photo with the camera on Misty's Occipital Structure Core depth sensor.
* Click **Take + Display Photo** to take a picture and display it in your browser
* Click **Take + Download Photo** to download the picture to your computer.


{{box op="start" cssClass="boxed noteBox"}}
**Note:** To take wide-angle pictures, you must have a Misty II Standard or Misty II Enhanced Edition. The Misty II Basic Edition does not include the Occipital Structure Core depth sensor, and can't take wide-angle pictures. [Learn more about the different models of Misty II](../../../misty-ii/robot/misty-ii/#misty-ii-specs).
{{box op="end"}}

### Recording Audio

Use the **Record Audio** controls to have Misty record an audio file with her microphone array. Follow these steps to have Misty record an audio file:

1. Enter a name to save the file with on Misty's local storage.
2. Click the **Start Recording Audio** button to have Misty start recording audio.
3. When you're finished recording, click the **Stop Recording Audio** button.

The new audio file appears in the list of Misty's audio files in the **Assets** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/).

### Audio Localization Visualization

Use the **Audio Localization** controls to have Misty start streaming voice and sound localization data from her microphone array. When you click **Start Recording Voice**, the **Audio Localization Visualization** interface provides a visualization of the location and volume of the noise or spoken voice that Misty can detect.

![Command Center Audio Localization](/assets/images/command_center_audio_localization.gif)

For audio localization data, the 0/360 degree heading represents the current direction Misty's head is facing. Misty returns audio localization data relative to this 0/360 degree heading, which appears at the top of the **Audio Localization Visualization**.


{{box op="start" cssClass="boxed tipBox"}}
**Tip:** You can think of the Audio Localization Visualization as a circle drawn around your robot. Misty is positioned in the middle of this circle, with her head facing toward 0/360 degrees. Using this visualization is like looking straight down at the top of your robot's head and seeing where she detects different sound and voice activity.
{{box op="end"}}


The **Audio Localization Visualization** shows the following information:
* **Voice Activity (Radar)** - Shows the level of voice activity detected at each angle relative to the direction Misty's head is facing. The further away from the center of the circle, the higher the level of detected voice activity.
* **Voice Activity (Sector)** - Shows the sector in which Misty detects the most (loudest) voice activity. Each sector represents a 90 degree wedge of the area surrounding Misty. The front-facing wedge is offset, with Misty's face pointing toward the 45 degree angle down its center.
* **Speaker** - Shows the position of the loudest human voice, relative to the direction Misty's head is facing.
* **Noise** - Shows the angle where Misty detects the loudest noise, relative to the direction her head is facing.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** For more information about how Misty determines her position relative to audio localization events, see [Coordinate System & Movement Ranges](../../../misty-ii/robot/misty-ii/#coordinate-system-amp-movement-ranges).
{{box op="end"}}

## Sensor Data

Misty sends real-time data from her sensors and onboard events to the [Command Center](http://sdk.mistyrobotics.com/command-center/) via WebSocket connections. You can use these WebSockets to receive:

* time-of-flight sensor data
* bump sensor data
* capacitive touch sensor data
* battery voltage levels
* inertial measurement unit (IMU) sensor data
* actuator position data
* drive encoder data

The [Sensor & Event Data](../../../misty-ii/rest-api/overview/#using-mistys-websocket-server) section of this documentation describes the data Misty sends over WebSocket connections in detail. See [Misty's REST API tutorials](../../../misty-ii/rest-api/tutorials) for examples of programmatically subscribing to WebSocket data to code Misty.

### Opening a WebSocket

When you use the [Command Center](http://sdk.mistyrobotics.com/command-center/) to open WebSocket connections, you can view live data from Misty on your screen and in your browser's web console. (How you open the console will vary among browsers and platforms.)

![Command Center sensor data](/assets/images/command_center_sensor_data.png)

You can open WebSocket connections to Misty by checking the box next to the sensors you want to stream data from. When you check a box, the [Command Center](http://sdk.mistyrobotics.com/command-center/) connects to Misty's WebSocket server and streams data from the selected sensors.

To stream data from all sensors or properties in a category, check the box next to the category name. To receive a subset of data from a category, check the boxes next to the specific sensors or properties you want and leave the rest of the boxes unchecked.

### Streaming Time of Flight Data

Follow these instructions to stream time-of-flight data from Misty's sensors to the [Command Center](http://sdk.mistyrobotics.com/command-center/).

1. In the **Sensor Data** area, locate the **Time of Flights** fields.
2. Check the box next to **Time of Flights** to stream all distance data. Alternatively, check the box next to each individual sensor position you want to receive distance data from.
3. You can see the time-of-flight sensor's data in the corresponding **meters** field.

### Streaming Bump Sensor Data

1. In the **Sensor Data** area, check the box next to the **Bump Sensors** section.
2. The field associated with a bump sensor will change colors when that bump sensor is activated.

### Streaming Cap Touch Data

1. In the **Sensor Data** area, check the box next to the **Cap Touch Sensors** section.
2. The field associated with a cap touch sensor will change colors when that sensor is activated.

### Streaming Battery Voltage Data

1. In the **Sensor Data** area, check the box next to the **Battery Voltage** section.
2. You can see data from Misty's battery sensor in the **volts** and **%** fields.

### Streaming IMU Data

The IMU data stream provides information from Misty's Inertial Measurement Unit (IMU) sensor.
It includes information about:

* the pitch, yaw, and roll orientation angles of the sensor (in degrees)
* the force (in meters per second) currently applied to the sensor along its pitch, yaw, and roll rotational axes
* the force (in meters per second squared) currently applied to the sensor along its X, Y, and Z axes

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** Misty's IMU orients its heading to 0/360 degrees each time Misty boots up or resets her real-time controller. For Misty, a `yaw` value of 0/360 degrees does **not** represent true north unless Misty is facing true north when the IMU orients its heading. Additionally, because the IMU is located in Misty's torso, readings from the IMU only change when Misty's body moves. They do not change relative to the position of Misty's head.
{{box op="end"}}

To stream IMU data from Misty to the [Command Center](http://sdk.mistyrobotics.com/command-center/):

1. In the **Sensor Data** area, locate the **IMU Sensors** section.
2. Check the box next to **IMU Sensors** to stream all IMU sensor data. Alternatively, check the box next to each individual type of data you want to receive.
3. You can see the IMU sensor's data in the corresponding field.

### Streaming Actuator Data

1. In the **Sensor Data** area, locate the **Actuator Positions** section.
2. Check the box next to **Actuator Positions** to stream all actuator position data. Alternatively, check the individual boxes next to the actuators you want to receive data from.
3. You can see the actuator's position data in the corresponding **degrees** field.

### Streaming Drive Encoder Data

1. In the **Sensor Data** area, locate the **Drive Encoders** section.
2. Check the box next to **Drive Encoders** to stream all drive encoder data. Alternatively, check the individual boxes next to the drive encoders you want to receive data from.
3. You can see the encoder's rotation or angular velocity data in the corresponding **degrees** field.

### Subscribing to Other WebSockets

Use the **Advanced Options** modal to customize WebSocket subscriptions and apply filters to the data that WebSockets send. Data you subscribe to using the **Advanced Options** modal streams to the web console in your browser window.

![Advanced Options](/assets/images/command_center_advanced_options.png)

1. Open the **Advanced Options** controls in the **Sensor Data** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/).
2. Select a WebSocket to monitor from the **Named Object** list. **Note: Named Object is the only required field.** The other fields are optional:
   * **Event Name**: [Optional] Provide a name for this subscription. If no name is specified, the value for **Named Object** is also used for the **Event Name**.
   * **Debounce**: [Optional] Provide the minimum amount of time between data events. 
   * **Property, Comparison, Value, Return Property**: [Optional] These allow you to set filters for the data of interest and the data returned. 
     * To filter to specific details in subscription, you can enter the data property path in the `Property` field, which will cause Misty to return that data. The data property path is specified from the Named Object and currently must be discovered by examining the data packet or checking the documentation.
     * For example, if you want to access the value of the Mental State property, which is an object in `SelfState`, you can put `MentalState` in the `ReturnProperty` field. If you want the specific `Valence` value of the `Affect` in `MentalState`, your `ReturnProperty` will be `MentalState.Affect.Valence`. 
     * You may also use the same pattern to filter data. When you do this, Misty only sends data when the filter is true. For example, if you only want to return the above Mental State's `Affect` data if the `Dominance` value in `Affect` is equal to `1`, you would use the following settings:
```json
NamedObject : SelfState
Property: MentalState.Affect.Dominance
Comparison: ==
Value: 1
ReturnProperty: MentalState.Affect
```
3. Click **Subscribe**.
4. When you are finished, go to the **Unsubscribe** controls. In the **Event Name** field, enter the name of the Named Object to which you subscribed (or the Event Name if you provided one)
5. Click **Unsubscribe**.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Too many socket subscriptions at a fast debounce can cause performance issues, so remember to unsubscribe when you don't need data and to set the debounce as high as is appropriate for your needs. {{box op="end"}}

## Navigation

The Command Center provides access to a **Navigation Module** that you can use to interact with Misty's simultaneous localization and mapping (SLAM) system. Use this module to map a new area with Misty, track her location within a map, and follow a path to a new set of coordinates.

![Command Center Navigation Module](/assets/images/command_center_nav_module.png)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** To use the Navigation Module, you must have a Misty II Standard or Misty II Enhanced Edition. The Navigation Module is not functional with the Misty II Basic Edition. [Learn more about the different models of Misty II](../../../misty-ii/robot/misty-ii/#misty-ii-specs).

Misty’s SLAM capabilities are an alpha feature. Experiment with mapping, but recognize that Misty’s ability to create maps and track within them is unreliable at this time.
{{box op="end"}}

### Launching the Navigation Module

Follow these steps to launch the Navigation Module from the Command Center:

1. Make sure that your robot is connected to the [Command Center](http://sdk.mistyrobotics.com/command-center/).
2. In the **Navigation** section, click **Launch Navigation Module.** ![Command Center Launch Navigation Module](/assets/images/command_center_launch_nav_module.png) This opens the module as a new tab in your web browser.

Once you've launched the module, you can use it to
* create a new map
* track Misty's location in the currently active map
* follow a path
* change which map is currently active

### Mapping

When you generate a map, Misty uses her Occipital Structure Core depth sensor to generate a 3D mesh of her environment. She converts this map into a two-dimensional occupancy grid that she can use to navigate her space. The Navigation Module displays a visualization of this map that uses different colors to represent unknown, open, occupied, and covered space.

Follow these steps to create a new map with the Navigation Module:

1. Connect Misty to the Command Center and launch the Navigation Module.
2. Use the movement interface to set Misty's head position and adjust her velocity. ![Nav Module Movement](/assets/images/nav_module_movement.png)
   1. Click **Set Head** to engage Misty's neck motors and position her visor for effective mapping. (For best results, avoid moving Misty's head while generating a map. Instead, use Misty's drive controls to move the entire robot.)
   2. Enter `25` in the **Velocity** field and click **Set**. This sets Misty's speed while mapping to around 25% of max velocity. (For best results, use low speeds (less than or equal to 25% of max velocity) while mapping or tracking.)
3. Click **Start Mapping** to start the mapping session. Then, wait for Misty to obtain **pose**.
   1. Having **pose** means Misty knows her current orientation and location (in X,Y coordinates). Misty has pose when the **Misty's Pose** indicator changes from red to white. ![Misty's pose](/assets/images/nav_module_pose_indicator.png)
   1. If Misty does not obtain pose after 10 seconds, try using the movement controls to slowly turn the robot until the pose indicator turns white.
4. Map the environment. Start by using the **Spin 360** button to rotate Misty slowly in place. Then, drive Misty in straight lines around the room, stopping to spin in place at various points of open space to obtain full coverage of the room.
   1. For best results, use the Navigation Module to observe the occupancy grid as it is formed. Move Misty to grey (unmapped) areas and perform a spin to fill out the map.
   2. If Misty loses pose at any point, use the **Stop** button in the movement controls to stop her from driving. (Do not use **Halt All Motors**, as this disengages the neck motors and the head will have to be reset.) Then, reverse the actions Misty took prior to losing pose (for example, if the robot was driving straight, back up at the same speed; if it was turning to the right, turn back to the left). Do this until Misty regains pose. Once Misty has regained pose, proceed to an unmapped area.
5. When mapping is complete (when the occupancy grid is developed to your satisfaction), click **Stop Mapping.**

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Losing and regaining pose multiple times in a mapping session can introduce artifacts (obstacles, false walls, etc.). If you lose and regain pose multiple times throughout a mapping session, you may need to create a new map.
{{box op="end"}}

### Tracking & Following a Path
When Misty has successfully generated a map, she can track within that map to know where she is and follow a path to a new location. The Navigation Module displays Misty's X and Y coordinates (relative to the currently active map) next to the **Misty's Pose** icon. Refer to these X, Y coordinates to get Misty's current location and generate new paths for Misty to follow within the active map.

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** To track effectively, Misty must first generate an adequate map of the space. The map should provide good coverage of the area, and it should provide an accurate representation of the actual environment. (For example, walls should appear to be squared, and no false walls or non-existent obstacles should be present in the map.)
{{box op="end"}}

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Misty's mapping capabilities are still in early development, and there's a chance that Misty won't generate an adequate map of the space on the first try. In cases where Misty's best map is not the map that's currently active, you can set a different map to be active by using the controls in the Navigation Module or sending a request to the [`SetCurrentSlamMap`](../../../misty-ii/rest-api/api-reference/#setcurrentslammap) endpoint.
{{box op="end"}}

Once you've generated a good map (and set that map to be active), follow these steps to start tracking:

1. If you haven't done so already, connect Misty to the Command Center and [launch the Navigation Module](./#launching-the-navigation-module).
2. Click **Start Tracking** and wait for Misty to obtain pose.
  1. Having pose means Misty knows her current orientation and location (in X,Y coordinates). Misty has pose when the **Misty's Pose** indicator changes from red to white.
  2. If Misty does not obtain pose after 10-15 seconds, try using the movement controls to slowly turn the robot until the pose indicator turns white.
3. When Misty obtains pose, the **Navigation Module** displays her current X, Y coordinates next to the pose icon. As Misty moves around the mapped environment, the values of these coordinates update to show her new position.

When Misty is tracking, she can follow a path from her current location to a new set of coordinates. Misty follows a path by driving from one waypoint (a set of X, Y coordinates) to the next until she reaches the destination (the last waypoint in the path). To follow a path:

1. Follow the steps to start tracking.
2. Use the **Follow Path** section of the **Navigation Module** to define the path. Either:
  1. Supply the X, Y coordinates of the target destination and click **Get Path**.
  2. Supply individual X,Y value pairs and click **Add to Path** to add these individual waypoints to a path.
  3. Use the path field to input an entire path of X,Y values. A path of waypoints should be entered in the form of "X1:Y1,X2:Y2,X3:Y3".
3. Click **Follow Path**.

### Follow Path Advanced Settings

The Navigation Module provides advanced settings for customizing Misty's path following behavior. To view these settings, click the purple gear icon next to the **Follow Path** button.

The fields in the **Follow Path Advanced Settings** modal allow you to adjust the following parameters:

![Follow Path Advanced Settings](/assets/images/nav-module-follow-path-advanced-settings.png)

- `Velocity` - A fraction of Misty's max velocity that determines how fast Misty moves when driving straight while following a path. Expects a decimal value greater than 0 and less than 1. Defaults to `0.5` (50% of max velocity).
- `FullSpinDuration` - Number of seconds it takes for Misty to complete a full spin (360 degrees) while following a path. Determines how fast Misty pivots or spins when changing direction. Defaults to `15`.
- `WaypointAccuracy` - How close (in meters) Misty gets to a waypoint before considering herself to have reached that waypoint. Defaults to `0.1`.
- `RotateThreshold` - The angular measurement (in degrees) Misty's path following algorithm uses to determine when Misty should pivot toward a waypoint instead of continuing to drive straight. Defaults to `10`.

Click **Save Settings** to apply your changes, or click **Cancel** to close the modal without saving.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** When following a path, Misty drives straight toward her next waypoint until the bearing between the waypoint and her current heading is greater than `RotateThreshold` degrees. When the bearing reaches this threshold, Misty pivots in the direction of the waypoint until the bearing is lower than `RotateThreshold`. When Misty reaches a waypoint, she spins to face the next waypoint and drives straight. As she approaches the waypoint, any error in the original spin causes the bearing angle to grow, causing Misty to stop and turn toward the waypoint; thus, Misty may stop and pivot multiple times between one waypoint and the next.
{{box op="end"}}

### Managing Misty's Maps

Misty saves each map she creates to local storage. Each map is associated with a unique key at the time of the map's creation. You can use the Navigation Module to change which map is currently active and to delete maps you no longer need.

With this functionality, you can create more than one map of an area, review each map for accuracy, and set the best map as Misty’s currently active map. Once you have created more than one map, you can follow these steps to set a different map to be active:

1. Connect Misty to the Command Center and [launch the Navigation Module](./#launching-the-navigation-module).
2. Choose the key for the map you want to use from the drop-down menu beneath the graphic representation of Misty's currrent map. Map keys are formatted as date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`)
3. Click **Select**.

After you select a map, you can start Misty tracking within it. Additionally, you can click **Get Map** to generate a graphic representation of the map. Click **Download Map** to download the current graphic representation as a .jpg image file.

To delete a map:

1. Connect Misty to the Command Center and [launch the Navigation Module](./#launching-the-navigation-module).
2. Choose the map you want to delete from the drop-down menu beneath the graphic representation of Misty's current map. Map keys are formatted as date timestamps in UTC (i.e. `Map_20190911_21.47.16.UTC`)
3. Click the red **Delete** button.



### Navigation Diagnostics

The **Diagnostics** section provides a stream of diagnostic information about Misty's navigation system.

![Navigation Module Diagnostics Section](/assets/images/nav-module-diagnostics.png)

To stream SLAM navigation diagnostics information:

1. Connect Misty to the Command Center and [launch the Navigation Module](./#launching-the-navigation-module).
2. Start Misty mapping, or have her start tracking within an existing map.
3. Click **Show Diagnostics** to see the stream of diagnostic information.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** The information in the data object for this command is primarily used by the Misty Robotics engineering and support staff to troubleshoot and root-cause issues with Misty's SLAM system. The contents of this data object are likely to change without notice in future system updates.
{{box op="end"}}

## System Updates

You can use the [Command Center](http://sdk.mistyrobotics.com/command-center/) to perform over-the-air (OTA) updates for Misty. We recommend you check for updates weekly. To find the version number(s) for the most recent system updates, see the release notes on our [Community site](https://community.mistyrobotics.com/c/development).

{{box op="start" cssClass="boxed noteBox"}}
**Important!** Please keep Misty plugged in for the entire duration of the update and do not attempt to send commands to her during this time.
{{box op="end"}}

To perform an update:

1. First make sure that Misty is plugged into a power source and is connected to the internet.
2. If the [Command Center](http://sdk.mistyrobotics.com/command-center/) is not already connected to your robot: At the top of the [Command Center](http://sdk.mistyrobotics.com/command-center/) window, enter the IP address of your robot (from the Info tab of the Misty companion app) and click the **Connect** button. Look for the message "Connected successfully" to appear at the bottom of the [Command Center](http://sdk.mistyrobotics.com/command-center/) window.
3. Navigate to the **System** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/) window and find the **System Update** section. ![Perform system update button](/assets/images/command_center_update.png) 
4. If an update is available, the **Perform System Update** button will be purple (instead of gray). Click the **Perform System Update** button to have Misty begin downloading the update in the background. The download itself may take several minutes to an hour, depending on the speed of your Internet connection. **Note: During the download and update, Misty disables all commands except for `Halt` and `Stop`. It is NOT recommended to send any commands to Misty during the update process.**
5. The update process may take up to a half hour total and is not complete until Misty restarts and displays a message that the update has been successful.

### Targeted Updates

If a full system update fails to update every component of your robot, you can perform a targeted update to attempt to update these components individually.

![Targeted update controls](/assets/images/command_center_targeted_updates.png)

To perform a targeted update, check the box next to each component to attempt to update. Click **Perform Targeted Updates** to start the update process.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Always try a full system update before trying a targeted update. You can make sure individual components are up-to-date by comparing the version numbers for each component to the most recent release notes on the [Misty Community](https://community.mistyrobotics.com/) site. The version numbers for individual components are returned by the **Get Device Information** button in the **System** section of the [Command Center](http://sdk.mistyrobotics.com/command-center/).
{{box op="end"}}

## Connecting Wi-Fi

While it’s usually easiest to use the [Misty App](../../../tools-&-apps/mobile/misty-app) to connect Misty to your home Wi-Fi network, sometimes there can be issues with this method. In that case, you can use the [Command Center](http://sdk.mistyrobotics.com/command-center/) and a USB-to-Ethernet adaptor to connect Misty instead. Please note that this adaptor does not arrive with Misty, and must be obtained from a retailer other than Misty Robotics.

1. Connect a USB-to-Ethernet adapter from your network router to your computer. Do not connect the adapter to Misty yet.
2. Use the command line to find the IP address of the adapter.
  * On Apple/Unix, open a command-line tool, enter `ifconfig` and find the Ethernet adapter and its IP address in the list of results. **Note**: On a Mac you may also be able to find the IP address under **System Preferences > Network**.
  * On Windows, open the command prompt, enter `ipconfig`, and find the Ethernet adapter and its IP address in the list of results.
3. Once you have the IP address for the adapter, unplug the USB end of the adapter from your computer and re-plug it into the USB port on the back of your robot. Keep the other end plugged into your router.
4. Open the [Command Center](http://sdk.mistyrobotics.com/command-center/) and connect to your robot by entering the IP address and clicking **Connect**.
5. Click the **Wi-Fi** button next to the **Connect** button to open the Wi-Fi connection modal. Enter your Wi-Fi network credentials here and click **Connect to Wi-Fi.** The process can take a few minutes. ![Connect Wi-Fi UI](/assets/images/command_center_wifi.png)

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Occasionally the IP address for the adapter changes after the first use. If this happens you can use the MAC address printed on the adapter and enter the following commands to obtain the IP address:

* Apple/Unix: `arp -a | grep <MAC ADDRESS>`
* Windows (in a Powershell window): `arp -a | select-string <MAC ADDRESS>`
{{box op="end"}}

### Saved Wi-Fi Networks

You can also use the [Command Center](http://sdk.mistyrobotics.com/command-center/) to manage the Wi-Fi networks that Misty remembers.

* To see the list of Wi-Fi networks that Misty remembers, connect Misty to the [Command Center](http://sdk.mistyrobotics.com/command-center/) and click the **Wifi** button at the top of the page. Click the **Populate List** button to generate a list of networks that Misty remembers.
* To connect to a network, select the network name from the list and click the **Connect** button.
* To forget a network, select the network name from the list and click the **Forget** button. Or, click the **Forget All** button to clear all Wi-Fi networks from Misty's memory.

## Getting a Diagnostic Report

The Command Center provides controls for downloading a diagnostic report from your robot to your PC. This report includes a copy of your robot’s log files from the previous seven days and a text file with your robot's device information. When you download this report via the Command Center, it is saved to the downloads folder on your PC in the form of a `diagnostic.zip` file.

When troubleshooting issues with your Misty II, you may be asked to get a diagnostic report to share with the Misty support team. Follow these steps to get the report:

1. Make sure Misty is already connected to the [Command Center](http://sdk.mistyrobotics.com/command-center/).
2. Scroll down to the **Sensor Data** section and click **Advanced Options**.
3. Scroll down to the **Get Diagnostic Report** section at the bottom of the **Advanced Options** modal.
4. Click the **Run and Download** button to download a compressed `diagnostic.zip` file with your robot's log files and device information. ![Get a report](/assets/images/command-center-diagnostic-report.png)
5. Locate the downloaded `diagnostic.zip` file on your PC. Send this file to the Misty support team by attaching it in an email to support@mistyrobotics.com.
