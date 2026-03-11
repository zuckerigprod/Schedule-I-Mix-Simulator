<template>
  <div class="container guide" style="padding-top:24px;padding-bottom:40px">
    <h1 class="page-title">{{ $t('guide.title') }}</h1>

    <div class="steps">
      <div class="step-card" v-for="i in 4" :key="i">
        <div class="step-num">{{ i }}</div>
        <div>
          <h3>{{ $t(`guide.step${i}title`) }}</h3>
          <p>{{ $t(`guide.step${i}text`) }}</p>
        </div>
      </div>
    </div>

    <div class="formula-card">
      <h3>{{ $t('guide.formula') }}</h3>
      <code>{{ $t('guide.formulaText') }}</code>
      <div class="example">
        <p>Cocaine ($150) + Athletic (+32%) + Shrinking (+60%) + Zombifying (+58%)</p>
        <p class="result">= $150 × (1 + 0.32 + 0.60 + 0.58) = <strong>${{ Math.round(150 * 2.50) }}</strong></p>
      </div>
    </div>

    <div class="tips-card">
      <h3>{{ $t('guide.tipsTitle') }}</h3>
      <ul>
        <li>{{ $t('guide.tip1') }}</li>
        <li>{{ $t('guide.tip2') }}</li>
        <li>{{ $t('guide.tip3') }}</li>
      </ul>
    </div>

    <!-- Effect price table -->
    <h2 class="section-title" style="margin-top:30px">{{ $t('effects.priceBonus') }}</h2>
    <div class="price-table">
      <div class="pt-row pt-header">
        <span>{{ $t('effects.allEffects') }}</span>
        <span>{{ $t('effects.tier') }}</span>
        <span>+%</span>
        <span>← {{ $t('price.ingredients') }}</span>
      </div>
      <div v-for="[key, eff] in sortedEffects" :key="key" class="pt-row">
        <span>{{ $t(`effectNames.${key}`, eff.displayName) }}</span>
        <span><span class="tier-badge" :style="{ background: tierColors[eff.tier]+'20', color: tierColors[eff.tier] }">T{{ eff.tier }}</span></span>
        <span :style="{ color: eff.addBase > 0 ? 'var(--green)' : 'var(--text3)' }">{{ eff.addBase > 0 ? '+' + (eff.addBase*100).toFixed(0) + '%' : '—' }}</span>
        <span class="ing-name">{{ ingredientFor(key) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { effects, ingredients, tierColors } = useGameData()
const { t, locale } = useI18n()

const sortedEffects = computed(() =>
  Object.entries(effects).sort((a, b) => b[1].addBase - a[1].addBase)
)

function ingredientFor(key: string): string {
  const ing = ingredients.find(i => i.effect === key)
  return ing ? `${t(`ingredientNames.${ing.name}`, ing.name)} ($${ing.price})` : ''
}

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Гайд по миксам — Schedule I' : 'Mixing Guide — Schedule I',
  description: () => locale.value === 'ru'
    ? 'Как работает миксование в Schedule I — механика реакций, формула рыночной цены, таблица бонусов всех эффектов.'
    : 'How mixing works in Schedule I — reaction mechanics, market price formula, full effect price bonus table.',
})
</script>

<style scoped>
.page-title { font-family: var(--font-display); font-size: 1.6rem; color: var(--green); margin-bottom: 20px; }
.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 24px; }
.step-card {
  display: flex; gap: 14px; padding: 16px; background: var(--bg2);
  border: 1px solid var(--border); border-radius: 6px;
}
.step-num {
  width: 32px; height: 32px; border-radius: 50%; background: var(--green-dim);
  color: var(--green); display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: .9rem; flex-shrink: 0;
}
.step-card h3 { font-size: .85rem; margin-bottom: 4px; color: var(--text); }
.step-card p { font-size: .7rem; color: var(--text2); line-height: 1.5; }

.formula-card {
  padding: 20px; background: var(--bg2); border: 1px solid var(--green-dim);
  border-radius: 6px; margin-bottom: 16px;
}
.formula-card h3 { font-size: .85rem; color: var(--green); margin-bottom: 8px; }
.formula-card code {
  display: block; padding: 10px 14px; background: var(--bg); border-radius: 4px;
  font-size: .8rem; color: var(--text); margin-bottom: 12px;
}
.example { font-size: .72rem; color: var(--text2); }
.result { color: var(--green); margin-top: 4px; }
.result strong { font-size: .9rem; }

.tips-card { padding: 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; }
.tips-card h3 { font-size: .85rem; margin-bottom: 8px; color: var(--amber); }
.tips-card ul { padding-left: 18px; }
.tips-card li { font-size: .72rem; color: var(--text2); line-height: 1.6; }

.section-title { font-size: 1rem; color: var(--text); margin-bottom: 12px; }
.price-table { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
.pt-row { display: grid; grid-template-columns: 1fr 60px 60px 1fr; padding: 8px 14px; font-size: .72rem; align-items: center; }
.pt-row:not(:last-child) { border-bottom: 1px solid var(--border); }
.pt-header { font-weight: 600; color: var(--text3); font-size: .6rem; letter-spacing: 1px; text-transform: uppercase; }
.ing-name { color: var(--text3); font-size: .65rem; }
</style>
