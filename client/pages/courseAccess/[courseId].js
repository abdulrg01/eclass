import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/authSlice";
import { useEffect } from "react";
import CourseContents from "../component/course/CourseContents";
import { useRefreshMutation } from "../../redux/auth/authApi";

export default function index() {
  const router = useRouter();
  const { courseId } = router.query;
  const user = useSelector(selectCurrentUser);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        //const response =
        await refresh();
        //const { accessToken } = response.data
      } catch (err) {
        console.error(err);
      }
    };

    if (!user) verifyRefreshToken();
  }, []);

  useEffect(() => {
    if (user) {
      const isUserPurchased =
        user && user?.courses?.find((item) => item === courseId);

      if (!isUserPurchased) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <div>
      <CourseContents id={courseId} user={user} />
    </div>
  );
}
