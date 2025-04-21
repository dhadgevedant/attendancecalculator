function calculate() {

    

    const total    = parseInt(document.getElementById("total").value || 0);
    const attended = parseInt(document.getElementById("attended").value || 0);
    const resultBox= document.getElementById("result");
    const resultText = document.getElementById("result-text");
  
    // clear previous effects
    clearDrops();
  
    if (!total || isNaN(attended)) {
      resultText.innerHTML = "Please enter valid numbers.";
    } else {
      const pct = (attended/total)*100;
      let msg = ``;
      
      if (pct >= 75) {
        const maxB = Math.floor(((attended / 0.75)-total));
        
        msg += `You can bunk ${maxB} more lecture${maxB!==1?'s':''}.`;
        createConfetti();
      } else {
        const req = Math.floor((attended-(0.75*total))/-0.25);
        msg += `You need to attend ${req} more lecture${req!==1?'s':''}.`;
        createRain();
      }
      resultText.innerHTML = msg;
    }
  
        // reveal result box
        resultBox.classList.remove("opacity-0","max-h-0","scale-95");
        resultBox.classList.add   ("opacity-100","max-h-[300px]","scale-100");
    
        // === NEW: smooth-scroll to the result ===
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  
  // wipe out any leftover drops
function clearDrops() {
    document.querySelectorAll('.effect-drop').forEach(el => el.remove());
  }
  
  // sad rain: thin blue drops
  function createRain() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = 250;                // ↑ up from 160 to 250 drops
  
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      const length = Math.random() * 25 + 15;   // 15–40px long
      const x0 = Math.random() * W;
  
      Object.assign(drop.style, {
        position: 'absolute',
        top: `${-length}px`,
        left: `${x0}px`,
        width: '2px',
        height: `${length}px`,
        backgroundColor: 'rgba(173,216,230,0.6)',
        pointerEvents: 'none',
        borderRadius: '1px',
        zIndex: 30,
        overflow: 'hidden',
      });
      drop.classList.add('effect-drop');
      document.body.appendChild(drop);
  
      const fallDuration = Math.random() * 3 + 0;  // ↑ 3–6 seconds
      const delay        = Math.random() * 1;      // 0–1 second start delay
      const drift        = (Math.random() - 0.5) * 100; // ±50px drift
  
      gsap.to(drop, {
        delay,
        duration: fallDuration,
        ease: "power1.in",
        y: H + length ,
        x: `+=${drift}`,
        opacity: 0,
        onComplete: () => drop.remove()
      });
    }
  }
  

  
  function createConfetti() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = 150; // ↑ up from 80 to 150 pieces
  
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const w  = Math.random() * 12 + 8;    // 8–20px wide
      const h  = Math.random() * 8  + 4;    // 4–12px tall
      const x0 = Math.random() * W;         // random start X
  
      Object.assign(el.style, {
        position: "absolute",
        top: `${-h}px`,                     // start just above viewport
        left: `${x0}px`,
        width: `${w}px`,
        height: `${h}px`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
        pointerEvents: "none",
        transform: "translate(0,0) rotate(0deg)",
        transformOrigin: "center center",
        zIndex: 30,
        overflow: 'hidden',
      });
  
      document.body.appendChild(el);
  
      const driftX   = (Math.random() - 0.5) * W * 0.3; // ±30% screen width
      const endY     = H + h;
      const rotation = (Math.random() - 0.5) * 720;     // ±720°
      const delay    = Math.random() * 1;               // 0–1s stagger
      const duration = Math.random() * 3 + 5;           // 3–6s duration
  
      gsap.to(el, {
        delay,
        duration,
        ease: "power2.out",
        y: endY*2,
        x: `+=${driftX}`,
        rotation,
        onComplete: () => el.remove()
      });
    }
  }
  
  
  function increment(input) {
    if (input && !isNaN(input.value)) input.value = +input.value + 1;
  }
  function decrement(input) {
    if (input && !isNaN(input.value) && +input.value > 0)
      input.value = +input.value - 1;
  }
  
  // Initial title animation
  gsap.from("#v", { x:-200, opacity:0, duration:1, ease:"bounce" });
  gsap.from("#d", { x:200,  opacity:0, duration:1, ease:"bounce" });
  