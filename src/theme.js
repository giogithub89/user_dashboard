import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//#33C6B6
//rgb(51,198,182)

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#3a7db5",
          200: "#2e597d",
          300: "#244159",
          400: "#1c3142",
          500: "#13212d",
          600: "#0f1a24",
          700: "#0b141b",
          800: "#080d12", //chat sidebar and navbar
          900: "#040709", //sidebar bg
          1000: "#0f1a24",
        },
        secondary: {
          100: "#d6f4f0",
          200: "#ade8e2",
          300: "#85ddd3",
          400: "#5cd1c5",
          500: "#33c6b6",
          600: "#299e92", //add interesse btn verde/verde
          700: "#1f776d",
          800: "#144f49",
          900: "#0a2824",
        },
        black: {
          100: "#000000",
          200: "#111111",
          300: "#4d4d4d",
          400: "#666666",
          500: "#808080",
          600: "#999999",
          700: "#b3b3b3",
          800: "#999999",
          900: "#e6e6e6",
        },
        white: {
          100: "#ffffff",
          500: "#ffffff",
          900: "#ffffff",
        },
        blue: {
          100: "#cceaff",
          200: "#99d5ff",
          300: "#66c0ff",
          400: "#33abff",
          500: "#0096ff",
          600: "#0078cc",
          700: "#005a99",
          800: "#003c66",
          900: "#bb00ff",
        },
        yellow: {
          100: "#fff3cc",
          200: "#ffe799",
          300: "#ffdb66",
          400: "#ffcf33",
          500: "#ffc300", //user badge
          600: "#cc9c00",
          700: "#997500",
          800: "#664e00",
          900: "#332700",
        },
        teal: {
          100: "#cfecce",
          200: "#9fd89d",
          300: "#70c56d",
          400: "#40b13c", //divulgatore badge
          500: "#109e0b",
          600: "#0d7e09",
          700: "#0a5f07",
          800: "#063f04",
          900: "#032002",
        },
        pink: {
          100: "#f2d4e0",
          200: "#e5a8c1",
          300: "#d77da3",
          400: "#ca5184",
          500: "#bd2665", //business badge
          600: "#971e51",
          700: "#71173d",
          800: "#4c0f28",
          900: "#260814",
        },
      }
    : {
        primary: {
          100: "#040709",
          200: "#080d12",
          300: "#0b141b",
          400: "#f4f4f4",
          500: "#13212d",
          600: "#fff3cc", //primary 600/ sec 300 sidebar menu hover
          700: "#717a81",
          800: "#f4f4f4", //chat sidebar and navbar
          900: "#ffc300", //sidebar bg blu scuro/ verde
          1000: "#fcfcfc",
        },
        secondary: {
          100: "#33c6b6",
          200: "#144f49",
          300: "#1f776d",
          400: "#299e92",
          500: "#0a2824",
          600: "#5cd1c5", //add interesse btn verde/verde
          700: "#85ddd3",
          800: "#ade8e2",
          900: "#d6f4f0",
        },
        black: {
          100: "#e6e6e6",
          200: "#999999",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#111111",
          900: "#000000",
        },
        white: {
          100: "#001e33",
          500: "#ffffff",
          900: "#111111",
        },
        blue: {
          100: "#001e33",
          200: "#003c66",
          300: "#005a99",
          400: "#0078cc",
          500: "#0096ff",
          600: "#33abff",
          700: "#66c0ff",
          800: "#99d5ff",
          900: "#cd42ff",
        },
        yellow: {
          100: "#332700",
          200: "#664e00",
          300: "#997500",
          400: "#cc9c00",
          500: "#000000",
          600: "#ffcf33",
          700: "#ffdb66",
          800: "#ffe799",
          900: "#fff3cc",
        },
        teal: {
          100: "#cfecce",
          200: "#9fd89d",
          300: "#70c56d",
          400: "#40b13c", //divulgatore badge
          500: "#109e0b",
          600: "#0d7e09",
          700: "#0a5f07",
          800: "#063f04",
          900: "#032002",
        },
        pink: {
          100: "#f2d4e0",
          200: "#e5a8c1",
          300: "#d77da3",
          400: "#ca5184",
          500: "#bd2665", //business badge
          600: "#971e51",
          700: "#71173d",
          800: "#4c0f28",
          900: "#260814",
        },
      }),
});

// mui global theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.yellow[500],
            },
            neutral: {
              dark: colors.black[700],
              main: colors.black[500],
              light: colors.black[100],
            },
            background: {
              default: colors.primary[600],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.yellow[500],
            },
            neutral: {
              dark: colors.black[700],
              main: colors.black[500],
              light: colors.black[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
