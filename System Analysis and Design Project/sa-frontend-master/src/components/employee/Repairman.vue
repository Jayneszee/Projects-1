<template>
  <v-card class="mx-auto" elevation="24" tile max-width="600" color="secondary">
    <v-container>
      <v-card-title class="display-1">เพิ่มข้อมูลช่างซ่อมคอมพิวเตอร์</v-card-title>
    </v-container>
    <v-card-text>
      <v-form>
        <v-container>
          <v-layout wrap column>
            <v-flex xs12 md4>
              <v-text-field label="ชื่อ" v-model="repairman.firstName"></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field label="นามสกุล" v-model="repairman.lastName"></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="เพศ" :items="genders" v-model="repairman.gender"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="ตำแหน่ง" :items="positions" v-model="repairman.position"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select label="ความชำนาญ" :items="expertises" v-model="repairman.expertise"></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field label="เบอร์โทรศัพท์" v-model="repairman.phone"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary" tile @click="addRepairman">ยืนยัน</v-btn>
      </v-container>
    </v-card-actions>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn text @click="snackbar = false" color="primary">ปิด</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    expertises: [],
    positions: [],
    genders: [],
    repairman: {
      gender: null,
      firstName: null,
      lastName: null,
      position: null,
      expertise: null,
      phone: null
    },
    snackbar: false,
    message: ""
  }),
  mounted() {
    this.$http.getGender().then(response => {
      response.data.forEach(element => {
        this.genders.push({
          text: element.gender,
          value: element.id
        });
      });
    });
    this.$http.getPosition().then(response => {
      response.data.forEach(element => {
        this.positions.push({
          text: element.position,
          value: element.id
        });
      });
    });
    this.$http.getExpertise().then(response => {
      response.data.forEach(element => {
        this.expertises.push({
          text: element.expertise,
          value: element.id
        });
      });
    });
  },
  methods: {
    addRepairman: function() {
      this.$http
        .addRepairman(this.repairman)
        .then(response => {
            this.$log.debug(response.data)
          this.message = "เพิ่มพนักงานสำเร็จ";
        })
        .catch(error => {
          this.message = "ไม่สามารถเพิ่มพนักงานได้";
          this.$log.debug(error.response.data.message);
        })
        .finally(() => {
          this.snackbar = !this.snackbar;
        });
    }
  }
};
</script>