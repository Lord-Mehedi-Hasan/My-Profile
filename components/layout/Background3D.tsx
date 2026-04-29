'use client';

import { useEffect, useRef } from 'react';

/**
 * Global fixed 3D background — Three.js scene of floating wireframe
 * polyhedra that slowly drift and rotate. On scroll the whole field
 * moves in 3-D (y-parallax + z-depth shift) giving the impression that
 * the shapes travel with you as you navigate between sections.
 *
 * Deliberately subtle: very low opacity so it never competes with content.
 */
export default function Background3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animId: number;
        let renderer: import('three').WebGLRenderer;
        let cleanup = false;

        const init = async () => {
            try {
                // Skip on mobile / low-power — biggest performance win
                if (window.innerWidth < 768) return;

                const THREE = await import('three');
                if (cleanup) return;

                const w = window.innerWidth;
                const h = window.innerHeight;

                renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
                // Cap to 1.0 — retina DPR doubles GPU work for minimal visual gain
                renderer.setPixelRatio(1);
                renderer.setSize(w, h);


                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
                camera.position.set(0, 0, 30);

                /* ── Shape catalogue ── */
                const geometries = [
                    new THREE.IcosahedronGeometry(1, 0),
                    new THREE.OctahedronGeometry(1.1, 0),
                    new THREE.TetrahedronGeometry(1.2, 0),
                    new THREE.BoxGeometry(1.4, 1.4, 1.4),
                    new THREE.IcosahedronGeometry(0.7, 1),
                    new THREE.OctahedronGeometry(0.8, 0),
                ];

                const color1 = new THREE.Color(0x4A90D9); // Icy Blue
                const color2 = new THREE.Color(0x2ECC8A); // Jade accent

                /* ── Seed N shapes — reduced from 42 to 18 for performance ── */
                const N = 18;

                type ShapeData = {
                    mesh: import('three').Mesh;
                    speedRot: import('three').Vector3;
                    speedDrift: import('three').Vector3;
                    baseY: number;
                    parallaxFactor: number; // how much it shifts on scroll
                    depthFactor: number;    // z drift on scroll
                };
                const shapes: ShapeData[] = [];

                for (let i = 0; i < N; i++) {
                    const geo = geometries[i % geometries.length];
                    const useAlt = i % 3 === 0;
                    const mat = new THREE.MeshBasicMaterial({
                        color: useAlt ? color2 : color1,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.08 + Math.random() * 0.10,
                    });
                    const mesh = new THREE.Mesh(geo, mat);

                    // spread across a wide frustum
                    mesh.position.set(
                        (Math.random() - 0.5) * 80,
                        (Math.random() - 0.5) * 60,
                        (Math.random() - 0.5) * 40,
                    );
                    const s = 0.5 + Math.random() * 1.8;
                    mesh.scale.setScalar(s);
                    mesh.rotation.set(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                    );

                    scene.add(mesh);
                    shapes.push({
                        mesh,
                        speedRot: new THREE.Vector3(
                            (Math.random() - 0.5) * 0.006,
                            (Math.random() - 0.5) * 0.008,
                            (Math.random() - 0.5) * 0.004,
                        ),
                        speedDrift: new THREE.Vector3(
                            (Math.random() - 0.5) * 0.012,
                            (Math.random() - 0.5) * 0.008,
                            0,
                        ),
                        baseY: mesh.position.y,
                        parallaxFactor: 0.012 + Math.random() * 0.025, // scroll parallax intensity
                        depthFactor: 0.008 + Math.random() * 0.015, // z-shift on scroll
                    });
                }

                /* ── Scroll state ── */
                let scrollY = window.scrollY;
                let targetScrollY = window.scrollY;
                const onScroll = () => { targetScrollY = window.scrollY; };
                window.addEventListener('scroll', onScroll, { passive: true });

                /* ── Subtle mouse tilt on camera ── */
                let mouseX = 0, mouseY = 0;
                const onMouse = (e: MouseEvent) => {
                    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                };
                window.addEventListener('mousemove', onMouse, { passive: true });

                /* ── Resize ── */
                const onResize = () => {
                    const nw = window.innerWidth;
                    const nh = window.innerHeight;
                    camera.aspect = nw / nh;
                    camera.updateProjectionMatrix();
                    renderer.setSize(nw, nh);
                };
                window.addEventListener('resize', onResize, { passive: true });

                /* ── Render loop ── */
                let t = 0;
                const animate = () => {
                    if (cleanup) return;
                    animId = requestAnimationFrame(animate);
                    t += 0.005;

                    // Smooth scroll lerp
                    scrollY += (targetScrollY - scrollY) * 0.06;

                    // Camera gentle tilt towards mouse
                    camera.rotation.x += (-mouseY * 0.03 - camera.rotation.x) * 0.04;
                    camera.rotation.y += (mouseX * 0.05 - camera.rotation.y) * 0.04;

                    shapes.forEach((sd) => {
                        // Rotation
                        sd.mesh.rotation.x += sd.speedRot.x;
                        sd.mesh.rotation.y += sd.speedRot.y;
                        sd.mesh.rotation.z += sd.speedRot.z;

                        // Gentle autonomous drift (wrap-around)
                        sd.mesh.position.x += sd.speedDrift.x;
                        sd.mesh.position.y += sd.speedDrift.y;

                        if (sd.mesh.position.x > 45) sd.mesh.position.x = -45;
                        if (sd.mesh.position.x < -45) sd.mesh.position.x = 45;
                        if (sd.mesh.position.y > 35) sd.mesh.position.y = -35;
                        if (sd.mesh.position.y < -35) sd.mesh.position.y = 35;

                        // ── Scroll parallax: Y shift + Z depth pull ──
                        // As user scrolls down (scrollY increases) shapes move UP
                        // at different speeds → parallax depth illusion
                        const scrollShiftY = -scrollY * sd.parallaxFactor;
                        const scrollShiftZ = -scrollY * sd.depthFactor * 0.5;
                        sd.mesh.position.y = (sd.mesh.position.y % 35) + scrollShiftY * 0.015;
                        sd.mesh.position.z = (sd.mesh.position.z % 20) + scrollShiftZ * 0.015;

                        // Pulsing size
                        const pulse = 1 + Math.sin(t * 1.2 + sd.parallaxFactor * 100) * 0.06;
                        sd.mesh.scale.setScalar(
                            (0.5 + sd.parallaxFactor * 30) * pulse
                        );
                    });

                    renderer.render(scene, camera);
                };
                animate();

                return () => {
                    window.removeEventListener('scroll', onScroll);
                    window.removeEventListener('mousemove', onMouse);
                    window.removeEventListener('resize', onResize);
                };
            } catch {
                // Three.js unavailable — silent fail, background just stays empty
            }
        };

        const cleanupFn = init();
        return () => {
            cleanup = true;
            cancelAnimationFrame(animId);
            renderer?.dispose();
            cleanupFn?.then?.(fn => fn?.());
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 1,
            }}
        />
    );
}
