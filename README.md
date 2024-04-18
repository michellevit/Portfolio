# Portfolio Website

![React Version](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16.13.0-green.svg)
![Heroku](https://img.shields.io/badge/Platform-Heroku-3B2F63.svg)

A portfolio website designed to showcase my projects, developed using Node.js and React, and deployed on Heroku.


<a href="https://michellef.dev" target="_blank"><img src="https://img.shields.io/badge/Website-green?style=for-the-badge&logo=node.js"></a>


## Table of Contents
- [Technologies Used](#technologies-used)
- [PRE-HEROKU: How To Deploy on DreamHost](#how-to-deploy)
- [How To Update the App via Heroku](#how-to-update)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)


## Technologies Used<a name="technologies-used"></a>
  - React
  - Node.js
  - Heroku


## How To Deploy on DreamHost<a name="how-to-deploy"></a>
- **NOTE: This app is now hosted on Heroku, not DreamHost. Passenger support was removed**
- Register domain and add hosting
- Enable Passenger + Node.js (Domain Dashboard > Additional Settings)
- Login to SSH + install nvm (node version manager)
  - https://help.DreamHost.com/hc/en-us/articles/360029083351-Installing-a-custom-version-of-NVM-and-Node-js
  - to login to the SSH, open the terminal and enter: `shh username@websitename`
    - username+password are in DreamHost domain dashboard 'Manage Your Site' section
- In SSH, install node (Passenger only supports up to v.13.14.0)
  - after installing, run `npm install` in the 'app' folder
  - https://help.DreamHost.com/hc/en-us/articles/115004415628-Node-js-installing-packages
- In cPanel, go to 'website name* folder -> public folder -> add .htaccess file
- In cPanel home/username -> add app folder (must be called 'app') with the node.js project + react build file inside
- In SSH add '.credentials' folder (with CHMOD 700) to home folder (e.g. cd ~)
- Add GOOGLE_APPLICATION_CREDENTIALS file to .credentials folder (set CHMOD 700)
  - For this you will need to create a project in console.cloud.google.com in the Security -> ReCapctha Enterprise section
  - Then you will need to go to APIs and Services to enable/create the API (and restrict the key to a specific domain)
  - Download the Google application credentials file (.json file) -> Google Console -> IAM and admin -> Service Accounts -> Create Service Account -> Add key -> create new key -> save
- Add the google application credentials file to the .credentials folder (using scp) with chmod 700
- Make sure the react Contact.js has the correct recaptcha site key
  - Make sure the .env has the correct environment variables and that the .env file chmod is 600
- Add `export GOOGLE_APPLICATION_CREDENTIALS='/path/to/file'` to the .bashrc
  - Add the following to .bashrc (by going 'cd~' then nano '.bashrc'):
    - `export NVM_DIR="$HOME/.nvm"`
    - Load nvm: `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
    - Loads nvm bash_completion: `[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"`


## How To Update the App via Heroku<a name="how-to-update"></a>
- Just make the changes to the files, and push to GitHub
  - The app is connected to Heroku and automatically deploys after every push to main
  - The reactapp is built via Heroku's Nodejs buildpack (which runs the 'heroku-postbuild' script in the root folder's package.json)


## Troubleshooting<a name="troubleshooting"></a>
- Reference -> [How to Safely use Google Application Credentials on Heroku](https://learnings.desipenguin.com/post/goog-cred-heroku/)



## Credits<a name="credits"></a>
Michelle Flandin