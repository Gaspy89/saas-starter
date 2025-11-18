import {withAuth} from "@/lib/withAuth";

function DashboardPage() {
    return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="mt-4">Welcome to your SaaS app. Replace this with your feature modules.</p>
    </div>
  )
}

export default withAuth(DashboardPage);

