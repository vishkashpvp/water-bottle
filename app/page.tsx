import { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = { title: "Home" };

export default function Home() {
  return (
    <main className="min-h-screen p-3">
      <h1 className="text-5xl">Home page</h1>

      <Dashboard />
    </main>
  );
}
