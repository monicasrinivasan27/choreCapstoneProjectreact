import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import AddChores from './components/chores/AddChores';
import UpdateChore from './components/chores/UpdateChore';
import ChoresList from './components/chores/ChoresList';
import AssignedChores from './components/chores/AssignedChores';


function App() {
  return (
    <Routes>
      <Route path="/api/chores/add" element={<AddChores />} />
      <Route path="/api/chores/list" element={<ChoresList />} />
      <Route path="/api/assignments/assigned-chores" element={<AssignedChores />} />
      <Route path="/api/chores/edit/:choreId" element={<UpdateChore />} />
    </Routes>
  );
}
export default App;