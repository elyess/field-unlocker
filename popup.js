document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const toggleText = document.getElementById('toggleText');
  const settingsButton = document.getElementById('settingsButton');
  const iconEnable = toggleButton.querySelector('.icon-enable');
  const iconDisable = toggleButton.querySelector('.icon-disable');

  // Load the current enabled state
  browser.storage.sync.get('isEnabled').then(({ isEnabled }) => {
    updateButtonState(isEnabled);
  });

  // Toggle the enabled state
  toggleButton.addEventListener('click', () => {
    browser.storage.sync.get('isEnabled').then(({ isEnabled }) => {
      const newState = !isEnabled;
      browser.storage.sync.set({ isEnabled: newState }).then(() => {
        updateButtonState(newState);
      });
    });
  });

  // Open the settings page
  settingsButton.addEventListener('click', () => {
    browser.runtime.openOptionsPage();
    window.close(); // Close the popup
  });

  // Helper function to update button text and icon
  function updateButtonState(isEnabled) {
    if (isEnabled) {
      toggleText.textContent = 'Disable Extension';
      iconEnable.style.display = 'none';
      iconDisable.style.display = 'block';
    } else {
      toggleText.textContent = 'Enable Extension';
      iconEnable.style.display = 'block';
      iconDisable.style.display = 'none';
    }
  }
});