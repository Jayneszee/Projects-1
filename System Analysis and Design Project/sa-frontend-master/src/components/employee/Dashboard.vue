<template>
  <v-app>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">พนักงาน</span>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped temporary color="deep-orange lighten-5">
      <v-list dense class="deep-orange lighten-5">
        <v-layout align-center>
          <v-flex xs6>
            <v-subheader>จัดการ</v-subheader>
          </v-flex>
        </v-layout>

        <v-list-item link to="payment">
          <v-list-item-action>
            <v-icon>list_alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">ชำระเงิน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="repairman">
          <v-list-item-action>
            <v-icon>add_circle_outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">เพิ่มช่างซ่อม</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider dark class="my-4"></v-divider>
      <v-list dense class="deep-orange lighten-5">
        <v-layout align-center>
          <v-flex xs6>
            <v-subheader>ระบบ</v-subheader>
          </v-flex>
        </v-layout>
        <v-list-item link to="/login">
          <v-list-item-action>
            <v-icon>clear</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">ออกจากระบบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex>
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
              <router-view />
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>

