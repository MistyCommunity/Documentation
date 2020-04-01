---
title: Data
layout: coding-net.hbs
columns: three
order: 1
---

# {{title}}

## AudioDetails

Details of an audio file. Applies to audio files you save to Misty with the `SaveAudio` command, system audio assets, and audio recordings that Misty creates.

*Serializable*

### AudioDetails Properties

* `Name` (string) - The name of the audio file, with the file type extension.

```csharp
public string Name { get; set; }
```

* `SystemAsset` (bool) - Whether the audio file is one of Misty's default system assets.

```csharp
public bool SystemAsset { get; set; }
```

## AudioFile

Data and metadata for an audio file.

*Serializable*

### AudioFile Properties

* `Name` (string) - The name of the audio file, with the file type extension.

```csharp
public string Name { get; set; }
```

* `ContentType` (string) - The content-type of the audio file.

```csharp
public string ContentType { get; set; }
```

* `Base64` (string) - A string with the Base64-encoded audio file data. This data returns when you specify that the system should return the audio file data as a Base64-encoded string.

```csharp
public string Base64 { get; set; }
```

* Audio (IEnumerable<byte>) - A byte array of the audio file data. This data returns when you don't specify that the system should return the audio file data as a Base64-encoded string.

```csharp
[JsonConverter(typeof(ByteArrayConverter))]
public IEnumerable<byte> Audio { get; set; }
```

## BatteryChargeDetails

Misty's current battery charge and other details about the battery.

*Serializable*

### BatteryChargeDetails Properties

* `ChargePercent` (double) - Decimal value representing the current charge percentage.

```csharp
public double? ChargePercent { get; set; }
```

* `Temperature` (int) - Current battery temperature.

```csharp
public int Temperature { get; set; }
```

<!-- TODO: Add link to BatteryChargingState Enum -->

* `State` (`BatteryChargingState`) - The charge state of the battery.

```csharp
public BatteryChargingState State { get; set; }
```

* `Trained` (bool) - Returns `true` if the battery is trained. Otherwise, `false`. If the battery isn't trained, the value provided for `ChargePercent` is an approximation.

```csharp
public bool Trained { get; set; }
```

* `Voltage` (double) - The battery's current voltage.

```csharp
public double Voltage { get; set; }
```

* `Current` (double) - The current flowing into or discharging from the battery. This value is negative when the battery is discharging, and positive when the battery is charging.

```csharp
public double Current { get; set; }
```

* `HealthPercent` (double) - The health of the battery.

```csharp
public double? HealthPercent { get; set; }
```

* `IsCharging` (bool) - Returns `true` if the battery is charging. Otherwise, `false`.

```csharp
public bool IsCharging
{
    get
    {
        return State == BatteryChargingState.Charging;
    }
}
```

## BlinkSettings

The current settings for Misty's blinking behavior.

*Serializable*

### BlinkSettings Properties

* `BlinkImages` (`IDictionary<string, string>`) - A dictionary of blink mappings for each image on the robot. The first image in each dictionary pair is the "open-eye" image; the second image is the "closed-eye" image.

```csharp
public IDictionary<string, string> BlinkImages { get; set; } = new Dictionary<string, string>();
```

* `OpenEyeMinMs` (int) - The minimum duration (in milliseconds) that Misty's eyes stay open while blinking.

```csharp
public int OpenEyeMinMs { get; set; }
```

* `OpenEyeMaxMs` (int) - The maximum duration (in milliseconds) that Misty's eyes stay open while blinking.

```csharp
public int OpenEyeMaxMs { get; set; }
```

* `ClosedEyeMinMs` (int) - The minimum duration (in milliseconds) that Misty's eyes stay closed while blinking.

```csharp
public int ClosedEyeMinMs { get; set; }
```

* `ClosedEyeMaxMs` (int) - The maximum duration (in milliseconds) that Misty's eyes stay closed while blinking.

```csharp
public int ClosedEyeMaxMs { get; set; }
```

## BoardDetails

Details about one of Misty's boards.

*Serializable*

### BoardDetails Properties

* `BoardId` (string) - The ID for the board.

```csharp
public string BoardId { get; set; }
```

* `Hardware` (string) - The hardware version for the board.

```csharp
public string Hardware { get; set; }
```

* `Firmware` (string) - The firmware version for the board.

```csharp
public string Firmware { get; set; }
```

## BumpedState

<!-- TODO: Add links to SelfState event type and to BumpSensorPosition enum  -->

The state of Misty's bump sensors, as provided in `SelfState` event messages.

*Serializable*

### BumpedState Properties

* `EngagedSensors` (`IList<BumpSensorPosition>`) - A list of the newly engaged bump sensors.

