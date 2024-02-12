import AdminProtected from "../../hook/AdminProtected";
import DashboardHeader from "../../component/DashboardHeader";
import Users from "../../component/Admin/users";
import Heading from "../../utils/Heading";
import AdminSidebarProfile from "../../component/Admin/sidebar/AdminSidebarProfile";

export default function index() {
  return (
    <AdminProtected>
      <Heading
        title={"ELearning - Admin"}
        description="ELearning is a platform for students to learn and help from teachers"
        keywords="Programing, Mearn, Redux, maching Learning"
      />
      <div className="flex">
        {/* sidebar */}
        <div>
          <AdminSidebarProfile />
        </div>

        {/* body contain */}
        <div className="flex-1">
          <DashboardHeader />
          <Users />
        </div>
      </div>
    </AdminProtected>
  );
}
