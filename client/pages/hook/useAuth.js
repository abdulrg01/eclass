import { selectCurrentToken } from "../../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

export default function useAuth() {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;
  let status = "user";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const { role, name } = decoded.UserInfo;

      isAdmin = role.includes("Admin");

      if (isAdmin) {
        status = "Admin";
      }

      return { name, role, status, isAdmin };
    } catch (error) {
      // Handle decoding error gracefully
      console.error("Error decoding JWT:", error);
    }
  }

  return { name: "", role: "", status, isAdmin };
}