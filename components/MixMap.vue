<template>
  <div class="map-wrap">
    <canvas ref="canvasRef" @mousemove="onHover" @mouseleave="tooltip = null" />
    <div v-if="tooltip" class="tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
      <div class="tt-name">{{ tooltip.name }}</div>
      <div class="tt-tier">Tier {{ tooltip.tier }} · +{{ (tooltip.addBase * 100).toFixed(0) }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { effects, tierColors } = useGameData()
const { t } = useI18n()

const props = defineProps<{
  currentEffects: string[]
  primaryEffects: string[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const size = 560
const mapRadius = 4.0
const effectRadius = 0.4
const tooltip = ref<{ x: number; y: number; name: string; tier: number; addBase: number } | null>(null)

function getDpr() {
  return typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
}

function mapToCanvas(mx: number, my: number) {
  const half = size / 2
  const scale = (half - 28) / mapRadius
  return { x: half + mx * scale, y: half - my * scale }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = getDpr()
  const half = size / 2

  canvas.width = size * dpr
  canvas.height = size * dpr
  canvas.style.width = size + 'px'
  canvas.style.height = size + 'px'

  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, size, size)

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1
  for (let i = -4; i <= 4; i++) {
    let p1 = mapToCanvas(i, -4), p2 = mapToCanvas(i, 4)
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()
    p1 = mapToCanvas(-4, i); p2 = mapToCanvas(4, i)
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()
  }

  // Axes
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(half, 28); ctx.lineTo(half, size - 28); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(28, half); ctx.lineTo(size - 28, half); ctx.stroke()

  // Range circles
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  for (let r = 1; r <= 4; r++) {
    const p = mapToCanvas(r, 0)
    ctx.beginPath(); ctx.arc(half, half, p.x - half, 0, Math.PI * 2); ctx.stroke()
  }

  // Effect circles
  const er = effectRadius * ((half - 28) / mapRadius)
  for (const [key, eff] of Object.entries(effects)) {
    const p = mapToCanvas(eff.mapX, eff.mapY)
    const color = tierColors[eff.tier] || '#888'
    const isHit = props.currentEffects.includes(key)
    const isPrimary = props.primaryEffects.includes(key)

    if (isHit) {
      const gc = isPrimary ? '#00ff88' : '#00ddff'
      ctx.save(); ctx.shadowColor = gc; ctx.shadowBlur = 14
      ctx.fillStyle = isPrimary ? 'rgba(0,255,136,0.15)' : 'rgba(0,221,255,0.15)'
      ctx.beginPath(); ctx.arc(p.x, p.y, er, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
      ctx.strokeStyle = gc; ctx.lineWidth = 2
    } else {
      ctx.fillStyle = color + '08'
      ctx.beginPath(); ctx.arc(p.x, p.y, er, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = color + '40'; ctx.lineWidth = 1
    }
    ctx.beginPath(); ctx.arc(p.x, p.y, er, 0, Math.PI * 2); ctx.stroke()

    const label = t(`effectNames.${key}`, eff.displayName)
    ctx.font = '9px "JetBrains Mono", monospace'
    ctx.fillStyle = isHit ? (isPrimary ? '#00ff88' : '#00ddff') : (color + '90')
    ctx.textAlign = 'center'
    ctx.fillText(label, p.x, p.y + 3)
  }

  // Origin
  const o = mapToCanvas(0, 0)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(o.x - 5, o.y); ctx.lineTo(o.x + 5, o.y); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(o.x, o.y - 5); ctx.lineTo(o.x, o.y + 5); ctx.stroke()
}

function onHover(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const half = size / 2
  const sx = size / rect.width, sy = size / rect.height
  const cx = (e.clientX - rect.left) * sx, cy = (e.clientY - rect.top) * sy
  const scale = (half - 28) / mapRadius
  const mx = (cx - half) / scale, my = -(cy - half) / scale

  for (const [key, eff] of Object.entries(effects)) {
    const d = Math.sqrt((mx - eff.mapX) ** 2 + (my - eff.mapY) ** 2)
    if (d <= effectRadius) {
      tooltip.value = { x: e.clientX + 12, y: e.clientY - 10, name: t(`effectNames.${key}`, eff.displayName), tier: eff.tier, addBase: eff.addBase }
      return
    }
  }
  tooltip.value = null
}

watch(() => [props.currentEffects, props.primaryEffects], draw, { deep: true })
onMounted(draw)
</script>

<style scoped>
.map-wrap { position: relative; display: flex; justify-content: center; }
canvas {
  border: 1px solid var(--border); border-radius: 6px;
  background: radial-gradient(ellipse at center, #0a0f0e 0%, #060608 70%);
  max-width: 100%; cursor: crosshair;
}
.tooltip {
  position: fixed; z-index: 200; background: var(--bg3); border: 1px solid var(--border2);
  border-radius: 5px; padding: 8px 12px; pointer-events: none; box-shadow: 0 8px 24px rgba(0,0,0,.5);
}
.tt-name { font-size: .8rem; color: var(--text); font-weight: 600; }
.tt-tier { font-size: .65rem; color: var(--text2); margin-top: 2px; }
</style>
