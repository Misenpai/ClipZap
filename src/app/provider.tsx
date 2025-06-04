"use client";

import { db } from "@/db";
import { Users } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""));

    if (!result[0]) {
      await db.insert(Users).values({
        name: user?.fullName ?? "Unknown User",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl,
      });
    }
  };

  return <div>{children}</div>;
};

export default Provider;
