import React  from 'react';
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      
      <Notes showAlert={showAlert} /> {/* view your all notes here */}  {/* And add note */}
    </div>
  )
}

export default Home
