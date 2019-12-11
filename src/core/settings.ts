export default class Settings {
  public rootUrl = chrome.runtime.getURL('');
  public targetBlank = false;
  public hideBigImg = false;
  public saveChatSize = false;
  public saveCommandBattle = false;
  public saveDuelBattle = false;
  public highlightBattleRequest = false;

  public commandBattle = {
    minlvl: 0,
    maxlvl: 0,
    battleType: 'rbWeapon',
    duration: 180,
    timeToBattle: 10,
    bots: 1,
    rate: 0,
    players: 3,
    map: -1,
    presetSide: false,
  };

  public duelBattle = {
    minlvl: 0,
    maxlvl: 0,
    battleType: 'rbWeapon',
    duration: 180,
    timeToBattle: 10,
    bots: 1,
    rate: 0,
  };

  public sounds = {
    private: {
      name: 'Приват',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/private.mp3',
      defUrl: this.rootUrl + 'sounds/private.mp3',
    },
    system: {
      name: 'Системное сообщение',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/system.mp3',
      defUrl: this.rootUrl + 'sounds/system.mp3',
    },
    clan: {
      name: 'Сообщение в клановом чате',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/clan.mp3',
      defUrl: this.rootUrl + 'sounds/clan.mp3',
    },
    freeze: {
      name: 'Напоминание сделать ход',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/freeze.mp3',
      defUrl: this.rootUrl + 'sounds/freeze.mp3',
    },
    battle: {
      name: 'Начало боя',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/battle.mp3',
      defUrl: this.rootUrl + 'sounds/battle.mp3',
    },
    hp: {
      name: 'Полное здоровье и энергия',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/hp.mp3',
      defUrl: this.rootUrl + 'sounds/hp.mp3',
    },
    endwork: {
      name: 'Конец крафта',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/endwork.mp3',
      defUrl: this.rootUrl + 'sounds/endwork.mp3',
    },
    endtired: {
      name: 'Конец усталости',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/endtired.mp3',
      defUrl: this.rootUrl + 'sounds/endtired.mp3',
    },
    custom: {
      name: 'Регулируемый таймер',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/custom.mp3',
      defUrl: this.rootUrl + 'sounds/custom.mp3',
    },
    rats: {
      name: 'Животные на свалке',
      popup: false,
      enabled: false,
      volume: 100,
      useUrl: false,
      url: this.rootUrl + 'sounds/rats.mp3',
      defUrl: this.rootUrl + 'sounds/rats.mp3',
    },
  };
}
