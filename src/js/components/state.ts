interface stateConfig {
  sound: boolean;
  memory: boolean;
  simon: boolean;
}

const state: stateConfig = {
  sound: true,
  memory: true, // can play
  simon: true // can play
}

export { state };