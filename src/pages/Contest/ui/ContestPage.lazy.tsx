import { lazy } from "react";

export const LazyContestPage = lazy(async () => await import("./ContestPage"));
