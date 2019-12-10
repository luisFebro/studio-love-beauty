import { reducer } from 'easy-peasy';
// About: manage Animation using setTimeout and useRef Hook
//Reducer Naming Structure: type: MAIN/SUBJECT + PARTICIPLE VERB eg. USER_CLEARED

// REDUCERS
const initialState = {
    setAnimationTimer: 720000000 //// 2 hours of delay, numbers with Infinity and Number.MAX_VALUE do not work.
};

export const animationReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            // Objs
            case 'ANIMATION_RUN_TIMER':
                return {
                    ...state,
                    setAnimationTimer: action.payload
                };
            default:
                return state;
        }
    })
};
