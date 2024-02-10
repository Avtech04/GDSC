import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
const P1 = () => {
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <div style={{textAlign:"center"}}>
        <h1>Himalayan EarthQuake</h1>
      </div>

      <div className='problem-container'>
        <div className='left-problem-container'>
          <div className='image-problems'>
          <img
          className="d-block w-100"
          src="https://picsum.photos/1800/300"
          alt="First slide" 
        />
          </div>
          <div>
              <button className='Donate-button' onClick={notify} style={{textAlign:"center"}}>donate now</button>
    
          </div>
        </div>
        <div className='right-problem-container'>
        Earthquakes, those formidable convulsions of the Earth's crust, have long captivated human fascination and instilled fear and awe in equal measure. These seismic events, often sudden and devastating, result from the release of energy accumulated within the Earth's lithosphere. Understanding earthquakes requires delving into the intricate dynamics of tectonic plates, stress accumulation, and release mechanisms, all of which contribute to the unpredictable nature of these phenomena.

At the heart of earthquake occurrences lie tectonic plate boundaries, where the Earth's crust is in constant motion. The boundaries come in various forms: divergent boundaries, where plates move apart; convergent boundaries, where plates collide; and transform boundaries, where plates slide past each other. It's at these junctures that stress builds up as the plates grind against each other, forming faults where sudden movement can occur.

The release of accumulated stress along faults is what triggers earthquakes. Imagine two massive tectonic plates locked together, resisting movement until the stress overcomes the friction holding them in place. Suddenly, they slip, releasing a tremendous amount of energy in the form of seismic waves. These waves radiate outward from the fault, shaking the ground and causing the characteristic trembling associated with earthquakes.



The consequences of earthquakes extend far beyond the immediate shaking of the ground. They can trigger secondary hazards such as landslides, tsunamis, and aftershocks, compounding the devastation wrought by the initial event. Tsunamis, in particular, can be catastrophic, generating towering waves that inundate coastlines with devastating force.

Mitigating the impact of earthquakes requires a multi-faceted approach encompassing scientific research, engineering innovation, and robust disaster preparedness. Seismologists strive to better understand the underlying mechanisms of earthquakes, developing models to forecast seismic activity and assess the potential risks to vulnerable regions. Engineers design resilient structures capable of withstanding the forces unleashed by earthquakes, incorporating technologies such as base isolation and dampers to minimize damage.

Yet, despite our advances in understanding and preparedness, earthquakes remain a formidable natural hazard, capable of wreaking havoc with little warning. The 1906 San Francisco earthquake, the 2011 Tohoku earthquake and tsunami, and the 2015 Nepal earthquake serve as stark reminders of the destructive power of these events and the importance of ongoing vigilance and preparedness.

In addition to their destructive potential, earthquakes also offer valuable insights into the inner workings of the Earth. By studying seismic waves and their behavior as they propagate through the Earth's interior, scientists can probe the composition and structure of the planet's layers, shedding light on fundamental questions about its formation and evolution.

Moreover, earthquakes play a crucial role in shaping the Earth's surface over geologic time scales. The gradual movement of tectonic plates, driven by the convective currents in the Earth's mantle, leads to the formation of mountain ranges, ocean basins, and other topographic features. Indeed, the dynamic interplay between tectonics, erosion, and deposition is central to the ongoing evolution of the Earth's surface.

        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default P1