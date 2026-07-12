"use client";

import TripItem from "./TripItem";

export default function LiveBoard({ trips, loading, error, onUpdate, onSelect }) {
  return (
    <div>
      <h2 className="text-sm text-gray-400 mb-5">LIVE BOARD</h2>

      {loading && <p className="text-gray-400">Loading trips…</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && trips.length === 0 && (
        <p className="text-gray-400">No trips available yet.</p>
      )}

      {trips.map((trip) => (
        <TripItem key={trip.id} trip={trip} onUpdate={onUpdate} onSelect={onSelect} />
      ))}
    </div>
  );
}