import React, { Suspense } from "react";
import Loading from "./loading";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {modal}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}