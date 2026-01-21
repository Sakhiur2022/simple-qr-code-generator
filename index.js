import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:"input",
        name:"url",
        message:""
    }

  ])
  .then((answers) => {

let qr_svg = qr.image(answers.url, { type: 'svg' });
qr_svg.pipe(fs.createWriteStream(`qr_image.svg`));
fs.writeFile('url.txt',answers.url,(error)=>{
    if(error) console.log(error)
})
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
    
    } else {
      console.error(error.message)
    }
  });
