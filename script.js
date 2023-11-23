const stageBg = document.querySelector(".stage-bg");
const stageFg = document.querySelector(".stage-fg");
const score = document.querySelector(".score");
const timer = document.querySelector(".timer");
const veg = ["🫑", "🍅", "🥕", "🍆", "🥬", "🥔", "🥦", "🧅", "🧄", "🌶️", "🫛"];
const vegTLs = [];
const props = { x: 0, dir: 1 };
let vegNum = 0;
let pts = 0;
let timeScale = 1;

//ADDED BY ME
const paprika = document.querySelector(".paprika");
paprika.innerHTML = 0;
const tomato = document.querySelector(".tomato");
tomato.innerHTML = 0;
const carrot = document.querySelector(".carrot");
carrot.innerHTML = 0;
const eggplant = document.querySelector(".eggplant");
eggplant.innerHTML = 0;
const salad = document.querySelector(".salad");
salad.innerHTML = 0;
const potato = document.querySelector(".potato");
potato.innerHTML = 0;
const broccoli = document.querySelector(".broccoli");
broccoli.innerHTML = 0;
const onion = document.querySelector(".onion");
onion.innerHTML = 0;
const garlic = document.querySelector(".garlic");
garlic.innerHTML = 0;
const chilli = document.querySelector(".chilli");
chilli.innerHTML = 0;
const peas = document.querySelector(".peas");
peas.innerHTML = 0;

// Recipe names and ingredients
const recipes = [
  {
    name: "Spicy peas",
    ingredients: ["🌶️", "🫛", "🫛", "🌶️", "🫛"],
  },
  {
    name: "Vampire delight",
    ingredients: ["🧄", "🥕", "🥬", "🧄", "🧄", "🧅"],
  },
  {
    name: "Veggie assorti",
    ingredients: ["🍆", "🍅", "🫑", "🥦", "🥔", "🥬"],
  },
];
//

gsap.set(".follower", { filter: "drop-shadow(30px 30px 4px rgba(0,0,0,0.1))" });
gsap.set(".dagger", { rotate: 125, xPercent: -50, yPercent: -55 });

//added by me
let recipeToMake = {};
let ingredients = document.querySelector(".recipeVegetablesWrapper");

function showRecipe() {
  let recipeIndex = Math.floor(Math.random() * 3);
  recipeToMake = recipes[recipeIndex];
  document.querySelector(".recipeName").innerHTML = recipeToMake.name;
  console.log(recipeToMake);
  ingredients.innerHTML = recipeToMake.ingredients
    .map((item) => {
      return `<span class=""> ${item} </span>`;
    })
    .join("");
}

document.onload = showRecipe();

let slicedVeggies = [];
let gameEndText = document.querySelector(".gameEnd");

function checkRecipe() {
  let recipeIngredients = recipeToMake.ingredients;
  let ingredientsMatch = false;
  for (let i = 0; i < slicedVeggies.length; i++) {
    if (slicedVeggies[i] === recipeIngredients[i]) {
      ingredientsMatch = true;

      if (slicedVeggies.length === recipeIngredients.length) {
        gameEndText.innerHTML = "YOU WON";
        gameEnd();
      }
    } else {
      ingredientsMatch = false;
      gameEndText.innerHTML = "YOU LOOSE";
      gameEnd();
    }
  }
  if (ingredientsMatch) {
    ingredients.firstChild.remove();
  }
}

function stopGame() {
  window.onpointerdown = null;
  window.onpointerup = null;
  window.onpointermove = null;
  vegTL.pause();
  slicedVeggies = []; // Clear sliced veggies
}

//

window.onpointerdown = (e) => {
  gsap
    .timeline({ defaults: { duration: 0.3, ease: "back.out(4)" } })
    .to(".dagger", { rotate: 200, xPercent: -30, scale: 0.8 }, 0)
    .to(".follower", { filter: "drop-shadow(5px 7px 2px rgba(0,0,0,0.3))" }, 0)
    .add(() => {
      //check distance between veg and dagger
      const mark = document.createElement("div");
      stageFg.append(mark);
      gsap.fromTo(
        mark,
        { innerHTML: "🗯️", x: e.x + 84, y: e.y - 20, rotate: "random(0,360)" },
        {
          scale: 4,
          duration: 0.1,
          opacity: 0.5,
          onComplete: () => mark.remove(),
        }
      );
      for (const item of stageBg.children) {
        const dX = Math.abs(gsap.getProperty(item, "x") - (e.x + 84));
        const dY = Math.abs(gsap.getProperty(item, "y") - (e.y - 25));
        const dist = (dX + dY) / 2;
        if (dist < 60) {
          if (item.innerHTML == "⏱️") {
            timeScale = 0.2;
            gsap.to(vegTLs, { timeScale: timeScale });
            gsap.to(".stage-bg", {
              background:
                "linear-gradient(rgba(0,120,230,0.5) 77%,rgba(0,100,255,0.9))",
            });
            gsap.delayedCall(5, () => {
              timeScale = 1;
              gsap.set(vegTLs, { timeScale: 1 });
              gsap.to(".stage-bg", {
                background:
                  "linear-gradient(rgba(0,0,0,0) 77%,rgba(0,0,0,0.5))",
              });
            });
          }
          pts++;
          score.innerHTML =
            "Sliced " + pts + '<span class="num"> / ' + vegNum + "</span>";
          // added by me
          slicedVeggies.push(item.innerHTML);
          switch (item.innerHTML) {
            case "🫑":
              paprika.innerHTML = parseInt(paprika.innerHTML) + 1;
              break;
            case "🍅":
              tomato.innerHTML = parseInt(tomato.innerHTML) + 1;
              break;
            case "🥕":
              carrot.innerHTML = parseInt(carrot.innerHTML) + 1;
              break;
            case "🍆":
              eggplant.innerHTML = parseInt(eggplant.innerHTML) + 1;
              break;
            case "🥬":
              salad.innerHTML = parseInt(salad.innerHTML) + 1;
              break;
            case "🥔":
              potato.innerHTML = parseInt(potato.innerHTML) + 1;
              break;
            case "🥦":
              broccoli.innerHTML = parseInt(broccoli.innerHTML) + 1;
              break;
            case "🧅":
              onion.innerHTML = parseInt(onion.innerHTML) + 1;
              break;
            case "🧄":
              garlic.innerHTML = parseInt(garlic.innerHTML) + 1;
              break;
            case "🌶️":
              chilli.innerHTML = parseInt(chilli.innerHTML) + 1;
              break;
            case "🫛":
              peas.innerHTML = parseInt(peas.innerHTML) + 1;
              break;
          }
          checkRecipe();
          //
          stageFg.append(item);
          gsap
            .timeline()
            .set(mark, { autoAlpha: 0 })
            .set(item, {
              innerHTML: "💥",
              rotate: "random(0,200,0)",
              filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
            })
            .to(item, { duration: 0.1, scale: 2 })
            .to(item, { duration: 0.1, scale: 0, ease: "expo.inOut" });
        }
      }
    }, 0.15);
};

