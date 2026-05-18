import React, { useState, useEffect, useContext } from "react";
import styles from "./ArticleEditForm.module.css";
import FormField from "./FormField/FormField.jsx";
import { success, error } from "../../../Utils/SmallFunc.js";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext.jsx";

function ArticleEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: "", content: "", image: null }); // ✅ Initialize properly
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, isAdmin } = useContext(AuthContext);

  // Ensure user authentication
  useEffect(() => {
    if (!isLogin) {
      error("You are not logged in. Please log in to edit an article.");
      navigate("/login");
      return;
    }
    if (!isAdmin) {
      error("You do not have permission to edit articles.");
      navigate("/");
      return;
    }
  }, [isLogin, isAdmin, navigate]);

  // Fetch article details
  useEffect(() => {
    const fetchArticleDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/articles/${id}/edit`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article details.");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.article) {
          throw new Error("Article data not found in response.");
        }

        setArticle({
          title: data.article.title, 
          content: data.article.content,
          image: data.orignalImageUrl,
        });
      } catch (err) {
        console.error(err);
        error("Unable to load article details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setArticle((prevArticle) => ({ ...prevArticle, image: files[0] }));
      setFileName(files[0].name);
    } else {
      setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!article.title.trim() || !article.content.trim()) {
      error("Title and content are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("article[title]", article.title);
    formData.append("article[content]", article.content);
  
    if (article.image instanceof File) {
      formData.append("article[image]", article.image);
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`http://localhost:8080/articles/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to update article.");
      }
  
      success("Article Edited Successfully");
      navigate("/articles");
    } catch (err) {
      console.error(err);
      error("Failed to update article");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Show loading while fetching article
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.articleEditForm}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Edit Article</h1>
          <FormField
            label="Article Title"
            inputType="text"
            name="title"
            inputClass={styles.inputField}
            value={article.title}
            onChange={handleChange}
            placeholder="Article Title"
            required
          />
        </div>

        <h2 className={styles.formSectionTitle}>Edit Article Description</h2>
        {article.image && (
          <div className={styles.orgImg}>
            <h3>Original Image</h3>
            <img src={article.image} alt="Original Article" id={styles.orgImage} />
          </div>
        )}

        <div className={styles.formSection}>
          <div className={styles.sectionContainer}>
            <div>
              <label className={styles.label}>Upload New Image</label>
              <div
                className={styles.articleImageContainer}
                onClick={() => document.getElementById("articleImage").click()}
              >
                <input
                  type="file"
                  id="articleImage"
                  name="image"
                  accept="image/*"
                  className={styles.visuallyHidden}
                  onChange={handleChange}
                />
                <span>{fileName || "Click to upload an image"}</span>
              </div>
            </div>

            <div className={styles.articleDescriptionContainer}>
              <FormField
                label="Article Content"
                inputType="textarea"
                name="content"
                inputClass={styles.textareaField}
                value={article.content}
                onChange={handleChange}
                required
              />
              <br />
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Update Article"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArticleEditForm;
