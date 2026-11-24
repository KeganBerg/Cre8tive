# Going live: the three accounts

Everything in the code is ready. These steps need someone to sign up for things, so
they're written for a person, not a programmer. Allow about an hour, start to finish.
All of it is free except the web address (about $10 to $12 a year).

| Step | What it gives her | Cost |
| --- | --- | --- |
| 1. Formspree | Inquiries from "Check a date" land in her email | Free (up to 50 a month) |
| 2. Cloudflare Pages | The site is online, and updates itself when the code changes | Free |
| 3. A web address | `yourname.com` instead of a long temporary link | About $10 to $12 a year |

Do them in order. Step 1 needs a code change (one line), so do it first and the site
goes live already working.

---

## 1. Make the inquiry form send to her inbox (Formspree)

1. Go to **formspree.io** and sign up **with the email address she wants inquiries sent to**.
2. Open the email Formspree sends and click the link to confirm the address.
3. In Formspree, click **+ New Form**. Name it "Check a date". Leave the email as hers.
4. Formspree shows the form's link. It looks like `https://formspree.io/f/abcdwxyz`.
   Copy it.
5. On GitHub, open the file `js/config.js` and click the pencil icon to edit it.
   Replace `https://formspree.io/f/YOUR_FORM_ID` with the link you copied. Keep the
   quote marks. While you're there, put her real email and phone number on the two
   lines above it.
6. Click **Commit changes**.

That's it. Once the site is online (step 2), send a test inquiry from the "Check a date"
page. The very first one may ask her to confirm in her email. After that, each
inquiry arrives as an email titled like "New inquiry: Family session from Pat Lee".
If the visitor gave an email address, she can just press **Reply**.

Good to know:
- The free plan covers 50 inquiries a month. If she ever needs more, Formspree's paid
  plan is about $10 a month.
- Formspree filters spam, and the form also has a hidden trap that catches most bots.
- Optional, once she has her web address: in the form's **Settings**, add it under
  **Restrict to domain** so nobody else can use the form link.
- Until the link is filled in, the form still works the old way: it opens the
  visitor's own email app with their note written out.

---

## 2. Put the site online (Cloudflare Pages)

The site needs no "build" step, so this is mostly clicking through.

**Before you start:** the finished site has to be on the `main` branch on GitHub
(merge the open pull requests first). Cloudflare publishes whatever is on `main`.

1. Go to **dash.cloudflare.com** and sign up (free plan).
2. In the left menu, click **Workers & Pages**, then **Create**, then choose the
   **Pages** tab and **Connect to Git** (it may say "Import an existing Git repository").
3. Sign in to GitHub when asked, and give Cloudflare access to the **cre8tive** repository.
4. Pick **cre8tive** and click **Begin setup**.
5. On the settings screen:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** leave empty (if it insists on something, type `exit 0`)
   - **Build output directory:** `/`
6. Click **Save and Deploy**. After a minute it shows a link like
   `https://cre8tive.pages.dev`. That's the live site.

From now on, any change saved to `main` on GitHub appears on the site within a minute or
two. Changes on other branches get their own preview link, so she can see them before
they go live.

---

## 3. Get a web address (domain)

Buying it through Cloudflare keeps everything in one account and costs the same as the
registry charges, with no markup.

1. In Cloudflare, click **Domain Registration**, then **Register Domains**.
2. Search for a name. Ideas: her name plus "photography", or the business name with her
   town. A `.com` is easiest for people to remember.
3. Buy it. Cloudflare asks for contact details; these are kept private.
4. Go back to **Workers & Pages**, open the **cre8tive** project, then **Custom domains**
   and **Set up a custom domain**. Type the new address (for example
   `cre8tivephoto.com`) and confirm. Do the same for the `www.` version too.
5. Wait 5 to 30 minutes. The address will start showing the site, with the padlock
   (https) set up automatically.

Afterwards:
- Put the new address in Formspree's **Restrict to domain** setting (step 1).
- Turn on **auto-renew** for the domain in Cloudflare so it never lapses.

---

## Already have a domain somewhere else?

That's fine. In step 3, skip buying, and go straight to **Custom domains** in the
Cloudflare project. It walks through pointing the existing domain at the site, which
usually means changing one or two settings where the domain was bought.

## Rather not use Cloudflare?

The site is plain files, so it also works on **GitHub Pages** with no extra account: in
the repository on GitHub, go to **Settings → Pages**, choose **Deploy from a branch**,
pick `main` and `/ (root)`, and save. It appears at `https://keganberg.github.io/cre8tive/`.
A domain bought anywhere can be connected on the same page.
