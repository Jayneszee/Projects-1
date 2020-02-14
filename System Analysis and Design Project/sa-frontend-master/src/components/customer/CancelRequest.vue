<template>
  <v-card class="mx-auto" elevation="24" tile max-width="600" color="secondary">
    <v-container>
      <v-card-title class="display-1">ยกเลิกแจ้งซ่อม</v-card-title>
    </v-container>
    <v-card-text>
      <v-form>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12 md4>
              <v-select label="ID แจ้งซ่อม" v-model="cancel.request" :items="requests"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="สาเหตุ" v-model="cancel.cancelationCause" :items="cancelationCauses"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="วิธีส่งคืนสินค้า" v-model="cancel.productReceive" :items="productReceives"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary" tile @click="addCancelRequest">ยกเลิกแจ้งซ่อม</v-btn>
      </v-container>
    </v-card-actions>
    <v-snackbar v-model="snackbar">
      {{ message }} <v-btn text tile color="primary" @click="snackbar = false">ปิด</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    requests: [],
    cancelationCauses: [],
    productReceives: [],
    cancel: {
      customerId: '',
      request: null,
      cancelationCause: null,
      productReceive: null
    },
    message: '',
    snackbar: false
  }),
  mounted() {
    this.cancel.customerId = this.$route.params.user;
    this.$http.getAllProductReceiveTypes().then(response => {
      response.data.forEach(element => {
        this.productReceives.push({
          text: element.type,
          value: element.id
        })
      })
    })
    this.$http.getCancelationCauses().then(response => {
      response.data.forEach(element => {
        this.cancelationCauses.push({
          text: element.cause,
          value: element.id
        })
      })
    })
    this.$http.findRequestByCustomer(Number(this.$route.params.user)).then(response => {
      response.data.forEach(element => {
        this.requests.push({
          text: element.requestCode,
          value: element.id
        })
      })
    })
  },
  methods: {
    addCancelRequest: function () {
      this.$http.addCancelRepair(this.cancel).then(response => {
        this.$log.debug("Add Cancel Request Complete:", response.data)
        this.message = 'ยกเลิกสำเร็จ'
      
      }).catch(error => {
        this.$log.debug(error.response.data.message)
        this.message = 'ไม่สามารถยกเลิกได้'
      }).finally(() => {
        this.snackbar = !this.snackbar
      })
    }
  }
};
</script>