export const query = (req, res, next) => {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.line) {
      filter.line = { $in: req.query.line };
    }

    if (req.query.category) {
      filter.category = { $in: req.query.category };
    }

    if (req.query.sort) {
      sort[req.query.sort] = req.query.order
        ? req.query.order === "desc"
          ? -1
          : 1
        : 1;
    }

    if (req.query.search) {
      filter["$or"] = [{ title: { $regex: req.query.search, $options: "i" } }];
    }

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    req.filter = filter;
    req.sort = sort;
    req.skip = skip;
    req.limit = limit;

    next();
}