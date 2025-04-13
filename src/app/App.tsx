import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import Layout from './ui/Layout/Layout'
import { AuthGuard, AuthProvider } from '../shared/lib/auth'

import '../shared/styles/global.scss'
import { NoAuthPage } from '../pages/no-auth-page';
import { LoaderPage } from '../pages/loader-page';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AuthGuard
            loader={<LoaderPage/>}
            noAuth={<NoAuthPage/>} 
          >
            Body
          </AuthGuard>
          </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
