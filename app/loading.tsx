"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`animate-spin rounded-full border-4 border-t-primary border-gray-200 w-12 h-12 text-primary`}
      />
    </div>
  );
}
