// Globomantics Robotics, LLC - Demo Console App
// WARNING: This file contains a hardcoded API key as an antipattern for training purposes only.

const GITHUB_PAT = 'ghp_FAKE1234567890abcdef1234567890abcdef1234'; // DO NOT DO THIS IN PRODUCTION

function clearConsole() {
    // Works in most terminals
    process.stdout.write('\x1Bc');
}

function showAsciiArt() {
    console.log(`
   ____ _ _       _                 _             _        _        
  / ___| (_)_ __ | | ___   __ _  __| | ___  _ __ | |_ __ _| |_ ___  
 | |  _| | | '_ \| |/ _ \ / _\` |/ _\` |/ _ \| '_ \| __/ _\` | __/ _ \ 
 | |_| | | | | | | | (_) | (_| | (_| | (_) | | | | || (_| | ||  __/ 
  \____|_|_|_| |_|_|\___/ \__,_|\__,_|\___/|_| |_|\__\__,_|\__\___| 
                                                                    
`);
}

function main() {
    clearConsole();
    showAsciiArt();
    console.log('Welcome to the Globomantics Robotics, LLC Console App!');
    console.log('------------------------------------------------------');
    console.log('This app requires a GitHub Personal Access Token (PAT) to operate.');
    console.log('Current PAT (antipattern, for demo only):');
    console.log(`\nGITHUB_PAT = ${GITHUB_PAT}\n`);
    console.log('*** Never hardcode secrets in your code! This is for secret scanning demo purposes only. ***');
}

main();