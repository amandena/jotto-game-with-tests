import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

const mockSetCurrentGuess = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [initialState, mockSetCurrentGuess]
}))

const defaultProps = {
  secretWord: 'party'
}

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Input {...setupProps}/>)
}

test('does not throw warning with expected props', () => {
  checkProps(Input, defaultProps)
})

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'input-component')
  expect(component.length).toBe(1)
})

describe('state controlled input field', () => {
  let wrapper
  let originalUseState
  beforeEach(() => {
    mockSetCurrentGuess.mockClear()
    originalUseState = React.useState
    React.useState = () => ['', mockSetCurrentGuess]
    wrapper = setup()
  })
  afterEach(() => {
    React.useState = originalUseState
  })

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')

    const mockEvent = { target: { value: 'train' } }
    inputBox.simulate('change', mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
  })
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')

    submitButton.simulate('click')
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
  })
})