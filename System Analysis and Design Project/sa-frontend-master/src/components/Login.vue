<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-3" tile color="secondary">
              <v-flex shrink class="mx-auto">
                <v-img
                  height="275"
                  src="https://images.unsplash.com/photo-1516315720917-231ef9acce48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
                />
              </v-flex>
              <v-flex>
                <v-card-title>เข้าสู่ระบบ</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="อีเมล์"
                      name="login"
                      prepend-icon="person"
                      type="text"
                      v-model="user.email"
                    ></v-text-field>

                    <v-text-field
                      label="รหัสผ่าน"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="user.password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text tile to="/register">สมัครสมาชิก</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.prevent="login" tile type="submit">เข้าสู่ระบบ</v-btn>
                </v-card-actions>
              </v-flex>
              <v-snackbar v-model="snackbar">
                {{ message }}
                <v-btn text color="primary" @click="snackbar = !snackbar">ปิด</v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
    snackbar: false,
    message: ""
  }),
  methods: {
    login: function() {
      this.$http.loginCustomer(this.user)
        .then(response => {
          if (this.user.email === "admin" && this.user.password === "admin") {
            this.$router.push('/employee/admin')
          }
          if (response.data.id) {
            this.$log.debug(response.data.message, this.user.email);
            this.$router.push("/customer/" + response.data.id);
          } else {
            this.$log.debug(response.data.message);
          }
          this.message = response.data.message;
        })
        .catch(error => {
          this.$log.debug("Invalid Email or Password", error);
        })
        .finally(() => {
          this.snackbar = !this.snackbar;
        });
    }
  }
};
</script>


