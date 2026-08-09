import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";


export function Tasks() {


  const { user } = useAuth();


  const [tasks,setTasks] = useState([]);

  const [title,setTitle] = useState("");





  // Scroll reset when Tasks page opens
  useEffect(()=>{

    window.scrollTo({

      top:0,

      left:0,

      behavior:"smooth"

    });

  },[]);






  // Load tasks
  useEffect(()=>{

    if(user){

      loadTasks();

    }

  },[user]);







  async function loadTasks(){


    const {data} = await supabase

    .from("tasks")

    .select("*")

    .eq("user_id",user.id)

    .order("created_at",{ascending:false});



    setTasks(data || []);

  }







  async function addTask(e){

    e.preventDefault();


    if(!title.trim()) return;



    await supabase

    .from("tasks")

    .insert([

      {
        title,
        user_id:user.id,
      }

    ]);



    setTitle("");

    loadTasks();

  }








  async function toggleTask(task){


    await supabase

    .from("tasks")

    .update({

      completed:!task.completed

    })

    .eq("id",task.id);



    loadTasks();

  }








  async function deleteTask(id){


    await supabase

    .from("tasks")

    .delete()

    .eq("id",id);



    loadTasks();

  }








  const completed =

  tasks.filter(task=>task.completed).length;



  const progress =

  tasks.length

  ?

  Math.round((completed/tasks.length)*100)

  :

  0;







  return(

    <>

    <Navbar/>




    <div className="tasks-page">





      {/* Header */}


      <div className="tasks-hero">


        <div>


          <span className="task-label">

            Productivity Workspace

          </span>



          <h1>

            Manage Your Study Goals

          </h1>



          <p>

            Organize assignments, track progress,
            and stay consistent with your learning.

          </p>


        </div>




        <div className="progress-circle">

          {progress}%

        </div>



      </div>









      {/* Stats */}


      <div className="task-stats">


        <StatCard

        title="Total Tasks"

        value={tasks.length}

        />



        <StatCard

        title="Completed"

        value={completed}

        />



        <StatCard

        title="Remaining"

        value={tasks.length-completed}

        />


      </div>









      {/* Create Task */}


      <div className="create-task-card">


        <h2>

          Create New Task

        </h2>



        <p>

          Add your next study goal

        </p>





        <form

        onSubmit={addTask}

        className="task-form"

        >



          <input


          value={title}


          onChange={(e)=>setTitle(e.target.value)}


          placeholder="Enter your task..."


          />





          <button>

            Add Task

          </button>



        </form>



      </div>









      {/* Task List */}



      <div className="task-section">


        <div className="section-title">



          <h2>

            Your Tasks

          </h2>



          <span>

            {tasks.length} tasks

          </span>



        </div>








        <div className="task-grid">





        {

        tasks.map(task=>(



          <div

          key={task.id}

          className={

          task.completed

          ?

          "task-card completed"

          :

          "task-card"

          }

          >






            <div className="task-top">


              <h3>

                {task.title}

              </h3>




              <input

              type="checkbox"

              checked={task.completed}

              onChange={()=>toggleTask(task)}

              />


            </div>







            <div className="task-meta">



              <span>

                Study Task

              </span>




              <span>


              {

              task.completed

              ?

              "Completed"

              :

              "Pending"

              }


              </span>



            </div>







            <button

            className="delete-task"

            onClick={()=>deleteTask(task.id)}

            >

              Delete

            </button>





          </div>



        ))

        }





        {

        tasks.length===0 &&

        <div className="empty-task">


          No tasks yet. Create your first study goal.


        </div>


        }





        </div>



      </div>





    </div>




    </>

  )

}









function StatCard({title,value}){


return(


<div className="task-stat-card">


<p>

{title}

</p>


<h2>

{value}

</h2>


</div>


)


}



export default Tasks;
