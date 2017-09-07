import React from 'react'
import ReactDOM from 'react-dom'
import data from './data'
import GridData from './grid-data'

const gridData = (
    <GridData
        data={data}
        itemsPerPageValues={[5, 10, 20, null]}
        itemsPerPageInitial={5}
        columns={[
            {
                field: 'postId',
                sortType: 'numeric'
            },
            {
                field: 'id',
                sortType: 'numeric'
            },
            {
                field: 'name'
            },
            {
                field: 'email'
            },
            {
                field: 'body'
            }
        ]}
    />
)

ReactDOM.render(gridData, document.getElementById('root'))