// Set login cookie
export function setLoginCookie(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
}

// Set cookie data
export function setCookieData(key: string, data: any) {
    if (typeof window === "undefined") return;
    if (!data) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
}

// Get cookie data
export function getCookieData(key: string) {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
}

// Remove cookie data
export function removeCookieData(key: string) {
    localStorage.removeItem(key);
}

// Get login cookie
export function getLoginCookie() {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
}

// Remove login cookie
export function removeLoginCookie() {
    localStorage.removeItem('user');
}

// Check if user is logged in
export function isLoggedIn() {
    if (typeof window !== "undefined") {
        return !!getLoginCookie();
    }
    return false;
}

// Add wishlist count
// export function addWishlistCount(action: string = 'add') {
//     const current_count: any = localStorage.getItem('wishlist_count') || 0;
//     localStorage.setItem('wishlist_count', current_count);

//     // Update count for div class
//     const wishlist_count_div = document.getElementById('wishlist_count');
//     if (wishlist_count_div) {
//         wishlist_count_div.textContent = current_count.toString();
//     }
// }

// Find tour exist in wishlist
export function findTourInWishlist(tour_id: number) {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist).includes(tour_id) : false;
}

// Update header count
export function updateHeaderWishlistCount() {
    // Get wishlist from local storage
    const wishlist = localStorage.getItem('wishlist');

    // Update count for div class
    const wishlist_count_div = document.getElementById('wishlist_count');

    // Update count
    if (wishlist_count_div) {
        wishlist_count_div.textContent = wishlist ? JSON.parse(wishlist).length.toString() : '0';
    }
}

// Get wishlist count
export function getWishlistCount() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist).length : 0;
}

// Add cart data
export function addCartData(cart_id: string) {
    localStorage.setItem('cart_id', cart_id);
}

// Get cart data
export function getCartData() {
    return localStorage.getItem('cart_id');
}

// Delete cart data
export function deleteCartData() {
    localStorage.removeItem('cart_id');
}