import type { Product, Ingredient, EffectData } from './useGameData'

const EFFECT_RADIUS = 0.4
const MAX_PROPERTIES = 8

export interface MixLogEntry {
  ingredientName: string
  effectName: string
  reactions: { from: string; to: string }[]
  effectsAfter: string[]
}

function getEffectAtPoint(x: number, y: number, effectsMap: Record<string, EffectData>): string | null {
  let best: string | null = null
  let bestDist = Infinity
  for (const [key, e] of Object.entries(effectsMap)) {
    const dist = Math.sqrt((x - e.mapX) ** 2 + (y - e.mapY) ** 2)
    if (dist <= EFFECT_RADIUS && dist < bestDist) {
      best = key
      bestDist = dist
    }
  }
  return best
}

function mixStep(currentProps: string[], newEffect: string, effectsMap: Record<string, EffectData>): string[] {
  const newPos = effectsMap[newEffect]
  if (!newPos) {
    const result = [...currentProps]
    if (!result.includes(newEffect) && result.length < MAX_PROPERTIES) result.push(newEffect)
    return result
  }

  const mixVector = { x: newPos.mapX, y: newPos.mapY }

  const reactions: { index: number; output: string }[] = []
  for (let i = 0; i < currentProps.length; i++) {
    const ep = effectsMap[currentProps[i]]
    if (!ep) continue
    const cx = ep.mapX + mixVector.x
    const cy = ep.mapY + mixVector.y
    const hit = getEffectAtPoint(cx, cy, effectsMap)
    if (hit) reactions.push({ index: i, output: hit })
  }

  const result = [...currentProps]
  for (const r of reactions) {
    if (!result.includes(r.output)) {
      result[r.index] = r.output
    }
  }

  if (!result.includes(newEffect) && result.length < MAX_PROPERTIES) {
    result.push(newEffect)
  }

  return result
}

export function useMixSimulator() {
  const { products, ingredients, effects } = useGameData()

  const selectedProduct = ref<Product | null>(null)
  const addedIngredients = ref<Ingredient[]>([])
  const savedRecipes = ref<any[]>(
    typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('si_recipes') || '[]') : []
  )

  const currentEffects = computed(() => {
    let props: string[] = []
    // Start with product default effects
    if (selectedProduct.value) {
      props = [...selectedProduct.value.defaultEffects]
    }
    for (const ing of addedIngredients.value) {
      props = mixStep(props, ing.effect, effects)
    }
    return props
  })

  const mixLog = computed(() => {
    const log: MixLogEntry[] = []
    let props: string[] = selectedProduct.value ? [...selectedProduct.value.defaultEffects] : []
    for (const ing of addedIngredients.value) {
      const before = [...props]
      props = mixStep(props, ing.effect, effects)
      const reactions: { from: string; to: string }[] = []
      for (let i = 0; i < before.length; i++) {
        if (i < props.length && before[i] !== props[i]) {
          reactions.push({ from: before[i], to: props[i] })
        }
      }
      log.push({ ingredientName: ing.name, effectName: ing.effect, reactions, effectsAfter: [...props] })
    }
    return log
  })

  // Price calculation: MarketPrice = BasePrice × (1 + SUM(AddBaseValueMultiple))
  const ingredientsCost = computed(() => addedIngredients.value.reduce((s, i) => s + i.price, 0))
  const productionCost = computed(() => (selectedProduct.value?.basePrice || 0) + ingredientsCost.value)

  const marketPrice = computed(() => {
    if (!selectedProduct.value) return 0
    const base = selectedProduct.value.basePrice
    const multiplier = currentEffects.value.reduce((sum, eff) => {
      return sum + (effects[eff]?.addBase || 0)
    }, 0)
    return Math.round(base * (1 + multiplier))
  })

  const profit = computed(() => marketPrice.value - productionCost.value)
  const profitMargin = computed(() => {
    if (productionCost.value === 0) return 0
    return Math.round((profit.value / productionCost.value) * 100)
  })

  function addIngredient(ing: Ingredient) {
    if (addedIngredients.value.length >= 8) return
    addedIngredients.value.push({ ...ing })
  }

  function removeIngredient(index: number) {
    addedIngredients.value.splice(index, 1)
  }

  function resetAll() {
    selectedProduct.value = null
    addedIngredients.value = []
  }

  function saveRecipe(name: string) {
    savedRecipes.value.push({
      name,
      productId: selectedProduct.value?.id,
      ingredientIds: addedIngredients.value.map(i => i.id),
      effects: [...currentEffects.value],
      marketPrice: marketPrice.value,
      date: Date.now(),
    })
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('si_recipes', JSON.stringify(savedRecipes.value))
    }
  }

  function loadRecipe(idx: number) {
    const r = savedRecipes.value[idx]
    if (!r) return
    selectedProduct.value = products.find(p => p.id === r.productId) || null
    addedIngredients.value = r.ingredientIds
      .map((id: string) => ingredients.find(i => i.id === id))
      .filter(Boolean) as Ingredient[]
  }

  function deleteRecipe(idx: number) {
    savedRecipes.value.splice(idx, 1)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('si_recipes', JSON.stringify(savedRecipes.value))
    }
  }

  return {
    selectedProduct, addedIngredients, currentEffects, mixLog,
    ingredientsCost, productionCost, marketPrice, profit, profitMargin,
    savedRecipes,
    addIngredient, removeIngredient, resetAll,
    saveRecipe, loadRecipe, deleteRecipe,
  }
}
