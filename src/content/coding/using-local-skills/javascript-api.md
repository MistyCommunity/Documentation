---
title: Javascript API
layout: onboarding.hbs
columns: three
order: 3
---

# {{title}}

## Images & Display

<!-- misty.ChangeDisplayImage -->
### misty.ChangeDisplayImage
Displays an image on Misty's screen. Optionally, `misty.ChangeDisplayImage()` can display an image for a specific length of time and/or transparently overlay an image on Misty's eyes. Use the [`SaveImageAssetToRobot`](../../using-remote-commands/rest/#saveimageassettorobot-byte-array-string-) in Misty's REST API to upload images to Misty.

Note that it's not possible for a custom image to overlay another custom image. Misty's eyes always appear as the base image, behind an overlay.

Arguments:
* fileName (string) - Name of the file containing the image to display. Valid image file types are .jpg, .jpeg, .gif, .png. Maximum file size is 3MB. To clear the image from the screen, pass an empty string ```""```.
* timeoutInSeconds (double) - Optional. The length of time to display the specified image.
* alpha (double) - Optional. The transparency of the image. A value of 0 is completely transparent; 1 is completely opaque. When you specify a value greater than 0 and less than 1, the image appears but is transparent, and Misty's eyes appear behind the specified image. Defaults to 1.
* prePause (integer) - Optional. The length of time in milliseconds to wait before executing this command.
* postPause (integer) - Optional. The length of time in milliseconds to wait between executing this command and executing the next command in the skill. If no command follows this command, `postPause` is not used.

```JavaScript
misty.ChangeDisplayImage(string fileName, [double timeoutInSeconds], [double alpha], [int prePause], [int postPause])
```

Returns:
* Success (boolean) - Returns `true` if there are no errors related to this call. Otherwise, `false`.


## Audio

## Locomotion

## Faces

## Head Movement

## Arm Movement

## Mapping & Tracking

## Information

## LEDs

## Events & Timing

## Data

## Debugging