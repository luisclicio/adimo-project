import { useSsr } from '../hooks/useSsr';

export function BrowserOnly({ children }) {
  const { isBrowser } = useSsr();
  return isBrowser ? <>{children}</> : null;
}
