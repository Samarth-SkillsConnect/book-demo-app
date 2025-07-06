import AdminBookingList from "../../components/AdminBookingList";
import AdminSlotManager from "../../components/AdminSlotManager";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="w-full max-w-3xl mb-8">
        <AdminSlotManager />
      </div>
      <div className="w-full max-w-3xl">
        <AdminBookingList />
      </div>
    </div>
  );
}