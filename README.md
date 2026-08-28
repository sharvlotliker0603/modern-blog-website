# Inkly — Modern Blog Website

A simple responsive blogging website built with:

- HTML
- Tailwind CSS via CDN
- Vanilla JavaScript
- Google Sheets
- Google Apps Script

## 1. Create your Google Sheet

Create a Google Sheet, for example:

`Inkly Blog Submissions`

You do not need to manually create the columns. The Apps Script will create a sheet named `Blog Posts` and add:

`Timestamp | Name | Email | Title | Category | Content`

## 2. Add the Apps Script

Open your Google Sheet.

Go to:

Extensions → Apps Script

Delete the default code and paste everything from:

`google-apps-script.gs`

Save the project.

Run `setupSheet()` once from the Apps Script editor.

Google will ask for authorization. Allow the permissions.

## 3. Deploy the Apps Script as a Web App

In Apps Script:

Deploy → New deployment

Select:

Type → Web app

Set:

Execute as → Me

Who has access → Anyone

Click Deploy.

Copy the Web app URL. It will look similar to:

https://script.google.com/macros/s/XXXXXXXX/exec

## 4. Connect the website

Open:

`api-submit-form.js`

Replace:

PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE

with your actual Web App URL.

Example:

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";

Save the file.

## 5. Test locally

Open `index.html` in your browser, fill the form and click Submit Post.

Then open your Google Sheet and check the `Blog Posts` sheet.

## 6. Deploy on Vercel

Push these files to GitHub:

- index.html
- api-submit-form.js
- google-apps-script.gs
- README.md

Then import the GitHub repository into Vercel.

No Node.js or build command is required for this simple static website.

### Important

Keep the Apps Script URL in `api-submit-form.js` exactly as the deployed `/exec` URL.

The form uses `POST` + `URLSearchParams` + `no-cors` because Google Apps Script Web Apps do not behave like a normal JSON API for browser CORS requests.

For production use, add spam protection/rate limiting and stronger server-side validation.
