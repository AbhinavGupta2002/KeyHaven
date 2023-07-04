
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

export const getIconUrl = async (url: string) => {
    try {
        const response = await fetch(`https://besticon-demo.herokuapp.com/allicons.json?url=${url}`, {
            method: 'GET'
        })
        let responseValue = await response.json()
        if (!responseValue.icons.length) {
            return undefined
        }
        return responseValue.icons[0]?.url
    } catch (err) {
        console.log(`ERROR: ${err}`)
        return undefined
    }
}

export const sendEmail = async(requestData: {receiverID: string, title: string, content: string, type: string}) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/email`, {
            headers: {'Content-Type':'application/json'},
            method: "POST",
            body: JSON.stringify(requestData)
        })
        const responseValue = await response.json()
        if (responseValue.type === 'FAIL') {
            throw responseValue.message
        }
        return {type: 'SUCCESS'}
    } catch (err) {
        console.error(`ERROR: ${err}`)
        return {type: 'FAIL'}
    }
}

// Account is a user's account
interface getAccount {
    email: string
}

interface postAccount {
    
}

export const Account = {
    get: async (params: getAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/${params.email}`, {
            headers: {'Content-Type':'application/json'},
            method: "GET"
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    put: (params: postAccount) => {}
}

// PasswordAccount is the account for a key
interface getPasswordAccount {
    email: string
}

interface postPasswordAccount {
    title: string;
    username: string;
    password: string;
    url: string;
    iconUrl: string;
}

interface putPasswordAccount {
    title: string;
    prevTitle: string;
    username: string;
    password: string;
    url: string;
    iconUrl: string;
}

interface deletePasswordAccount {
    email: string,
    title: string
}

export const PasswordAccount = {
    getAll: async (params: getPasswordAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount/${params.email}`, {
            headers: {'Content-Type':'application/json'},
            method: "GET"
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    post: async (account: postPasswordAccount, email: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount/${email}`, {
            headers: {'Content-Type':'application/json'},
            method: "POST",
            body: JSON.stringify(account)
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    put: async (account: putPasswordAccount, email: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount/${email}`, {
            headers: {'Content-Type':'application/json'},
            method: "PUT",
            body: JSON.stringify(account)
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    delete: async (params: deletePasswordAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount/${params.email}/${params.title}`, {
            headers: {'Content-Type':'application/json'},
            method: "DELETE"
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    }
}