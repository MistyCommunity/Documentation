---
title: API Explorer
layout: onboarding-tools.hbs
columns: one
order: 2
---

# {{title}}

Misty's [API Explorer](http://sdk.mistyrobotics.com/api-explorer/) provides interactive access to Misty's REST API endpoints. You can use the API Explorer to:

* browse the list of Misty's REST API endpoints
* send REST API commands to Misty
* experiment with different parameters
* generate code samples for Misty's REST API and on-robot JavaScript API

The API Explorer simplifies experimenting with different commands. It allows you to quickly see Misty's responses, so you can understand how your code works with Misty. For more information about using Misty's APIs, see the [REST API](../../../misty-ii/rest-api/api-reference) and [on-robot JavaScript API](../../../misty-ii/javascript-sdk/api-reference) reference documentation.

## Setting Up the API Explorer

Connect Misty to the [API Explorer](http://sdk.mistyrobotics.com/api-explorer/) to start experimenting with her REST endpoints. Before you connect Misty to an instance of the API Explorer, **make sure your computer and Misty are on the same Wi-Fi network**.

1. [Open up the API Explorer](http://sdk.mistyrobotics.com/api-explorer) in a browser window.
2. Enter the IP address of your robot (you can find your robot's IP address in the Misty companion app) and click the **Connect** button. Watch for the text on the **Connect** button to change to **Connected**.

## Sending a Request

Follow these steps to send REST requests from the API Explorer to Misty.

1. Make sure Misty is connected to the [API Explorer](http://sdk.mistyrobotics.com/api-explorer/).
2. Choose a command from the [**Command List**](./#command-list) on the left-hand side of the page.
3. Enter values for any parameters the command requires.
4. Click the **Send Request** button to send the request to Misty.

When you send a request, Misty's response appears in the [**JSON Response** section](./#json-response) of the API Explorer, as well as in your browser's web console.

The full sequence for sending a request from the API Explorer looks like this: ![API Explorer request](/assets/images/api-explorer-send-request-animation.gif)

## Using Code Samples

You can use the [API Explorer](http://sdk.mistyrobotics.com/api-explorer/) to generate code samples for Misty's REST API and her on-robot JavaScript API. Click the **Copy** button next to a section to copy the text from that section to your computer's clipboard.

### REST API Code Samples

The API Explorer generates code samples for Misty's REST API in JavaScript that use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). You can run these code samples by pasting them into the `<script>` tags of an .html file and opening that file in your web browser.

### JavaScript API Code Samples

You can use the API Explorer to generate code samples for many of the methods in Misty's on-robot JavaScript API. These code samples appear in the [**Skill Code** section](./#skill-code) of the request form.

{{box op="start" cssClass="boxed noteBox"}}
**Note:** Code samples for "Get"-type commands also include examples of the [callback function required to handle the data](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#-quot-get-quot-data-callbacks) that Misty returns.
{{box op="end"}}

You can run these code samples by copying them from the API Explorer and pasting them into the [code file](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#code-file) for an on-robot JavaScript skill. Then, [upload the code to Misty](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#loading-amp-running-a-javascript-skill) and [start the skill](../../../misty-ii/javascript-sdk/javascript-skill-architecture/#starting-amp-stopping-a-javascript-skill).

## Parts of the API Explorer

This topic briefly describes the function of each part of the API Explorer.

### Command List

Browse the command list to see the endpoints available on the connected Misty robot. Select a command to open the request form.

Commands are organized into groups by function. You can also choose sort the list of commands alphabetically. Each command in the list is labeled with the HTTP method used when you send a request to the endpoint associated with that command.

![Command List](/assets/images/api-explorer-command-list.png)

### Request

The **Request** section of the request form includes a brief description of the selected command. It also shows sample code for making a request to the associated endpoint.

The sample code in this section automatically updates when you enter new data into the **Parameters** fields. To copy this sample code, click the **Copy** button. 

For information about using this sample code with Misty, see [REST API Code Samples](./#rest-api-code-samples).

![API Explorer Request](/assets/images/api-explorer-request.png)

### Parameters

The **Parameters** section includes fields where you can enter data to send along with your request. When you enter values into these fields, the sample code in the **Request** and **Skill Code** sections automatically update. To send a request to Misty, click the **Send Request** button.

![API Explorer Parameters](/assets/images/api-explorer-parameters.png)

### JSON Response

The **JSON Response** section shows any data Misty returns when you send a request.
To copy the contents of this section to your clipboard, click the **Copy** button.

For more information about the return values for Misty's REST API, see the [REST API reference documentation](../../../misty-ii/rest-api/api-reference).

![JSON response](/assets/images/api-explorer-json-response.png)

### Skill Code

The **Skill Code** section of the API Explorer shows sample code for using the command with Misty's [JavaScript SDK](../../../misty-ii/javascript-sdk/javascript-skill-architecture).

For information about using this code in your skills, see [JavaScript API Code Samples](./#javascript-api-code-samples).
For details about each of the methods in Misty's on-robot JavaScript API, see the [JavaScript API reference documentation](../../../misty-ii/javascript-sdk/api-reference).

![Skill Code section](/assets/images/api-explorer-skill-code.png)

