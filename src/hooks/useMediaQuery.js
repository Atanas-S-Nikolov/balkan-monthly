import { useEffect, useState } from "preact/hooks";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia;
    
    if (matchMedia) {
      const matchQueryList = matchMedia(query);

      function handleChange(e) {
        setMatches(e.matches);
      }

      matchQueryList.addEventListener("change", handleChange);
      
      return () => {
        matchQueryList.removeEventListener("change", handleChange);
      };
    }
  }, [query]);

  return matches;
}
