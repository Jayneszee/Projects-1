<template>
  <v-dialog v-model="dialog" scrollable persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" tile>เลือกอุปกรณ์</v-btn>
    </template>

    <v-card tile elevation="24">
      <v-card-title>อุปกรณ์</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="tools"
          item-key="id"
          show-select
          v-model="selected"
        ></v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false" tile>ยกเลิก</v-btn>
        <v-btn color="primary" tile @click="selectTool">เลือกอุปกรณ์</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "รหัสสินค้า",
        value: "id"
      },
      {
        text: "ชื่อสินค้า",
        value: "name"
      },
      {
        text: "ราคา",
        value: "price"
      },
      {
        text: "ประเภทอุปกรณ์",
        value: "type"
      }
    ],
    tools: [],
    selected: [],
  }),
  methods: {
    selectTool: function() {
      this.$emit("addTool", this.selected);
      this.selected = []
      this.dialog = false
    }
  },
  mounted() {
    this.$http.getTool().then(response => {
      this.$log.debug("Data loaded: ", response.data);
      response.data.forEach(element => {
        this.tools.push({
          id: element.id,
          name: element.name,
          price: element.price + " บาท",
          type: element.type.type
        });
      });
    });
  }
};
</script>