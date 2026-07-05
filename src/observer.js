function hideShorts() {
  for (const selector of SHORTS_SELECTORS) {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
  }
}

function startObserver() {
  hideShorts();
  new MutationObserver(hideShorts).observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.body) {
  startObserver();
} else {
  document.addEventListener('DOMContentLoaded', startObserver);
}

document.addEventListener('yt-navigate-finish', hideShorts);
