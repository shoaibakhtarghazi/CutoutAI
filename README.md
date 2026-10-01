# CutoutAI React

Professional React/Vite background-removal UI with real browser-side AI background removal.

## Run

```bash
npm install
npm run dev
```

## Background removal

This version uses `@imgly/background-removal`, so no API key or backend endpoint is required for the basic demo. The first removal downloads the model/WASM assets and can take longer; later runs can be faster because assets are cached.

The result is generated as a transparent PNG and the Download button downloads the processed image—not the original.

## Important

The package is licensed under AGPL. Check the license and your intended production/commercial use before deployment.
