import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { works } from "./data.js";

const GOLD = 0xc4a074;
const GOLD_BRIGHT = 0xe0b090;
const INK = 0x100e0c;

export function createGallery3D({
  mount,
  getLang,
  onFocus,
  onBlur,
  onReady,
  onError,
}) {
  if (!mount) return null;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
  } catch (err) {
    onError?.(err);
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = false;
  mount.appendChild(renderer.domElement);
  renderer.domElement.classList.add("gallery3d-canvas");
  renderer.domElement.setAttribute("aria-label", "3D art gallery");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(INK);
  scene.fog = new THREE.FogExp2(INK, 0.028);

  const camera = new THREE.PerspectiveCamera(
    42,
    mount.clientWidth / Math.max(mount.clientHeight, 1),
    0.1,
    120
  );
  camera.position.set(0, 2.2, 11);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.38;
  controls.zoomSpeed = 0.55;
  controls.minDistance = 3.2;
  controls.maxDistance = 16;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minPolarAngle = Math.PI * 0.22;
  controls.target.set(0, 1.6, 0);
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 0.28;
  controls.enablePan = false;

  // Lights
  scene.add(new THREE.AmbientLight(0x2a241c, 0.55));
  const hemi = new THREE.HemisphereLight(0xffe8c8, 0x1a1210, 0.55);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff0dd, 0.55);
  key.position.set(4, 10, 6);
  if (!isMobile) {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.camera.left = -14;
    key.shadow.camera.right = 14;
    key.shadow.camera.top = 14;
    key.shadow.camera.bottom = -14;
  }
  scene.add(key);

  const rim = new THREE.PointLight(GOLD_BRIGHT, 18, 28, 2);
  rim.position.set(0, 5.5, 0);
  scene.add(rim);

  // Floor
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x161210,
    roughness: 0.35,
    metalness: 0.15,
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(18, 64), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Reflective ring
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(3.2, 3.35, 80),
    new THREE.MeshStandardMaterial({
      color: GOLD,
      emissive: GOLD,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.25,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  scene.add(ring);

  // Center pedestal glow
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.35, 32),
    new THREE.MeshStandardMaterial({
      color: 0x1c1712,
      metalness: 0.4,
      roughness: 0.5,
    })
  );
  pedestal.position.y = 0.18;
  pedestal.castShadow = true;
  scene.add(pedestal);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 24, 24),
    new THREE.MeshStandardMaterial({
      color: GOLD_BRIGHT,
      emissive: GOLD,
      emissiveIntensity: 1.4,
      metalness: 0.8,
      roughness: 0.2,
    })
  );
  core.position.y = 0.7;
  scene.add(core);

  // Soft room walls (open octagon suggestion)
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x14110e,
    roughness: 0.95,
    metalness: 0.05,
    side: THREE.BackSide,
  });
  const hall = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 9, 32, 1, true), wallMat);
  hall.position.y = 4;
  scene.add(hall);

  const ceiling = new THREE.Mesh(
    new THREE.CircleGeometry(14, 32),
    new THREE.MeshStandardMaterial({ color: 0x0c0a08, roughness: 1, side: THREE.BackSide })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 8.2;
  scene.add(ceiling);

  // Dust particles
  const dustCount = isMobile ? 180 : 420;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 22;
    dustPos[i * 3 + 1] = Math.random() * 7 + 0.2;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 22;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xe8d4b0,
      size: isMobile ? 0.035 : 0.028,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    })
  );
  scene.add(dust);

  const loader = new THREE.TextureLoader();
  const frames = [];
  const clickables = [];
  const radius = 6.2;
  const frameGroup = new THREE.Group();
  scene.add(frameGroup);

  const makeFrame = (work, index, texture) => {
    const height = 2.55;
    const width = height * (work.aspect || 0.85);
    const group = new THREE.Group();
    group.userData = { id: work.id, index, work };

    const angle = (index / works.length) * Math.PI * 2 - Math.PI / 2;
    group.position.set(Math.cos(angle) * radius, 1.85, Math.sin(angle) * radius);
    group.lookAt(0, 1.85, 0);
    group.rotateY(Math.PI);

    // Outer gold frame
    const frameDepth = 0.08;
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xb8895a,
      metalness: 0.75,
      roughness: 0.28,
      emissive: 0x3a2814,
      emissiveIntensity: 0.25,
    });
    const outer = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.22, height + 0.22, frameDepth),
      frameMat
    );
    outer.castShadow = true;
    group.add(outer);

    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1a1410,
      roughness: 0.8,
    });
    const matte = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, height + 0.08, frameDepth * 0.6),
      innerMat
    );
    matte.position.z = 0.02;
    group.add(matte);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const art = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.55,
        metalness: 0.05,
      })
    );
    art.position.z = 0.06;
    art.userData = { id: work.id, index, work, isArt: true };
    group.add(art);
    clickables.push(art);

    // Spotlight for each piece
    const spot = new THREE.SpotLight(0xffe6c4, isMobile ? 12 : 18, 14, 0.38, 0.45, 1.4);
    spot.position.set(0, 3.2, 2.4);
    spot.target.position.set(0, 0, 0);
    group.add(spot);
    group.add(spot.target);
    if (!isMobile) {
      spot.castShadow = true;
      spot.shadow.mapSize.set(512, 512);
    }

    // Soft glow plane behind
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 1.35, height * 1.35),
      new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
      })
    );
    glow.position.z = -0.15;
    group.add(glow);

    // Invisible larger hit area
    const hit = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 1.15, height * 1.15),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hit.position.z = 0.07;
    hit.userData = { id: work.id, index, work, isArt: true };
    group.add(hit);
    clickables.push(hit);

    frameGroup.add(group);
    frames.push({ group, art, glow, work, spot });
  };

  // Reveal hall immediately; paintings pop in as textures arrive
  onReady?.();

  let loaded = 0;
  const loadAll = () => {
    works.forEach((work, index) => {
      loader.load(
        work.image,
        (tex) => {
          makeFrame(work, index, tex);
          loaded += 1;
        },
        undefined,
        () => {
          loaded += 1;
          if (loaded >= works.length && frames.length === 0) onError?.(new Error("textures"));
        }
      );
    });
  };

  loadAll();

  // Interaction
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let focusedId = null;
  let hovering = null;
  let anim = null;
  let disposed = false;
  let clock = new THREE.Clock();

  const homeCam = {
    position: new THREE.Vector3(0, 2.2, 11),
    target: new THREE.Vector3(0, 1.6, 0),
  };

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const animateCamera = (toPos, toTarget, duration = 1.1) => {
    const fromPos = camera.position.clone();
    const fromTarget = controls.target.clone();
    const start = performance.now();
    controls.autoRotate = false;
    controls.enabled = false;

    return new Promise((resolve) => {
      anim = () => {
        const t = Math.min(1, (performance.now() - start) / (duration * 1000));
        const e = easeInOut(t);
        camera.position.lerpVectors(fromPos, toPos, e);
        controls.target.lerpVectors(fromTarget, toTarget, e);
        controls.update();
        if (t < 1) requestAnimationFrame(anim);
        else {
          anim = null;
          controls.enabled = true;
          resolve();
        }
      };
      requestAnimationFrame(anim);
    });
  };

  const focusWork = async (id) => {
    const frame = frames.find((f) => f.work.id === id);
    if (!frame) return;
    focusedId = id;
    controls.autoRotate = false;

    frames.forEach((f) => {
      const active = f.work.id === id;
      f.glow.material.opacity = active ? 0.16 : 0.04;
      f.group.scale.setScalar(active ? 1.04 : 0.96);
    });

    const worldPos = new THREE.Vector3();
    frame.art.getWorldPosition(worldPos);
    const normal = new THREE.Vector3();
    frame.group.getWorldDirection(normal); // local +Z → toward hall center
    const camPos = worldPos.clone().add(normal.multiplyScalar(2.65));
    camPos.y = worldPos.y;
    await animateCamera(camPos, worldPos.clone(), 1.15);
    onFocus?.(frame.work);
  };

  const blurFocus = async () => {
    focusedId = null;
    frames.forEach((f) => {
      f.glow.material.opacity = 0.06;
      f.group.scale.setScalar(1);
    });
    onBlur?.();
    await animateCamera(homeCam.position.clone(), homeCam.target.clone(), 1.05);
    if (!reduceMotion) controls.autoRotate = true;
  };

  const setPointerFromEvent = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const pick = () => {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickables, false);
    return hits[0]?.object || null;
  };

  let pointerDown = null;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    pointerDown = { x: e.clientX, y: e.clientY, t: performance.now() };
  });

  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!pointerDown) return;
    const dx = e.clientX - pointerDown.x;
    const dy = e.clientY - pointerDown.y;
    const dt = performance.now() - pointerDown.t;
    pointerDown = null;
    if (dx * dx + dy * dy > 36 || dt > 500) return;
    setPointerFromEvent(e);
    const obj = pick();
    if (obj?.userData?.id) {
      if (focusedId === obj.userData.id) return;
      focusWork(obj.userData.id);
    }
  });

  renderer.domElement.addEventListener("pointermove", (e) => {
    setPointerFromEvent(e);
    const obj = pick();
    const id = obj?.userData?.id || null;
    if (id !== hovering) {
      hovering = id;
      renderer.domElement.style.cursor = id ? "pointer" : "grab";
      frames.forEach((f) => {
        if (focusedId) return;
        f.glow.material.opacity = f.work.id === id ? 0.14 : 0.06;
      });
    }
  });

  // Idle pause autorotate while dragging
  controls.addEventListener("start", () => {
    controls.autoRotate = false;
  });
  controls.addEventListener("end", () => {
    if (!focusedId && !reduceMotion) {
      setTimeout(() => {
        if (!focusedId) controls.autoRotate = true;
      }, 1800);
    }
  });

  const onResize = () => {
    if (!mount) return;
    const w = mount.clientWidth;
    const h = Math.max(mount.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const tick = () => {
    if (disposed) return;
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    dust.rotation.y = t * 0.02;
    core.position.y = 0.7 + Math.sin(t * 1.4) * 0.05;
    rim.intensity = 16 + Math.sin(t * 1.2) * 3;
    if (!anim) controls.update();
    renderer.render(scene, camera);
  };
  tick();

  return {
    focusWork,
    blurFocus,
    getFocusedId: () => focusedId,
    resize: onResize,
    dispose() {
      disposed = true;
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
  };
}
