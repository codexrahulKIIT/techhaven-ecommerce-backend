// frontend/app/b2b/request/page.tsx
"use client";

import B2BForm from "@/components/b2b/B2BForm";

export default function B2BRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Bulk & Custom Order Request</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Need a large quantity or custom specifications? Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>
      
      <B2BForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Questions? Contact us at <a href="mailto:b2b@yourcompany.com" className="text-blue-600 hover:underline">b2b@yourcompany.com</a></p>
      </div>
    </div>
  );
}