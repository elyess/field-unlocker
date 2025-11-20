# Field Unlocker

Field Unlocker is a simple Chrome extension that removes `readonly` and `disabled` attributes from form fields on sites you choose, so you can edit inputs that are normally locked.

## Features
- Toggle the extension on or off from the toolbar popup.
- Automatically removes `readonly` and (optionally) `disabled` attributes from inputs, textareas, buttons, and selects.
- Restrict where it runs using an allow list of domains (supports `*` wildcard).
- Highlights unlocked fields with a subtle border and background.

## Installation (Developer Mode)
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select this project folder.

## Usage
- Click the Field Unlocker icon in the toolbar to:
  - Enable or disable the extension globally.
  - Open the **Settings** page.
- On pages that match your allow list, the extension will automatically unlock matching fields as the page loads and as new elements are added.

## Settings
Open the options page (right-click the extension icon → **Options**, or via the popup **Settings** button) and configure:

- **Remove "readonly" attribute**: When enabled (default), readonly inputs/areas are made editable.
- **Remove "disabled" attribute**: When enabled, disabled inputs, textareas, buttons, and selects are re-enabled.
- **Allow List**: Domains where the extension should run, one per line.  
  Examples:
  - `*` (all domains)
  - `google.com`
  - `example.com`

## Permissions
- `storage` – save your settings (allow list and options).
- `scripting` – inject the content script into allowed pages.
- `http://*/*`, `https://*/*` – allow the extension to run on sites you choose via the allow list.

## License

Licensed under the BSD license.

