import { createTheme } from "@mui/material/styles";

// assets
import colors from "../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const theme = () => {
  let color = colors;

  const themeOption = {
    colors: color,
    heading: color.darkTextTitle,
    paper: color.darkLevel2,
    backgroundDefault: color.darkPaper,
    background: color.darkBackground,
    darkTextPrimary: color.darkTextPrimary,
    darkTextSecondary: color.darkTextSecondary,
    textDark: color.darkTextPrimary,
    menuSelected: color.darkSecondaryMain,
    menuSelectedBack: color.darkSecondaryMain + 15,
    divider: color.darkTextPrimary,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    navType: "dark",
    presetColor: color.presetColor,
  };

  const themeOptions = {
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
