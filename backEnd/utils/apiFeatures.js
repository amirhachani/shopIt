class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options:
              "i" /* <== this option is for the search to be CASE INSENTITIVE */,
          },
        } : {};

    // To get the keyword Object =====> console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // the query copy without deleting the keyword since the keyword is not in mongoDB database ===> console.log(queryCopy);

    // Remove the fields from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    
    // Advanced filter for price, ratings etc... 
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    
    // the query copy after deleting one of the fields====>> console.log(queryCopy);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage){
      const currentPage = Number(this.queryStr.page) || 1 ;
      const skip = resPerPage * (currentPage - 1)

      this.query = this.query.limit(resPerPage).skip(skip)
      return this
  }
}

module.exports = APIFeatures;
