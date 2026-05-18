import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import { useParams, Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const ConfirmationBox = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/donation-success/${id}`,{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setCharity(data.charity);
        } else {
          setError("Failed to fetch order details");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch order details");
        setLoading(false);
      });
  }, [id]);

  const generatePDF = () => {
    if (!charity || !charity.user){
      console.log(charity, charity.user);
      console.error("Invalid charity data");
      return;
    };
  
    const doc = new jsPDF();
    
    // **Add Logo (Replace with Your Image URL)**
    const imgUrl = "/UESI_Logo.png"; // Update with your actual logo URL
    doc.addImage(imgUrl, "PNG", 160, 10, 30, 30); // (x, y, width, height)
  
    // **Header**
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Donation Receipt", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your generous donation!\n\n", 20, 30);
    doc.line(20, 35, 190, 35); // Horizontal line
  
    // **User Details**
    doc.setFont("helvetica", "bold");
    doc.text("Donor Information:", 20, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${charity.user.first_name + " " + charity.user.last_name}`, 20, 55);
    doc.text(`Email: ${charity.user.email}`, 20, 65);
    doc.text(`Phone: ${charity.user.phone_number}`, 20, 75);
    doc.text(`Address: ${charity.user.address}, ${charity.user.pincode}`, 20, 85);
  
    // **Donation Details**
    doc.setFont("helvetica", "bold");
    doc.text("Donation Details:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Amount: ${charity.amount.toLocaleString()}`, 20, 110);
    doc.text(`Transaction ID: ${charity.paymentIntentId}`, 20, 120);
    doc.text(`Date: ${new Date(charity.charity_date).toDateString()}`, 20, 130);
    doc.text(`Session ID: ${charity.sessionId}`, 20, 140);
  
    // **Thank You Message**
    doc.setFont("helvetica", "bold");
    doc.text("We appreciate your support!", 20, 160);
    
    // **Save as PDF**
    doc.save(`Donation_Receipt_${charity.user.first_name + "_" + charity.user.last_name}.pdf`);
  };

  return (
    <section className={styles.confirmationBox}>
      {/* <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9899201092c7bfc2834c98467ac836e9a2c3727a"
        alt="Donation confirmation"
        className={styles.confirmationImage}
      /> */}
      <h1 className={styles.thankYou}>Thank You For Your Donation</h1>
      
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2 className={styles.error}>{error}</h2>
      ) : (
        <div>
          <h2 className={styles.orderNumber}>Your Donation is recevied</h2>
          <button className={styles.generateReceipt} onClick={generatePDF}>Generate Receipt</button>
        </div>
        
      )}

      <Link
        className={styles.homeButton}
        to={"/"}
      >
        Home
      </Link>
    </section>
  );
};

export default ConfirmationBox;
