import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import HomePage from "@/pages/landing-page/home-page"

import OverviewPage from "@/pages/dashboard/overview-page"
import PoliciesPage from "@/pages/dashboard/policies-page"
import ClientsPage from "@/pages/dashboard/clients-page"
import CarriersPage from "@/pages/dashboard/carriers-page"
import AgentsPage from "@/pages/dashboard/agents-page"
import UploadStatementPage from "@/pages/dashboard/upload-statement-page"
import ReconciliationPage from "@/pages/dashboard/reconciliation-page"
import GapReportPage from "@/pages/dashboard/gap-report-page"
import AgentCommissionReportPage from "@/pages/dashboard/agent-commission-report-page"
import PaymentHistoryPage from "@/pages/dashboard/payment-history-page"
import AgencySettingsPage from "@/pages/dashboard/agency-settings-page"
import UserManagementPage from "@/pages/dashboard/user-management-page"
import SignupPage from "@/pages/signup-page"

function RootLayout() {
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignupPage /> },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "overview",
            handle: { title: "Overview" },
            element: <OverviewPage />,
          },
          {
            path: "policies",
            handle: { title: "Policies" },
            element: <PoliciesPage />,
          },
          {
            path: "clients",
            handle: { title: "Clients" },
            element: <ClientsPage />,
          },
          {
            path: "carriers",
            handle: { title: "Carriers" },
            element: <CarriersPage />,
          },
          {
            path: "agents",
            handle: { title: "Agents" },
            element: <AgentsPage />,
          },
          {
            path: "commissions/upload-statement",
            handle: { title: "Upload Statement" },
            element: <UploadStatementPage />,
          },
          {
            path: "commissions/reconciliation",
            handle: { title: "Reconciliation" },
            element: <ReconciliationPage />,
          },
          {
            path: "commissions/gap-report",
            handle: { title: "Gap Report" },
            element: <GapReportPage />,
          },
          {
            path: "reports/agent-commission",
            handle: { title: "Agent Commission Report" },
            element: <AgentCommissionReportPage />,
          },
          {
            path: "reports/payment-history",
            handle: { title: "Payment History" },
            element: <PaymentHistoryPage />,
          },
          {
            path: "settings/agency",
            handle: { title: "Agency Settings" },
            element: <AgencySettingsPage />,
          },
          {
            path: "settings/users",
            handle: { title: "User Management" },
            element: <UserManagementPage />,
          },
        ],
      },
    ],
  },
])

export function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}

export default App
