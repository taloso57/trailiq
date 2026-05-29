"use client";

import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

/* ── Destinations ───────────────────────────────────────────────── */
interface Dest { name: string; lat: number; lon: number; }

const DEST: Dest[] = [
  { name: 'שביל ישראל',              lat:  31.0, lon:  35.0 },
  { name: 'נורווגיה',                lat:  61.0, lon:   8.0 },
  { name: 'ניו זילנד',               lat: -44.0, lon: 170.0 },
  { name: 'טורס דל פיין',            lat: -51.0, lon: -73.0 },
  { name: 'הייילנדס סקוטלנד',        lat:  57.0, lon:  -4.0 },
  { name: 'דולומיטים איטליה',        lat:  46.5, lon:  11.8 },
  { name: 'גרנד קניון',              lat:  36.1, lon: -112.1 },
  { name: "מאצ'ו פיצ'ו",             lat: -13.2, lon: -72.5 },
  { name: 'באנף קנדה',               lat:  51.5, lon: -116.0 },
  { name: 'סהרה מרוקו',              lat:  25.0, lon:  -5.0 },
  { name: 'ואדי רם ירדן',            lat:  29.6, lon:  35.4 },
  { name: 'לאוגוגור איסלנד',         lat:  64.0, lon: -19.5 },
  { name: 'אוברלנד טראק אוסטרליה',   lat: -41.6, lon: 146.0 },
  { name: 'האוט רוט שווייץ',         lat:  46.0, lon:   7.5 },
  { name: 'אנפורנה נפאל',            lat:  28.5, lon:  84.0 },
  { name: 'W טרק פטגוניה',           lat: -50.9, lon: -73.4 },
  { name: "הר פוג'י יפן",            lat:  35.4, lon: 138.7 },
  { name: 'מסלול בייס קמפ אוורסט',   lat:  28.0, lon:  86.9 },
  { name: 'עמק לאנגטאנג נפאל',       lat:  28.2, lon:  85.5 },
  { name: "גורג' קפיצת הנמר סין",    lat:  27.2, lon: 100.1 },
  { name: "ז'אנגג'יאג'יה סין",       lat:  29.3, lon: 110.5 },
  { name: 'הר הואנגשאן סין',          lat:  30.1, lon: 118.2 },
  { name: 'קומאנו קודו יפן',          lat:  33.8, lon: 135.8 },
  { name: "ג'ג'ו אולה קוריאה",       lat:  33.4, lon: 126.5 },
  { name: 'קמרון הייילנדס מלזיה',     lat:   4.5, lon: 101.4 },
  { name: 'טריונד הודו',              lat:  32.2, lon:  76.4 },
  { name: 'עמק הפרחים הודו',          lat:  30.7, lon:  79.6 },
  { name: "הר רינג'אני אינדונזיה",    lat:  -8.4, lon: 116.5 },
  { name: 'פאנסיפאן וייטנאם',         lat:  22.3, lon: 103.8 },
  { name: 'דוי אינתנון תאילנד',       lat:  18.6, lon:  98.5 },
  { name: 'סרי פאדה סרי לנקה',        lat:   6.8, lon:  80.5 },
  { name: 'מדבר גובי מונגוליה',       lat:  43.0, lon: 104.0 },
  { name: 'פיץ רוי ארגנטינה',         lat: -49.3, lon: -73.0 },
  { name: 'שביל האינקה פרו',           lat: -13.5, lon: -71.9 },
  { name: 'הר רוריימה ונצואלה',        lat:   5.1, lon: -60.8 },
  { name: 'קוטופקסי אקוודור',          lat:  -0.7, lon: -78.4 },
  { name: 'מישורי המלח בוליביה',       lat: -20.1, lon: -67.6 },
  { name: 'שפדה דיאמנטינה ברזיל',      lat: -12.5, lon: -41.5 },
  { name: 'לוס נבאדוס קולומביה',       lat:   4.8, lon: -75.4 },
  { name: "שביל אפלצ'י ארה\"ב",        lat:  36.0, lon: -82.0 },
  { name: 'שביל פסיפיק קרסט',          lat:  37.0, lon: -119.0 },
  { name: 'דנאלי אלסקה',              lat:  63.1, lon: -151.0 },
  { name: 'חצי האי אולימפיק',          lat:  47.8, lon: -123.7 },
  { name: 'זיון נארואס יוטה',          lat:  37.3, lon: -112.9 },
  { name: "קילימנג'רו טנזניה",         lat:  -3.1, lon:  37.4 },
  { name: 'הרי האטלס מרוקו',           lat:  31.5, lon:  -7.5 },
  { name: 'דרקנסברג דרום אפריקה',      lat: -29.0, lon:  29.5 },
  { name: 'הרי רוונזורי אוגנדה',       lat:   0.4, lon:  29.9 },
  { name: 'הרי סיניין אתיופיה',        lat:  13.2, lon:  38.4 },
  { name: 'הר קניה',                  lat:  -0.2, lon:  37.3 },
  { name: 'הר טובקל מרוקו',            lat:  31.1, lon:  -7.9 },
];

