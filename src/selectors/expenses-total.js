// Using reduce and map
// Map just makes an array of only the expense.amount numbers
// Reduce uses an accumalator/sum which starts at 0 and then adds the value to it for each element and also 'remembers' that sum each time a value is added 

// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0
//     } else {
//         return expenses
//             .map((expense) => expense.amount)
//             .reduce((sum, value) => sum + value, 0)
//     }
// }

export default (expenses) => {
    if (expenses.length === 0) {
        return 0
    } else {
        let total = 0
        expenses.forEach((expense) => {
            total += expense.amount
        })
        return total        
    }
}