"use client";

import JobseekerDashboard from "./dashboard/Jobseeker";
import RecruiterDashboard from "./Recruiter";
import AdminDashboard from "./dashboard/Admin";
import SellerDashboard from "./dashboard/Seller";
import FreelanceDashboard from "./dashboard/Freelance";

interface ProfileDashboardProps {
  role: string; // user role passed in from login/register success
}

export default function ProfileDashboard({ role }: ProfileDashboardProps) {
  switch (role) {
    case "Jobseeker":
      return <JobseekerDashboard />;
    case "Recruiter":
      return <RecruiterDashboard />;
    case "Admin":
      return <AdminDashboard />;
    case "Seller":
      return <SellerDashboard />;
    case "Freelancer":
    case "Freelance": // handle both strings
      return <FreelanceDashboard />;
    default:
      return (
        <div className="dashboard-container">
          <h2 className="dashboard-title">🚀 Welcome</h2>
          <p className="dashboard-text">
            Your role could not be determined. Please contact support.
          </p>
        </div>
      );
  }
}