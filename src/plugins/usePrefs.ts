import { ref, onMounted } from "vue";
import PrefApiService from "@/services/PrefApiService";

export const usePrefs = () => {
  const prefs = ref();

  onMounted(async () => {
    prefs.value = await PrefApiService.getPrefData();
  });

  return { prefs };
};
