import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

function Root() {
  useEffect(() => {
    if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy | AZPNPrinting HQ'
      return
    }

    if (currentPath !== '/') return

    const privacyLink = Array.from(document.querySelectorAll('footer a')).find(
      (link) => link.textContent.trim() === 'Privacy Policy',
    )

    if (privacyLink) {
      privacyLink.setAttribute('href', '/privacy-policy')
    }
  }, [])

  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy />
  }

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
