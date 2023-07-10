
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

export const sendEmail = async(requestData: {receiverID: string, firstName: string, title: string, content: string, type: string}) => {
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
interface putAccount {
    firstName: string;
    lastName: string;
}

interface changeMasterPassword {
    email: string;
    token: string;
    password: string;
}

interface checkMasterPasswordChange {
    email: string;
    token: string;
}

export const Account = {
    get: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
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
    getIsVerified: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/isVerified`, {
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
    getLoggedIn: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/isLoggedIn`, {
                headers: {'Content-Type':'application/json'},
                method: "GET"
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            return {type: 'FAIL'}
        }
    },
    put: async (account: putAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
                headers: {'Content-Type':'application/json'},
                method: "PUT",
                body: JSON.stringify(account)
            })
            const responseValue = await response.json()
            if (response.status !== 200) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    reqLogin: async (userData: { email: String; password: String; }) => { // logs in a user if credentials are valid
        const requestData = {
            email: userData.email,
            password: userData.password
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/login`, {
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
    },
    reqLogout: async () => { // logs out a user
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/logout`, {
                headers: {'Content-Type':'application/json'},
                method: "POST"
            })
            const responseValue = await response.json()
            if (response.status !== 200) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    reqSignUp: async (userData: { email: String; password: String; }) => { // signs up a user
        const requestData = {
            email: userData.email,
            password: userData.password
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/signup`, {
                headers: {'Content-Type':'application/json'},
                method: "POST",
                body: JSON.stringify(requestData)
            })
            const responseValue = await response.json()
            if (responseValue.type === 'FAIL' || !responseValue.type) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    verifyEmail: async (userData: {email: String, token: String}) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/verifyEmail/${userData.email}/${userData.token}`, {
                headers: {'Content-Type':'application/json'},
                method: "GET"
            })
            const responseValue = await response.json()
            if (responseValue.type === 'FAIL' || !responseValue.type) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    changeMasterPassword: async (props: changeMasterPassword) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/changeMasterPassword/${props.email}/${props.token}`, {
            headers: {'Content-Type':'application/json'},
            method: "PUT",
            body: JSON.stringify({password: props.password})
            })
            const responseValue = await response.json()
            if (responseValue.type === 'FAIL' || !responseValue.type) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    checkMasterPasswordChange: async (props: checkMasterPasswordChange) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/checkMasterPasswordChange/${props.email}/${props.token}`, {
            headers: {'Content-Type':'application/json'},
            method: "GET"
            })
            const responseValue = await response.json()
            if (responseValue.type === 'FAIL' || !responseValue.type) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    },
    delete: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
            headers: {'Content-Type':'application/json'},
            method: "DELETE"
            })
            const responseValue = await response.json()
            if (responseValue.type === 'FAIL' || !responseValue.type) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    }
}

// PasswordAccount is the account for a key
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
    title: string
}

export const PasswordAccount = {
    getAll: async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount`, {
            headers: {'Content-Type':'application/json'},
            method: "GET"
            })
            const responseValue = await response.json()
            if (response.status === 401) {
                console.log(responseValue, '401 fix')
            }
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return responseValue.value
        } catch (err) {
            console.error(`ERROR: ${err}`)

            return {type: 'FAIL'}
        }
    },
    post: async (account: postPasswordAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount`, {
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
    put: async (account: putPasswordAccount) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount`, {
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/passwordAccount/${params.title}`, {
            headers: {'Content-Type':'application/json'},
            method: "DELETE"
            })
            const responseValue = await response.json()
            if (responseValue.type === ('FAIL' || undefined)) {
                throw responseValue.message
            }
            return {type: 'SUCCESS'}
        } catch (err) {
            console.error(`ERROR: ${err}`)
            return {type: 'FAIL'}
        }
    }
}