"use client";

import { useCallback, useState } from "react";
import api from "@/lib/axios";

export default function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/trips");
      setTrips(data.trips || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load trips.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrip = useCallback(async (tripData) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/trips", tripData);
      setTrips((prev) => [data.trip, ...prev]);
      return data.trip;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to create trip.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTrip = useCallback(async (id, patch) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.patch(`/trips/${id}`, patch);
      setTrips((prev) => prev.map((t) => (t.id === id ? data.trip : t)));
      return data.trip;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Unable to update trip.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTrip = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/trips/${id}`);
      setTrips((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Unable to delete trip.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { trips, loading, error, fetchTrips, createTrip, updateTrip, deleteTrip };
}