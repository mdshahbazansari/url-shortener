import { Button, Card, Form, Input, message } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ENV = import.meta.env
axios.defaults.baseURL = ENV.VITE_SERVER

const Login = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false) // ✅ Add loading state

  const login = async (values) => {
    try {
      setLoading(true) // ✅ Disable button while logging in
      const response = await axios.post(
        'https://url-shortener-9mko.onrender.com/api/user/login',
        values,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        message.success('Login Successful')
        setIsAuthenticated(true) // ✅ Set login success state
      } else {
        toast.error('Login failed. Please try again.')
      }
    } catch (err) {
      toast.error(
        err.response ? err.response.data.message : 'Something went wrong!'
      )
    } finally {
      setLoading(false) // ✅ Enable button after response
    }
  }

  // ✅ Use useEffect to navigate after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-200'>
      <Card hoverable className='w-3/12'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Login</h1>
        <Form layout='vertical' onFinish={login}>
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
              loading={loading} // ✅ Disable button while logging in
            >
              {loading ? 'Logging in...' : 'Login'}
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
