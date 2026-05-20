# Portfolio: IT & Cybersecurity 

Personal portfolio website built with React MUI. 

---

> [!NOTE]
>
> 🌐 Live Site: [https://bluefinx.github.io](https://bluefinx.github.io)
>
> ---

## Built With

- ⚛️ React
- ⚡ Vite
- 🎨 Material UI (MUI)
- 🟢 Node.js
- 📦 npm
- 🚀 GitHub Pages

## Repository Structure

This repository uses a two-branch workflow:

- `source` branch contains the React/Vite source code
- `main` branch is used for GitHub Pages deployment

The production build is automatically generated and deployed via GitHub Actions in `.github/workflows/deploy.yml`.

## Development & Build

To install the dependencies, run `npm install`.

To start the development server, run `npm run dev`.

To create the production build, run `npm run build`.

To deploy to GitHub Pages, commit and push.

To create the `licenses.txt` file, run

```bash
npx license-checker --production --json \
| jq 'to_entries
  | map(select(.value.licenses != "UNLICENSED"))
  | map(
      .key as $pkg |
      {
        name: ($pkg | sub("@[^@]+$"; "")),
        version: ($pkg | capture("@(?<v>[^@]+)$").v),
        license: .value.licenses,
        repository: .value.repository
      }
    )' > licenses.txt
```

## Security

This repository uses Dependabot to automatically check for security and version updates.
