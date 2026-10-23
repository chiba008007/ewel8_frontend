import { ref, onMounted } from "vue";
import PrefApiService from "@/services/PrefApiService";

export const usePrefs = () => {
  const prefs = ref<{ id: string; name: string }[]>([]);

  onMounted(async () => {
    prefs.value = await PrefApiService.getPrefData();
  });

  return { prefs };
};