/* ── Component ─────────────────────────────────────────────────── */
export default function Globe3D({ onSelect }: { onSelect: (q: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef   = useRef<HTMLDivElement>(null);
  const onSelectRef  = useRef(onSelect);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    const tooltip   = tooltipRef.current;
    if (!container || !tooltip) return;

    console.log("[Globe3D] mounted — container size:",
      container.clientWidth, "×", container.clientHeight);

    let cleanupFn: (() => void) | undefined;
    let rafId: number;

    // Defer one frame so Framer Motion finishes its scale animation
    // and the container has real layout dimensions.
    rafId = requestAnimationFrame(() => {
      const w = container.clientWidth  || 350;
      const h = container.clientHeight || 250;
      console.log("[Globe3D] RAF — effective size:", w, "×", h);
      try {
        cleanupFn = buildGlobe(container, tooltip, onSelectRef, w, h);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[Globe3D] buildGlobe threw:", msg);
        setError(msg);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupFn?.();
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">
        globe error — see console
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* explicit inline height so h-full always resolves even inside transforms */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", minHeight: 200 }}
      />
      {/* Fixed tooltip so overflow:hidden on card wrapper doesn't clip it */}
      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          background: "rgba(4,6,22,0.96)",
          border: "1px solid rgba(0,210,255,0.4)",
          borderRadius: 10,
          padding: "8px 14px",
          backdropFilter: "blur(16px)",
          opacity: 0,
          transform: "translateY(6px) scale(0.97)",
          transition: "opacity 0.15s ease, transform 0.15s ease",
          zIndex: 9999,
          whiteSpace: "nowrap",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          direction: "rtl",
        }}
      />
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────── */
function ll2v(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * Math.PI / 180;
  const th  = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(th),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(th)
  );
}

/* ── Globe initialiser ──────────────────────────────────────────── */
function buildGlobe(
  container: HTMLDivElement,
  tooltipEl: HTMLDivElement,
  onSelectRef: MutableRefObject<(q: string) => void>,
  initW: number,
  initH: number,
): () => void {

  /* renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(initW, initH);
  renderer.setClearColor(0x000008, 1);
  container.appendChild(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.style.cursor = "grab";
  canvas.style.display = "block";

  /* scene + camera */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, initW / initH, 0.1, 600);
  camera.position.z = 4.5;

  /* stars */
  const sBuf = new Float32Array(3000 * 3);
  for (let i = 0; i < sBuf.length; i++) sBuf[i] = (Math.random() - 0.5) * 600;
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute("position", new THREE.BufferAttribute(sBuf, 3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({
    color: 0xffffff, size: 0.32, sizeAttenuation: true,
    transparent: true, opacity: 0.75,
  })));

  /* lighting */
  const SUN = new THREE.Vector3(1, 0.3, 0.5).normalize();
  const sunLight = new THREE.DirectionalLight(0xfff8f0, 2.7);
  sunLight.position.copy(SUN).multiplyScalar(10);
  scene.add(sunLight, new THREE.AmbientLight(0x1a2550, 1.0));

  /* globe group */
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);
  const R = 2;

  /* state */
  let clouds:    THREE.Mesh | null = null;
  let hovered:   { dot: THREE.Mesh; halo: THREE.Mesh; dest: Dest; phase: number } | null = null;
  let autoRot    = true;
  let isDragging = false;
  let prevX = 0, prevY = 0;
  const markers: Array<{ dot: THREE.Mesh; halo: THREE.Mesh; dest: Dest; phase: number }> = [];
  let dotMeshes: THREE.Mesh[] = [];
  const VHOV = new THREE.Vector3(2.4, 2.4, 2.4);
  const VNRM = new THREE.Vector3(1.0, 1.0, 1.0);

  /* GLSL */
  const DAY_NIGHT_VERT = `
    varying vec2 vUv; varying vec3 vNormal;
    void main(){
      vUv=uv;
      vNormal=normalize(normalMatrix*normal);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }`;
  const DAY_NIGHT_FRAG = `
    uniform sampler2D dayMap; uniform sampler2D nightMap; uniform vec3 sunDir;
    varying vec2 vUv; varying vec3 vNormal;
    void main(){
      vec3 day=texture2D(dayMap,vUv).rgb;
      vec3 night=texture2D(nightMap,vUv).rgb*1.6;
      float d=dot(vNormal,sunDir);
      float m=smoothstep(-0.18,0.38,d);
      gl_FragColor=vec4(mix(night,day,m),1.0);
    }`;
  const ATM_VERT = `
    varying vec3 vN;
    void main(){
      vN=normalize(normalMatrix*normal);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }`;

  /* textures */
  const BASE   = "https://unpkg.com/three-globe/example/img/";
  const loader = new THREE.TextureLoader();
  let pending = 3;
  let texDay: THREE.Texture | null   = null;
  let texNight: THREE.Texture | null = null;
  let texCloud: THREE.Texture | null = null;

  function checkReady() { if (--pending === 0) buildEarth(); }

  loader.load(BASE + "earth-blue-marble.jpg",
    (t) => { texDay   = t; checkReady(); }, undefined, () => { console.warn("[Globe3D] day texture failed"); checkReady(); });
  loader.load(BASE + "earth-night.jpg",
    (t) => { texNight = t; checkReady(); }, undefined, () => { console.warn("[Globe3D] night texture failed"); checkReady(); });
  loader.load(BASE + "earth-clouds.png",
    (t) => { texCloud = t; checkReady(); }, undefined, () => { console.warn("[Globe3D] cloud texture failed"); checkReady(); });

  function buildEarth() {
    console.log("[Globe3D] textures ready — building earth");

    const earthMat = (texDay && texNight)
      ? new THREE.ShaderMaterial({
          uniforms: {
            dayMap:   { value: texDay },
            nightMap: { value: texNight },
            sunDir:   { value: SUN },
          },
          vertexShader:   DAY_NIGHT_VERT,
          fragmentShader: DAY_NIGHT_FRAG,
        })
      : texDay
        ? new THREE.MeshPhongMaterial({ map: texDay, shininess: 8 })
        : new THREE.MeshPhongMaterial({ color: 0x1a4a8a, shininess: 12 });

    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), earthMat));

    if (texCloud) {
      clouds = new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.03, 64, 64),
        new THREE.MeshPhongMaterial({
          map: texCloud, transparent: true, opacity: 0.22,
          depthWrite: false, blending: THREE.AdditiveBlending,
        })
      );
      globeGroup.add(clouds);
    }

    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.2, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { c: { value: new THREE.Color(0x1a55ff) } },
        vertexShader: ATM_VERT,
        fragmentShader: `uniform vec3 c;varying vec3 vN;
          void main(){float i=pow(1.0-abs(dot(vN,vec3(0,0,1))),4.0);gl_FragColor=vec4(c,i*0.85);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending,
        transparent: true, depthWrite: false,
      })
    ));

    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.6, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { c: { value: new THREE.Color(0x002fa7) } },
        vertexShader: ATM_VERT,
        fragmentShader: `uniform vec3 c;varying vec3 vN;
          void main(){float i=pow(1.0-abs(dot(vN,vec3(0,0,1))),7.5);gl_FragColor=vec4(c,i*0.44);}`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending,
        transparent: true, depthWrite: false,
      })
    ));

    const dotGeo  = new THREE.SphereGeometry(0.024, 10, 10);
    const haloGeo = new THREE.SphereGeometry(0.058, 10, 10);

    DEST.forEach((dest, idx) => {
      const pos = ll2v(dest.lat, dest.lon, R + 0.016);
      const dot = new THREE.Mesh(dotGeo,
        new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
      dot.position.copy(pos);
      globeGroup.add(dot);

      const halo = new THREE.Mesh(haloGeo,
        new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.28, depthWrite: false }));
      halo.position.copy(pos);
      globeGroup.add(halo);

      markers.push({ dot, halo, dest, phase: (idx / DEST.length) * Math.PI * 2 });
    });

    dotMeshes = markers.map(m => m.dot);
  }

  /* mouse */
  function onMouseDown(e: MouseEvent) {
    isDragging = true; autoRot = false;
    prevX = e.clientX; prevY = e.clientY;
    canvas.style.cursor = "grabbing";
  }
  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false; autoRot = true;
    canvas.style.cursor = hovered ? "pointer" : "grab";
  }
  function onMouseMoveGlobal(e: MouseEvent) {
    if (!isDragging) return;
    globeGroup.rotation.y += (e.clientX - prevX) * 0.005;
    globeGroup.rotation.x += (e.clientY - prevY) * 0.005;
    globeGroup.rotation.x = Math.max(-1.35, Math.min(1.35, globeGroup.rotation.x));
    prevX = e.clientX; prevY = e.clientY;
  }
  function onWheel(e: WheelEvent) {
    e.preventDefault();
    camera.position.z = Math.max(2.6, Math.min(9, camera.position.z + e.deltaY * 0.005));
  }

  canvas.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup",   onMouseUp);
  window.addEventListener("mousemove", onMouseMoveGlobal);
  canvas.addEventListener("wheel",     onWheel, { passive: false });

  /* raycasting */
  const raycaster = new THREE.Raycaster();
  const mouse2    = new THREE.Vector2();

  function showTip(name: string) {
    tooltipEl.innerHTML =
      `<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;direction:rtl">${name}</div>` +
      `<div style="font-size:11px;color:#00D4FF;font-weight:500;letter-spacing:0.06em;direction:rtl">לחץ לחפש ציוד</div>`;
    tooltipEl.style.opacity   = "1";
    tooltipEl.style.transform = "translateY(0) scale(1)";
  }
  function hideTip() {
    tooltipEl.style.opacity   = "0";
    tooltipEl.style.transform = "translateY(6px) scale(0.97)";
  }

  function onMouseMoveCanvas(e: MouseEvent) {
    if (isDragging || dotMeshes.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    mouse2.set(
       ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top)  / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(mouse2, camera);
    const hits = raycaster.intersectObjects(dotMeshes);

    if (hits.length > 0) {
      const found = markers.find(m => m.dot === hits[0].object) ?? null;
      if (found && found !== hovered) {
        hovered = found;
        showTip(found.dest.name);
        canvas.style.cursor = "pointer";
      }
      if (found) {
        tooltipEl.style.left = (e.clientX + 16) + "px";
        tooltipEl.style.top  = (e.clientY - 12) + "px";
      }
    } else if (hovered) {
      hovered = null; hideTip();
      canvas.style.cursor = "grab";
    }
  }

  function onClick() {
    if (!hovered) return;
    onSelectRef.current(`ציוד ל${hovered.dest.name}`);
  }

  canvas.addEventListener("mousemove", onMouseMoveCanvas);
  canvas.addEventListener("click",     onClick);

  /* resize */
  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(container);

  /* animation */
  const clock = new THREE.Clock();
  let rafId = 0;

  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (autoRot) globeGroup.rotation.y += 0.0014;
    if (clouds)  clouds.rotation.y     += 0.00025;

    for (let k = 0; k < markers.length; k++) {
      const m = markers[k];
      const pulse = 1 + 0.85 * Math.abs(Math.sin(t * 1.5 + m.phase));
      m.halo.scale.setScalar(pulse);
      (m.halo.material as THREE.MeshBasicMaterial).opacity = 0.28 / pulse;
      m.dot.scale.lerp(m === hovered ? VHOV : VNRM, 0.14);
      (m.dot.material as THREE.MeshBasicMaterial).color.setHex(
        m === hovered ? 0xffffff : 0x00E5FF
      );
    }

    renderer.render(scene, camera);
  }
  animate();

  return () => {
    cancelAnimationFrame(rafId);
    canvas.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseup",   onMouseUp);
    window.removeEventListener("mousemove", onMouseMoveGlobal);
    canvas.removeEventListener("wheel",     onWheel);
    canvas.removeEventListener("mousemove", onMouseMoveCanvas);
    canvas.removeEventListener("click",     onClick);
    ro.disconnect();
    renderer.dispose();
    hideTip();
    if (container.contains(canvas)) container.removeChild(canvas);
  };
}
