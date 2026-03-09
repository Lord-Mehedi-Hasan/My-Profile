'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './HeroCanvas.module.css';

export default function HeroCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        /* ── Renderer ─────────────────────────────────── */
        const W = mount.clientWidth;
        const H = mount.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        /* ── Scene / Camera ───────────────────────────── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
        camera.position.set(0, 0, 5);

        /* ── Custom vertex/fragment shader ────────────── */
        const vertexShader = /* glsl */`
            uniform float uTime;
            uniform vec2  uMouse;
            varying vec3  vNormal;
            varying vec3  vPosition;
            varying vec2  vUv;

            // Perlin-style noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }
            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                i = mod289(i);
                vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
                    i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
                    i.x + vec4(0.0, i1.x, i2.x, 1.0));
                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);
                vec4 x = x_ * ns.x + ns.yyyy;
                vec4 y = y_ * ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            void main() {
                vUv = uv;
                vNormal = normal;

                // Organic displacement
                float noise = snoise(position * 1.2 + vec3(uTime * 0.18));
                float disp  = noise * 0.28;

                // Mouse influence
                vec3 displaced = position + normal * disp;
                displaced.x   += uMouse.x * 0.18 * noise;
                displaced.y   += uMouse.y * 0.18 * noise;

                vPosition = displaced;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
            }
        `;

        const fragmentShader = /* glsl */`
            uniform float uTime;
            uniform vec2  uMouse;
            varying vec3  vNormal;
            varying vec3  vPosition;
            varying vec2  vUv;

            void main() {
                vec3 n = normalize(vNormal);

                // Base dark metallic tone
                vec3 base  = vec3(0.06, 0.06, 0.07);

                // Rim light — Icy Blue accent
                float rim  = pow(1.0 - abs(dot(n, vec3(0.0, 0.0, 1.0))), 3.2);
                vec3 rimColor = vec3(0.29, 0.565, 0.851) * rim * 2.0; // #4A90D9 Icy Blue

                // Ambient light shimmer
                float shim = 0.5 + 0.5 * sin(vPosition.y * 3.0 + uTime * 0.6);
                vec3 shimColor = vec3(0.9, 0.9, 1.0) * shim * 0.12;

                // Fresnel
                float fres = pow(rim, 1.5) * 0.4;
                vec3 fresColor = vec3(1.0) * fres;

                // Mouse-reactive highlight
                vec2 mDir = normalize(uMouse + 0.001);
                float mHigh = max(0.0, dot(n.xy, mDir));
                vec3 mouseHL = vec3(0.3) * pow(mHigh, 4.0);

                vec3 col = base + rimColor + shimColor + fresColor + mouseHL;

                // Subtle chromatic aberration vignette at edges
                float vign = smoothstep(1.0, 0.3, length(vUv - 0.5));
                col *= mix(0.5, 1.0, vign);

                // Slight transparency on edges for depth
                float alpha = mix(0.5, 1.0, vign) * (0.82 + rim * 0.18);
                gl_FragColor = vec4(col, alpha);
            }
        `;

        const uniforms = {
            uTime: { value: 0.0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
        };

        /* ── Geometry: high-poly sphere (icosahedron-style subdivided) ── */
        const geo = new THREE.SphereGeometry(1.5, 128, 128);

        const mat = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
            side: THREE.FrontSide,
        });

        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        /* ── Wireframe cage overlay ──────────────────── */
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x222222,
            wireframe: true,
            transparent: true,
            opacity: 0.06,
        });
        const wireMesh = new THREE.Mesh(new THREE.SphereGeometry(1.51, 32, 32), wireMat);
        scene.add(wireMesh);

        /* ── Outer glow ring ─────────────────────────── */
        const ringGeo = new THREE.TorusGeometry(1.85, 0.008, 8, 120);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x4A90D9, transparent: true, opacity: 0.45 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 4;
        scene.add(ring);

        const ring2 = ring.clone();
        ring2.rotation.x = -Math.PI / 3;
        ring2.rotation.z = Math.PI / 6;
        (ring2.material as THREE.MeshBasicMaterial).color.set(0x2ECC8A);
        (ring2.material as THREE.MeshBasicMaterial).opacity = 0.18;
        scene.add(ring2);

        /* ── Mouse tracking ──────────────────────────── */
        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const onMouseMove = (e: MouseEvent) => {
            mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        /* ── Resize ──────────────────────────────────── */
        const onResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        /* ── Animation loop ──────────────────────────── */
        let raf: number;
        const clock = new THREE.Clock();

        const animate = () => {
            raf = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth mouse lerp
            mouse.x += (mouse.tx - mouse.x) * 0.04;
            mouse.y += (mouse.ty - mouse.y) * 0.04;

            uniforms.uTime.value = t;
            uniforms.uMouse.value.set(mouse.x, mouse.y);

            // Slow auto-rotate
            mesh.rotation.y = t * 0.12 + mouse.x * 0.3;
            mesh.rotation.x = mouse.y * 0.25;
            wireMesh.rotation.y = mesh.rotation.y;
            wireMesh.rotation.x = mesh.rotation.x;

            // Ring animation
            ring.rotation.y = t * 0.25;
            ring.rotation.z = t * 0.1;
            ring2.rotation.y = -t * 0.18;
            ring2.rotation.z = t * 0.22;

            renderer.render(scene, camera);
        };
        animate();

        /* ── Cleanup ─────────────────────────────────── */
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className={styles.canvas} aria-hidden="true" />;
}
