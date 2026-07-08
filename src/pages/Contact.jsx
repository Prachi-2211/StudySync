import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { sendEmail } from "../services/resend";

export default function Contact() {


  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });


  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);





  // Scroll reset when Contact page opens
  useEffect(()=>{

    window.scrollTo({

      top:0,

      left:0,

      behavior:"smooth"

    });

  },[]);







  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }








  async function handleSubmit(e) {

    e.preventDefault();


    if (!form.name || !form.email || !form.message) {

      setStatus("Please fill all fields.");

      return;

    }



    setLoading(true);

    setStatus("");



    try {


      await sendEmail(
        form.name,
        form.email,
        form.message
      );



      setStatus("✅ Message sent successfully!");



      setForm({

        name: "",

        email: "",

        message: "",

      });



    }  catch (err) {
  console.error(err);
  setStatus("");
}


    setLoading(false);


  }






  return (
    <>
      <Navbar />


      <div style={styles.page}>


        <div style={styles.card}>


          <div style={styles.left}>


            <h1 style={styles.title}>
              Contact StudySync
            </h1>


            <p style={styles.subtitle}>
              We'd love to hear from you. Send your questions,
              suggestions or feedback.
            </p>




            <div style={styles.infoBox}>

              <h3>
                Email
              </h3>

              <p>
                support@studysync.com
              </p>

            </div>





            <div style={styles.infoBox}>

              <h3>
                Response Time
              </h3>

              <p>
                Within 24 Hours
              </p>

            </div>





            <div style={styles.infoBox}>

              <h3>
                Support
              </h3>

              <p>
                Project Help • AI Support • Technical Issues
              </p>

            </div>



          </div>







          <div style={styles.right}>


            <h2 style={{marginBottom:20}}>
              Send Message
            </h2>




            <form onSubmit={handleSubmit}>


              <input

                type="text"

                name="name"

                placeholder="Your Name"

                value={form.name}

                onChange={handleChange}

                style={styles.input}

              />





              <input

                type="email"

                name="email"

                placeholder="Your Email"

                value={form.email}

                onChange={handleChange}

                style={styles.input}

              />







              <textarea

                rows={6}

                name="message"

                placeholder="Write your message..."

                value={form.message}

                onChange={handleChange}

                style={styles.textarea}

              />







              <button

                disabled={loading}

                style={styles.button}

              >

                {loading
                ?
                "Sending..."
                :
                "Send Message"}

              </button>



            </form>







            {status && (

              <p

              style={{

                marginTop:20,

                textAlign:"center",

                color:"#2563eb",

                fontWeight:"600",

              }}

              >

                {status}

              </p>

            )}





          </div>



        </div>



      </div>


    </>
  );

}






const styles = {

page: {

minHeight:"100vh",

background:
"linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:30,

},


card: {

width:"100%",

maxWidth:1100,

display:"grid",

gridTemplateColumns:"1fr 1fr",

background:"rgba(255,255,255,0.95)",

borderRadius:25,

overflow:"hidden",

boxShadow:"0 25px 60px rgba(0,0,0,.2)",

},


left: {

background:
"linear-gradient(135deg,#2563eb,#7c3aed)",

color:"white",

padding:45,

},


right: {

padding:45,

},


title: {

fontSize:40,

marginBottom:20,

},


subtitle: {

fontSize:17,

lineHeight:1.7,

marginBottom:35,

},


infoBox: {

background:"rgba(255,255,255,.12)",

padding:18,

borderRadius:15,

marginBottom:20,

},


input: {

width:"100%",

padding:15,

marginBottom:18,

borderRadius:12,

border:"1px solid #ddd",

fontSize:15,

outline:"none",

boxSizing:"border-box",

},


textarea: {

width:"100%",

padding:15,

borderRadius:12,

border:"1px solid #ddd",

fontSize:15,

resize:"none",

boxSizing:"border-box",

},


button: {

width:"100%",

marginTop:20,

padding:15,

border:"none",

borderRadius:12,

background:
"linear-gradient(135deg,#2563eb,#7c3aed)",

color:"white",

fontSize:17,

cursor:"pointer",

fontWeight:"600",

},


};