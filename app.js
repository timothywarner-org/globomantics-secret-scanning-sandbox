// Globomantics Robotics, LLC - Demo Console App
// WARNING: This file contains a hardcoded API key as an antipattern for training purposes only.

const GITHUB_PAT = 'ghp_FAKE1234567890abcdef1234567890abcdef1234'; // DO NOT DO THIS IN PRODUCTION
const ROBOTICS_VENDOR_API_KEY = 'rvk_live_51HfAKE1234567890abcdef1234567890abcdef'; // DO NOT DO THIS IN PRODUCTION
const OPENAI_API_KEY = 'sk-FAKE123456789012345678901234567890123456789012345678'; // DO NOT DO THIS IN PRODUCTION

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

function connectToGitHub(pat) {
    // Simulate connecting to GitHub API
    if (!pat) {
        console.log('Error: No GitHub PAT provided.');
        return false;
    }
    console.log('Connecting to GitHub with PAT...');
    // Simulated API call
    return true;
}

function connectToRoboticsVendor(apiKey) {
    // Simulate connecting to a robotics vendor API
    if (!apiKey) {
        console.log('Error: No Robotics Vendor API key provided.');
        return false;
    }
    console.log('Connecting to Robotics Vendor Cloud API...');
    // Simulated API call
    return true;
}

function main() {
    clearConsole();
    showAsciiArt();
    console.log('Welcome to the Globomantics Robotics, LLC Console App!');
    console.log('------------------------------------------------------');
    console.log('This app requires both a GitHub Personal Access Token (PAT) and a Robotics Vendor API Key to operate.');
    console.log('Current PAT (antipattern, for demo only):');
    console.log(`GITHUB_PAT = ${GITHUB_PAT}`);
    console.log('Current Robotics Vendor API Key (antipattern, for demo only):');
    console.log(`ROBOTICS_VENDOR_API_KEY = ${ROBOTICS_VENDOR_API_KEY}\n`);
    console.log('*** Never hardcode secrets in your code! This is for secret scanning demo purposes only. ***\n');
    connectToGitHub(GITHUB_PAT);
    connectToRoboticsVendor(ROBOTICS_VENDOR_API_KEY);
    console.log('\nSimulated: Fetched robot status and pushed telemetry to GitHub.');
}

main();