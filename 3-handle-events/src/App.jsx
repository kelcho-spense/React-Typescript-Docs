
import './App.css'

function App() {
  const sendToServer = (e) => {
    e.preventDefault()
    alert('Form submitted')
  }
  const handleClick = (msg) => {
    alert(msg)
  }

  return (
    <>
      {/* onClick with parameters */}
    <button onClick={() => handleClick("dummy msg")}>Click Me</button>
      {/* onSubmit */}
      <form onSubmit={sendToServer}>
        <label htmlFor="name">FullName</label>
        <input type="text" name='fullname' placeholder='Enter your name' />
        <button type="submit">submit</button>
      </form>
      {/* onScroll */}
      <div onScroll={() => console.log('Scrolled')}
        style={{
          border: '1px solid red',
          height:"700px",
          overflow: 'scroll'
        }}
        >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero excepturi consequatur deleniti, vel amet neque sint rerum corrupti possimus iusto autem sit inventore perferendis corporis hic atque voluptates, doloribus veritatis!
      </div>
    </>
  )
}

export default App
