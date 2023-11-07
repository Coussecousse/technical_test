export async function generateRandomId() {
    const maxNumber = 99999;
    return Math.floor(Math.random() * maxNumber);
}

