<template>
  <v-container>
    <v-card class="mx-auto" elevation="24" tile max-width="600" color="secondary">
      <v-container>
        <v-card-title class="display-1">สมัครสมาชิก</v-card-title>
      </v-container>
      <v-card-text>
        <v-form>
          <v-container>
            <v-layout wrap column>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="ชื่อ" v-model="customer.firstname"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="สกุล" v-model="customer.lastname"></v-text-field>
                </v-col>
              </v-row>
              <v-flex xs12 md4>
                <v-text-field label="อีเมล์" v-model="customer.email"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="รหัสผ่าน" v-model="customer.password" type="password"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-select label="ประเภทลูกค้า" :items="customerTypes" v-model="customer.customerType"></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select label="เพศ" :items="genders" v-model="customer.gender"></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="เบอร์โทรศัพท์" v-model="customer.phone"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-select label="จังหวัด" :items="provinces" v-model="customer.province"></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-textarea label="ที่อยู่" v-model="customer.address"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text tile class="ml-5" to="/login">กลับ</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" tile class="mr-5" @click="addCustomer">สมัครสมาชิก</v-btn>
      </v-card-actions>
      <v-snackbar v-model="snackbar">
        {{ message }}<v-btn text @click="snackbar = false" color="primary">ปิด</v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    genders: [],
    customerTypes: [],
    provinces: [],
    customer: {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      gender: null,
      customerType: null,
      phone: null,
      province: null,
      address: null
    },
    snackbar: false,
    message: ''
  }),
  mounted() {
    this.$http.getGender().then(response => {
      response.data.forEach(element => {
        this.genders.push({
          text: element.gender,
          value: element.id
        })
      })
    })
    this.$http.getProvince().then(response => {
      response.data.forEach(element => {
        this.provinces.push({
          text: element.province,
          value: element.id
        })
      })
    })
    this.$http.getCustomerType().then(response => {
      response.data.forEach(element => {
        this.customerTypes.push({
          text: element.type,
          value: element.id
        })
      })
    })
  },
  methods: {
    addCustomer: function () {
      this.$http.register(this.customer).then(response => {
        this.$log.debug(response.data)
        this.message = 'สมัครสำเร็จ'
      }).catch(error => {
        this.message = 'ไม่สามารถสมัครได้'
        this.$log.debug(error.response.data.message)
      }).finally(() => {
        this.snackbar = !this.snackbar
      })
    }
  }
};
</script>