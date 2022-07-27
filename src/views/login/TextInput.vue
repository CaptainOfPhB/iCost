<script lang='ts'>

</script>

<template>
  <div class='iCost_text_input'>
    <input type='text'>
    <slot name='extra' />
  </div>
</template>

<style lang='less'>
.iCost_text_input {
  height: 50px;
  display: flex;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: @primary-background-color-light;

  &:focus {
    border: 1px solid @primary-theme-color-2;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
  }
}
</style>