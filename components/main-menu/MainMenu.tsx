import { Component, SyntheticEvent, createRef, RefObject } from 'react';
import Link from 'next/link';
import { RouterContext } from '../../contexts/routerContext';
import { NextRouter } from 'next/router';

/** Интерфейс, описывающий одну ссылку главного меню */
export interface MainMenuItem {
    href: string;
    title: string;
}

interface MainMenuPropsI {
    /** Список ссылок главного меню */
    data: MainMenuItem[];
    /** Текущее состояние данного компонента */
    customState: MainMenuStateI;
    /** Функция изменяющая состояние компонента */
    setStateFunc: (state: MainMenuStateI) => void;
}

/** Интерфейс, описывающая состояние компонента */
export interface MainMenuStateI {
    /** Выбранная ссылка */
    selectedItemData: {
        width: number;
        left: number;
        right: number;
    };

    // Положение для "скролла" 
    targetWidth: number;
    targetLeft: number;
    targetRight: number;
}

class MainMenu extends Component<MainMenuPropsI> {
    /** ref для "скролла" */
    private targetRef: RefObject<HTMLSpanElement>;
    /** ref для списка всез ссылок */
    private listRef: RefObject<HTMLUListElement>;

    static contextType = RouterContext;

    constructor(props: MainMenuPropsI) {
        super(props);

        this.targetRef = createRef();
        this.listRef = createRef();
    }

    private handleItemClick = (event: SyntheticEvent) => {
        this.selectItem(event.currentTarget);
    }

    private selectItem(target: Element) {
        const { width, left, right } = target.getBoundingClientRect();
        const { selectedItemData } = this.props.customState;

        // Если пользователь кликает по уже выбранной ссылке
        if (selectedItemData.width === width && selectedItemData.left === left && selectedItemData.right === right) {
            return;
        }

        setTimeout(_ => {
            this.props.setStateFunc({
                selectedItemData: { width, left, right },
                targetWidth: width,
                targetLeft: left,
                targetRight: right
            });
        }, 100)
    }

    /** Обработчик наведения мыши на ссылку */
    private handlerItemMouseEnter = (event: SyntheticEvent) => {
        const { width, left, right } = event.currentTarget.getBoundingClientRect();
        const currentState = this.props.customState;

        let newState: MainMenuStateI;

        // Если есть выбранная ссылка, производим движение "скролла" влево или вправо
        if (currentState.selectedItemData?.width) {
            if (currentState.targetLeft < left) {
                newState = {
                    ...currentState,
                    targetWidth: left - currentState.targetLeft + width,
                };
            } else {
                newState = {
                    ...currentState,
                    targetLeft: left,
                    targetRight: window.innerWidth - currentState.targetRight,
                    targetWidth: currentState.targetRight - left,
                };
            }
        }

        // Если ссылка ещё не выбрана, задаём для "скролла" положение текущей ссылки
        if (!currentState.selectedItemData?.width) {
            newState = {
                ...currentState,
                targetWidth: width,
                targetLeft: left,
                targetRight: right
            };
        }

        this.props.setStateFunc(newState);
    }

    /** Обработчик покидания курсора мыши с ссылки */
    private handleMouseLeave = () => {
        const { selectedItemData, selectedItemData: { width, left, right } } = this.props.customState;

        // В данном случае, устанавливаем для "скролла" позицию уже выбранного элемента
        this.props.setStateFunc({
            selectedItemData,
            targetWidth: width,
            targetLeft: left,
            targetRight: right
        });
    }

    onResize = () => {
        this.selectCurrentLink();
    }

    componentDidMount() {
        this.selectCurrentLink();
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    /** Подсвечивает ссылку в зависимости от текущего роута */
    selectCurrentLink() {
        const currentRouter: NextRouter = this.context;

        const listItems = this.listRef.current.children || [];

        const link = Object.values(listItems)
            .filter(({ firstElementChild }) => currentRouter.pathname.includes(firstElementChild.pathname))
            .map(({ firstElementChild }) => firstElementChild);

        if (link.length !== 0) {
            this.selectItem(link[0]);
        }
    }

    render() {
        const { handleItemClick, handlerItemMouseEnter, handleMouseLeave, targetRef, listRef } = this;
        const { targetWidth, targetLeft, targetRight } = this.props.customState;;
        const { data } = this.props;

        return (
            <div className="main-menu">
                <ul className="list main-menu__list" ref={listRef}>
                    {data.map(item => <li className="item list__item" key={item.href}>
                        <Link href={`/${item.href}`}>
                            <a
                                className="item__link"
                                onMouseEnter={handlerItemMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleItemClick}
                            >{item.title}</a>
                        </Link>
                    </li>)}
                </ul>

                <span className="target" ref={targetRef}></span>
                <style jsx>{`
                    .list {
                        padding: 0;
                        margin: 0;
                        list-style-type: none;
                    }

                    .list {
                        display: flex;
                        justify-content: center;
                    }

                    .item {
                        cursor: pointer;
                        list-style-type: none;
                        transition: all .35s ease-in-out;
                    }

                    .item:not(:last-child) {
                        margin-right: 56px;
                    }

                    .item__link {
                        font-family: Gilroy;
                        font-weight: 800;
                        font-size: 12px;
                        line-height: 15px;
                        text-decoration: none;

                        letter-spacing: 0.8px;
                        text-transform: uppercase;
                        white-space: nowrap;

                        color: #262525;
                        
                        display: flex;
                    }

                    .target {
                        position: absolute;
                        margin-top: 7px;
                        border-bottom: 4px solid #D88F5E;
                        z-index: -1;
                        transition: all .35s ease-in-out;
                    }
                `}</style>
                <style jsx>{`
                    .target {
                        width: ${targetWidth}px;
                        left: ${targetLeft ? targetLeft + 'px' : 'unset'};
                        right: ${targetRight}px;
                        transform: ${targetWidth === 0 ? 'translateX(-60px)' : 'none'}
                    }
                `}</style>
            </div>
        )
    }
};

export default MainMenu;