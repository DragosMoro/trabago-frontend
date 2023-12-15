
const Register = () => {
  return (
    <div className="min-w-full min-h-full bg-rose-700 ">
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-xl">
            <h1 className="text-3xl font-bold text-gray-800">Register</h1>
            <div className="flex flex-col items-center justify-center w-72 h-72 bg-gray-100 rounded-xl">
                <input
                className="w-64 h-10 px-5 py-1 text-gray-700 bg-gray-200 rounded-full focus:outline-none"
                type="text"
                placeholder="Username"
                />
                <input
                className="w-64 h-10 px-5 py-1 mt-3 text-gray-700 bg-gray-200 rounded-full focus:outline-none"
                type="text"
                placeholder="Email"
                />
                <input
                className="w-64 h-10 px-5 py-1 mt-3 text-gray-700 bg-gray-200 rounded-full focus:outline-none"
                type="password"
                placeholder="Password"
                />
                <button className="w-64 h-10 px-5 py-1 mt-3 text-gray-700 bg-gray-200 rounded-full focus:outline-none">
                Register
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Register