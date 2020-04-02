import { Component } from 'react';
import Layout from '../layout';
import SectionMenu from '../section-menu';
import MainContent from '../main-content';
import { RouterContext } from '../../contexts/routerContext';
import { NextRouter } from 'next/router';

export interface PageDataOneI {
    title: string;
    text: string;
    value: string;
    imgUrl?: string;
}

interface PageTemplatePropsI {
    data: PageDataOneI[];
}

interface PageTemplateStateI {
    currentSectionIndex: number;
    previousSectionIndex?: number;
}

class PageTemplate extends Component<PageTemplatePropsI, PageTemplateStateI> {
    static contextType = RouterContext;

    componentWillMount() {
        this.setState(_ => {
            return {
                currentSectionIndex: this.getCurrentPageIndex(this.props),
                previousSectionIndex: 0
            };
        })
    }

    getCurrentPageIndex(props: PageTemplatePropsI) {
        const currentRouter: NextRouter = this.context;

        const { data } = props;

        let currentPageIndex: number;

        data.forEach((page, index) => {
            if (index !== undefined && page.value === currentRouter.query.id) {
                currentPageIndex = index;
            }
        });

        return currentPageIndex || 0;
    }

    onSectionClick(previousSectionIndex: number, currentSectionIndex: number) {
        this.setState(_ => ({ currentSectionIndex, previousSectionIndex }));
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { data } = this.props;
        const { currentSectionIndex, previousSectionIndex } = this.state;

        const currentSection = data[currentSectionIndex];
        const previousSection = data[previousSectionIndex];

        const sectionMenuItems = data.map(({ title, value }) => ({ title, value }));

        return <Layout>
            {data.length !== 0 &&
                <div className="content">
                    <div className="content__section-menu">
                        <SectionMenu
                            items={sectionMenuItems}
                            currentSectionIndex={currentSectionIndex}
                            onSectionClick={this.onSectionClick.bind(this, currentSectionIndex)}
                        />
                    </div>
                    <MainContent
                        title={currentSection?.title}
                        text={currentSection?.text}
                        currentImgUrl={currentSection?.imgUrl}
                        currentSectionIndex={currentSectionIndex}
                        previousSectionIndex={previousSectionIndex}
                        previousImgUrl={previousSection?.imgUrl}
                        pageCount={data.length}
                    ></MainContent>
                </div>
            }

            <style jsx>{`
                .content {
                    position: relative;
                    display: flex;
                    align-items: center;

                    height: 100%;
                }

                .content__section-menu {
                    margin-right: 5.83%;
                }

            `}</style>
        </Layout>
    };
}

export default PageTemplate;
