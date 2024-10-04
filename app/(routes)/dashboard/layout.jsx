"use client";

import React from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && checkUserBudgets()
  }, [user])
  

  const checkUserBudgets = async () => {

    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    if(result?.length == 0){
      router.replace('/dashboard/budgets')
    }

  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-64">
        <SideNav />
      </div>

      {/* Children content section */}
      <div className="flex-1 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
