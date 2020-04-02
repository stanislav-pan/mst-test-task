import { Component } from 'react';
import Burger from '../burger';
import MainMenu from '../main-menu';
import { MainMenuItem } from '../main-menu/MainMenu';
import { MainMenuContext } from '../../contexts/mainMenuContext';

const mainMenuData: MainMenuItem[] = [
    {
        href: 'about/[id]',
        title: 'О комплексе'
    },
    {
        href: 'features',
        title: 'Особенности'
    },
    {
        href: 'penthouses',
        title: 'Пентхаусы'
    },
    {
        href: 'apartment',
        title: 'Выбрать квартиру'
    }
];

class Header extends Component {
    static contextType = MainMenuContext;

    render() {
        const { menuData, setMenuData } = this.context;

        return (
            <header className="header" >
                <div className="header__burger header__burger_left">
                    <Burger text="Первомайская" asLogo={true}></Burger>
                </div>
                <nav className="header__nav">
                    <MainMenu data={mainMenuData} customState={menuData} setStateFunc={setMenuData}></MainMenu>
                </nav>
                <div className="header__burger header__burger_right">
                    <Burger text="8 888 888 88 88" textPosition='left' onBurgerClick={null}></Burger>
                </div>

                <style jsx>{`
                    .header {
                        display: flex;
                        justify-content: space-between;

                        z-index: 1;
                    }
                `}</style>
            </header>
        );
    }
};

export default Header;