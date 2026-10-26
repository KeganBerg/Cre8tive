# Cre8tive Photography

Portfolio website for Cre8tive, a family-run freelance photography business.

It's plain HTML, CSS and JavaScript with no build step, so it can be opened straight from
the folder or hosted for free on GitHub Pages.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Home: opening photo, highlights, about, rates, a review, contact |
| `work.html` | Every portfolio photo, filterable by category, viewable full size |
| `book.html` | Inquiry form, what happens next, common questions |

## Files

| Path | What it is |
| --- | --- |
| `data/portfolio.js` | **The list of portfolio photos.** Edit this to add or remove photos |
| `js/config.js` | **The inbox inquiries go to**, and the optional Formspree link |
| `css/styles.css` | Colors, fonts and layout. Palette lives at the top in `:root` |
| `js/site.js` | Menu and photo viewer, used on every page |
| `js/gallery.js` | Lays out the photo grids from `data/portfolio.js` |
| `js/inquiry.js` | The inquiry form |
| `images/` | Photos. Everything here now is a blurred black-and-white placeholder |

## Adding or removing portfolio photos

1. Put the photo in `images/portfolio/` (JPG, about 2000px on the long side, under 500 KB).
2. Open `data/portfolio.js` and copy one entry. Set:
   - `src`: the file path
   - `category`: `events`, `portraits`, `family` or `milestones`
   - `shape`: `"wide"` for landscape photos, `"tall"` for portrait photos
   - `alt`: a short description for people using screen readers
   - `caption`: the line shown under the photo
   - `featured: true` to also show it on the home page (6 works well)

The grid arranges the photos into full rows by itself, so the order and mix don't matter.

## Getting inquiries

Out of the box, sending the form opens the visitor's email app with their inquiry written
out, addressed to the email in `js/config.js`. To have inquiries land straight in the inbox
instead (recommended, since many people don't have an email app set up):

1. Create a free account at [Formspree](https://formspree.io) and make a new form.
2. Copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in `js/config.js`.

The form only sends the questions for the session type the visitor picked, includes a
hidden spam trap, and asks for a phone number when they'd rather be called or texted.
The rates on the home page link to the form with that session already chosen
(`book.html?type=family`).

## Before going live

Search the `.html` files and `js/config.js` for `TODO` to find everything that still
needs real content:

1. **Photos.** Replace the placeholders in `images/` and update `data/portfolio.js`.
2. **About section.** Swap in the photographer's own story.
3. **Rates.** Replace the sample "from" prices and session details.
4. **Review.** Replace the sample quote with a real client review (with permission).
5. **Contact details.** Update the email (in `js/config.js` too), phone and service area.
6. **Booking page.** Check "What happens next" and every FAQ answer against how the
   business really works.

## Publishing on GitHub Pages

In the repository on GitHub, go to **Settings → Pages**, choose **Deploy from a branch**,
pick `main` and `/ (root)`, and save. The site will appear at
`https://keganberg.github.io/cre8tive/` within a minute or two. A custom domain can be
added on the same page.
