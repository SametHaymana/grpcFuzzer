const { program } = require("commander");
const App = require("./src/app");

program
  .option("-p, --path <type>", "Proto files path")
  .option("-h, --host <type>", "Server host. ex: localhost:50051")
  .option("-i, --iterations <type>", "Number of iterations , default: 1000")
  // For verbose mode only
  .option("-v, --verbose", "Verbose mode");

program.parse(process.argv);

const options = program.opts();

if (!options.path) {
  console.log("Path is required");
  return;
}

if (!options.host) {
  console.log("Host is required");
  return;
}

const app = new App(
  options.path,
  options.host,
  options.iterations,
  options.verbose
);
console.log("Starting fuzzer");
console.log(app);
app.start();
