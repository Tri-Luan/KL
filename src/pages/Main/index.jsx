import React, { Component } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/ui/HeaderComponent";
import Footer from "../../components/ui/FooterComponent";

class Layout extends Component {
  render() {
    return (
      <div class="flex flex-col  h-screen justify-between">
        <Header />
        <div className="mb-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Layout;
