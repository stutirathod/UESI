import React, { useState, useEffect, useContext } from "react";
import styles from "./article.module.css";
import { ArticleCard } from "./ArticleCard";
import { HeroSection } from "./HeroSection";
import { NewsletterSection } from "./NewsletterSection";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";
import ArticleViewChart from "./ArticleViewChart ";
import { Button } from "../../Utils/FormItems/Button/Button";
import * as XLSX from "xlsx";

export const ArticleHome = () => {
  const [articleData, setArticleData] = useState([]);
  const [IMAGE, setImage] = useState(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/4bcf9c85ac6fa22f081fb761b0729a5f8f94574caaaf63060b2b72c003557561?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
  );
  const { isAdmin, isLogin } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8080/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticleData(data);
      })
      .catch((err) => {
        console.error(err);
        error("Failed to fetch Articles");
      });
  }, []);

  const generateArticlesExcel = () => {
    if (!articleData || articleData.length === 0) {
      alert("No articles available to generate a report.");
      return;
    }

    // Convert articles to worksheet format
    const data = articleData.map((article, index) => ({
      "Sr No": index + 1,
      "Article Title": article.title,
      Author: `${article.author?.first_name || ""} ${article.author?.last_name || ""}`.trim(),
      "Published Date": article.published_date ? new Date(article.published_date).toLocaleDateString() : "N/A",
      "Visited Count": article.visited_count || 0,
      Content: article.content.substring(0, 200) + "...", // Trim content for brevity
      "Image URL": article.image?.path || "N/A",
      Approved: article.approved ? "Yes" : "No",
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Articles Report");

    // Generate and trigger file download
    XLSX.writeFile(workbook, "Articles_Report.xlsx");
  };

  return (
    <main className={styles.articleHome}>
      <HeroSection />
      <h2 className={styles.latestArticle}>Latest Article</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
      {!isAdmin && isLogin && (
        
          <Link to={`/articles/new`} className={styles.newForm}>
            <Button variant="primary">Create New </Button>
          </Link>
          
        
      )}
      {
        isLogin && (
          <Button variant="secondary" onClick={generateArticlesExcel}>Generate Report</Button>
        )
      }
      </div>
      <section className={styles.courses}>
        {articleData.map((article, index) => (
          <Link to={`/articles/${article._id}`} className={styles.link}>
            <ArticleCard
              key={`course-${index}`}
              image={article.image.path}
              title={article.title}
              description={
                article.author.first_name + " " + article.author.last_name
              }
            />
          </Link>
        ))}
      </section>
      <br />
      <hr />
      <br />
      {isAdmin && <ArticleViewChart articles={articleData} />}
      <NewsletterSection />
    </main>
  );
};
