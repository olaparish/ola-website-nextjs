"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { UserCircle, Briefcase, ShieldCheck, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Roles } from "../../../../../types/users";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { PriestSettings } from "@/components/settings/PriestSettings";
import { ParishPriestSettings } from "@/components/settings/ParishPriestSettings";
import { GroupSettings } from "@/components/settings/GroupSettings";

const SettingsPage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"personal" | "role" | "security">(
    "personal",
  );

  const { data: userDetails, isLoading: isUserLoading } = useQuery({
    queryKey: ["current-user-base"], // Changed key to avoid conflict with detail fetching in components
    queryFn: () => parishionerService.getParishioner(),
  });

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
      </div>
    );
  }

  const userRole = session?.user?.role || "PARISHIONER";
  const hasRoleTab = [
    Roles.PARISH_PRIEST,
    Roles.PRIEST,
    Roles.SOCIETY,
    Roles.COMMUNITY,
    Roles.OUTSTATION,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ].includes(userRole as any);

  const getRoleLabel = (role: string) => {
    return (
      role
        .toLowerCase()
        .replace("_", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) + " Details"
    );
  };

  return (
    <div className="mx-auto pb-20 max-w-5xl">
      <div className="flex justify-between items-end mb-8 pb-4 border-b">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">Account Settings</h2>
          <p className="mt-1 text-gray-500 text-sm">
            Manage your personal info and role-specific details.
          </p>
        </div>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
        {/* Sidebar / Tabs */}
        <aside className="space-y-6 lg:col-span-1">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("personal")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl w-full font-medium text-sm transition-all",
                activeTab === "personal"
                  ? "bg-primary-900 text-white shadow-md shadow-primary-900/20"
                  : "bg-white text-gray-600 hover:bg-gray-50",
              )}
            >
              <UserCircle className="w-5 h-5" />
              Personal Info
            </button>
            {hasRoleTab && (
              <button
                onClick={() => setActiveTab("role")}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl w-full font-medium text-sm transition-all",
                  activeTab === "role"
                    ? "bg-primary-900 text-white shadow-md shadow-primary-900/20"
                    : "bg-white text-gray-600 hover:bg-gray-50",
                )}
              >
                <Briefcase className="w-5 h-5" />
                {getRoleLabel(userRole)}
              </button>
            )}
            <button
              onClick={() => setActiveTab("security")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl w-full font-medium text-sm text-left transition-all",
                activeTab === "security"
                  ? "bg-primary-900 text-white shadow-md shadow-primary-900/20"
                  : "bg-white text-gray-600 hover:bg-gray-50",
              )}
            >
              <ShieldCheck className="w-5 h-5" />
              Security
            </button>
          </nav>

          <div className="bg-white shadow-sm p-5 border border-gray-100 rounded-xl">
            <h4 className="mb-3 font-bold text-gray-900 text-xs uppercase tracking-widest">
              Profile Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Role</span>
                <span className="font-semibold text-primary-700 capitalize">
                  {userRole.toLowerCase().replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Joined</span>
                <span className="font-semibold text-gray-900">
                  {new Date(
                    userDetails?.user.createdAt || "",
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="space-y-6 lg:col-span-3">
          {activeTab === "personal" && <ProfileSettings />}

          {activeTab === "role" && (
            <div className="space-y-6">
              {/* 
                 Parish Priests see BOTH their PP settings AND Priest settings.
                 Other roles just see their specific settings.
               */}
              {userRole === Roles.PARISH_PRIEST && (
                <>
                  <ParishPriestSettings />
                  <PriestSettings />
                </>
              )}

              {userRole === Roles.PRIEST && <PriestSettings />}

              {(userRole === Roles.SOCIETY ||
                userRole === Roles.COMMUNITY ||
                userRole === Roles.OUTSTATION) && <GroupSettings />}
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white shadow-sm p-8 border border-gray-100 rounded-xl text-center">
              <ShieldCheck className="mx-auto mb-4 w-12 h-12 text-gray-300" />
              <h3 className="mb-2 font-bold text-gray-900">
                Security Settings
              </h3>
              <p className="text-gray-500 text-sm">
                Password change and 2FA settings specific to {userRole} are
                coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
