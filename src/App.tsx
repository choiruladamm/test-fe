import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import RootRouter from './root-router';
import Banner from './components/partials/Banner';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  return (
    <main>
      <BrowserRouter>
        <Toaster />
        <Banner />
        <RootRouter />
      </BrowserRouter>
    </main>
  );
};

export default App;
