export default {
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest" // Corrige el regex y acepta tanto JS como JSX
    },
    testEnvironment: "node", // Configura el entorno para Node.js
};
