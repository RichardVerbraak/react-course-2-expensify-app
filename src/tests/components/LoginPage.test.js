import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'

let wrapper, startLogin

beforeEach(() => {
    startLogin = jest.fn()
    wrapper = shallow(<LoginPage startLogin={startLogin}></LoginPage>)
})

test('Should render LoginPage', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogout on button click', () => {    
    wrapper.find('button').simulate('click')
    expect(startLogin).toHaveBeenCalled()
})