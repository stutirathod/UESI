import React, { useState, useEffect, useContext } from "react";
import { InputField } from "../../Utils/FormItems/Input/InputField";
import styles from "./ArticleForm.module.css";
import { success, error } from "../../Utils/SmallFunc";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";

export function ArticleForm() {
  const navigate = useNavigate();
  const [article, setArticleData] = useState({
    title: "",
    image: null,
    content: "",
  });

  const { isLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!article.title.trim() || !article.content.trim() || !article.image) {
      error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("article[title]", article.title);
    formData.append("article[content]", article.content);
    if (article.image) {
      formData.append("article[image]", article.image); // File upload
    }

    fetch("http://localhost:8080/articles", {
      method: "POST",
      body: formData, // No need for Content-Type header; fetch sets it automatically for FormData
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        success("Article Created Successfully");
        navigate("/articles");
      })
      .catch((err) => {
        console.error(err);
        error("Failed to create article");
      });
  };

  useEffect(() => {
    if (isLogin == false) {
      error("please login to create article");
      navigate("/login");
    }
  }, [isLogin]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleData((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
      noValidate
      encType="multipart/form-data"
    >
      {/* <Toaster richColors/> */}
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Create Article</h1>

        <InputField
          label="Article Title"
          id="articleTitle"
          value={article.title}
          onChange={(e) =>
            setArticleData((prev) => ({ ...prev, title: e.target.value }))
          }
          // name={"article[title]"}
          required
        />
      </div>

      <div className={styles.descriptionSection}>
        <h2 className={styles.heading}>Article Description</h2>

        <div>
          <label htmlFor="imageUpload" className={styles.label}>
            Article Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles["visually-hidden"]}
          />
          <div
            className={styles.imageUpload}
            onClick={() => document.getElementById("imageUpload").click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("imageUpload").click();
              }
            }}
          >
            {article.image ? article.image.name : "Click to upload image"}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="content" className={styles.label}>
            Article Content
          </label>
          <textarea
            id="content"
            className={styles.descriptionInput}
            value={article.content}
            onChange={(e) =>
              setArticleData((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Type here..."
            required
            // name="article[content]"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Article
        </button>
      </div>
    </form>
  );
}
