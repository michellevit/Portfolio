# Portfolio Website

![React Version](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-222.svg)

A portfolio website designed to showcase my projects.

<a href="https://michellef.dev" target="_blank">
  <img src="https://img.shields.io/badge/Website-michellef.dev-6da360?style=for-the-badge">
</a>

## Table of Contents

- [Technologies Used](#technologies-used)
- [Run the React App Locally](#run-the-react-app-locally)
- [How To Deploy](#how-to-deploy)
- [How To Edit the Dashboard](#how-to-edit-the-dashboard)
  - [Configuring Firebase Functions Environment Variables](#configuring-firebase-functions-environment-variables)
  - [Updating Firebase Functions](#updating-firebase-functions)
  - [Updating Kindle Quotes](#updating-kindle-quotes)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

## Technologies Used

- React
- GitHub Pages
- Google Firebase


## Run the React App Locally

```bash
  cd reactapp
  npm start
```

## How to Deploy

**Updating GitHub Pages**
_Note: When you run npm run deploy using the gh-pages package, this script handles deploying the contents of your build directory directly to the gh-pages branch on GitHub. This branch is specifically used for serving your site on GitHub Pages, and the deployment process does not typically require you to manually push changes to this branch. The gh-pages tool automates this for you._

- If you’ve made changes to the frontend React app and want to deploy them to your live GitHub Pages site:

```bash
cd reactapp && npm run build && npm run deploy && cd .. && git add . && git commit -m "Update" && git push origin main
```

- **Modifying the Deployment Setup**:
  1. To change the GitHub Pages configuration, update the `homepage` in `package.json` to reflect the new repository path or custom domain.
  2. Ensure that the `gh-pages` package is configured correctly in the `reactapp/package.json`.

## How To Edit the Dashboard

### Configuring Firebase Functions Environment Variables

This section walks you through setting up and deploying environment variables for your Firebase Functions—specifically adding API keys or other sensitive configuration values—so that your serverless functions can securely access external services.

- Set the API key - open bash in the root and run:
  ```bash
  firebase functions:config:set YOUR_API_NAME_HERE.key="YOUR_API_KEY_HERE"
  ```
- Add the function in the index
- Deploy the functions (including your updated config):
  ```bash
  firebase deploy --only functions
  ```
- Update your widget to read the API key from functions.config().myapi.key instead of hardcoding.
- Troubleshooting:

  - View logs for a specific function:
    ```bash
    firebase functions:log --only getMoonPhase
    ```
  - Verify your config values:
    ```bash
     firebase functions:config:get
    ```

### Updating Firebase Functions

After you've modified code in the functions/ directory (for example, editing index.js or adding new functions), follow these steps to lint, fix, and deploy your changes:
- Run lint and auto‑fixFrom your project root, execute:
  ```bash
  cd functions
  npm --prefix functions run lint -- --fix
  ```
- Deploy functions only:
  ```bash
  firebase deploy --only functions
  ```
- Verify deployment - check the CLI output for success messages. To inspect logs for a specific function:
  ```bash
  firebase functions:log --only <functionName>
  ```
- Troubleshooting
  - To see all lint errors before auto‑fixing, run:
    ```bash
    npm --prefix functions run lint
    ```
  - Ensure your Firebase CLI is current:
    ```bash
    npm install -g firebase-tools
    ```

### Updating Kindle Quotes

- Connect Kindle device to computer
  - _Note: This cannot be done without the device (i.e., solely using the online platform) due to Kindle's strict copyright policy_
- Find the 'My Clippings.txt' file and copy it
- Paste the file into the 'Utils' folder
- cd into the Utils folder and run: `python kindle-clipping-converter.py`
- Move the 'KindleQuotes.json' file into the folder 'reactapp/src/Other/Dashboard/Widgets/Data'

## Troubleshooting

- Issues with GitHub Pages deployment can often be traced back to path issues in the `homepage` field of `package.json` or DNS settings for custom domains.
- Check the console in the developer tools of your browser for any 404 errors, which typically indicate missing files or incorrect paths.

## Credits

Michelle Flandin
