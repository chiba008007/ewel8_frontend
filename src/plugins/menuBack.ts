import type { Router } from "vue-router";

export const onMenuBack = (router: Router, k: unknown) => {
  const normalized: string | string[] = Array.isArray(k)
    ? k.filter((v): v is string => typeof v === "string")
    : typeof k === "string"
    ? k
    : "";

  router.push({
    name: "examList",
    query: { k: normalized },
  });
};
