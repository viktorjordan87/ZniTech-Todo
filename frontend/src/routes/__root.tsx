import { ReactNode } from "react";
import "../main.scss";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@/components/TanStackRouterDevtools";
import { NotFound } from "@/components/Notfound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import type { QueryClient } from "@tanstack/react-query";

function LayoutComponent({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: LayoutComponent,
  notFoundComponent: NotFound,
  errorComponent: (props) => {
    return (
      <LayoutComponent>
        <DefaultCatchBoundary {...props} />
      </LayoutComponent>
    );
  },
});
