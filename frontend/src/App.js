import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// defaultTheme
import themes from "./themes";
import Views from "./views";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <Views />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
