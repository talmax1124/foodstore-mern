import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const MultiSelectOnEditAddon = ({ addons, addonPrev, setAddonPrev }) => {
  return (
    <>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Please select'
        value={addonPrev}
        onChange={(value) => setAddonPrev(value)}
      >
        {addons.length &&
          addons.map((s) => (
            <Option key={s._id} value={s._id}>
              {s.name}
            </Option>
          ))}
      </Select>
    </>
  )
}

export default MultiSelectOnEditAddon