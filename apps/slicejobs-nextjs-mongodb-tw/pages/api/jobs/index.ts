import clientPromise from '../../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async function handler(req: NextApiRequest, res:NextApiResponse){

     const client =  await clientPromise
  await runMiddleware(req, res, cors)


     const db = client.db()  
     // const data = await db.collection('debar_opening_jobs')

     //console.log(data)

  const jobs = await db
     .collection('debar_opening_jobs').find({}).toArray();

   res.json(jobs)
   
}

//
// export default async (req, res) => {
//
//
//     const client =  await clientPromise
//
//     const db = client.db()  
//     // const data = await db.collection('debar_opening_jobs')
//
//     //console.log(data)
//
//   const jobs = await db
//     .collection('debar_opening_jobs').find({}).toArray();
//
//   res.json(jobs)
//
// }
