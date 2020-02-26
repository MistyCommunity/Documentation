---
title: Hardware Extensibility
layout: coding.hbs
columns: one
order: 3
---

# {{title}}

You can augment Misty's native capabilities by using external microcontrollers, sensors, and other third-party hardware in your skills and robot applications.

External hardware can connect to the Universal Asynchronous Receiver-Transmitter (UART) serial and Universal Serial Bus (USB) ports on Misty's back. Remove Misty's magnetic backpack cover to access these ports.

![Misty's USB and Serial Ports](/assets/images/misty-ii-backpack.png)

The UART serial and USB port channels have separate, isolated power controllers that allow Misty to supply power to external hardware. The 3.3v output supplies up to 1A of power, and the USB port supplies up to 500 mA.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** In the current software, you cannot use a skill to read or write data over Misty's USB port. The primary use for the USB port at this time is to supply power to external devices. You can also use the port with a flash drive or a USB-to-Ethernet adapter to [connect Misty to your local Wi-Fi network](../../../tools-&-apps/web-based-tools/command-center/#connecting-wi-fi).
{{box op="end"}}

The UART serial port enables communication between Misty's skills and an external device. When you use the [Misty Backpack for Arduino](../../../misty-ii/robot/misty-backpack-for-arduino), Misty's UART pins interface with the metal pads on the backpack's mount to send and receive data from the board. You can also connect your own microcontroller, a Raspberry Pi, or other UART serial-enabled hardware.

The pins for Misty's UART serial port are configured as follows:
 
* **RX (receiver)**: Receives messages sent to Misty from an external device.
* **GND (ground)**: The grounding pin for the electrical circuit.
* **TX (transmitter)**: Transmits messages from Misty to connected hardware.
* **3.3V**: Supplies power to the connected hardware at 3.3v up to 1A.

### Designing Custom Attachments

Misty's arms, backpack attachment, magnetic headpiece, and trailer hitch can all be removed and replaced with your own custom designs. In addition to these mounting points, you can modify your robot's appearance and functionality by designing attachments for placement anywhere on her exterior.

Find CAD files for Misty's mounting points and exterior parts in the [Misty_II_CAD repository on GitHub](https://github.com/MistyCommunity/Misty_II_CAD).

{{box op="start" cssClass="boxed tipBox"}}
**Tip:** When designing custom attachments for use with Misty, keep the following in mind:

* Protect Misty's motors by keeping your custom attachments light.
* Design your custom attachments to avoid interfering with Misty's [head and arm movement ranges](#coordinate-system-amp-movement-ranges). If possible, build your parts to easily detach from the robot in the event they catch on something while Misty is running a skill.
* Avoid covering Misty's heat sinks and the fan intake areas on her head, neck, and chassis. Make sure your attachments do not interfere with Misty's treads, and avoid covering Misty's time-of-flight sensors to keep the hazards system functional.
{{box op="end"}}