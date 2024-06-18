

# В вашей локальной копии переключитесь в ветку master
git checkout master
# Заберите изменения из репозитория Академии¹ (или academy)
git pull academy master
# Отправьте изменения ветки master в ваш форк на Гитхабе (или origin)
git push origin master
# Когда вы обновили master, создайте ветку для выполнения задания
git checkout -b module1-task2


npm install chalk
import chalk from 'chalk';

console.log(chalk.blue('Hello world!'));

const VIOLET = [85, 37, 187] as const;
${chalk.green('--version:')}                   ${chalk.rgb(...VIOLET)('# выводит номер версии')}
${chalk.green('--help:')}                      ${chalk.rgb(...VIOLET)('# печатает этот текст')}
${chalk.green('--import')} <path>:             ${chalk.rgb(...VIOLET)('# импортирует данные из TSV')}

export enum CommandName {
  Help = '--help',
  Import = '--import',
  Version = '--version'
}

npm start 
npm test
cd


git remote add academy git@github.com:htmlacademy-nodejs-api/2363155-six-cities-7.git
