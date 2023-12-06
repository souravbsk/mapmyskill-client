import { createBrowserRouter } from "react-router-dom";
// import Main from "../layouts/Main";
import Users from "../Pages/AdminPages/Users/Users";
import Sagment from "../Pages/AdminPages/Sagment/Sagment";
import Subject from "../Pages/AdminPages/Subject/Subject";
import instance from "../config/axios.config";
import MasterData from "../Pages/AdminPages/MasterData/MasterData";
import AdminLayout from "../layouts/AdminLayout";
import Main from "../layouts/Main";
import Home from "../Pages/UserPages/Home/Home";
import SignUp from "../Pages/UserPages/SignUp/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Pages/UserPages/SignIn/SignIn";
import DashboardLayout from "../layouts/DashboardLayout";
import TeacherBasicDetails from "../Pages/ProfilePages/TeacherProfilePages/TeacherBasicDetails/TeacherBasicDetails";
import UserDashboard from "../Shared/UserDashboard/UserDashboard";
import DashboardLanding from "../layouts/DashboardLanding";
import StudentBasicDetails from "../Pages/ProfilePages/StudentProfilePages/StudentBasicDetails/StudentBasicDetails";
import ContactInformation from "../Pages/ProfilePages/StudentProfilePages/ContactInformation/ContactInformation";
import StudentPreference from "../Pages/ProfilePages/StudentProfilePages/StudentPreference/StudentPreference";
import TeacherProficiencyDetails from "../Pages/ProfilePages/TeacherProfilePages/TeacherProficiencyDetails/TeacherProficiencyDetails";
import TeacherQualification from "../Pages/ProfilePages/TeacherProfilePages/TeacherQualification/TeacherQualification";
import ProfileResetPassword from "../Shared/ProfileResetPassword/ProfileResetPassword";
import RequestTutorLayout from "../layouts/RequestTutorLayout";
import HireTutor from "../Shared/RequestTutor/HireTutor/HireTutor";
import RequestContactInformation from "../Shared/RequestTutor/RequestContactInformation/RequestContactInformation";
import TeacherPersonalInformation from "../Pages/ProfilePages/TeacherProfilePages/TeacherPersonalInformation/TeacherPersonalInformation";
import EmailVerifyCard from "../components/EmailVerifyCard/EmailVerifyCard";
import VerificationForm from "../Pages/UserPages/SignUp/VerificationForm/VerificationForm";
import DocumentUpload from "../Shared/DocumentUpload/DocumentUpload";
import VerifyCard from "../Pages/AdminPages/VerifyCard/VerifyCard";
import Subscription from "../Shared/Subscription/Subscription";
import SubcriptionPlan from "../Pages/AdminPages/SubcriptionPlan/SubcriptionPlan";
import TeachersViewDetails from "../components/TeachersViewDetails/TeachersViewDetails"
import TuitionJobDetails from "../components/TuitionJobDetails/TuitionJobDetails";
import TuitionJobs from "../Pages/UserPages/TuitionJobs/TuitionJobs";
import StudentRequirement from "../Shared/UserDashboard/StudentDashboard/StudentRequirement/StudentRequirement";
import ThankYouPage from "../Shared/ThankYouPage/ThankYouPage";
import ViewAllTeachersDetails from "../Pages/UserPages/ViewAllTeachersDetails/ViewAllTeachersDetails"
import TeacherSendMessage from "../Pages/ProfilePages/StudentProfilePages/TeacherSendMessage/TeacherSendMessage";
import UnlockedContact from "../Pages/UserPages/UnlockedContact/UnlockedContact";
import Enquiries from "../Pages/UserPages/Enquiries/Enquiries";
import TeacherAllReviews from "../Pages/ProfilePages/TeacherProfilePages/TeacherAllReviews/TeacherAllReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <SignIn></SignIn>,
      },
    ],
  },
  {
    path: "/request-tutor",
    element: <RequestTutorLayout></RequestTutorLayout>,
    children: [
      {
        path: "/request-tutor/hire-tutor",
        element: <HireTutor></HireTutor>,
      },
      {
        path: "/request-tutor/contact",
        element: <RequestContactInformation></RequestContactInformation>,
      },
      {
        path: "/request-tutor/verification",
        element: <VerificationForm></VerificationForm>,
      },
    ],
  },

  {
    path: "/",
    element: <DashboardLanding></DashboardLanding>,
    children: [
      {
        path: "/myaccount/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/myaccount/upgrade",
        element: <Subscription></Subscription>,
      },
      {
        path: "/myaccount/thankyou",
        element: <ThankYouPage></ThankYouPage>,
      },
      {
        path:"/myaccount/tuition-jobs",
        element:<TuitionJobs></TuitionJobs>
      },
      {
        path:"/myaccount/reviewed-received",
        element:<TeacherAllReviews></TeacherAllReviews>
      },
      {
        path: "/myaccount/tuitionpost/:id",
        element: <TuitionJobDetails></TuitionJobDetails>,
      },
      {
        path: "/myaccount/teachers/:id",
        element: <TeachersViewDetails></TeachersViewDetails>,
      },
      {
        path: "/myaccount/teachers",
        element: <ViewAllTeachersDetails></ViewAllTeachersDetails>,
      },
      {
        path: "/myaccount/requirement",
        element:<StudentRequirement></StudentRequirement>,
      },
      {
        path: "/myaccount/unlockedcontact",
        element:<UnlockedContact></UnlockedContact>,
      },

      {
        path: "/myaccount/enquiries",
        element:<Enquiries></Enquiries>,
      },

      //message send
      {
        path:"/myaccount/send-message/:id",
        element:<TeacherSendMessage></TeacherSendMessage>

      }

    ],
  },
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/myaccount/personal-information",
        element: <StudentBasicDetails></StudentBasicDetails>,
      },
      {
        path: "/myaccount/contact-information",
        element: <ContactInformation></ContactInformation>,
      },
      {
        path: "/myaccount/reset-password",
        element: <ProfileResetPassword></ProfileResetPassword>,
      },
      {
        path: "/myaccount/delete-account",
        element: <div>delete account</div>,
      },

      //teacher dashboard component start
      {
        path: "/myaccount/basic-details",
        element: <TeacherBasicDetails></TeacherBasicDetails>,
      },
      {
        path: "/myaccount/proficiency",
        element: <TeacherProficiencyDetails></TeacherProficiencyDetails>,
      },
      {
        path: "/myaccount/qualification",
        element: <TeacherQualification></TeacherQualification>,
      },
      {
        path: "/myaccount/personal-Info",
        element: <TeacherPersonalInformation></TeacherPersonalInformation>,
      },
      {
        path: "/myaccount/upload-documents",
        element: <DocumentUpload></DocumentUpload>,
      },
    ],
  },
  {
    path: "/tutor-app/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <div>hello home</div>,
      },
      {
        path: "/tutor-app/admin/users",
        element: <Users></Users>,
      },
      {
        path: "/tutor-app/admin/segment",
        element: <Sagment></Sagment>,
      },
      {
        path: "/tutor-app/admin/subject",
        element: <Subject></Subject>,
      },
      {
        path: "/tutor-app/admin/master-data",
        element: <MasterData></MasterData>,
      },
      {
        path: "/tutor-app/admin/verify-card",
        element: <VerifyCard></VerifyCard>,
      },
      {
        path: "/tutor-app/admin/subcription-plan",
        element: <SubcriptionPlan></SubcriptionPlan>,
      },
    ],
  },
]);

export default router;
