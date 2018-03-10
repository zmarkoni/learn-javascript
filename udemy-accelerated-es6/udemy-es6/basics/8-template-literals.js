//Template Literals

//Template Literals are STRINGS with extra features, using back-ticks ` `

let name = 'Zoki';

// We can write multiple strings
// We can use variable inside with ${variable}
// We can also escape it and print like it is written without assigning variable value
let description = `
  Hello, I'm ${name + ' !!!'}
  How are you today?

  Hello, I'm \${name + ' escaped!}  
`;

console.log(description);
