import { useEffect, useRef } from "react";
import * as THREE from "three";

const GEM_COLORS = [0x6d4fe0, 0x0e8388, 0xd1477a, 0xc97d2c, 0x0e8388, 0x6d4fe0];

export default function HeroOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    scene.add(rig);

    // Layered wireframe icosahedron — two slightly offset shells for a glowing chromatic edge
    const icoGeo = new THREE.IcosahedronGeometry(1.7, 0);
    const edges = new THREE.EdgesGeometry(icoGeo);
    const wireOuter = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x0e8388, transparent: true, opacity: 0.75 })
    );
    const wireInner = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x6d4fe0, transparent: true, opacity: 1 })
    );
    wireInner.scale.setScalar(0.985);
    rig.add(wireOuter, wireInner);

    // Solid glass-like fill so faces catch light
    const fill = new THREE.Mesh(
      icoGeo,
      new THREE.MeshPhongMaterial({
        color: 0x4a3d7a,
        transparent: true,
        opacity: 0.2,
        shininess: 90,
        specular: 0x0e8388,
        side: THREE.DoubleSide,
      })
    );
    rig.add(fill);

    // Pulsing crystal core — a saturated glow at the center
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x6d4fe0, transparent: true, opacity: 0.9 })
    );
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x0e8388,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    rig.add(core, coreGlow);

    // Inner smaller counter-rotating shell for depth
    const innerGeo = new THREE.IcosahedronGeometry(1.02, 0);
    const innerWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(innerGeo),
      new THREE.LineBasicMaterial({ color: 0x0e8388, transparent: true, opacity: 0.5 })
    );
    rig.add(innerWire);

    // Floating gems around the shell, each with a soft additive glow halo
    const gemGroup = new THREE.Group();
    const gems = GEM_COLORS.map((color, i) => {
      const size = 0.17 + (i % 2) * 0.05;
      const geo = new THREE.OctahedronGeometry(size, 0);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.25,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const haloGeo = new THREE.SphereGeometry(size * 2.1, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      const phi = Math.acos(1 - (2 * (i + 0.5)) / GEM_COLORS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 2.3;
      mesh.userData.base = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      mesh.userData.phase = i * 1.3;
      mesh.position.copy(mesh.userData.base);
      gemGroup.add(mesh);
      return mesh;
    });
    rig.add(gemGroup);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const light1 = new THREE.PointLight(0x6d4fe0, 7, 14);
    light1.position.set(3, 2, 3);
    const light2 = new THREE.PointLight(0x0e8388, 6, 14);
    light2.position.set(-3, -2, 2);
    const light3 = new THREE.PointLight(0xd1477a, 3, 10);
    light3.position.set(0, -3, 2);
    scene.add(ambient, light1, light2, light3);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf;

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      rig.rotation.y = t * 0.34;
      rig.rotation.x = Math.sin(t * 0.22) * 0.3;
      rig.rotation.z = Math.cos(t * 0.17) * 0.12;
      const breathe = 1 + Math.sin(t * 0.6) * 0.035;
      rig.scale.setScalar(breathe);

      innerWire.rotation.y = -t * 0.55;
      innerWire.rotation.x = Math.cos(t * 0.35) * 0.25;

      const corePulse = 1 + Math.sin(t * 1.8) * 0.25;
      coreGlow.scale.setScalar(corePulse);
      core.material.opacity = 0.75 + Math.sin(t * 1.8) * 0.2;

      gems.forEach((g) => {
        const { base, phase } = g.userData;
        g.position.set(
          base.x + Math.sin(t * 0.9 + phase) * 0.14,
          base.y + Math.cos(t * 0.8 + phase) * 0.14,
          base.z + Math.sin(t * 0.6 + phase) * 0.1
        );
        g.rotation.x += 0.012;
        g.rotation.y += 0.016;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(renderFrame);
    };

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      renderFrame();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      const disposed = new Set();
      scene.traverse((obj) => {
        if (obj.geometry && !disposed.has(obj.geometry)) {
          disposed.add(obj.geometry);
          obj.geometry.dispose();
        }
        if (obj.material && !disposed.has(obj.material)) {
          disposed.add(obj.material);
          obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="mx-auto aspect-square w-full max-w-lg"
      style={{ filter: "drop-shadow(0 0 28px rgba(109,79,224,0.25)) drop-shadow(0 0 50px rgba(14,131,136,0.14))" }}
    />
  );
}
