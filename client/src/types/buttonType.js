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
    func,
    bool,
    oneOf,
} from 'prop-types';

export const buttonMultiType = {
    title: string,
    size: oneOf(["small", "medium", "large"]),
    children: string,
    onClick: func,
    component: string,
    iconFontAwesome: string,
    variant: oneOf(['link', 'contained', 'outlined']),
    color: string,
    backgroundColor: string,
    backColorOnHover: string,
    textTransform: oneOf(['uppercase', 'lowercase', 'capitalize']),
}


export const buttonFabType = shape({
    title: string,
    iconFontAwesome: string,
    variant: string,
    top: number,
    left: number,
    backgroundColor: string,
    onClick: func,
}).isRequired



/* COMMENTS
n1: Anything that can be rendered: numbers, strings, elements or an array
 (or fragment) containing these types.
n2: element for native React components, elementType for your own components (MyComponent)
*/