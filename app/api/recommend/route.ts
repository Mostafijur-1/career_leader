import { NextResponse } from 'next/server'
import { recommendByPersonality } from '../../../lib/recommendation'

export async function POST(req: Request) {
  const { personality } = await req.json().catch(() => ({}))
  const recs = recommendByPersonality(personality || '')
  return NextResponse.json({ recommendations: recs })
}
