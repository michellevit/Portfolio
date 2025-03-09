# Portfolio Website

![React Version](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16.13.0-6da360.svg)
![GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-222.svg)

A portfolio website designed to showcase my projects, developed using React, and previously deployed on Heroku, now hosted on GitHub Pages using a static site approach.

<a href="https://michellef.dev" target="_blank"><img src="https://img.shields.io/badge/Website-michellef.dev-6da360?style=for-the-badge&logo=github"></a>

## Table of Contents
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [How To Update the GitHub Pages App](#how-to-update)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)

## Technologies Used<a name="technologies-used"></a>
  - React
  - Node.js
  - GitHub Pages

## Deployment<a name="deployment"></a>
### Previous Hosting on Heroku
- **NOTE:** This app was previously hosted on Heroku with backend capabilities.
- Heroku provided a dynamic server environment, which supported features like server-side rendering and API routes.

### Current Hosting on GitHub Pages
- The website is now statically hosted using GitHub Pages for more cost-efficient hosting.
- GitHub Pages supports static sites, which prompted the conversion of all dynamic backend functionality to use client-side solutions or third-party services like Formspree for form handling.

## How To Update the GitHub Pages App<a name="how-to-update"></a>
* Note: When you run npm run deploy using the gh-pages package, this script handles deploying the contents of your build directory directly to the gh-pages branch on GitHub. This branch is specifically used for serving your site on GitHub Pages, and the deployment process does not typically require you to manually push changes to this branch. The gh-pages tool automates this for you.

- **Local Changes**:
  1. Navigate to the `reactapp` directory within the project.
  2. Make necessary changes to the codebase.
  3. Run `npm run build` to create an optimized production build.

- **Deploying Changes**:
  1. After building the project, run `npm run deploy` to update the static site on GitHub Pages.
  2. This script pushes the build directory to the `gh-pages` branch, automatically updating the hosted website.

- **Modifying the Deployment Setup**:
  1. To change the GitHub Pages configuration, update the `homepage` in `package.json` to reflect the new repository path or custom domain.
  2. Ensure that the `gh-pages` package is configured correctly in the `reactapp/package.json`.

## Troubleshooting<a name="troubleshooting"></a>
- Issues with GitHub Pages deployment can often be traced back to path issues in the `homepage` field of `package.json` or DNS settings for custom domains.
- Check the console in the developer tools of your browser for any 404 errors, which typically indicate missing files or incorrect paths.

## Credits<a name="credits"></a>
Michelle Flandin
