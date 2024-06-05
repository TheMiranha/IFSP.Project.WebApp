import { useAuth as useAuthClerk, useUser as useUserClerk } from "@clerk/nextjs";

export function useAuth() {
  return useAuthClerk()
}

export function useUser() {
  return useUserClerk()
}