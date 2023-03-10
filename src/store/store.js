import {
    compose,
    legacy_createStore as createStore, 
    applyMiddleware 
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const loggerMiddleware = (store) => (next) => (action) => {
//     if(!action.type) {
//         return next(action);
//     }

//     console.log('type', action.type);
//     console.log('payload', action.payload);
//     console.log('currentState', store.getState());

//     next(action);

//     console.log('next state:', store.getState());
// }


const persistConfig = {
    key: 'root',
    storage,
    blacklist:['user']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__) || compose;

//const composedEnhancers = compose(applyMiddleware(...middleWares));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);