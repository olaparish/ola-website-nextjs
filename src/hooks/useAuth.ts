import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  return {
    session,
    user: session?.user as { id: string; role: string; firstName: string; lastName: string; email: string; picture?: string } | undefined,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
