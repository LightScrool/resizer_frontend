import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './ui/Layout/Layout'
import { AuthGuard, AuthProvider } from '../shared/lib/auth'

import '../shared/styles/global.scss'
import { NoAuthPage } from '../pages/no-auth-page';
import { LoaderPage } from '../pages/loader-page';
import { NotFoundPage } from '../pages/not-found-page';
import { ProjectListPage } from '../pages/project-list-page';
import { ProjectPage } from '../pages/project-page';
import { Provider } from 'react-redux';
import { store } from '../entities/redux/store';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Layout>
            <AuthGuard
              loader={<LoaderPage/>}
              noAuth={<NoAuthPage/>} 
            >
              <Routes>
                <Route path='/' element={<ProjectListPage />} />
                <Route path='/projects' element={<ProjectListPage />} />
                
                <Route path='/projects/:projectAlias' element={<ProjectPage />} />
                
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </AuthGuard>
          </Layout>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
