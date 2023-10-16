import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { LayoutProvider } from '@/context/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
    </LayoutProvider>
  )
}