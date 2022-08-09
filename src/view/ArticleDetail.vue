<template>
  <div>
    {{ detail }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const detail = ref()
import(String(route.query.path)).then(data => {
  detail.value = data.default
})
</script>
