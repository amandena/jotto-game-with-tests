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
  let wrapper 
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    })
  })
  test('creates GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(1)
  })
})

describe('some words guessed', () => {
  let wrapper 
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
  })
  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(3)
  })
})

describe('guess secret word', () => {
  let wrapper 
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
  })
  const inputBox = findByTestAttr(wrapper, 'submit-button')
  const mockEvent = { target: { value: 'party' } }
  inputBox.simulate('change', mockEvent)

  const submitButton = findByTestAttr(wrapper, 'submit-button')
  submitButton.simulate('click', { preventDefault() {} })

  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(3)
  })
  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats')
    expect(congrats.text().length).toBeGreaterThan(0)
  })
  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    expect(inputBox.exists()).toBe(false)

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.exists()).toBe(false)
  })
})
