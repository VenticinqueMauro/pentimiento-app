import LoginForm from '@/components/auth/loginform'
import { decodeToken } from '@/utils/utils';
import { redirect } from 'next/navigation';
import React from 'react'

export default function page() {

    const userSession = decodeToken();

    if ('email' in userSession) {
        redirect('/dashboard');
    }

    return <LoginForm />;
}
