import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Convert string to slug
export function slugify(text: string) {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Convert slug to capitalize string
export function capitalize(str: string) {
    if (!str) return '';
    str = str.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format only date
export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

// Format number format
export function formatPrice(price: any, decimal = 2) {
    // Format price
    const formattedPrice = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: 2,
    }).format(price);

    // Return formatted price
    return formattedPrice
}

// Email validator
export function isValidEmail(email: string) {
    // Check format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check include "text", "demo", "mailinator.com", "dummy" word
    const emailRegex2 = /text|demo|mailinator|dummy/;
    if (emailRegex2.test(email)) return false;

    return emailRegex.test(email);
}

// Phone validator
export function isValidPhone(phone: string) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

// Convert json to object
export function helperCovertJsonParse(data: any) {
    return typeof data === "string" ? JSON.parse(data) : data;
}