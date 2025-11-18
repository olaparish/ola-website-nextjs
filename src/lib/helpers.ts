import { UserTypes } from "../../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function selectMinimalSessionUser(user: any) {
  if (!user) return user;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    role: user.role,
    permissions: user.permissions,
  };
}

export function selectMinimalTokenData(tokenData: any) {
  if (!tokenData) return tokenData;
  const access = tokenData.access ? { ...tokenData.access } : undefined;
  const refresh = tokenData.refresh ? { ...tokenData.refresh } : undefined;
  return { access, refresh } as const;
}

export function getLoginCallback(userType: UserTypes) {
  const callbackUrls = {
    parishioner: "/parishioner/dashboard",
    groups: "/parish-group/dashboard",
    catechist: "/catechist/dashboard",
    accountant: "/accountant/dashboard",
    chairman: "/parish-council-chairman/dashboard",
  };

  if (["COMMUNITY", "SOCIETY", "OUTSTATION"].includes(userType))
    return callbackUrls.groups;
  else return callbackUrls[userType.toLowerCase() as keyof typeof callbackUrls];
}

// | "PARISHIONER"
// | "PARISH_PRIEST"
// | "PARISH_COUNCIL_CHAIRMAN"
// | "PRIEST"
// | "CATECHIST"
// | "ACCOUNTANT"
// | "COMMUNITY"
// | "SOCIETY"
// | "OUTSTATION
