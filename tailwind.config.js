/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: {
            100: "#FFFFFF",
            200: "#EFEFEF",
            300: "#D9D9D9",
          },
          secondary: {
            100: "#FAF3D9",
            200: "#F6E6B4",
            300: "#E6CC89",
            400: "#CEAD66",
            500: "#AE8539",
            600: "#956B29",
            700: "#7D541C",
            800: "#643F12",
            900: "#532F0A",
          },
          third: {
            100: "#DBE7F5",
            200: "#B9CFEC",
            300: "#86A0C6",
            400: "#54698E",
            500: "#1F2B43",
            600: "#162139",
            700: "#0F1830",
            800: "#091026",
            900: "#050B20",
          },
          success: {
            100: "#CDFBCE",
            200: "#9DF7A7",
            300: "#69E784",
            400: "#42D06F",
            500: "#10B253",
            600: "#0B9954",
            700: "#088051",
            800: "#05674B",
            900: "#035545",
          },
          warning: {
            100: "#FAFCCA",
            200: "#F5F997",
            300: "#E7EE62",
            400: "#D4DE3A",
            500: "#BCC904",
            600: "#A0AC02",
            700: "#859002",
            800: "#6A7401",
            900: "#576000",
          },
          danger: {
            100: "#FCE5D1",
            200: "#FAC5A5",
            300: "#F29A76",
            400: "#E67253",
            500: "#D63820",
            600: "#B81F17",
            700: "#9A1013",
            800: "#7C0A16",
            900: "#660617",
          },
        },
      },
      screens: {
        tablet: "992px",
      },
    },
  },
  plugins: [],
};