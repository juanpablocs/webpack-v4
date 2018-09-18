import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello World - Webpack 4</div>,
    document.getElementById('root')
);

console.log(process.env.HELLO);
console.log('test', process.env.TEST);
