function responses(status) {
    if (status) {
        if (status === 'success-default') {
            return {code: 200, body: {type: 'SUCCESS'}}
        }
        return null
    }
    return null
}

export default responses