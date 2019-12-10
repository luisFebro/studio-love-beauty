// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
// About: activating an animation
// (especially from another component eg after click on a btn in the modal, run an anima in another component)
// and manage Animation using setTimeout and useRef Hook (requires to set the function, useRef and setTimeout in the target component)
// not working
export const animateAnotherComponent = dispatch => {
    dispatch({ type: 'ANIMATION_RUN_TIMER', payload: 3000 }); //delay to run is sent to reducer
};

/**
 * @param  {string} cssText    [optional with css styling]
 * @param  {number} timer    [miliseconds to start off animation]
 */
export const animateHinge = (animateRef, cssText = null) => {
    const currElem = animateRef.current;
    currElem.className = "";
    currElem.classList.add('animated', 'hinge', 'slower');
    // it is required to reinsert the style of the container after applying animation. Otherwise, all style is gone
    // Try not using any at first.If no stylying issues happens, you can ignore it.
    currElem.style.animationFillMode= "inherit";
};
