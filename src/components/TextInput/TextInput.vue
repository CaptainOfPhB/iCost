<script setup lang='ts'>
import { PropType, ref, watch } from 'vue';
import { ValidateError } from 'async-validator';

const props = defineProps({
  modelValue: { type: String },
  placeholder: { type: String },
  errors: { type: Array as PropType<ValidateError[]> },
});

const emit = defineEmits(['update:modelValue']);

const touched = ref<boolean>(false);

watch(() => props.modelValue, () => touched.value = true);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class='iCost_text_input'>
    <div :class='["body", touched && errors ? "has-error" : ""]'>
      <input type='text' :value='modelValue' :placeholder='placeholder' @input='onInput' />
      <slot name='extra' />
    </div>
    <transition name='van-fade' mode='out-in'>
      <div v-if='touched && errors && errors.length' class='error'>{{ errors[0].message }}</div>
    </transition>
  </div>
</template>

<style lang='less'>
.iCost_text_input {
  position: relative;
  margin-bottom: 28px;

  .body {
    height: 50px;
    display: flex;
    padding: 10px;
    align-items: center;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease-in-out;
    background-color: @primary-background-color-light;

    &:focus-within {
      border-color: @primary-theme-color-2;
    }

    &.has-error {
      border-color: @primary-red-color;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;

      &::placeholder {
        color: @primary-text-color-light;
      }
    }
  }

  .error {
    position: absolute;
    left: 0;
    bottom: -18px;
    font-size: 14px;
    color: @primary-red-color;
  }
}
</style>