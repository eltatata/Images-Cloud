"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/react";


export default function PaginationComponent({ page, total, totalPages }) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center py-10 gap-4">
      <p className="text-sm font-bold">Total images: {total}</p>
      <Pagination
        showControls
        total={totalPages}
        color="secondary"
        page={page}
        onChange={(page) => router.push(`/images?page=${page}`)}
      />
    </div>
  )
}
