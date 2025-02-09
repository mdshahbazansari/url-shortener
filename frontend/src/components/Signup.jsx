import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from 'antd'
const ENV = import.meta.env

const Signup = () => {
  const user = {
    fullname: '',
    email: '',
    password: '',
    mobile: '',
  }

  const [signupForm, setSignupForm] = useState(user)
  const navigate = useNavigate()

  const signup = async (e) => {
    try {
      e.preventDefault()
      signupForm.mobile = '+' + signupForm.mobile
      const res = await axios.post(
        `${ENV.VITE_SERVER}/api/user/signup`,
        signupForm
      )

      toast.success('Signup success 👍')

      console.log(res.data)
      if (res) return navigate('/login')
    } catch (err) {
      console.log(err.message)
      toast.error(err.response ? err.response.data.message : err.message)
    }
  }

  const handleSignupForm = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setSignupForm({
      ...signupForm,
      [name]: value,
    })
  }

  return (
    <>
      <div className='flex  items-center justify-center h-screen bg-gray-200'>
        <div className=' bg-white w-3/12 rounded-md shadow-md p-4 gap-4 animate__animated animate__pulse'>
          <h1 className='text-2xl text-center font-medium my-4'>
            Create New Account
          </h1>
          <form className='grid gap-4' onSubmit={signup}>
            <div className='grid grid-col gap-2'>
              <label className='font-medium'>Full Name</label>
              <input
                type='text'
                placeholder='Enter Fullname'
                name='fullname'
                value={signupForm.fullname}
                onChange={handleSignupForm}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'
              />
            </div>

            <div className='grid grid-col gap-2'>
              <label className='font-medium'>Email</label>
              <input
                type='text'
                placeholder='Enter Email'
                name='email'
                value={signupForm.email}
                onChange={handleSignupForm}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'
              />
            </div>

            <div className='grid grid-col gap-2'>
              <label className='font-medium'>Password</label>
              <input
                type='text'
                placeholder='Enter password'
                name='password'
                value={signupForm.password}
                onChange={handleSignupForm}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'
              />
            </div>
            <div className='grid grid-col gap-2'>
              <label className='font-medium'>Mobile No.</label>
              <PhoneInput
                country={'in'}
                value={signupForm.mobile}
                onChange={(value) =>
                  setSignupForm({
                    ...signupForm,
                    mobile: value,
                  })
                }
                enableSearch
                inputStyle={{ width: '100%' }}
              />
            </div>

            <Button className='!w-full !bg-teal-700 !text-md !text-white !font-medium !py-4 !rounded-md !gap-2'>
              Signup
            </Button>
          </form>
          <div className='mt-2 px-2'>
            <label>
              Already have an account{' '}
              <Link to='/login' className='text-blue-600 font-medium px-2'>
                Login
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
