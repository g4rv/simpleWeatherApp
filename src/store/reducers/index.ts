import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { settingsReducer } from "./settingsReducer";

export const rootReducer = combineReducers({
    weather: weatherReducer,
    settings: settingsReducer
})

export type RootState = ReturnType<typeof rootReducer>