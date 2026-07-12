import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = await params;
  const trip = await prisma.trip.findUnique({ where: { id } });

  if (!trip) {
    return NextResponse.json(
      { success: false, message: "Trip not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, trip });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { route, vehicle, driver, cargoWeight, distanceKm, status, time } = body;

  const trip = await prisma.trip.update({
    where: { id },
    data: {
      route,
      vehicle,
      driver,
      cargoWeight:
        cargoWeight !== undefined ? Number(cargoWeight) : undefined,
      distanceKm:
        distanceKm !== undefined ? Number(distanceKm) : undefined,
      status,
      time,
    },
  });

  return NextResponse.json({ success: true, trip });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await prisma.trip.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Trip deleted." });
}