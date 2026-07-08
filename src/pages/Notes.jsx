import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";


export function Notes() {


  const { user } = useAuth();


  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");





  // Scroll reset

  useEffect(()=>{

    window.scrollTo({

      top:0,

      left:0,

      behavior:"smooth"

    });

  },[]);







  // Load notes

  useEffect(()=>{

    if(user){

      fetchNotes();

    }

  },[user]);







  async function fetchNotes(){


    const {data,error}=await supabase

    .from("notes")

    .select("*")

    .eq("user_id",user.id)

    .order("created_at",{ascending:false});



    if(!error){

      setNotes(data || []);

    }


  }









  async function addNote(e){


    e.preventDefault();


    if(!title.trim() || !content.trim()){

      return;

    }




    await supabase

    .from("notes")

    .insert([

      {

        title,

        content,

        user_id:user.id

      }

    ]);




    setTitle("");

    setContent("");

    fetchNotes();


  }









  async function deleteNote(id){


    await supabase

    .from("notes")

    .delete()

    .eq("id",id);



    fetchNotes();


  }









  // Search title + content

  const filteredNotes = notes.filter((note)=>{


    const searchText = search.toLowerCase().trim();



    if(!searchText){

      return true;

    }



    const noteTitle =

    String(note.title || "")
    .toLowerCase();



    const noteContent =

    String(note.content || "")
    .toLowerCase();





    return (

      noteTitle.includes(searchText)

      ||

      noteContent.includes(searchText)

    );


  });












return(

<>

<Navbar/>





<div className="notes-page">





{/* Hero */}


<div className="notes-hero">


<div>


<span className="notes-label">

Knowledge Workspace

</span>



<h1>

Organize Your Study Notes

</h1>



<p>

Create, manage and access all your learning
material in one place.

</p>


</div>





<div className="notes-count">


<h2>

{notes.length}

</h2>


<p>

Total Notes

</p>


</div>



</div>









{/* Search */}



<div className="notes-search">


<input


type="search"


placeholder="Search notes..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


/>


</div>









{/* Create Note */}



<div className="note-editor">



<div>


<h2>

Create New Note

</h2>


<p>

Capture your ideas and study material

</p>


</div>







<form onSubmit={addNote}>


<input

placeholder="Note title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>






<textarea

rows="6"

placeholder="Write your notes here..."

value={content}

onChange={(e)=>setContent(e.target.value)}

/>







<button>

Save Note

</button>



</form>


</div>









{/* Notes List */}



<div className="notes-section">





<div className="notes-heading">


<h2>

Your Notes

</h2>



<span>

{filteredNotes.length} Notes

</span>



</div>







<div className="notes-grid">





{

filteredNotes.length === 0 ? (



<div className="empty-notes">


<h3>

No notes found

</h3>


<p>

Try another keyword or create a new note.

</p>


</div>



)

:



filteredNotes.map(note=>(


<div

className="professional-note"

key={note.id}

>




<div className="note-top">


<h3>

{note.title}

</h3>



<div className="note-icon">

N

</div>


</div>







<p>

{note.content}

</p>








<div className="note-footer">


<span>

Study Note

</span>





<button

onClick={()=>deleteNote(note.id)}

>

Delete

</button>




</div>



</div>


))


}



</div>



</div>





</div>



</>

)

}



export default Notes;