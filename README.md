# Sharon Hurvitz — Website v2

Personal site for **sharonhurvitzmusic.com** — mastering engineer & composer.

## File structure

```
index.html        — all five pages (Home, Discography, Bio, Composition, Contact)
style.css         — all styles, typography, responsive layout
main.js           — page routing, album grid, modals, animations, form handling
images/
  maro.jpg        — So Much Has Changed (Maro)
  distopia.jpg    — Dis-topia Original Cast Recording (Robby Good)
  taiko.jpg       — The Legend of Taiko (Rhymoi Music)
  phoenix.jpg     — Transcendent Phoenix (Lucina Yue)
  newleaf.png     — Clangen Vol. 1: Newleaf (Sharon Hurvitz)
README.md         — this file
```

---

## Deploying to GitHub Pages

### 1. Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have one.

### 2. Create a new repository
- Click **+** (top right) → **New repository**
- Name it: `sharonhurvitzmusic.com`
- Set it to **Public**
- Click **Create repository**

### 3. Upload your files
- On the new repo page, click **uploading an existing file**
- Drag in everything: `index.html`, `style.css`, `main.js`, `README.md`, and the entire `images/` folder
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to **Settings** → **Pages**
- Under **Source**, choose **Deploy from a branch**
- Set branch to `main`, folder to `/ (root)`
- Click **Save**
- Your site will be live at `https://YOUR-USERNAME.github.io/sharonhurvitzmusic.com` within ~2 minutes

### 5. Connect your custom domain
In **Settings → Pages**, enter `sharonhurvitzmusic.com` under **Custom domain** and click Save.

Then go to your domain registrar (GoDaddy, Namecheap, Squarespace Domains, etc.) and add:

**A records** (4 of them, pointing the root domain to GitHub):
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

DNS propagation can take up to 48 hours. GitHub will provision HTTPS automatically once it resolves.

---

## Setting up the contact form

GitHub Pages is static — it can't process form submissions on its own. Use **Formspree** (free):

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form**, give it a name, and copy your endpoint URL  
   (looks like: `https://formspree.io/f/xabcdefg`)
3. Open `index.html` and find the `<form>` tag in the Contact section.  
   Replace the placeholder action:
   ```html
   <!-- Change this: -->
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">

   <!-- To this (with your real ID): -->
   <form class="contact-form" action="https://formspree.io/f/xabcdefg" method="POST">
   ```
4. That's it. Submissions will arrive in your email inbox.

---

## Adding your Reelcrafter audio player

When you have your Reelcrafter embed link ready:

1. Open `index.html`
2. Find this block in the Composition section:
   ```html
   <!-- REELCRAFTER EMBED — paste your embed code below when ready -->
   <div class="player-placeholder" id="reelcrafter-player">
     <p>▶ Audio player coming soon</p>
   </div>
   ```
3. Replace the entire `<div class="player-placeholder">...</div>` with your Reelcrafter embed code.  
   It will typically look something like:
   ```html
   <iframe src="https://reelcrafter.com/embed/YOUR_PLAYLIST_ID"
           width="100%" height="120" frameborder="0" allow="autoplay"></iframe>
   ```

---

## Things to update before going live

- [ ] Set your real email address in the Contact section of `index.html`  
      (currently set to `sharon@sharonhurvitzmusic.com`)
- [ ] Add your Formspree endpoint to the `<form>` action (see above)
- [ ] Add your Reelcrafter embed when ready (see above)
- [ ] Update Spotify / streaming links on the Composition page  
      (currently `href="#"` placeholders)
- [ ] Fill in any new mastering credits by adding entries to the `ALBUMS` array in `main.js`
- [ ] Add your photo somewhere — the Bio page is the natural place

---

## Adding new mastering credits

Open `main.js` and add a new object to the `ALBUMS` array at the top:

```javascript
{
  id: 'unique-id',           // no spaces, used internally
  title: 'Album Title',
  subtitle: 'Optional subtitle or foreign-language title',
  artist: 'Artist Name',
  role: 'Mastering engineer',
  year: '2026',
  img: 'images/your-image.jpg',  // add the file to the images/ folder
  featured: false,
  desc: 'A sentence or two about the album and your involvement.',
  meta: [
    ['Format', 'Album'],
    ['Genre',  'Indie pop'],
    ['Label',  'Label name'],
    ['Year',   '2026'],
  ],
},
```

Then add the corresponding image file to the `images/` folder.

---

## Fonts used

- **Cormorant Garamond** — display / headings (loaded from Google Fonts, no install needed)
- **DM Sans** — body text (loaded from Google Fonts, no install needed)
