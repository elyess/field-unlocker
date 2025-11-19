try {
  importScripts('browser-polyfill.js');
} catch (e) {
  console.log('importScripts failed (likely not a Service Worker or already loaded):', e);
}

// Set default values on extension installation
browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    isEnabled: true,
    allowList: '*', // Default to all domains
    removeReadonly: true, // Default to true
    removeDisabled: false // Default to false
  }).then(() => {
    console.log('Default settings saved. Allow list set to all domains (*).');
  });
});

// Listen for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab is fully loaded and has a valid URL
  if (changeInfo.status === 'complete' && tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
    runScriptOnTab(tabId, tab.url);
  }
});

function runScriptOnTab(tabId, tabUrl) {
  // Get the current settings
  browser.storage.sync.get(['isEnabled', 'allowList']).then(({ isEnabled, allowList }) => {
    if (!isEnabled) {
      return; // Extension is globally disabled
    }

    // Parse the allow list
    const domains = allowList.split('\n').map(d => d.trim()).filter(Boolean);
    if (domains.length === 0) {
      return; // Allow list is empty (and not '*')
    }

    const currentHostname = new URL(tabUrl).hostname;

    // Check if the current site is in the allow list
    const isMatch = domains.some(domain => {
      if (domain === '*') {
        return true; // Wildcard matches all
      }
      // Check if current hostname is the domain or a subdomain
      return currentHostname === domain || currentHostname.endsWith('.' + domain);
    });

    if (isMatch) {
      // If it matches, inject the content script
      // We must inject browser-polyfill.js first!
      browser.scripting.executeScript({
        target: { tabId: tabId },
        files: ['browser-polyfill.js', 'content.js']
      }).catch(err => console.error('Failed to inject script: ', err));
    }
  });
}