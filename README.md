# Sharon Hurvitz — Website

Personal site for **sharonhurvitzmusic.com** — mastering engineer & composer.

## Files

```
index.html   — full page structure and content
style.css    — all styles, typography, responsive layout
main.js      — scroll reveal animations, mobile nav, form handling
README.md    — this file
```

---

## Deploying to GitHub Pages (step by step)

### 1. Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### 2. Create a new repository
- Click the **+** icon (top right) → **New repository**
- Name it exactly: `sharonhurvitzmusic.com` *(or your GitHub username if you want a free `username.github.io` URL)*
- Set it to **Public**
- Click **Create repository**

### 3. Upload your files
- On the new repo page, click **uploading an existing file**
- Drag all four files (`index.html`, `style.css`, `main.js`, `README.md`) into the window
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to **Settings** → **Pages** (left sidebar)
- Under **Source**, select **Deploy from a branch**
- Set branch to `main`, folder to `/ (root)`
- Click **Save**
- Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME` within ~2 minutes

### 5. Connect your custom domain (sharonhurvitzmusic.com)
- In **Settings → Pages**, type `sharonhurvitzmusic.com` under **Custom domain** and click Save
- Go to your domain registrar (wherever you bought sharonhurvitzmusic.com — Squarespace, GoDaddy, Namecheap, etc.)
- Add these DNS records:

  **A records** (point the root domain to GitHub):
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

  **CNAME record** (for www):
  ```
  www  →  YOUR-USERNAME.github.io
  ```

- DNS can take up to 48 hours to propagate. GitHub will automatically provision HTTPS once it's live.

---

## Setting up the contact form

GitHub Pages is static — it can't process form submissions. Use one of these free options:

### Option A: Formspree (recommended, 5 minutes)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your endpoint URL (looks like `https://formspree.io/f/xabcdefg`)
3. In `index.html`, find the `<form>` tag and update the `action` attribute:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `data-netlify="true"` and `action="/thanks"` attributes
5. That's it — submissions will go to your email

### Option B: Netlify (deploy there instead of GitHub Pages)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag your site folder into their deploy box
3. The `data-netlify="true"` on the form handles everything automatically
4. Custom domain setup is similar to GitHub Pages

---

## Things to update before going live

- [ ] Replace the Spotify link (`href="#"` in the artist section) with your actual profile URL
- [ ] Add a real photo of yourself (replace the album art placeholder if desired)
- [ ] Fill in any missing credits as you accumulate them
- [ ] Set up the contact form (Formspree or Netlify — see above)
- [ ] Add your Discogs/SoundBetter/social links to the footer if you want them

---

## Fonts used
- **Cormorant Garamond** (display / headings) — loaded from Google Fonts
- **DM Sans** (body text) — loaded from Google Fonts

Both load from the CDN automatically — no installation needed.
