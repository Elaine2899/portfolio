// Lucide icon helper with CDN fallback safeguard
export function safeCreateIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icon library is not defined (CDN offline or blocked).');
    }
}
