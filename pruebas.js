gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('.container');
const square1 = document.querySelector('.square1');
const square2 = document.querySelector('.square2');

Draggable.create('#square1', {
    type:'rotation',
    bounds: container
});
Draggable.create('#square2', {
    inertia: true,
});

// carrusel
const images = document.querySelectorAll('.carousel-image') //selecciona todos los elementos que hay en .carrousel-image
const radius = 350 //tamaño de las imagenes
const progress = {
  value: 0
}
const carousel = document.querySelector('.carousel')

Observer.create({ //crea el objervador
  target: carousel, //target hace que el observador se fije solamente en los eventos que pasen en carrusel
  type: "wheel,pointer", // que se fije en los eventos wheel (la rueda del raton) y en el cursor
  onPress: (self) => { // Cuando se clique el carrusel, que el cursor pase a ser grabbing
    carousel.style.cursor = 'grabbing'
  },
  onRelease: (self) => { //Cuando se suelte el carrusel el cursor pasara a ser grab
    carousel.style.cursor = 'grab'
  },
  onChange: (self) => { //cuando el carrusel cambie
    gsap.killTweensOf(progress) //matara todos los procesos que se hagan para evitar bugs en el funcionamiento de la animacion
    const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05 // Esto hace que cuando detecte un movimiento de rueda de raton en el evento, el carrusel se mueva hacia los lados 0,5 y que se deplace 0,5 hacia arriba o abajo (depende de la direccion de la rueda del raton)
    gsap.to(progress, { //esto hace que el gsap cuando deja de hacer la animacion se pare en dos segundos y tenga una transicion de power4, y que se pare en la posicion del value , que la operacion quiere decir: Esto especifica que el valor final del efecto de transición debe ser la cantidad calculada anteriormente (p), agregada al valor actual de progress.
      duration: 2,
      ease: 'power4.out',
      value: `+=${p}`
    })
  }
})

const imagenes = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg']; // Array de las imagenes en local
const animate = () => {
    images.forEach((image, index) => { //recorre el array de imagenes
      const theta = index / images.length - progress.value //calcula lo tridimensional
      const radius = 450; // Ajusta el radio para ampliar el carrusel
      const x = -Math.sin(theta * Math.PI * 2) * radius
      const y = Math.cos(theta * Math.PI * 2) * radius
      image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta }deg)`
      const c = Math.floor(index/images.length * 360)
      // asigna una imagen como fondo, las saca del array imagenes que hemos definido anteriormente
      const backgroundImageUrl = `url(./images/${imagenes[index % imagenes.length]})`;
      image.style.backgroundImage = backgroundImageUrl;
      image.style.backgroundRepeat = 'no-repeat';
      image.style.backgroundSize = 'cover';
    })
  }
  gsap.ticker.add(animate)

//greenBox
//box
const box = document.querySelector('.box')
const animation = gsap.to(".box", { 
  duration: 2,
  x: 900,
  rotation: 360,
  yoyo: true,
});

Observer.create({ //crea el objervador
  target: box, //target hace que el observador se fije solamente en los eventos que pasen en carrusel
  type: "wheel", // que se fije en los eventos wheel (la rueda del raton) y en el cursor
  onChange: (self) => { //cuando el carrusel cambie
    gsap.killTweensOf(progress) //matara todos los procesos que se hagan para evitar bugs en el funcionamiento de la animacion
    const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05 // Esto hace que cuando detecte un movimiento de rueda de raton en el evento, el carrusel se mueva hacia los lados 0,5 y que se deplace 0,5 hacia arriba o abajo (depende de la direccion de la rueda del raton)
    animation.repeat()
  },
  yoyo: true,
})
gsap.to(".box", {
  border: "2px solid #000000",
  borderRadius: "25px",
  duration: 3,
  rotation: 360,
  backgroundColor: "#9d95ff",
  yoyo: true,
})
//box1
const box1 = document.querySelector('.box1')
const animation1 = gsap.to(".box1", { 
  duration: 2,
  x: 200,
  rotation: 360,
  yoyo: true,
});

Observer.create({ //crea el objervador
  target: box1, //target hace que el observador se fije solamente en los eventos que pasen en carrusel
  type: "wheel", // que se fije en los eventos wheel (la rueda del raton) y en el cursor
  onChange: (self) => { //cuando el carrusel cambie
    gsap.killTweensOf(progress) //matara todos los procesos que se hagan para evitar bugs en el funcionamiento de la animacion
    const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05 // Esto hace que cuando detecte un movimiento de rueda de raton en el evento, el carrusel se mueva hacia los lados 0,5 y que se deplace 0,5 hacia arriba o abajo (depende de la direccion de la rueda del raton)
    animation1.repeat()
  },
  yoyo: true,
})
gsap.to(".box1", {
  border: "2px solid #000000",
  borderRadius: "25px",
  duration: 3,
  rotation: 360,
  backgroundColor: "#9d95ff",
  yoyo: true,
  scrollTrigger: {
    trigger: ".box1",
    start: "top 100%", // cuando el elemento está a 80% visible en la ventana
    toggleActions: "play none none reverse" // la animación se reproduce cuando se alcanza el trigger y se revierte cuando se sale del trigger
  }
})


//btnCambioColor 
gsap.to("html", {"--myColor":"#000000", yoyo:true, repeat:20, duration: 3});

//btm con animacion
let pink = document.querySelector(".pink");
let link = document.querySelector(".link");

let hoverTL = gsap.timeline();
hoverTL.pause();
hoverTL.to(pink, {width: "calc(100% + 1.3em)", easy:"Elastic.easyOut(0.25)", duration:0.2})
hoverTL.to(pink, {width: "2em", left:"calc(100% - 1.1em)", easy:"Elastic.easyOut(0.25)", duration:0.2})

link.addEventListener("mouseenter", () => {
  hoverTL.play();
})
link.addEventListener("mouseleave", () => {
  hoverTL.reverse();
})

//Espacio rojo con animacion

gsap.from(".redSpace", { 
  duration: 1,
  y: '+50%',
  easy:'bounce',
  scrollTrigger: {
    trigger: ".redSpace",
    start: "top 80%", // cuando el elemento está a 80% visible en la ventana
    toggleActions: "play none none reverse" // la animación se reproduce cuando se alcanza el trigger y se revierte cuando se sale del trigger
  }
})