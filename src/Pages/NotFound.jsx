import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div class="min-h-screen flex items-center justify-center bg-primary-black">
            <div class="max-w-md w-full text-center">
                <h1 class="text-4xl font-bold font-anta text-primaryWhite">404 - Page Not Found</h1>
                <p class="mt-4 text-lg text-primaryOrange">Oops! Looks like you're lost.</p>
                <Link to="/" class="mt-8 inline-block px-6 py-3 rounded-full text-primary border border-primary-gray">Go Home</Link>
            </div>
        </div>
    )
}
