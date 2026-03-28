import { defineComponent, ref, computed, watch, onMounted, onUnmounted, h } from 'vue';

export default defineComponent({
  name: 'CountTo',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2000
    },
    decimals: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const currentValue = ref(props.startVal);
    let frameId = null;

    const displayValue = computed(() => {
      return currentValue.value.toFixed(props.decimals);
    });

    const animate = () => {
      let startTime = null;
      const startVal = currentValue.value;
      const endVal = props.endVal;
      const duration = props.duration;
      const range = endVal - startVal;

      const step = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const progress = Math.min((timestamp - startTime) / duration, 1);
        currentValue.value = startVal + range * progress;

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          currentValue.value = endVal;
        }
      };
      frameId = requestAnimationFrame(step);
    };

    watch(() => props.endVal, () => {
      animate();
    });

    onMounted(() => {
      animate();
    });

    onUnmounted(() => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    });

    return () => h('span', displayValue.value);
  }
});
