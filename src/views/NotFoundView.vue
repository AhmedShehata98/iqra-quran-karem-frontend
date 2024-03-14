<template>
  <div class="about">
    <div>
      <v-alert
        type="error"
        title="صفحة غير متوفرة"
        text="عفوا , الصفحة التي تبحث عنها غير متوفرة بموقعنا برجاء الرجوع الي الرئيسية او صفحة القراء"
        class="mt-4"
      >
      </v-alert>
      <v-row class="mt-10">
        <v-col cols="12" md="6">
          <v-btn block color="teal-darken-2" size="large" href="/reciter"
            >القراء</v-btn
          >
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block color="teal-darken-2" size="large" href="/"
            >الرئيسية</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
}
</style>
