import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Header from './Header'

const setup = propOverrides => {
  const props = Object.assign({
    title: "Some title",
    description: "Some description"
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render container', () => {
      const { output } = setup()
      expect(output.type).toBe('div')
      expect(output.props.className).toBe('jumbotron jumbotron-fluid')
    })
  })
})
