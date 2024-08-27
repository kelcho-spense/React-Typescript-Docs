import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

//without persist

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer, 
//         todo: todoReducer,     
//     }
// });

// export type RootState = ReturnType<typeof store.getState>  //RootState is a type that represents the entire state of the app
// export type AppDispatch = typeof store.dispatch;   //dispatch is a function that sends an action to the store


//with persist for local storage with 2 reducers
//combine all reducer
// const rootReducer = combineReducers({
//     counter: counterReducer,
//     todo: todoReducer,
// })
// // create configureStore
// const persistConfig = {
//     key: 'root',
//     storage
// }
// //persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer) //combined & persisted reducer
// //normal store
// export const store  = configureStore({
//     reducer: persistedReducer
// })

// //persisted store
// export const persistedStore = persistStore(store)

// export type RootState = ReturnType<typeof store.getState>  //RootState is a type that represents the entire state of the app
// export type AppDispatch = typeof store.dispatch;   //dispatch is a function that sends an action to the store



//with persist 1 state for local storage with 2 reducers

//persist config for counterReducer

const counterPersistConfig = {
    key: 'counter',
    storage,
}


//apply pesistReducer to only counter reducer
const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer) //combined & persisted reducer

//combine all reducer (counterReducer is persisted and todoReducer is not persisted)
const rootReducer = combineReducers({
    counter: persistedCounterReducer,
    todo: todoReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})


export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>  //RootState is a type that represents the entire state of the app
export type AppDispatch = typeof store.dispatch;   //dispatch is a function that sends an action to the store
