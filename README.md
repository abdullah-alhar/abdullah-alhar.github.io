# abdullah-alhar.github.io

My portfolio site: https://abdullah-alhar.github.io/

Plain HTML, CSS and JavaScript, hosted on GitHub Pages. No build step.

## Files

```
index.html          the whole site
404.html            page shown for broken links
robots.txt          search engine rules (keeps certificate scans out of image search)
sitemap.xml         page list for Google
site.webmanifest    name, colours and icon for phones
favicon.png         tab and home screen icon (192x192)
email-templates/    copies of the two EmailJS templates (the live ones are in the EmailJS dashboard)
assets/
  css/style.css     all styles, in sections: variables, base, layout, components,
                    responsive (keep the responsive section last)
  js/app.js         all scripts, in sections: main (shared settings, keep first),
                    navigation, projects, certificates, effects, contact
  docs/             CV (the Resume button)
  certificates/     certificate scans
  *.jpg, logo.png   project screenshots, profile photo, logo
```

The images stay directly in `assets/` because their URLs are used outside the site:
`logo.png` in the EmailJS auto-reply email, and `profile.jpg` as the link preview on LinkedIn and Google.
Moving them would break those.

## Updating

- **Add a project:** copy one `<article class="project-card">` in `index.html` and change it.
  Projects are written in the HTML (not loaded by JavaScript) so search engines can read them.
- **Add a certificate:** copy one `cert-card` in `index.html` and put the scan in `assets/certificates/`.
- **New CV:** replace `assets/docs/Abdullah_Alhar_CV.pdf` with the same file name.
- **After changing `style.css` or `app.js`:** bump its `?v=` number in `index.html` so visitors don't get the old cached copy.
