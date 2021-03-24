import image0 from "../assets/avatars/man0.png";
import image1 from "../assets/avatars/man1.png";
import image2 from "../assets/avatars/man2.png";
import image3 from "../assets/avatars/man3.png";
import image4 from "../assets/avatars/man4.png";
import image5 from "../assets/avatars/woman0.png";
import image6 from "../assets/avatars/woman1.png";
import image7 from "../assets/avatars/woman2.png";
import image8 from "../assets/avatars/woman3.png";
import image9 from "../assets/avatars/woman4.png";

import { FaUser, FaUsers, FaEnvelope, FaList, FaSearch } from "react-icons/fa";

export const avatars = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

export const sidebarLinks = [
  { path: "/", text: "پروفایل من", icon: <FaUser className="me-2 me-md-3" /> },
  {
    path: "/posts",
    text: "جدیدترین پست ها",
    icon: <FaList className="me-2 me-md-3" />,
  },
  {
    path: "/mails",
    text: "پیام ها",
    icon: <FaEnvelope className="me-2 me-md-3" />,
  },
  {
    path: "/users",
    text: "لیست کاربران",
    icon: <FaUsers className="me-2 me-md-3" />,
  },
  {
    path: "/search",
    text: "جـستجو",
    icon: <FaSearch className="me-2 me-md-3" />,
  },
];
