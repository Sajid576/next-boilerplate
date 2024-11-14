import AdminLayout from "@components/custom/admin-layout/admin-layout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
