import Settings from './settings';

function createSettingsIfNotExist(): void {
  chrome.storage.sync.get('settings', (so) => {
    if (so && so.settings) {
      return;
    }

    chrome.storage.sync.set({settings: new Settings()}, () => {
      console.log('settings created');
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear(() => {
    console.log('storage local cleared');
    createSettingsIfNotExist();
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.popup && request.title) {
    chrome.notifications.create('notification' + new Date(), {
      type: 'basic',
      title: request.title,
      message: '',
      iconUrl: chrome.runtime.getURL('/img/icon128.png'),
    }, () => {
      console.log('notification success');
    });
  }
});
