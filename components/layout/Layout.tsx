import { Component } from 'react';
import Header from '../header';
import Footer from '../footer';

class Layout extends Component {
    render() {
        const { children } = this.props;

        return <div className="layout">
            <Header />

            <div className="layout__content">
                {children}
                {!children && <div className="layout__empty-b"></div>}
            </div>

            <div className="layout__footer">
                <Footer />
            </div>

            <style jsx>{`
                .layout {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    height: 100%;
                    min-width: 1224px;
                    // min-height: 700px;

                    padding: 25px 25px 22px 25px;
                    box-sizing: border-box;
                }

                .layout__content {
                    height: 100%;

                    margin-top: 15px;
                    align-self: center; 
                    width: calc(100% - 70px);
                }
                
                .layout__empty-b {
                    height: 100%;
                    width: 100%;

                    background-color:  #F0F0F0;
                }

                .layout__footer {
                    height: 15px;
                    
                    padding: 23px 0 0 35px;
                }
            `}</style>
        </div>
    }
}

export default Layout;