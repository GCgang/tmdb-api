import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './Router';
import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import normalize from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}   
  *{box-sizing:border-box}
  a{text-decoration:none; color:inherit}
  ul{list-style:none;padding:0;}
  body{ font-family: 'Noto Sans KR', sans-serif; color:#fff; background-color: #000; overflow-x:hidden;}
  button {outline:none;border:0 none; background-color:transparent;cursor: pointer;}
  h4{margin:0}
`;

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
