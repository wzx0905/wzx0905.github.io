<template>
  <div
    v-for="(item, index) in dir"
    :key="index"
  >
    <div
      v-if="item.isDir"
    >
      <div>{{ item.name }}</div>
      <div
        v-for="(child, ind) in item.children"
        :key="ind"
        style="padding-left: 10px"
      >
        <router-link
          :to="`/ArticleDetail?path=${child.path}`"
        >
          {{ child.name }}
        </router-link>
      </div>
    </div>
    <router-link
      :to="`/ArticleDetail?path=${item.path}`"
      v-else
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import dir from '@/assets/dir.json'
</script>
