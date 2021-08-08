import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsByCategory } from '../actions/categoryActions'
import { Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import ProductCard from './ProductCard'

const ProductByCategory = ({ catSlug }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProductsByCategory(catSlug))
  }, [dispatch, catSlug])

  const productGetByCategory = useSelector(
    (state) => state.productGetByCategory
  )
  const { loading, error, products, categoryName } = productGetByCategory
  return (
    <div className='py-5'>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <h4>Category: {categoryName.name && categoryName.name}</h4>
            </Col>
          </Row>
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product}></ProductCard>
                </Col>
              ))}
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductByCategory
