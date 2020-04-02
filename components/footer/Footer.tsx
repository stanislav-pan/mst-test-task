

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer__text">
                Разработано в MST      |      2018
            </span>
            <style jsx>{`
                .footer__text {
                    font-family: Gilroy;
                    font-weight: 300;
                    font-size: 13px;
                    line-height: 15px;

                    letter-spacing: 0.175729px;
                    text-transform: uppercase;

                    color: #505050;
                }
            `}</style>
        </footer>
    );
};

export default Footer;