// The hero's 3D production line: visitors drift in from the left, become units on a belt,
// pass four gantry stations (Web, Funnel, WhatsApp, Customers) and leave as customers.
// Loaded lazily after first paint; pauses off-screen; renders one still frame for reduced motion.
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  Group,
  HemisphereLight,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Points,
  PointsMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type Options = {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  labels?: HTMLElement[];
  reducedMotion: boolean;
  compact: boolean;
};

const X0 = -12.5;
const X1 = 13.5;
const BELT_Y = 0.9;
const STATIONS = [-6, -1.5, 3, 7.5];
const STAGE_COLORS = ['#9a8466', '#dfe3dc', '#ffb21a', '#2fb873', '#4fe394'].map((c) => new Color(c));

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

export function startLine({ canvas, host, labels = [], reducedMotion, compact }: Options) {
  const dprCap = compact ? 1.5 : 1.75;
  // Sharp (2x+) screens hide jagged edges by themselves; skipping multisampling there saves GPU memory and battery.
  const dpr = window.devicePixelRatio || 1;
  const renderer = new WebGLRenderer({ canvas, antialias: dpr < 2, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = !compact;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  scene.fog = new Fog('#0e100f', compact ? 30 : 34, compact ? 62 : 70);
  // the reflection environment is built later, in its own step, so startup never blocks for long
  scene.environmentIntensity = 0.55;

  const camera = new PerspectiveCamera(compact ? 42 : 34, 1, 0.1, 140);
  const camBase = compact ? new Vector3(12.5, 6, 15) : new Vector3(19.5, 8.2, 19.5);
  const lookBase = compact ? new Vector3(0.8, 1.1, -0.5) : new Vector3(-1.4, 0.9, -0.8);
  const camOrigin = camBase.clone();
  // Scrolling the hero away flies the camera down the line to the customers' pallet.
  const camClose = compact ? new Vector3(20.5, 4.6, 10) : new Vector3(23.5, 5.4, 9.5);
  const lookClose = compact ? new Vector3(14.6, 1, 0) : new Vector3(16.1, 1.1, 0);
  camera.position.copy(camBase);
  camera.lookAt(lookBase);

  // ---- light ----
  scene.add(new HemisphereLight('#cfd8d2', '#0b0c0b', 0.35));
  const key = new DirectionalLight('#fff1db', 2.4);
  key.position.set(-6, 14, 9);
  key.castShadow = !compact;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -17, right: 18, top: 7, bottom: -7, near: 1, far: 40 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new DirectionalLight('#8fb8ff', 0.6);
  rim.position.set(10, 5, -12);
  scene.add(rim);

  // ---- floor and markings ----
  const floor = new Mesh(new PlaneGeometry(220, 140), new MeshStandardMaterial({ color: '#141715', roughness: 0.92, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const laneMat = new MeshStandardMaterial({ color: '#ffb21a', roughness: 0.6, emissive: '#ffb21a', emissiveIntensity: 0.12 });
  for (const z of [-1.75, 1.75]) {
    const lane = new Mesh(new PlaneGeometry(X1 - X0 + 4, 0.09), laneMat);
    lane.rotation.x = -Math.PI / 2;
    lane.position.set((X0 + X1) / 2, 0.005, z);
    scene.add(lane);
  }
  const stripes = canvasTexture(128, 128, (g) => {
    g.fillStyle = '#141715';
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = '#d99a12';
    g.lineWidth = 22;
    for (let i = -128; i < 256; i += 48) {
      g.beginPath();
      g.moveTo(i, 128);
      g.lineTo(i + 128, 0);
      g.stroke();
    }
  });
  stripes.wrapS = stripes.wrapT = RepeatWrapping;
  stripes.repeat.set(3, 3);
  const zone = new Mesh(new PlaneGeometry(3.6, 3.6), new MeshStandardMaterial({ map: stripes, roughness: 0.8 }));
  zone.rotation.x = -Math.PI / 2;
  zone.position.set(X1 + 2.6, 0.006, 0);
  zone.receiveShadow = true;
  scene.add(zone);

  // ---- conveyor ----
  const metal = new MeshStandardMaterial({ color: '#8d9691', metalness: 1, roughness: 0.34 });
  const painted = new MeshStandardMaterial({ color: '#2b302d', metalness: 0.55, roughness: 0.45 });
  const length = X1 - X0 + 1.2;
  const midX = (X0 + X1) / 2;

  const body = new Mesh(new BoxGeometry(length, 0.34, 1.7), painted);
  body.position.set(midX, BELT_Y - 0.2, 0);
  body.castShadow = body.receiveShadow = true;
  scene.add(body);

  const beltTex = canvasTexture(256, 64, (g) => {
    g.fillStyle = '#1a1d1b';
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = '#262a27';
    for (let x = 0; x < 256; x += 32) g.fillRect(x, 0, 3, 64);
  });
  beltTex.wrapS = beltTex.wrapT = RepeatWrapping;
  beltTex.repeat.set(length / 1.1, 1);
  const belt = new Mesh(new PlaneGeometry(length, 1.42), new MeshStandardMaterial({ map: beltTex, roughness: 0.85 }));
  belt.rotation.x = -Math.PI / 2;
  belt.position.set(midX, BELT_Y - 0.025, 0);
  belt.receiveShadow = true;
  scene.add(belt);

  for (const z of [-0.8, 0.8]) {
    const rail = new Mesh(new BoxGeometry(length, 0.12, 0.1), metal);
    rail.position.set(midX, BELT_Y + 0.02, z);
    rail.castShadow = true;
    scene.add(rail);
  }
  const legGeo = new BoxGeometry(0.12, BELT_Y - 0.35, 0.12);
  for (let x = X0; x <= X1 + 0.1; x += 2.6) {
    for (const z of [-0.7, 0.7]) {
      const leg = new Mesh(legGeo, painted);
      leg.position.set(x, (BELT_Y - 0.35) / 2, z);
      leg.castShadow = true;
      scene.add(leg);
    }
  }

  // ---- stations: gantry, scanner curtain, andon tower ----
  const post = new BoxGeometry(0.2, 2.5, 0.2);
  const beam = new BoxGeometry(0.24, 0.24, 2.7);
  const lampGeo = new CylinderGeometry(0.15, 0.15, 0.26, 20);
  const lampColors = ['#f2473f', '#ffb21a', '#35d27f'];
  type Station = {
    x: number;
    lamps: MeshStandardMaterial[];
    curtain: MeshBasicMaterial;
    pulse: number;
    glowGreen: SpriteMaterial;
    glowAmber: SpriteMaterial;
  };
  const glowTex = canvasTexture(64, 64, (g) => {
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,0.9)');
    grd.addColorStop(0.25, 'rgba(255,255,255,0.35)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
  });
  const stations: Station[] = STATIONS.map((x) => {
    const g = new Group();
    g.position.x = x;
    for (const z of [-1.25, 1.25]) {
      const p = new Mesh(post, painted);
      p.position.set(0, 1.25, z);
      p.castShadow = true;
      g.add(p);
    }
    const b = new Mesh(beam, painted);
    b.position.set(0, 2.5, 0);
    b.castShadow = true;
    g.add(b);
    const cap = new Mesh(new CylinderGeometry(0.17, 0.17, 0.06, 20), metal);
    cap.position.set(0, 2.66 + 0.27 * 3, -1.25);
    g.add(cap);
    const lamps = lampColors.map((c, i) => {
      const m = new MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.05, roughness: 0.25 });
      const l = new Mesh(lampGeo, m);
      l.position.set(0, 2.62 + 0.27 * (2 - i) + 0.13, -1.25);
      g.add(l);
      return m;
    });
    const curtain = new MeshBasicMaterial({ color: '#35d27f', transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
    const cur = new Mesh(new PlaneGeometry(2.3, 1.45), curtain);
    cur.rotation.y = Math.PI / 2;
    cur.position.set(0, BELT_Y + 0.72, 0);
    g.add(cur);
    // light spill of the lit lamps (green running, amber calling)
    const glowGreen = new Sprite(new SpriteMaterial({ map: glowTex, color: '#35d27f', transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false }));
    glowGreen.scale.setScalar(1.25);
    glowGreen.position.set(0, 2.62 + 0.13, -1.25);
    const glowAmber = new Sprite(new SpriteMaterial({ map: glowTex, color: '#ffb21a', transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false }));
    glowAmber.scale.setScalar(1.25);
    glowAmber.position.set(0, 2.62 + 0.27 + 0.13, -1.25);
    g.add(glowGreen, glowAmber);
    scene.add(g);
    return { x, lamps, curtain, pulse: 0, glowGreen: glowGreen.material, glowAmber: glowAmber.material };
  });

  // ---- pallet of customers at the end ----
  const pallet = new Mesh(new BoxGeometry(2.3, 0.2, 2.3), new MeshStandardMaterial({ color: '#6e5a43', roughness: 0.9 }));
  pallet.position.set(X1 + 2.6, 0.1, 0);
  pallet.castShadow = pallet.receiveShadow = true;
  scene.add(pallet);

  // ---- units on the belt ----
  const nUnits = compact ? 22 : 30;
  const unitGeo = new RoundedBoxGeometry(0.64, 0.52, 0.64, 2, 0.07);
  // Grayscale box detail (packing tape, worn edges); the instance color tints it per stage.
  const boxTex = canvasTexture(128, 128, (g) => {
    g.fillStyle = '#f4f4f4';
    g.fillRect(0, 0, 128, 128);
    const edge = g.createLinearGradient(0, 0, 128, 0);
    edge.addColorStop(0, 'rgba(0,0,0,0.16)');
    edge.addColorStop(0.08, 'rgba(0,0,0,0)');
    edge.addColorStop(0.92, 'rgba(0,0,0,0)');
    edge.addColorStop(1, 'rgba(0,0,0,0.16)');
    g.fillStyle = edge;
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = 'rgba(255,255,255,0.9)';
    g.fillRect(52, 0, 24, 128);
    g.fillStyle = 'rgba(0,0,0,0.07)';
    g.fillRect(52, 0, 2, 128);
    g.fillRect(74, 0, 2, 128);
    g.fillStyle = 'rgba(0,0,0,0.22)';
    g.fillRect(14, 96, 26, 4);
    g.fillRect(14, 104, 18, 4);
  });
  const unitMat = new MeshStandardMaterial({ map: boxTex, roughness: 0.55, metalness: 0.04 });
  const units = new InstancedMesh(unitGeo, unitMat, nUnits);
  units.instanceMatrix.setUsage(DynamicDrawUsage);
  units.castShadow = !compact;
  units.receiveShadow = true;
  scene.add(units);

  // Every unit that leaves the line lands on the customers' pallet; a full pallet ships and starts again.
  const STACK = 12;
  const stack = new InstancedMesh(unitGeo, unitMat, STACK);
  stack.instanceMatrix.setUsage(DynamicDrawUsage);
  const dummy = new Object3D();
  const slots = Array.from({ length: STACK }, (_, i) => {
    const layer = Math.floor(i / 4);
    const cell = i % 4;
    return new Vector3(X1 + 2.6 + (cell % 2 ? 0.36 : -0.36), 0.2 + 0.27 + layer * 0.53, cell < 2 ? -0.36 : 0.36);
  });
  for (let i = 0; i < STACK; i++) stack.setColorAt(i, STAGE_COLORS[4]);
  stack.castShadow = !compact;
  scene.add(stack);

  // ---- visitors (particles) ----
  const nP = compact ? 650 : 1400;
  const pos = new Float32Array(nP * 3);
  const col = new Float32Array(nP * 3);
  const seeds = new Float32Array(nP * 7);
  for (let i = 0; i < nP; i++) {
    seeds[i * 7] = X0 - 4 - Math.random() * 14; // start x
    seeds[i * 7 + 1] = 0.4 + Math.random() * 6.5; // start y
    seeds[i * 7 + 2] = (Math.random() - 0.5) * 20; // start z
    seeds[i * 7 + 3] = Math.random(); // phase
    seeds[i * 7 + 4] = 0.05 + Math.random() * 0.07; // rate
    seeds[i * 7 + 5] = (Math.random() - 0.5) * 0.7; // landing z jitter
    seeds[i * 7 + 6] = Math.random() < 0.28 ? 1 : 0; // converts (reaches the belt) or wanders off
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(pos, 3).setUsage(DynamicDrawUsage));
  pGeo.setAttribute('color', new BufferAttribute(col, 3).setUsage(DynamicDrawUsage));
  const dot = canvasTexture(64, 64, (g) => {
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(255,255,255,0.8)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
  });
  const pMat = new PointsMaterial({ size: compact ? 0.2 : 0.16, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending, sizeAttenuation: true });
  const points = new Points(pGeo, pMat);
  points.frustumCulled = false;
  scene.add(points);

  const entry = new Vector3(X0 + 0.2, BELT_Y + 0.3, 0);
  const visitorTint = new Color('#e6e1d4');

  // ---- state ----
  let speed = 0.55; // belt units per second
  let speedTarget = speed;
  let call = 0;
  let callTarget = 0;
  let t = 0;
  let beltOffset = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const tmpColor = new Color();
  const v = new Vector3();
  const camPos = new Vector3();
  const camLook = new Vector3();
  let scrollK = 0;
  let scrollPx = 0;
  let viewShift = 0;
  let scrollS = 0;
  let heroH = 1;
  let orbit = 0;
  let orbitTarget = 0;
  const labelAnchors = [new Vector3(X0 + 1.2, 2.5, 0), ...STATIONS.map((x) => new Vector3(x, 3.9, -1.25))];

  function stageAt(x: number) {
    let stage = 0;
    let blend = 0;
    for (let s = 0; s < STATIONS.length; s++) {
      const d = x - STATIONS[s];
      if (d > 0.45) stage = s + 1;
      else if (d > -0.15) {
        stage = s;
        blend = (d + 0.15) / 0.6;
        break;
      }
    }
    return { stage, blend };
  }

  function update(dt: number) {
    t += dt;
    speed += (speedTarget - speed) * Math.min(1, dt * 2.5);
    call += (callTarget - call) * Math.min(1, dt * 4);
    beltOffset += speed * dt;
    beltTex.offset.x = -beltOffset / 1.1;

    // units
    const span = X1 - X0;
    const spacing = span / nUnits;
    for (let i = 0; i < nUnits; i++) {
      const x = X0 + ((((i * spacing + beltOffset) % span) + span) % span);
      const { stage, blend } = stageAt(x);
      tmpColor.copy(STAGE_COLORS[stage]);
      if (blend > 0) tmpColor.lerp(STAGE_COLORS[Math.min(stage + 1, 4)], Math.min(1, blend));
      let scale = 1;
      if (x < X0 + 0.9) scale = Math.max(0.001, (x - X0) / 0.9);
      if (x > X1 - 0.8) scale = Math.max(0.001, (X1 - x) / 0.8);
      const pop = stage === 4 && x < STATIONS[3] + 1.4 ? 1 + 0.12 * Math.sin(((x - STATIONS[3] - 0.45) / 0.95) * Math.PI) : 1;
      dummy.position.set(x, BELT_Y + 0.26 * scale, Math.sin(i * 12.9898) * 0.08);
      dummy.rotation.set(0, Math.sin(i * 4.1) * 0.12, 0);
      dummy.scale.setScalar(scale * pop);
      dummy.updateMatrix();
      units.setMatrixAt(i, dummy.matrix);
      units.setColorAt(i, tmpColor);
      for (const st of stations) if (Math.abs(x - st.x) < 0.22) st.pulse = 1;
    }
    units.instanceMatrix.needsUpdate = true;
    if (units.instanceColor) units.instanceColor.needsUpdate = true;

    // stations
    for (const st of stations) {
      st.pulse = Math.max(0, st.pulse - dt * 3.2);
      st.lamps[2].emissiveIntensity = 1.6 * (1 - call) + 0.05;
      st.lamps[1].emissiveIntensity = 0.05 + st.pulse * 1.4 * (1 - call) + call * 2.6;
      st.lamps[0].emissiveIntensity = 0.04;
      st.curtain.opacity = st.pulse * 0.14 + call * 0.05;
      st.curtain.color.set(call > 0.5 ? '#ffb21a' : '#35d27f');
      st.glowGreen.opacity = 0.5 * (1 - call);
      st.glowAmber.opacity = Math.min(0.75, st.pulse * 0.5 * (1 - call) + call * 0.75);
    }

    // pallet: one box lands per unit that leaves the line
    const phase = (beltOffset - (X1 - 0.8 - X0)) / spacing;
    const landed = ((Math.floor(phase) % (STACK + 1)) + STACK + 1) % (STACK + 1);
    const f = phase - Math.floor(phase);
    for (let i = 0; i < STACK; i++) {
      const s = slots[i];
      const on = i < landed;
      const drop = i === landed - 1 ? Math.max(0, 1 - f * 3.5) : 0;
      dummy.position.set(s.x, s.y + drop * drop * 0.9, s.z);
      dummy.rotation.set(0, (i * 0.37) % 0.2, 0);
      dummy.scale.setScalar(on ? 1 : 0.001);
      dummy.updateMatrix();
      stack.setMatrixAt(i, dummy.matrix);
    }
    stack.instanceMatrix.needsUpdate = true;

    // visitors
    for (let i = 0; i < nP; i++) {
      const o = i * 7;
      const p = (seeds[o + 3] + t * seeds[o + 4] * (0.7 + speed * 0.6)) % 1;
      const sx = seeds[o];
      const sy = seeds[o + 1];
      const sz = seeds[o + 2];
      let x: number;
      let y: number;
      let z: number;
      let a: number;
      if (seeds[o + 6]) {
        // converts: curve toward the belt entry
        const k = p * p * (3 - 2 * p);
        const cx = (sx + entry.x) / 2;
        const cy = Math.max(sy, entry.y) + 1.2;
        const cz = sz * 0.35;
        const ik = 1 - k;
        x = ik * ik * sx + 2 * ik * k * cx + k * k * entry.x;
        y = ik * ik * sy + 2 * ik * k * cy + k * k * entry.y;
        z = ik * ik * sz + 2 * ik * k * cz + k * k * (entry.z + seeds[o + 5]);
        a = Math.min(1, p * 6) * (p > 0.92 ? (1 - p) / 0.08 : 1);
      } else {
        // wanders: drifts toward the line and fades before reaching it
        x = sx + p * 7;
        y = sy + Math.sin(t * 0.6 + i) * 0.25;
        z = sz * (1 - p * 0.25);
        a = Math.sin(p * Math.PI) * 0.55;
      }
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      col[i * 3] = visitorTint.r * a;
      col[i * 3 + 1] = visitorTint.g * a;
      col[i * 3 + 2] = visitorTint.b * a;
    }
    pGeo.attributes.position.needsUpdate = true;
    pGeo.attributes.color.needsUpdate = true;

    // camera: scroll flight toward the pallet, drag orbit, pointer drift
    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 2);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 2);
    scrollS += (scrollK - scrollS) * Math.min(1, dt * 5);
    // keep the scene centred in the part of the hero that is still on screen
    const shift = compact ? 0 : scrollPx * 0.3;
    if (Math.abs(shift - viewShift) > 0.5) {
      viewShift = shift;
      camera.setViewOffset(width, height, 0, -viewShift, width, height);
    }
    orbit += (orbitTarget - orbit) * Math.min(1, dt * (dragging ? 12 : 3));
    const e = scrollS * scrollS * (3 - 2 * scrollS);
    camPos.lerpVectors(camBase, camClose, e);
    camLook.lerpVectors(lookBase, lookClose, e);
    const ox = camPos.x - camLook.x;
    const oz = camPos.z - camLook.z;
    const c = Math.cos(orbit);
    const sn = Math.sin(orbit);
    camera.position.set(camLook.x + ox * c - oz * sn + pointer.sx * 1.4 * (1 - e), camPos.y - pointer.sy * 0.8, camLook.z + ox * sn + oz * c);
    camera.lookAt(camLook.x + pointer.sx * 0.4 * (1 - e), camLook.y, camLook.z);
  }

  // ---- input: scroll progress of the hero, mouse drag to orbit ----
  let dragging = false;
  let dragX = 0;
  let flight = 1;
  const measure = () => {
    const heroEl = (host.closest('[data-hero]') as HTMLElement | null) ?? host;
    heroH = heroEl.offsetHeight || host.offsetHeight || 1;
    // desktop: the stage fills the hero and the flight lands while the pallet is still above the stats board;
    // phones: the stage is one band inside the hero, so the flight lands before that band scrolls away
    flight = compact
      ? host.getBoundingClientRect().top - heroEl.getBoundingClientRect().top + host.offsetHeight * 0.2
      : heroH * 0.45;
  };
  const onScroll = () => {
    scrollPx = Math.min(heroH, Math.max(0, window.scrollY));
    scrollK = Math.min(1, scrollPx / Math.max(1, flight));
  };
  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (!reducedMotion) {
    canvas.addEventListener('pointerdown', (ev) => {
      if (ev.pointerType !== 'mouse') return;
      dragging = true;
      dragX = ev.clientX;
      canvas.setPointerCapture(ev.pointerId);
      canvas.classList.add('grabbing');
    });
    canvas.addEventListener('pointermove', (ev) => {
      if (!dragging) return;
      orbitTarget = Math.max(-0.55, Math.min(0.55, ((ev.clientX - dragX) / Math.max(1, width)) * 1.6));
    });
    const release = () => {
      dragging = false;
      orbitTarget = 0;
      canvas.classList.remove('grabbing');
    };
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);
  }

  let width = 0;
  let height = 0;
  function placeLabels() {
    if (!labels.length) return;
    labelAnchors.forEach((anchor, i) => {
      const el = labels[i];
      if (!el) return;
      v.copy(anchor).project(camera);
      const raw = ((v.x + 1) / 2) * width;
      // on desktop the copy column overlaps the stage's left edge: fade labels there instead of stacking them on the text
      const intoCopy = !compact && raw - el.offsetWidth / 2 < 110;
      const visible = v.z < 1 && v.x > -1.05 && v.x < 1.05 && v.y > -1 && v.y < 1 && !intoCopy;
      el.style.opacity = visible ? '1' : '0';
      const px = Math.min(width - el.offsetWidth / 2 - 12, Math.max(el.offsetWidth / 2 + 12, raw));
      el.style.transform = `translate(${px}px, ${((1 - v.y) / 2) * height}px)`;
    });
  }

  function resize() {
    measure();
    onScroll();
    const r = host.getBoundingClientRect();
    width = Math.max(1, Math.round(r.width));
    height = Math.max(1, Math.round(r.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // wide, short bands (tablets) sit closer so the line keeps its size
    const k = compact && camera.aspect > 1.8 ? 0.7 : 1;
    camBase.copy(lookBase).addScaledVector(camOrigin.clone().sub(lookBase), k);
    // keep the whole line in frame on tall/narrow hosts
    camera.fov = (compact ? 42 : 34) * Math.max(1, 1.25 / camera.aspect);
    if (viewShift) camera.setViewOffset(width, height, 0, -viewShift, width, height);
    camera.updateProjectionMatrix();
  }

  let isReady = false;
  function render() {
    if (!isReady) return;
    renderer.render(scene, camera);
    placeLabels();
  }

  resize();
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) render();
  });
  ro.observe(host);

  // ---- loop with adaptive quality ----
  let running = false;
  let visible = true;
  let last = performance.now();
  let slowFrames = 0;
  let frames = 0;
  let degraded = false;

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    frames++;
    if (!degraded && frames > 30 && frames < 150) {
      if (dt > 0.026) slowFrames++;
      if (slowFrames > 40) {
        degraded = true;
        renderer.setPixelRatio(1);
        renderer.shadowMap.enabled = false;
        resize();
      }
    }
    update(dt);
    render();
  }
  function play() {
    if (running || reducedMotion || !isReady) return;
    running = true;
    last = performance.now();
    renderer.setAnimationLoop(frame);
  }
  function pause() {
    running = false;
    renderer.setAnimationLoop(null);
  }

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !document.hidden) play();
    else pause();
  });

  // Startup in short steps so a tap during loading is answered at once:
  // reflections, then shaders compiled in the background, then the first frame.
  const nextTask = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));
  (async () => {
    await nextTask();
    const pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    await nextTask();
    // still frame first (also the reduced-motion final state)
    update(0.016);
    t = 40;
    beltOffset = 3.3;
    update(0.016);
    // compile shaders off the main thread where the GPU driver allows it; elsewhere they compile on the first frame
    if (renderer.extensions.has('KHR_parallel_shader_compile')) {
      try {
        await renderer.compileAsync(scene, camera);
      } catch {
        /* first frame compiles them instead */
      }
    }
    await nextTask();
    isReady = true;
    render();
    canvas.classList.add('ready');
    io.observe(host);
  })();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (visible) play();
  });

  if (!reducedMotion) {
    window.addEventListener(
      'pointermove',
      (e) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true },
    );
  }

  return {
    /** The andon call: lamps go amber and the line speeds up while the visitor is about to act. */
    setCall(on: boolean) {
      callTarget = on ? 1 : 0;
      speedTarget = on ? 1.5 : 0.55;
      if (reducedMotion) {
        call = callTarget;
        update(0);
        render();
      }
    },
  };
}
