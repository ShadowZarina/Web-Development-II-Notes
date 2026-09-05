# JavaScript 
- is a WEAKLY TYPED/UNTYPED language
- it allows *implicit type conversion* (also known as type coercion) when performing operations on mismatched data types
- JavaScript will automatically change data from one type to another to complete an operation.

Link to HTML
```
<script type=”text/javascript”>
```
Script Block
```
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>

    <h1>Hello World</h1>

    <!-- This is an internal JS script block -->
    <script>
        console.log("This code runs inside the HTML script block!");
        alert("Welcome to the site!");
    </script>

</body>
</html>
```

JavaScript Code Block
```
// Standalone block used for scoping
{
    let localMessage = "I only exist inside this block";
    var globalMessage = "I leak outside of this block"; 
    
    console.log(localMessage); // Works
}

// Scoping demonstration
console.log(globalMessage); // Works (var is not block-scoped)
// console.log(localMessage); // Error! (let is block-scoped)
```

# Variables = var, let, const
```
function foo() {
	if true {
		console.log(var1);
	}
}
```

Naming variables = can contain numbers but not as first digit, don’t use keywords

# Data types:
1. Number
- Infinity
- -Infinity
- NaN (computational error)
- BigInt
2. String (double quotes, single quotes, backticks)
```
let name - “John Doe”;
alert(`Hello my name is ${name}`);
```

3. Boolean
4. Null (empty/unknown value)
5. Undefined (value not assigned)

# Operators
- Operands
## 1. Arithmetic Operators
Used to perform standard mathematical calculations on numbers:
- + (Addition): Adds values or concatenates strings.
- - (Subtraction): Subtracts the right value from the left value.
- * (Multiplication): Multiplies values.
- / (Division): Divides the left value by the right value.
- % (Modulus): Returns the division remainder.
- ** (Exponentiation): Raises the base to the power of the exponent (e.g., 2 ** 3 = 8).
- ++ (Increment): Increases a numeric value by 1.
- -- (Decrement): Decreases a numeric value by 1.
  
## 2. Unary Operators
- A unary operator is an operator that requires only one operand to perform an action. They can be placed either before the operand (prefix) or after it (postfix).
- These include specific arithmetic (unary plus/minus, increment/decrement) operators, logical NOT, and bitwise NOT
  
## 3. Comparison Operators
Used to compare two values and return a boolean (true or false):
- == (Equality): Checks if values are equal, performing type conversion if necessary.
- === (Strict Equality): Checks if both the value and the data type are identical.
- != (Inequality): Checks if values are not equal.
- !== (Strict Inequality): Checks if values or types are not equal.
- `> / <` (Greater than / Less than): Evaluates if the left value is larger or smaller than the right.
- `>= / <=` (Greater than or equal / Less than or equal): Evaluates inclusive limits.
  
```
(10/2) == “5” is TRUE
(10/2) === “5” is FALSE?
11 === “11” is FALSE
10 != “10” is FALSE	
```

## 4. Bitwise Operators
Operate directly on the 32-bit binary representations of numbers:
- & (Bitwise AND)
- | (Bitwise OR)
- ^ (Bitwise XOR)
- ~ (Bitwise NOT)<< (Left shift)
- `>>` (Sign-propagating right shift)
- `>>>` (Zero-fill right shift)

## 5. Logical Operators
- && (Logical AND): Returns true if both operands are true.
- || (Logical OR): Returns true if at least one operand is true.
- ! (Logical NOT):Reverses the boolean result (turns true to false, and vice versa).

## 6. Assignment Operators
Used to assign values to variables. They can also combine an arithmetic operation with an assignment: 
- = (Assignment): Assigns a value to a variable.
- += (Addition Assignment): Adds a value to a variable and assigns the result (e.g., x += 5 is x = x + 5).
- -= (Subtraction Assignment): Subtracts and assigns.
- *= (Multiplication Assignment): Multiplies and assigns.
- /= (Division Assignment): Divides and assigns.
- %= (Modulus Assignment): Calculates the remainder and assigns.
- **= (Exponentiation Assignment): Raises to a power and assigns. 

# Functions 
Starts with function, has parameters and body, contains statements, enclosed in curly braces
```
const square = function(x) {
	Return x * x;
};

function square(x) {
	Return x * x;
};

console.log(square(12));
```
# ARROW FUNCTION 

Const variable = parameter => {
	statements;
};

# I/O FUNCTIONS

console.log(string)
Var obj = prompt(“string”);

# CONDITIONAL STATEMENTS = if/else if/else , switch case 

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

# ARRAYS
- list-like objects that can hold more than one value at once


arr.push(value);
arr.pop();
arr.shift();
Add to the front:
arr.unshift(value);
Find the index of item in array:
Let pos = arr.indexOf(value);
Remove an item by index position:
arr.splice(index, number);

# OBJECTS
1. One way to create is by using braces
```
Let car = {
	Brand: “Toyota”,
	Model: “Vios”,
	VARIANTS: [“J”,”XE”,”XLE”],
	Property : {
		Property: {
			Text here;
		}
	}
};
```
You can nest objects in objects

2. New Keyword
```
Var car = new Object();
Car.brand = “Toyota”;
Car.model = “Vios”;
```
Properties whose names aren’t valid identifiers have to be quoted

Eg. “touched tree”: “Touched a tree”
```
objectName.property
objectName[“property”]
objectName.newProperty = value;
```
Delete keyword to delete object properties (removes property and value)

Delete objectName.property;

# DOM  – Document Object Model
```
Var obj = 
document.getElementsByTagName(“tag_name”)[index];
document.getELementById(“id”);
getElementsByClassName
```

```
createElement(tagName);
document.body.appendChild(obj);

Obj.style.property = value;
```

## GET AND SET ATTRIBUTES
```
getAttribute(“attribute”);
setAttribute(“attribute”,”value”);
image.getAttribute(“src”);
link.setAttribute(“href”,”www.google.com”);
```
## CHANGING CLASS
```
obj.className = “class”
classList.add(“class”)
classList.remove(“class”)
classList.toggle(“class”)
classList.contains(“class”)
```
# EVENT HANDLING
Event = Signal that something has happened, generated by all DOM elements

- Onload
- Onunload
- Onchange (input fields)
- Onmouseover, onmouseout (mouse is over/out of HTML element)
- Onmousedown, onmouseup (mouse button clicked/released)
- Onclick

# EVENT HANDLERS

To react to events, we assign function(handler) that runs
Handlers are a way to run JS code in case of user actions

Sample HTML Code:
```
<button type=“button” onclick=”helloWorld()”>Click Me</button>

<script type=”text/javascript”>
	Function helloWorld() {
		alert(“Hello, world!”);
}
</script>
```
# EVENT OBJECTS
