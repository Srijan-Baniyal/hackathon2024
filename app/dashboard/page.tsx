"use client";

import { useAuth } from "@clerk/nextjs";
import TodoApp from "@/components/todo/todoapp";

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div>You are not Logged In </div>;
  }

  if (!userId) {
    return (
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        You are Not logged in ... Click On Sign in To get Access{" "}
      </div>
    );
  }

  return <TodoApp />;
}
