<template>
  <v-card color="secondary" tile elevation="24" max-width="600" class="mx-auto" min-height="500">
    <v-card-title class="display-1">รายการแจ้งซ่อม</v-card-title>
    <v-card-text>
      <v-list v-for="order in orders" :key="order.id">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ order.requestCode }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>อาการของคอมพิวเตอร์: {{ order.symptom }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ยี่ห้อ: {{ order.brand.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ชนิดของคอมพิวเตอร์: {{ order.computerType.type }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>วันที่แจ้งซ่อม: {{ order.requestDate }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>วันที่ส่งซ่อม: {{ order.sentDate }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Email: {{ order.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>เบอร์โทรศัพท์: {{ order.phone }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-if="order.tool.length > 0">
          <template v-slot:activator>
            <v-list-item-title>อุปกรณ์หรือ Software ที่ติดตั้ง</v-list-item-title>
          </template>
          <v-list-item v-for="(tool, index) in order.tool" :key="tool.id">
            <v-list-item-content>
              <v-list-item-title>{{ index + 1 }}. {{ tool.name }}</v-list-item-title>
              <v-list-item-subtitle>ชนิด {{ tool.type.type }}</v-list-item-subtitle>
              <v-list-item-action>{{ tool.price }} บาท</v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    orders: []
  }),
  mounted() {
    this.$http
      .findRequestById(Number(this.$route.params.req))
      .then(response => {
        response.data.requestDate = response.data.requestDate.split("T")[0];
        response.data.sentDate = response.data.sentDate.split("T")[0];
        this.$http
          .findByRequest(Number(this.$route.params.req))
          .then(snapshot => {
            this.orders.push({
              tool: snapshot.data,
              ...response.data
            });
          });
        this.$log.debug("Data loaded:", this.orders);
      });
  }
};
</script>