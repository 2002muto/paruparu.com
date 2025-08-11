// 記事の型定義
export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  excerpt: string;
  content: string;
}

// コメントの型定義
export interface Comment {
  id: string;
  post_slug: string;
  display_name?: string;
  body: string;
  created_at: string;
}

// コメント投稿用の型定義
export interface CommentFormData {
  post_slug: string;
  display_name?: string;
  body: string;
  turnstile_token: string;
}

// API レスポンスの型定義
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// レート制限の型定義
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  windowMsHour: number;
  maxRequestsHour: number;
}

// レート制限の状態
export interface RateLimitState {
  count: number;
  resetTime: number;
  hourCount: number;
  hourResetTime: number;
}
