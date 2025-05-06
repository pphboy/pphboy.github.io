---
title: Vue横向滚动条拖动事件
date: 2023-05-29 21:30:00
---

```
<template>
  <div class="scroll-container" ref="scrollContainer"
       v-on:mousedown="handleMouseDown"
       v-on:mousemove="handleMouseMove"
       v-on:mouseup="handleMouseUp">
    <div class="scroll-content">
      <!-- 横向内容 -->
    </div>
  </div>
</template>

<style>
.scroll-container {
  overflow-x: scroll;
  white-space: nowrap;
}

.scroll-content {
  /* 横向内容样式 */
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

let isDragging = false
let startX = 0
let scrollLeft = 0

const scrollContainer = ref(null)

function handleMouseDown(event: MouseEvent) {
  isDragging = true;
  startX = event.clientX;
  scrollLeft = scrollContainer.value.scrollLeft;
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging) return;
  const x = event.clientX - startX;
  scrollContainer.value.scrollLeft = scrollLeft - x;
}

function handleMouseUp() {
  isDragging = false;
}
</script>

```