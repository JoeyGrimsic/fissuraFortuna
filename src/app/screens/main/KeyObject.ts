// Define an interface for the key object to ensure type safety
export interface KeyObject {
  value: string;
  isDown: boolean;
  isUp: boolean;
  press?: () => void;
  release?: () => void;
  downHandler: (event: KeyboardEvent) => void;
  upHandler: (event: KeyboardEvent) => void;
  unsubscribe: () => void;
}

export function keyboard(value: string): KeyObject {
  // Initialize key with type assertions and explicit properties
  const key: KeyObject = {
    value: value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler: (event: KeyboardEvent) => { }, // Temp empty function
    upHandler: (event: KeyboardEvent) => { },   // Temp empty function
    unsubscribe: () => { }                      // Temp empty function
  };

  // Implement downHandler
  key.downHandler = (event: KeyboardEvent) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press(); // Optional chaining not needed due to the check
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  // Implement upHandler
  key.upHandler = (event: KeyboardEvent) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener);
  window.addEventListener("keyup", upListener);

  // Implement unsubscribe
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}
