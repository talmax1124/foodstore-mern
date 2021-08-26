import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderAdmin } from '../../actions/orderActions'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap'
import OrderListTable from '../../components/OrderListTable'

const ManageOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const adminOrderList = useSelector((state) => state.adminOrderList)
  const { orderList, loading, error } = adminOrderList

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listOrderAdmin())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])
  return (
    <>
      <Row>
        <Col>
          <h2>My Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <OrderListTable orderList={orderList} />
          )}
        </Col>
      </Row>
    </>
  )
}

export default ManageOrderScreen
