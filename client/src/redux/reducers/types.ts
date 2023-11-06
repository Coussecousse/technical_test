import { OPEN_MENU, CLOSE_MENU } from "./actionTypes";

interface OpenMenuAction {
    type : typeof OPEN_MENU
}

interface CloseMenuAction {
    type: typeof CLOSE_MENU
}

export type MenuActionTypes = OpenMenuAction | CloseMenuAction;

export interface SystemState {
    menu: {
        value: boolean
    }
}