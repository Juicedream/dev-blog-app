"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  function nextPage() {
    if (page === totalPages) return;
    setPage(page + 1);
  }
  function prevPage() {
    if (page <= 1) return;
    setPage(page - 1);
  }
  return (
    <div className="h-15 w-full py-1 px-2 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">Page: {page}</p>
      <p className="text-sm text-muted-foreground">Total Pages: {totalPages}</p>
      <div className="flex gap-2">
        <Button onClick={prevPage} disabled={page <= 1} size={"icon-lg"}>
          <ChevronLeft />
        </Button>
        <Button
          onClick={nextPage}
          disabled={page >= totalPages}
          size={"icon-lg"}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
