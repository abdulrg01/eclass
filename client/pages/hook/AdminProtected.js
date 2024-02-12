import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { useEffect } from "react";

export default function AdminProtected({ children }) {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  }, [router, isAdmin]);

  return isAdmin ? <>{children}</> : null;
}
