import { Button, Card, Form, Input, message } from 'antd'
import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const ENV = import.meta.env

const Login = () => {
  const navigate = useNavigate() // Use useNavigate instead of window.location

  const login = async (values) => {
    try {
      const { data } = await axios.post(
        `${ENV.VITE_SERVER}/api/user/login`,
        values,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      navigate('/home')
      message.success('Login Successful')
    } catch (err) {
      message.error(
        err.response?.data?.message || 'Login failed || check email & password'
      )
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-200'>
      <Card hoverable className='w-3/12'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Login</h1>
        <Form layout='vertical' onFinish={login}>
          {' '}
          {/* Changed from onClick to onFinish */}
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password size='large' />
          </Form.Item>
          <Form.Item>
            <Button
              className='!w-full font-semibold !bg-teal-600 !text-white !font-medium'
              size='large'
              htmlType='submit'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className='text-[16px] font-medium'>
          <label>Don't have an account?</label>
          <Link to='/signup' className='font-semibold pl-2 text-blue-700'>
            Create account
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login
