import { Component, SyntheticEvent } from 'react';
import Link from 'next/link';

export interface SectionMenuItem {
    title: string;
    value: string;
}

interface SectionMenuPropsI {
    currentSectionIndex: number;
    items: SectionMenuItem[];
    onSectionClick: Function;
}

class SectionMenu extends Component<SectionMenuPropsI> {
    private handleItemClick(sectionIndex: number, event: SyntheticEvent) {
        this.props.onSectionClick(sectionIndex);
    }

    render() {
        const { handleItemClick } = this;
        const { items, currentSectionIndex } = this.props;

        return (
            <div className="section-menu">
                <ul className="list section-menu__list">
                    {items.map((item, index) => {
                        return <li className="item list__item" key={item.value}>
                            <Link href="/about/[id]" as={`/about/${item.value}`}>
                                <a className={currentSectionIndex === index ? 'item__link item__link_active' : 'item__link'}
                                    onClick={handleItemClick.bind(this, index)}
                                >{item.title}</a>
                            </Link>
                        </li>
                    })}
                </ul>

                <style jsx>{`
                    .list {
                        padding: 0;
                        margin: 0;
                        list-style-type: none;
                    }

                    .list {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex-wrap: wrap;

                        min-width: 220px;
                        max-width: 220px;
                    }

                    .item {
                        list-style-type: none;
                        position: relative;
                        width: 100%;
                        height: 15px;
                    }

                    .item:not(:last-child) {
                        margin-bottom: 32px;
                        display: inline-flex;
                    }

                    .item__link {
                        position: absolute;

                        font-family: Roboto;
                        font-weight: 300;
                        font-size: 13px;
                        line-height: 15px;
                        white-space: nowrap;

                        color: #505050;
                        letter-spacing: 0.567739px;
                        text-decoration: none;

                        cursor: pointer;
                    }

                    .item__link_active {
                        font-size: 14px;
                        line-height: 16px;
                        letter-spacing: 0.567739px;
                        font-weight: bold;
                        color: #262525;
                        text-transform: uppercase;

                        transition: all .1s linear;
                    }

                    .item__link::after{
                        content: '';
                        position: absolute;
                        width: 0;
                        left: -5px;
                        top: 50%;
                        z-index: -1;
                        height: 10px;

                        background-color: #EBD8CC;
                        transition: all .1s ease-in-out;
                    }

                    .item__link_active::after, .item__link:hover:after {
                        width: calc(100% + 10px);
                    }
                `}</style>
            </div>
        )
    }
};

export default SectionMenu;