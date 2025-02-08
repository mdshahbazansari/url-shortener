import { Button, Input, Form, Space, Table, message } from 'antd'
import React, { useContext, useState } from 'react'
import Context from '../../util/Context'
import useSWR, { mutate } from 'swr'
import fetcher from '../../util/fetcher'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'

const UrlShortner = () => {
  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const { session } = useContext(Context)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const {
    data: urldata,
    error: urlErr,
    isLoading: urlLoading,
  } = useSWR(
    session?.id
      ? `http://localhost:8080/api/url/analytics/${session.id}`
      : null,
    fetcher
  )

  // Mapping the API data properly
  const data = urldata
    ? urldata.map((item, index) => ({
        id: index + 1,
        totalclick: item.totalClick,
        short: item.shortId,
        link: item.redirectUrl,
        createdAt: moment(item.createdAt).format('DD M YYYY hh:mm'),
      }))
    : []

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }

  const clearFilters = () => setFilteredInfo({})
  const clearAll = () => {
    setFilteredInfo({})
    setSortedInfo({})
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      className: 'w-1/12',
    },
    {
      title: 'Total Click',
      dataIndex: 'totalclick',
      key: 'totalclick',
      sorter: (a, b) => a.totalclick - b.totalclick,
      sortOrder:
        sortedInfo.columnKey === 'totalclick' ? sortedInfo.order : null,
      ellipsis: true,
      className: 'w-1/12',
    },

    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
      ellipsis: true,
      className: 'w-2/12',
    },
    {
      title: 'Short Link',
      dataIndex: 'short',
      key: 'short',
      sorter: (a, b) => a.short.localeCompare(b.short),
      sortOrder: sortedInfo.columnKey === 'short' ? sortedInfo.order : null,
      ellipsis: true,
      className: 'w-3/12',
      render: (text) => (
        <a
          href={`http://localhost:8080/api/url/${text}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Original Link',
      dataIndex: 'link',
      key: 'link',
      sorter: (a, b) => a.link.localeCompare(b.link),
      sortOrder: sortedInfo.columnKey === 'link' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => (
        <a
          href={text}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          {text}
        </a>
      ),
    },
  ]

  const createUrl = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/url',
        values,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const newUrlData = response.data
      mutate(
        session?.id
          ? `http://localhost:8080/api/url/analytics/${session.id}`
          : null,
        (existingData) =>
          existingData ? [...existingData, newUrlData] : [newUrlData]
      )
      message.success('URL Created successfully')
      form.resetFields()
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to create URL')
    }
  }

  if (!session) return navigate('/')

  return (
    <div className='bg-green-100 flex items-center justify-center'>
      <div className='w-full bg-white p-2'>
        <h2 className='text-2xl font-bold text-center text-blue-900'>
          How to create URL shortener using Laravel?
        </h2>
        <p className='text-center text-lg py-2 font-semibold text-gray-600'>
          Here you can shorten long URLs.
        </p>

        {/* Input Field */}
        <Form
          layout='vertical'
          form={form}
          onFinish={createUrl}
          className=' flex'
        >
          <Form.Item
            name='url'
            className=' w-10/12 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <Input size='large' placeholder='Enter Long URL for short-Url' />
          </Form.Item>
          <Button
            className=' bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition'
            size='large'
            htmlType='submit'
            loading={urlLoading ? true : false}
            style={{
              backgroundColor: '#003cff',
              color: 'white',
              fontWeight: 'bolder',
            }}
          >
            Generate Shorten Link
          </Button>
        </Form>

        {/* <div className='flex mt-2'>
            <input
              type='text'
              htmlType='submit'
              placeholder='Enter URL'
              className='w-10/12 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400'
            />

            <Button className='bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition'>
              Generate Shorten Link
            </Button>
          </div> */}

        <div className=' p-2 bg-green-200 text-green-800 font-medium rounded-md text-center'>
          Shorten Link Generated Successfully!
        </div>

        {/* Sorting and Filter Buttons */}
        <Space style={{ marginBottom: 10, marginTop: 10 }}>
          <Button
            onClick={() => setSortedInfo({ order: 'descend', columnKey: 'id' })}
          >
            Sort by ID
          </Button>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </Space>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          rowKey='id'
        />
      </div>
    </div>
  )
}

export default UrlShortner
