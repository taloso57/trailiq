"use client";

import { useRouter } from "next/navigation";
import ProductComparison from "@/components/ProductComparison";

export default function ComparePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen pt-24 pb-16 px-5">
      <div className="max-w-7xl mx-auto">
        <ProductComparison onBack={() => router.push("/")} />
      </div>
    </div>
  );
}
