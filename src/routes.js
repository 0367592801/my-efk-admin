/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import SeasonManage from "views/SeasonManage/SeasonManage.js";
import LessonManage from "views/LessonManage/LessonManage.js";
import UserManage from "views/UserManage/UserManage.js";
import TestExamManage from "views/TestExamManage/TestExamManage.js";
import Model3DManage from "views/Model3DManage/Model3DManage.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/userManage",
    name: "User Manage",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserManage,
    layout: "/admin",
  },
  {
    path: "/lessonManage",
    name: "Lesson Manage",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: LessonManage,
    layout: "/admin",
  },
  {
    path: "/seasonManage",
    name: "Season Manage",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: SeasonManage,
    layout: "/admin",
  },
  {
    path: "/TestExamManage",
    name: "Test Exam Manage",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: TestExamManage,
    layout: "/admin",
  },
  {
    path: "/model3Dmanage",
    name: "Model 3D Manage",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Model3DManage,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin",
  },
];

export default dashboardRoutes;
