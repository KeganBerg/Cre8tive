# Cre8tive Photography

Portfolio website for Cre8tive, a family-run freelance photography business.

It's a plain HTML, CSS and JavaScript site with no build step, so it can be opened
straight from the folder or hosted for free on GitHub Pages.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All the page content (text, prices, contact details) |
| `css/styles.css` | Colors, fonts and layout. Palette lives at the top in `:root` |
| `js/main.js` | Mobile menu, portfolio filter, photo viewer, contact form |
| `images/` | Photos. Everything here now is a gray placeholder |

## Before going live

Search `index.html` for `TODO` to find everything that still needs real content:

1. **Photos.** Replace the placeholders in `images/` and `images/portfolio/` with real
   photos (JPG, about 2000px on the long side, under 500 KB each). If you change a file
   name or extension, update the matching `src="..."` in `index.html`. Give every photo a
   short `alt` description.
2. **About section.** Swap in the photographer's own story.
3. **Pricing.** Replace the sample "Starting at" prices and package details.
4. **Reviews.** Replace the sample quotes with real client reviews (with permission).
5. **Contact details.** Update the email, phone and service area. The email also appears
   in `data-email="..."` on the contact form.

### Adding a portfolio photo

Copy one `<li class="gallery-item" ...>` block in the Portfolio section, set
`data-category` to `events`, `portraits`, `family` or `milestones`, and point the `img`
at the new file.

### Contact form

With no server, the form opens the visitor's email app with their message filled in. To
receive messages directly instead, create a free form at [Formspree](https://formspree.io),
then give the `<form>` `action="https://formspree.io/f/YOUR_ID" method="POST"` and remove
the contact form block at the bottom of `js/main.js`.

## Publishing on GitHub Pages

In the repository on GitHub, go to **Settings → Pages**, choose **Deploy from a branch**,
pick `main` and `/ (root)`, and save. The site will appear at
`https://keganberg.github.io/cre8tive/` within a minute or two. A custom domain can be
added on the same page.
