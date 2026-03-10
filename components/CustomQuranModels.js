// This file is a placeholder. You need to obtain GLTF/GLB models of:
// 1. An open book with curved pages (matching your needs)
// 2. A traditional cross-stand (Rahl) matching image_1.png.

"use client";
import React, { useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

// --- PLACEHOLDER MODELS USING BASIC GEOMETRY FOR DEMO ---
// In a real project, replace these with: const { scene } = useGLTF('/models/quran.glb');

export function RahlStand() {
  const standRef = useRef();
  // Using simplified geometry to represent the crossed wood structure
  return (
    <group ref={standRef} position={[0, -1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Leg 1 */}
      <mesh rotation={[Math.PI / 4, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <meshStandardMaterial color="#3a1a06" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Leg 2 */}
      <mesh rotation={[-Math.PI / 4, 0, 0]} castShadow receiveShadow position={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <meshStandardMaterial color="#4a2008" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function QuranBook({ text, surahName }) {
  const bookRef = useRef();
  
  // Realism Note: A truly curved book should be a GLTF model.
  // This uses a simple curved plane approximation for the demo.
  return (
    <group ref={bookRef} position={[0, -0.15, 0.1]} rotation={[Math.PI / 6, 0, 0]}>
      
      {/* Spine */}
      <mesh castShadow receiveShadow position={[0,0,-0.1]} rotation={[0,0,0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.72, 16]} />
        <meshStandardMaterial color="#5a2a0a" roughness={1} metalness={0} />
      </mesh>

      {/* Pages (Curved Shape for Realism) */}
      <group>
        {/* Left Page (Curved) */}
        <mesh position={[-1.05, 0, 0]} rotation={[0, -0.3, 0]} castShadow receiveShadow>
          <planeGeometry args={[2.1, 2.72]} />
          <meshStandardMaterial color="#fef9ed" roughness={1} metalness={0} side={THREE.DoubleSide}/>
          
          {/* Content (Title/Text) projected using Text component for now */}
          <Text
            position={[0, 1.1, 0.01]}
            fontSize={0.1}
            color="#b8282a"
            font="/Amiri-Regular.ttf" // Make sure you have this font or similar
            anchorX="center"
          >
            {surahName ? `سورة ${surahName}` : "سورة الفاتحة"}
          </Text>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.12}
            maxWidth={1.8}
            lineHeight={1.9}
            color="#130900"
            font="/Amiri-Quran.ttf" // Make sure you have this font or similar
            anchorX="center"
            textAlign="justify"
            direction="rtl"
          >
            {text || "بِسۡمِ ٱللَّهِ..."}
          </Text>
        </mesh>

        {/* Right Page (Curved) */}
        <mesh position={[1.05, 0, 0]} rotation={[0, 0.3, 0]} castShadow receiveShadow>
          <planeGeometry args={[2.1, 2.72]} />
          <meshStandardMaterial color="#ede0b5" roughness={1} metalness={0} side={THREE.DoubleSide}/>
           <Text
            position={[0, 0, 0.01]}
            fontSize={0.12}
            maxWidth={1.8}
            lineHeight={1.9}
            color="#130900"
            font="/Tajawal-Regular.ttf"
            anchorX="center"
            textAlign="justify"
            direction="rtl"
          >
            ...صفحة بيضاء للتمثيل
          </Text>
        </mesh>
      </group>
    </group>
  );
}

// In a final setup, you would replace the above components with a full GLTF load:
/*
export function QuranSceneModel() {
  const { scene } = useGLTF('/models/quran_with_rahl.glb'); // Photorealistic model
  return <primitive object={scene} scale={2} />;
}
useGLTF.preload('/models/quran_with_rahl.glb');
*/