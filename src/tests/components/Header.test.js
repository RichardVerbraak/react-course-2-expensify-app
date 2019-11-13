import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

// shallow rendering shows only what components get rendered and what data gets passed down
// toJSON is needed if we want to only see meaningful stuff instead of enzyme library things all in the component

let wrapper, startLogout

beforeEach(() => {
    startLogout = jest.fn()
    wrapper = shallow(<Header startLogout={startLogout}></Header>)
})

test('Should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogout on button click', () => {
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})

// test('Should render Header correctly', () => {
//     // Create a new renderer
//     const renderer = new ReactShallowRenderer()
//     // Render something with it
//     renderer.render(<Header />)
//     // Make a snapshot and then keep comparing to that snapshot
//     expect(renderer.getRenderOutput()).toMatchSnapshot()
// })