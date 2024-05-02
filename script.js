function sumArray(numbers){
    result = 0;
    numbers.forEach(element => {
        result += element;
    });
    return result
}

const numbers = [1, 2, 3, 4, 5];
console.log("Ex1: ", sumArray(numbers));


function doubleArray(numbers){
    newArray = [];
    numbers.forEach(element => {
        newArray.push(element*2);
    });
    return newArray;
}
console.log("Ex2: ", doubleArray(numbers));


const numbersEdit = numbers.map((x) => x**2);
console.log('Ex3: ', numbersEdit);

const initialValue = 1;
const ProductValue = numbers.reduce(
    (val1, val2) => val1 * val2,
    initialValue,
)
console.log('Ex4: ', ProductValue);


const people = [
    {name: 'Alice', age: 25},
    {name: 'Bob', age: 30},
    {name: 'Charlie', age: 20}
];
const DefaultValue = 0;
const averageAge = people.reduce(
    (Accumulateur, ValeurAc) => Accumulateur + ValeurAc.age,
    DefaultValue,
)
console.log('Ex5: ', averageAge/people.length)


// ------------------------------
const person = { name: 'John', age: 30, country: 'USA' };
function extractInfo(person){
    return `${person.name} is ${person.age} years old`;
}
console.log('Exercice1: ', extractInfo(person));

const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
function extractElements(fruits){
    return fruits[0] + ', ' + fruits[1];
}
console.log('Exercice2: ', extractElements(fruits));

const book = {
    info: {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925
    },
    genre: 'Fiction'
}
function extractBookInfo(book){
    return book.info.title + ' by ' + book.info.author;
}
console.log('Exercice3: ', extractBookInfo(book));


const user = {username: 'user123', email: 'user@example.com', age:25};
function renameProperties(user){
    let newObject = {};
    newObject.name = user.username;
    newObject.contact = user.email;
    return {newObject};
}
console.log('Exercice5: ', renameProperties(user));