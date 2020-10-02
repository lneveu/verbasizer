<template>
  <div class="bg-gray-100 h-screen px-10 flex flex-col">
    <header>
      <h3
        class="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        <a
          href="https://www.youtube.com/watch?v=x3IKLMgFaDA"
          class="underline"
          target="_blank"
          >Verbasizer</a
        >
      </h3>
    </header>
    <main class="p-3 m:p-10 h-full flex flex-col">
      <div
        ref="inputAreaContainer"
        class="flex flex-row space-x-4 items-start flex-grow overflow-x-auto py-2 px-2"
      >
        <InputArea
          v-for="(input, i) in inputs"
          :key="i"
          :content.sync="input.content"
          :enabled.sync="input.enabled"
          :showCmds="inputs.length > 1"
          v-on:remove="removeInputArea(i)"
        ></InputArea>
        <button
          v-on:click="this.addInputArea"
          class="text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md"
        >
          {{ $t('addInputBtn') }}
        </button>
      </div>
      <div class="flex flex-col md:items-baseline pt-10">
        <div
          class="flex flex-col md:flex-row md:items-baseline text-center space-y-4 md:space-x-4"
        >
          <button
            @click="generateSentences"
            class="text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md"
          >
            {{ $t('generateBtn') }}
          </button>
          <p>{{ $t('inputWordLabel') }}</p>
          <input
            v-model="settings.nbWords"
            class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-2 width-full block leading-normal"
            value="1"
          />
        </div>
        <textarea
          v-model="outputContent"
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded my-2 px-4 leading-normal resize-none w-full md:w-2/3 h-56"
        ></textarea>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import InputArea from './components/InputArea';

function shuffle(words) {
  let newText = [];
  let i = 0;
  let phraseLength = 0;
  while (words.length) {
    i = parseInt(Math.random() * words.length - 1, 10);
    phraseLength = parseInt(Math.random() * 9, 10);
    newText = newText.concat(words.splice(i, phraseLength));
  }
  return newText;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default {
  name: 'App',
  components: {
    InputArea,
  },
  data() {
    return {
      inputs: [
        {
          content: this.$i18n.t('inputAreaTextExample1'),
          enabled: true,
        },
        {
          content: this.$i18n.t('inputAreaTextExample2'),
          enabled: true,
        },
      ],
      outputContent: '',
      settings: {
        nbWords: 6,
      },
    };
  },
  methods: {
    addInputArea() {
      this.inputs.push({ content: '', enabled: true });
      // Autoscroll
      Vue.nextTick(() => {
        this.$refs.inputAreaContainer.scrollLeft = this.$refs.inputAreaContainer.scrollWidth;
      });
    },
    removeInputArea(index) {
      this.inputs.splice(index, 1);
      if (this.inputs.length === 1) {
        this.inputs[0].enabled = true;
      }
    },
    generateSentences() {
      const sentences = this.inputs
        .filter((input) => input.enabled)
        .map((input) => input.content)
        .join(' ');

      const words = sentences
        .replace(/\n|\r/g, ' ')
        // Remove punctuation
        // .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .split(' ')
        .filter((w) => w.trim() !== '');

      const shuffled = shuffle(words);
      const cutWords = [];
      const len = shuffled.length;

      for (let i = 0; i < len; i++) {
        if (i === 0) {
          shuffled[i] = capitalize(shuffled[i]);
        }

        if ((i + 1) % this.settings.nbWords === 0) {
          cutWords.push(shuffled[i]);
          if (i + 1 < len) {
            cutWords.push('\n');
            shuffled[i + 1] = capitalize(shuffled[i + 1]);
          }
        } else if (i + 1 < len) {
          cutWords.push(`${shuffled[i]} `);
        } else {
          cutWords.push(shuffled[i]);
        }
      }

      this.outputContent = cutWords.join('');
    },
  },
};
</script>

<style></style>
