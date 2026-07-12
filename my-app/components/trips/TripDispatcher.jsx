"use client";

import { useEffect, useState, useCallback } from "react";
import TripLifeCycle from "./TripLifeCycle";
import TripForm from "./TripForm";
import LiveBoard from "./LiveBoard";
import useTrips from "@/hooks/useTrips";
import TripDetails from "./TripDetails";

export default function TripDispatcher() {
  const { trips, loading, error, fetchTrips, createTrip, updateTrip } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const selectedTrip = trips.find((t) => t.id === selectedTripId) || null;

  const handleCreate = useCallback(
    async (data) => {
      const trip = await createTrip(data);
      setSelectedTripId(trip.id);
    },
    [createTrip]
  );

  // auto-select first trip when list loads
  useEffect(() => {
    if (!selectedTripId && trips.length > 0) setSelectedTripId(trips[0].id);
  }, [trips, selectedTripId]);

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Trip Dispatcher</h1>
        <button className="border px-5 py-2 rounded-lg">Dispatcher RK</button>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <TripLifeCycle status={selectedTrip?.status ?? "DRAFT"} />
          <TripForm onCreate={handleCreate} />
        </div>

        <div>
          <TripDetails trip={selectedTrip} />
          <LiveBoard
            trips={trips}
            loading={loading}
            error={error}
            onUpdate={updateTrip}
            onSelect={(id) => setSelectedTripId(id)}
          />
        </div>
      </div>
    </div>
  );
}