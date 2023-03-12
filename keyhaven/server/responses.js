function responses(status) {
    if (status) {
        if (status === 'success-default') {
            return {code: 200, body: {type: 'SUCCESS'}}
        }
        return {code: 400, body: {type: 'FAIL', message: status}}
    }
    return null
}

module.exports = responses