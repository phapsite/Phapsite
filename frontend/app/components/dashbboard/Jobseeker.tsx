"use client";
import "./Dashboard.css";
export default function JobseekerDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Jobseeker Dashboard</h1>
        <p>Welcome to your dashboard! Here are your job opportunities.</p>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-cards">
          <div className="card">Applied Jobs</div>
          <div className="card">Recommended Jobs</div>
          <div className="card">Profile Status</div>
        </div>
      </main>
    </div>
  );
}