```csharp
public IList<BumpSensorPosition> EngagedSensors
{
    get;
}
```

* `DisengagedSensors` (`IList<BumpSensorPosition>`) - A list of the newly disengaged bump sensors.

```csharp
public IList<BumpSensorPosition> DisengagedSensors
{
    get;
}
```

## BumpSensorSetting

The hazards system settings for one of Misty's bump sensors.

*Serializable*

### BumpSensorSetting Properties
<!-- TODO: add link -->
* `BumpSensorPosition` (`BumpSensorPosition`) - The position of the bump sensor associated with this setting.

```csharp
public BumpSensorPosition BumpSensorPosition { get; set; }
```

* `Enabled` (bool) - Whether this bump sensor is enabled.

```csharp
public bool Enabled { get; set; }
```

## CameraDetails

<!-- TODO: Add more information about the properties listed here. -->

Details about Misty's RGB camera.

*Serializable*

### CameraDetailsProperties

* `Width` (double) - Width (in pixels) of camera images.

```csharp
public double Width { get; set; }
```

* `Height` (double) - Height (in pixels) of camera images.

```csharp
public double Height { get; set; }
```

* `FpsRequested` (double) - Requested frames per seconds. 

```csharp
public double FpsRequested { get; set; }
```

* `FpsActual` (double) - Actual frames per second.

```csharp
public double FpsActual { get; set; }
```

* `DroppedFrames` (int) - Number of dropped frames.

```csharp
public int DroppedFrames { get; set; }
```

## CameraState

The status and current activity of Misty's RGB camera.

*Serializable*

### CameraState Properties

* `IsTakingPicture` (bool) - If `true`, Misty is taking a picture with her RGB camera.

```csharp
public bool IsTakingPicture { get; set; }
```
<!-- TODO: Add a link to RobotCameraStatus enum -->
* `OnboardCameraStatus` (`RobotCameraStatus`) - Current status of Misty's RGB camera.

```csharp
public RobotCameraStatus OnboardCameraStatus { get; set; }
```

## CapTouchedState
<!-- TODO: Add links to relevant topics -->
The state of Misty's capacitive touch sensors, as provided in `SelfState` event messages. 

*Serializable*

### CapTouchedState Properties

* `EngagedSensors` (`IList<CapTouchPosition>`) - A list of newly engaged capacitive touch sensors.

```csharp
public IList<CapTouchPosition> EngagedSensors
{
    get;
}
```

* `DisengagedSensors` (`IList<CapTouchPosition>`) - A list of newly disengaged capacitive touch sensors.

```csharp
public IList<CapTouchPosition> DisengagedSensors
{
    get;
}
```

<!-- ## CharacteristicData -->
<!-- TODO: Not fully implemented; documentation not yet provided. -->

## ChargerPose

Location data for Misty's docking station (also referred to as the *charger* or *charging station*).

*Serializable*

### ChargerPose Properties

* `HomogeneousMatrix` (`float[]`) - The docking station's position and orientation (pose) relative to the robot's right infrared (IR) camera, represented as a column major 4×4 homogeneous coordinate matrix. The 3×3 matrix of values in the upper left is a rotation matrix. The three values in the upper right represent the X, Y, and Z coordinates (in meters) at the point on the docking station over which Misty should be centered to receive a charge. The origin (0, 0, 0) point of this data is the front right IR camera in Misty's depth sensor. All data is relative to the depth sensor's frame of reference (Z is forward, X is to the right, and Y is down).

```csharp
public float[] HomogeneousMatrix { get; set; }
```

## DepthImageDetails

Details and data for depth images that Misty captures with the depth sensor in her visor. These details describe the distance of obstacles from Misty's visor. 


{{box op="start" cssClass="boxed noteBox"}}
**Note:** Depending on the scene Misty views, the sensor may return a large proportion of "unknown" values in the form of `NaN` ("not a number") values.
{{box op="end"}}

*Serializable*

### DepthImageDetails Properties

* `Width` (int) - Width of the `Image` matrix.

```csharp
public int Width { get; set; }
```

* `Height` (int) - Height of the `Image` matrix.

```csharp
public int Height { get; set; }
```

* `Image` (`IList<float>`) - A matrix of size `Height`×`Width` containing individual values of type `float`. Each value represents the distance (in millimeters) from Misty's depth sensor for a pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. **Note:** As Misty moves further away from objects, each pixel value represents a larger surface area. Conversely, if Misty moves closer to an object, each pixel represents a smaller surface area.

```csharp
public IList<float> Image { get; set; }
```

## ExposureAndGainDetails

Information about the current exposure and gain levels for the cameras in Misty's Structure Core sensor.

*Serializable*

### ExposureAndGainDetails Properties

