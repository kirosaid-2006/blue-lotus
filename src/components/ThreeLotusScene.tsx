'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeLotusScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1628, 2.5);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 4, 10);
    goldPointLight.position.set(2, 3, 2);
    scene.add(goldPointLight);

    const bluePointLight = new THREE.PointLight(0x3b82f6, 3, 10);
    bluePointLight.position.set(-2, 1, 1);
    scene.add(bluePointLight);

    const centerGlow = new THREE.PointLight(0xfef08a, 2.5, 5);
    centerGlow.position.set(0, 0.5, 0);
    scene.add(centerGlow);

    // Group for the 3D Lotus
    const lotusGroup = new THREE.Group();
    scene.add(lotusGroup);

    // Custom Petal Geometry Creator
    const createPetalGeometry = (width: number, length: number, curve: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(width * 0.8, length * 0.4, width * 0.5, length * 0.8);
      shape.quadraticCurveTo(0, length * 1.1, 0, length * 1.1);
      shape.quadraticCurveTo(0, length * 1.1, -width * 0.5, length * 0.8);
      shape.quadraticCurveTo(-width * 0.8, length * 0.4, 0, 0);

      const extrudeSettings = {
        steps: 1,
        depth: 0.03,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      };

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      
      // Bend petal outward
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const bend = Math.pow(y / length, 2) * curve;
        pos.setZ(i, z + bend);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // Materials: Outer Royal Blue & Inner Golden Sheen
    const blueMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f2d59,
      metalness: 0.8,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });

    // 1. Layer: Inner Petals (8 petals)
    const innerCount = 8;
    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2;
      const geom = createPetalGeometry(0.35, 0.85, 0.25);
      const mesh = new THREE.Mesh(geom, goldMaterial);
      mesh.rotation.y = angle;
      mesh.rotation.x = 0.5;
      mesh.position.y = 0.1;
      lotusGroup.add(mesh);
    }

    // 2. Layer: Middle Petals (10 petals)
    const midCount = 10;
    for (let i = 0; i < midCount; i++) {
      const angle = (i / midCount) * Math.PI * 2 + 0.3;
      const geom = createPetalGeometry(0.5, 1.2, 0.5);
      const mesh = new THREE.Mesh(geom, blueMaterial);
      mesh.rotation.y = angle;
      mesh.rotation.x = 0.8;
      mesh.position.y = 0;
      lotusGroup.add(mesh);
    }

    // 3. Layer: Outer Royal Petals (12 petals)
    const outerCount = 12;
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2;
      const geom = createPetalGeometry(0.65, 1.5, 0.8);
      const mesh = new THREE.Mesh(geom, blueMaterial);
      mesh.rotation.y = angle;
      mesh.rotation.x = 1.15;
      mesh.position.y = -0.1;
      lotusGroup.add(mesh);
    }

    // 4. Center Golden Seed Pod / Receptacle
    const podGeom = new THREE.CylinderGeometry(0.25, 0.1, 0.2, 16);
    const podMesh = new THREE.Mesh(podGeom, goldMaterial);
    podMesh.position.y = 0.2;
    lotusGroup.add(podMesh);

    // 5. Floating Golden Dust Particles (Stardust)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 6;
      scales[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf3e5ab,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 1.5;
      targetRotationX = mouseY * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and breathing
      lotusGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      
      // Smooth continuous slow rotation + mouse tilt
      lotusGroup.rotation.y += 0.005;
      lotusGroup.rotation.y += (targetRotationY - (lotusGroup.rotation.y % (Math.PI * 2))) * 0.02;
      lotusGroup.rotation.x = 0.2 + THREE.MathUtils.lerp(lotusGroup.rotation.x, targetRotationX, 0.05);

      // Rotate stardust particles slowly
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Pulse center light
      centerGlow.intensity = 2.2 + Math.sin(elapsedTime * 3) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />
      
      {/* Subtle Golden Glow Overlay */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
