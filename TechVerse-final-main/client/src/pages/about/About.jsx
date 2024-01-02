
import projectImage from './projectImage.png';
import './about.css';

const About = () => {
    return(
        <section className="AboutUs">
            <div className="imageArea">
                <img src={projectImage} alt="displayImg" />
            </div>
            <div className="content">
                <div className="body">
                    <p> We are a group of 4th semester Computer Science students at Kathmandu University (KU). This is our end semester project valued for 2 credits. 
                        <br></br>Project members:  
                        <br></br> 
                        Dipin Panta<br></br>
                        Anupama Neupane<br></br>
                        Sushan Shrestha<br></br>
                        Gaurab Wagle <br></br>
                        <br></br>
                        We aim to provide a platform, Techverse, which is designed to provide you with a seamless and user-friendly experience.<br></br> Whether you are a tech enthusiast, a professional in the industry, or simply curious about the latest tech trends, our app is your go-to resource.
                    </p>
                </div>
            </div>
        </section>
    );
}
export default About;
