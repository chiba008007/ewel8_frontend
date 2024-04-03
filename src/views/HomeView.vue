<script setup lang="ts">
import { useStoreUser } from "../store/user";

const user = useStoreUser();
</script>
<template>
  <div>aaa{{ user.count }}</div>
</template>
