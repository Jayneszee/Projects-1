<template>
  <v-card color="secondary" tile elevation="24" max-width="600" class="mx-auto" min-height="500">
    <v-card-title class="display-1">รายการแจ้งซ่อม</v-card-title>
    <v-card-text>
      <v-expansion-panels accordion v-if="orderRequest.length > 0">
        <v-expansion-panel v-for="order in orderRequest" :key="order.id">
          <v-expansion-panel-header>{{ order.requestCode }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
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
            <v-btn outlined :to="order.id.toString()" replace color="primary" tile>รายละเอียด</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <p v-else class="text-center font-weight-bold">ไม่มีการแจ้งซ่อม</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    customer: null,
    orderRequest: []
  }),
  created() {
    this.customer = Number(this.$route.params.user);
  },
  mounted() {
    this.$http.findRequestByCustomer(this.customer).then(response => {
      this.$log.debug("Data loaded:", response.data);
      response.data.forEach(element => {
        this.$http.findByRequest(element.id).then(snapshot => {
          element.requestDate = element.requestDate.split("T")[0]
          element.sentDate = element.sentDate.split("T")[0]
          this.orderRequest.push({
            ...element,
            tool: snapshot.data
          });
        });
      });
    });
  }
};
</script>