export async function fetchAuth(username, password) {
const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        console.log(response)
            const data = await response.json();
            console.log(data , 'fetchauth')
            return data ;
    }
export async function VerifyOTP(userOtp , username) {
    const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Username': username
        },
        credentials: 'include',
        body: JSON.stringify({ userOtp }),
    });
    const data = await response.json();
    console.log(data , 'fromOTPverify')
    return data;
}

export async function validateToken(){
    const res = await fetch('http://localhost:3000/auth/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    const answer = await res.json()
    if(!answer.success){
        window.location.href = '/'
    }else{
        return answer
    }
    return answer
    }