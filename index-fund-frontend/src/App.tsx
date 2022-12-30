import { MantineProvider, Text } from '@mantine/core';
import Root from './pages/root';

export default function App() {

  return (
    <MantineProvider
      theme={{
        fontFamily: 'NeueMachina'
      }}
      withGlobalStyles 
      withNormalizeCSS>
      <Root/>
    </MantineProvider>
  );
}