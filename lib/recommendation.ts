import careers from '../data/careers.json'

type Career = {
  id: string
  title: string
  category: string
  description?: string
  skills: string[]
  personalities?: string[]
}

export function recommendByPersonality(personality: string): Career[] {
  return recommend(personality, [], 5)
}

// Recommend careers by scoring personality match and interest-skill overlap
export function recommend(personality: string, interests: string[] = [], limit = 5): Career[] {
  const p = (personality || '').toUpperCase()

  function scoreCareer(c: Career) {
    let score = 0
    if (c.personalities && p) {
      if (c.personalities.map(x => x.toUpperCase()).includes(p)) score += 5
    }

    // interest matches against skills (fuzzy: lowercase substring match)
    for (const it of interests || []) {
      const lit = String(it).toLowerCase()
      for (const s of c.skills || []) {
        const ls = String(s).toLowerCase()
        if (ls === lit) score += 3
        else if (ls.includes(lit) || lit.includes(ls)) score += 1
      }
    }

    return score
  }

  const scored = (careers as Career[]).map(c => ({ c, score: scoreCareer(c) }))
  scored.sort((a, b) => b.score - a.score)

  const best = scored.filter(s => s.score > 0).map(s => s.c)
  if (best.length >= limit) return best.slice(0, limit)

  // fallback: return top-scoring results or initial careers if none scored
  const top = scored.map(s => s.c)
  
  // Combine and deduplicate by ID
  const seen = new Set<string>()
  const combined: Career[] = []
  
  for (const career of [...best, ...top]) {
    if (!seen.has(career.id)) {
      seen.add(career.id)
      combined.push(career)
      if (combined.length >= limit) break
    }
  }
  
  return combined.length > 0 ? combined : top.slice(0, limit)
}

