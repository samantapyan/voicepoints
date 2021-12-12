import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/UserSlice"
const middlewares = [];

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    'dialog/openDialog',
                    'dialog/closeDialog',
                    'message/showMessage',
                    'message/hideMessage'
                ]
            }
        }).concat(middlewares),
})