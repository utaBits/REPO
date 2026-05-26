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
            return data ;
    }
export async function VerifyOTP(userOtp , username) {
    const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Username': username
        },
        'credentials': 'include',
        body: JSON.stringify({ userOtp }),
    });
    const data = await response.json();
    return data;
}