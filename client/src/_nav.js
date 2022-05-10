import {
  AreaChartOutlined,
  TeamOutlined,
  LoginOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export const routes = [
  {
    key: "1",
    icon: <TeamOutlined />,
    label: "Organizaciones",
    path: "",
  },
  {
    key: "2",
    icon: <AreaChartOutlined />,
    label: "Panel",
    path: "dashboard",
  },
  {
    key: "3",
    icon: <ProfileOutlined />,
    label: "Perfil",
    path: "profile",
  },
  {
    key: "4",
    icon: <LoginOutlined />,
    label: "Serrar Sesion",
    path: "logout",
  },
];
