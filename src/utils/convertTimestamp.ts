export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

export function convertTimestamp(
  event: NostrEvent | { created_at: number },
): string {
  if (!event) return "";

  const d = new Date(event.created_at * 1000);
  const yyyy = d.getFullYear();
  const mm = ("0" + (d.getMonth() + 1)).slice(-2);
  const dd = ("0" + d.getDate()).slice(-2);
  const hh = d.getHours();
  let h = hh;
  const min = ("0" + d.getMinutes()).slice(-2);
  let ampm = "AM";

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh == 0) {
    h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  const time = dd + "-" + mm + "-" + yyyy + ", " + h + ":" + min + " " + ampm;
  return time;
}
