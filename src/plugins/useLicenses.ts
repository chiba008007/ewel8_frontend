import { ref } from "vue";
import LicenseApiService from "@/services/LicenseApiService";
import type { License } from "@/types/license";

export const useLicenses = () => {
  const licenses = ref<License[]>([]);

  const fetchLicenses = async () => {
    const res = await LicenseApiService.getLicenseData();
    console.log(res); // ← ここ追加
    licenses.value = Object.values(res);
  };

  return {
    licenses,
    fetchLicenses, // ← 必ず return に含める
  };
};
