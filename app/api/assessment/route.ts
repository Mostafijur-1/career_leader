import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { scoreAssessment } from '../../../lib/assessment'
import { recommend } from '../../../lib/recommendation'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'assessment_questions.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const questions = JSON.parse(fileContent)
    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error loading assessment questions:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}))
  const answers = Array.isArray(payload?.answers) ? payload.answers : []

  try {
    const result = scoreAssessment(answers)
    const recs = recommend(result.personality, result.interests || [], 5)
    return NextResponse.json({ success: true, result, recommendations: recs })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
