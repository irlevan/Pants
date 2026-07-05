# Pants

A small browser extension that hides the Shorts shelf and Shorts nav entry on YouTube, so the homepage stops working as a doomscroll feed.

## What it hides

- The Shorts shelf on the YouTube homepage and Subscriptions feed
- The Shorts entry in the left sidebar (expanded and collapsed rail)

Search results and direct `/shorts/...` links are left untouched on purpose — those are intentional lookups, not passive scrolling.

## Install

### Chrome

1. Clone this repo.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this folder.

### Firefox

The manifest works as-is in Firefox, but Firefox only allows loading unpacked extensions temporarily — it unloads them on browser restart.

1. Clone this repo.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…** and select `manifest.json` in this folder.
4. Repeat after each Firefox restart, or run it via [web-ext](https://github.com/mozilla/web-ext) (`web-ext run`) for a faster reload loop during changes.

For a permanent install that survives Firefox restarts, sign it through addons.mozilla.org (AMO) instead of loading it temporarily:

1. Create a Firefox account at [accounts.firefox.com](https://accounts.firefox.com) if you don't already have one.
2. Generate API credentials at [addons.mozilla.org/developers/addon/api/key](https://addons.mozilla.org/developers/addon/api/key/) — an issuer (API key) and secret.
3. `manifest.json` already includes the `browser_specific_settings.gecko.id` AMO requires.
4. Sign it with `web-ext`, using the unlisted channel so it isn't published to the AMO store:
   ```
   web-ext sign --api-key=<issuer> --api-secret=<secret> --channel=unlisted
   ```
5. Automated review runs (usually a few minutes for something this small), then `web-ext` downloads a signed `.xpi` into `web-ext-artifacts/`.
6. Install the signed `.xpi` by dragging it into a Firefox window, or via `File > Open File`. It installs permanently, unlike the temporary `about:debugging` load.

## How it works

YouTube is a single-page app — after the first load, navigation happens client-side and re-renders sections without a full page reload. To handle that:

- [`src/hide.css`](src/hide.css) hides known Shorts containers via CSS, injected at `document_start` so there's no flash of content before it disappears.
- [`src/observer.js`](src/observer.js) watches the page with a `MutationObserver` and re-applies hiding when YouTube renders new content, including on its `yt-navigate-finish` event.
- [`src/selectors.js`](src/selectors.js) is the single list of Shorts selectors both files key off of — the one place expected to need updates if YouTube changes its DOM.

## Scope

This is a personal-use tool, loaded unpacked on one machine. It's not published to the Chrome Web Store and has no options page, allowlist, or settings — just an on/off switch via enabling or disabling the extension.
