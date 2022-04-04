
// If the REST API return a "500 Internal Server Error" http status code
const UnhandledError = () => {
    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>

        </div>
    )
}

export default UnhandledError;