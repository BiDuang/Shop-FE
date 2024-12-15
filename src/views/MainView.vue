<template>
  <main class="main" :style="{ width: $route.meta.expand ? '100%' : '1200px' }">
    <div class="content">
      <div class="content-title">首页</div>
      <a-spin tip="正在加载，请稍候..." :spinning="isLoading" class="absoulte-spin" />
      <CommodityList :item-list="itemList" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import shop from "@/apis/shop";
import CommodityList from "@/components/CommodityList.vue";
import type { BaseCommodity } from "@/models/commodity";
import useToggle from "@/utils/useToggle";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

const { val: isLoading, set: setLoading } = useToggle(false);

const itemList = ref<BaseCommodity[]>([]);

onMounted(() => {
  getCommodites();
});

const getCommodites = async () => {
  try {
    setLoading(false);
    const data = await shop.getAllCommodities();
    if (data.data) {
      itemList.value = data.data;
    } else
      throw new Error;
  }
  catch {
    message.error("获取商品列表失败");
  }
  finally {
    setLoading(false);
  }
}

</script>

<style scoped>
#lightbox {
  width: 1200px;
  margin: 15px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.banner {
  width: 15vw;
  margin: 15px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 350px;
  line-height: 350px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}
</style>
