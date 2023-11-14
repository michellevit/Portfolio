Project Title: Portfolio Website


----------
Table of Contents: 
1. Project Description
2. How to deploy on Dreamhost
3. Credits


----------
1. Project Description

This website was written in React and Node.js to display my projects.


----------
2. How to deploy on Dreamhost (React + Node.js)

-Register domain and add hosting
-Enable Passenger + Node.js (Domain Dashboard > Additional Settings)
-Login to SSH + install nvm (node version manager)
----https://help.dreamhost.com/hc/en-us/articles/360029083351-Installing-a-custom-version-of-NVM-and-Node-js
----to login to the SSH, open the terminal and enter: 'shh username@websitename'
----username+password are in DreamHost domain dashboard 'Manage Your Site' section
-In SSH, install node (Passenger only supports up to v.13.14.0)
----after installing, run 'npm install' in the 'app' folder
---https://help.dreamhost.com/hc/en-us/articles/115004415628-Node-js-installing-packages
-In cPanel, go to 'website name* folder -> public folder -> add .htaccess file
-In cPanel home/username -> add app folder (must be called 'app') with the node.js project + react build file inside
-In SSH add '.credentials' folder (with CHMOD 700) to home folder (e.g. cd ~)
-Add GOOGLE_APPLICATION_CREDENTIALS file to .credentials folder (set CHMOD 700)
---For this you will need to create a project in console.cloud.google.com in the Security -> ReCapctha Enterprise section
----Then you will need to go to APIs and Services to enable/create the API (and restrict the key to a specific domain)
----Download the Google application credentials file (.json file) -> Google Console -> IAM and admin -> Service Accounts -> Create Service Account -> Add key -> create new key -> save
-add the google application credentials file to the .credentials folder (using scp) with chmod 700
-make sure the react Contact.js has the correct recaptcha site key
----make sure the .env has the correct environment variables and that the .env file chmod is 600
-Add 'export GOOGLE_APPLICATION_CREDENTIALS='/path/to/file' to the .bashrc
---add the following to .bashrc (by going 'cd~' then nano '.bashrc'):
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

TROUBLESHOOTING:
-TO RESTART APP:
----add a folder called "tmp" to the app folder 
----run 'touch tmp/restart.txt' when you need to restart the app
-IF NODE/NVM 'not found' ON SSH:
----this often happens when ssh is opened the first time
----run 'source ~/.bashrc' in ssh
-GENERAL TROUBLESHOOTING:
----Check the error log: nano ~/logs/*website-name*/https/error.log
----New errors will be at the bottom, and the file clears after each day

----------
3. Credits

Michelle Flandin