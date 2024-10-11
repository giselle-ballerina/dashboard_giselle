// store.js
import { createStore } from 'redux';

const initialState = {
    shopg: null,
    loadingg: true,
    errorg: null,
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOP':
            console.log(action.payload);
            return { ...state, shopg: action.payload };
        case 'SET_LOADING':
            return { ...state, loadingg: action.payload };
        case 'SET_ERROR':
            return { ...state, errorg: action.payload };
        default:
            return state;
    }
};

export const store = createStore(shopReducer);
