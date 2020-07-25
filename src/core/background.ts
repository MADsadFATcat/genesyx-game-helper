import axios from 'axios';
import _ from 'lodash';
import Settings from './settings';
import config from './config';

function createSettingsIfNotExist(): void {
  chrome.storage.sync.get('settings', (so: any) => {
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

chrome.runtime.onMessage.addListener((request: any) => {
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

chrome.alarms.create('check-notifications', {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm: any) => {
  if (alarm.name !== 'check-notifications') {
    return;
  }

  axios
    .get(`${config.helperUrl}/api/notifications/get`)
    .then((r: any) => {
      if (!r.data) {
        return;
      }

      chrome.storage.sync.get('settings', (so: any) => {
        if (!so || !so.settings) {
          return;
        }

        const settings = so.settings as Settings;
        const fired = localStorage.getItem('genesyx-helper-notifications');
        const firedNotifications = fired ? fired.split(',') : [];

        _.each(r.data, (n: any) => {

          if (firedNotifications.indexOf(n.id) !== -1) {
            return;
          }

          if ((n.type === 2 || n.type === 3 || n.type === 4)) {
            if (settings.sounds.rats.enabled && settings.sounds.rats.popup) {
              chrome.notifications.create('notification' + n._id,
                {
                  type: 'basic',
                  title: n.title,
                  message: n.text,
                  iconUrl: chrome.runtime.getURL('/img/rats.png'),
                },
                () => {
                  console.log('notification success');
                });
            }

            if (settings.sounds.rats.enabled) {
              const audio = document.createElement('audio');
              audio.src = settings.sounds.rats.useUrl ? settings.sounds.rats.url : settings.sounds.rats.defUrl;
              audio.volume = settings.sounds.rats.volume / 100;
              audio.autoplay = true;
              audio.load();
            }
          } else {
            chrome.notifications.create('notification' + n._id,
              {
                type: 'basic',
                title: n.title,
                message: n.text,
                iconUrl: chrome.runtime.getURL('/img/icon128.png'),
              },
              () => {
                console.log('notification success');
              });
          }

          firedNotifications.push(n.id);
        });

        localStorage.setItem('genesyx-helper-notifications', firedNotifications.join(','));
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
});
