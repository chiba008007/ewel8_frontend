<script setup lang="ts">
import { ref } from "vue";
import { useStoreUser } from "../store/user";
import SampleApiService from "@/services/SampleApiService";
const user = useStoreUser();
const sampleLists = ref<object>();
SampleApiService.getAll()
  .then((res) => {
    console.log(res.data.products);
    sampleLists.value = res.data.products;
  })
  .catch((error) => {
    console.log(error);
  });
</script>
<template>
  <div>aaa{{ user.count }}</div>
  <hr />
  <div v-for="item in sampleLists" :key="item">
    <p>{{ item["id"] }}--{{ item["title"] }}</p>
  </div>
</template>
