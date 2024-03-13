export const hash = async (str: string): Promise<string> => {
    const hash = await crypto.subtle
        .digest("SHA-256", new TextEncoder().encode(str));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}