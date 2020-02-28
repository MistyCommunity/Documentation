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

* `ContentType` (string) - The content type of the audio file.

```csharp
public string ContentType { get; set; }
```

* `Base64` (string) - A string with the Base64-encoded audio file data. This data returns when you specify that the audio file data should be returned as Base64 data.

```csharp
public string Base64 { get; set; }
```

* Audio (IEnumerable<byte>) - A byte array of the audio file data. This data returns when you do not specify that the audio file should be returned as a Base64 string.

```csharp
[JsonConverter(typeof(ByteArrayConverter))]
public IEnumerable<byte> Audio { get; set; }
```

## BatteryChargeDetails

Misty's current battery charge and other details about the battery.

*Serializable*

### BatteryChargeDetails Properties

* `ChargePercent` (double) - Decimal value representing current charge percent.

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

* `Trained` (bool) - Returns `true` if the battery has been trained. Otherwise, `false`. If the battery has not been trained, the value provided for `ChargePercent` is an approximation.

```csharp
public bool Trained { get; set; }
```

* `Voltage` (double) - The battery's current voltage.

```csharp
public double Voltage { get; set; }
```

* `Current` (double) - The current flowing into or discharging from the battery. This value is negative when the battery is discharging, and positive when the battery is being charged.

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

* `BlinkImages` (`IDictionary<string, string>`) - A dictionary of blink mappings for each image on the robot. When blinking is enabled, these are the mappings that each image alternates between.

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

* `IsTakingPicture` (bool) - If `true`, Misty is currently taking a picture with her RGB camera.

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

* `HomogeneousMatrix` (`float[]`) - The docking station's position and orientation (pose) relative to the robot's right infrared (IR) camera, represented as a column major 4x4 homogeneous coordinate matrix. The 3x3 matrix of values in the upper left is a rotation matrix. The three values in the upper right represent the X, Y, and Z coordinates (in meters) at the point on the docking station over which Misty should be centered in order to receive a charge. The origin (0, 0, 0) point of this data is the front right IR camera in Misty's depth sensor. All data is relative to the depth sensor's frame of reference (Z is forward, X is to the right, and Y is down).

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

* `Image` (`IList<float>`) - A matrix of size `Height` x `Width` containing individual values of type `float`. Each value represents the distance (in millimeters) from Misty's depth sensor for a pixel in the captured image. For example, if you point the sensor at a flat wall 2 meters away, most of the values in the matrix should be around 2000. **Note:** As Misty moves further away from objects, each pixel value represents a larger surface area. Conversely, if Misty moves closer to an object, each pixel represents a smaller surface area.

```csharp
public IList<float> Image { get; set; }
```

## ExposureAndGainDetails

## FaceTrainingDetails

## ImageDetails

## ImageFile

## INativeRobotSkill

## INativeSkill

## MapCell

## MapDetails

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