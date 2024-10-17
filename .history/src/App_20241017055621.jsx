import { useState } from 'react'
import Header from './component/Header'
import SideBar from './component/SideBar'
import Display from './component/Display'
import './styles/style.jsx'

function App() {

  return (
    <>
      <main>
        <Header />
        <SideBar />
        <Display />
      </main>
    </>
  );
}

export default App
