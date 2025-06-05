// hooks/useRouterAnimation.ts
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useRouterAnimation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPath, setCurrentPath] = useState(router.asPath);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        setIsNavigating(true);
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      setCurrentPath(url);
      // Pequeño delay para asegurar que la animación se ejecute
      setTimeout(() => {
        setIsNavigating(false);
      }, 50);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", () => setIsNavigating(false));

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", () => setIsNavigating(false));
    };
  }, [router]);

  return { isNavigating, currentPath };
}
