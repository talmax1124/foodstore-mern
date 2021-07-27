import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from 'react-router-bootstrap'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import MultiSelectOnCreateAttribute from '../../components/form/MultiSelectOnCreateAttribute'
import { listAttribute } from '../../actions/attributeActions'
import { createVariable, listVariable } from '../../actions/variableActions'
import ItemSearch from '../../components/ItemSearch'

const VariableCreateScreen = ({ history }) => {
  const [label, setLabel] = useState('')
  const [attribute, setAttribute] = useState([])
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  //check logged in user
  const userLogIn = useSelector((state) => state.userLogIn)
  const { userInfo } = userLogIn

  //show variable list
  const attributeList = useSelector((state) => state.attributeList)
  const { attributes, error: errorAttributes } = attributeList

  //show variable list
  const variableCreate = useSelector((state) => state.variableCreate)
  const { success: successVariable, error: errorVariable } = variableCreate

  const variableList = useSelector((state) => state.variableList)
  const {
    loading: loadingVariables,
    variables,
    error: errorVariables,
  } = variableList

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      history.push('/')
    }
  }, [userInfo, history])

  useEffect(() => {
    dispatch(listAttribute())
    dispatch(listVariable())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createVariable({ name: label, attribute }))
    if (successVariable) {
      setLabel('')
      setAttribute([])
    }
  }
  const deleteHandler = () => {}

  const searched = (keyword) => (attribute) =>
    attribute.name.toLowerCase().includes(keyword)
  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler} className='my-5'>
          <Form.Group controlId='label'>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='attribute'>
            <Form.Label>Attribute</Form.Label>
            <MultiSelectOnCreateAttribute
              attributes={attributes}
              setAttribute={setAttribute}
              attribute={attribute}
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='my-3'>
            Create
          </Button>
        </Form>
      </FormContainer>
      <Row>
        {loadingVariables ? (
          <Loader />
        ) : errorVariables ? (
          <Message variant='danger'>{errorVariables}</Message>
        ) : (
          <>
            <ItemSearch setKeyword={setKeyword} keyword={keyword} />
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              variant='dark'
            >
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ATTRIBUTES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {variables.filter(searched(keyword)).map((variable) => (
                  <tr key={variable._id}>
                    <td>{variable.name}</td>
                    <td>
                      {variable.attribute.map((a) => (
                        <span key={a._id}>
                          {a.name}
                          <br />
                        </span>
                      ))}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/attribute/${variable.id}/edit`}
                      >
                        <Button variant='dark' className='btn-sm'>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(variable.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  )
}

export default VariableCreateScreen
