import { ref, onMounted } from "vue";
import ElementApiService from "@/services/ElementApiService";
import type { Element } from "@/types/element";

export const useElements = () => {
  const elements = ref<Element[]>([]);

  onMounted(async () => {
    const data = await ElementApiService.getElementData();
    elements.value = data;
  });

  return { elements };
};
