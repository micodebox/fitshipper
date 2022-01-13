import { DashboardLayoutProps } from "./Dashboard.types";

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="container mx-auto mt-4">
    {children}
  </div>
);
