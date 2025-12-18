// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatTimestamp = (timestamp: any) => {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Сегодня → выводим время
  if (dateOnly.getTime() === today.getTime()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Вчера
  if (dateOnly.getTime() === yesterday.getTime()) {
    return "Вчера";
  }

  // Дата
  return date.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
};
