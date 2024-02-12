import CourseDetailsPage from "../component/course/CourseDetailsPage";
import { useRouter } from "next/router";

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;

  return (
    <div>
      <CourseDetailsPage id={courseId} />
    </div>
  );
}
