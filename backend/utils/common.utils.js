const routeErrorCatch = (res, err) => {
    res.status(400).json('Error: ' + err);
}

module.exports = {
    routeErrorCatch
}