import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps(context) {
  try {
    const client =  await clientPromise

    const db = client.db()  
    const data = await db.collection('debar_opening_jobs')

    //console.log(data)


  async function getLast(limit = 0, skip = 0) {
    const result = await data
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    return result;
    // console.log(result);
  }

    // console.log(getLast())

    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true,
      miri: JSON.parse(JSON.stringify(await getLast())),
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,miri
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
 // console.log(miri)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=' px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 '>
        <div className= ' w-full mx-auto'>
        <h1 >
          Welcome to Jobs at Slice
         </h1>
         </div>

        {isConnected ? (
          <h2 >
          You are connected to MongoDB <br/>
        {miri.length} jobs 
          </h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the administrator for instructions.
          </h2>
        )}
  <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="grid gap-8 lg:grid-cols-2 sm:max-w-sm sm:mx-auto lg:max-w-full">

            {miri.map(({jobTitle, jobLink, companyName, location, requirements}) => (
        <div className="p-8 bg-white border rounded shadow-sm">
          <a
            href={jobLink}
                  target='_blank'
            aria-label="Job position"
            title={jobTitle}
            className="inline-block  mb-4 text-2xl font-semibold leading-5 text-black transition-colors duration-200 hover:text-red-400"
          >
            {jobTitle}
          </a>
                <div className=' font-semibold uppercase mb-3 text-xs  items-start flex'>
          <p className="  flex space-y-0.5 flex-col tracking-wide ">
            <a
              href="https://slicelife.com/"
                      target='_blank'
                aria-label="Company Name"
                title="Slice"
              className="transition-colors duration-200 text-red-400 hover:text-red-800"
              aria-label="company Name"
            >
              {companyName}
            </a>
            <span className="text-gray-600">{location}</span>
          </p>
              <p className='ml-auto'>
                  <a
                href={jobLink}
                      target='_blank'
                aria-label="Apply for the job"
                title="Apply"
                className="  capitalize text-gray-600 transition-colors duration-200 hover:text-red-400"
              >
                Read more
              </a></p>
          </div>
          <ul className='flex pl-5 list-disc text-gray-700 flex-col text-sm line-clamp-6 hover:line-clamp-12'>
{requirements.map((e) => <li  >
                    {e}</li>)}
</ul>
          <div className="flex items-center">
            <div >
            </div>
          </div>
        </div>


            ))}


      </div>
    </div>



      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}
