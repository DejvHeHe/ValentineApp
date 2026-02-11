import { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './App.css';

const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function DatePickPage() {
  const navigate = useNavigate();

  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState([]);

  const activityOptions = [
    { id: 'film', label: 'Filmík 🍿' },
    { id: 'games', label: 'Hraní her 🎮' },
    { id: 'lego', label: 'Lego 🧱' },
    { id: 'art', label: 'Malování 🎨' }
  ];

  const foodOptions = [
    { id: 'mexico', label: 'Mexická 🌮' },
    { id: 'pizza', label: 'Pizza 🍕' },
    { id: 'kebab', label: 'Kebábek 🥙' },
    { id: 'china', label: 'Čínská 🥢' },
    { id: 'ramen', label: 'Rámen 🍜' },
    { id: 'india', label: 'Indická 🍛' }
  ];

  const toggleSelection = (id, state, setState) => {
    if (state.includes(id)) {
      setState(state.filter((item) => item !== id));
    } else {
      setState([...state, id]);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const finalFood = foodOptions
      .filter(f => selectedFood.includes(f.id))
      .map(f => f.label.split(' ')[0]);

    const finalAct = activityOptions
      .filter(a => selectedActivity.includes(a.id))
      .map(a => a.label.split(' ')[0]);

      if (!webhookUrl) {
        console.error("Webhook URL nenalezena! Zkontroluj .env soubor.");
        return;
      }


      const discordMessage = {
        embeds: [{
          title: "💖 Nový plán na rande! 💖",
          description: "Někdo právě vyplnil valentýnský formulář!",
          color: 0xff69b4, // Růžová barva v hex (decimálně)
          fields: [
            { name: "Mňamky k jídlu 🍕", value: finalFood.join("\n") || "Nic nevybráno", inline: true },
            { name: "Aktivity 🎮", value: finalAct.join("\n") || "Nic nevybráno", inline: true }
          ],
          footer: { text: "Valentýn 2026 🌹" },
          timestamp: new Date()
        }]
      };

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordMessage)
        });
      } catch (err) {
        console.error("Nepodařilo se poslat zprávu na Discord", err);
      }

    Swal.fire({
      title: 'Perfektní plán! ❤️',
      html: `Budeme baštit: <b>${finalFood.join(", ")}</b> <br> a dělat: <b>${finalAct.join(", ")}</b>.`,
      confirmButtonText: 'Už se těším! ✨',
      confirmButtonColor: '#ff69b4',
      backdrop: `rgba(255, 182, 193, 0.4)`,
      customClass: {
        container: 'valentyn-backdrop' 
      }
    }).then(() => {
      navigate('/');
    });
  }; 

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#ff69b4' }}>Jde se plánovat dejtík ✨</h1>

      <form onSubmit={handleSubmit}>
        <section style={{ marginBottom: '30px' }}>
          <h3>Co budeme baštit? (vyber klidně víc)</h3>
          <motion.div 
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            {foodOptions.map((food) => (
              <motion.button
                type="button"
                key={food.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSelection(food.id, selectedFood, setSelectedFood)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '15px',
                  border: '2px solid #ff69b4',
                  cursor: 'pointer',
                  backgroundColor: selectedFood.includes(food.id) ? '#ff69b4' : 'white',
                  color: selectedFood.includes(food.id) ? 'white' : '#ff69b4',
                  fontWeight: 'bold',
                  transition: '0.3s'
                }}
              >
                {food.label}
              </motion.button>
            ))}
          </motion.div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3>A co budeme dělat?</h3>
          <motion.div 
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            {activityOptions.map((act) => (
              <motion.button
                type="button"
                key={act.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSelection(act.id, selectedActivity, setSelectedActivity)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '15px',
                  border: '2px solid #ff69b4',
                  cursor: 'pointer',
                  backgroundColor: selectedActivity.includes(act.id) ? '#ff69b4' : 'white',
                  color: selectedActivity.includes(act.id) ? 'white' : '#ff69b4',
                  fontWeight: 'bold',
                  transition: '0.3s'
                }}
              >
                {act.label}
              </motion.button>
            ))}
          </motion.div>
        </section>

        <button 
          type="submit" 
          disabled={selectedFood.length === 0 || selectedActivity.length === 0}
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: (selectedFood.length > 0 && selectedActivity.length > 0) ? '#ff1493' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: (selectedFood.length > 0 && selectedActivity.length > 0) ? 'pointer' : 'not-allowed',
            boxShadow: '0 4px 15px rgba(255, 20, 147, 0.3)'
          }}
        >
          Hihi potvrdit dejtík ❤️
        </button>
      </form>
    </div>
  );
}

export default DatePickPage;