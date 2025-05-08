# 🚀 Local Setup Guide

Follow these steps to install and run the project locally.

## 1️⃣ **Clone the repository**

```bash
git clone https://github.com/jamescasipong/transfer_ownership_gdrive.git
cd your-repo
```

## 2️⃣ **Install dependencies**

```bash
npm install
```

## 3️⃣ **Create a `.env` file**

In the project root, create a `.env` file and add the following:

```
# Google OAuth credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback

# App configuration
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-session-secret-key
```

> ⚠️ **Important**: Replace
> `your-google-client-id`,
> `your-google-client-secret`,
> `your-session-secret-key`
> with **your actual values**.

## 4️⃣ **Run the app**

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000)

## 5️⃣ **Google OAuth Setup (for first-time users)**

If you haven't already set up Google OAuth credentials:

* Go to **[Google Cloud Console](https://console.cloud.google.com/apis/credentials)**
* Create **OAuth 2.0 Client ID**
* Set the **Authorized redirect URI** to:

  ```
  http://localhost:3000/oauth2callback
  ```
## 1️⃣ **End Points**

**Auth Routes:**

* `GET /auth/google`: Initiates the Google OAuth authentication flow.
* `GET /oauth2callback`: Handles the Google OAuth callback after authentication.
* `GET /api/auth/status`: Checks if the user is authenticated.
* `GET /logout`: Logs out the user by clearing the session.

**Drive Routes:**

* `GET /api/files`: Fetches a list of files from Google Drive (requires authentication).
* `GET /api/files/:fileId`: Fetches details of a specific file from Google Drive (requires authentication).
* `POST /api/files/:fileId/transfer-ownership`: Transfers the ownership of a file to a different user (requires authentication).

---

Would you like help with anything else related to the setup or the functionality of these endpoints?

