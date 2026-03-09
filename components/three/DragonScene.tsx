'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DragonScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 22);
        camera.lookAt(0, 0, 0);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x1a0533, 0.8);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0x8b5cf6, 6, 40);
        purpleLight.position.set(-8, 6, 10);
        scene.add(purpleLight);

        const cyanLight = new THREE.PointLight(0x06b6d4, 5, 40);
        cyanLight.position.set(8, -3, 10);
        scene.add(cyanLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 3, 30);
        goldLight.position.set(0, 10, -5);
        scene.add(goldLight);

        const rimLight = new THREE.DirectionalLight(0xa78bfa, 2);
        rimLight.position.set(-5, 5, -10);
        scene.add(rimLight);

        // ─── MATERIALS ─────────────────────────────────────────────────────────────
        const bodyMat = new THREE.MeshStandardMaterial({
            color: 0x1a0a3e,
            emissive: 0x4b1a8a,
            emissiveIntensity: 0.3,
            roughness: 0.3,
            metalness: 0.7,
        });
        const scaleMat = new THREE.MeshStandardMaterial({
            color: 0x2d1060,
            emissive: 0x7c3aed,
            emissiveIntensity: 0.4,
            roughness: 0.2,
            metalness: 0.8,
        });
        const wingMat = new THREE.MeshStandardMaterial({
            color: 0x0d4f6e,
            emissive: 0x0ea5e9,
            emissiveIntensity: 0.5,
            roughness: 0.1,
            metalness: 0.6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
        });
        const eyeMat = new THREE.MeshStandardMaterial({
            color: 0xff4500,
            emissive: 0xff6b00,
            emissiveIntensity: 3,
            roughness: 0,
            metalness: 0,
        });
        const hornMat = new THREE.MeshStandardMaterial({
            color: 0x1e3a5f,
            emissive: 0x06b6d4,
            emissiveIntensity: 0.8,
            roughness: 0.1,
            metalness: 0.9,
        });

        // ─── DRAGON GROUP ──────────────────────────────────────────────────────────
        const dragon = new THREE.Group();
        scene.add(dragon);

        // Helper: Tapered tube segment
        const makeTube = (
            radiusTop: number, radiusBot: number, height: number,
            mat: THREE.Material, y = 0, x = 0, z = 0, rx = 0
        ) => {
            const geo = new THREE.CylinderGeometry(radiusTop, radiusBot, height, 20, 4);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(x, y, z);
            mesh.rotation.x = rx;
            mesh.castShadow = true;
            return mesh;
        };

        // ─── BODY (sinuous S-curve) ────────────────────────────────────────────────
        const bodyGroup = new THREE.Group();
        dragon.add(bodyGroup);

        // Spine segments along a curve
        const spinePoints = [
            new THREE.Vector3(0, -6, 0),
            new THREE.Vector3(1.5, -3, 0.5),
            new THREE.Vector3(2, 0, 0),
            new THREE.Vector3(1, 3, 0),
            new THREE.Vector3(-1, 5, -0.5),
            new THREE.Vector3(-2, 7, 0),
        ];
        const spineCurve = new THREE.CatmullRomCurve3(spinePoints);

        // Body tapers
        for (let i = 0; i < 20; i++) {
            const t = i / 19;
            const pt = spineCurve.getPoint(t);
            const tNext = Math.min((i + 1) / 19, 1);
            const ptNext = spineCurve.getPoint(tNext);
            const dir = ptNext.clone().sub(pt).normalize();
            const radius = 0.9 - t * 0.5 + Math.sin(t * Math.PI) * 0.3;
            const seg = makeTube(radius * 0.9, radius, 0.9, bodyMat, 0, pt.x, pt.z);
            seg.position.y = pt.y;
            seg.lookAt(ptNext);
            seg.rotateX(Math.PI / 2);
            bodyGroup.add(seg);
        }

        // Belly scales row
        for (let i = 0; i < 14; i++) {
            const t = i / 13;
            const pt = spineCurve.getPoint(t);
            const r = 0.7 - t * 0.3;
            const scaleGeo = new THREE.SphereGeometry(r * 0.55, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6);
            const scale = new THREE.Mesh(scaleGeo, scaleMat);
            scale.position.set(pt.x + 0.6, pt.y - 0.2, pt.z);
            bodyGroup.add(scale);
        }

        // Dorsal spines along body
        for (let i = 2; i < 18; i++) {
            const t = i / 19;
            const pt = spineCurve.getPoint(t);
            const h = 0.3 + Math.sin(t * Math.PI) * 0.6;
            const spineGeo = new THREE.ConeGeometry(0.08, h, 6);
            const spine = new THREE.Mesh(spineGeo, hornMat);
            spine.position.set(pt.x, pt.y + 0.5, pt.z - 0.3);
            spine.rotation.z = 0.15;
            bodyGroup.add(spine);
        }

        // ─── 5 HEADS on separate necks ─────────────────────────────────────────────
        const headOffsets = [
            { x: 0, y: 0, z: 0, ry: 0, rx: -0.2 },          // center
            { x: -2.8, y: -0.8, z: 0.3, ry: 0.5, rx: -0.1 }, // left outer
            { x: -1.4, y: -0.2, z: 0.2, ry: 0.25, rx: -0.15 },// left inner
            { x: 1.4, y: -0.2, z: 0.2, ry: -0.25, rx: -0.15 },// right inner
            { x: 2.8, y: -0.8, z: 0.3, ry: -0.5, rx: -0.1 }, // right outer
        ];

        const headRoot = spineCurve.getPoint(1);

        headOffsets.forEach((off, hi) => {
            const headGroup = new THREE.Group();
            headGroup.position.set(headRoot.x + off.x, headRoot.y + off.y + 1.5, headRoot.z + off.z);
            headGroup.rotation.y = off.ry;
            headGroup.rotation.x = off.rx;
            dragon.add(headGroup);

            // Neck
            const neckGeo = new THREE.CylinderGeometry(0.25, 0.5, 2.5, 12, 3, false);
            const neck = new THREE.Mesh(neckGeo, bodyMat);
            neck.position.y = -1.2;
            neck.castShadow = true;
            headGroup.add(neck);

            // Head box
            const headGeo = new THREE.BoxGeometry(0.9, 0.7, 1.4);
            const head = new THREE.Mesh(headGeo, bodyMat);
            head.position.y = 0.1;
            head.castShadow = true;
            headGroup.add(head);

            // Snout
            const snoutGeo = new THREE.BoxGeometry(0.6, 0.45, 1.0);
            const snout = new THREE.Mesh(snoutGeo, scaleMat);
            snout.position.set(0, -0.1, 0.9);
            headGroup.add(snout);

            // Eyes (2 per head)
            [-0.28, 0.28].forEach(ex => {
                const eyeGeo = new THREE.SphereGeometry(0.12, 10, 10);
                const eye = new THREE.Mesh(eyeGeo, eyeMat);
                eye.position.set(ex, 0.2, 0.45);
                headGroup.add(eye);

                // Eye glow ring
                const glowGeo = new THREE.TorusGeometry(0.16, 0.03, 8, 16);
                const glowMat = new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xff6b00, emissiveIntensity: 2 });
                const glow = new THREE.Mesh(glowGeo, glowMat);
                glow.position.set(ex, 0.2, 0.44);
                glow.rotation.y = Math.PI / 2;
                headGroup.add(glow);
            });

            // Horns (2 per head)
            [-0.3, 0.3].forEach((hx, j) => {
                const hornGeo = new THREE.ConeGeometry(0.07, 0.7 + hi * 0.05, 6);
                const horn = new THREE.Mesh(hornGeo, hornMat);
                horn.position.set(hx, 0.65, 0.1);
                horn.rotation.z = (j === 0 ? -1 : 1) * 0.3;
                horn.rotation.x = -0.2;
                headGroup.add(horn);
            });

            // Crown spines for center head
            if (hi === 0) {
                for (let s = 0; s < 5; s++) {
                    const crownGeo = new THREE.ConeGeometry(0.05, 0.4 + s * 0.05, 5);
                    const crownSpine = new THREE.Mesh(crownGeo, hornMat);
                    crownSpine.position.set((s - 2) * 0.18, 0.58, -0.1);
                    crownSpine.rotation.x = 0.3;
                    headGroup.add(crownSpine);
                }
            }

            // Fire breath emitter placeholder
            const fireGeo = new THREE.ConeGeometry(0.12, 0.5, 8);
            const fireMat = new THREE.MeshStandardMaterial({
                color: 0xff6600,
                emissive: 0xff4400,
                emissiveIntensity: 4,
                transparent: true,
                opacity: 0.7,
            });
            const fire = new THREE.Mesh(fireGeo, fireMat);
            fire.position.set(0, -0.02, 1.42);
            fire.rotation.x = -Math.PI / 2;
            headGroup.add(fire);
        });

        // ─── TAIL ─────────────────────────────────────────────────────────────────
        const tailGroup = new THREE.Group();
        dragon.add(tailGroup);
        for (let i = 0; i < 12; i++) {
            const t = i / 11;
            const r = 0.65 - t * 0.58;
            const tGeo = new THREE.CylinderGeometry(r * 0.8, r, 1.0, 10, 2);
            const tSeg = new THREE.Mesh(tGeo, bodyMat);
            const angle = t * 2.5;
            tSeg.position.set(
                Math.sin(angle) * 1.5 * t,
                -7 - i * 0.9,
                Math.cos(angle) * 0.5 * t
            );
            tSeg.rotation.z = Math.sin(angle) * 0.2;
            tSeg.castShadow = true;
            tailGroup.add(tSeg);
        }
        // Tail spike
        const tailSpikeGeo = new THREE.ConeGeometry(0.12, 1.0, 6);
        const tailSpike = new THREE.Mesh(tailSpikeGeo, hornMat);
        tailSpike.position.set(0, -18.2, 0);
        tailGroup.add(tailSpike);

        // ─── 10 PAIRS OF WINGS (20 wings total) ───────────────────────────────────
        const wingGroup = new THREE.Group();
        dragon.add(wingGroup);

        const makeWingBlade = (
            span: number, height: number, angle: number, xSign: number,
            yBase: number, zOff: number
        ) => {
            // Main wing membrane (triangle-ish shape using custom geometry)
            const verts = new Float32Array([
                0, 0, 0,
                xSign * span * 0.5, height * 0.3, zOff * 0.3,
                xSign * span, height * 0.05, zOff,
                xSign * span * 0.8, -height * 0.2, zOff * 0.6,
                xSign * span * 0.4, -height * 0.4, 0,
                0, -height * 0.3, 0,
            ]);
            const indices = new Uint16Array([
                0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5,
                0, 2, 1, 0, 3, 2, 0, 4, 3, 0, 5, 4,
            ]);
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
            geo.setIndex(new THREE.BufferAttribute(indices, 1));
            geo.computeVertexNormals();

            const mesh = new THREE.Mesh(geo, wingMat);
            mesh.position.set(xSign * 0.8, yBase, 0);
            mesh.rotation.y = xSign * angle;
            return mesh;
        };

        // 10 pairs along the body spine
        for (let p = 0; p < 10; p++) {
            const t = p / 9;
            const pt = spineCurve.getPoint(0.15 + t * 0.7);
            const scale = 1.5 - t * 0.9; // front wings bigger
            const span = 5 * scale;
            const height = 2.5 * scale;
            const yBaseOffset = 0.3;
            const zSpread = 0.5 * t;

            // Left wing
            const wL = makeWingBlade(span, height, 0.25 + t * 0.2, -1, pt.y + yBaseOffset, zSpread);
            wL.position.set(pt.x - 0.8, pt.y + yBaseOffset, pt.z);
            wingGroup.add(wL);

            // Right wing
            const wR = makeWingBlade(span, height, 0.25 + t * 0.2, 1, pt.y + yBaseOffset, zSpread);
            wR.position.set(pt.x + 0.8, pt.y + yBaseOffset, pt.z);
            wingGroup.add(wR);

            // Wing ribs (3 per wing)
            for (let r = 0; r < 3; r++) {
                const ribFrac = (r + 1) / 4;
                const ribLen = span * (1 - ribFrac * 0.3);
                const ribGeo = new THREE.CylinderGeometry(0.025, 0.04, ribLen, 6);
                [-1, 1].forEach((side) => {
                    const rib = new THREE.Mesh(ribGeo, hornMat);
                    rib.position.set(
                        pt.x + side * (ribLen * 0.5 + 0.8),
                        pt.y + yBaseOffset - ribFrac * height * 0.3,
                        pt.z
                    );
                    rib.rotation.z = side * (Math.PI / 2 + 0.1 + ribFrac * 0.3);
                    wingGroup.add(rib);
                });
            }
        }

        // ─── LEGS (front + back pair) ──────────────────────────────────────────────
        const legPairs = [
            { t: 0.2, y: -2, side: [-1, 1] },
            { t: 0.6, y: -4, side: [-1, 1] },
        ];
        legPairs.forEach(({ t, y, side }) => {
            const pt = spineCurve.getPoint(t);
            side.forEach((s) => {
                // Upper leg
                const upperGeo = new THREE.CylinderGeometry(0.2, 0.25, 2, 8);
                const upper = new THREE.Mesh(upperGeo, bodyMat);
                upper.position.set(pt.x + s * 1.5, pt.y - 1, pt.z);
                upper.rotation.z = s * 0.4;
                upper.castShadow = true;
                dragon.add(upper);

                // Lower leg
                const lowerGeo = new THREE.CylinderGeometry(0.14, 0.18, 1.5, 8);
                const lower = new THREE.Mesh(lowerGeo, scaleMat);
                lower.position.set(pt.x + s * 2.1, pt.y - 2.5, pt.z);
                lower.rotation.z = s * 0.2;
                lower.castShadow = true;
                dragon.add(lower);

                // Claws (3 per foot)
                for (let c = 0; c < 3; c++) {
                    const clawGeo = new THREE.ConeGeometry(0.05, 0.4, 5);
                    const claw = new THREE.Mesh(clawGeo, hornMat);
                    claw.position.set(
                        pt.x + s * 2.3 + (c - 1) * 0.25,
                        pt.y - 3.4,
                        pt.z + (c - 1) * 0.1
                    );
                    claw.rotation.x = 0.5;
                    dragon.add(claw);
                }
            });
        });

        // ─── MOUSE / TILT TRACKING ─────────────────────────────────────────────────
        let targetX = 0, targetY = 0;
        const mouse = { x: 0, y: 0 };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        const onDeviceTilt = (e: DeviceOrientationEvent) => {
            if (e.gamma != null && e.beta != null) {
                mouse.x = e.gamma / 45;
                mouse.y = e.beta / 90;
            }
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('deviceorientation', onDeviceTilt);

        // ─── SCROLL DRIVEN SCALE ──────────────────────────────────────────────────
        let scrollProgress = 0;
        const onScroll = () => {
            scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // ─── ANIMATION LOOP ───────────────────────────────────────────────────────
        let frameId: number;
        const clock = new THREE.Clock();
        let animTime = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            animTime += delta;

            // Smooth mouse tracking
            targetX += (mouse.x * 0.8 - targetX) * 0.05;
            targetY += (mouse.y * 0.4 - targetY) * 0.05;
            dragon.rotation.y = targetX * 0.6;
            dragon.rotation.x = -targetY * 0.3;

            // Scroll scale + fade
            const scale = 1 - scrollProgress * 0.4;
            dragon.scale.setScalar(scale);
            dragon.position.z = -scrollProgress * 5;

            // Idle body wave
            const t = animTime;
            bodyGroup.children.forEach((child, i) => {
                if (child instanceof THREE.Mesh) {
                    child.position.x += Math.sin(t * 1.2 + i * 0.5) * 0.002;
                }
            });

            // Wing flap animation
            wingGroup.children.forEach((wing, i) => {
                if (wing instanceof THREE.Mesh) {
                    const dir = i % 2 === 0 ? -1 : 1;
                    wing.rotation.z = dir * (0.1 + Math.sin(t * 2 + i * 0.2) * 0.25);
                }
            });

            // Head sway
            dragon.children.forEach((child, i) => {
                if (i > 0 && i <= 5) { // head groups
                    (child as THREE.Group).rotation.y += Math.sin(t * 0.8 + i) * 0.001;
                    (child as THREE.Group).rotation.x += Math.cos(t * 0.6 + i) * 0.0005;
                }
            });

            // Fire pulse
            const fireScale = 0.8 + Math.sin(t * 6) * 0.2;
            dragon.traverse((obj) => {
                if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
                    if ((obj.material as THREE.MeshStandardMaterial).emissiveIntensity > 2) {
                        obj.scale.z = fireScale;
                    }
                }
            });

            // Light orbit
            purpleLight.position.x = Math.sin(t * 0.4) * 10;
            purpleLight.position.y = Math.cos(t * 0.3) * 6 + 4;
            cyanLight.position.x = Math.cos(t * 0.5) * 8;
            cyanLight.position.y = Math.sin(t * 0.4) * 5 - 2;

            // Float
            dragon.position.y = Math.sin(t * 0.7) * 0.5;

            renderer.render(scene, camera);
        };
        animate();

        // ─── RESIZE ─────────────────────────────────────────────────────────────────
        const onResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('deviceorientation', onDeviceTilt);
            window.removeEventListener('scroll', onScroll);
            resizeObserver.disconnect();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            scene.clear();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            aria-hidden="true"
            role="img"
            aria-label="3D animated five-headed dragon"
        />
    );
}
