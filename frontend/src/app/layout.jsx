import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import {Providers} from "./providers";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Images cloud',
  description: 'Upload images and store them in the cloud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
