import React from 'react';

export function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0)

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) =>
                    <li key={value}
                        onClick={() =>
                        setActiveIndex(index)}
                        className={activeIndex === index ? "active" : ''}>
                        {value}
                    </li>
                )}
            </ul>
        </div>
    )
}


// <li onClick={() => onClickCategories(1)} className={activeIndex === 1 ? "active" : ''}>Мясные</li>
// <li onClick={() => onClickCategories(2)} className={activeIndex === 2 ? "active" : ''}>Вегетарианская</li>
// <li onClick={() => onClickCategories(3)} className={activeIndex === 3 ? "active" : ''}>Гриль</li>
// <li onClick={() => onClickCategories(4)} className={activeIndex === 4 ? "active" : ''}>Острые</li>
// <li onClick={() => onClickCategories(5)} className={activeIndex === 5 ? "active" : ''}>Закрытые</li>