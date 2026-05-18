import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { LandingPage } from "./Home/LandingPage";
import { LoginPage } from "./Login/LoginPage";
import ProgramForm from "./Programs/Create/ProgramForm";
import { ArticleForm } from "./Article/Create/ArticleForm";
import { CourseForm } from "./Course/Create/CourseForm";
import { Footer } from "./Utils/Footer/Footer";
import { ProgramsPage } from "./Programs/Main/ProgramsPage";
import { Toaster } from "react-hot-toast";
import { EventDetails } from "./Programs/Detail/eventDetails/EventDetails";
import { ArticleHome } from "./Article/Main/ArticleHome";
import SignupForm from "./Registration/SignupForm";
import { CharityPage } from "./Charity/Main/CharityPage";
import ArticleDetail from "./Article/Details/ArticleDetail";
import { AboutUs } from "./About/aboutUs/AboutUs";
import ArticleEditForm from "./Article/Edit/ArticleEditForm/ArticleEditForm";
import { CourseEditor } from "./Course/Edit/courseEditor/CourseEditor";
import EditProgramForm from "./Programs/Edit/Program/EditProgramForm";
import UploadVideo from "./Course/Video/Add/UploadVideo";
import { AuthProvider } from "./Utils/AuthContext";
import { NavBar } from "./Utils/NavBar/NavBar";
import { Courses } from "./Course/Main/courses/Courses";
import { CoursesPage } from "./Course/Detail/CoursesPage";
import { VideoDetails } from "./Course/Video/Detail/VideoDetails";
import ForgotPassword  from "./forgetPassword/sendEmail/ForgotPassword";
import ResetPassword from './forgetPassword/ResetPassword/ResetPassword';
import ConfirmationBox from "./Charity/Success/ConfirmationBox";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="/courses" element={<Courses/> }/>
        <Route path="/articles" element={<ArticleHome />} />
        <Route path="/give" element={<CharityPage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/programs/new" element={<ProgramForm />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/courses/new" element={<CourseForm />} />
        <Route path="/programs/:id" element={<EventDetails />} />
        <Route path="/courses/:id" element={<CoursesPage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/programs/:id/edit" element={<EditProgramForm />} />
        <Route path="/articles/:id/edit" element={<ArticleEditForm />} />
        <Route path="/courses/:id/edit" element={<CourseEditor />} />
        <Route path="/courses/:id/video/new" element={<UploadVideo />} />
        <Route path="courses/:id/videos/:videoId" element={<VideoDetails />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/donation-success/:id" element={<ConfirmationBox />} />
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
