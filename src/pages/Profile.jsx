import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { supabase } from "../services/supabase";
import { useAuth } from "../Context/AuthContext";

export default function Profile() {


  const { user, signOut } = useAuth();


  const [editing, setEditing] = useState(false);


  const [profile, setProfile] = useState({

    full_name: "",

    bio: "",

    college: "",

    course: "",

    semester: "",

  });






  // Scroll reset when Profile page opens

  useEffect(()=>{

    window.scrollTo({

      top:0,

      left:0,

      behavior:"smooth"

    });

  },[]);






  // Load profile

  useEffect(() => {

    if (user) loadProfile();

  }, [user]);








  async function loadProfile() {


    const { data } = await supabase

      .from("profiles")

      .select("*")

      .eq("id", user.id)

      .single();




    if (data) {


      setProfile(data);


    } else {


      await supabase

      .from("profiles")

      .insert({

        id: user.id,

        full_name: "",

        bio: "",

        college: "",

        course: "",

        semester: "",

      });


    }

  }








  async function saveProfile() {


    await supabase

      .from("profiles")

      .update({

        full_name: profile.full_name,

        bio: profile.bio,

        college: profile.college,

        course: profile.course,

        semester: profile.semester,

      })

      .eq("id", user.id);




    alert("Profile Updated");


    setEditing(false);

  }







  return (

    <>

      <Navbar />



      <div className="profile-page">





        <div className="profile-header">


          <div className="avatar">

            {profile.full_name

            ?

            profile.full_name[0].toUpperCase()

            :

            user.email[0].toUpperCase()}

          </div>




          <div>

            <h1>

              {profile.full_name || "StudySync User"}

            </h1>


            <p>

              {user.email}

            </p>


          </div>


        </div>








        <div className="profile-stats">



          <div className="stat-card">

            <h2>
              📚
            </h2>

            <p>
              Student
            </p>

          </div>





          <div className="stat-card">

            <h2>
              🎯
            </h2>

            <p>
              Focused Learner
            </p>

          </div>





          <div className="stat-card">

            <h2>
              🤖
            </h2>

            <p>
              AI Powered
            </p>

          </div>




        </div>









        <div className="profile-grid">





          <div className="card">



            <h2>
              Profile Information
            </h2>




            <label>
              Full Name
            </label>


            <input

              disabled={!editing}

              value={profile.full_name}

              onChange={(e)=>

                setProfile({

                  ...profile,

                  full_name:e.target.value

                })

              }

            />







            <label>
              Bio
            </label>


            <textarea

              rows="3"

              disabled={!editing}

              value={profile.bio}

              onChange={(e)=>

                setProfile({

                  ...profile,

                  bio:e.target.value

                })

              }

            />








            <label>
              College
            </label>


            <input

              disabled={!editing}

              value={profile.college}

              onChange={(e)=>

                setProfile({

                  ...profile,

                  college:e.target.value

                })

              }

            />







            <label>
              Course
            </label>


            <input

              disabled={!editing}

              value={profile.course}

              onChange={(e)=>

                setProfile({

                  ...profile,

                  course:e.target.value

                })

              }

            />








            <label>
              Semester
            </label>


            <input

              disabled={!editing}

              value={profile.semester}

              onChange={(e)=>

                setProfile({

                  ...profile,

                  semester:e.target.value

                })

              }

            />







            <br/>

            <br/>





            {editing ? (


              <button

              className="btn-primary"

              onClick={saveProfile}

              >

                Save Changes

              </button>



            ) : (


              <button

              className="btn-primary"

              onClick={()=>setEditing(true)}

              >

                Edit Profile

              </button>



            )}



          </div>









          <div className="card">



            <h2>
              Account Overview
            </h2>





            <div className="account-item">

              <span>
                Email
              </span>


              <strong>
                {user.email}
              </strong>


            </div>








            <div className="account-item">

              <span>
                Status
              </span>


              <strong>
                Active
              </strong>


            </div>








            <div className="account-item">


              <span>
                Member Since
              </span>


              <strong>

                {new Date(
                  user.created_at
                ).toLocaleDateString()}

              </strong>


            </div>








            <button

            className="logout-btn"

            onClick={signOut}

            style={{

              marginTop:"20px",

              width:"100%"

            }}

            >

              Logout

            </button>






          </div>






        </div>





      </div>


    </>

  );

}
