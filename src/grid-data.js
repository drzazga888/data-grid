import React from 'react'
import DataPrinter from './data-printer'

function paginate(data, itemsPerPage, page) {
    if (itemsPerPage) {
        const start = itemsPerPage * (page - 1)
        return data.slice(start, start + itemsPerPage)
    }
    return data
}

function filter(data, search) {
    if (search) {
        return data.filter(row => {
            const vals = Object.values(row)
            for (let i = 0; i < vals.length; ++i) {
                if ((new String(vals[i])).indexOf(search) !== -1) {
                    return true
                }
            }
            return false
        })
    }
    return data
}

function sortArray(data, columns, orderBy, orderAsc) {
    // determine field
    return data
}

function prepareData(data, columns) {
    return data
}

export default class DataGrid extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            itemsPerPage: this.props.itemsPerPageValues ? (this.props.itemsPerPageInitial || this.props.itemsPerPageValues[0]) : null,
            search: '',
            orderBy: this.props.orderBy,
            orderAsc: this.props.orderAsc
        }
    }

    onItemsPerPageChange = itemsPerPage => this.setState({ itemsPerPage })

    onPageChange = page => this.setState({ page })

    onSearchChange = search => this.setState({ search })

    onOrderChange = (orderBy, orderAsc) => this.setState({ orderBy, orderAsc })

    render() {
        const { data, renderer, itemsPerPageValues, columns } = this.props
        const { page, itemsPerPage, search, orderBy, orderAsc } = this.state

        const filteredData = filter(data, search)
        const orderedData = sortArray(filteredData, columns, orderBy, orderAsc)
        const paginatedData = paginate(orderedData, itemsPerPage, page)
        const readyData = prepareData(paginatedData, columns)

        const toRenderer = {
            data: readyData,
            page,
            itemsPerPage,
            itemsPerPageValues,
            total: data.length,
            filtered: filteredData.length,
            search,            
            onItemsPerPageChange: this.onItemsPerPageChange,
            onPageChange: this.onPageChange,
            onSearchChange: this.onSearchChange,
            onOrderChange: this.onOrderChange
        }

        return React.cloneElement(renderer, toRenderer)
    }

    static defaultProps = {
        renderer: <DataPrinter />,
        itemsPerPageValues: [10, 25, 50],
        itemsPerPageInitial: null // first value of the itemsPerPageValues
    }

}
