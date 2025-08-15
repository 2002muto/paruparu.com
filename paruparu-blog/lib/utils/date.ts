import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

// 日付を日本語形式でフォーマット
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "yyyy年M月d日", { locale: ja });
}

// 日付を短縮形式でフォーマット
export function formatShortDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "M/d", { locale: ja });
}

// 日付をISO形式でフォーマット
export function formatISODate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "yyyy-MM-dd");
}

// 現在の日付をISO形式で取得
export function getCurrentISODate(): string {
  return formatISODate(new Date());
}
