import { Component, createRef, RefObject } from 'react';
import Link from 'next/link';
import LinkDetail from '../link-detail';

interface MainContentPropsI {
    title: string;
    text: string;
    currentImgUrl: string;
    previousImgUrl?: string;

    currentSectionIndex: number;
    previousSectionIndex: number;
    pageCount: number;
}

interface MainContentStateI {
    defaultDescriptionPosition: number;
    croppedText: string;
    wasTextCropped: boolean;
}

class MainContent extends Component<MainContentPropsI, MainContentStateI> {
    descriptionBlockRef: RefObject<HTMLDivElement>;
    descriptionTextRef: RefObject<HTMLSpanElement>;

    constructor(props) {
        super(props);

        this.descriptionBlockRef = createRef();
        this.descriptionTextRef = createRef();

        this.state = {
            defaultDescriptionPosition: this.getDefaultDescriptionPosition(0, 0),
            croppedText: '',
            wasTextCropped: false
        };
    }

    private getDefaultDescriptionPosition(previousSectionIndex: number, currentSectionIndex: number) {
        return previousSectionIndex < currentSectionIndex ? 60 : -60;
    }

    componentDidMount() {
        this.showAnimationForDescription();

        setTimeout(_ => {
            const [croppedText, wasTextCropped] = this.getCroppedText(this.props.text, 3, this.descriptionTextRef.current);
            this.setState(_ => ({ croppedText, wasTextCropped }));
        }, 200);
    }

    /**
     * Функция для обрезания текста до определённого количества строк
     * @param text исходный текст
     * @param lineCount количество строк, до которых нужно обрезать текст
     * @param target элемент DOM дерева, под размеры которого выполняется усечение
     * @returns 1 элемент - результатирующий текст, 2 элемент - был ли текст обрезан
     */
    getCroppedText(text: string, lineCount: number, target: HTMLElement) {
        const trimedText = text.trim();

        const lineHeightAsString = target.style.lineHeight.replace('px', '');
        const lineHeightAsNumber = lineHeightAsString !== '' ? parseInt(lineHeightAsString, 10) : 20;

        const textItems = trimedText.split(' ');

        /** DOM элемент, куда будет производиться вставка текста */
        let textEl = document.createElement('div');
        textEl.style.fontFamily = 'Times New Roman';

        let resultText: string;
        let wasTextCropped = false;

        for (let index = 0; ; index++) {
            if (textItems.length === index + 1) {
                resultText = textEl.textContent + ' ' + textItems[index];
                break;
            }

            // Производим вставку элементов до тех пор, пока количество строк 
            // не превышает указанное в парметрах значение или пока элементы не закончатся
            if (textEl.clientHeight >= lineHeightAsNumber * lineCount - 5) {
                wasTextCropped = true;
                break;
            }

            resultText = textEl.textContent;
            textEl.textContent += ' ' + textItems[index];

            target.append(textEl);
        }

        textEl.remove();
        textEl = null;

        return [resultText, wasTextCropped] as [string, boolean];
    }

    componentWillReceiveProps(props: MainContentPropsI) {
        const { previousSectionIndex, currentSectionIndex } = props;

        if (previousSectionIndex === currentSectionIndex) {
            return;
        }

        const [croppedText, wasTextCropped] = this.getCroppedText(props.text, 3, this.descriptionTextRef.current);

        this.setState(_ => ({
            defaultDescriptionPosition: this.getDefaultDescriptionPosition(previousSectionIndex, currentSectionIndex),
            croppedText, wasTextCropped
        }));

        this.showAnimationForDescription();
    }

    showAnimationForDescription() {
        setTimeout(_ => {
            this.setState(_ => ({
                defaultDescriptionPosition: 0
            }));
        }, 300);
    }

    render() {
        const { title, currentImgUrl, previousImgUrl, previousSectionIndex, currentSectionIndex, pageCount } = this.props;
        const { descriptionBlockRef, descriptionTextRef } = this;
        const { defaultDescriptionPosition, croppedText, wasTextCropped } = this.state;

        return <div className="main-content">
            <div className="description-b main-content__description-b">
                <div className="description-b__description" ref={descriptionBlockRef}>
                    <h3 className="description-b__header">{title}</h3>
                    <span style={{ lineHeight: '30px' }} className="description-b__text" ref={descriptionTextRef}>
                        {croppedText}
                        {wasTextCropped && <div className="description-b__link-detail">
                            <LinkDetail href="/[id]" as={`/features`} />
                        </div>}
                    </span>
                    <div className="description-b__pages">
                        <span className="description-b__page_active">{currentSectionIndex + 1}</span>
                        <span className="description-b__page"> / {pageCount}</span>
                    </div>
                </div>
            </div>
            {currentImgUrl &&
                <div className="imgs">
                    <div className="main-content__img main-content__img_current">
                        <img src={currentImgUrl}></img>
                    </div>
                    {previousImgUrl && previousImgUrl !== currentImgUrl && <div className="main-content__img main-content__img_prev">
                        <img src={previousImgUrl}></img>
                    </div>}
                </div>
            }

            <style jsx>{`
                .main-content {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }

                .description-b {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    width: 100%;
                    height: 100%;
                    background: #F0F0F0;
                }

                .description-b__description {
                    position: relative;
                }

                @media screen and (max-width : 1300px) {
                    .description-b__description {
                        text-align: center;
                    }

                    .description-b__pages {
                        left: 30px;
                    }
                }

                .description-b__description {
                    transform: translateY(${defaultDescriptionPosition}px);
                    opacity: ${defaultDescriptionPosition === 0 ? 1 : 0};

                    transition: transform .30s ease-in-out, 
                        ${defaultDescriptionPosition === 0 && 'opacity .50s ease-in-out'};
                }

                .description-b__header {
                    margin: 0;
                    margin-bottom: 40px;

                    font-family: Gilroy;
                    font-weight: 800;
                    font-size: 44px;
                    line-height: 54px;

                    letter-spacing: -0.0255199px;
                    text-transform: uppercase;

                    color: #262525;
                }

                .description-b__text {
                    display: inline-block;

                    width: 435px;
                    height: 90px;

                    font-family: Roboto;
                    // font-family: Times New Roman;
                    font-weight: 400;
                    font-size: 18px;

                    letter-spacing: -0.0220791px;

                    color: #262525;
                }

                .description-b__link-detail {
                    position: absolute;
                    display: inline-block;
                    margin-left: 10px;
                }

                .description-b__pages {
                    position: absolute;
                    bottom: -150px;

                    font-family: Gilroy;
                    font-weight: 300;

                    font-size: 17px;
                    line-height: 20px;

                    color: #505050;
                }

                .description-b__page_active {
                    color: #262525;
                }

                .main-content__img, .main-content__img img {
                    height: 100%;
                    width: 100%;
                }

                .main-content__img {
                    height: ${defaultDescriptionPosition === 0 ? '100%' : '0'};
                    transition: ${defaultDescriptionPosition === 0 && 'height .15s linear'};
                }

                .main-content__current {
                    position: relative;
                    z-index: 2;
                }

                .main-content__img_prev {
                    position: absolute;
                    top: 0;
                    z-index: -1;
                    height: 100%;
                    transition: height .15s linear;
                }

                .imgs {
                    display: flex;

                    position: relative;
                    width: 100%;
                    height: 100%; 

                    background-color: #F0F0F0;
                }

                .imgs {
                    align-items: ${previousSectionIndex < currentSectionIndex ? 'flex-start' : 'flex-end'};
                }
            `}</style>
        </div>;
    }
}

export default MainContent;