Got it — you want **clear, clean setup instructions** so that someone else can install and run your app locally (with the required `.env` config).
Here’s a **ready-to-use** guide you can copy-paste into your `README.md` or project docs:

---

# 🚀 Local Setup Guide

Follow these steps to install and run the project locally.

## 1️⃣ **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git
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

---

That’s it — you're ready! 🚀

---

Would you like me to also write a **`.env.example`** file for the repo? (Highly recommended for clarity)
