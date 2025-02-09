import { Button, Input, Form, Space, Table, message } from 'antd'
import React, { useContext, useState } from 'react'
import Context from '../../util/Context'
import useSWR, { mutate } from 'swr'
import fetcher from '../../util/fetcher'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const UrlList = () => {
  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const { session } = useContext(Context)
  const navigate = useNavigate()

  const {
    data: urldata,
    error: urlErr,
    isLoading: urlLoading,
  } = useSWR(session?.id ? `/api/url/analytics/${session.id}` : null, fetcher)

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
      className: 'w-2/12',
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
      className: 'w-2/12',
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

  if (!session) return navigate('/')

  return (
    <div className='bg-gray-100 flex items-center justify-center '>
      <div className='w-9/12 mt-2 bg-white p-4 '>
        <h2 className='text-2xl font-bold text-center text-blue-900'>
          Your all shorted url here..
        </h2>
        <p className='text-center text-lg py-2 font-semibold text-gray-400'>
          Find easly shorted and long URL's both here.
        </p>

        <Space style={{ marginBottom: 10, marginTop: 10 }}>
          <Button
            onClick={() => setSortedInfo({ order: 'descend', columnKey: 'id' })}
          >
            Sort by ID
          </Button>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <Button onClick={clearAll}>Clear All</Button>
          <Button onClick={() => navigate('/home')} className='!bg-green-200'>
            Short New URL's
          </Button>
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

export default UrlList
