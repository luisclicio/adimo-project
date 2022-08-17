import { useEffect, useState } from 'react';

export function useLocation() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    setLocation(window.location);
  }, []);

  return location;
}
