'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useProgress, Html, useGLTF } from '@react-three/drei';

/**
 * Composant de chargement affichant le pourcentage de chargement du modèle 3D.
 * Utilise useProgress de drei pour obtenir l'état de chargement.
 * @returns {React.ReactElement} Un élément HTML centré avec le pourcentage de chargement.
 */
function Loader(): React.ReactElement {
  const { progress } = useProgress();
  return <Html center>Chargement... {progress.toFixed(0)}%</Html>;
}

/**
 * Composant qui charge et affiche un modèle GLB (GLTF binaire) via useGLTF.
 * @param {{ url: string }} props - L'URL du fichier .glb à charger.
 * @returns {React.ReactElement} Le modèle 3D chargé et affiché dans la scène.
 */
function GltfModel({ url }: { url: string }): React.ReactElement {
  const ref = useRef<any>();
  const { scene } = useGLTF(url);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return <primitive ref={ref} object={scene} scale={1} />;
}

/**
 * Composant principal qui affiche un visualiseur 3D plein écran pour un modèle GLB.
 * @param {{ glbPath?: string }} props - Le chemin du fichier .glb à afficher (par défaut '/model.glb').
 * @returns {React.ReactElement} Le visualiseur 3D en plein écran.
 */
const ModelViewer = ({ glbPath = '/model.glb' }: { glbPath?: string }): React.ReactElement => (
  <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <GltfModel url={glbPath} />
      </Suspense>
      <OrbitControls minDistance={5} maxDistance={20} />
    </Canvas>
  </div>
);

export default ModelViewer;

// Nécessaire pour le support du chargement GLTF dans Next.js
if (useGLTF.preload) useGLTF.preload('/model.glb'); 