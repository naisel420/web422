import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  useEffect(() => {
    const authCheck = async (url) => {
      const path = url.split("?")[0];

      if (!PUBLIC_PATHS.includes(path)) {
        if (!isAuthenticated()) {
          router.push("/login");
        } else {
          await updateAtom();
        }
      }
    };

    authCheck(router.asPath);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router]);

  return <>{children}</>;
}
