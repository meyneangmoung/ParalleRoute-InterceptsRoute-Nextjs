"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { interceptingImg } from "@/app/intercepting-photo/intercepting";

export default function PhotoModal({ id }: { id: string }) {
  const router = useRouter();

  const photo = interceptingImg.find(
    (p) => p.id === parseInt(id)
  );

  if (!photo) return null;

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{photo.name}</DialogTitle>

          <DialogDescription>
            This is an intercepted photo preview.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Image
            src={photo.image}
            alt={photo.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
