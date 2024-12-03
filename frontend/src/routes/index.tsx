import { Tasks } from "@/pages/Todo/Tasks";

import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tasks />
    </Suspense>
  );
}
