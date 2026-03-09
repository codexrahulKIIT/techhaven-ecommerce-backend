// frontend/app/auth/login/page.tsx
import { Suspense } from 'react'
import LoginContent from './LoginContent'

export const metadata = {
  title: 'Login - TechHaven',
  description: 'Sign in to your TechHaven account'
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}