* `Exposure` (float) - Current exposure level (in seconds).

```csharp
public float Exposure { get; set; }
```

* `Gain` (float) - Current gain level (in dB).

```csharp
public float Gain { get; set; }
```

## FaceTrainingDetails

Information about a face training request.

*Serializable*

### FaceTrainingDetails Properties

* `Message` (string) - A message about the face training request.

```csharp
public string Message { get; set; }
```
<!-- TODO: Add link to MessageType enum -->
* `MessageType` (`MessageType`) - The type of message (`Status`, `Warn`, or `Error`).

```csharp
public FaceTrainingMessageType MessageType { get; set; }
```

## HazardSettingDetails

Information about the current hazards system settings for Misty's time-of-flight (ToF) and bump sensors.

*Serializable*

### HazardSettingDetails Properties
<!-- TODO: add link -->
* `BumpSensorSettings` (`IList<BumpSensorSetting>`) - A list of Misty's bump sensors, and whether each sensor is enabled in the hazards system.

```csharp
public IList<BumpSensorSetting> BumpSensorSettings { get; set; }
```
<!-- TODO: add link -->
* `TimeOfFlightSensorSettings` (`IList<TimeOfFlightSensorSetting>`) - A list of Misty's time-of-flight sensors, and the distance threshold that triggers a hazard response for each sensor. If the distance threshold for a sensor is 0, that sensor is disabled in the hazards system.

```csharp
public IList<TimeOfFlightSensorSetting> TimeOfFlightSensorSettings { get; set; }
```

## HazardSettings

Data for changing the hazard system settings for Misty's bump and time-of-flight (ToF) and bump sensors.

*Serializable*

### HazardSettings Properties

* `RevertToDefault` (bool) - If `true`, sets Misty to use the default hazards system settings, and ignores all other `HazardSettings` fields.

```csharp
public bool RevertToDefault { get; set; }
```

* `DisableTimeOfFlights` (bool) - If `true`, disables hazards for all time-of-flight sensors by setting the distance threshold for each sensor to 0, and ignores other time-of-flight fields.

```csharp
public bool DisableTimeOfFlights { get; set; }
```

* `DisableBumpSensors` (bool) - If `true`, disables hazards for all bump sensors, and ignores other bump sensor fields.

```csharp
public bool DisableBumpSensors { get; set; }
```

