import '@babel/polyfill';

async function* inner() {
  const ids = [0, 1, 2, 3];
  for await (const id of ids) {
    yield id;
  }
}

async function* wrapper() {
  yield* inner();
  console.log('done');
}

const run = async() => {
  for await (const id of wrapper()) {
    console.log(id);
    break;
  }
};

run();
