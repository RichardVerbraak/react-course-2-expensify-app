import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Lets Enzyme use Adapter
// Adapter has all the code for only react version 16

Enzyme.configure({
    adapter: new Adapter()
})