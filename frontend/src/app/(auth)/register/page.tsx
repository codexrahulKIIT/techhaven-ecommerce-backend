import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - TechHaven Electronics Store',
  description: 'Create your TechHaven account'
};

const RegisterPage = ({ searchParams }: { searchParams?: { redirect?: string } }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <RegisterForm redirectTo={searchParams?.redirect} />
      </div>
    </div>
  );
};

export default RegisterPage;
