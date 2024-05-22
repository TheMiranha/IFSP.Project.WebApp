import { useAuth as useAuthClerk } from "@clerk/nextjs";

export function useAuth() {
  return useAuthClerk()
}