'use client';

import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('../components/ModelViewer'), { ssr: false });

export default function HomeClient() {
  return (
    <>
      <ModelViewer glbPath="/model.glb" />
    </>
  );
} 