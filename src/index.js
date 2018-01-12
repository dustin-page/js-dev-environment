import './index.css';

import numeral from 'numeral'; //numeral is a handy library for formatting numbers

const courseValue = numeral(1000).format('$0,0.00');
//debugger; //Debug breakpoint
console.log(`I would pay ${courseValue} for this awesome course!`);
