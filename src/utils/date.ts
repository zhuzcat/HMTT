import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh";

/**
 * 日期格式化
 * @param date 之前的时间
 * @returns 格式化后的日期
 */
export const timeAgo = (date: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale("zh");
  let a = dayjs();
  let b = dayjs(date);
  return a.to(b);
};
