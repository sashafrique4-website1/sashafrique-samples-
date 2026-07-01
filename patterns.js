/* Shared helpers for the Sash Afrique gallery.
   Used by index.html, pattern.html, and admin.html. */

const ACCENTS = ['#A3231F','#1C5A3B','#5B2A86','#0B4C6E','#8C3B12','#6B6B3D'];

function hashStr(s){
  let h = 0;
  for (let i = 0; i < s.length; i++){ h = (h * 31 + s.charCodeAt(i)) >>> 0; }
  return h;
}

function accentFor(name){ return ACCENTS[hashStr(name) % ACCENTS.length]; }

/* Procedural kente-stripe placeholder — used whenever a pattern has no
   uploaded photo yet, so the gallery never shows a broken image. */
function placeholderSVG(name, variant){
  const accent = accentFor(name);
  const seed = hashStr(name + variant);
  const bands = [];
  let y = 0, i = 0;
  while (y < 1000){
    const h = 26 + ((seed >> (i % 20)) & 31);
    const pick = (seed + i * 17) % 9;
    let color = '#0a0a0a';
    if (pick === 0 || pick === 1) color = '#FAB202';
    else if (pick === 2) color = accent;
    else if (pick === 3) color = '#151515';
    bands.push(`<rect x="0" y="${y}" width="800" height="${h}" fill="${color}"/>`);
    if (pick === 0) bands.push(`<rect x="0" y="${y+h}" width="800" height="2" fill="#ffffff" opacity="0.5"/>`);
    y += h; i++;
  }
  const initial = name.trim().charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#0a0a0a"/>
    <g opacity="0.9">${bands.join('')}</g>
    <rect width="800" height="1000" fill="#0a0a0a" opacity="0.28"/>
    <text x="400" y="560" font-family="Georgia, serif" font-size="360" fill="#ffffff" fill-opacity="0.06" text-anchor="middle">${initial}</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function placeholderThumb(name){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#141414"/>
    <text x="50" y="60" font-family="Georgia,serif" font-size="46" fill="#FAB202" text-anchor="middle">${name.charAt(0).toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function patternImages(p){
  if (p.images && p.images.length) return p.images;
  return [placeholderSVG(p.name, 0), placeholderSVG(p.name, 1), placeholderSVG(p.name, 2)];
}

function slugify(name){
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
