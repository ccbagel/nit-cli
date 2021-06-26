const auth = require('./creds');
const app = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

app.command('init')
  .description('Run CLI tool')
  .action(async() => {
      //show welcome message
      clear(); //clears the terminal

      //display app title
      console.log(chalk.yellow.bold(
      figlet.textSync('Nit cli', { horizontalLayout: 'full' })));
      
      //show welcome message
      console.log(chalk.yellow.bold("Welcome to the GitHub initializer tool.\nThis tool helps setup a local repo and a remote one."));
      

      const question = [{
        name: 'proceed',
        type: 'input',
        message: 'Proceed to push this project to a Github remote repo?',
        choices: ['Yes', 'No'],
        default: 'Yes'
    }];

    const answer = await inquirer.prompt(question);

    if(answer.proceed == "Yes"){
    //proceed with Github authentication, creating the repo, etc.
        console.log(chalk.green("Authenticating..."))
        const octokit = await auth.authenticate(); 
    }else{
        //show exit message
        console.log(chalk.gray("Okay, bye."))
    }
})

app.parse(process.argv); //get the arg (i.e. init)

//show help if no arg is passed
if (!app.args.length) {
    app.help(); 
}
