
// logs in a user if credentials are valid
export const reqLogin = async (userData: { email: String; password: String; }) => {
    const requestData = {
        email: userData.email,
        password: userData.password
    };
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            headers: {'Content-Type':'application/json'},
            method: "POST",
            body: JSON.stringify(requestData)
        })
        const responseValue = await response.json()
        if (responseValue.type === 'FAIL') {
            throw responseValue.message
        } else {
            console.log(responseValue.value)
        }
        //localStorage.setItem('bearerToken', JSON.stringify(responseValue.value))
        return {type: 'SUCCESS'}
    } catch (err) {
        console.error(`ERROR: ${err}`)
        return {type: 'FAIL'}
    }
}
