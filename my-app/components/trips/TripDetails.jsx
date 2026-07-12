"use client";

export default function TripDetails({ trip }) {
  if (!trip) {
    return (
      <div className="rounded-xl bg-white/5 p-5 mb-5 text-gray-400">No trip selected.</div>
    );
  }

  return (
    <div className="rounded-xl bg-white/5 p-5 mb-5">
      <h3 className="font-bold mb-3">Trip Details</h3>

      <div className="text-sm text-gray-300 mb-2">
        <div className="mb-1"><strong>Route:</strong> {trip.route}</div>
        <div className="mb-1"><strong>Vehicle:</strong> {trip.vehicle || "Unassigned"}</div>
        <div className="mb-1"><strong>Driver:</strong> {trip.driver || "Unassigned"}</div>
        <div className="mb-1"><strong>Cargo (kg):</strong> {trip.cargoWeight ?? 0}</div>
        <div className="mb-1"><strong>Distance (km):</strong> {trip.distanceKm ?? 0}</div>
        <div className="mb-1"><strong>Status:</strong> {trip.status}</div>
        <div className="mb-1"><strong>Created:</strong> {trip.createdAt ? new Date(trip.createdAt).toLocaleString() : "-"}</div>
      </div>
    </div>
  );
}
