/**
 * Web Crypto APIを使用して値をハッシュ化する非同期関数
 * EdgeランタイムとNode.jsの両方で動作します
 * @param value ハッシュ化する文字列
 * @returns SHA-256でハッシュ化された16進数文字列
 */
export const hashWithPepper = async (value: string): Promise<string> => {
    const pepper = process.env.AUTH_HASH_PEPPER;
    if (!pepper) throw new Error("AUTH_HASH_PEPPER is not defined in environment variables.");

    // 文字列をUint8Arrayにエンコード
    const data = new TextEncoder().encode(value + pepper);
    // SHA-256でハッシュを計算
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // ArrayBufferを16進数の文字列に変換
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
};
