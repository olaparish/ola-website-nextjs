/* eslint-disable @typescript-eslint/no-explicit-any */
export function selectMinimalSessionUser(user: any) {
  if (!user) return user;
  const rolePermissions = Array.isArray(user?.role?.permissions)
    ? user.role.permissions
    : undefined;

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    avatar: user.avatar,
    status: user.status,
    isAdmin: user.isAdmin,
    isQhms: user.isQhms,
    ssn: user.ssn,
    ssnLast4: user.ssnLast4,
    organizationId: user.organizationId,
    roleId: user.roleId ?? user.role_id,
    role: rolePermissions ? { permissions: rolePermissions } : undefined,
  };
}

export function selectMinimalTokenData(tokenData: any) {
  if (!tokenData) return tokenData;
  const access = tokenData.access ? { ...tokenData.access } : undefined;
  const refresh = tokenData.refresh ? { ...tokenData.refresh } : undefined;
  return { access, refresh } as const;
}
