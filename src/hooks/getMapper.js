import { useStore } from "vuex";
import { computed } from "vue";
export function getMapper(mapper, mapperFn) {
  const store = useStore();
  const storeStateFns = mapperFn(mapper);
  const storeState = {};
  Object.keys(storeStateFns).forEach((fnkey) => {
    const fn = storeStateFns[fnkey].bind({ $store: store });
    storeState[fnkey] = computed(fn);
  });
  return storeState;
}
