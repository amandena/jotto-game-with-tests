import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

const setup = (props={}) => {
  const setupProps = { ...props }
  return shallow(<Input {...setupProps}/>)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'input-component')
  expect(component.length).toBe(1)
})