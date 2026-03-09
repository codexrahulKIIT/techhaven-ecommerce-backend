// frontend/app/auth/login/LoginContent.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-sm text-gray-600">
            Access your TechHaven account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <LoginForm redirectTo={redirectTo} />
        </div>

        {/* Links */}
        <div className="text-center space-y-3">
          <Link
            href="/forgot-password"
            className="block text-sm text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
          <p className="text-sm text-gray-600">
            No account?{' '}
            <Link
              href={`/register?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
