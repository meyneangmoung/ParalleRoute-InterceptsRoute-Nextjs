"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { animalImages } from "../../animal";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function ClientImageModal({ id }: { id: string }) {
  const router = useRouter();
  const photo = animalImages.find((p) => p.id === id);

  if (!photo) return null;

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Animal Image</DialogTitle>
          <DialogDescription>{photo.description}</DialogDescription>
        </DialogHeader>
        <Image
          src={photo.src}
          alt={photo.description}
          className="object-cover rounded-4xl  w-full h-100"
        />
      </DialogContent>
    </Dialog>
  );
}
