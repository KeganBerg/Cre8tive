# Cre8tive Photography

Portfolio website for Cre8tive Photography, a one-person photography business.

The look is called "Viewfinder": crop marks around photos, a focus point and camera
settings on the opening photo, and a red marker for the current page. Text, buttons and
form fields are large and plainly labeled so the site is easy to use at any age.

It's plain HTML, CSS and JavaScript with no build step, so it can be opened straight from
the folder or hosted for free on GitHub Pages.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Home: her best photo with her name and town, a few lines about her, a row of photos for each kind of session, a review, prices, contact |
| `work.html` | My work: every photo, grouped into Families, Events, Portraits and Milestones |
| `about.html` | About me: her story, what a session is like, reviews, where she works |
| `book.html` | Check a date: a short inquiry form, her phone number, common questions |

On phones, a "Check a date with me" button stays at the bottom of the screen, and every
photo opens full screen with Back, Next and Close buttons (and swiping).

## Files

| Path | What it is |
| --- | --- |
| `data/portfolio.js` | **The list of portfolio photos.** Edit this to add or remove photos |
| `js/config.js` | **The inbox inquiries go to**, and the optional Formspree link |
| `css/styles.css` | Colors, fonts and layout. Palette lives at the top in `:root` |
| `js/site.js` | Menu and photo viewer, used on every page |
| `js/gallery.js` | Builds the photo rows and sections from `data/portfolio.js` |
| `js/inquiry.js` | The inquiry form |
| `images/` | Photos. Everything here now is a blurred black-and-white placeholder |

## Adding or removing portfolio photos

1. Put the photo in `images/portfolio/` (JPG, about 2000px on the long side, under 500 KB).
2. Open `data/portfolio.js` and copy one entry. Set:
   - `src`: the file path
   - `category`: `family`, `events`, `portraits` or `milestones`
   - `shape`: `"wide"` for landscape photos, `"tall"` for portrait photos
   - `alt`: a short description for people using screen readers
   - `caption`: the line shown under the photo

Home shows the first six photos of each kind, so put her favorites first. On My work, each
kind opens with its first landscape photo shown large, then three, then two.

## Getting inquiries

To have inquiries land straight in her inbox, with a thank-you shown right on the page,
connect a free form service. Until that's done, sending the form opens the visitor's email
app with their note written out instead, which many people don't have set up.

1. Create a free account at [Formspree](https://formspree.io) and make a new form.
2. Copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in `js/config.js`.

The form asks only what she needs to reply: the occasion, when and where, a name, a phone
number or email, and how they'd like to be contacted. It includes a hidden spam trap. Each
price on Home links to the form with that occasion already picked (`book.html?type=family`).

## Before going live

Search the `.html` files for `[` to find every placeholder in brackets, like
`[Her name]` and `[Your town]`. Then search the `.html` files and `js/config.js` for `TODO`
to find everything else that still needs real content:

1. **Photos.** Replace the placeholders in `images/` and update `data/portfolio.js`.
2. **About me.** Her photo with camera in hand, her story in her own words, and two
   behind-the-scenes photos (`images/about.jpg`, `images/bts-1.jpg`, `images/bts-2.jpg`).
3. **Rates.** Replace the sample "from" prices and session details.
4. **Reviews.** Replace the sample quotes with real ones (with permission).
5. **Contact details.** Update the email (in `js/config.js` too), phone and service area.
6. **Questions people ask.** Check every answer on the booking page against how she
   really works.

## Publishing on GitHub Pages

In the repository on GitHub, go to **Settings → Pages**, choose **Deploy from a branch**,
pick `main` and `/ (root)`, and save. The site will appear at
`https://keganberg.github.io/cre8tive/` within a minute or two. A custom domain can be
added on the same page.
