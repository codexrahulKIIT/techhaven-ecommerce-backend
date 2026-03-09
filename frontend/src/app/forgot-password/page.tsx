export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Forgot Password</h1>
        <p className="text-gray-600 mb-6">Password reset is handled by support for now. Contact us at support@techhaven.com.</p>
        <a href="mailto:support@techhaven.com" className="inline-flex bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">Email Support</a>
      </div>
    </div>
  )
}
