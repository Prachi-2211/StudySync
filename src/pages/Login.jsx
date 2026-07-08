import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function Login(){

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState("");



  async function handleSubmit(e){

    e.preventDefault();

    setError("");

    const {error} = await signIn(
      email,
      password
    );


    if(error){

      setError(error.message);

    }
    else{

      navigate("/dashboard");

    }

  }



return(

<div
style={{
minHeight:"100vh",
background:"#f8fafc",
display:"flex",
alignItems:"center",
justifyContent:"center",
padding:"20px"
}}
>


<div
style={{
width:"400px",
background:"white",
padding:"40px",
borderRadius:"25px",
boxShadow:
"0 20px 50px rgba(0,0,0,0.08)"
}}
>


<h1
style={{
textAlign:"center",
color:"#2563eb"
}}
>
StudySync
</h1>


<p
style={{
textAlign:"center",
color:"#64748b"
}}
>
Welcome back. Sign in to continue learning.
</p>




<form onSubmit={handleSubmit}>


<input
type="email"
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={inputStyle}
/>



<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={inputStyle}
/>



{error &&

<p
style={{
color:"#dc2626"
}}
>
{error}
</p>

}



<button
style={buttonStyle}
>
Sign In
</button>


</form>



<p
style={{
textAlign:"center",
marginTop:"20px",
color:"#64748b"
}}
>
Don't have an account?

<Link
to="/register"
style={{
color:"#2563eb",
marginLeft:"5px"
}}
>
Create account
</Link>

</p>



</div>


</div>

);

}


const inputStyle={

width:"100%",
padding:"14px",
marginTop:"18px",
borderRadius:"12px",
border:"1px solid #cbd5e1",
fontSize:"15px",
boxSizing:"border-box"

};


const buttonStyle={

width:"100%",
marginTop:"25px",
padding:"14px",
borderRadius:"12px",
border:"none",
background:"#2563eb",
color:"white",
fontSize:"16px",
cursor:"pointer"

};


export default Login;