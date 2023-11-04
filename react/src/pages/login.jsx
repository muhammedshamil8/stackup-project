import {Link} from "react-router-dom";

export default function Login(){


    return (
      <div className="form animated fadeInDown">
      <form  >
        <h1 className="title">Login into your account</h1>
        
        <input  type="email" placeholder="Email"/>
        <input  type="password" placeholder="password"/>
        <button className="btn btn-block">Login</button>
        <p className="message">
          Not Registered? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
    )
}

