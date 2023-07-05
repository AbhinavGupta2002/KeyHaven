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

function emailContentBuilder(body) {
    let builder = `<h3>Dear ${body.firstName},</h3><h3>${body.content}</h3>`
    if (body.type === 'general') {
        builder += `${process.env.CLIENT_URL}/changePassword/...`
    } else if (body.type === 'verifyAccount') {
        builder += `${process.env.CLIENT_URL}/verifyEmail/...`
    } else {
        builder += `<h3>This email was sent due to a technical difficulty from our side. Kindly visit our website and inform us about this.</h3>`
    }
    builder += `<h3>Sincerely, KeyHaven</h3>`
    return builder
}

module.exports = {
    responses,
    emailContentBuilder
};