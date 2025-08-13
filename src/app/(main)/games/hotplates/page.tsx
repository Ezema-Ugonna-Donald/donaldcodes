'use client'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('@/app/(main)/games/hotplates/hotPlateComponent'),
  { ssr: false }
);

export default function HotPlates() {
  return (
      <div className="w-full h-full">
        <DynamicComponentWithNoSSR/>
      </div>
  );
}