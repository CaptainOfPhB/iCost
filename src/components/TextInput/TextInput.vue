<script setup lang='ts'>
import { defineProps, ref } from 'vue';
import typeOf from '../../utils/typeOf';

const props = defineProps({
  trim: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  validate: { type: [Function, RegExp], default: undefined },
  validateMessage: { type: String, default: undefined },
  modelValue: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const error = ref<string>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = props.trim ? target.value.trim() : target.value;
  emit('update:modelValue', target.value);
  throwErrorWhenRequired(value);
  throwErrorWhenValidateFailed(value);
  error.value = '';
}

function throwErrorWhenRequired(value: string) {
  if (props.required && value.length === 0) {
    error.value = 'This field is required';
    throw new Error(error.value);
  }
}

function throwErrorWhenValidateFailed(value: string) {
  if (!props.validate) return;
  const condition1 = typeOf(props.validate) === 'Function' && !(props.validate as Function)(value);
  const condition2 = typeOf(props.validate) === 'RegExp' && !(props.validate as RegExp).exec(value);
  if (condition1 || condition2) {
    error.value = props.validateMessage || 'This field is invalid';
    throw new Error(error.value);
  }
}
</script>

<template>
  <div class='iCost_text_input'>
    <div :class='["body", error ? "has-error":""]'>
      <input
        :type='type'
        :value='modelValue'
        :disabled='disabled'
        :placeholder='placeholder'
        @input='onInput'
      />
      <slot name='extra' />
    </div>
    <transition name='van-fade' mode='out-in'>
      <div v-if='error' class='error'>{{ error }}</div>
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