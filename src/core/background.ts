import Settings from './settings';
import config from './config';

function createSettingsIfNotExist(cb: any): void {
  chrome.storage.sync.get('settings', (so) => {
    if (so && so.settings) {
      return;
    }

    chrome.storage.sync.set({settings: new Settings()}, () => {
      console.log('settings created');
      cb();
    });
  });
}

function reloadTabsWithGame() {
  chrome.tabs.query({url: config.gameUrls}, (tabs: any) => {
    if (!tabs) {
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      chrome.tabs.reload(tabs[i].id, () => {
        console.log('game tab reloaded');
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear(() => {
    console.log('storage local cleared');
    createSettingsIfNotExist(() => {
      reloadTabsWithGame();
    });
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
