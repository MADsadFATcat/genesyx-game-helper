<template>
  <v-row
    align="center"
    justify="center"
    v-if="settings != null"
  >
    <v-col class="main-row">
      <v-card elevation="10">
        <v-card-text>
          <v-row align="center"
                 justify="center">
            <v-btn
              color="primary"
              target="_blank"
              href="https://t.me/genesyx_helper_bot">Телеграм бот
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card elevation="10">
        <v-card-title>
          Настройки
        </v-card-title>
        <v-card-text>
          <v-switch hide-details
                    v-model="settings.targetBlank"
                    label="Открывать ссылки в новой вкладке"></v-switch>
          <v-switch hide-details
                    v-model="settings.hideBigImg"
                    label="Скрывать картинки в центре"></v-switch>
          <v-switch hide-details
                    v-model="settings.saveChatSize"
                    label="Запоминать размер чата"></v-switch>
          <v-switch hide-details
                    v-model="settings.highlightBattleRequest"
                    label="Подсвечивать заявку на командный бой с плохими параметрами."></v-switch>
          <v-switch hide-details
                    v-model="settings.saveCommandBattle"
                    label="Автоматически выставлять параметры заявки для командного боя"></v-switch>
          <v-switch hide-details
                    v-model="settings.saveDuelBattle"
                    label="Автоматически выставлять параметры заявки для дуэли"></v-switch>
        </v-card-text>
      </v-card>
      <v-card elevation="10">
        <v-card-title>
          Оповещения
        </v-card-title>
        <v-card-text>
          <v-container class="remove-padding">
            <v-row v-for="sound in settings.sounds" :key="sound.name" class="settings-sounds">
              <v-switch hide-details
                        v-model="sound.enabled"
                        title="Включить оповещения">
                <template v-slot:label>
                  <div class="sound-label">
                    {{ sound.name }}
                  </div>
                </template>
              </v-switch>
              <div>
                <v-btn
                  v-if="sound.enabled"
                  @click="play(sound)"
                  color="primary"
                  x-small
                  class="button-play">
                  <v-icon
                    x-small
                    title="Проиграть mp3 файл">fas fa-volume-up
                  </v-icon>
                </v-btn>
              </div>
              <v-switch
                hide-details
                v-if="sound.enabled"
                v-model="sound.popup"
                title="Всплывающие оповещения">
                <template v-slot:label>
                  <v-icon
                    v-if="sound.enabled"
                    title="Всплывающие оповещения"
                    color="accent"
                    small>fab fa-chrome
                  </v-icon>
                </template>
              </v-switch>
              <v-slider
                v-if="sound.enabled"
                v-model="sound.volume"
                :min="0"
                :max="100"
                hide-details
                class="volume-slider"
                color="primary"
              >
                <template v-slot:label>
                  <v-icon
                    v-if="sound.enabled"
                    title="Громкость"
                    color="primary"
                    small>fas fa-volume-up
                  </v-icon>
                </template>
              </v-slider>
              <v-switch
                hide-details
                v-if="sound.enabled"
                v-model="sound.useUrl"
                title="Заменить mp3 файл">
                <template v-slot:label>
                  <v-icon
                    v-if="sound.enabled"
                    title="Заменить mp3 файл"
                    color="accent"
                    small>fa fa-file-audio
                  </v-icon>
                </template>
              </v-switch>
              <v-text-field
                v-show="sound.enabled && sound.useUrl"
                v-model="sound.url"
                title="Заменить mp3 файл"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card elevation="10" v-if="settings.saveCommandBattle">
        <v-card-title>Параметры заявки для командного боя</v-card-title>
        <v-card-text>
          <v-select v-model="settings.commandBattle.minlvl" :items="levelSelect"
                    label="Уровень противника мин:"></v-select>
          <v-select v-model="settings.commandBattle.maxlvl" :items="levelSelect"
                    label="Уровень противника макс:"></v-select>
          <v-radio-group v-model="settings.commandBattle.battleType" label="Тип:" row>
            <v-radio
              label="с оружием"
              value="rbWeapon"
            ></v-radio>
            <v-radio
              label="без оружия"
              value="rbNoWeapon"
            ></v-radio>
          </v-radio-group>
          <v-select v-model="settings.commandBattle.duration"
                    label="Время на ход:"
                    :items="durationSelect"
          ></v-select>
          <v-select v-model="settings.commandBattle.timeToBattle"
                    label="Начало:"
                    :items="timeToBattleSelect"
          ></v-select>
          <v-select v-model="settings.commandBattle.bots"
                    label="Боты:"
                    :items="botsSelect"
          ></v-select>
          <v-select v-model="settings.commandBattle.rate"
                    label="Рейтинг до:"
                    :items="rateSelect"
          ></v-select>
          <v-select v-model="settings.commandBattle.players"
                    label="Игроков:"
                    :items="playersCountSelect"
          ></v-select>
          <v-select v-model="settings.commandBattle.map"
                    label="Карта:"
                    :items="mapsSelect"
          ></v-select>
          <v-switch v-model="settings.commandBattle.presetSide" label="Выбор стороны">
          </v-switch>
        </v-card-text>
      </v-card>
      <v-card elevation="10" v-if="settings.saveDuelBattle">
        <v-card-title>
          Параметры заявки для дуэли
        </v-card-title>
        <v-card-text>
          <v-select v-model="settings.duelBattle.minlvl" :items="levelSelect"
                    label="Уровень противника мин:"></v-select>
          <v-select v-model="settings.duelBattle.maxlvl" :items="levelSelect"
                    label="Уровень противника макс:"></v-select>
          <v-radio-group v-model="settings.duelBattle.battleType" label="Тип:" row>
            <v-radio
              label="с оружием"
              value="rbWeapon"
            ></v-radio>
            <v-radio
              label="без оружия"
              value="rbNoWeapon"
            ></v-radio>
          </v-radio-group>
          <v-select v-model="settings.duelBattle.duration"
                    label="Время на ход:"
                    :items="durationSelect"
          ></v-select>
          <v-select v-model="settings.duelBattle.timeToBattle"
                    label="Начало:"
                    :items="timeToBattleSelect"
          ></v-select>
          <v-select v-model="settings.duelBattle.bots"
                    label="Боты:"
                    :items="botsSelect"
          ></v-select>
          <v-select v-model="settings.duelBattle.rate"
                    label="Рейтинг до:"
                    :items="rateSelect"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import _ from 'lodash';
  import Settings from '@/core/settings';

  @Component({})
  export default class Sett extends Vue {
    public settings: Settings | null = null;
    private levelSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    private playersCountSelect = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    private durationSelect = [
      {text: '30 сек.', value: 30},
      {text: '1 мин.', value: 60},
      {text: '3 мин.', value: 180},
      {text: '5 мин.', value: 300},
    ];
    private timeToBattleSelect = [
      {text: '10 мин.', value: 10},
      {text: '5 мин.', value: 5},
      {text: '3 мин.', value: 3},
    ];
    private botsSelect = [
      {text: 'Разрешить', value: 1},
      {text: 'Запретить', value: 0},
      {text: 'С 5 минуты', value: 2},
    ];
    private rateSelect = [
      {text: '', value: 0},
      {text: '100.0', value: 100},
      {text: '300.0', value: 300},
      {text: '500.0', value: 500},
      {text: '750.0', value: 750},
      {text: '1000.0', value: 1000},
      {text: '1250.0', value: 1250},
      {text: '1500.0', value: 1500},
      {text: '1750.0', value: 1750},
    ];
    private mapsSelect = [
      {text: 'Полигон', value: -1},
      {text: 'Свалка', value: 1},
      {text: 'Офис', value: 2},
      {text: 'Засада', value: 3},
      {text: 'Озера', value: 4},
      {text: 'Острова', value: 6},
      {text: 'Окопы', value: 7},
      {text: 'Противостояние', value: 8},
      {text: 'Тюрьма', value: 9},
      {text: 'Крушение', value: 10},
      {text: 'Перекресток', value: 12},
    ];

    public created() {
      chrome.storage.sync.get('settings', (data: any) => {
        this.settings = _.defaultsDeep(data.settings, new Settings());
        console.log('settings loaded', this.settings);
      });
    }

    @Watch('settings', {deep: true})
    public save() {
      chrome.storage.sync.set({settings: this.settings}, () => {
        console.log('settings saved', this.settings);
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
  .button-play {
    margin-top: 10px;
  }

  .volume-slider {
    width: 150px;

    .v-input__slot {
      height: 39px !important;
    }

    .v-label {
      margin: 0 !important;
    }
  }

  .sound-label {
    width: 165px;
  }

  .settings-sounds {
    min-height: 39px !important;

    > * {
      padding-right: 5px;
    }
  }

  label, input, .v-label {
    color: white !important;
    font-size: 12px !important;
  }

  .main-row > div + div {
    margin-top: 10px !important;
  }

  .v-select__selection {
    font-size: 12px !important;
  }
</style>
