// Saves options to browser.storage
function saveOptions() {
  const allowList = document.getElementById('allowList').value;
  const removeReadonly = document.getElementById('removeReadonly').checked;
  const removeDisabled = document.getElementById('removeDisabled').checked;

  browser.storage.sync.set(
    {
      allowList: allowList,
      removeReadonly: removeReadonly,
      removeDisabled: removeDisabled,
    }
  ).then(() => {
    // Update status to let user know options were saved.
    const status = document.getElementById('statusMessage');
    status.textContent = 'Settings saved!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
}

// Restores saved options
function restoreOptions() {
  browser.storage.sync.get(
    {
      allowList: '',
      removeReadonly: true, // Default to true for existing behavior
      removeDisabled: false, // Default to false for new feature
    }
  ).then((items) => {
    document.getElementById('allowList').value = items.allowList;
    document.getElementById('removeReadonly').checked = items.removeReadonly;
    document.getElementById('removeDisabled').checked = items.removeDisabled;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);