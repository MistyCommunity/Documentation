---
title: Bluetooth API
layout: apis.hbs
columns: one
order: 2
---

# {{title}}

## General Information

Commands sent over bluetooth low energy API channel; mainly between the robot and mobile application.  There are two distinctions for the commands: commands being sent to the robot from mobile app (write commands) and commands being sent from the robot to mobile app (read commands).

For write commands, we find that all BLE hardware support up to 20 bytes of data while other hardware can support up to 512 bytes.  For read commands, we find that we can change the BLE configuration to support up to 512 bytes of data.

##### Bluetooth LE Service
* Id = `1562C132-3A0D-4F39-9E67-A9A632E8D6AA`
###### Characteristics
* Read Only Characteristic
   * Id = `418F52AB-10C6-42A6-9590-58CCCB818F64`
   * Purpose: Respond to commands sent to the robot
* Write Only Characteristic
   * Id = `3EE51024-7FDD-4D37-95AA-0A4B0E2D4F34`
   * Purpose: Submit commands to the robot
* Status Characteristic
   * Id = `5C92FE59-F225-46AF-AB69-14BDFFB02DDC`
   * Purpose: Read Status information from the robot
   * Format
      * Byte[0-3] = Integer indicating Slam Status
      * Byte[4] = Slam System has position
      * Byte[5-8] = IPv4 Address

##### Message Size
###### Read Commands
* Maximum packet size: 512 bytes
* Maximum data size: 509 bytes

###### Write Commands
* Maximum packet size: (Platform Dependent)
  * iOS and Android (v4.4 and below): 20 bytes
  * Other: 512 bytes
* Maximum data size: (Platform Dependent)
  * iOS and Android (v4.4 and below): 17 bytes
  * Other 509 bytes

##### Packet Format

|       Command Id      |   Message Type       |    Data .....      |
:---|:---:|:---:
* Command Id: 2 bytes
* Message Type: 1 byte
* Data:  MAX - 3 bytes, data is sent as UTF-8 encoded string with comma separating the value

**Note that all data are in big endian format.**

##### Message Types
* 0: No data
* 1: Meta data
* 2: Data
* 3: End

##### Multi-packet Format
For some commands not all data will fit into a single packet. These types of commands (SlamGetMap, SlamGetPath, FollowPath, etc.) must follow a specific order to be processed correctly.

