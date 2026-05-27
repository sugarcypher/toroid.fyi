/* ============================================================
   toroid.fyi · depth-torus engine
   ------------------------------------------------------------
   Single-canvas WebGL torus that assembles → disassembles →
   surfaces N angularly-placed segment labels. Each segment is
   a route; clicking dollies the camera in and navigates.

   Used by every layer page. Configure via window.TOROID_CONFIG
   before loading this script:

     window.TOROID_CONFIG = {
       layer: 1,                    // depth (0 = homepage, 1 = layer-1, etc)
       palette: 'cosmic',           // 'cosmic' | 'void' | 'architectural'
       segments: 16,                // total segments around the torus
       destinations: [              // 3-6 picks become clickable
         { idx: 0,  name: 'Subnode A', href: '/research/a/' },
         { idx: 4,  name: 'Subnode B', href: '/research/b/' },
         ...
       ],
     };

   Falls back to an animated SVG torus on:
     - viewport width < 700px
     - prefers-reduced-motion
     - WebGL unavailable
   ============================================================ */

(function(){
  'use strict';

  const cfg = window.TOROID_CONFIG || {};
  const LAYER = cfg.layer ?? 0;
  const PALETTE = cfg.palette || 'cosmic';
  const SEG_COUNT = cfg.segments || 16;
  const DESTINATIONS = cfg.destinations || [];
  const PICK_SET = new Set(DESTINATIONS.map(d => d.idx));

  // === Capability detection — bail to SVG fallback if needed ===
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallViewport = window.innerWidth < 700;
  const webglOK = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch(e){ return false; }
  })();

  if (reduceMotion || smallViewport || !webglOK){
    renderSvgFallback();
    return;
  }

  // === Palette per depth — depth is subtraction ===
  const PALETTES = {
    cosmic: {        // Layer 0 — homepage
      bg: 0x040209, ambient: 0xffffff, ambientI: 0.35,
      rim: 0xb6a4ff, rimI: 1.4, fill: 0x7c50e0, fillI: 0.7, back: 0xe08b54, backI: 0.4,
      torus: 0x4a3a8a, torusEm: 0x2a1f5a, torusEmI: 0.45,
      dust: 0xb6a4ff, dustI: 0.55, dustCount: 220,
      glow: 0x7c50e0, glowI: 0.12,
      fog: [0x040209, 6, 20],
    },
    void: {          // Layer 1 — fewer particles, dimmer
      bg: 0x020107, ambient: 0xffffff, ambientI: 0.22,
      rim: 0x9b8cdf, rimI: 1.0, fill: 0x5d3eb6, fillI: 0.5, back: 0x000000, backI: 0,
      torus: 0x382b6a, torusEm: 0x1b1442, torusEmI: 0.30,
      dust: 0x9b8cdf, dustI: 0.30, dustCount: 90,
      glow: 0x5d3eb6, glowI: 0.06,
      fog: [0x020107, 5, 16],
    },
    architectural: { // Layer 2+ — almost black
      bg: 0x010005, ambient: 0xffffff, ambientI: 0.15,
      rim: 0x7d6cc0, rimI: 0.7, fill: 0x3d2890, fillI: 0.3, back: 0x000000, backI: 0,
      torus: 0x281d50, torusEm: 0x100b2a, torusEmI: 0.18,
      dust: 0x7d6cc0, dustI: 0.15, dustCount: 30,
      glow: 0x000000, glowI: 0,
      fog: [0x010005, 4, 13],
    },
  };
  const P = PALETTES[PALETTE] || PALETTES.cosmic;

  // === Scene setup ===
  const stage = document.getElementById('stage');
  if (!stage){ console.warn('[torus-engine] #stage element missing'); return; }

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(P.fog[0], P.fog[1], P.fog[2]);

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  scene.add(new THREE.AmbientLight(P.ambient, P.ambientI));
  const rim  = new THREE.PointLight(P.rim,  P.rimI, 30); rim.position.set(5, 6, 5);  scene.add(rim);
  const fill = new THREE.PointLight(P.fill, P.fillI, 30); fill.position.set(-6, -4, 4); scene.add(fill);
  if (P.backI > 0){
    const back = new THREE.PointLight(P.back, P.backI, 20); back.position.set(0, 0, -6); scene.add(back);
  }

  // Torus built from N segments
  const R = 2.2, r = 0.55;
  const segArc = (2 * Math.PI) / SEG_COUNT;
  const segments = [];
  const segGeoCache = new THREE.TorusGeometry(R, r, 12, 24, segArc);

  for (let i = 0; i < SEG_COUNT; i++){
    const segMat = new THREE.MeshStandardMaterial({
      color: P.torus, emissive: P.torusEm, emissiveIntensity: P.torusEmI,
      metalness: 0.45, roughness: 0.35,
      transparent: true, opacity: 1.0,
    });
    const mesh = new THREE.Mesh(segGeoCache, segMat);
    mesh.rotation.z = i * segArc;
    const angle = i * segArc + segArc * 0.5;
    mesh.userData = {
      segIndex: i,
      angle,
      explodeDir: new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize(),
      homeRotZ: i * segArc,
    };
    segments.push(mesh);
  }

  const torus = new THREE.Group();
  for (const s of segments) torus.add(s);
  torus.rotation.x = -0.45;
  torus.rotation.y = 0.12;
  scene.add(torus);

  if (P.glowI > 0){
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 12),
      new THREE.MeshBasicMaterial({ color: P.glow, transparent:true, opacity: P.glowI })
    );
    scene.add(glow);
    var _glow = glow;
  }

  // Dust field — sparser per depth
  let dust = null;
  if (P.dustCount > 0){
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(P.dustCount * 3);
    for (let i = 0; i < P.dustCount; i++){
      const rr = 4 + Math.random() * 9;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      dustPos[i*3+0] = rr * Math.cos(b) * Math.cos(a);
      dustPos[i*3+1] = rr * Math.sin(b);
      dustPos[i*3+2] = rr * Math.cos(b) * Math.sin(a);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: P.dust, size: 0.020, transparent: true, opacity: P.dustI, sizeAttenuation:true,
    }));
    scene.add(dust);
  }

  // === State machine ===
  let state = cfg.autoEnter ? 'descending' : 'assembled';
  const t0 = performance.now();
  let rafId = null;

  // === Floating segment labels (positioned each frame via projection) ===
  const labelHost = document.getElementById('segment-labels');
  if (labelHost){
    DESTINATIONS.forEach(d => {
      const el = document.createElement('a');
      el.className = 'seg-label';
      el.href = d.href;
      el.textContent = d.name;
      el.dataset.segIndex = d.idx;
      el.setAttribute('aria-label', `Descend into ${d.name}`);
      el.addEventListener('mouseenter', () => highlightSeg(d.idx, true));
      el.addEventListener('mouseleave', () => highlightSeg(d.idx, false));
      el.addEventListener('focus',      () => highlightSeg(d.idx, true));
      el.addEventListener('blur',       () => highlightSeg(d.idx, false));
      el.addEventListener('click', (e) => {
        e.preventDefault();
        descendInto(d);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          descendInto(d);
        }
      });
      labelHost.appendChild(el);
    });
  }

  function highlightSeg(idx, on){
    const s = segments[idx];
    if (!s) return;
    s.material.emissive.setHex(on ? P.rim : P.torusEm);
    s.material.emissiveIntensity = on ? 1.2 : P.torusEmI;
    s.scale.setScalar(on ? 1.08 : 1.0);
  }

  const _v = new THREE.Vector3();
  function project(point){
    _v.copy(point).project(camera);
    return {
      x: (_v.x * 0.5 + 0.5) * window.innerWidth,
      y: (-_v.y * 0.5 + 0.5) * window.innerHeight,
      z: _v.z,
    };
  }

  function updateLabels(){
    if (!labelHost) return;
    const labels = labelHost.querySelectorAll('.seg-label');
    labels.forEach(el => {
      const idx = parseInt(el.dataset.segIndex, 10);
      const seg = segments[idx];
      if (!seg) return;
      const a = seg.userData.angle;
      const local = new THREE.Vector3(R * Math.cos(a) * 1.45, R * Math.sin(a) * 1.45, 0);
      local.applyMatrix4(torus.matrixWorld);
      const p = project(local);
      if (p.z > 1){ el.style.opacity = 0; return; }
      el.style.left = p.x + 'px';
      el.style.top  = p.y + 'px';
      el.style.opacity = (state === 'disassembled') ? 1 : 0;
    });
  }

  // === Enter button → trigger descent ===
  const enterBtn = document.getElementById('enter');
  if (enterBtn){
    enterBtn.addEventListener('click', () => {
      if (state !== 'assembled') return;
      state = 'descending';
      document.body.classList.add('descending');
      setTimeout(() => {
        state = 'disassembled';
        document.body.classList.add('disassembled');
      }, 1100);
    });
  } else if (cfg.autoEnter){
    // No enter button — disassemble immediately (used on layer pages)
    setTimeout(() => {
      state = 'disassembled';
      document.body.classList.add('disassembled');
    }, 600);
  }

  function descendInto(dest){
    if (state !== 'disassembled') return;
    state = 'transitioning';
    const target = segments[dest.idx];
    const wp = new THREE.Vector3();
    target.getWorldPosition(wp);
    const start = performance.now();
    const dur = 900;
    const camFrom = camera.position.clone();
    const camTo   = new THREE.Vector3(wp.x * 0.7, wp.y * 0.7, 2.0);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 0.5 - 0.5 * Math.cos(t * Math.PI);
      camera.position.lerpVectors(camFrom, camTo, e);
      camera.lookAt(wp);
      segments.forEach((s, i) => {
        if (i !== dest.idx) s.material.opacity = 1 - e * 0.95;
      });
      if (labelHost) labelHost.style.opacity = 1 - e;
      renderer.render(scene, camera);
      if (t < 1) requestAnimationFrame(tick);
      else { window.location.href = dest.href; }
    };
    requestAnimationFrame(tick);
  }

  // === Frame loop ===
  function loop(now){
    const elapsed = (now - t0) / 1000;
    torus.rotation.y += 0.0024;
    if (_glow) _glow.rotation.y -= 0.001;
    if (dust)  dust.rotation.y += 0.00045;

    if (state === 'disassembled' || state === 'transitioning'){
      const targetExplode = 1.05;
      segments.forEach((s, i) => {
        const dir = s.userData.explodeDir;
        const target = new THREE.Vector3().copy(dir).multiplyScalar(targetExplode);
        s.position.lerp(target, 0.06);
        s.rotation.z = s.userData.homeRotZ + Math.sin(elapsed * 0.6 + i) * 0.02;
      });
      DESTINATIONS.forEach(d => {
        const s = segments[d.idx];
        const p = (Math.sin(elapsed * 1.7 + d.idx) * 0.5 + 0.5);
        s.material.emissiveIntensity = P.torusEmI + p * 0.55;
      });
      updateLabels();
    } else {
      segments.forEach(s => s.position.lerp(new THREE.Vector3(0,0,0), 0.1));
      const breathe = 1 + Math.sin(elapsed * 0.7) * 0.012;
      torus.scale.setScalar(breathe);
    }

    renderer.render(scene, camera);
    if (state !== 'transitioning') rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  // === Resize ===
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // === Raycaster — pointer interactions on segments ===
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  renderer.domElement.addEventListener('mousemove', (e) => {
    if (state !== 'disassembled') return;
    const r = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(segments, false);
    let hoverIdx = -1;
    if (hits.length){
      const idx = hits[0].object.userData.segIndex;
      if (PICK_SET.has(idx)) hoverIdx = idx;
    }
    renderer.domElement.style.cursor = hoverIdx >= 0 ? 'pointer' : 'default';
    DESTINATIONS.forEach(d => {
      if (d.idx === hoverIdx){
        segments[d.idx].material.emissive.setHex(P.rim);
        segments[d.idx].scale.setScalar(1.10);
      } else {
        segments[d.idx].material.emissive.setHex(P.torusEm);
        segments[d.idx].scale.setScalar(1.0);
      }
    });
  });
  renderer.domElement.addEventListener('click', (e) => {
    if (state !== 'disassembled') return;
    const r = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(segments, false);
    if (hits.length){
      const idx = hits[0].object.userData.segIndex;
      const dest = DESTINATIONS.find(d => d.idx === idx);
      if (dest) descendInto(dest);
    }
  });

  // === WebGL cleanup — dispose context + cancel rAF on navigation ===
  function cleanup(){
    if (rafId) cancelAnimationFrame(rafId);
    segments.forEach(s => { s.geometry.dispose(); s.material.dispose(); });
    if (dust){ dust.geometry.dispose(); dust.material.dispose(); }
    renderer.dispose();
  }
  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('pagehide', cleanup);

  // === SVG FALLBACK ===
  function renderSvgFallback(){
    const host = document.getElementById('stage');
    if (!host) return;
    const w = window.innerWidth, h = window.innerHeight;
    const cx = w/2, cy = h/2 - 30;
    const rx = Math.min(w*0.32, 280), ry = rx*0.45;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'fixed';
    svg.style.inset = '0';
    svg.setAttribute('aria-hidden', 'true');
    // 3 concentric ellipses, slow rotation
    for (let i = 0; i < 3; i++){
      const e = document.createElementNS(svgNS, 'ellipse');
      e.setAttribute('cx', cx); e.setAttribute('cy', cy);
      e.setAttribute('rx', rx * (1 - i*0.18));
      e.setAttribute('ry', ry * (1 - i*0.18));
      e.setAttribute('fill', 'none');
      e.setAttribute('stroke', PALETTE === 'cosmic' ? '#b6a4ff' : (PALETTE === 'void' ? '#9b8cdf' : '#7d6cc0'));
      e.setAttribute('stroke-width', i === 0 ? 1.4 : 0.9);
      e.setAttribute('opacity', 1 - i*0.3);
      svg.appendChild(e);
    }
    host.appendChild(svg);
    // Show enter button + segment labels immediately in fallback mode
    document.body.classList.add('disassembled');
    // Place labels around the ellipse using DOM positioning
    if (labelHost){
      DESTINATIONS.forEach(d => {
        const el = document.createElement('a');
        el.className = 'seg-label';
        el.href = d.href;
        el.textContent = d.name;
        el.setAttribute('aria-label', `Descend into ${d.name}`);
        const segArc = (2 * Math.PI) / SEG_COUNT;
        const a = d.idx * segArc + segArc * 0.5;
        el.style.left = (cx + Math.cos(a) * rx * 1.35) + 'px';
        el.style.top  = (cy + Math.sin(a) * ry * 1.35) + 'px';
        labelHost.appendChild(el);
      });
    }
  }
})();
