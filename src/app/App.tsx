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
import { ActWithConfirmationProvider } from '../shared/lib/act-with-confirmation';
import { PresetsListPage } from '../pages/presets-list-page';
import { ImagesListPage } from '../pages/images-list-page';
import { usePingBackend } from '../shared/lib/network/use-ping-backend';

function App() {
  usePingBackend();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <ActWithConfirmationProvider>
            <Layout>
              <AuthGuard
                loader={<LoaderPage/>}
                noAuth={<NoAuthPage/>} 
              >
                <Routes>
                  <Route path='/' element={<ProjectListPage />} />
                  <Route path='/projects' element={<ProjectListPage />} />
                  
                  <Route path='/projects/:projectAlias' element={<ProjectPage />}>
                    <Route index element={<PresetsListPage />}/>
                    <Route path='presets' element={<PresetsListPage />}/>
                    <Route path='images' element={<ImagesListPage />}/>
                  </Route>
                  
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </AuthGuard>
            </Layout>
          </ActWithConfirmationProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
