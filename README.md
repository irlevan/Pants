# Shorts Blocker

A small Chrome extension that hides the Shorts shelf and Shorts nav entry on YouTube, so the homepage stops working as a doomscroll feed.

## What it hides

- The Shorts shelf on the YouTube homepage and Subscriptions feed
- The Shorts entry in the left sidebar (expanded and collapsed rail)

Search results and direct `/shorts/...` links are left untouched on purpose — those are intentional lookups, not passive scrolling.

## Install

1. Clone this repo.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this folder.

## How it works

YouTube is a single-page app — after the first load, navigation happens client-side and re-renders sections without a full page reload. To handle that:

- [`src/hide.css`](src/hide.css) hides known Shorts containers via CSS, injected at `document_start` so there's no flash of content before it disappears.
- [`src/observer.js`](src/observer.js) watches the page with a `MutationObserver` and re-applies hiding when YouTube renders new content, including on its `yt-navigate-finish` event.
- [`src/selectors.js`](src/selectors.js) is the single list of Shorts selectors both files key off of — the one place expected to need updates if YouTube changes its DOM.

## Scope

This is a personal-use tool, loaded unpacked on one machine. It's not published to the Chrome Web Store and has no options page, allowlist, or settings — just an on/off switch via enabling or disabling the extension.
