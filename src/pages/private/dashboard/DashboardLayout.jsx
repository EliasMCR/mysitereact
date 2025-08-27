import { HeaderDash } from "../../../components/dashboard/HeaderDash";
import { NavMobilie } from "../../../components/dashboard/NavMobilie";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderDash />
      <NavMobilie />
    </div>
  );
};
