import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCategoryId} from "../redux/slices/filterSlices";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {Index} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination ";
import {SearchContext} from "../App";

export const Home = () => {

    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filterSlices.categoryId)
    const sortType = useSelector((state) => state.filterSlices.sort.sortProperty)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }


    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)



    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.replace('+', '')
        const order = sortType.includes('+') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(
            `https://63ed1d643d9c852c3f565970.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map(obj => <Index key={obj.id} {...obj}/>)

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items"> {isLoading ? skeletons : pizzas}</div>
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    )
}