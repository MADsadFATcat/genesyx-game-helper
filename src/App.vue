<template>
  <div id="app" v-if="settings != null">
    <div>Настройки:</div>
    <table>
      <tbody>
      <tr>
        <td>Открывать ссылки в новой вкладке:</td>
        <td><input type="checkbox" v-model="settings.targetBlank"></td>
      </tr>
      <tr>
        <td>Скрывать картинки в центре:</td>
        <td><input type="checkbox" v-model="settings.hideBigImg"></td>
      </tr>
      <tr>
        <td>Запоминать размер чата:</td>
        <td><input type="checkbox" v-model="settings.saveChatSize"></td>
      </tr>
      <tr>
        <td>Автоматически выставлять параметры заявки для командного боя:</td>
        <td><input type="checkbox" v-model="settings.saveCommandBattle"></td>
      </tr>
      <tr>
        <td>Автоматически выставлять параметры заявки для дуэли:</td>
        <td><input type="checkbox" v-model="settings.saveDuelBattle"></td>
      </tr>
      </tbody>
    </table>
    <div>Оповещения:</div>
    <table>
      <tbody>
      <tr v-for="sound in settings.sounds">
        <td>{{sound.name}}:</td>
        <td>
          <input type="checkbox" v-model="sound.enabled" title="Включить оповещения">
        </td>
        <td>
          <button @click="play(sound)">
            <font-awesome-icon :icon="['fas', 'volume-up']" title="Проиграть mp3 файл"/>
          </button>
        </td>
        <td v-if="sound.enabled">
          <font-awesome-icon :icon="['fab', 'chrome']" title="Всплывающие оповещения"/>
        </td>
        <td v-if="sound.enabled">
          <input type="checkbox" v-model="sound.popup" title="Всплывающие оповещения"></td>
        <td v-if="sound.enabled">
          <font-awesome-icon :icon="['fas', 'volume-up']" title="Громкость"/>
        </td>
        <td v-if="sound.enabled">
          <input type="range" min="0" max="100" step="10" v-model="sound.volume" title="Громкость"/>
        </td>
        <td v-if="sound.enabled">
          <font-awesome-icon :icon="['fas', 'file-audio']" title="Заменить mp3 файл"/>
        </td>
        <td v-if="sound.enabled">
          <input type="checkbox" v-model="sound.useUrl" title="Заменить mp3 файл"></td>
        <td v-if="sound.enabled && sound.useUrl">
          <input type="text" v-model="sound.url" title="Заменить mp3 файл">
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="settings.saveCommandBattle">Параметры заявки для командного боя:</div>
    <table v-if="settings.saveCommandBattle">
      <tbody>
      <tr>
        <td>
          <table>
            <tbody>
            <tr>
              <td>Уровень противника:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td>мин:</td>
                    <td>
                      <select v-model="settings.commandBattle.minlvl">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                    </td>
                    <td>макс:</td>
                    <td>
                      <select v-model="settings.commandBattle.maxlvl">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Тип:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td><span><label><input v-model="settings.commandBattle.battleType"
                                            type="radio" :value="'rbWeapon'">с оружием</label></span>
                    </td>
                    <td><span><label><input v-model="settings.commandBattle.battleType"
                                            type="radio" :value="'rbNoWeapon'">без оружия</label></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Время на ход:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <select v-model="settings.commandBattle.duration">
                        <option value="30">30 сек.</option>
                        <option value="60">1 мин.</option>
                        <option value="180">3 мин.</option>
                        <option value="300">5 мин.</option>
                      </select>
                    </td>
                    <td>начало:</td>
                    <td>
                      <select v-model="settings.commandBattle.timeToBattle">
                        <option value="10">10 мин.</option>
                        <option value="5">5 мин.</option>
                        <option value="3">3 мин.</option>
                      </select>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Боты:</td>
              <td>
                <select v-model="settings.commandBattle.bots">
                  <option value="1">Разрешить</option>
                  <option value="0">Запретить</option>
                  <option value="2">С 5 минуты</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Рейтинг до:</td>
              <td>
                <select v-model="settings.commandBattle.rate">
                  <option value="0"></option>
                  <option value="100">100.0</option>
                  <option value="300">300.0</option>
                  <option value="500">500.0</option>
                  <option value="750">750.0</option>
                  <option value="1000">1000.0</option>
                  <option value="1250">1250.0</option>
                  <option value="1500">1500.0</option>
                  <option value="1750">1750.0</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Игроков:</td>
              <td>
                <select v-model="settings.commandBattle.players">
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Карта:</td>
              <td>
                <select v-model="settings.commandBattle.map">
                  <option value="-1">Полигон</option>
                  <option value="1">Свалка</option>
                  <option value="2">Офис</option>
                  <option value="3">Засада</option>
                  <option value="4">Озера</option>
                  <option value="6">Острова</option>
                  <option value="7">Окопы</option>
                  <option value="8">Противостояние</option>
                  <option value="9">Тюрьма</option>
                  <option value="10">Крушение</option>
                  <option value="12">Перекресток</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Выбор стороны</td>
              <td>
                <input v-model="settings.commandBattle.presetSide" type="checkbox">
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="settings.saveDuelBattle">Параметры заявки для дуэли:</div>
    <table v-if="settings.saveDuelBattle">
      <tbody>
      <tr>
        <td>
          <table>
            <tbody>
            <tr>
              <td>Уровень противника:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td>мин:</td>
                    <td>
                      <select v-model="settings.duelBattle.minlvl">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                    </td>
                    <td>макс:</td>
                    <td>
                      <select v-model="settings.duelBattle.maxlvl">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Тип:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td><span><label><input v-model="settings.duelBattle.battleType"
                                            type="radio" :value="'rbWeapon'">с оружием</label></span></td>
                    <td><span><label><input v-model="settings.duelBattle.battleType"
                                            type="radio" :value="'rbNoWeapon'">без оружия</label></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Время на ход:</td>
              <td>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <select v-model="settings.duelBattle.duration">
                        <option value="30">30 сек.</option>
                        <option value="60">1 мин.</option>
                        <option value="180">3 мин.</option>
                        <option value="300">5 мин.</option>
                      </select>
                    </td>
                    <td>начало:</td>
                    <td>
                      <select v-model="settings.duelBattle.timeToBattle">
                        <option value="10">10 мин.</option>
                        <option value="5">5 мин.</option>
                        <option value="3">3 мин.</option>
                      </select>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Боты:</td>
              <td>
                <select v-model="settings.duelBattle.bots">
                  <option value="1">Разрешить</option>
                  <option value="0">Запретить</option>
                  <option value="2">С 5 минуты</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Рейтинг до:</td>
              <td>
                <select v-model="settings.duelBattle.rate">
                  <option value="0"></option>
                  <option value="100">100.0</option>
                  <option value="300">300.0</option>
                  <option value="500">500.0</option>
                  <option value="750">750.0</option>
                  <option value="1000">1000.0</option>
                  <option value="1250">1250.0</option>
                  <option value="1500">1500.0</option>
                  <option value="1750">1750.0</option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Settings from '@/core/settings';
  import config from '@/core/config';

  @Component({})
  export default class App extends Vue {
    public settings: Settings | null = null;
    private connectedToTabs = false;

    public created() {
      chrome.storage.sync.get('settings', (data: any) => {
        if (data && data.settings) {
          this.settings = data.settings;
          console.log('settings loaded', this.settings);
        }
      });
    }

    @Watch('settings', {deep: true})
    public save() {
      chrome.storage.sync.set({settings: this.settings}, () => {
        console.log('settings saved', this.settings);

        if (!this.connectedToTabs) {
          chrome.tabs.query({url: config.gameUrls}, (tabs: any) => {
            if (!tabs) {
              return;
            }

            for (let i = 0; i < tabs.length; i++) {
              chrome.tabs.connect(tabs[i].id, {name: 'genesyx-game-helper'});
            }
          });
          this.connectedToTabs = true;
        }
      });
    }

    public play(sound: any) {
      const audio = document.createElement('audio');
      audio.src = sound.useUrl ? sound.url : sound.defUrl;
      audio.volume = sound.volume / 100;
      audio.autoplay = true;
      audio.load();
    }
  }
</script>

<style lang="scss">
  html, body {
    width: 100%;
    min-width: 760px;
  }

  div {
    margin: 10px auto;
    text-align: center;
  }

  input {
    height: 19px;
  }

  input[type=range], input[type=text] {
    width: 100px;
  }

  #app {
    > table {
      margin: 10px auto;
      text-align: left;
      border: 1px solid #00a7ff;

      td {
        border-spacing: 2px;
        padding: 2px;
      }
    }
  }
</style>
