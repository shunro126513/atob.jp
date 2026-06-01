import { createClient as createBrowserClient } from "@/utils/supabase/client";

// サーバー側（Server Components / API Routes）でも使える汎用クライアント
// 認証セッションが不要な読み取り専用の用途に使用
export const supabase = createBrowserClient();
