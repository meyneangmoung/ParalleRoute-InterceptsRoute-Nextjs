import React from "react";
import ClientImageModal from "./ClientImageModal";

export default async function ImageModalWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientImageModal id={id} />;
}