import { selectCurrentUser } from "@/redux/auth/authSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminProtected({ children }) {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (user && user?.role !== "Admin") {
      router.push("/");
    }
  }, [router, user]);

  return user && user?.role === "Admin" ? <>{children}</> : null;
}
