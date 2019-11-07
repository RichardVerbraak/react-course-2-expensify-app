import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'

// Lets Enzyme use Adapter
// Adapter has all the code for only react version 16

Enzyme.configure({
    adapter: new Adapter()
})

// Setup our test environment with jest, this specifies where the env variables live

DotEnv.config({path: '.env.test'})