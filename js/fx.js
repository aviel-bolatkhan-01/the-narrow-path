(function() {
  const PARTICLE_COUNT = 400;
  const MAX_DELTA = 50;

  let canvas, ctx, particles = [], activeParticles = 0, animationFrameId = null;
  let shakeTimer = null, shakeMag = 0, shakeStart = 0, shakeDuration = 0;
  let flashDiv = null;

  const colors = {
    player: '#fff',
    enemy: '#8b1a1a',
    heal: '#d4af37',
    block: '#4a90e2'
  };

  function initParticlePool() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, size: 0, color: '#000', alpha: 1,
        rotation: 0, vRotation: 0, gravity: 0, lifetime: 0, active: false
      });
    }
  }

  function updateParticles(delta) {
    let newActiveCount = 0;
    const deltaSeconds = delta / 1000;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      if (!p.active) continue;

      p.x += p.vx * deltaSeconds;
      p.y += p.vy * deltaSeconds;
      p.vy += p.gravity * deltaSeconds;
      p.rotation += p.vRotation * deltaSeconds;
      p.lifetime -= delta;

      if (p.lifetime <= 0) {
        p.active = false;
      } else {
        newActiveCount++;
      }
    }

    activeParticles = newActiveCount;
    if (activeParticles === 0 && animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function renderParticles() {
    if (activeParticles === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      if (!p.active) continue;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha * (p.lifetime / 1000);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function animate(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const delta = Math.min(timestamp - lastTimestamp, MAX_DELTA);
    lastTimestamp = timestamp;

    updateParticles(delta);
    renderParticles();

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  function startAnimation() {
    if (animationFrameId === null) {
      lastTimestamp = null;
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  function createParticle(x, y, vx, vy, size, color, lifetime, gravity, rotation, vRotation) {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (!particles[i].active) {
        particles[i] = {
          x, y, vx, vy, size, color, alpha: 1, rotation, vRotation,
          gravity, lifetime, active: true
        };
        activeParticles++;
        return;
      }
    }
  }

  function burst(x, y, opts = {}) {
    const { color = '#2c2c2c', count = 20, spread = 100 } = opts;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * spread;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = 2 + Math.random() * 4;
      const lifetime = 500 + Math.random() * 500;
      const gravity = 900;
      const rotation = Math.random() * Math.PI * 2;
      const vRotation = (Math.random() - 0.5) * 2;

      createParticle(x, y, vx, vy, size, color, lifetime, gravity, rotation, vRotation);
    }

    startAnimation();
  }

  function damageNumber(x, y, amount, kind) {
    const color = colors[kind] || '#fff';
    const size = 20 + Math.min(amount / 10, 30);
    const lifetime = 900;
    const vx = (Math.random() - 0.5) * 20;
    const vy = -60;
    const gravity = 0;

    createParticle(x, y, vx, vy, size, color, lifetime, gravity, 0, 0);

    startAnimation();
  }

  function shake(mag, dur) {
    if (shakeTimer) {
      clearTimeout(shakeTimer);
      document.body.style.transform = '';
      document.documentElement.style.transform = '';
    }

    shakeMag = mag;
    shakeDuration = dur;
    shakeStart = Date.now();

    function updateShake() {
      const elapsed = Date.now() - shakeStart;
      if (elapsed >= shakeDuration) {
        document.body.style.transform = '';
        document.documentElement.style.transform = '';
        shakeTimer = null;
        return;
      }

      const progress = elapsed / shakeDuration;
      const currentMag = shakeMag * (1 - progress);
      const x = (Math.random() - 0.5) * currentMag * 2;
      const y = (Math.random() - 0.5) * currentMag * 2;

      const transform = `translate(${x}px, ${y}px)`;
      if (document.body.firstChild) {
        document.body.firstChild.style.transform = transform;
      } else {
        document.documentElement.style.transform = transform;
      }

      shakeTimer = setTimeout(updateShake, 16);
    }

    updateShake();
  }

  function flash(color) {
    if (flashDiv) {
      document.body.removeChild(flashDiv);
    }

    flashDiv = document.createElement('div');
    flashDiv.style.position = 'fixed';
    flashDiv.style.top = '0';
    flashDiv.style.left = '0';
    flashDiv.style.width = '100%';
    flashDiv.style.height = '100%';
    flashDiv.style.backgroundColor = color;
    flashDiv.style.opacity = '0.5';
    flashDiv.style.pointerEvents = 'none';
    flashDiv.style.zIndex = '9998';
    flashDiv.style.transition = 'opacity 350ms ease-out';

    document.body.appendChild(flashDiv);

    setTimeout(() => {
      flashDiv.style.opacity = '0';
      setTimeout(() => {
        if (flashDiv && flashDiv.parentNode) {
          document.body.removeChild(flashDiv);
        }
        flashDiv = null;
      }, 350);
    }, 10);
  }

  function sparkles(el) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    burst(x, y, {
      color: '#ffd700',
      count: 12,
      spread: 50
    });
  }

  function setCanvas(zIndex) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = zIndex.toString();
      document.body.appendChild(canvas);

      ctx = canvas.getContext('2d');
      initParticlePool();
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  window.NP_FX = {
    burst,
    damageNumber,
    shake,
    flash,
    sparkles,
    setCanvas
  };
})();
