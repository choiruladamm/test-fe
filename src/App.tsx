import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import RootRouter from './root-router';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  return (
    <main>
      <BrowserRouter>
        <Toaster />
        <RootRouter />
      </BrowserRouter>
    </main>
  );
};

export default App;
