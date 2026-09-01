JavaScript is a WEAKLY TYPED/UNTYPED language

Link to HTML
<script type=”text/javascript”>

Script Block


Variables = var, let, const

Function foo() {
If true {
	console.log(var1);
}
}

Naming variables = can contain numbers but not as first digit, don’t use keywords

Data types:
1. Number
- Infinity
- -Infinity
- NaN (computational error)
- BigInt
- String (double quotes, single quotes, backticks)

Let name - “John Doe”;
alert(`Hello my name is ${name}`);

- Boolean
- Null (empty/unknown value)
- Undefined (value not assigned)

Operators
- Operands
- Arithmetic Operators
= the primary operations, exponentiation, increment/decrement, etc.
- Unary
= unary plus, unary minus, assignment
- Comparison
= ===, ===, !==, !=, <, >, <=, >=

(10/2) == “5” is TRUE
(10/2) === “5” is FALSE?
11 === “11” is FALSE
10 != “10” is FALSE	

- Bitwise Operators

Functions = starts with function, has parameters and body, contains statements, enclosed in curly braces

Const square = function(x) {
	Return x * x;
};

Function square(x) {
	Return x * x;
};

console.log(square(12));

ARROW FUNCTION 

Const variable = parameter => {
	statements;
};

I/O FUNCTIONS

console.log(string)
Var obj = prompt(“string”);

CONDITIONAL STATEMENTS = if/else if/else , switch case 

Pretest loops (condition checked first)
- for loop
- for…in loop (iterates over all properties of an object)

Const object = {a:1, b:2, c:3};
for (var variable in object) {
	console.log(`${variable}: ${object[variable]}`);
}

- for…of loop
(use to loop through arrays, strings, etc.)

For (var variable of iterable) {
	Code block;
}

- while loop
- do-while loop
