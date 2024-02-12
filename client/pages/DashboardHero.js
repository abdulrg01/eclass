import { useState } from "react";
import DashboardWidgets from "./component/Admin/widgets/DashboardWidgets";

export default function DashboardHero({ isDashboard }) {
  const [open, setOpen] = useState(false);

  return <div>{isDashboard && <DashboardWidgets open={open} />}</div>;
}
