/*
Reference:
array,
number,
string,
bool,
func,
object,
arrayOf,
node, // n1
symbol,
element,
elementType, // n2
shape,
oneOf,
oneOfType,
 */

import {
    number,
    string,
    shape,
} from 'prop-types';

export const modalTextFieldDashboardType = shape({
    mainSubject: string,
    title: string,
    subTitle: string,
    userCurrentScore: number,
    txtBtn: string,
    iconBtn: string,
    labelTxtField: string,
})



/* COMMENTS
n1: Anything that can be rendered: numbers, strings, elements or an array
 (or fragment) containing these types.
n2: element for native React components, elementType for your own components (MyComponent)
*/