(function() {
  const NP_AUDIO = {
    init() {
      if (this.audioCtx) return;
      try {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioCtx.createGain();
        this.musicGain = this.audioCtx.createGain();
        this.sfxGain = this.audioCtx.createGain();
        this.masterGain.connect(this.audioCtx.destination);
        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.currentScene = null;
        this.faithLevel = 0;
        this.sfxVoices = {};
        this.loadSettings();
        this.initScenes();
        this.initSfx();
      } catch (e) {
        console.error('Web Audio API not supported', e);
        this.audioCtx = null;
      }
    },

    loadSettings() {
      if (!this.audioCtx) return;
      const settings = JSON.parse(localStorage.getItem('np_settings')) || {};
      this.setVol(
        settings.master !== undefined ? settings.master : 0.8,
        settings.music !== undefined ? settings.music : 0.7,
        settings.sfx !== undefined ? settings.sfx : 0.7
      );
    },

    setVol(master, music, sfx) {
      if (!this.audioCtx) return;
      this.masterGain.gain.value = master;
      this.musicGain.gain.value = music;
      this.sfxGain.gain.value = sfx;
      const settings = JSON.parse(localStorage.getItem('np_settings')) || {};
      localStorage.setItem('np_settings', JSON.stringify({
        ...settings,
        master,
        music,
        sfx
      }));
    },

    getVol() {
      if (!this.audioCtx) return { master: 0, music: 0, sfx: 0 };
      return {
        master: this.masterGain.gain.value,
        music: this.musicGain.gain.value,
        sfx: this.sfxGain.gain.value
      };
    },

    suspend() {
      if (this.audioCtx && this.audioCtx.state !== 'suspended') {
        this.audioCtx.suspend();
      }
    },

    resume() {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    },

    initScenes() {
      this.scenes = {
        title: {
          pad: { type: 'sawtooth', detune: [0, 7, -5], lfo: { rate: 0.2, depth: 500 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 7, 9, 12, 14, 16], root: 60, bpm: 60 },
          chord: [0, 4, 7]
        },
        map: {
          pad: { type: 'sine', detune: [0, 7, -5], lfo: { rate: 0.3, depth: 600 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 62, bpm: 80 },
          chord: [0, 2, 4]
        },
        combat: {
          pad: { type: 'sawtooth', detune: [0, 7, -5], lfo: { rate: 0.4, depth: 700 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 64, bpm: 100 },
          chord: [0, 4, 7],
          percussion: true
        },
        elite: {
          pad: { type: 'sawtooth', detune: [0, 7, -5], lfo: { rate: 0.4, depth: 700 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 65, bpm: 100 },
          chord: [0, 4, 7],
          percussion: true
        },
        boss: {
          pad: { type: 'sawtooth', detune: [0, 7, -5], lfo: { rate: 0.4, depth: 700 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 60, bpm: 100 },
          chord: [0, 3, 7],
          percussion: true
        },
        victory: {
          pad: { type: 'sine', detune: [0, 7, -5], lfo: { rate: 0.3, depth: 600 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 7, 9, 12, 14, 16], root: 67, bpm: 80 },
          chord: [0, 4, 7]
        },
        defeat: {
          pad: { type: 'sine', detune: [0, 7, -5], lfo: { rate: 0.2, depth: 500 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 55, bpm: 60 },
          chord: [0, 3, 7]
        },
        shop: {
          pad: { type: 'sine', detune: [0, 7, -5], lfo: { rate: 0.3, depth: 600 } },
          arp: { type: 'triangle', pattern: [0, 2, 4, 5, 7, 9, 11, 12], root: 65, bpm: 80 },
          chord: [0, 4, 7]
        }
      };
    },

    initSfx() {
      this.sfxBank = {
        card_draw: { type: 'noise', duration: 0.1, filter: { type: 'bandpass', Q: 10, frequency: 1000 } },
        card_play: { type: 'noise', duration: 0.2, filter: { type: 'bandpass', Q: 10, frequency: 2000 } },
        card_exhaust: { type: 'noise', duration: 0.3, filter: { type: 'lowpass', frequency: 500, ramp: -1000 } },
        hit: { type: 'custom', duration: 0.3, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 } },
        block: { type: 'custom', duration: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.05 } },
        heal: { type: 'sine', duration: 0.5, frequency: 880, ramp: 440 },
        gold: { type: 'custom', duration: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.05 } },
        potion: { type: 'custom', duration: 0.3, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 } },
        relic: { type: 'custom', duration: 0.5, envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.2 } },
        miracle: { type: 'custom', duration: 1.0, envelope: { attack: 0.1, decay: 0.3, sustain: 0.5, release: 0.3 } },
        turn_start: { type: 'custom', duration: 0.3, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 } },
        victory: { type: 'custom', duration: 2.0, envelope: { attack: 0.1, decay: 0.5, sustain: 1.0, release: 0.5 } },
        defeat: { type: 'custom', duration: 1.5, envelope: { attack: 0.1, decay: 0.3, sustain: 0.7, release: 0.5 } },
        menu_hover: { type: 'custom', duration: 0.1, envelope: { attack: 0.01, decay: 0.05, sustain: 0.05, release: 0.01 } },
        menu_click: { type: 'custom', duration: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.05 } },
        error: { type: 'custom', duration: 0.1, envelope: { attack: 0.01, decay: 0.05, sustain: 0.05, release: 0.01 } },
        intent_warn: { type: 'custom', duration: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.05 } }
      };
    },

    playScene(name) {
      if (!this.audioCtx || this.currentScene === name) return;
      this.stopCurrentScene();
      this.currentScene = name;
      const scene = this.scenes[name];
      if (!scene) return;

      this.sceneGain = this.audioCtx.createGain();
      this.sceneGain.gain.value = 0;
      this.sceneGain.connect(this.musicGain);

      this.padGain = this.audioCtx.createGain();
      this.padGain.gain.value = 0.3;
      this.padGain.connect(this.sceneGain);

      this.arpGain = this.audioCtx.createGain();
      this.arpGain.gain.value = 0;
      this.arpGain.connect(this.sceneGain);

      this.choralGain = this.audioCtx.createGain();
      this.choralGain.gain.value = 0;
      this.choralGain.connect(this.sceneGain);

      this.createPad(scene.pad);
      this.createArp(scene.arp, scene.chord);
      this.createChoral();

      if (scene.percussion) {
        this.createPercussion();
      }

      this.sceneGain.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 1.2);
      this.setFaithLevel(this.faithLevel);
    },

    stopCurrentScene() {
      if (this.sceneGain) {
        this.sceneGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 1.2);
        setTimeout(() => {
          if (this.sceneGain) {
            this.sceneGain.disconnect();
            this.sceneGain = null;
          }
        }, 1200);
      }
      if (this.scheduler) {
        clearInterval(this.scheduler);
        this.scheduler = null;
      }
    },

    createPad(config) {
      const pad = this.audioCtx.createGain();
      pad.connect(this.padGain);

      const lowpass = this.audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 500;
      lowpass.connect(pad);

      const lfo = this.audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = config.lfo.rate;
      lfo.start();

      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.value = config.lfo.depth;
      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      config.detune.forEach((detune, i) => {
        const osc = this.audioCtx.createOscillator();
        osc.type = config.type;
        osc.detune.value = detune;
        osc.start();
        osc.connect(lowpass);
      });
    },

    createArp(config, chord) {
      this.arpPattern = config.pattern;
      this.arpRoot = config.root;
      this.arpBpm = config.bpm;
      this.arpChord = chord;
      this.arpType = config.type;

      this.scheduler = setInterval(() => {
        const now = this.audioCtx.currentTime;
        const lookahead = 0.1;
        const nextNoteTime = now + lookahead;

        if (this.arpGain.gain.value > 0) {
          this.scheduleArpNote(nextNoteTime);
        }
      }, 25);
    },

    scheduleArpNote(time) {
      const noteIndex = Math.floor((time * this.arpBpm / 60) % this.arpPattern.length);
      const note = this.arpPattern[noteIndex];
      const frequency = 440 * Math.pow(2, (this.arpRoot + note) / 12);

      const osc = this.audioCtx.createOscillator();
      osc.type = this.arpType;
      osc.frequency.value = frequency;
      osc.start(time);
      osc.stop(time + 0.1);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.5, time);
      gain.gain.linearRampToValueAtTime(0, time + 0.1);
      osc.connect(gain);
      gain.connect(this.arpGain);
    },

    createChoral() {
      const choral = this.audioCtx.createGain();
      choral.connect(this.choralGain);

      for (let i = 0; i < 3; i++) {
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.detune.value = i * 7 - 7;
        osc.start();

        const lfo = this.audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.5 + i * 0.2;
        lfo.start();

        const lfoGain = this.audioCtx.createGain();
        lfoGain.gain.value = 5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        osc.connect(choral);
      }
    },

    createPercussion() {
      this.percussionGain = this.audioCtx.createGain();
      this.percussionGain.gain.value = 0.5;
      this.percussionGain.connect(this.sceneGain);

      this.scheduler = setInterval(() => {
        const now = this.audioCtx.currentTime;
        const lookahead = 0.1;
        const nextNoteTime = now + lookahead;

        if (this.percussionGain) {
          this.schedulePercussion(nextNoteTime);
        }
      }, 25);
    },

    schedulePercussion(time) {
      const kick = this.audioCtx.createGain();
      kick.gain.setValueAtTime(0, time);
      kick.gain.linearRampToValueAtTime(1, time + 0.01);
      kick.gain.linearRampToValueAtTime(0, time + 0.1);
      kick.connect(this.percussionGain);

      const kickOsc = this.audioCtx.createOscillator();
      kickOsc.type = 'triangle';
      kickOsc.frequency.setValueAtTime(60, time);
      kickOsc.frequency.linearRampToValueAtTime(40, time + 0.1);
      kickOsc.start(time);
      kickOsc.stop(time + 0.1);
      kickOsc.connect(kick);

      if (Math.random() > 0.5) {
        const hat = this.audioCtx.createGain();
        hat.gain.setValueAtTime(0, time);
        hat.gain.linearRampToValueAtTime(0.3, time + 0.01);
        hat.gain.linearRampToValueAtTime(0, time + 0.05);
        hat.connect(this.percussionGain);

        const hatOsc = this.audioCtx.createOscillator();
        hatOsc.type = 'sawtooth';
        hatOsc.frequency.value = 8000;
        hatOsc.start(time);
        hatOsc.stop(time + 0.05);
        hatOsc.connect(hat);
      }
    },

    setFaithLevel(f) {
      if (!this.audioCtx) return;
      this.faithLevel = f;
      const now = this.audioCtx.currentTime;
      const rampTime = 0.8;

      if (f < 30) {
        this.arpGain.gain.linearRampToValueAtTime(0, now + rampTime);
        this.choralGain.gain.linearRampToValueAtTime(0, now + rampTime);
      } else if (f < 70) {
        this.arpGain.gain.linearRampToValueAtTime(0.5, now + rampTime);
        this.choralGain.gain.linearRampToValueAtTime(0, now + rampTime);
      } else {
        this.arpGain.gain.linearRampToValueAtTime(0.5, now + rampTime);
        this.choralGain.gain.linearRampToValueAtTime(0.3, now + rampTime);
      }
    },

    sfx(name, opts = {}) {
      if (!this.audioCtx || !this.sfxBank[name]) return;
      if (!this.sfxVoices[name]) this.sfxVoices[name] = 0;
      if (this.sfxVoices[name] >= 6) return;
      this.sfxVoices[name]++;

      const config = this.sfxBank[name];
      const now = this.audioCtx.currentTime;
      const gain = this.audioCtx.createGain();
      gain.connect(this.sfxGain);

      if (config.type === 'noise') {
        const bufferSize = this.audioCtx.sampleRate * config.duration;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        source.start(now);

        if (config.filter) {
          const filter = this.audioCtx.createBiquadFilter();
          filter.type = config.filter.type;
          filter.Q.value = config.filter.Q || 0;
          filter.frequency.value = config.filter.frequency;
          if (config.filter.ramp) {
            filter.frequency.linearRampToValueAtTime(
              config.filter.frequency + config.filter.ramp,
              now + config.duration
            );
          }
          source.connect(filter);
          filter.connect(gain);
        }

        source.onended = () => {
          this.sfxVoices[name]--;
        };
      } else if (config.type === 'custom') {
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = opts.pitch || 440;
        osc.start(now);
        osc.stop(now + config.duration);

        const envelope = this.audioCtx.createGain();
        envelope.gain.setValueAtTime(0, now);
        envelope.gain.linearRampToValueAtTime(
          opts.vol || 1,
          now + config.envelope.attack
        );
        envelope.gain.linearRampToValueAtTime(
          opts.vol || 1 * config.envelope.sustain,
          now + config.envelope.attack + config.envelope.decay
        );
        envelope.gain.linearRampToValueAtTime(
          0,
          now + config.duration - config.envelope.release
        );
        osc.connect(envelope);
        envelope.connect(gain);

        osc.onended = () => {
          this.sfxVoices[name]--;
        };
      } else {
        const osc = this.audioCtx.createOscillator();
        osc.type = config.type;
        osc.frequency.value = config.frequency || 440;
        if (config.ramp) {
          osc.frequency.linearRampToValueAtTime(
            config.frequency + config.ramp,
            now + config.duration
          );
        }
        osc.start(now);
        osc.stop(now + config.duration);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.value = opts.vol || 1;
        osc.connect(gainNode);
        gainNode.connect(gain);

        osc.onended = () => {
          this.sfxVoices[name]--;
        };
      }

      gain.gain.value = opts.vol || 1;
    }
  };

  window.NP_AUDIO = NP_AUDIO;
})();
