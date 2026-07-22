import { PageView } from '../types/game';

export function getViewFromPath(pathname: string): PageView {
  if (pathname === '/jogo') return 'game';
  if (pathname === '/resultados') return 'results';
  return 'home';
}

export function getPathFromView(view: PageView): string {
  if (view === 'game') return '/jogo';
  if (view === 'results') return '/resultados';
  return '/';
}
