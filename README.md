# Ariel Nazareno Portfolio

Personal portfolio for Ariel Nazareno, an ERP / SAP Technical Support Specialist. The visual direction is **Built From Systems**: the hero portrait is rendered as a canvas made from SAP, ERP, automation, support, and data vocabulary.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Assets

Add the supplied portrait at `public/myID.jpg` and the verified resume at `public/resume.pdf`. The canvas portrait analyzes the image luminance and uses it as the source for the typographic silhouette. Until the photo is present, the component remains a lightweight fallback surface.

## Update content

Portfolio content lives in `src/data/portfolio.ts`. Keep professional details verified and use `[ADD ...]` or `[VERIFY]` for information that still needs confirmation. The main page is assembled from reusable components in `src/components/`.

## Stack

Next.js · TypeScript · React · Tailwind CSS · Framer Motion · Lucide React · HTML Canvas

## Production

```bash
npm run build
npm run start
```

The app is ready for a standard Vercel deployment.
