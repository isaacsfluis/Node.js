export default function pagination(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize

        const results = {}

        try {
            results.total = await model.countDocuments(req.filter).exec()
            req.paginatedResults = results
            results.pages = Math.ceil(results.total / pageSize)
            results.currentPage = page
            results.results = await model.find(req.filter).skip(skip).limit(pageSize).exec()
            next();

        } catch (error) {
            res.status(500).send({ message: "Server Error: " + error.message });
        }
    }
};