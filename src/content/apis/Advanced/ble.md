---
title: Bluetooth API
layout: apis.hbs
columns: one
order: 2
---

# {{title}}

## General Information

A subset of Misty's API commands are sent over the BLE (Bluetooth Low Energy) channel.


### Bluetooth LE Service Characteristics
* Id = `1562C132-3A0D-4F39-9E67-A9A632E8D6AA`
* Read Only 
   * Id = `418F52AB-10C6-42A6-9590-58CCCB818F64`
   * Purpose: Respond to commands sent to Misty
* Write Only 
   * Id = `3EE51024-7FDD-4D37-95AA-0A4B0E2D4F34`
   * Purpose: Submit commands to Misty
* Status 
   * Id = `5C92FE59-F225-46AF-AB69-14BDFFB02DDC`
   * Purpose: Read status information from Misty
   * Format
      * Byte[0-3] = Integer indicating SLAM Status
      * Byte[4] = SLAM System has position
      * Byte[5-8] = IPv4 Address

### Message Size
* Read Commands
   * Maximum packet size: 512 bytes
   * Maximum data size: 509 bytes
* Write Commands
   * Maximum packet size: (Platform Dependent)
     * iOS and Android (v4.4 and below): 20 bytes
     * Other: 512 bytes
   * Maximum data size: (Platform Dependent)
     * iOS and Android (v4.4 and below): 17 bytes
     * Other 509 bytes

### Packet Format

|       Command ID      |   Message Type       |    Data .....      |
:---|:---:|:---:


* Command ID: 2 bytes
* Message Type: 1 byte
   * 0: No data
   * 1: Meta data
   * 2: Data
   * 3: End
* Data: Maximum 3 bytes. Data is sent as UTF-8 encoded string with comma-separated values. **Note: All data is in big endian format.**


##### Multi-Packet Format
For some commands, not all data fits into a single packet. These types of commands (SlamGetMap, SlamGetPath, FollowPath, etc.) must follow a specific order to be processed correctly:
1. Metadata Packet
   * This packet describes the number of packets to expect. It follows the same format as a normal packet but contains 4 bytes for the number of packets to expect.
   * Can also contain extra metadata for different command types.
   * | Command Id | 1 (Metadata message type) | 4 bytes (# of packets) | Extra metadata
2. N Data Packets
   * 1st through N-1 Packets should have Message Type of 2.
   * Nth Packet should have a Message Type of 3.

** Write **
1. Write Metadata Packet​.
2. Write Data Packet(s).

** Read **
1. Read Metadata Packet.
   * Use the 4th-8th bytes to create a 32-bit integer to indicate how many packets to expect.
   * Use extra metadata for different command types.



## Write Commands

### LocomotionTrack
Drives Misty left, right, forward, or backward, depending on the track speeds specified for the individual tracks.

###### Command Id:
100

###### Arguments:
* LeftTrackSpeed - Integer - A value for the speed of the left track, range: -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.
* RightTrackSpeed - Integer - A value for the speed of the right track, range: -128 to 127. A negative value moves the track backward, and a positive value moves the track forward.

###### Packet Format:
* Command Id = 100
* Message Type = 3 (End)
* Data = ex. "20,20"

|0|100|3|"20,20"|
:---|:---:|:---:

###### Response:
None or empty (0)

---------------

##### SlamReset
Resets the SLAM sensors.

###### Command Id:
41

###### Arguments:
* None or Empty

###### Packet Format:
* Command Id = 41
* Message Type = 3
* Data = None

|0|41|3|
:---|:---:|:---:

###### Response:
* None or Empty

---------------

##### SetNetworkConnection
Connects Misty to a specified WiFi source.

###### Command Id:
8
###### Arguments:
* NetworkName - string - The WiFi network name (SSID).
* Password - string - The WiFi network password.

###### Packet Format:
* Command Id = 8
* Message Type = 2 and 3
* Data = network name and password in a UTF-8 string


  |0|8|2|"network name, password"|
  :---|:---:|:---:

  |0|8|3| ...
  :---|:---:|:---:

###### Response:
* None

---------------

## Beta/Experimental Commands

##### SlamGetMap - BETA
Obtains the current map that Misty has generated. To get a map, you must first write the command to the write-only characteristic, then read the read-only characteristic for the response.

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
* OccupancyGrid - Data containing the width, height, scale (meters per cell), and state of each cell (unknown, open, occupied and covered) in the mapped grid.

###### Response Data Format:

|0|48|1|#frames (4B)|Map width (4B)|Map height (4B)|meters per cell (4B)|
:---|:---:|:---:
|0|48|2| cell1 (1B)| cell2 | cell3 | ...|
|0|48|3| ...|

Each byte in the response has 4 cells worth of information that must be bit-shifted to obtain the correct cell value. Here's an example in C#

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

Each cell can contain a value from 0-3, as described below.

* 0 - the occupancy of the cell is unknown
* 1 - the cell is open (unoccupied)
* 2 - the cell is occupied
* 3 - the cell is covered (able to drive underneath)

_Note: When reading from the BLE API, the order of bytes begins at (0,0) in a two-dimensional array. But Misty's origin is at the opposite corner of the two-dimensional array (i.e., height - 1, width -1). Therefore when displaying the map on a screen, you must draw from the end of the two-dimensional array, not the beginning._

---------------

##### SlamGetPath - ALPHA
Obtain a path with waypoints from Misty's current location to the specified destination. In order to obtain a path, you must first write the command to the write-only characteristic, then read the read-only characteristic for the response. When reading, the first packet contains metadata about the rest of the transmission.

###### Command Id:
47

###### Arguments:
* Destination Coordinates (X, Y).

###### Packet Format:
* Command Id = 47
* Message Type = 3 (End)
* Data =  destination coordinates in UTF-8 string format. Example: "1,3,2,4,..."

|0|47|3|
:---|:---:|:---:

###### Response:
* A list of coordinates indicating the path for Misty to follow.

###### Response Data Format:

|0|47|1|#frames (4B)|coordinates counts (4B)|
:---|:---:|:---:
|0|47|2| x1|y1|...
|0|47|3| ...

---------------

##### SlamStartMapping - BETA
Starts Misty mapping an area.

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

##### SlamStopMapping - BETA
Stops Misty mapping an area.

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

##### SlamStartTracking - BETA
Starts Misty tracking her location as she moves.

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

##### SlamStopTracking - BETA
Stops Misty tracking her location.

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

##### FollowPath - BETA
Drives Misty on a path defined by coordinates you provide.

###### Command Id:
106

###### Arguments:
* Waypoints - List - list of GridCell (x,y) integer coordinates. Example: (1,3),(2,4),... You can obtain Waypoint values from a map that Misty has previously generated. **Note: X values specify directions forward and backward. Sideways directions are specified by Y values.**

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

