import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

export function useSafeMsal() {
  const { instance } = useMsal();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await instance.initialize();
      } catch {}
      setReady(true);
    };
    init();
  }, [instance]);

  return { instance, ready };
}
