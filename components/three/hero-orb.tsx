'use client';

import { useEffect, useRef } from 'react';

type ThreeGlobal = typeof window & { THREE?: any };

export function HeroOrb() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const w = window as ThreeGlobal;
    const THREE = w.THREE;
    if (!THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.1, 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const ro = new ResizeObserver(() => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    ro.observe(host);

    let raf = 0;
    const tick = () => {
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.004;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]"
      aria-hidden="true"
    />
  );
}

