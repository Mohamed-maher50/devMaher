import { Skeleton } from "./ui/skeleton";
export const SuspenseProjectSkeletons = () => {
  return (
    <div className="flex flex-col gap-12">
      {Array.from({ length: 4 }, (i, k) => k).map((n) => (
        <ProjectSkeleton key={n} />
      ))}
    </div>
  );
};
const ProjectSkeleton = () => {
  return (
    <div className="max-sm:my-10 h-fit  sm:h-[200vh]  relative isolate">
      <div className="group sticky  not-sm:transform-none!   top-1/2 -translate-y-1/2  flex flex-col overflow-hidden rounded-xl  hover:shadow-2xl">
        <div className="relative min-h-72 h-full w-full overflow-hidden bg-muted sm:h-52  md:h-128">
          <Skeleton className="w-full h-full" />

          <div className="absolute   inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
            <Skeleton className="h-5 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
