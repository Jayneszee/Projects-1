<template>
  <v-card class="mx-auto" elevation="24" tile max-width="600" color="secondary">
    <v-container>
      <v-card-title class="display-1">ชำระเงิน</v-card-title>
    </v-container>
    <v-card-text>
      <v-form>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12 md4>
              <v-select label="รายชื่อพนักงาน" :items="repairmen" v-model="payment.repairman"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="รายการแจ้งซ่อม" :items="requests" v-model="payment.request"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="ประเภทการชำระเงิน" :items="paymentTypes" v-model="payment.paymentType"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="payment.fee" label="ค่าปรับ" type="number"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary" tile @click="addPayment">ชำระเงิน</v-btn>
      </v-container>
    </v-card-actions>
    <v-snackbar v-model="snackbar">
      {{ message }} <v-btn text color="primary" tile @click="snackbar = false">ปิด</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    paymentTypes: [],
    requests: [],
    repairmen: [],
    payment: {
      request: null,
      repairman: null,
      paymentType: null,
      fee: null
    },
    message: '',
    snackbar: false
  }),
  mounted() {
    this.$http.getRepairman().then(response => {
      response.data.forEach(element => {
        this.repairmen.push({
          text: `${element.firstName} ${element.lastName}`,
          value: element.id
        })
      })
    })
    this.$http.findRequestAll().then(response => {
      response.data.forEach(element => {
        this.requests.push({
          text: element.requestCode,
          value: element.id
        })
      })
    })
    this.$http.getAllPaymentType().then(response => {
      response.data.forEach(element => {
        this.paymentTypes.push({
          text: element.type,
          value: element.id
        })
      })
    })
  },
  methods: {
    addPayment: function () {
      this.$http.addPayment(this.payment).then(response => {
        this.$log.debug("Add Payment Complete:", response.data)
        this.message = "ชำระเงินสำเร็จ"
      }).catch(error => {
        this.$log.debug(error.response.data.message);
        this.message = "ชไม่สามารถชำระเงินได้"
      }).finally(() => {
        this.snackbar = !this.snackbar
      })
    }
  }
};
</script>

