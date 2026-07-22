/**
 * Formats seconds into a padded MM:SS timer display (e.g. 02:45)
 */
export function formatTime(totalSec: number): string {
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
