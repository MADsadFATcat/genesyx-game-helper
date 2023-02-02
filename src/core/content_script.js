import moment from 'moment';
import timersTemplate from './timers.html';

const currentUrl = document.location.href;

function injectScript(func, context) {
  const inject = document.createElement('script');
  inject.setAttribute('type', 'application/javascript');
  inject.textContent = `(${func})(${context ? JSON.stringify(context) : ''});`;
  // noinspection JSCheckFunctionSignatures
  document.body.appendChild(inject);
  // noinspection JSCheckFunctionSignatures
  document.body.removeChild(inject);
}

window.addEventListener('message', function (event) {
  if (event.source !== window)
    return;

  if (event.data.type === 'genesyx-game-helper-popup') {
    chrome.runtime.sendMessage({popup: event.data.popup, title: event.data.title}, () => {
    });
  }
});

chrome.storage.sync.get('settings', (data) => {
  if (!data || !data.settings) {
    return;
  }

  const settings = data.settings;

  //инжектим на страницах игры нужные функции
  injectScript(() => {
    window.gameHelperPlaySound = function (src, vol) {
      const audio = document.createElement('audio');
      audio.src = src;
      audio.volume = vol;
      audio.autoplay = true;
      audio.load();
    };

    window.gameHelperShowPopup = function (popup, title) {
      window.postMessage({type: 'genesyx-game-helper-popup', popup, title}, '*');
    };
  });

  //хосты клансайту раз в сутки
  if (document.location.href.indexOf('/genesyx') !== -1) {
    const date = localStorage.getItem('genesyx-helper-counters-date');
    const today = moment.utc().add(3, 'h').format('YYYY-MM-DD');
    if (!date || date !== today) {
      localStorage.setItem('genesyx-helper-counters-date', today);
      const counters = document.createElement('iframe');
      counters.style.position = 'absolute';
      counters.style.display = 'none';
      counters.src = 'https://greenpeace-genesyx.ru/';
      document.body.appendChild(counters);
    }
  }

  //открывать ссылки в новой вкладке а не окне
  if (settings.targetBlank) {
    injectScript(() => {
      try {
        window.makeFrame = function (a, src) {
          window.open(src, '_blank');
          return false;
        };
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    });
  }

  //скрывать картинки в центре
  if (!settings.hideBigImg && currentUrl.indexOf('MainForm.aspx') !== -1) {
    injectScript(() => {
      try {
        const frame = document.querySelector('form[action*="MainForm.aspx"] div#divBody > table.frame');
        if (frame)
          frame.style.display = 'table';
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    });
  }

  //запоминать размер чата
  if (settings.saveChatSize && currentUrl.indexOf('Chat.aspx') !== -1) {
    injectScript(() => {
      try {
        window.changeFrameSizeOriginal = window.changeFrameSize;

        window.changeFrameSize = function (d) {
          window.changeFrameSizeOriginal(d);
          localStorage.setItem('genesyx-game-helper-chat-size', $('#third', parent.document).height() + ';' + $('#second', parent.document).css('bottom'));
        };

        const chatSize = localStorage.getItem('genesyx-game-helper-chat-size');
        if (chatSize) {
          $('#third', parent.document).height(Number(chatSize.split(';')[0]));
          $('#second', parent.document).css('bottom', chatSize.split(';')[1]);
        }
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    });
  }

  //автоматически выставлять параметры заявки для командного боя
  if (settings.saveCommandBattle && currentUrl.indexOf('BattleField.aspx?LocationID=3&BattleTypeID=2') !== -1) {
    injectScript((settings) => {
      try {
        $('#ddlMinLevel').val(settings.commandBattle.minlvl);
        $('#ddlMaxLevel').val(settings.commandBattle.maxlvl);
        $('#' + settings.commandBattle.battleType).prop('checked', true);
        $('#ddlDuration').val(settings.commandBattle.duration);
        $('#ddlTimeToBattle').val(settings.commandBattle.timeToBattle);
        $('#ddlBots').val(settings.commandBattle.bots);
        $('#ddlRate').val(settings.commandBattle.rate);
        $('#ddlPlayers').val(settings.commandBattle.players);
        $('#ddlMap').val(settings.commandBattle.map);
        $('#chkPresetSides').prop('checked', settings.commandBattle.presetSide);
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //Подсвечивать заявку на командный бой с плохими параметрами.
  if (settings.highlightBattleRequest && currentUrl.indexOf('BattleField.aspx?LocationID=3&BattleTypeID=2') !== -1) {
    injectScript((settings) => {
      try {
        $('#dlBattles table.darkbody').each((i, t) => {
          const time = $('td.whitetext:contains(Уровень) span:eq(4)', t);
          if (time.html().indexOf('1') === -1) {
            time.attr('style', 'background-color: red !important; color: white !important;');
          }
          const bots = $('td.whitetext:contains(Уровень) span:eq(5)', t);
          if (bots.html().indexOf('запрещены') === -1) {
            bots.attr('style', 'background-color: red !important; color: white !important;');
          }
          const weaponType = $('td.whitetext:contains(Уровень) span:eq(6)', t);
          if (weaponType.html().indexOf('с оружием') === -1) {
            weaponType.attr('style', 'background-color: red !important; color: white !important;');
          }
        })
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //автоматически выставлять параметры заявки для дуэли
  if (settings.saveDuelBattle
    && currentUrl.indexOf('BattleField.aspx?LocationID=3') !== -1
    && currentUrl.indexOf('BattleField.aspx?LocationID=3&BattleTypeID=2') === -1) {
    injectScript((settings) => {
      try {
        $('#ddlMinLevel').val(settings.duelBattle.minlvl);
        $('#ddlMaxLevel').val(settings.duelBattle.maxlvl);
        $('#' + settings.duelBattle.battleType).prop('checked', true);
        $('#ddlDuration').val(settings.duelBattle.duration);
        $('#ddlTimeToBattle').val(settings.duelBattle.timeToBattle);
        $('#ddlBots').val(settings.duelBattle.bots);
        $('#ddlRate').val(settings.duelBattle.rate);
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //оповещения о привате и системных сообщениях
  if ((settings.sounds.private.enabled || settings.sounds.system.enabled || settings.sounds.clan.enabled) && currentUrl.indexOf('Chat.aspx') !== -1) {
    injectScript((settings) => {
      try {
        window.ChatMessagesJSONtoHTMLOriginal = window.ChatMessagesJSONtoHTML;

        window.ChatMessagesJSONtoHTML = function (json) {
          if (window.lastMessage) {
            for (let i = json.length - 1; i >= 0; i--) {
              if (settings.sounds.private.enabled && json[i].RMT === 2 && json[i].MPID !== json[i].PID) {
                settings.sounds.private.popup && window.gameHelperShowPopup('private', settings.sounds.private.name);
                window.gameHelperPlaySound(settings.sounds.private.useUrl ? settings.sounds.private.url : settings.sounds.private.defUrl, settings.sounds.private.volume / 100);
              }
              if (settings.sounds.clan.enabled && json[i].RMT === 5) {
                settings.sounds.clan.popup && window.gameHelperShowPopup('clan', settings.sounds.clan.name);
                window.gameHelperPlaySound(settings.sounds.clan.useUrl ? settings.sounds.clan.url : settings.sounds.clan.defUrl, settings.sounds.clan.volume / 100);
              }
              if (settings.sounds.system.enabled && json[i].RMT === 6) {
                settings.sounds.system.popup && window.gameHelperShowPopup('system', settings.sounds.system.name);
                window.gameHelperPlaySound(settings.sounds.system.useUrl ? settings.sounds.system.url : settings.sounds.system.defUrl, settings.sounds.system.volume / 100);
              }
            }
          }

          return window.ChatMessagesJSONtoHTMLOriginal(json);
        };
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //начало боя
  if (settings.sounds.battle.enabled && currentUrl.indexOf('Battle.aspx') !== -1 && currentUrl.indexOf('com') === -1) {
    injectScript((settings) => {
      try {
        window.setTimeout(function () {
          if (window.battle && window.battle.isBattleMode) {
            settings.sounds.battle.popup && window.gameHelperShowPopup('battle', settings.sounds.battle.name);
            window.gameHelperPlaySound(settings.sounds.battle.useUrl ? settings.sounds.battle.url : settings.sounds.battle.defUrl, settings.sounds.battle.volume / 100);
          }
        }, 3000);
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //напоминание сделать ход
  if (settings.sounds.freeze.enabled && currentUrl.indexOf('Battle.aspx') !== -1 && currentUrl.indexOf('com') === -1) {
    injectScript((settings) => {
      try {
        window.setInterval(function () {
          if ($('.battle-timer #timer0').html() === '00:15' && $('#divPunchBlockEnabled').css('display') === 'block') {
            settings.sounds.freeze.popup && window.gameHelperShowPopup('freeze', settings.sounds.freeze.name);
            window.gameHelperPlaySound(settings.sounds.freeze.useUrl ? settings.sounds.freeze.url : settings.sounds.freeze.defUrl, settings.sounds.freeze.volume / 100);
          }
        }, 1000);
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //полное здоровье
  if (settings.sounds.hp.enabled && currentUrl.indexOf('UserInfo.aspx') !== -1) {
    injectScript((settings) => {
      try {
        window.gameHelperIsFullHealthAndEnergy = Number($('#spEnergy').html()) === Number($('#spEnergy1').html()) && Number($('#spHealth').html()) === Number($('#spHealth1').html());

        window.setInterval(function () {
          let oldGameHelperIsFullHealthAndEnergy = window.gameHelperIsFullHealthAndEnergy;
          window.gameHelperIsFullHealthAndEnergy = Number($('#spEnergy').html()) === Number($('#spEnergy1').html()) && Number($('#spHealth').html()) === Number($('#spHealth1').html());
          if (!oldGameHelperIsFullHealthAndEnergy && window.gameHelperIsFullHealthAndEnergy) {
            settings.sounds.hp.popup && window.gameHelperShowPopup('hp', settings.sounds.hp.name);
            window.gameHelperPlaySound(settings.sounds.hp.useUrl ? settings.sounds.hp.url : settings.sounds.hp.defUrl, settings.sounds.hp.volume / 100);
          }
        }, 3000);
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //конец крафта и усталости
  if (currentUrl.indexOf('/genesyx') !== -1) {
    injectScript((settings) => {
      try {
        if (window.ajaxInt && window.ajaxInt.prolongate) {
          window.gameHelperCraftInProgress = false;
          window.gameHelperCraftTiredInProgress = false;
          window.ajaxInt.prolongateOriginal = window.ajaxInt.prolongate;
          window.ajaxInt.prolongate = function (data) {
            window.ajaxInt.prolongateOriginal(data);

            if (data.craftTime && data.craftTime !== '00:00') {
              window.gameHelperCraftInProgress = true;
            }
            if (data.craftTime && data.craftTime === '00:00') {
              if (settings.sounds.endwork.enabled && window.gameHelperCraftInProgress) {
                settings.sounds.endwork.popup && window.gameHelperShowPopup('endwork', settings.sounds.endwork.name);
                window.gameHelperPlaySound(settings.sounds.endwork.useUrl ? settings.sounds.endwork.url : settings.sounds.endwork.defUrl, settings.sounds.endwork.volume / 100);
              }
              window.gameHelperCraftInProgress = false;
            }

            if (data.craftTired && data.craftTired !== '00:00') {
              window.gameHelperCraftTiredInProgress = true;
            }
            if (data.craftTired && data.craftTired === '00:00') {
              if (window.gameHelperCraftTiredInProgress && settings.sounds.endtired.enabled) {
                settings.sounds.endtired.popup && window.gameHelperShowPopup('endtired', settings.sounds.endtired.name);
                window.gameHelperPlaySound(settings.sounds.endtired.useUrl ? settings.sounds.endtired.url : settings.sounds.endtired.defUrl, settings.sounds.endtired.volume / 100);
              }
              window.gameHelperCraftTiredInProgress = false;
            }
          };
        }
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, settings);
  }

  //таймер
  if (settings.sounds.custom.enabled && currentUrl.indexOf('Head.aspx') !== -1) {
    injectScript((opt) => {
      try {
        const settings = opt.settings;
        const template = opt.timersTemplate;
        const div = document.createElement('div');
        div.id = 'genesyx-game-helper-timers';
        div.innerHTML = template;
        document.querySelector('body').appendChild(div);
        document.querySelector('#genesyx-game-helper-min').value = (localStorage.getItem('genesyx-game-helper-min') || '10');
        document.querySelector('#genesyx-game-helper-sec').value = (localStorage.getItem('genesyx-game-helper-sec') || '00');
        document.querySelector('#genesyx-game-helper-min').onchange = function () {
          localStorage.setItem('genesyx-game-helper-min', document.querySelector('#genesyx-game-helper-min').value);
        };
        document.querySelector('#genesyx-game-helper-sec').onchange = function () {
          localStorage.setItem('genesyx-game-helper-sec', document.querySelector('#genesyx-game-helper-sec').value);
        };
        document.querySelector('#genesyx-game-helper-start').onclick = function () {
          const min = Number(document.querySelector('#genesyx-game-helper-min').value);
          const sec = Number(document.querySelector('#genesyx-game-helper-sec').value);
          document.querySelector('#genesyx-game-helper-time').innerHTML = (min < 10 ? ('0' + min) : min) + ':' + (sec < 10 ? '0' + sec : sec);
          if (window.gameHelperTimerInterval) {
            clearInterval(window.gameHelperTimerInterval);
            window.gameHelperTimerInterval = null;
          }

          window.gameHelperTimerInterval = window.setInterval(function () {
            const time = document.querySelector('#genesyx-game-helper-time').innerHTML;
            const a = time.split(':');
            let min = Number(a[0]);
            let sec = Number(a[1]);
            let totalSec = min * 60 + sec;
            totalSec = totalSec - 1;
            if (totalSec < 0) {
              clearInterval(window.gameHelperTimerInterval);
              settings.sounds.custom.popup && window.gameHelperShowPopup('custom', settings.sounds.custom.name);
              window.gameHelperPlaySound(settings.sounds.custom.useUrl ? settings.sounds.custom.url : settings.sounds.custom.defUrl, settings.sounds.custom.volume / 100);
            } else {
              min = Math.floor(totalSec / 60);
              sec = (totalSec % 60);
              document.querySelector('#genesyx-game-helper-time').innerHTML = (min < 10 ? ('0' + min) : min) + ':' + (sec < 10 ? '0' + sec : sec);
            }

          }, 1000);
        };
        document.querySelector('#genesyx-game-helper-stop').onclick = function () {
          clearInterval(window.gameHelperTimerInterval);
        };
        document.querySelector('#genesyx-game-helper-reset').onclick = function () {
          clearInterval(window.gameHelperTimerInterval);
          document.querySelector('#genesyx-game-helper-time').innerHTML = '00:00';
        };
      } catch (e) {
        console.error('genesyx-game-helper', e);
      }
    }, {settings, timersTemplate});
  }
});
