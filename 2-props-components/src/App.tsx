import './App.css'
import Avatar from './components/Avatar'
import Video from './components/Video'
//PARENT COMPONENT
function App() {
  const videoProps = {
    width: 800,
    height: 500,
    controls: true,
  }

  const AvatarArray = [
    {
      w: 50,
      h: 80,
    },
    {
      w: 100,
      h: 130,
    },
    {
      w: 150,
      h: 200,
    },
    {
      w: 250,
      h: 300,
    },
    {
      w: 400,
      h: 500,
    },
  ];

  return (
    <>
      {/* FIRST COMPONENT */}
      <Avatar w={320} h={240} />
      {/* SECOND COMPONENT */}
      <Avatar w={400} h={320} />
      {/* THIRD COMPONENT */}
      <Video w={videoProps.width} h={videoProps.height} controls={videoProps.controls} />
      {/* FOURTH COMPONENT */}
      <h3>Array of Avatars</h3>
      {
        AvatarArray.map((avatar, index) => (
          <Avatar
            key={index}
            w={avatar.w}
            h={avatar.h}
          />
        ))
      }
    </>
  )
}

export default App
