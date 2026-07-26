// API'nin base URL'i .env dosyasından okunuyor, ortama göre (dev/prod) değişebilsin diye kod içine sabit yazılmadı.
const API_URL = process.env.EXPO_PUBLIC_API_URL

/**
 * Kullanıcı adı ve şifre ile login isteği atar.
 * Başarılı olursa API'den dönen kullanıcı bilgilerini (JSON) döndürür.
 * @param username Kullanıcı adı
 * @param password Şifre
 * @throws Giriş başarısız olursa (status 200 değilse) hata fırlatır
 */
export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.status !== 200) {
        throw new Error("Giriş başarısız" + " " + response);
    }

    return await response.json()
}