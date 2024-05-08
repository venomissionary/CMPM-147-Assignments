// sketch.js - Evolutionary Impression
// Author: Steven Hernandez, Chase Croy-Perrett
// Date: 5/7/24


/* exported getInspirations, initDesign, renderDesign, mutateDesign */

function getInspirations() {
    return [
      {
        name: "Night Mountain",
        assetUrl:
          "https://cdn.glitch.global/a7dd862f-c049-4fd4-a224-a4010dae5217/Screenshot%202024-05-05%20222157.png?v=1714973104907",
        credit: "//https://www.pexels.com/search/mountains/",
      },
      {
        name: "Snowy Mountain",
        assetUrl:
          "https://cdn.glitch.global/a7dd862f-c049-4fd4-a224-a4010dae5217/snowy%20mountain.png?v=1715062597104",
        credit: "https://www.freepik.com/photos/mountain-background",
      },
      {
        name: "Lake Mountain",
        assetUrl:
          "https://cdn.glitch.global/a7dd862f-c049-4fd4-a224-a4010dae5217/lake%20mountain.png?v=1715062813595",
        credit:
          "4K mountains and Lake, xSnowLeopardx, https://www.reddit.com/r/wallpapers/comments/acyt1j/4k_mountains_and_lake_3840x2160/",
      },
      /*{
        name: "Migrant mother", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/migrant-mother.jpg?v=1714778906791",
        credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936"
      },*/
    ];
  }
  
  //let num_of_shapes = 30;
  
  //this is the function that actually "generates" the design, spawning shapes on the boards to
  //simulate the example image
  function initDesign(inspiration) {
    resizeCanvas(110, 80);
    let design = {
      shapes: [],
      background_color: [0, 0, 0],
    };
  
    //generates first mountain1
    if (inspiration.name == "Night Mountain") {
      for (let i = 0; i < 7; i++) {
        let shape = {
          color: [129, 121, 114],
          width: 1.4, //with and height of the shape
          height: 1,
          posx: random() * ((3 * width) / 5) + width / 20 - 12,
          posy: (random() * height) / 3 + height / 5,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 8; i++) {
        let shape = {
          color: [241, 138, 123],
          width: 1.2, //with and height of the shape
          height: 1,
          posx: random() * width - width / 8,
          posy: (random() * height) / 15 + height / 2,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 12; i++) {
        let shape = {
          color: [29, 49, 84],
          width: 1.4, //with and height of the shape
          height: 1.2,
          posx: random() * width - width / 8,
          posy: (random() * height) / 15 + (6 * height) / 10,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 12; i++) {
        let shape = {
          color: [9, 33, 71],
          width: 1.6, //with and height of the shape
          height: 1.4,
          posx: random() * width - width / 8,
          posy: (random() * height) / 15 + (6.7 * height) / 10,
        };
        design.shapes.push(shape);
      }
    } else if (inspiration.name == "Snowy Mountain") {
      for (let i = 0; i < 20; i++) {
        let shape = {
          color: [163, 174, 161],
          width: 1.4, //with and height of the shape
          height: 1.2,
          posx: random() * width - width / 8,
          posy: (random() * height) / 20 + (8 * height) / 10,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 8; i++) {
        let shape = {
          color: [59, 80, 87],
          width: 2, //with and height of the shape
          height: 1.2,
          posx: random() * width - width / 8,
          posy: (random() * height) / 2 + (6 * height) / 10,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 8; i++) {
        let shape = {
          color: [59, 80, 87],
          width: 2, //with and height of the shape
          height: 1.2,
          posx: random() * width - width / 8,
          posy: (random() * height) / 2 + (6 * height) / 10,
        };
        design.shapes.push(shape);
      }
    } else if (inspiration.name == "Lake Mountain") {
      for (let i = 0; i < 4; i++) {
        let shape = {
          color: [251, 255, 255],
          width: 2, //with and height of the shape
          height: 0.7,
          posx: random() * ((3 * width) / 5) + width / 20 - 12,
          posy: (random() * height) / 3 + height / 5,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 7; i++) {
        let shape = {
          color: [13, 60, 78],
          width: 1.6, //with and height of the shape
          height: 1.3,
          posx: random() * ((3 * width) / 5) + width / 20 - 12,
          posy: (random() * height) / 3 + height / 5,
        };
        design.shapes.push(shape);
      }
      for (let i = 0; i < 7; i++) {
        let shape = {
          color: [25, 56, 41],
          width: 1.8, //with and height of the shape
          height: 1,
          posx: random() * ((2 * width) / 5) - width / 10,
          posy: (random() * height) / 4 + (7 * height) / 10,
        };
        design.shapes.push(shape);
      }
    }
  
    return design; //holds all data on the generated "copied image"
  }
  
  //displays the generated design on the canvas
  function renderDesign(design, inspiration) {
    //paints background
    if (inspiration.name == "Night Mountain") {
      background(73, 69, 84);
    } else if (inspiration.name == "Snowy Mountain") {
      background(191, 191, 191);
    } else if (inspiration.name == "Lake Mountain") {
      background(103, 158, 179);
    }
  
    //turns off outlines
    noStroke();
  
    //paints shapes
    for (let i = 0; i < design.shapes.length; i++) {
      let curr_shape = design.shapes[i];
      //rect x, y, width, hieght
      fill(curr_shape.color[0], curr_shape.color[1], curr_shape.color[2], 200);
  
      //rect(curr_shape.posx, curr_shape.posy,
      //curr_shape.width , curr_shape.height)
      triangle(
        curr_shape.posx * curr_shape.width,
        curr_shape.posy * curr_shape.height,
        (curr_shape.posx + 40) * curr_shape.width,
        curr_shape.posy * curr_shape.height,
        (curr_shape.posx + 20) * curr_shape.width,
        (curr_shape.posy - 20) * curr_shape.height
      );
    }
  
    //we will use the fill() function to fill in the shapes here
    //fill(red, green, blue)
    // then square(x position, y position, size of square)
    //and just loop those to draw the image
  }
  
  //randomly distorts the design every frame
  function mutateDesign(design, inspiration, rate) {
    for (let i = 0; i < design.shapes.length; i++) {
      let curr_shape = design.shapes[i];
      curr_shape.posx = mut(curr_shape.posx, -width, width, rate);
      curr_shape.posy = mut(curr_shape.posy, -height, height, rate);
      //curr_shape.width = mut(curr_shape.width, 15, 35, rate);
    }
  }
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 45), min, max);
  }
  