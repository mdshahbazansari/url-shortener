import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <nav className='bg-white p-4 shadow-lg'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-gray text-2xl font-bold'>URL-Shortner</h1>
          <div>
            <Link to='/login' className='text-black px-4 py-2 hover:underline'>
              Login
            </Link>
            <Link
              to='/signup'
              className='ml-4 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition'
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>
      <div className='flex items-center justify-center w-full '>
        <div className='w-5/12 mx-4'>
          <section className='relative h-[75vh] flex items-center justify-center text-center text-white'>
            <div className='absolute inset-0 bg-opacity-50'></div>

            <div className='relative text-gray-500 z-10 max-w-2xl p-6'>
              <h1 className='text-4xl font-bold mb-4'>
                Shorten, Share & Track Your Links
              </h1>
              <p className='text-lg mb-6'>
                Make your links shorter, cleaner, and more manageable. Sign up
                now to track your URLs and analytics.
              </p>
              <a
                href='/signup'
                className='px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition'
              >
                Get Started
              </a>
            </div>
          </section>
        </div>
        <div>
          <section className='container mx-auto  p-6'>
            <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
              Why Choose Us?
            </h2>
            <div className=' grid items-center grid-cols-1 md:grid-cols-1 gap-6 text-center '>
              <div className='bg-white p-6 shadow-md rounded-lg '>
                <h3 className='text-xl font-semibold text-blue-600 mb-2'>
                  Fast & Reliable
                </h3>
                <p className='text-gray-600'>
                  Our shortening service is lightning fast and always available.
                </p>
              </div>
              <div className='bg-white p-6 shadow-md rounded-lg'>
                <h3 className='text-xl font-semibold text-blue-600 mb-2'>
                  Analytics
                </h3>
                <p className='text-gray-600'>
                  Track clicks and user engagement on your shortened URLs.
                </p>
              </div>
              <div className='bg-white p-6 shadow-md rounded-lg'>
                <h3 className='text-xl font-semibold text-blue-600 mb-2'>
                  Secure & Private
                </h3>
                <p className='text-gray-600'>
                  We ensure your links are secure and protect your privacy.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-800 text-white text-center p-4 mt-auto'>
        <p>© {new Date().getFullYear()} Shorty. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Dashboard
