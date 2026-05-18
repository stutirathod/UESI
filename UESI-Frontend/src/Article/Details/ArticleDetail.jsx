import React, { useState, useEffect, useContext } from "react";
import styles from "./BlogPost.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { success, error } from "../../Utils/SmallFunc";
import { FeedbackForm } from "../../feedback/Creation/FeedbackForm";
import { AuthContext } from "../../Utils/AuthContext";
import { Button } from "../../Utils/FormItems/Button/Button";
import FeedbackSection from "../../Feedback/Show/FeedbackSection";

export default function ArticleDetail() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/articles/${id}`, {
      // ✅ Moved the comma inside fetch
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article details");
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setIsOwner(data.isOwner);
        console.log(data);
        console.log(isOwner);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, [id]);

  const handledelete = () =>{
    fetch(`http://localhost:8080/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({ id }),
    })
    .then(() => {
      success("Article deteled succesfully");
      navigate("/articles");
    })
    .catch((err) => {
      console.error(err)
      error("Unable to delete article")
    })
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <article className={styles.blogPost}>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.metaInfo}>
        <span className={styles.author}>
          {article.author.first_name + " " + article.author.last_name}
        </span>
        <time className={styles.date}>
          {new Date(article.published_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <div className={styles.metaInfo}>
        <Link to={`/articles/${id}/edit`}>
          {isOwner && <Button variant="primary">Edit</Button>}
        </Link>
        {isOwner && <Button variant="delete" onClick={handledelete}>Delete</Button>}
      </div>
      <img
        loading="lazy"
        src={article.image.path}
        className={styles.featuredImage}
        alt="Blog post featured image"
      />
      <div className={styles.content}>{article.content}</div>
      {article.feedbacks.length > 0 && (
        <FeedbackSection feedbacks={article.feedbacks} id={article._id} name="articles" />
      )}
      {isLogin && (
        <FeedbackForm url={`http://localhost:8080/articles/${id}/feedbacks`} />
      )}
    </article>
  );
}
