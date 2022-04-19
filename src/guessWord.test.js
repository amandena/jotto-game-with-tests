import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { findByTestAttr } from '../test/testUtils'

const setup = (state = {}) => {
  const wrapper = mount(<App/>)

  const inputBox = findByTestAttr(wrapper, 'input-box')
  inputBox.simulate('change', { target: { value: 'train' } })

  const submitButton = findByTestAttr(wrapper, 'submit-button')
  submitButton.simulate('click', { preventDefault() {} })

  return wrapper
}

describe('no words guessed', () => {

})

describe('some words guessed', () => {

})

describe('guess secret word', () => {
  
})