window.onpointerup = (e) => {
  gsap.to(".dagger", { duration: 0.3, rotate: 125, xPercent: -50, scale: 1 });
  gsap.to(".follower", {
    duration: 0.3,
    filter: "drop-shadow(30px 30px 4px rgba(0,0,0,0.1))",
  });
};

window.onpointermove = (e) => {
  props.x = gsap.getProperty(".follower", "x");
  props.dir = e.x > props.x ? -1 : 1;
  gsap.to(".follower", { y: e.y });
  gsap.to(".follower", {
    x: e.x,
    duration: 1,
    ease: "expo",
    onUpdate: () => {
      const rot = Math.abs(e.x - gsap.getProperty(".follower", "x")) / 6;
      gsap.set(".follower", {
        rotate: gsap.utils.clamp(0, 33, rot) * props.dir,
      });
    },
  });
};

function addveg() {
  vegNum++;
  score.innerHTML =
    "Sliced " + pts + '<span class="num"> / ' + vegNum + "</span>";

  const f = document.createElement("div");
  stageBg.append(f);
  vegTLs.push(
    gsap
      .timeline({
        onComplete: () => {
          f.remove();
          vegTLs.shift();
        },
      })
      .fromTo(
        f,
        {
          innerHTML:
            vegNum == 8 || vegNum == 36
              ? "⏱️"
              : veg[gsap.utils.random(0, veg.length - 1, 1)],
          fontSize: 99,
          xPercent: -50,
          yPercent: -50,
          y: innerHeight + 99,
          x: gsap.utils.random(200, innerWidth - 100, 1),
          rotate: vegNum % 2 == 0 ? 10 : -10,
          filter: "drop-shadow(20px -10px 4px rgba(0,0,0,0.2))",
        },
        {
          duration: 3,
          x: "+=" + "random(-200,200)",
          rotate: vegNum % 2 == 0 ? -10 : 10,
        }
      )
      .to(
        f,
        {
          y: gsap.utils.random(0, innerHeight / 2, 1),
          filter: "drop-shadow(30px 30px 4px rgba(0,0,0,0.1))",
          duration: 1.5,
          yoyo: true,
          repeat: 1,
        },
        0
      )
      .timeScale(timeScale)
  );
}

const vegTL = gsap.to(window, { duration: 1, repeat: 120, onRepeat: addveg });

const timerTL = gsap
  .timeline({ onComplete: gameEnd })
  .to(".timer .face", { rotate: -50, ease: "power1.in" })
  .to(".timer .face", {
    rotate: 0,
    ease: "none",
    duration: vegTL.totalDuration(),
  });

function gameEnd() {
  gsap.timeline().fromTo(
    ".replay",
    {
      innerHTML: "⬅️ Replay?",
      opacity: 0,
      x: 100,
    },
    {
      ease: "back.out(3)",
      opacity: 1,
      x: 0,
    }
  );

  timer.onclick = () => {
    timer.onclick = null;
    pts = vegNum = 0;
    score.innerHTML = "Score: 0";
    gsap.to(".replay", { opacity: 0 });
    vegTL.play(0);
    timerTL.play(0);
    resetVegCount();
    gameEndText.innerHTML = null;
  };

  // Added by me
  function resetVegCount() {
    paprika.innerHTML = 0;
    tomato.innerHTML = 0;
    carrot.innerHTML = 0;
    eggplant.innerHTML = 0;
    salad.innerHTML = 0;
    potato.innerHTML = 0;
    broccoli.innerHTML = 0;
    onion.innerHTML = 0;
    garlic.innerHTML = 0;
    chilli.innerHTML = 0;
    peas.innerHTML = 0;
  }
  //
}
