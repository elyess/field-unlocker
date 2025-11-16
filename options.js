// Saves options to chrome.storage
function saveOptions() {
  const allowList = document.getElementById('allowList').value;
  const removeReadonly = document.getElementById('removeReadonly').checked;
  const removeDisabled = document.getElementById('removeDisabled').checked;

  chrome.storage.sync.set(
    {
      allowList: allowList,
      removeReadonly: removeReadonly,
      removeDisabled: removeDisabled,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('statusMessage');
      status.textContent = 'Settings saved!';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    }
  );
}

// Restores saved options
function restoreOptions() {
  chrome.storage.sync.get(
    {
      allowList: '',
      removeReadonly: true, // Default to true for existing behavior
      removeDisabled: false, // Default to false for new feature
    },
    (items) => {
      document.getElementById('allowList').value = items.allowList;
      document.getElementById('removeReadonly').checked = items.removeReadonly;
      document.getElementById('removeDisabled').checked = items.removeDisabled;
    }
  );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);