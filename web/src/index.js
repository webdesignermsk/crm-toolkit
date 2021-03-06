import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import { publicUrl } from './main/Config';
import App from './main/App';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Context } from './main/Contexts';

function GenerateTheme(theme) {
  return createMuiTheme({
    overrides: {
      MuiFormLabel: {
        asterisk: {
          display: "none", // Disable asterisk on required
        }
      }
    },
    palette: {
      type: theme, // Autochoose dark mode
    },
  })
}

function MainApp() {
  const [theme, setTheme] = useState(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const generated = React.useMemo(() => GenerateTheme(theme), [theme]);
  Context.bind('theme', [theme, setTheme]);

  return (
    <ThemeProvider theme={generated}>
      <CssBaseline />
      <BrowserRouter forceRefresh={false} basename={publicUrl}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(<MainApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
