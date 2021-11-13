module.exports = class Feature {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObject = { ...this.queryString }

        const excludedFields = ["page", "fields", "limit", "sort"]
        excludedFields.forEach(element => delete queryObject[element])

        //Filtering Fields
        const stringFilter = JSON.parse(
            JSON.stringify(queryObject).replace(
                /\b(gt|lt|gte|lte)\b/g,
                match => `$${match}`
            )
        )

        this.query.find(stringFilter)

        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sort_values = this.queryString.sort.split(",").join(" ")

            this.query = this.query.sort(sort_values)
        }
        return this
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ")

            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select("-__v")
        }
        return this
    }

    paginate() {
        const PageNumber = +this.queryString.page || 1
        const limit = +this.queryString.limit || 10
        const skip = (PageNumber - 1) * limit
        this.query = this.query.limit(limit).skip(skip)
        return this
    }

}