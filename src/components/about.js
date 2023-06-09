import style from "../assets/styles.module.css"; 
export const About = () => {
    return (
      <div className={style.bigblue}>
        <img src={require("../assets/prantos.png")} alt="logo" />
        <p>
          The learning process of musicians involves a lot of commitment, and
          proficiency in reading music sheets is one of the most important
          competences for them. However, mastering this skill can be challenging
          and complex. PRANTOS is a system where the user can input a music
          sheet picture, which is then converted and returned as the
          corresponding audio. In addition, the system provides more features
          than a simple image conversion. It also allows the users to playback
          the converted audio at different speeds by adjusting the tempo, making
          it easier to learn complex compositions.
        </p>
        <h2>Meet our team!</h2>
        <img src={require("../assets/grandes3.png")} alt="team" className={style.grandes}/>  
        <h3>Try now!</h3>  
      </div>

      
    );
  }



  