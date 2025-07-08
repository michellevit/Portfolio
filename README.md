# Portfolio Website

![React Version](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-222.svg)

A portfolio website designed to showcase my projects, developed using React, and previously deployed on Heroku, now hosted on GitHub Pages using a static site approach.

<a href="https://michellef.dev" target="_blank"><img src="https://img.shields.io/badge/Website-michellef.dev-6da360?style=for-the-badge&logo=github"></a>

## Table of Contents

- [Technologies Used](#technologies-used)
- [How To Edit](#how-to-edit)
- [How To Deploy](#how-to-deploy)
- [How To Update GitHub Pages](#how-to-update-github-pages)
- [How To Edit the Dashboard](#how-to-edit-the-dashboard)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

## Technologies Used

- React
- GitHub Pages
- Google Firebase

## How to Edit

- ```powershell
  cd reactapp
  npm start
  ```

## How to Deploy

### Current Hosting on GitHub Pages

- The website is now statically hosted using GitHub Pages for more cost-efficient hosting.
- GitHub Pages supports static sites, which prompted the conversion of all dynamic backend functionality to use client-side solutions or third-party services like Formspree for form handling.

## How To Update GitHub Pages

- Note: When you run npm run deploy using the gh-pages package, this script handles deploying the contents of your build directory directly to the gh-pages branch on GitHub. This branch is specifically used for serving your site on GitHub Pages, and the deployment process does not typically require you to manually push changes to this branch. The gh-pages tool automates this for you.

-If you’ve made changes to the frontend React app and want to deploy them to your live GitHub Pages site:

```bash
cd reactapp && npm run build && npm run deploy && cd .. && git add . && git commit -m "Update" && git push origin main
```

- **Modifying the Deployment Setup**:
  1. To change the GitHub Pages configuration, update the `homepage` in `package.json` to reflect the new repository path or custom domain.
  2. Ensure that the `gh-pages` package is configured correctly in the `reactapp/package.json`.

## How To Edit the Dashboard

### Modifying Firebase

- When modifying functions/index.js - after you must:
- Navigate to the root project folder and then run:

```powershell
npm --prefix functions run lint -- --fix
firebase deploy --only functions
```

### Adding an API endpoint to the dash

- Set the API key - open bash in the root and run:

```bash
firebase functions:config:set YOUR_API_NAME_HERE.key="YOUR_API_KEY_HERE"
```

- Add the function in the index
- Deploy the config:

```bash
firebase deploy --only functions
```

- Set up the widget accordingly
- Troubleshooting:

  - Check for errors with a specific function:

  ```bash
  firebase functions:log --only getMoonPhase
  ```

  - Check for errors with the API key values:

  ```bash
   firebase functions:config:get
  ```

### Updating Kindle Quotes

- Connect Kindle device to computer
  - Note: This cannot be done without the device (i.e., solely using the online platform) due to Kindle's strict copyright policy
- Find the 'My Clippings.txt' file and copy it
- Paste the file into the 'Utils' folder
- cd into the Utils folder and run: `python kindle-clipping-converter.py`
- Move the 'KindleQuotes.json' file into the folder 'reactapp/src/Other/Dashboard/Widgets/Data'

## Troubleshooting

- Issues with GitHub Pages deployment can often be traced back to path issues in the `homepage` field of `package.json` or DNS settings for custom domains.
- Check the console in the developer tools of your browser for any 404 errors, which typically indicate missing files or incorrect paths.

## Credits

Michelle Flandin
