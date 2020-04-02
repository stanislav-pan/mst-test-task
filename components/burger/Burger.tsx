import { Component } from 'react';

type BurglerTextPosition = 'left' | 'right';

interface BurgerPropsI {
    text?: string;
    textPosition?: BurglerTextPosition;
    /** Отображать просто лого? */
    asLogo?: boolean;

    onBurgerClick?: Function;
}

class Burger extends Component<BurgerPropsI> {
    private textPosition: BurglerTextPosition;

    constructor(props: BurgerPropsI) {
        super(props);

        this.textPosition = props.textPosition || 'right';
    }

    private handleBurgerClick = () => {
        const { onBurgerClick, asLogo } = this.props;
        if (!asLogo && onBurgerClick && typeof onBurgerClick === 'function') {
            onBurgerClick();
        }
    }

    render() {
        const { textPosition, handleBurgerClick } = this;
        const { text, asLogo } = this.props;

        return (
            <div className="burger">
                <div className="burger__icon" onClick={handleBurgerClick}>
                    {!asLogo && <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.998047 26.5521L26.5556 0.994995L28.005 2.44425L2.44665 28.0015L0.998047 26.5521ZM12.9987 26.5521L26.5556 12.9956L28.005 14.4435L14.4474 28.0015L12.9987 26.5521ZM14.5569 0.994995L0.998047 14.5532L2.44665 16.0009L16.0042 2.44425L14.5569 0.994995Z" fill="#F0F0F0" />
                    </svg>}
                </div >
                {text && <span className="burger__text">{text}</span>}

                <style jsx>{`
                    .burger {
                        display: flex;
                    }

                    .burger__icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;

                        width: 70px;
                        height: 70px;
                        background: #262525;
                    }

                    .burger__text {
                        font-family: Gilroy;
                        font-weight: 800;
                        font-size: 17px;
                        line-height: 21px;

                        letter-spacing: 0.290629px;
                        text-transform: uppercase;
                        white-space: nowrap;

                        color: #262525;
                    }
                `}</style>

                <style jsx>{`
                    .burger {
                        flex-direction: ${textPosition === 'left' ? 'row-reverse' : 'row'};
                    }

                    .burger__text {
                        ${textPosition === 'left' ? 'margin-right' : 'margin-left'}: calc(23px + 70px);
                    }

                    .burger__icon {
                        cursor: ${asLogo ? 'none' : 'pointer'}
                    }
                `}</style>
            </div >
        );
    }
};

export default Burger;