import clientPromise from "../../../lib/mongodb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    // POSTリクエストの場合
    if (req.method === "POST") {
        try {
            const { email, password, username } = await req.body;
    
            // 入力バリデーション
            if (
                !email ||
                !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email) ||
                !password ||
                password.length < 8 ||
                !username ||
                username.length < 2
            ) {
                return res.status(400).json({ success: false, message: "入力内容が正しくありません。" });
            }
    
            const client = await clientPromise;
            const db = client.db();
            const users = db.collection("users");
    
            // メールアドレスの重複チェック
            const existing = await users.findOne({ email });
            if (existing) {
                return res.status(409).json({ success: false, message: "このメールアドレスは既に登録されています。" });
            }
    
            // ユーザー名の重複チェック
            const existingUsername = await users.findOne({ username });
            if (existingUsername) {
                return res.status(409).json({ success: false, message: "このユーザー名は既に使用されています。" });
            }
    
            const passwordHash = await hash(password, 10);
            
            // ユーザー作成
            const result = await users.insertOne({
                email,
                username,
                passwordHash,
                createdAt: new Date(),
                updatedAt: new Date(),
                role: "user", // デフォルトロール
                emailVerified: false, // メール認証状態
            });
    
            return res.status(201).json({ 
                success: true,
                message: "登録が完了しました。",
                userId: result.insertedId.toString()
            });
    
        } catch (error) {
            console.error("Registration error:", error);
            return res.status(500).json({ success: false, message: "登録処理中にエラーが発生しました。" });
        }
    }
    
    // POST以外のリクエストの場合
    return res.status(405).json({ success: false, message: "Method not allowed" });
}