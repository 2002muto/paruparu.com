// コメント本文のバリデーション
export function validateCommentBody(body: string): {
  isValid: boolean;
  error?: string;
} {
  if (!body || body.trim().length === 0) {
    return { isValid: false, error: "コメントを入力してください" };
  }

  if (body.length > 500) {
    return { isValid: false, error: "コメントは500文字以内で入力してください" };
  }

  // URLの数をチェック（最大2個）
  const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urls = body.match(urlRegex);
  if (urls && urls.length > 2) {
    return { isValid: false, error: "URLは最大2個まで入力できます" };
  }

  return { isValid: true };
}

// 表示名のバリデーション
export function validateDisplayName(name?: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name || name.trim().length === 0) {
    return { isValid: true }; // 名前は任意
  }

  if (name.length > 50) {
    return { isValid: false, error: "名前は50文字以内で入力してください" };
  }

  return { isValid: true };
}

// スラッグのバリデーション
export function validateSlug(slug: string): {
  isValid: boolean;
  error?: string;
} {
  if (!slug || slug.trim().length === 0) {
    return { isValid: false, error: "スラッグは必須です" };
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return {
      isValid: false,
      error: "スラッグは英数字とハイフンのみ使用できます",
    };
  }

  if (slug.length > 100) {
    return { isValid: false, error: "スラッグは100文字以内で入力してください" };
  }

  return { isValid: true };
}
