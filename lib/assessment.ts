import questions from '../data/assessment_questions.json'

type Question = {
  id: string
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
  sideA: string
  sideB: string
  interests?: string[]
}

type Answer = {
  questionId: string
  // answer may be 'A'|'B' or numeric 1-5
  answer: string | number
}

export function scoreAssessment(answers: Answer[]) {
  const dims: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 }
  const interestCounts: Record<string, number> = {}

  const qmap: Record<string, Question> = {}
  ;(questions as Question[]).forEach(q => (qmap[q.id] = q))

  for (const a of answers || []) {
    const q = qmap[a.questionId]
    if (!q) continue

    // compute a signed value where positive favors sideA, negative favors sideB
    let val = 0
    if (typeof a.answer === 'number') {
      // Likert 1..5: 3 = neutral, >3 favors sideA, <3 favors sideB
      const n = Math.max(1, Math.min(5, Math.round(a.answer)))
      val = n - 3
    } else if (typeof a.answer === 'string') {
      const s = a.answer.trim().toUpperCase()
      if (s === 'A' || s === q.sideA.toUpperCase()) val = 1
      else if (s === 'B' || s === q.sideB.toUpperCase()) val = -1
      else {
        const parsed = parseInt(s, 10)
        if (!isNaN(parsed)) val = Math.max(-2, Math.min(2, parsed - 3))
      }
    }

    dims[q.dimension] += val

    if (q.interests) {
      for (const it of q.interests) interestCounts[it] = (interestCounts[it] || 0) + Math.abs(val)
    }
  }

  function pick(dim: 'EI' | 'SN' | 'TF' | 'JP') {
    const q = (questions as Question[]).find(x => x.dimension === dim)
    if (!q) return 'X'
    return dims[dim] >= 0 ? q.sideA : q.sideB
  }

  const personality = `${pick('EI')}${pick('SN')}${pick('TF')}${pick('JP')}`

  // compute top interests
  const interests = Object.entries(interestCounts)
    .sort((a, b) => b[1] - a[1])
    .map(e => e[0])

  return { personality, dims, interests }
}

export { questions }
