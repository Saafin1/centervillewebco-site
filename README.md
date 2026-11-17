# Centerville Web Co. — website

The public website for Centerville Web Co.: https://centervillewebco.netlify.app

A plain static site (HTML, CSS and a small JavaScript file). There is no framework and no build step, so the files in this repository are exactly what visitors download.

## Project structure

```
.
├── index.html              Page content and structure
├── css/
│   └── styles.css          All styles, ordered: tokens → base → layout → components → sections → responsive
├── js/
│   └── contact-form.js     Sends the "free sample" form to Netlify Forms and shows the confirmation
├── assets/
│   └── favicon.svg         Browser tab icon
├── netlify.toml            Hosting settings (publish folder, security and cache headers)
├── .github/workflows/
│   └── checks.yml          Runs the code checks on every pull request
├── .htmlvalidate.json      HTML rules
├── .stylelintrc.json       CSS rules
└── package.json            Check scripts and their tools (not needed by the live site)
```

### Conventions

- **No inline styles or scripts.** Styling lives in `css/styles.css`, behavior in `js/`. The HTML check enforces this.
- **Class names use BEM** (`block__element--modifier`, e.g. `price-row__amount`, `btn--light`).
- **Colors, fonts and sizes come from the CSS variables** at the top of `styles.css`. Change a color there, not in individual rules.
- **Contact details appear in three places:** the contact section and footer in `index.html`, and `CONTACT_EMAIL` in `js/contact-form.js`. Update all three together.

## How changes are made

The live site updates automatically from the `main` branch. Nobody edits `main` directly.

1. A change is made on a new branch and opened as a **pull request**.
2. **GitHub Actions** runs the code checks. They must pass (green check).
3. **Netlify** posts a **Deploy Preview** link on the pull request: a full copy of the site with the change.
4. Review the preview on a phone and a computer.
5. If it looks right, click **Merge pull request**. Netlify publishes it to the live site in about a minute.

To undo a change: open the merged pull request on GitHub and click **Revert**, then merge the revert.

## Running the checks locally

Requires Node.js 20 or newer.

```bash
npm install
npm run check
```

To preview locally, open `index.html` in a browser. (The contact form only sends from a Netlify-hosted copy.)

## Contact form (Netlify Forms)

The form in `index.html` has `data-netlify="true"`, so Netlify collects submissions. One-time setup in the Netlify dashboard:

1. **Forms → Enable form detection**, then redeploy.
2. **Forms → Form notifications → Add notification → Email** to centervillewebco@gmail.com.

A hidden "bot-field" input acts as a spam trap. Real visitors never see it.
