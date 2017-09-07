import React from 'react'

export default class DataPrinter extends React.PureComponent {

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.data, null, 4)}</pre>
                <select
                    onChange={({ target }) => this.props.onItemsPerPageChange(target.value ? Number(target.value) : null)}
                    value={this.props.itemsPerPage || ''}
                >{this.props.itemsPerPageValues.map(v => <option key={v ? v.toString() : 'all'} value={v ? v.toString() : ''}>{v || 'All'}</option>)}</select>
                <input type="number" min="1" step="1" value={this.props.page} onChange={({ target }) => this.props.onPageChange(Number(target.value))} />
                <input type="text" value={this.props.search} onChange={({ target }) => this.props.onSearchChange(target.value)} />
                <p>Total: {this.props.total}, filtered: {this.props.filtered}</p>
            </div>
        )
    }

}