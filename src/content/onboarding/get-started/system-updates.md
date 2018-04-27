---
title: System Updates
layout: onboarding.hbs
columns: one
order: 4
---

# {{title}}

Misty seeming a little tired lately? It's probably time to perform an update. Updates can include:

* Image assets
* Sound assets
* Motor controller firmware
* Real-time controller firmware 
* Occipital Structure Core depth sensor firmware
* Home Robot application (running on Windows IoT Core)
* Sensory Services application (running on Android)

**Note: For ease of use, we recommend that you give your Misty robot [OTA (over the air) updates](../../3-ways-to-interact-with-misty/api-explorer/#system-updates) using the API Explorer. If you have issues with an OTA update, you can try the following manual update steps.**


## Manually Updating Misty
You can follow along with these instructions while watching our [Manual Update Process video](https://www.youtube.com/watch?v=nXIJBvbnrtI).

1. Plug Misty into the charger.
2. Plug in a Micro USB cable from your computer to Misty. Use the port labeled **USB2.0 (ADB)** on the Intrinsyc Open-Q 820 Development Kit board mounted on Misty's right side. ![Misty's Micro USB port](../../../assets/images/micro_usb_port.jpg)
3. Turn on Misty’s main power switch on her back.
4. Turn on the Intrinsyc Open-Q 820 Development Kit board by holding the power button until you see the green light briefly flash. ![820 Board ON/OFF button](../../../assets/images/820_board_arrow.jpg)
5. Download the update package zip file.
6. Open the zip file (`Manual-Update.zip`) and save the `Manual Update` directory to a location on your computer.
7. Run the update package:
   * **Windows:** Right-click on `stage-firmware-update.ps1` and click **Run with Powershell**.
   * **Mac/Linux:** Run the `stage-firmware-update.sh` script in a terminal program.
8. When prompted, enter the IP address of your robot to upload the update configuration file to Misty. You can obtain the IP address of your robot from the **Info** tab of the [companion app.](../../3-ways-to-interact-with-misty/companion-app) **Note: If the upload script does not complete, you can copy the file manually, as follows:**
   * **Windows:** Use the File Explorer to navigate to the `C` directory of your robot: `\\<ip of your robot>\c$` . (If you need to log in to Misty, the default Windows IoT Core username is *administrator* and the default password is *p@ssw0rd* .) Copy the `versions.xml` file from the `Manual Update` directory to `\\<ip of your robot>\c$\Data\Users\DefaultAccount\Documents` .
   * **Mac/Linux:** In a browser window, go to `http://<ip of your robot>:8080/#File%20explorer` to view the Windows Device Portal File explorer. (If you need to log in to Misty, the default Windows IoT Core username is *administrator* and the default password is *p@ssw0rd* .) In the File explorer, select the `Documents` directory and click the **Upload** button. Navigate on your computer to the `Manual Update` directory you extracted; select and upload the `versions.xml` file. ![Device Portal File Explorer](../../../assets/images/misty_documents_dir.png)
9. Open a browser window and navigate to the Windows Device Portal at `http://<ip of your robot>:8080`  If you need to log in to Misty, the default Windows IoT Core username is *administrator* and the default password is *p@ssw0rd* . 
10. Expand the **Apps** tab on the left side of the page and select **Apps manager**.
11. In the **Apps manager** pane, click **Add**. ![Device Portal Apps manager](../../../assets/images/apps_manager_add.png)
12. Under **Install packaged application**, click the phrase **click here to browse**. ![Install packaged application popup](../../../assets/images/click_here_browse.png)
13. Browse and select the `.appxbundle` file in the `Home Robot App` directory of the `Manual Update` directory.
14. When given the option, check the **I want to specify framework packages** checkbox. ![Specify framework packages checkbox](../../../assets/images/specify_framework_pkgs.png)
15. Click **Next**.
16. Under **Choose any necessary dependencies**, click the phrase **click here to browse** and select the 3 .appx files in the `Dependencies` directory of the `Home Robot App` directory. ![Choose dependencies](../../../assets/images/choose_dependencies.png)
17. Click **Start** to begin the installation. This process may take several minutes.
18. Once the installation is complete, click the **Startup** radio button for `Misty 0.7 Home Robot` to set it as the startup application. ![Setting Misty 0.7 Home Robot app to run at startup](../../../assets/images/select_startup_app.png)
19. Watch Misty while you wait for the Misty Home Robot app to start up. The Misty Robotics logo will appear, and Misty's eyes may briefly display before they are replaced by an **Updating...** image. Misty may twitch while performing the firmware update. **Note: The update process may take up to a half hour.** ![Updating screen](../../../assets/images/updating.png)
20. If the update is successful, Misty plays a cheerful sound and her eyes appear happy for two seconds, before changing back to their default appearance. Also, with a successful update, the blue LED connector light on the front-right side of Misty's head should come on. If the blue connector light does not come on, or if Misty plays a sad sound and her eyes appear sad for two seconds, the update has failed. **Note: If the update fails, pleaes reach out for assistance on any of the Misty Robotics support channels.**
21. If the update was successful, while your computer is still plugged into Misty's Micro USB port and the Intrinsyc Open-Q 820 Development Kit board is turned on, run one of the following update scripts: `update-820.ps1` (Windows) or `update-820.sh` (Mac/Linux). Both scripts are located in the `Manual Update` directory in the directories for their respective platforms. You may need to wait 5 minutes or more for the Intrinsyc Open-Q 820 Development Kit board to restart after the update.
22. If the release you're installing includes updates to the Occipital Structure Core firmware: Connect to the [API Explorer](../../3-ways-to-interact-with-misty/api-explorer) and issue a [Start Mapping](../../3-ways-to-interact-with-misty/api-explorer/#mapping-alpha) command. This allows the firmware to be picked up by the Occipital Structure Core depth sensor.

