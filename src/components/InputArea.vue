<template>
  <div
    class="flex flex-col h-full"
    v-on:mouseenter="hovered = true"
    v-on:mouseleave="hovered = false"
  >
    <div class="flex-1">
      <textarea
        v-model="model"
        :disabled="!active"
        :class="[
          'flex-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 md:w-64 leading-normal resize-none',
          !active ? 'opacity-50' : '',
        ]"
      ></textarea>

      <div class="flex justify-end" v-show="hovered && showCmds">
        <button
          class="text-white bg-blue-600 hover:bg-blue-500 text-sm font-medium border border-transparent px-1 py-1 m-1 rounded-md"
          v-on:click="active = !active"
        >
          {{
            active
              ? $t("inputAreaStatusBtnDisable")
              : $t("inputAreaStatusBtnEnable")
          }}
        </button>
        <button
          v-on:click="$emit('remove')"
          class="text-white bg-red-600 hover:bg-red-500 text-sm font-medium border border-transparent px-1 py-1 m-1 rounded-md"
        >
          {{ $t("inputAreaRemoveBtn") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputArea",
  props: ["content", "enabled", "showCmds"],
  data() {
    return {
      hovered: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.content;
      },
      set(val) {
        this.$emit("update:content", val);
      },
    },
    active: {
      get() {
        return this.enabled;
      },
      set(val) {
        this.$emit("update:enabled", val);
      },
    },
  },
};
</script>

<style scoped>
textarea {
  height: 83%;
}
</style>
