// Need to add test so jest can run properly and we have access to the global variables it provides
// Because we have made a script called test (that runs jest), to use --watch we have to first add -- to dissasociate between yarn(test) and jest

const add = (a, b) => a + b + 1
const generateGreeting = (name = 'Anonymous') => `Hello, ${name}!`

test('Should add two numbers', () => {
    const result = add(3, 4)
    expect(result).toBe(8)
    
    // Same as expect
    // if (result !== 7) {
    //     throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`)
    // }
})

test('Should be Hello, Mike!', () => {
    const result = generateGreeting('Mike')
    expect(result).toBe('Hello, Mike!')
}) 

test('Should be defaulted to Anonymous after hello.', () => {
    const result = generateGreeting()
    expect(result).toBe('Hello, Anonymous!')
})