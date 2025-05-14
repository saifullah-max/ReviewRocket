function Login() {

    const googleLoginHandler = async () => {
        console.log("Button clicked")
        try {
            window.location.href = "http://localhost:8003/auth/google";
        } catch (error) {
            console.log("Error:", error)
        }
    }

    return (
        <div>
            <h3>Login Page:</h3>
            <button onClick={googleLoginHandler}>Sign in with Google</button>
        </div>
    )
}

export default Login