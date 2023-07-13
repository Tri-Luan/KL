import React, { Component } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/ui/HeaderComponent";
import Footer from "../../components/ui/FooterComponent";

class Layout extends Component {
  render() {
    return (
      <main className="App">
        <Header />
        <Outlet />
        <Footer />
      </main>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Layout;
