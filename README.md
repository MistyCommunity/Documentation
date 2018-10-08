# Misty Robotics Developer Documentation

This repo contains the Misty Robotics documentation viewable [here](docs.mistyrobotics.com). The documentation is early stage and is growing continuously. We're grateful for all feedback and contributions. 

The Misty Robotics documentation is based on a design by [Particle](docs.particle.io), is built with [Metalsmith](http://www.metalsmith.io), and is formatted using [Markdown](https://daringfireball.net/projects/markdown/syntax).


## Building This Documentation Locally

Follow these steps to build the documentation locally:

1. Use the **Clone or download** button here on the doc repo to download a zip ("Documentation-master") of the docs.
2. Ensure you have [npm](https://www.npmjs.com) and [Node.js](nodejs.org) installed on your machine.
3. Use a terminal program to navigate to the `Documentation-master` directory.
4. Run `npm install` .
5. Run `npm start` .
6. Open a browser window to `localhost:8080` .

The actual content is stored in the `Documentation-master/src/content` directory as Markdown files.


## Fixing and Growing the Docs

Found something small in the documentation that you think should be changed? Create an issue right here in the repo. Go to the **Issues** tab and click **New issue**.

Want to contribute something to the documentation that's bigger than a bug report?

First, before you invest too much time, reach out and let us know what you're thinking. It may be that we already know about the issue or are already creating new content. Reaching out could save you time and effort.

Second, assuming we're not already making the changes, go ahead and fork the repo. After editing the source files, build the documentation locally and make a pull request, as described [here](https://help.github.com/articles/working-with-forks/).
