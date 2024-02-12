import AdminProtected from "../../hook/AdminProtected";
import DashboardHeader from "../../component/DashboardHeader";
import Heading from "../../utils/Heading";
import AdminSidebarProfile from "../../component/Admin/sidebar/AdminSidebarProfile";
import OrdersAnalytics from "../../component/Admin/Analytics/OrdersAnalytics"

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
        <AdminSidebarProfile />

        {/* body contain */}
        <div className="flex-1">
          <DashboardHeader />
          <OrdersAnalytics isDashboard={false} />
        </div>
      </div>
    </AdminProtected>
  );
}
