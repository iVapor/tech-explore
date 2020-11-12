const col = function () {
    return [
        {
            title: 'Date',
            key: 'date'
        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age',
            filters: this.ageFilter,
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.age > 25;
                } else if (value === 2) {
                    return row.age < 25;
                }
            }
        },
        {
            title: 'Address',
            key: 'address',
            filters: [
                {
                    label: 'New York',
                    value: 'New York'
                },
                {
                    label: 'London',
                    value: 'London'
                },
                {
                    label: 'Sydney',
                    value: 'Sydney'
                }
            ],
            filterMethod (value, row) {
                return row.address.indexOf(value) > -1;
            }
        }
    ]
}

export  { col }
