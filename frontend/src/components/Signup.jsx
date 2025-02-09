import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import { Form, Input, Button, message } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ENV = import.meta.env
axios.defaults.baseURL = ENV.VITE_SERVER

const Signup = () => {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      values.mobile = '+' + values.mobile
      const res = await axios.post('https://url-shortener-9mko.onrender.com/api/user/signup', values)
      message.success('Signup successful!')
      console.log(res.data)
      navigate('/login')
    } catch (err) {
      console.log(err.message)
      message.error(err.response ? err.response.data.message : err.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <div className='bg-white w-3/12 rounded-md shadow-md p-6'>
        <h1 className='text-2xl text-center font-medium my-4'>
          Create New Account
        </h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Full Name'
            name='fullname'
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input placeholder='Enter Fullname' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder='Enter Email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder='Enter Password' />
          </Form.Item>

          <Form.Item
            label='Mobile No.'
            name='mobile'
            rules={[
              { required: true, message: 'Please enter your mobile number' },
            ]}
          >
            <PhoneInput
              country={'in'}
              enableSearch
              inputStyle={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Signup
            </Button>
          </Form.Item>
        </Form>

        <div className='mt-2 text-center'>
          <label>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 font-medium'>
              Login
            </Link>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Signup
