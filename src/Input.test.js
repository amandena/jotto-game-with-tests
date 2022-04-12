import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

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