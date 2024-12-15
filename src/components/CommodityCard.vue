<template>
  <a-skeleton :loading="loading" active>
    <a-descriptions v-if="itemInfo" :column="1" class="item-card">
      <a-descriptions-item label="商品名">
      </a-descriptions-item>
      <a-descriptions-item label="价格">
        <span>{{ itemInfo.price }} 元</span>
      </a-descriptions-item>
    </a-descriptions>
  </a-skeleton>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import shop from "@/apis/shop";
import type { BaseCommodity } from "@/models/commodity";

const props = defineProps({
  id: String
});

const loading = ref(true);
const itemInfo = ref<BaseCommodity | null>(null);

const setItemInfo = async () => {
  try {
    const data = await shop.getCommodity(props.id as string);
    itemInfo.value = data.data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  setItemInfo();
});
</script>

<style lang="css" scoped>
.item-card {
  max-width: 400px;
}

.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
}
</style>
