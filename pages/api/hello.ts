import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.json({ name: 'Hello, covid' })
}
