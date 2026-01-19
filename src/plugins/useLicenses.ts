import { ref, onMounted } from "vue";
import LicenseApiService from "@/services/LicenseApiService";
import type { License } from "@/types/license";

export const useLicenses = () => {
  const licenses = ref<License[]>([]);

  onMounted(async () => {
    licenses.value = await LicenseApiService.getLicenseData();
  });

  return { licenses };
};
