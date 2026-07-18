const API_URL = process.env.EXPO_PUBLIC_API_URL

export const login = async (username: string, password: string) => {

    //Login endpointi
    const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    //Eğer login başarılı değilse hata verir
    if (response.status !== 200) {
        throw new Error("Giriş başarısız");
    }
    // Başarılıysa bilgileri fırlatır
    return response
}