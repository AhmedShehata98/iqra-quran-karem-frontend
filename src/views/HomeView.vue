<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <v-app-bar class="bg-amber-lighten-3" elevation="1">
    <v-app-bar-title class="logo">
      <div class="logo">
        <v-icon class="display">mdi-book-open-page-variant</v-icon>
        <h2>اقرأ</h2>
      </div>
    </v-app-bar-title>
  </v-app-bar>
  <v-container fluid class="mt-lg-16 bg-amber-lighten-4 px-lg-16">
    <v-row class="flex-column-reverse flex-lg-row mt-8 px-lg-16">
      <v-col cols="12" xs="12" sm="12" md="12" lg="7">
        <h3
          class="text-h5 text-sm-h4 text-lg-h3 text-center text-md-start font-weight-bold mt-md-16"
        >
          إِنّ هَذَا الْقُرْآنَ يِهْدِي لِلّتِي هِيَ أَقْوَمُ وَيُبَشّرُ
          الْمُؤْمِنِينَ الّذِينَ يَعْمَلُونَ الصّالِحَاتِ أَنّ لَهُمْ أَجْراً
          كَبِيراً
        </h3>
        <p
          class="text-subtitle-2 text-center text-md-start font-weight-semibold mt-6"
        >
          وأَنّ الّذِينَ لاَ يُؤْمِنُونَ بالآخرة أَعْتَدْنَا لَهُمْ عَذَاباً
          أَلِيماً [سورة الإسراء: 9، 10].
        </p>
        <v-col cols="12" md="6" lg="4" class="mt-8">
          <v-btn
            color="blue-darken-4"
            href="/reciter"
            variant="flat"
            size="x-large"
            width="30%"
            class="w-100"
            prependIcon="mdi-account-group"
            >قائمة القراء</v-btn
          >
        </v-col>

        <div
          class="w-100 d-flex items-center justify-center justify-md-start max-tablet:justify-center ga-12 mt-14 px-2"
        >
          <span class="d-flex flex-column ga-1 justify-center items-center">
            <p
              class="font-weight-bold text-h3 max-sm:text-4xl text-blue-darken-2"
            >
              144
            </p>
            <p
              class="w-fit text-h5 text-center text-blue-darken-4 font-weight-bold"
            >
              سورة
            </p>
          </span>
          <span class="d-flex flex-column ga-1 justify-center items-center">
            <p
              class="font-weight-bold text-h3 max-sm:text-4xl text-blue-darken-2"
            >
              224+
            </p>
            <p
              class="w-fit text-h5 text-center text-blue-darken-4 font-weight-bold"
            >
              قاريء
            </p>
          </span>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="10" lg="5" class="mx-auto">
        <v-img :src="moshaf" alt="moshaf.png"></v-img>
      </v-col>
    </v-row>
    <v-row class="mb-10">
      <v-col cols="12">
        <h3 class="text-h4 font-weight-bold mb-16 text-center mt-4">
          نقدم لكم
        </h3>
      </v-col>
      <v-col sm="12" md="6" lg="4" v-for="serv in services" :key="serv.id">
        <v-card elevation="tonal" color="blue-grey-darken-4" height="14rem">
          <v-card-title class="py-8 px-4 d-flex items-center ga-6">
            <v-icon size="xxx-large">
              {{ serv.icon }}
            </v-icon>
            <h4 class="">{{ serv.title }}</h4>
          </v-card-title>
          <v-card-text>
            {{ serv.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="blue-grey-lighten-4"
              >قراءة المزيد</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import moshaf from '@/assets/_saAJI62AK-4s12CAc8gU-transformed.png'
const services = [
  {
    id: 1,
    title: 'قراء مختلفون',
    icon: `mdi-account`,
    description:
      ' مجموعة كبيرة و متنوعة من اشهر القراء منعم الفراء الحدد و القراء القدامي من مختلف بلاد العالم افضل الاصوات مع نلاوات متنوعة لكل قاريء',
  },
  {
    id: 2,
    title: 'اذاعة راديو',
    icon: `mdi-radio`,
    description:
      'اذاعة راديو القرئان الكريم لقراء كثر باصوات عطرة اذاعات من بلاد مختلفة ',
  },
  {
    id: 3,
    title: 'محطات تليفزيونية',
    icon: `mdi-television `,
    description:
      'محطات اذاعة قرءان كريم مباشرة لاشهر قنوات القرءان الكريم في العالم العربي مترجمة بمعظم اللغات',
  },
  {
    id: 4,
    title: 'تدبر',
    icon: `mdi-head-snowflake`,
    description: ' تدبر في ايات الفرءان الكريم و فهم الايات و العمل بها  ',
  },
]
</script>
<style scoped lang="css">
.logo {
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 0.7rem;
}
</style>
