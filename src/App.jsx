import React from 'react'
import {
	BrowserRouter as Router,
	Route,
    Routes
} from 'react-router-dom'

import NavBar from './components/navigation/NavBar'
import Notes from './components/notes/Notes'
import AddNote from './components/notes/AddNote'
import RemoveNote from './components/notes/RemoveNote'
import ListNotes from './components/notes/ListNotes'
import ReadNotes from './components/notes/ReadNote'
import NotFound from './components/navigation/NotFound'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<Notes />} />
                <Route path='home' element={<Notes />} />
                <Route path='add' element={<AddNote />} />
                <Route path='remove' element={<RemoveNote />} />
                <Route path='list' element={<ListNotes />} />
                <Route path='read' element={<ReadNotes />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App
