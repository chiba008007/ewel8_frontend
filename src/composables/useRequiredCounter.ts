import { computed, watch, Ref } from "vue";

type Getter = () => unknown;

export const useRequiredCounter = (
  requiredFields: Getter[],
  target: Ref<number>
) => {
  const remaining = computed(() => {
    return requiredFields.filter((getter) => !getter() || getter() === "")
      .length;
  });

  watch(
    remaining,
    (count) => {
      target.value = count;
    },
    { immediate: true }
  );
};
