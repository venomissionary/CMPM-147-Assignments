// project.js - glitch intro/Generator
// Author: Steven Hernandez
// Date: 4/7/2024

const fillers = {
  adjective: ["wanker", "awful", "Delightful"],
  pre: ["dank" ,"whole lotta", "steamed", ],
  post: ["memes", "hoopla", "Crack", "Hams", "nutz"],
  people: ["kurt Angle", "skinner", "Chalmers", "John Cena"],
  places: ["azerbaijan", "armenia", "wyoming", "capetown", "Santa Cruz"],
};

 const template = `Well $people, I made it. Despite your $pre $post. Ah. Superintendent $people. Welcome. I hope you're prepared for an unfortgettable luncheon, Oh egads! 
 
 My roast is ruined. But What if i were to purchase $places and disguise it as my own cooking? Delightfully $adjective, Seymour. Ah-Skinner with his crazy explanations. 
 
 The superintendent's gonna need his $post when he hears Skinners's lame exaggerations there will be trouble in $places tonight Seymour! Superintendent, I was just- uh, just stretching my calves on the windowsill. 
 
 Isometric exercise. Care to join me? Why is there $post coming out of your oven, Seymour? Uh- Oh. That isn't $post. It's $post. $post from the $pre $post we're having. Mmm. $pre $post. Whew. 
 
 Superintendent, I hope you're ready for $pre $post. I thought we were having $pre $post. D'oh, no. I said $pre $post. That's what I call $places. You call $places $post? Yes. It's a regional dialect.`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);

}

/* global clicker */
$("#clicker").click(generate);

generate();

// let's get this party started - uncomment me
//main();