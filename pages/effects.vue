<template>
  <div class="container" style="padding-top:24px;padding-bottom:40px">
    <h1 class="page-title">{{ $t('effects.allEffects') }}</h1>
    <p class="page-sub">35 {{ $t('effects.allEffects').toLowerCase() }} · 5 {{ $t('effects.tier').toLowerCase() + 's' }}</p>

    <div class="tier-filter">
      <button class="btn" :class="{ 'btn-primary': filterTier === 0 }" @click="filterTier = 0">{{ $t('customers.all') }}</button>
      <button v-for="t in 5" :key="t" class="btn" :class="{ 'btn-primary': filterTier === t }" @click="filterTier = t"
        :style="filterTier === t ? {} : { borderColor: tierColors[t] + '60', color: tierColors[t] }">
        T{{ t }}
      </button>
    </div>

    <div class="effects-grid">
      <div v-for="[key, eff] in filteredEffects" :key="key" class="effect-card">
        <div class="ec-header">
          <span class="tier-badge" :style="{ background: tierColors[eff.tier]+'20', color: tierColors[eff.tier] }">T{{ eff.tier }}</span>
          <span class="ec-name">{{ $t(`effectNames.${key}`, eff.displayName) }}</span>
          <span v-if="eff.addBase > 0" class="ec-price">+{{ (eff.addBase * 100).toFixed(0) }}%</span>
          <span v-else class="ec-price zero">+0%</span>
        </div>
        <div class="ec-desc">{{ $t(`effectDescriptions.${key}`, eff.description) }}</div>
        <div class="ec-meta">
          <span>{{ $t('effects.priceBonus') }}: {{ eff.addBase > 0 ? '+' + (eff.addBase * 100).toFixed(0) + '%' : '—' }}</span>
          <span>{{ ingredientFor(key) }}</span>
        </div>
        <!-- Customers who want this effect -->
        <div v-if="customersFor(key).length" class="ec-customers">
          <span v-for="c in customersFor(key)" :key="c.id" class="ec-cust">{{ c.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { effects, ingredients, customers, tierColors, resolveEffectKey, getEffectDisplayName } = useGameData()
const { locale, t } = useI18n()
const filterTier = ref(0)

const filteredEffects = computed(() => {
  return Object.entries(effects)
    .filter(([, e]) => filterTier.value === 0 || e.tier === filterTier.value)
    .sort((a, b) => a[1].tier - b[1].tier || a[1].displayName.localeCompare(b[1].displayName))
})

function ingredientFor(key: string): string {
  const ing = ingredients.find(i => i.effect === key)
  return ing ? `← ${t(`ingredientNames.${ing.name}`, ing.name)} ($${ing.price})` : ''
}

function customersFor(key: string): typeof customers {
  const dn = getEffectDisplayName(key)
  return customers.filter(c => c.preferredEffects.some(pe => resolveEffectKey(pe) === key))
}

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Все эффекты — Schedule I' : 'All Effects — Schedule I',
  description: () => locale.value === 'ru'
    ? '35 эффектов Schedule I — тиры, бонусы к цене, ингредиенты и какие клиенты их предпочитают.'
    : 'All 35 Schedule I effects — tiers, price bonuses, ingredients and which customers prefer them.',
})
</script>

<style scoped>
.page-title { font-family: var(--font-display); font-size: 1.6rem; color: var(--green); margin-bottom: 4px; }
.page-sub { color: var(--text3); font-size: .75rem; margin-bottom: 20px; }
.tier-filter { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
.effects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 10px; }
.effect-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 12px; }
.ec-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.ec-name { font-size: .85rem; font-weight: 600; flex: 1; }
.ec-price { font-size: .7rem; color: var(--green); font-weight: 600; }
.ec-price.zero { color: var(--text3); }
.ec-desc { font-size: .7rem; color: var(--text2); margin-bottom: 6px; }
.ec-meta { font-size: .6rem; color: var(--text3); display: flex; justify-content: space-between; }
.ec-customers { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; }
.ec-cust { font-size: .55rem; padding: 1px 6px; background: var(--bg3); border-radius: 3px; color: var(--text2); }
</style>
