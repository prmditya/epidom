import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, website, address, city, country } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    // Check if business already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { userId: session.user.id },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "Business already exists. Use PATCH to update." },
        { status: 409 }
      );
    }

    const business = await prisma.business.create({
      data: {
        userId: session.user.id,
        name,
        email,
        phone,
        website,
        address,
        city,
        country,
      },
    });

    return NextResponse.json({ business }, { status: 201 });
  } catch (error) {
    console.error("Error creating business:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, website, address, city, country } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    const business = await prisma.business.upsert({
      where: { userId: session.user.id },
      update: {
        name,
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(website !== undefined && { website }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country }),
      },
      create: {
        userId: session.user.id,
        name,
        email,
        phone,
        website,
        address,
        city,
        country,
      },
    });

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
