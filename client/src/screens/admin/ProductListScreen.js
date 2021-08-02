import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, listProduct } from '../../actions/productActions'
import { Image, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAlert } from 'react-alert'
import { Pagination } from 'antd'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import ItemSearch from '../../components/ItemSearch'

const ProductListScreen = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const alert = useAlert()
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listProduct())
      if (successDelete) {
        alert.success('Product Deleted')
        dispatch({ type: DELETE_PRODUCT_RESET })
      }
    } else {
      history.push('/')
    }
  }, [dispatch, userInfo, history, successDelete, alert])

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteProduct(id))
    }
  }
  const searched = (keyword) => (category) =>
    category.title.toLowerCase().includes(keyword)
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          {loading && <Loader />}
          {loadingDelete && <Loader />}
        </Col>
      </Row>
      <Row>
        {error && <Message variant='danger'>{error}</Message>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        <ItemSearch setKeyword={setKeyword} keyword={keyword} />
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>SL No</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>DELIVERY</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>ADDONS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(searched(keyword)).map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={product.image.url}
                    rounded
                    style={{ width: '40px' }}
                  />
                </td>
                <td>
                  {product.availability === 'No' ? (
                    <span style={{ color: 'red', fontWeight: '800' }}>
                      {product.title}
                    </span>
                  ) : (
                    <span style={{ color: '#000', fontWeight: '600' }}>
                      {product.title}
                    </span>
                  )}
                </td>
                <td>
                  {product.delivery === 'Yes' ? (
                    <FontAwesomeIcon icon={faCheckCircle} color='green' />
                  ) : (
                    <FontAwesomeIcon icon={faCheckCircle} color='red' />
                  )}
                </td>
                <td>
                  {product.price ? (
                    <span>${product.price}</span>
                  ) : product.variable && product.variable.attribute ? (
                    product.variable.attribute.map((attr) => (
                      <span key={attr._id}>
                        Attr: ${attr.price}
                        <br />
                      </span>
                    ))
                  ) : (
                    'No Price'
                  )}
                </td>
                <td>{product.category.name}</td>
                <td>
                  {product.addon.map((a) => (
                    <span key={a._id}>
                      {a.name}
                      <br />
                    </span>
                  ))}
                </td>
                <td className='d-flex justify-content-around'>
                  <LinkContainer to={`/admin/product/${product.slug}/edit`}>
                    <Button variant='dark' className='btn-sm'>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </Row>
    </>
  )
}

export default ProductListScreen