* `BumpSensorsEnabled` ([`IList<BumpSensorSetting>`](./#bumpsensorsetting)) - A list for turning hazards on or off for each of Misty's bump sensors.

```csharp
public IList<BumpSensorSetting> BumpSensorsEnabled { get; set; }
```
<!-- TODO: add link -->
* `TimeOfFlightThresholds` [`IList<TimeOfFlightSensorSetting`) - A list for setting the minimum distance threshold to trigger a hazard state for each of Misty's time-of-flight sensors. Time-of-flight sensors with a distance threshold of 0 are disabled in the hazards system.

```csharp
public IList<TimeOfFlightSensorSetting> TimeOfFlightThresholds { get; set; }
```

## ImageDetails

Details about a system or user-uploaded image asset.

*Serializable*

### ImageDetails Properties

* `Name` (string) - The name of the file, with the file type extension.

```csharp
public string Name { get; set; }
```

* `Height` (double) - Image height (in pixels).

```csharp
public double Height { get; set; } 
```

* `Width` (double) - Image width (in pixels).

```csharp
public double Width { get; set; }
```

* `SystemAsset` (bool) - Whether the image is one of Misty's default system assets. For example, `SystemAsset` is `true` for each image in the set of eye assets that arrive with Misty. 

```csharp
public bool SystemAsset { get; set; }
```

## ImageFile

Information about a requested image file.

*Serializable*

### ImageFileProperties

* `Name` (string) - The name of the file, with the file type extension.

```csharp
public string Name { get; set; }
```

* `Height` (double) - Image height (in pixels).

```csharp
public double Height { get; set; } 
```

* `Width` (double) - Image width (in pixels).

```csharp
public double Width { get; set; }
```

* `SystemAsset` (bool) - Whether the image is one of Misty's default system assets. For example, `SystemAsset` is `true` for each image in the set of eye assets that arrive with Misty. 

```csharp
public bool SystemAsset { get; set; }
```

* `ContentType` (string) - The type and format of the image file.

```csharp
public string ContentType { get; set; }
```

* `Base64` (string) - A string containing the Base64-encoded image data (if the image was requested in Base64).

```csharp
public string Base64 { get; set; }
```

<!-- TODO: link? -->
* `Image` (`IEnumerable<byte>`) - The byte array of the image data (if the image was **not** requested in Base64).

```csharp
[JsonConverter(typeof(ByteArrayConverter))]
public IEnumerable<byte> Image { get; set; }
```

## INativeRobotSkill

Configuration attributes and other details for a .NET skill. Your skill sends this information to Misty when the robot loads the skill.

### INativeRobotSkill Properties

* `AllowedCleanupTimeInMs` (uint) - The amount of time (in milliseconds) given to perform cleanup tasks when a skill is cancelled or times out. When a skill ends, the system cannot restart that skill until after this time has elapsed. Default is 2000. Maximum is 10000.

```csharp
uint AllowedCleanupTimeInMs { get; set; }
```

* `UniqueId` (Guid) - A unique identifier associated with this skill. You cannot start a skill from the robot unless that skill has a valid Guid associated with this `UniqueId` property.
 
```csharp
Guid UniqueId { get; }
```

* `Name` (string) - A name of your choosing for the skill. The Skill Runner web page displays this name for the skill when connected to your robot.

```csharp
string Name { get; }
```

* `Description` (string) - Optional text description of the skill.

```csharp
string Description { get; set; }
```
<!-- TODO: add link -->
* `BroadcastMode` (`BroadcastMode`) - Setting that determines the content and frequency of messages this skill broadcasts to `SkillData` event listeners.

```csharp
BroadcastMode BroadCastMode { get; set; }
```
<!-- TODO: add link -->
* `StartupRules` (`IList<NativeStartupRule>`) - Setting that determines how a skill can start. 

```csharp
IList<NativeStartupRule> StartupRules { get; set; }
```

* `TimeoutInSeconds` (int) - How long (in seconds) this skill will run before it times out. Default is 600 seconds (10 minutes).

```csharp
int TimeoutInSeconds { get; set; }
```
<!-- TODO: add link -->
* `SharedStorageLifetime` (`SkillStorageLifetime`) - Setting that determines how long the system saves the shared data this skill creates.

```csharp
SkillStorageLifetime SharedStorageLifetime { get; set; }
```

* `ReadPermissions` (`IList<string>`) - A list of `UniqueId`s for each skill that is allowed to read the shared data this skill creates. If an empty list, any skill can read this skill's shared data. If an empty Guid, no other skills can read this skill's shared data. If the list includes one or more `UniqueId`s, only the skills associated with those `UniqueId`s can read this skill's shared data. A skill can always read the data it writes to its own shared data store.

```csharp
IList<string> ReadPermissions { get; set; }
```

* `WritePermissions` (`IList<string>`) - A list of `UniqueId`s for each skill that is allowed to create, update, and remove the data in this skill's shared data store. If empty, any skill can write to this skill's shared data store. If an empty Guid, no other skills can write to this skill's shared data store. If the list includes one or more `UniqueId`s, only the skills associated with those `UniqueId`s can write to the data in this skills shared data store. A skill can always write to its own shared data store.

```csharp
IList<string> WritePermissions { get; set; }
```

* `StartPermissions` (`IList<string>`) - A list of `UniqueId`s for each skill that is allowed to start or cancel this skill. If empty, any skill can start or cancel this skill. If an empty Guid, no other skill can start or cancel this skill. If the list includes one or more `UniqueId`s, only the skills associated with those `UniqueId`s can start or stop this skill.

```csharp
IList<string> StartPermissions { get; set; }
```

* `TriggerPermissions` (`IList<string>`) -  A list of `UniqueId`s for each skill that is allowed to trigger user events in this skill. If empty, all other skills can trigger user events in this skill. If an empty Guid, no other skills can trigger user events in this skill. If the list includes or more `UniqueId`s, only those skills can trigger user events within this skill. A skill can always trigger user events in itself.

```csharp
IList<string> TriggerPermissions { get; set; }
```

<!-- TODO: Document this? -->
<!-- ## INativeSkill -->

<!-- ## MapCell -->
<!-- TODO: document this? -->

## MapDetails

Information about a map.

### MapDetails Properties

* `Key` (string) - The map's unique key. Map keys are formatted as timestamps in UTC (for example, `Map_20190911_21.47.16.UTC`). You cannot change the value of the `Key` associated with a map.

```csharp
public string Key { get; set; }
```

* `Name` (string) - The customizable string label for the map. You can change the value of the `Name` associated with a map.

```csharp
public string Name { get; set; }
```

## MentalStateDetails

## NativeRobotSkill

## NativeValidation

## RecordedVideo

## RecordedVideoDetails

## Relevance

## RGBColor

## RobotAffect

## RobotInformation

## RobotPose

## RobotUpdateSettings

## RunningSkillDetails

## SendExternalResponseDetails

## SensorHazardStatus

## SlamMap

## SlamStatusDetails

## Validation

## VideoDetails

## VideoFile

## WebsocketName

## WorldObjectDetails