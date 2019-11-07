// COMPLETELY UNRELATED TO THE COURSE BUT I FOUND THIS INTERESTING AND WELL EXPLAINED, CAPS!
// Hoisting makes your code unpredictable and thus bad, which is why const and let are being used to create a predictable scope instead of var

// JavaScript will undergo the creation phase line by line
// it sees the var favouriteFood and sets that to undefined
// then the function and sets that to undefined -> it continues looking for the var keyword but there is none --> now the creation phase is finished

// it now starts the execution phase, it sets favouriteFood from undefined to grapes
// it runs the function because it was called, this function now has its own exection context
// the creation phase starts, it looks for vars and 'hoists' them to the top -> creates var favouriteFood = undefined
// no more vars to go through so the exection phase starts
// console.logs the still undefined variable -> then set it to sushi -> console.log the now set to sushi variable

// to summarize: JavaScript Engine looks for any variables/functions and hoists them to the top and setting them to undefined
// you can think of it like this, it sees var favouriteFood, makes it undefined, now you can think of that like losing their var keyword when hoisting (during creation phase) happens


var favouriteFood = 'grapes'

var foodThoughts = function () {
    console.log('Original favourite food: ' + favouriteFood)

    var favouriteFood = "sushi"

    console.log('New favourite food:' + favouriteFood)
}

foodThoughts()