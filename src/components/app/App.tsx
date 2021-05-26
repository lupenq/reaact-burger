import React from 'react';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";

import data from "../../utils/data"

function App() {
  return (
    <div>
      <AppHeader />
      <Main data={data} />
    </div>
  );
}

export default App;
