import { useRouter } from 'next/router';
import React from 'react';
import PageTemplate, { PageDataOneI } from '../../components/page-template/PageTemplate';

export const sectionsList: PageDataOneI[] = [
    {
        title: 'Архитектура',
        value: 'архитектура',
        text: 'Оригинальная архитектура жилого комплекса бизнес-класса «Первомайская» формирует современный стиль жизни. Оригинальная архитектура жилого комплекса бизнес-класса «Первомайская» формирует современный стиль жизни.',
        imgUrl: '/img/architecture.jpg'
    },
    {
        title: 'Благоустройство',
        value: 'благоустройство',
        text: 'Текст отсутствует'
    },
    {
        title: 'Безопастность',
        value: 'безопастность',
        text: 'Современный двор европейского уровня — территория для детей, игр на свежем воздухе и вечерних Современный двор европейского уровня — территория для детей, игр на свежем воздухе и вечерних',
        imgUrl: '/img/security.jpg'
    },
    {
        title: 'Инженерия',
        value: 'инженерия',
        text: 'Текст отсутствует'
    },
    {
        title: 'Инфраструктура',
        value: 'инфраструктура',
        text: 'Текст отсутствует'
    },
    {
        title: 'Транспортная доступность',
        value: 'транспортная доступность',
        text: 'Текст отсутствует'
    }
]

const Page = (props) => {
    const router = useRouter();
    let currentUrl = router.query.id;

    if (sectionsList?.length && !sectionsList.some(section => section.value === currentUrl)) {
        React.useEffect(() => {
            router.push(router.pathname, `/about/${sectionsList[0].value}`);
        });
    }

    return <div className='container'>
        <PageTemplate data={sectionsList}></PageTemplate>
    </div>
}

Page.getInitialProps = async function (context) {
    const { id } = context.query;

    return { id };
};

export default Page;
