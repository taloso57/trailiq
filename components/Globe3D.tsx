"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Dest { name: string; lat: number; lon: number; }

const DEST: Dest[] = [
  { name: "שביל ישראל",             lat:  31.0, lon:  35.0 },
  { name: "נורווגיה",               lat:  61.0, lon:   8.0 },
  { name: "ניו זילנד",              lat: -44.0, lon: 170.0 },
  { name: "טורס דל פיין",           lat: -51.0, lon: -73.0 },
  { name: "הייילנדס סקוטלנד",       lat:  57.0, lon:  -4.0 },
  { name: "דולומיטים איטליה",       lat:  46.5, lon:  11.8 },
  { name: "גרנד קניון",             lat:  36.1, lon: -112.1 },
  { name: "מאצ'ו פיצ'ו",            lat: -13.2, lon: -72.5 },
  { name: "באנף קנדה",              lat:  51.5, lon: -116.0 },
  { name: "סהרה מרוקו",             lat:  25.0, lon:  -5.0 },
  { name: "ואדי רם ירדן",           lat:  29.6, lon:  35.4 },
  { name: "לאוגוגור איסלנד",        lat:  64.0, lon: -19.5 },
  { name: "אוברלנד טראק אוסטרליה",  lat: -41.6, lon: 146.0 },
  { name: "האוט רוט שווייץ",        lat:  46.0, lon:   7.5 },
  { name: "אנפורנה נפאל",           lat:  28.5, lon:  84.0 },
  { name: "W טרק פטגוניה",          lat: -50.9, lon: -73.4 },
  { name: "הר פוג'י יפן",           lat:  35.4, lon: 138.7 },
  { name: "מסלול בייס קמפ אוורסט",  lat:  28.0, lon:  86.9 },
  { name: "עמק לאנגטאנג נפאל",      lat:  28.2, lon:  85.5 },
  { name: "גורג' קפיצת הנמר סין",   lat:  27.2, lon: 100.1 },
  { name: "ז'אנגג'יאג'יה סין",      lat:  29.3, lon: 110.5 },
  { name: "הר הואנגשאן סין",         lat:  30.1, lon: 118.2 },
  { name: "קומאנו קודו יפן",         lat:  33.8, lon: 135.8 },
  { name: "ג'ג'ו אולה קוריאה",      lat:  33.4, lon: 126.5 },
  { name: "קמרון הייילנדס מלזיה",    lat:   4.5, lon: 101.4 },
  { name: "טריונד הודו",             lat:  32.2, lon:  76.4 },
  { name: "עמק הפרחים הודו",         lat:  30.7, lon:  79.6 },
  { name: "הר רינג'אני אינדונזיה",   lat:  -8.4, lon: 116.5 },
  { name: "פאנסיפאן וייטנאם",        lat:  22.3, lon: 103.8 },
  { name: "דוי אינתנון תאילנד",      lat:  18.6, lon:  98.5 },
  { name: "סרי פאדה סרי לנקה",       lat:   6.8, lon:  80.5 },
  { name: "מדבר גובי מונגוליה",      lat:  43.0, lon: 104.0 },
  { name: "פיץ רוי ארגנטינה",        lat: -49.3, lon: -73.0 },
  { name: "שביל האינקה פרו",          lat: -13.5, lon: -71.9 },
  { name: "הר רוריימה ונצואלה",       lat:   5.1, lon: -60.8 },
  { name: "קוטופקסי אקוודור",         lat:  -0.7, lon: -78.4 },
  { name: "מישורי המלח בוליביה",      lat: -20.1, lon: -67.6 },
  { name: "שפדה דיאמנטינה ברזיל",     lat: -12.5, lon: -41.5 },
  { name: "לוס נבאדוס קולומביה",      lat:   4.8, lon: -75.4 },
  { name: 'שביל אפלצ\'י ארה"ב',       lat:  36.0, lon: -82.0 },
  { name: "שביל פסיפיק קרסט",         lat:  37.0, lon: -119.0 },
  { name: "דנאלי אלסקה",             lat:  63.1, lon: -151.0 },
  { name: "חצי האי אולימפיק",         lat:  47.8, lon: -123.7 },
  { name: "זיון נארואס יוטה",         lat:  37.3, lon: -112.9 },
  { name: "קילימנג'רו טנזניה",        lat:  -3.1, lon:  37.4 },
  { name: "הרי האטלס מרוקו",          lat:  31.5, lon:  -7.5 },
  { name: "דרקנסברג דרום אפריקה",     lat: -29.0, lon:  29.5 },
  { name: "הרי רוונזורי אוגנדה",      lat:   0.4, lon:  29.9 },
  { name: "הרי סיניין אתיופיה",       lat:  13.2, lon:  38.4 },
  { name: "הר קניה",                 lat:  -0.2, lon:  37.3 },
  { name: "הר טובקל מרוקו",           lat:  31.1, lon:  -7.9 },
];

