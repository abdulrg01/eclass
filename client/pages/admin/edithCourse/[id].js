import AdminProtected from "../../hook/AdminProtected";
import DashboardHeader from "../../component/DashboardHeader";
import Heading from "../../utils/Heading";
import AdminSidebarProfile from "../../component/Admin/sidebar/AdminSidebarProfile";
import EdithCourse from "../../component/Admin/Course/EdithCourse";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminProtected>
      <Heading
        title={"ELearning - Admin"}
        description="ELearning is a platform for students to learn and help from teachers"
        keywords="Programing, Mearn, Redux, maching Learning"
      />
      <div className="flex">
        {/* sidebar */}
        <AdminSidebarProfile />

        {/* body contain */}
        <div className="flex-1">
          <DashboardHeader />
          <EdithCourse id={id} />
        </div>
      </div>
    </AdminProtected>
  );
}
