function responses(status, value=null) {
    if (status) {
        if (status === 'success-default') {
            return {code: 200, body: {type: 'SUCCESS'}}
        } else if (status === 'success-value') {
            return {code: 200, body: {type: 'SUCCESS', value: value}}
        } else if (value) {
            return {code: value, body: {type: 'FAIL', message: status}}
        }
        return {code: 400, body: {type: 'FAIL', message: status}}
    }
    return null
}

module.exports = responses