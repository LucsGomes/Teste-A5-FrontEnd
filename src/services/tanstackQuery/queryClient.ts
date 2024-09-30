"use client";
import { QueryClient } from "@tanstack/react-query";

const hoursToUpdate = 2;
const countToRefresh = 1000 * 60 * 60 * hoursToUpdate;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: countToRefresh, // 2 hours
    },
  },
});

export { queryClient };
