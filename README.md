# Personal Website

An English-first personal website built with Astro. It is designed for a minimalist homepage, structured resume data, project writing, and blog notes.

## Development

This workspace uses a portable Node.js runtime at `d:\coding\tools\node-v22.22.3-win-x64`.

```bat
cd /d "d:\coding\Code\personal website"
dev.cmd
```

Astro will print the local URL to open. If another dev server is already running, Astro may choose the next port, such as `http://localhost:4322/` instead of `http://localhost:4321/`.

You can also run npm directly in a new VS Code terminal because the workspace terminal PATH includes the portable Node.js runtime:

```bash
npm install
npm run dev
```

Do not open the root `index.html` file directly to preview the Astro site. The actual pages are generated from `src/pages/` and served by Astro.

## Build

```bat
build.cmd
```

or:

```bash
npm run build
npm run preview
```

## Editing content

- Site-wide information lives in `src/data/site.json`.
- Resume/profile information lives in `src/data/resume.json`.
- Blog notes are Markdown files in `src/content/posts/`.
- Projects are Markdown files in `src/content/projects/`.

When a resume PDF is available, extract its content into `src/data/resume.json` so the resume page can update without changing page markup.

## PDF resume parsing

The project includes `pdf-parse` for local PDF text extraction. After placing a resume PDF in the project folder, you can inspect it with:

```bash
npx pdf-parse info resume.pdf
npx pdf-parse text resume.pdf --output resume.txt
```

The extracted text can then be mapped into `src/data/resume.json`.
