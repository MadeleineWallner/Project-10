


const userSignIn = () => {

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <form>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email"></input>
                <label htmlFor="password">Password</label>
                <input id="pawssword" name="password" type="password"></input>
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary">Cancel</button>
            </form>
                <p>Don't have a user account? Click here to 
                <a href="/api/signup"> sign up</a>
                !
                </p>
            </div>
    )
}


export default userSignIn;