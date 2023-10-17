export const hashPassword = async(password: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await window.crypto.subtle.digest('SHA-256', data);

    let hashArray = Array.from(new Uint8Array(hash));
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

export const getScoreClass = (score: number) => {
    if (score < 40) return 'text-success'; // Bootstrap clase para color verde
    if (score <= 80) return 'text-warning'; // Bootstrap clase para color naranja
    return 'text-danger'; // Bootstrap clase para color rojo
};
