import "./About.css";
import { Footer } from "./Utils";

export default function About() {
  return (
    <div>
      <div className="container my-3">
        <h1 className="text-center">Students</h1>
        <div className="d-flex justify-content-center row g-2">
          <div className="col col-lg-4 text-center">
            <img
              src="images/aloks.JPEG"
              alt="Alok Shrestha"
              className="author-img rounded-circle border border-3"
              width="140"
              height="140"
            />
            <h2 className="fw-normal">Alok Shrestha</h2>
            <p>
              Student of COM S 3190
              <br />
              <a href="mailto:aloks@iastate.edu">aloks@iastate.edu</a>
            </p>
          </div>
          <div className="col col-lg-4 text-center">
            <img
              src="images/adam.JPG"
              alt="Adam Lee"
              className="author-img rounded-circle border border-3"
              width="140"
              height="140"
            />
            <h2 className="fw-normal">Adam Lee</h2>
            <p>
              Student of COM S 3190
              <br />
              <a href="mailto:adamal22@iastate.edu">adamal22@iastate.edu</a>
            </p>
          </div>
        </div>

        <h1 className="text-center">Instructor</h1>
        <div className="d-flex justify-content-center row g-1">
          <div className="col col-lg-4 text-center">
            <img
              src="images/aldaco.jpg"
              alt="Abraham Aldaco"
              className="author-img rounded-circle border border-3"
              width="140"
              height="140"
            />
            <h2 className="fw-normal">Abraham Aldaco</h2>
            <p>
              Teacher/Instructor of COM S 3190
              <br />
              <a href="mailto:aaldaco@iastate.edu">aaldaco@iastate.edu</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
