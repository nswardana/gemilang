import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryPage } from "./pages/CategoryPage";
import { GroupPage } from "./pages/GroupPage";
import { MemberListPage } from "./pages/MemberListPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/category/:id/groups" element={<GroupPage />} />
        <Route path="/group/:id/members" element={<MemberListPage />} />
        <Route path="/member/:id" element={<MemberDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;