import { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './App.css'

function MainPage() {
  const navigate = useNavigate();
  const [sizeYes, setSizeYes] = useState(20)
  const [sizeNo, setSizeNo] = useState(20)
  const [visbility, setVisibility] = useState(true)

  const handdleYes = () => {
    Swal.fire({
      title: 'Jupííí!',
      text: 'Věděl jsem, že řekneš ano!',
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXc5NWRndGp1bWswOWVhOHN5NWpmcWR4aWhxMm9zZzVnaG0yMGM2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T70hpBP1L0N7U0jtkq/giphy.gif',
      imageWidth: 300,
      confirmButtonText: 'Naplanovat dejtík hihi ❤️',
      confirmButtonColor: '#ff69b4'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/date-pick");
      }
    });
  }; // Tady byla ta závorka navíc, co dělala neplechu

  const handdleNo = () => {
    setSizeYes(sizeYes + 10)
    if (sizeNo <= 5) {
      setVisibility(false)
    }
    setSizeNo(sizeNo - 1)
  }

  return (
    <>
      <div style={{backgroundColor: '#ffdae9', 
          minWidth: '100vw',        
          minHeight: '100vh',       
          display: 'flex',          
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0}}
        >
          <h1>Valentýnka hihihi❤️❤️❤️</h1>
          <label>Chceš být moje Valentýnka? </label>
          
          <div style={{ marginTop: '20px' }}>
            <button 
                style={{ 
                  fontSize: `${sizeYes}px`, 
                  backgroundColor: 'pink',
                  transition: '0.3s',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px'
                }}
                onClick={handdleYes}
              >
                ANO
            </button>
            {visbility &&
            <button
            style={{
              fontSize:`${sizeNo}px`,
              backgroundColor:'white',
              border:'2px solid black',
              marginLeft: '10px',
              borderRadius: '10px',
              padding: '10px 20px'
            }} 
            onClick={handdleNo}
            >
              NE
            </button>
            }
          </div>
      </div>
    </>
  )
}

export default MainPage