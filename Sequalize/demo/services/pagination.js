 const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows:rows } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { total_rows:totalItems, data:rows, total_pages:totalPages, current_page:currentPage };
  };
module.exports ={
    getPagination,
    getPagingData,
};