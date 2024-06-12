const ProtectedRoute = ({children}) => {
    // return localStorage.getItem("accessToken") ? children : <Navigate to="/" />
    return children;
}

export default ProtectedRoute;
