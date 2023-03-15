import React from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlices";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {Index} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination ";
import {SearchContext} from "../App";


export const Home = () => {

    const dispatch = useDispatch()
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)


    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('+', '')
        const order = sort.sortProperty.includes('+') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(
            `https://63ed1d643d9c852c3f565970.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then(res => {
            setItems(res.data)
            setIsLoading(false)
        })

        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}