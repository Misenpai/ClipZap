"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useCallback } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db } from "@/db";
import { VideoData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";
import { DatabaseVideoData } from "../types/video";

const Dashboard = () => {
  const [videoList, setVideoList] = useState<DatabaseVideoData[]>([]);
  const { user } = useUser();

  const GetVideoList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user.primaryEmailAddress.emailAddress));

    setVideoList(result as DatabaseVideoData[]);
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (user) {
      GetVideoList();
    }
  }, [user, GetVideoList]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={"dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {videoList?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      <VideoList videoList={videoList} />
    </div>
  );
};

export default Dashboard;
