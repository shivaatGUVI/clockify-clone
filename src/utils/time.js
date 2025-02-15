import {
  format,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
} from "date-fns";

export const formatTime = (seconds) => {
  const date = startOfDay(new Date());
  return format(setSeconds(date, seconds), "HH:mm:ss");
};

export const formatTimeInput = (hours, minutes) => {
  return format(setMinutes(setHours(new Date(), hours), minutes), "HH:mm");
};

export const convertTimeToDate = (dateString, timeString) => {
  const date = parseISO(dateString);
  const [hours, minutes] = timeString.split(":").map(Number);
  return setSeconds(setMinutes(setHours(date, hours), minutes), 0);
};
