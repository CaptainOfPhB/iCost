<script setup lang='ts'>
import { defineProps, ref, watch } from 'vue';
import typeOf from '../../utils/typeOf';

const props = defineProps({
  placeholder: { type: String },
  trim: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  validate: { type: [Function, RegExp] },
  validateMessage: { type: String },
  disabled: { type: Boolean, default: false },
  check: { type: Boolean, default: false },
  modelValue: { type: Object, default: () => ({ value: undefined, valid: false }) },
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.check, (check: boolean) => {
  if (!check) return;
  error.value = undefined;
  const { trim, modelValue } = props;
  setValue(trim ? modelValue.value?.trim() : modelValue.value);
});

const error = ref<string>();

function onInput(event: Event) {
  error.value = undefined;
  const target = event.target as HTMLInputElement;
  setValue(props.trim ? target.value.trim() : target.value);
}

function setValue(value?: string) {
  throwErrorWhenRequired(value);
  throwErrorWhenValidateFailed(value);
  emit(
    'update:modelValue',
    { value, valid: error.value === undefined },
  );
}

function throwErrorWhenRequired(value?: string) {
  if (error.value !== undefined) return;
  if (props.required && [undefined, ''].includes(value)) {
    error.value = 'This field is required';
  }
}

function throwErrorWhenValidateFailed(value?: string) {
  if (error.value !== undefined) return;
  if (value === undefined) return;
  if (!props.validate) return;
  const condition1 = typeOf(props.validate) === 'Function' && !(props.validate as Function)(value);
  const condition2 = typeOf(props.validate) === 'RegExp' && !(props.validate as RegExp).exec(value);
  if (condition1 || condition2) {
    error.value = props.validateMessage || 'This field is invalid';
  }
}
</script>

<template>
  <div class='iCost_text_input'>
    <div :class='["body", error ? "has-error":""]'>
      <input
        :type='type'
        :disabled='disabled'
        :value='modelValue.value'
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