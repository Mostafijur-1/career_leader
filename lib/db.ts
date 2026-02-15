import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'career_leader'

let client: MongoClient | null = null

export async function connect() {
  if (!uri) throw new Error('MONGODB_URI env var is required')
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db(dbName)
}

export async function getCollection(name: string) {
  const db = await connect()
  return db.collection(name)
}


