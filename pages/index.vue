<template>
  <div class="mixer-layout">
    <!-- LEFT: Products & Ingredients -->
    <aside class="panel panel-left">
      <section class="panel-section">
        <div class="panel-title">{{ $t('mixer.selectProduct') }}</div>
        <div class="product-grid">
          <div v-for="p in products" :key="p.id" class="product-card" :class="{ selected: sim.selectedProduct.value?.id === p.id }" @click="sim.selectedProduct.value = p">
            <img :src="`/textures/${p.icon}`" :alt="p.name" />
            <div class="pname">{{ $t(`productNames.${p.name}`, p.name) }}</div>
            <div class="pprice">${{ p.basePrice }}</div>
          </div>
        </div>
      </section>
      <section class="panel-section">
        <div class="panel-title">{{ $t('mixer.addIngredients') }}</div>
        <div class="ingredient-list">
          <div v-for="ing in ingredients" :key="ing.id" class="ingredient-item" @click="sim.addIngredient(ing)">
            <img :src="`/textures/${ing.icon}`" :alt="ing.name" />
            <div class="info">
              <div class="iname">{{ $t(`ingredientNames.${ing.name}`, ing.name) }}</div>
              <div class="ieffect">{{ $t(`effectNames.${ing.effect}`, ing.effect) }}</div>
            </div>
            <div class="iprice">${{ ing.price }}</div>
          </div>
        </div>
      </section>
    </aside>

    <!-- CENTER: Map & Sequence -->
    <main class="panel panel-center">
      <div class="map-header">
        <span class="maplabel">{{ $t('mixer.mixMap') }}</span>
        <button class="btn btn-danger" @click="sim.resetAll()">{{ $t('mixer.reset') }}</button>
      </div>
      <div class="map-area">
        <MixMap :current-effects="sim.currentEffects.value" :primary-effects="primaryEffects" />
      </div>
      <div class="legend">
        <span v-for="t in 5" :key="t" class="legend-item">
          <span class="ldot" :style="{ background: tierColors[t] }" /> T{{ t }}
        </span>
        <span class="legend-item"><span class="ldot" style="background:var(--green);box-shadow:0 0 6px var(--green)" /> {{ $t('mixer.primary') }}</span>
        <span class="legend-item"><span class="ldot" style="background:var(--cyan);box-shadow:0 0 6px var(--cyan)" /> {{ $t('mixer.reaction') }}</span>
      </div>
      <div class="sequence-bar">
        <span class="seq-label">{{ $t('mixer.sequence') }} ▸</span>
        <template v-for="(ing, i) in sim.addedIngredients.value" :key="i">
          <span v-if="i > 0" class="seq-arrow">→</span>
          <div class="seq-step">
            <img :src="`/textures/${ing.icon}`" :alt="ing.name" />
            <span class="sname">{{ $t(`ingredientNames.${ing.name}`, ing.name) }}</span>
            <button class="remove-step" @click="sim.removeIngredient(i)">×</button>
          </div>
        </template>
      </div>
    </main>

    <!-- RIGHT: Results -->
    <aside class="panel panel-right">
      <!-- Pricing -->
      <section class="panel-section">
        <div class="panel-title">{{ $t('price.title') }}</div>
        <div class="price-rows">
          <div class="price-row"><span>{{ $t('price.baseProduct') }}</span><span>${{ sim.selectedProduct.value?.basePrice || 0 }}</span></div>
          <div class="price-row"><span>{{ $t('price.ingredients') }}</span><span>${{ sim.ingredientsCost.value }}</span></div>
          <div class="price-row sub"><span>{{ $t('price.production') }}</span><span>${{ sim.productionCost.value }}</span></div>
          <div class="price-row market"><span>{{ $t('price.market') }}</span><span class="green">${{ sim.marketPrice.value }}</span></div>
          <div class="price-row" :class="{ positive: sim.profit.value > 0 }">
            <span>{{ $t('price.profit') }}</span>
            <span :style="{ color: sim.profit.value > 0 ? 'var(--green)' : 'var(--red)' }">
              ${{ sim.profit.value }} ({{ sim.profitMargin.value }}%)
            </span>
          </div>
        </div>
      </section>

      <!-- Effects -->
      <section class="panel-section">
        <div class="panel-title">{{ $t('effects.title') }} <span class="ecount" v-if="sim.currentEffects.value.length">({{ sim.currentEffects.value.length }}/8)</span></div>
        <div v-if="!sim.currentEffects.value.length" class="no-effects">{{ $t('effects.none') }}</div>
        <div v-else class="effects-list">
          <div v-for="eff in sim.currentEffects.value" :key="eff" class="effect-tag fade-in">
            <span class="tier-badge" :style="{ background: tierColors[effects[eff]?.tier]+'20', color: tierColors[effects[eff]?.tier] }">
              T{{ effects[eff]?.tier }}
            </span>
            <div class="einfo">
              <div class="ename">
                {{ $t(`effectNames.${eff}`, eff) }}
                <span class="badge" :class="primaryEffects.includes(eff) ? 'badge-green' : 'badge-cyan'">
                  {{ primaryEffects.includes(eff) ? $t('mixer.primary') : $t('mixer.reaction') }}
                </span>
                <span v-if="effects[eff]?.addBase" class="addbase">+{{ (effects[eff].addBase * 100).toFixed(0) }}%</span>
              </div>
              <div class="edesc">{{ $t(`effectDescriptions.${eff}`, effects[eff]?.description) }}</div>
            </div>
          </div>
        </div>
        <!-- Mix Log -->
        <div v-if="sim.mixLog.value.length" class="mix-log">
          <div class="panel-title" style="margin-top:12px">{{ $t('effects.mixLog') }}</div>
          <div v-for="(step, i) in sim.mixLog.value" :key="i" class="log-entry">
            <span class="log-ing">+{{ $t(`ingredientNames.${step.ingredientName}`, step.ingredientName) }}</span>
            <template v-for="r in step.reactions" :key="r.from+r.to">
              <span class="log-reaction">{{ $t(`effectNames.${r.from}`, r.from) }} → {{ $t(`effectNames.${r.to}`, r.to) }}</span>
            </template>
          </div>
        </div>
      </section>

      <!-- Matching customers -->
      <section class="panel-section" v-if="sim.currentEffects.value.length">
        <div class="panel-title">{{ $t('customers.matchingCustomers') }}</div>
        <div class="matching-customers">
          <div v-for="mc in matchingCustomers" :key="mc.customer.id" class="match-card">
            <div class="mc-name">{{ mc.customer.name }}</div>
            <div class="mc-loc">{{ $t(`locations.${mc.customer.location}`) }}</div>
            <div class="mc-match">{{ mc.count }}/{{ mc.customer.preferredEffects.length }}</div>
          </div>
          <div v-if="!matchingCustomers.length" class="no-effects">{{ $t('effects.none') }}</div>
        </div>
      </section>

      <!-- Recipes -->
      <section class="panel-section">
        <div class="panel-title">{{ $t('recipes.title') }}</div>
        <div class="recipe-actions">
          <button class="btn btn-primary" @click="doSaveRecipe">{{ $t('recipes.save') }}</button>
          <button class="btn" @click="sim.savedRecipes.value = []">{{ $t('recipes.clearAll') }}</button>
        </div>
        <div class="saved-recipes">
          <div v-for="(r, i) in sim.savedRecipes.value" :key="i" class="recipe-row" @click="sim.loadRecipe(i)">
            <div>
              <div class="rname">{{ r.name }}</div>
              <div class="rdetail">${{ r.marketPrice }} · {{ r.effects?.length || 0 }} fx</div>
            </div>
            <button class="rdel" @click.stop="sim.deleteRecipe(i)">×</button>
          </div>
          <div v-if="!sim.savedRecipes.value.length" class="no-effects">{{ $t('recipes.empty') }}</div>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
