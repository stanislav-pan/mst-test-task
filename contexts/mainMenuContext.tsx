import React, { createContext, useState } from 'react';
import { MainMenuStateI } from '../components/main-menu/MainMenu';

export const MainMenuContext = createContext<{ menuData: MainMenuStateI, setMenuData: (state: MainMenuStateI) => void }>(null);

const MainMenuContextProvider = (props) => {
    const [menuData, setMenuData] = useState({
        selectedItemData: {
            width: 0,
            left: 0,
            right: 0
        },
        targetWidth: 0,
        targetLeft: 0,
        targetRight: 0
    });

    return <MainMenuContext.Provider value={{ menuData, setMenuData }}> {props.children} </ MainMenuContext.Provider>;
}


export default MainMenuContextProvider;