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

## CameraDetails

## CameraState

## CapTouchedState

## CharacteristicData

## ChargerPose

## DepthImageDetails

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