function ll2v(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * Math.PI / 180;
  const th  = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(th),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(th),
  );
}

export default function Globe3D({ onSelect }: { onSelect: (q: string) => void }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const tipRef     = useRef<HTMLDivElement>(null);
  const selectRef  = useRef(onSelect);

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tip  = tipRef.current;
    if (!wrap || !tip) return;

    console.log("[Globe3D] mounted", wrap.clientWidth, "x", wrap.clientHeight);

    let destroy: (() => void) | undefined;
    const raf = requestAnimationFrame(() => {
      try {
        destroy = init(wrap, tip, selectRef);
      } catch (e) {
        console.error("[Globe3D] init error:", e);
      }
    });
    return () => { cancelAnimationFrame(raf); destroy?.(); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={wrapRef} style={{ width: "100%", height: "100%", minHeight: 200 }} />
      <div ref={tipRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        background: "rgba(4,6,22,0.96)",
        border: "1px solid rgba(0,210,255,0.4)",
        borderRadius: 10, padding: "8px 14px",
        backdropFilter: "blur(16px)",
        opacity: 0, transform: "translateY(6px)",
        transition: "opacity .15s, transform .15s",
        whiteSpace: "nowrap", direction: "rtl",
      }} />
    </div>
  );
}

function init(
  wrap: HTMLDivElement,
  tip: HTMLDivElement,
  selectRef: React.MutableRefObject<(q: string) => void>,
): () => void {
  const W = wrap.clientWidth  || 350;
  const H = wrap.clientHeight || 250;
  console.log("[Globe3D] init size:", W, "x", H);

  /* ── renderer ── */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000814, 1);
  wrap.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.cursor  = "grab";

  /* ── scene / camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 500);
  camera.position.z = 4.5;

  /* ── stars ── */
  const sb = new Float32Array(3000 * 3);
  for (let i = 0; i < sb.length; i++) sb[i] = (Math.random() - 0.5) * 600;
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(sb, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({
    color: 0xffffff, size: 0.3, sizeAttenuation: true,
    transparent: true, opacity: 0.75,
  })));

  /* ── lighting — strong sun for day/night contrast ── */
  const sun = new THREE.DirectionalLight(0xfff5e0, 3.0);
  sun.position.set(5, 2, 3);
  scene.add(sun, new THREE.AmbientLight(0x1a2550, 0.6));

  /* ── globe group ── */
  const group = new THREE.Group();
  scene.add(group);
  const R = 2;

  /* ── earth — MeshPhongMaterial (no custom GLSL) ── */
  const earthMat = new THREE.MeshPhongMaterial({
    color: 0x1a4a8a,   // visible immediately before textures load
    shininess: 8,
    specular: new THREE.Color(0x112244),
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), earthMat);
  group.add(earth);

  /* ── atmosphere glow — simple BackSide mesh, no shader ── */
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.18, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x2266ff, transparent: true, opacity: 0.12,
      side: THREE.BackSide, depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  ));
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.55, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x0033aa, transparent: true, opacity: 0.06,
      side: THREE.BackSide, depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  ));

  /* ── load textures asynchronously ── */
  const BASE = "https://unpkg.com/three-globe/example/img/";
  const tl   = new THREE.TextureLoader();
  tl.crossOrigin = "anonymous";

  tl.load(BASE + "earth-blue-marble.jpg", (t) => {
    console.log("[Globe3D] day texture loaded");
    earthMat.map   = t;
    earthMat.color = new THREE.Color(0xffffff); // let texture take over
    earthMat.needsUpdate = true;
  }, undefined, () => console.warn("[Globe3D] day texture failed — using solid color"));

  let clouds: THREE.Mesh | null = null;
  tl.load(BASE + "earth-clouds.png", (t) => {
    clouds = new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.03, 64, 64),
      new THREE.MeshPhongMaterial({
        map: t, transparent: true, opacity: 0.2,
        depthWrite: false, blending: THREE.AdditiveBlending,
      }),
    );
    group.add(clouds);
  }, undefined, () => {});

  /* ── markers ── */
  type Marker = { dot: THREE.Mesh; halo: THREE.Mesh; dest: Dest; phase: number };
  const markers: Marker[] = [];
  const dotG  = new THREE.SphereGeometry(0.024, 8, 8);
  const haloG = new THREE.SphereGeometry(0.056, 8, 8);

  DEST.forEach((dest, i) => {
    const pos = ll2v(dest.lat, dest.lon, R + 0.016);

    const dot = new THREE.Mesh(dotG,
      new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
    dot.position.copy(pos);
    group.add(dot);

    const halo = new THREE.Mesh(haloG,
      new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.28, depthWrite: false }));
    halo.position.copy(pos);
    group.add(halo);

    markers.push({ dot, halo, dest, phase: (i / DEST.length) * Math.PI * 2 });
  });
  const dotMeshes = markers.map(m => m.dot);

  /* ── interaction ── */
  const cv = renderer.domElement;
  let isDrag = false, prevX = 0, prevY = 0, autoRot = true;
  let hovered: Marker | null = null;
  const VBIG = new THREE.Vector3(2.2, 2.2, 2.2);
  const VNRM = new THREE.Vector3(1, 1, 1);

  const onDown = (e: MouseEvent) => { isDrag = true; autoRot = false; prevX = e.clientX; prevY = e.clientY; cv.style.cursor = "grabbing"; };
  const onUp   = () => { if (!isDrag) return; isDrag = false; autoRot = true; cv.style.cursor = hovered ? "pointer" : "grab"; };
  const onMove = (e: MouseEvent) => {
    if (!isDrag) return;
    group.rotation.y += (e.clientX - prevX) * 0.005;
    group.rotation.x  = Math.max(-1.3, Math.min(1.3, group.rotation.x + (e.clientY - prevY) * 0.005));
    prevX = e.clientX; prevY = e.clientY;
  };
  const onWheel = (e: WheelEvent) => { e.preventDefault(); camera.position.z = Math.max(2.6, Math.min(9, camera.position.z + e.deltaY * 0.005)); };
  cv.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);
  window.addEventListener("mousemove", onMove);
  cv.addEventListener("wheel", onWheel, { passive: false });

  /* ── raycasting ── */
  const ray = new THREE.Raycaster();
  const m2  = new THREE.Vector2();

  const onHover = (e: MouseEvent) => {
    if (isDrag || !dotMeshes.length) return;
    const r = cv.getBoundingClientRect();
    m2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(m2, camera);
    const hits = ray.intersectObjects(dotMeshes);
    if (hits.length) {
      const m = markers.find(x => x.dot === hits[0].object) ?? null;
      if (m && m !== hovered) {
        hovered = m;
        tip.innerHTML = `<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:3px">${m.dest.name}</div><div style="font-size:11px;color:#00D4FF">לחץ לחפש ציוד</div>`;
        tip.style.opacity = "1"; tip.style.transform = "translateY(0)";
        cv.style.cursor = "pointer";
      }
      tip.style.left = e.clientX + 16 + "px";
      tip.style.top  = e.clientY - 10 + "px";
    } else if (hovered) {
      hovered = null;
      tip.style.opacity = "0"; tip.style.transform = "translateY(6px)";
      cv.style.cursor = "grab";
    }
  };
  const onClick = () => { if (hovered) selectRef.current("ציוד ל" + hovered.dest.name); };
  cv.addEventListener("mousemove", onHover);
  cv.addEventListener("click", onClick);

  /* ── resize ── */
  const ro = new ResizeObserver(() => {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  });
  ro.observe(wrap);

  /* ── animate ── */
  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (autoRot)  group.rotation.y  += 0.0014;
    if (clouds)   clouds.rotation.y += 0.00025;
    markers.forEach(m => {
      const p = 1 + 0.8 * Math.abs(Math.sin(t * 1.5 + m.phase));
      m.halo.scale.setScalar(p);
      (m.halo.material as THREE.MeshBasicMaterial).opacity = 0.28 / p;
      m.dot.scale.lerp(m === hovered ? VBIG : VNRM, 0.14);
      (m.dot.material as THREE.MeshBasicMaterial).color.setHex(m === hovered ? 0xffffff : 0x00E5FF);
    });
    renderer.render(scene, camera);
  };
  animate();
  console.log("[Globe3D] running");

  return () => {
    cancelAnimationFrame(raf);
    cv.removeEventListener("mousedown", onDown);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("mousemove", onMove);
    cv.removeEventListener("wheel", onWheel);
    cv.removeEventListener("mousemove", onHover);
    cv.removeEventListener("click", onClick);
    ro.disconnect();
    renderer.dispose();
    tip.style.opacity = "0";
    if (wrap.contains(cv)) wrap.removeChild(cv);
  };
}
