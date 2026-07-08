import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { askAI } from "../services/groq";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";


export function AI() {


const {user}=useAuth();


const [question,setQuestion]=useState("");
const [messages,setMessages]=useState([]);
const [loading,setLoading]=useState(false);



// PAGE SCROLL TO TOP WHEN OPENING AI PAGE
useEffect(()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

},[]);





async function handleAsk(e){

e.preventDefault();


if(!question.trim()) return;


const currentQuestion=question;



setMessages(prev=>[
...prev,
{
role:"user",
text:currentQuestion
}
]);



setQuestion("");

setLoading(true);



try{


const response=await askAI(currentQuestion);



setMessages(prev=>[
...prev,
{
role:"ai",
text:response
}
]);





// SAVE AI HISTORY

if(user){


const {error}=await supabase
.from("ai_history")
.insert({

user_id:user.id,

question:currentQuestion,

answer:response

});



if(error){

console.log(
"Save error:",
error.message
);

}


}



}
catch(error){


setMessages(prev=>[
...prev,
{
role:"ai",
text:"Something went wrong. Please try again."
}
]);


}



setLoading(false);


}






return(

<>

<Navbar/>


<div className="ai-page">





<section className="ai-hero">


<div>


<span className="ai-tag">
AI Powered Learning
</span>


<h1>
StudySync AI Assistant
</h1>


<p>
Your personal AI tutor for explanations,
summaries and study guidance.
</p>


</div>



<div className="ai-status-card">


<div className="status-dot"></div>

AI Online


</div>


</section>









<section className="ai-chat-container">



<div className="chat-top">


<div>

<h2>
AI Study Partner
</h2>


<p>
Ask questions and learn faster
</p>


</div>



<div className="assistant-badge">

Active

</div>


</div>








<div className="chat-box">



{
messages.length===0 &&


<div className="empty-state">


<div className="ai-circle">

AI

</div>



<h2>
Start your conversation
</h2>



<p>
Ask anything about your studies
</p>



</div>

}







{
messages.map((msg,index)=>(


<div

key={index}

className={
msg.role==="user"
?
"message-wrapper user"
:
"message-wrapper ai"
}

>


<div className="message-bubble">

{msg.text}

</div>


</div>


))

}







{
loading &&


<div className="message-wrapper ai">


<div className="message-bubble">

AI is thinking...

</div>


</div>


}



</div>









<form

className="ai-input-box"

onSubmit={handleAsk}

>


<input

value={question}

onChange={
e=>setQuestion(e.target.value)
}

placeholder="Ask your study question..."

/>




<button>

Ask AI

</button>


</form>





</section>








<section className="ai-feature-grid">


<Feature

title="Explain Concepts"

text="Understand difficult topics easily."

/>



<Feature

title="Smart Summaries"

text="Create quick revision notes."

/>



<Feature

title="Study Guidance"

text="Get personalized learning help."

/>


</section>





</div>


</>

);

}






function Feature({title,text}){


return(

<div className="ai-feature-card">


<h3>
{title}
</h3>


<p>
{text}
</p>


</div>

)

}



export default AI;