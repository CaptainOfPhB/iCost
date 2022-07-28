import { onMounted, onUnmounted, ref } from 'vue';

function useCountDown(seconds: number = 60, manually?: boolean) {

  const timer = ref<number>();
  const count = ref<number>(seconds);
  const pending = ref<boolean>(false);

  function startCountDown() {
    pending.value = true;
    timer.value = setTimeout(() => {
      if (count.value > 1) {
        clearTimeout(timer.value);
        count.value--;
        startCountDown();
      } else {
        clearTimeout(timer.value);
        count.value = seconds;
        pending.value = false;
      }
    }, 1000);
  }

  onMounted(() => !manually && startCountDown());

  onUnmounted(() => clearTimeout(timer.value));

  return { count, pending, startCountDown };
}

export default useCountDown;