#!/usr/bin/env node

import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import chalk from "chalk";

const appName = process.argv[2];

if (!appName) {
  console.error(
    chalk.red(
      "❌ Merci d’indiquer le nom de l’app. Exemple : nativewind-app monApp"
    )
  );
  process.exit(1);
}

console.log(
  chalk.green(`🚀 Création de l'app Expo NativeWind : ${chalk.blue(appName)}`)
);

execSync(`npx create-expo-app@latest ${appName} --template`, {
  stdio: "inherit",
});

process.chdir(appName);

console.log(
  chalk.cyan(
    "📦 Installation de NativeWind, TailwindCSS, Reanimated, SafeArea..."
  )
);
execSync(
  `npx expo install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context`,
  { stdio: "inherit" }
);

console.log(chalk.cyan("🛠️ Initialisation de Tailwind..."));
execSync(`npx tailwindcss init`, { stdio: "inherit" });

// Créer le fichier tailwind.config.js
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
writeFileSync("tailwind.config.js", tailwindConfig);

// Créer le fichier babel.config.js
console.log(chalk.cyan("⚙️ Création du fichier Babel config..."));
const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};`;
writeFileSync("babel.config.js", babelConfig);

// Créer le fichier global.css
console.log(chalk.cyan("🖌️ Création du fichier global.css..."));
writeFileSync(
  "global.css",
  `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
);

// Créer le fichier metro.config.js
console.log(chalk.cyan("🚇 Création du fichier Metro config..."));
const metroConfig = `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });`;
writeFileSync("metro.config.js", metroConfig);

// Modifier app.json pour le bundler web
console.log(chalk.cyan("🛠️ Modification de app.json pour bundler web..."));
const appJsonPath = join(process.cwd(), "app.json");
if (existsSync(appJsonPath)) {
  const appJson = JSON.parse(readFileSync(appJsonPath, "utf8"));
  appJson.expo = appJson.expo || {};
  appJson.expo.web = { bundler: "metro" };
  writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
}

// Ajouter import "@/global.css" dans app/_layout.tsx
console.log(
  chalk.cyan("✍️ Ajout de l'importation de global.css dans app/_layout.tsx...")
);
const layoutFilePath = resolve("app", "_layout.tsx");

if (existsSync(layoutFilePath)) {
  let layoutContent = readFileSync(layoutFilePath, "utf-8");
  if (!layoutContent.includes('import "@/global.css";')) {
    const importStatement = 'import "@/global.css";\n';
    layoutContent = importStatement + layoutContent;
    writeFileSync(layoutFilePath, layoutContent, { encoding: "utf-8" });
  }
} else {
  console.warn(
    chalk.yellow(
      "⚠️ app/_layout.tsx introuvable. L'importation de global.css doit être ajoutée manuellement."
    )
  );
}

// Formatage automatique avec Prettier
console.log(chalk.cyan("🎨 Formatage du projet avec Prettier..."));
try {
  execSync(`npx prettier --write .`, { stdio: "inherit" });
} catch (error) {
  console.warn(
    chalk.yellow(
      "⚠️ Impossible de formater avec Prettier. Peut-être non installé ?"
    )
  );
}

console.log(chalk.green("\n✅ Projet prêt !"));
console.log(
  chalk.blueBright(
    `👉 Lance ton app avec :\n\n   cd ${appName} && npx expo start\n`
  )
);
