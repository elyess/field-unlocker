// Helper function to apply visual style
function applyUnlockStyle(el) {
  // Check if style is already applied to avoid redundant changes
  if (el.dataset.fieldUnlockerApplied) return;
  el.style.border = '2px solid #007aff';
  el.style.backgroundColor = 'rgba(0, 122, 255, 0.05)';
  el.dataset.fieldUnlockerApplied = 'true'; // Mark as processed
}

// Function to process a single node and its descendants
function processNode(node, settings) {
  if (node.nodeType !== Node.ELEMENT_NODE) return; // Only process elements

  // 1. Process 'readonly'
  if (settings.removeReadonly) {
    const readonlySelector = 'input[readonly], textarea[readonly]';
    // Check the node itself
    if (node.matches(readonlySelector)) {
      node.removeAttribute('readonly');
      applyUnlockStyle(node);
    }
    // Check descendants
    node.querySelectorAll(readonlySelector).forEach(el => {
      el.removeAttribute('readonly');
      applyUnlockStyle(el);
    });
  }

  // 2. Process 'disabled'
  if (settings.removeDisabled) {
    const disabledSelector = 'input[disabled], textarea[disabled], button[disabled], select[disabled]';
    // Check the node itself
    if (node.matches(disabledSelector)) {
      node.removeAttribute('disabled');
      applyUnlockStyle(node);
    }
    // Check descendants
    node.querySelectorAll(disabledSelector).forEach(el => {
      el.removeAttribute('disabled');
      applyUnlockStyle(el);
    });
  }
}

// Get settings first, then run the script
chrome.storage.sync.get(
  {
    removeReadonly: true, // Default to true
    removeDisabled: false, // Default to false
  },
  (settings) => {
    // Run on the entire document body as soon as settings are loaded
    processNode(document.body, settings);

    // Set up a MutationObserver to watch for new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Process all nodes that were added
          mutation.addedNodes.forEach(node => processNode(node, settings));
        }
      });
    });

    // Start observing the body for child and subtree changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
);