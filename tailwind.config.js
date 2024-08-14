import { _backgroundColor } from "#tailwind-config/theme";

module.exports = {
  content: [
    "components/**/*.{vue,js}",
    "pages/**/*.vue",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundColor: {
        dark_gray: "#212429",
        cyan_color: "#3BCDBD",
        light_turquoise: "#3DD5C5",
      },
      colors: {
        dark_gray: "#212429",
        white_sections: "#FFFFFF",
        steel_gray_contrast: "#24272C",
        cyan_color: "#3BCDBD",
        light_turquoise: "#3DD5C5",
        aqua_color: "#3BCEBE",
        violet_color: "#765CF3"
      },
      shadowColor: {
        very_dark_gray: "#202328",
        charcoal_gray_deep: "#181B20",
      },
      fontFamily: {
        logo: "Raleway",
        heading: "Raleway",
        copy: "Roboto",
      },
    },
  },
}