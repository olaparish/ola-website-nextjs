"use client";

import { useSession } from "next-auth/react";
import { Roles } from "../../../../types/users";
import { StaffDashboardOverview } from "@/components/dashboard/StaffDashboardOverview";
import { ParishionerDashboardOverview } from "@/components/dashboard/ParishionerDashboardOverview";

const DashboardPage = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (userRole === Roles.PARISHIONER) {
    return <ParishionerDashboardOverview />;
  }

  // Everyone else sees the staff/admin dashboard (Catechist, Priest, Admin, etc.)
  return <StaffDashboardOverview />;
};

export default DashboardPage;
