import React, { useContext } from 'react'
import {
  LogoutOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import useSWR, { mutate } from 'swr'
const ENV = import.meta.env
import { Avatar, Layout, Menu, Tag, theme } from 'antd'
import UrlShortner from './UrlShortner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import fetcher from '../../util/fetcher'
import Context from '../../util/Context'
const { Header, Content, Footer, Sider } = Layout

const Home = () => {
  const { session } = useContext(Context)
  const navigate = useNavigate()

  // console.log(urldata)
  // console.log(session)

  const handleLogout = async () => {
    await useSWR('/api/user/logout', fetcher)
    navigate('/login')
    toast.success('Logout success')
  }

  const item = [
    {
      key: '1',
      icon: <UserOutlined className='!text-xl' />,
      label: 'Short URL',
      onClick: () => navigate('/home'),
    },
    {
      key: '2',
      icon: <UnorderedListOutlined className='!text-xl' />,
      label: 'URL List',
      onClick: () => navigate('/url-list'),
    },
    {
      key: '3',
      icon: <LogoutOutlined className='!text-xl' />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // if (!session) return navigate('/')

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        className='min-h-screen !bg-white'
        collapsedWidth='0'
        width={260}
      >
        <div className='demo-logo-vertical flex flex-col items-center my-6 gap-1'>
          <Avatar size={70} className='!bg-orange-200'>
            <UserOutlined className='text-2xl !text-black' />
          </Avatar>
          <h1 className='text-xl font-semibold'>
            {session ? session.fullname : 'User Name'}
          </h1>
          <h1 className='text-base text-gray-400'>
            {session ? session.email : 'User email'}
          </h1>
          <Tag color='green' className='!px-4'>
            {session ? 'User' : 'Login Now'}
          </Tag>
        </div>
        <Menu
          theme='light'
          mode='inline'
          className=' font-semibold'
          defaultSelectedKeys={['4']}
          items={item}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '10px 10px 0',
          }}
        >
          <div
            style={{
              padding: 20,
              minHeight: 480,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <UrlShortner />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          URL-Shortner @All right reserved
        </Footer>
      </Layout>
    </Layout>
  )
}
export default Home
