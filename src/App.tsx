import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { ConfigProvider } from 'antd';
import { ProviderTree } from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { EmailEditorProvider } from './components/EmailEditor/contexts/EmailEditorContext';
import './components/EmailEditor/assets/App.css';
import Main from './components/EmailEditor/components/Main';

const App = () => {
  const convertToPx = (value: string) => Number(value.replace('px', ''));

  const antdTheme = {
    token: {
      colorPrimary: theme.colors.primary_6,
      colorError: theme.colors.red_6,
      fontSize: convertToPx(theme.fontSizes.body),
      borderRadius: convertToPx(theme.radii.medium),
    },
  };

  // Please define your providers and their configurations here
  // note that the order of the providers is important
  // the first provider will be the outermost provider
  const providersAndConfigs = [
    createProviderConfig(ThemeProvider, { theme } as any),
    createProviderConfig(ConfigProvider, {
      theme: antdTheme,
    }),
    createProviderConfig(BrowserRouter),
    createProviderConfig(EmailEditorProvider),
  ];

  return (
    <ProviderTree providers={providersAndConfigs}>
      <AppContainer />
    </ProviderTree>
  );
};

const AppContainer = () => {
  return (
    <div style={{ width: '100vw', height: '95vh' }}>
      <Main />
    </div>
  );
};

export default App;
