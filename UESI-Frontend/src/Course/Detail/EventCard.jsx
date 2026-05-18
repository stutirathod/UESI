import React, {useContext} from "react";
import styles from "./ProgramsPage.module.css";
import { Button } from "../../Utils/FormItems/Button/Button";
import { AuthContext } from "../../Utils/AuthContext";
import { success } from "../../Utils/SmallFunc";
import { useParams } from "react-router-dom";

export function EventCard({ title, description, url, isSecondary,key }) {
  const handledelete = () => {
    const { id } = useParams();
    fetch(`http://localhost:8080/courses/${id}/videos/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      // body: JSON.stringify({ id }),
    })
      .then(() => {
        success("Video deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        error("Unable to delete video");
      });
  }
  const {isAdmin} = useContext(AuthContext);
  return (
    <div className={isSecondary ? styles.event2 : styles.event}>
      <div className={isSecondary ? styles.div6 : styles.div4}>
        <div className={styles.titlevideo}>{title}</div>
        <div className={isSecondary ? styles.div7 : styles.div5}>
          {
            isAdmin && <Button variant="delete" onClick={handledelete}>Delete</Button>
          }
        </div>
      </div>
      <video
        width="300"
        height="200"
        controls={false}
        onClick={(e) => e.preventDefault()}
        style={{ pointerEvents: "none"}}
      >
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
}
