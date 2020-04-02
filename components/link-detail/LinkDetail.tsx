import Link from "next/link";

interface LinkDetailPropsI {
    href: string;
    as: string;
}

const LinkDetail = (props: LinkDetailPropsI) => {
    return <Link href={props.href} as={props.as}>
        <a className="link-detail">
            <div className="link-detail__dots">
                <div className="link-detail__dot"></div>
                <div className="link-detail__dot"></div>
                <div className="link-detail__dot"></div>
            </div>

            <style jsx>{`
                .link-detail {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    width: 28px;
                    height: 28px;

                    background: #262525;
                }

                .link-detail__dots {
                    display: flex;
                    justify-content: space-evenly;

                    width: 14px;
                }

                .link-detail__dot {
                    display: inline-block;

                    width: 2px;
                    height: 2px;

                    background: white;
                }
            `}</style>
        </a>
    </Link>
};

export default LinkDetail;