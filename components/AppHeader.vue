<template>
  <header class="header">
    <NuxtLink to="/" class="logo"><img src="/game-icon.png" alt="" class="logo-icon" />Schedule I<span>MIX SIMULATOR</span></NuxtLink>
    <nav class="nav-links">
      <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">{{ $t('nav.mixer') }}</NuxtLink>
      <NuxtLink to="/effects" class="nav-link" :class="{ active: route.path === '/effects' }">{{ $t('nav.effects') }}</NuxtLink>
      <NuxtLink to="/customers" class="nav-link" :class="{ active: route.path === '/customers' }">{{ $t('nav.customers') }}</NuxtLink>
      <NuxtLink to="/guide" class="nav-link" :class="{ active: route.path === '/guide' }">{{ $t('nav.guide') }}</NuxtLink>
    </nav>
    <div class="header-controls">
      <a href="https://www.donationalerts.com/r/zuckerigprod" target="_blank" rel="noopener" class="support-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        {{ locale === 'ru' ? 'Поддержать' : 'Support' }}
      </a>
      <div class="zoom-toggle">
        <button class="zoom-btn" @click="zoomOut" :disabled="zoomLevel <= 70">−</button>
        <span class="zoom-value">{{ zoomLevel }}%</span>
        <button class="zoom-btn" @click="zoomIn" :disabled="zoomLevel >= 130">+</button>
      </div>
      <div class="lang-toggle">
        <button v-for="loc in locales" :key="loc.code" class="lang-btn" :class="{ active: locale === loc.code }" @click="setLocale(loc.code)">
          {{ loc.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const route = useRoute()

const ZOOM_KEY = 'site-zoom-level'
const zoomLevel = ref(100)

function applyZoom() {
  if (import.meta.client) {
    document.documentElement.style.zoom = `${zoomLevel.value}%`
    localStorage.setItem(ZOOM_KEY, String(zoomLevel.value))
  }
}

function zoomIn() {
  if (zoomLevel.value < 130) {
    zoomLevel.value += 10
    applyZoom()
  }
}

function zoomOut() {
  if (zoomLevel.value > 70) {
    zoomLevel.value -= 10
    applyZoom()
  }
}

onMounted(() => {
  const saved = localStorage.getItem(ZOOM_KEY)
  if (saved) {
    const val = Number(saved)
    if (val >= 70 && val <= 130) {
      zoomLevel.value = val
      applyZoom()
    }
  }
})
</script>

<style scoped>
.header {
  padding: 14px 24px; display: flex; align-items: center; gap: 24px;
  border-bottom: 1px solid var(--border); background: var(--bg2);
  position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);
}
.logo {
  font-family: var(--font-display); font-size: 1.2rem; color: var(--green);
  letter-spacing: 1px; text-transform: uppercase; text-decoration: none;
  text-shadow: 0 0 20px var(--green-glow); white-space: nowrap;
  display: flex; align-items: center; gap: 8px;
}
.logo-icon { width: 28px; height: 28px; object-fit: contain; }
.logo span { color: var(--text3); font-family: var(--font-mono); font-size: .65rem; margin-left: 10px; letter-spacing: 3px; }
.nav-links { display: flex; gap: 4px; flex: 1; }
.nav-link {
  padding: 6px 14px; font-size: .75rem; color: var(--text3); text-decoration: none;
  border-radius: 4px; transition: all .15s; letter-spacing: 1px;
}
.nav-link:hover { color: var(--text); background: var(--bg3); }
.nav-link.active { color: var(--green); background: var(--green-dim); }
.header-controls { display: flex; gap: 10px; align-items: center; }
.support-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 14px; border: 1px solid var(--red); border-radius: 4px;
  color: var(--red); font-size: .7rem; font-family: var(--font-mono);
  letter-spacing: 1px; text-decoration: none; transition: all .2s; white-space: nowrap;
}
.support-btn:hover { background: var(--red); color: #fff; text-decoration: none; }
.support-btn svg { flex-shrink: 0; }
.zoom-toggle {
  display: flex; align-items: center; border: 1px solid var(--border2); border-radius: 4px; overflow: hidden;
}
.zoom-btn {
  padding: 5px 8px; background: transparent; border: none; color: var(--text3);
  cursor: pointer; font-family: var(--font-mono); font-size: .8rem; transition: all .2s; line-height: 1;
}
.zoom-btn:hover:not(:disabled) { color: var(--text); background: var(--bg3); }
.zoom-btn:disabled { opacity: .3; cursor: default; }
.zoom-value {
  padding: 0 4px; font-family: var(--font-mono); font-size: .65rem; color: var(--text3);
  letter-spacing: 1px; min-width: 36px; text-align: center; user-select: none;
}
.lang-toggle { display: flex; border: 1px solid var(--border2); border-radius: 4px; overflow: hidden; }
.lang-btn {
  padding: 5px 12px; background: transparent; border: none; color: var(--text3);
  cursor: pointer; font-family: var(--font-mono); font-size: .7rem; letter-spacing: 2px; transition: all .2s;
}
.lang-btn.active { background: var(--green); color: var(--bg); font-weight: 700; }
.lang-btn:hover:not(.active) { color: var(--text); }
@media (max-width: 768px) {
  .header { flex-wrap: wrap; padding: 10px 16px; }
  .nav-links { order: 3; width: 100%; }
  .nav-link { font-size: .65rem; padding: 5px 10px; }
}
</style>
