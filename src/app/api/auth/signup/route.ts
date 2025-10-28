import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password, businessName, address } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Only create business if businessName is provided
    if (businessName) {
      await prisma.business.create({
        data: {
          name: businessName,
          address: address || "",
          user: { connect: { id: user.id } },
        },
      });
    }

    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error.", error: String(error) },
      { status: 500 }
    );
  }
}
