import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import AddChores from './AddChores';
import UpdateChore from './UpdateChore';
import ChoresList from './ChoresList';
// import AssignedChores from './AssignedChores';


function App() {
  return (
    <Routes>
      <Route path="/api/chores/add" element={<AddChores />} />
      <Route path="/api/chores/list" element={<ChoresList />} />
      {/* <Route path="/api/assignments/assigned-chores" element={<AssignedChores />} /> */}
      <Route path="/api/chores/edit/:choreId" element={<UpdateChore />} />
     </Routes>

  );
}
export default App;