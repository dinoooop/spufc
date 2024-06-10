import "./styles/global.scss";
import "./styles/admin.scss";
import "./styles/front.scss";
import "./styles/admin-responsive.scss";
import "./styles/front-responsive.scss";
import "./styles/form.scss";
import "./styles/navigation.scss";
import "./styles/modal.scss";
import "./styles/grid.scss";
import "./styles/mp.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./front/pages/HomeScreen";
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
import GalleryIndexScreen from "./admin/gallery/GalleryIndexScreen";
import GalleryCreateScreen from "./admin/gallery/GalleryCreateScreen";
import GalleryEditScreen from "./admin/gallery/GalleryEditScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
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

          <Route path='/admin/galleries' element={<GalleryIndexScreen />} />
          <Route path='/admin/galleries/create' element={<GalleryCreateScreen />} />
          <Route path='/admin/galleries/:id' element={<GalleryEditScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
