import { DateTime } from "luxon";

const SHORT_DATE = "LLLL dd";
const SHORTEST_DATE = "LLL dd";
const TIMEZONE = "America/Mexico_City";
const YEAR_AND_MONTH = "LLL y";

export function shortDate(date: string) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("es")
    .toFormat(SHORT_DATE);
  return dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1);
}

export function shortestDate(date: string) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("es")
    .toFormat(SHORTEST_DATE);
  return dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1);
}

export function yearAndMonth(date: string) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("es")
    .toFormat(YEAR_AND_MONTH);
  return (
    dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1).replace(" ", "/")
  );
}

export function humanDate(date: string): string {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("es")
    .toFormat("d 'de' LLLL h:mm a");
  return dateFormat;
}

export function secondsToHuman(seconds: number) {
  let output;

  if (seconds < 60) {
    output = `${Math.ceil(seconds)}s`;
  }
  if (seconds > 60 && seconds < 3600) {
    output = `${Math.ceil(seconds / 60)}m`;
  }
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const s = seconds % 3600;
    const m = Math.ceil(s / 60);
    output = `${h}h ${m}m`;
  }

  return output;
}

export function remainingMonths(date: string): number {
  const now = DateTime.now().setZone(TIMEZONE).setLocale("es");
  const dateFormat = DateTime.fromISO(date).setZone(TIMEZONE).setLocale("es");
  const remainingMonths = dateFormat.diff(now, "months").months;
  return Math.ceil(remainingMonths);
}