Order:
1. Metadata Packet
   * This packet describes the number of packets to expect. It follows the same format as a normal packet but contains 4 bytes for the number of packets to expect
   * Can also contain extra metadata for different command types
   * | Command Id | 1 (Metadata message type) | 4 bytes (# of packets) | Extra metadata
2. N Data Packets
   * 1st through N-1 Packets should have Message Type of 2
   * Nth Packet should have a Message Type of 3

###### Writes
1. Write Metadata Packet​
2. Write Data Packet(s)

###### Reads
1. Read Metadata Packet
   * Use the 4th-8th bytes to create a 32 bit integer which indicates how many packets to expect
   * Use extra metadata for different command types

## Write Commands
##### LocomotionTrack
Control the tracks on the robot to move at certain speed
###### Command Id:
100

###### Arguments:
* LeftTrackSpeed (integer) - value between -128 to 127.  Negative value indicates backward direction and positive value indicates forward direction.
* RightTrackSpeed (integer) - value between -128 to 127.  Negative value indicates backward direction and positive value indicates forward direction.
###### Packet Format:
* Command Id = 100
* Message Type = 3 (End)
* Data = ex. "20,20"

|0|100|3|"20,20"|
:---|:---:|:---:

###### Response:
None or empty (0)

---------------

##### SlamGetMap
Get map from SLAM system. In order to get a map you first need to write the command to the write only characteristic and then start reading the read only characteristic for the response.
###### Command Id:
48

###### Arguments:
* None

###### Packet Format:
* Command Id = 48
* Message Type = 3 (End)
* Data = none

|0|48|3|
:---|:---:|:---:

###### Response:
* OccupancyGrid - data containing width, height, scale (meters per cell) and state of each cell (unknown, open, occupied and covered) in the grid

###### Response Data Format:

|0|48|1|#frames (4B)|Map width (4B)|Map height (4B)|meters per cell (4B)|
:---|:---:|:---:
|0|48|2| cell1 (1B)|cell2|cell3|...
|0|48|3| ...

Each byte in the response has 4 cells worth of information that needs to be bit shifted in order to get the correct cell value. Here's an example in C#

```c#
int originalGridSize = width * height; // Get these from first metadata packet
byte[] reducedGrid = new byte[(int)Math.Ceiling(originalGridSize / 4.0f)];
// TODO: Read each response data packet into reducedGrid byte array
byte[] inflatedGrid = new byte[originalGridSize];
int inflatedGridCell = 0;
foreach (var b in reducedGrid)
{
    inflatedGrid[inflatedGridCell++] = (byte)((fcb & 0xC0) >> 6);
	if (inflatedGridCell == originalGridSize) break;

  	inflatedGrid[inflatedGridCell++] = (byte)((fcb & 0x30) >> 4);
	if (inflatedGridCell == originalGridSize) break;

    inflatedGrid[inflatedGridCell++] = (byte)((fcb & 0xC) >> 2);
	if (inflatedGridCell == originalGridSize) break;

    inflatedGrid[inflatedGridCell++] = (byte)(fcb & 0x3);
}
```



Each cell can contain a value from 0-3 described below.

* 0 - the occupancy of the cell is unknown
* 1 - the cell is open (unoccupied)
* 2 - the cell is occupied
* 3 - the cell is covered (able to drive underneath)

_Note: When reading from the BLE Api, the order of bytes starts at (0,0) in a two-dimensional array. But Misty's origin is at the opposite corner of the two dimensional array i.e. (height - 1, width -1). This means when displaying the map on a screen you should draw from the end of the two dimensional array, not the beginning._

---------------

##### SlamGetPath
Get waypoint path from SLAM system. In order to get a path you first need to write the command to the write only characteristic and then start reading the read only characteristic for the response. When reading, the first packet should be metadata about the rest of the transmission.
###### Command Id:
47

###### Arguments:
* Destination Coordinates (X, Y)

###### Packet Format:
* Command Id = 47
* Message Type = 3 (End)
* Data =  destination coordinates in UTF-8 string ex. "1,3,2,4,..."

|0|47|3|
:---|:---:|:---:

###### Response:
* list of coordinates indicating the path for the robot to follow

###### Response Data Format:

|0|47|1|#frames (4B)|coordinates counts (4B)|
:---|:---:|:---:
|0|47|2| x1|y1|...
|0|47|3| ...

---------------

##### SlamStartMapping
Tell SLAM system to start mapping the surrounding
###### Command Id:
45

###### Arguments:
* None

###### Packet Format:
* Command Id = 45
* Message Type = 3 (End)
* Data = none

|0|45|3|
:---|:---:|:---:
###### Response:
* None or empty (0)

---------------

##### SlamStopMapping
Tell SLAM system to stop mapping the surrounding
###### Command Id:
46
###### Arguments:
* None

###### Packet Format:
* Command Id = 46
* Message Type = 3 (End)
* Data = none

|0|46|3|
:---|:---:|:---:
###### Response:
* None or empty (0)

---------------

##### SlamStartTracking
Tell SLAM system to start tracking the robot's current position as the robot moves around
###### Command Id:
43
###### Arguments:
* None

###### Packet Format:
* Command Id = 43
* Message Type = 3 (End)
* Data = none

|0|43|3|
:---|:---:|:---:
###### Response:
* None or empty (0)

---------------

##### SlamStopTracking
Tell SLAM system to stop tracking the robot's position
###### Command Id:
44

###### Arguments:
* None

###### Packet Format:
* Command Id = 44
* Message Type = 3 (End)
* Data = none

|0|44|3|
:---|:---:|:---:
###### Response:
* None or empty (0)

---------------

##### SlamReset
Reset the SLAM system
###### Command Id:
41
###### Arguments:
* None or Empty
###### Packet Format:
* Command Id = 41
* Message Type = 3
* Data = None

|0|41|3|

###### Response:
* None or Empty

---------------

##### FollowPath
Tell robot to follow waypoints path
###### Command Id:
106
###### Arguments:
* Waypoints (List) - list of GridCell (x,y) coordinates ex. (1,3),(2,4),...
###### Packet Format:
* Command Id = 106
* Message Type = 1, 2 and 3
* Data = path in UTF-8 string ex. "1,3,2,4,..."

|0|106|1|#frames (4B)|
:---|:---:|:---:
|0|106|2| ...
|0|106|3| ...

###### Response:
* None or empty (0)

---------------

##### SetNetworkConnection
Configure WiFi network
###### Command Id:
8
###### Arguments:
* NetworkName (string) - SSID name of the WiFi network
* Password (string) - WiFi network password

###### Packet Format:
* Command Id = 8
* Message Type = 2 and 3
* Data = network name and password in UTF-8 string
*
  |0|8|2|"network name, password"|
  :---|:---:|:---:
  |0|8|3| ...

###### Response:
* None
