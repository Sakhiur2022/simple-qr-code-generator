import inquirer from 'inquirer';
import qr from "qr-image";
import { writeFile,createWriteStream } from "node:fs";

//main code
inquirer
  .prompt([
    {
      "message":"Enter url: ",
      "name": "url"
    }
  ])
  .then((answer) => {
    var qr_svg = qr.image(answer.url);
    qr_svg.pipe(createWriteStream("qr_code.png"));
    writeFile("url.txt", answer.url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Sorry,the prompt couldn't be rendered in the current environment")
    } else {
      console.error(error.message)
       console.error("Something else went wrong")
    }
  });
