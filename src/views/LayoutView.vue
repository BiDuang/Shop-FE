<template>
  <header id="header">
    <div id="header-content" :style="{ width: $route.meta.expand ? '100%' : '1200px' }">
      <div id="main-title">
        <router-link to="/" class="nav-link">Shopping Mall</router-link>
      </div>
      <div id="route-title">
        {{ $route.meta.title }}
      </div>

      <div id="user-bar">
        <a-avatar size="large">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <a-dropdown :trigger="['click']" v-if="userStore.isLogined()">
          <div id="bar-username" class="nav-link btn-link" @click.prevent>
            {{ userStore.username }}
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/user">个人资料</router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/favor">购物车</router-link>
              </a-menu-item>
              <a-menu-item>
                <span @click="handleLogout">退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <router-link v-else to="/login" class="nav-link btn-link">登录</router-link>
      </div>
    </div>
  </header>
  <router-view />

</template>

<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import useUserStore from "@/stores/user";
import { message } from "ant-design-vue";
import { onMounted } from "vue";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  console.log(userStore);
  if (!userStore.isLogined()) {
    if (localStorage.token) {
      try {
        if (await userStore.update()) {
          console.log("Login from token success");
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }
});

const handleLogout = () => {
  userStore.logout();
  message.info("已退出登录");
  router.push("/");
};

</script>
<style lang="css">
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
}

#header-content {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#main-title {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.nav-link {
  padding: 0 16px;
  text-decoration: none;
  color: #1f1f1f;
  transition: 0.28s background-color cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-link {
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #eeeeee;
}

#user-bar {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 16px;
}

#footer {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 16px;
}

#bar-username {
  padding: 0 8px;
  cursor: pointer;
}

.main {
  flex-grow: 1;
  align-self: center;
  display: flex;
  margin-top: 64px;
}

.content {
  flex-grow: 1;
  background-color: #ffffff;
  margin: 16px 16px 0 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.content-title {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.absoulte-spin {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.relative-spin {
  position: relative !important;
  left: 50%;
  transform: translate(-50%, 0);
}

#route-title {
  display: none;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 15px;
}

@media (max-width: 1200px) {
  #header-content {
    width: 100vw;
  }

  .main {
    width: 100% !important;
  }

  .content {
    margin: 0;
    border-radius: 0;
    border-top: 1px solid #e0e0e0;
  }

  #footer {
    border-top: 1px solid #e0e0e0;
    background-color: #ffffff;
  }

  .content-title {
    display: none;
  }

  #route-title {
    display: inline;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
}
</style>
