<template>
  <div class="container" style="padding-top:24px;padding-bottom:40px">
    <h1 class="page-title">{{ $t('customers.title') }}</h1>
    <p class="page-sub">{{ $t('customers.subtitle') }}</p>

    <div class="filters">
      <input v-model="search" class="search-input" :placeholder="$t('customers.search')" />
      <div class="filter-group">
        <span class="filter-label">{{ $t('customers.location') }}:</span>
        <button v-for="loc in ['All', ...locations]" :key="loc" class="btn"
          :class="{ 'btn-primary': filterLocation === loc }" @click="filterLocation = loc"
          style="font-size:.6rem;padding:4px 10px">
          {{ loc === 'All' ? $t('customers.all') : $t(`locations.${loc}`) }}
        </button>
      </div>
      <div class="filter-group">
        <span class="filter-label">{{ $t('customers.standards') }}:</span>
        <button v-for="s in ['All', 'Very Low', 'Low', 'Moderate', 'High']" :key="s" class="btn"
          :class="{ 'btn-primary': filterStandard === s }" @click="filterStandard = s"
          style="font-size:.6rem;padding:4px 10px">
          {{ s === 'All' ? $t('customers.all') : $t(`standardsLevels.${s}`) }}
        </button>
      </div>
    </div>

    <div class="customer-grid">
      <div v-for="c in filteredCustomers" :key="c.id" class="customer-card">
        <div class="cc-header">
          <span class="cc-name">{{ c.name }}</span>
          <span class="cc-loc">{{ $t(`locations.${c.location}`) }}</span>
        </div>
        <div class="cc-standards">
          <span class="badge" :class="standardsClass(c.standards)">{{ $t(`standardsLevels.${c.standards}`) }}</span>
        </div>
        <div class="cc-effects">
          <template v-if="c.preferredEffects.length">
            <span v-for="pe in c.preferredEffects" :key="pe" class="effect-pill"
              :style="{ borderColor: tierColors[effects[resolveEffectKey(pe)]?.tier] + '50' }">
              {{ $t(`effectNames.${resolveEffectKey(pe)}`, pe) }}
            </span>
          </template>
          <span v-else class="no-pref">{{ $t('customers.noPrefs') }}</span>
        </div>
      </div>
    </div>
    <div class="count-info">{{ filteredCustomers.length }} / {{ customers.length }}</div>
  </div>
</template>

<script setup lang="ts">
const { customers, effects, tierColors, resolveEffectKey } = useGameData()
const locations = ['Northtown', 'Suburbia', 'Downtown', 'Docks', 'Uptown', 'Westville']

const search = ref('')
const filterLocation = ref('All')
const filterStandard = ref('All')

const filteredCustomers = computed(() => {
  return customers.filter(c => {
    if (search.value && !c.name.toLowerCase().includes(search.value.toLowerCase())) return false
    if (filterLocation.value !== 'All' && c.location !== filterLocation.value) return false
    if (filterStandard.value !== 'All' && c.standards !== filterStandard.value) return false
    return true
  })
})

function standardsClass(s: string) {
  if (s === 'High') return 'badge-green'
  if (s === 'Moderate') return 'badge-amber'
  return 'badge-cyan'
}

const { locale } = useI18n()
useSeoMeta({
  title: () => locale.value === 'ru' ? 'Клиенты — Schedule I' : 'Customers — Schedule I',
  description: () => locale.value === 'ru'
    ? 'База из 62 клиентов Schedule I — районы, стандарты и предпочтения эффектов каждого покупателя.'
    : 'Database of 62 Schedule I customers — locations, standards and preferred effects for each buyer.',
})
</script>

<style scoped>
.page-title { font-family: var(--font-display); font-size: 1.6rem; color: var(--green); margin-bottom: 4px; }
.page-sub { color: var(--text3); font-size: .75rem; margin-bottom: 16px; }
.filters { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.search-input {
  padding: 8px 14px; background: var(--bg2); border: 1px solid var(--border); border-radius: 4px;
  color: var(--text); font-family: var(--font-mono); font-size: .75rem; max-width: 300px;
}
.search-input:focus { outline: none; border-color: var(--green); }
.filter-group { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.filter-label { font-size: .65rem; color: var(--text3); letter-spacing: 1px; min-width: 80px; }

.customer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px; }
.customer-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 6px; padding: 12px; }
.cc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.cc-name { font-size: .82rem; font-weight: 600; }
.cc-loc { font-size: .6rem; color: var(--text3); }
.cc-standards { margin-bottom: 8px; }
.cc-effects { display: flex; flex-wrap: wrap; gap: 4px; }
.effect-pill {
  font-size: .6rem; padding: 2px 8px; border: 1px solid var(--border2);
  border-radius: 3px; color: var(--text2);
}
.no-pref { font-size: .65rem; color: var(--text3); font-style: italic; }
.count-info { text-align: center; color: var(--text3); font-size: .7rem; margin-top: 16px; }
</style>
