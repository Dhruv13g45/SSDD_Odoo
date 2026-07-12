import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error("GET /api/trips error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch trips.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      route,
      vehicle,
      driver,
      cargoWeight,
      distanceKm,
      status,
      time,
    } = body;

    if (!route || route.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Route is required.",
        },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.create({
      data: {
        route: route.trim(),
        vehicle: vehicle || null,
        driver: driver || null,
        cargoWeight: Number(cargoWeight ?? 0),
        distanceKm: Number(distanceKm ?? 0),
        status: status || "DRAFT",
        time: time || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        trip,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/trips error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create trip.",
      },
      { status: 500 }
    );
  }
}