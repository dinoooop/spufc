import "./styles/admin.css";
import "./styles/admin-responsive.css";
import "./styles/front.scss";
import "./styles/front-responsive.scss";
import "./styles/navigation.scss";
import "./styles/modal.scss";
import "./styles/grid.css";
import "./styles/mp.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./front/pages/HomeScreen";
import ModuleIndexScreen from "./admin/module/ModuleIndexScreen";
import ModuleCreateScreen from "./admin/module/ModuleCreateScreen";
import ModuleEditScreen from "./admin/module/ModuleEditScreen";
import ModuleGenerateScreen from "./admin/module/ModuleGenerateScreen";

import FlushScreen from "./admin/general/FlushScreen";

import UserIndexScreen from "./admin/user/UserIndexScreen";
import UserCreateScreen from "./admin/user/UserCreateScreen";
import UserEditScreen from "./admin/user/UserEditScreen";

import AuthLoginScreen from "./admin/auth/AuthLoginScreen";
import AuthRegisterScreen from "./admin/auth/AuthRegisterScreen";
import AuthVerifyScreen from "./admin/auth/AuthVerifyScreen";
import AuthForgotPasswordScreen from "./admin/auth/AuthForgotPasswordScreen";
import AuthResetPasswordScreen from "./admin/auth/AuthResetPasswordScreen";
import AuthProfileScreen from "./admin/auth/AuthProfileScreen";
import AuthSecurityScreen from "./admin/auth/AuthSecurityScreen";
import AuthWelcomeScreen from "./admin/auth/AuthWelcomeScreen";
import BannerIndexScreen from "./admin/banner/BannerIndexScreen";
import BannerCreateScreen from "./admin/banner/BannerCreateScreen";
import SponsorIndexScreen from "./admin/sponsor/SponsorIndexScreen";
import SponsorCreateScreen from "./admin/sponsor/SponsorCreateScreen";
import SponsorEditScreen from "./admin/sponsor/SponsorEditScreen";
import SettingEditScreen from "./admin/setting/SettingEditScreen";
import EventIndexScreen from "./admin/event/EventIndexScreen";
import EventCreateScreen from "./admin/event/EventCreateScreen";
import EventEditScreen from "./admin/event/EventEditScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<AuthLoginScreen />} />
          <Route path='/register' element={<AuthRegisterScreen />} />
          <Route path="/forgot-password" element={<AuthForgotPasswordScreen />} />
          <Route path="/reset-password/:process_link" element={<AuthResetPasswordScreen />} />
          <Route path="/welcome/:process_link" element={<AuthWelcomeScreen />} />

          <Route path='/admin/users' element={<UserIndexScreen />} />
          <Route path='/admin/users/create' element={<UserCreateScreen />} />
          <Route path='/admin/users/:id' element={<UserEditScreen />} />
          <Route path='/admin/profile' element={<AuthProfileScreen />} />
          <Route path='/admin/security' element={<AuthSecurityScreen />} />
          <Route path='/verify/:id' element={<AuthVerifyScreen />} />

          <Route path='/admin/banners' element={<BannerIndexScreen />} />
          <Route path='/admin/banners/create' element={<BannerCreateScreen />} />

          <Route path='/admin/sponsors' element={<SponsorIndexScreen />} />
          <Route path='/admin/sponsors/create' element={<SponsorCreateScreen />} />
          <Route path='/admin/sponsors/:id' element={<SponsorEditScreen />} />

          <Route path='/admin/settings' element={<SettingEditScreen />} />

          <Route path='/admin/events' element={<EventIndexScreen />} />
          <Route path='/admin/events/create' element={<EventCreateScreen />} />
          <Route path='/admin/events/:id' element={<EventEditScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