const { products, ingredients, effects, customers, tierColors, getEffectDisplayName, resolveEffectKey } = useGameData()
const sim = useMixSimulator()
const { locale, t } = useI18n()

const primaryEffects = computed(() => {
  const ingEffects = sim.addedIngredients.value.map(i => i.effect)
  const defaultEffects = sim.selectedProduct.value?.defaultEffects || []
  return sim.currentEffects.value.filter(e => ingEffects.includes(e) || defaultEffects.includes(e))
})

const matchingCustomers = computed(() => {
  const current = sim.currentEffects.value.map(e => getEffectDisplayName(e))
  return customers
    .filter(c => c.preferredEffects.length > 0)
    .map(c => {
      const count = c.preferredEffects.filter(pe => {
        const key = resolveEffectKey(pe)
        return sim.currentEffects.value.includes(key)
      }).length
      return { customer: c, count }
    })
    .filter(m => m.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

function doSaveRecipe() {
  if (!sim.addedIngredients.value.length) return
  const name = prompt(t('recipes.namePrompt'), (sim.selectedProduct.value?.name || 'Mix') + ' #' + (sim.savedRecipes.value.length + 1))
  if (name) sim.saveRecipe(name)
}

useSeoMeta({
  title: () => t('title'),
  description: () => locale.value === 'ru'
    ? 'Симулятор миксов Schedule I — выбирайте продукт, добавляйте ингредиенты и находите лучшие комбинации эффектов для максимальной прибыли.'
    : 'Schedule I Mix Simulator — pick a product, add ingredients and find the best effect combos for maximum profit.',
})
</script>

<style scoped>
.mixer-layout { display: grid; grid-template-columns: 260px 1fr 300px; min-height: calc(100vh - 53px); }
.panel { overflow-y: auto; max-height: calc(100vh - 53px); }
.panel-left { border-right: 1px solid var(--border); background: var(--bg2); }
.panel-center { background: var(--bg); display: flex; flex-direction: column; }
.panel-right { border-left: 1px solid var(--border); background: var(--bg2); }
.panel-section { padding: 14px; border-bottom: 1px solid var(--border); }

/* Products */
.product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.product-card {
  background: var(--bg); border: 1px solid var(--border); border-radius: 5px;
  padding: 8px; text-align: center; cursor: pointer; transition: all .15s;
}
.product-card:hover { border-color: var(--border2); }
.product-card.selected { border-color: var(--green); box-shadow: 0 0 10px var(--green-glow); }
.product-card img { width: 40px; height: 40px; object-fit: contain; }
.pname { font-size: .7rem; margin-top: 4px; }
.pprice { font-size: .65rem; color: var(--green); }

/* Ingredients */
.ingredient-list { display: flex; flex-direction: column; gap: 3px; }
.ingredient-item {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  background: var(--bg); border: 1px solid var(--border); border-radius: 4px;
  cursor: pointer; transition: all .15s;
}
.ingredient-item:hover { border-color: var(--border2); background: var(--bg3); }
.ingredient-item img { width: 28px; height: 28px; object-fit: contain; }
.info { flex: 1; min-width: 0; }
.iname { font-size: .72rem; }
.ieffect { font-size: .58rem; color: var(--text3); }
.iprice { font-size: .68rem; color: var(--green); white-space: nowrap; }

/* Map */
.map-header { padding: 10px 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.maplabel { font-size: .65rem; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; }
.map-area { flex: 1; display: flex; align-items: center; justify-content: center; padding: 12px; }
.legend { padding: 8px 16px; border-top: 1px solid var(--border); display: flex; gap: 12px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 4px; font-size: .6rem; color: var(--text3); }
.ldot { width: 7px; height: 7px; border-radius: 50%; }

/* Sequence */
.sequence-bar {
  border-top: 1px solid var(--border); padding: 10px 16px; display: flex;
  align-items: center; gap: 6px; overflow-x: auto; min-height: 54px; background: var(--bg2);
}
.seq-label { font-size: .58rem; color: var(--text3); letter-spacing: 2px; white-space: nowrap; }
.seq-arrow { color: var(--text3); font-size: .7rem; }
.seq-step {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: var(--bg); border: 1px solid var(--border); border-radius: 4px;
  padding: 5px 8px; position: relative; min-width: 50px; flex-shrink: 0;
}
.seq-step img { width: 22px; height: 22px; object-fit: contain; }
.sname { font-size: .48rem; color: var(--text2); text-align: center; max-width: 56px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.remove-step {
  position: absolute; top: -3px; right: -3px; width: 13px; height: 13px; border-radius: 50%;
  background: var(--red); color: #fff; font-size: 8px; border: none; cursor: pointer;
  display: none; align-items: center; justify-content: center; line-height: 1;
}
.seq-step:hover .remove-step { display: flex; }

/* Pricing */
.price-rows { display: flex; flex-direction: column; gap: 5px; }
.price-row { display: flex; justify-content: space-between; font-size: .72rem; color: var(--text2); }
.price-row.sub { border-top: 1px solid var(--border); padding-top: 6px; color: var(--text); }
.price-row.market { font-size: .85rem; font-weight: 700; color: var(--text); }
.green { color: var(--green); }

/* Effects */
.ecount { color: var(--green); font-size: .6rem; margin-left: 6px; }
.no-effects { color: var(--text3); font-size: .72rem; text-align: center; padding: 16px; font-style: italic; }
.effects-list { display: flex; flex-direction: column; gap: 5px; }
.effect-tag { display: flex; align-items: flex-start; gap: 8px; padding: 7px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; }
.einfo { flex: 1; }
.ename { font-size: .72rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.addbase { font-size: .55rem; color: var(--green); }
.edesc { font-size: .58rem; color: var(--text3); margin-top: 1px; }

/* Mix log */
.mix-log { margin-top: 8px; }
.log-entry { font-size: .62rem; padding: 3px 6px; background: var(--bg); border-radius: 3px; margin-bottom: 3px; display: flex; gap: 8px; flex-wrap: wrap; }
.log-ing { color: var(--green); }
.log-reaction { color: var(--amber); }

/* Matching customers */
.matching-customers { display: flex; flex-direction: column; gap: 4px; }
.match-card {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  background: var(--bg); border: 1px solid var(--border); border-radius: 4px; font-size: .7rem;
}
.mc-name { flex: 1; color: var(--text); }
.mc-loc { font-size: .58rem; color: var(--text3); }
.mc-match { color: var(--green); font-weight: 600; }

/* Recipes */
.recipe-actions { display: flex; gap: 6px; margin-bottom: 10px; }
.recipe-actions .btn { flex: 1; font-size: .65rem; }
.saved-recipes { display: flex; flex-direction: column; gap: 4px; }
.recipe-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 7px 8px; background: var(--bg); border: 1px solid var(--border);
  border-radius: 4px; cursor: pointer; transition: all .15s;
}
.recipe-row:hover { border-color: var(--green-glow); }
.rname { font-size: .7rem; }
.rdetail { font-size: .58rem; color: var(--text3); }
.rdel { background: none; border: none; color: var(--text3); cursor: pointer; font-size: .75rem; padding: 2px 6px; }
.rdel:hover { color: var(--red); }

@media (max-width: 1000px) {
  .mixer-layout { grid-template-columns: 1fr; }
  .panel { max-height: none; }
  .panel-left, .panel-right { border: none; }
  .product-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
