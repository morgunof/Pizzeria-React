import React from 'react';

export function Categories({value, onClickCategory}) {
    // console.log(value)
     //const [activeIndex, setActiveIndex] = React.useState(0)

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) =>
                    <li key={index}
                        onClick={() =>
                            onClickCategory(index)}
                        className={value === index ? "active" : ''}>
                        {categoryName}
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