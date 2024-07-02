"use server";

import { redirect, useRouter } from 'next/navigation'
import { error } from 'console';
import { FieldValues } from 'react-hook-form';
import { BASE_URL } from '@/util/constants';
import { getCookie, setCookie } from 'cookies-next';

export async function getUserAuthenticated() {
    // const sessionCookies = cookies();
    // const token = sessionCookies.get('token');
    const token = getCookie('token');
    if (!token || token === null) {
        return null
    }
    const response = await fetch(`${BASE_URL}/user/v1/me`, {headers: {"Authorization": `Bearer ${token}`}});
    const user = await response.json();
    console.log(user);
    return user;
}
export async function logout() {
    // const sessionCookies = cookies();
    // sessionCookies.delete("token");
    const router = useRouter()
    router.push("/")
}

export const login = async (formData: FieldValues) => {
    'use server';
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({email: formData.email, password: formData.password})
    })
    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // const cookieStore = cookies()
        setCookie('token', token, { expiresIn: Date.now() + data.expiresIn});
        // redirect("/");
    } else {
        const message = await response.text();
        throw new Error(message);
    }
}

export const signUp = async(formData: FieldValues) => {
    'use server'    
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({
            email: formData.email, 
            password: formData.password, 
            cellphoneNumber: formData.cellphoneNumber, 
            fullName: formData.fullName,
            avatarUrl: "https://img.freepik.com/fotos-gratis/avatar-androgino-de-pessoa-queer-nao-binaria_23-2151100226.jpg?w=1380&t=st=1719013625~exp=1719014225~hmac=87ad51a52ff37eb9031b410485e454b188a9d38ff7286bed7bcb08699a095faf"
        })
    })
    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const router = useRouter()
        router.push("/login")
    } else {
        const message = await response.text();
        throw new Error(message);
    }
}