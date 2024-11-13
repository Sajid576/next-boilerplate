import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    user: {
      name: string;
      userType: string;
      distributorId: string;
      warehouseId?: string;
    };
    role: any; // Update this to a more specific type if possible
  }

  interface User {
    name: string;
    accessToken: string;
    refreshToken: string;
    userType: string;
    warehouseId?: string;
    permissions: any; // Update this to a more specific type if possible
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
      name: string;
      userType: string;
      warehouseId?: string;
    };
    role: any; // Update this to a more specific type if possible
  }
}