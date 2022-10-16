import { useEffect, useState } from 'react';

export function useSsr() {
  const [isBrowser, setBrowser] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  return {
    isBrowser,
    isServer: !isBrowser,
  };
}
