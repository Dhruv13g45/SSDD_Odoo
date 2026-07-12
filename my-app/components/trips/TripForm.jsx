"use client";

import { useState } from "react";
import ValidationBox from "./ValidationBox";

const capacity = 500;

export default function TripForm({ onCreate }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [cargo, setCargo] = useState(0);
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!source || !destination) {
      setError("Source and destination are required.");
      return;
    }

    if (cargo > capacity) {
      setError("Cargo exceeds vehicle capacity.");
      return;
    }

    try {
      await onCreate({
        route: `${source} → ${destination}`,
        vehicle,
        driver,
        cargoWeight: cargo,
        distanceKm: distance,
        status: "DISPATCHED",
        time: "Awaiting dispatch",
      });

      setSuccess("Trip created successfully.");
      setSource("");
      setDestination("");
      setVehicle("");
      setDriver("");
      setCargo(0);
      setDistance(0);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-5 font-bold">CREATE TRIP</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <label htmlFor="source">Source</label>
      <input
        value={source}
        name="source"
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source"
        className="input my-2"
      />

      <label htmlFor="destination">Destination</label>
      <input
        value={destination}
        name="destination"
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        className="input my-2"
      />

      <label htmlFor="vehicle-number">Vehicle Number</label>
      <input
        value={vehicle}
        name="vehicle-number"
        onChange={(e) => setVehicle(e.target.value)}
        placeholder="Vehicle Number"
        className="input my-2"
      />

      <label htmlFor="driver">Driver Name</label>
      <input
        value={driver}
        name="driver"
        onChange={(e) => setDriver(e.target.value)}
        placeholder="Driver Available"
        className="input my-2"
      />

      <label htmlFor="cargo-weight">Cargo Weight</label>
      <input
        type="number"
        name="cargo-weight"
        value={cargo}
        onChange={(e) => setCargo(Number(e.target.value))}
        placeholder="Cargo Weight (KG)"
        className="input my-2"
      />

      <label htmlFor="cargo-weight">Planned Distance</label>
      <input
        type="number"
        name="distance"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
        placeholder="Planned Distance (KM)"
        className="input my-2"
      />

      <ValidationBox cargo={cargo} capacity={capacity} />

      <div className="flex gap-5 mt-5">
        <button
          disabled={cargo > capacity}
          onClick={handleSubmit}
          className="bg-blue-600 px-6 py-3 rounded-lg disabled:bg-gray-700"
        >
          Dispatch
        </button>

        <button
          onClick={() => {
            setSource("");
            setDestination("");
            setVehicle("");
            setDriver("");
            setCargo(0);
            setDistance(0);
            setError("");
            setSuccess("");
          }}
          className="px-6 py-3 border rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
