import React from 'react'

// single element
const root = React.createElement('div', {}, 'Hello World')
console.log('ROOT', root)

// nested elements
const nested = React.createElement('div', { style: { color: 'red' } }, [
  React.createElement('h1', {}, 'Hello World'),
  React.createElement(
    'p',
    {},
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ),
])

console.log('NESTED', nested)
