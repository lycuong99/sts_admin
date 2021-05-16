// @material-ui/icons
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import AllUser from "../src/components/AllUser/AllUser.js";
import CompanyList from "./components/CompanyList/CompanyList.js";
import Profile from "./components/Profile/Profile.js";
import Statistical from "./components/Statistical/Statistical.js";

const dashboardRoutes = [
  {
    path: "/user",
    name: "All User",
    icon: Person,
    component: AllUser,
    layout: "/home",
  },
  {
    path: "/company",
    name: "Company",
    icon: "content_paste",
    component: CompanyList,
    layout: "/home",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: LibraryBooks,
    component: Profile,
    layout: "/home",
  },
  {
    path: "/statistical",
    name: "Statistical",
    icon: Notifications,
    component: Statistical,
    layout: "/home",
  },
];

export default dashboardRoutes;
