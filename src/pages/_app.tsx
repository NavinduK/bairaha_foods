import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../auth/JwtContext'
import AuthGuard from '../auth/AuthGuard'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        style={{marginTop:'50px'}}
        position="bottom-center"
        autoClose={3000}
        closeOnClick
      />
      <Provider store={store}>
        <AuthProvider>
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </AuthProvider>
      </Provider>
    </>
  )
}
