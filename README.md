
# create-nativewind-app

🚀 Crée une application **Expo** prête à l'emploi avec **NativeWind** + **TailwindCSS** en une seule commande !

---

## ✨ Fonctionnalités

- 📦 Installe Expo + NativeWind + TailwindCSS + Reanimated + SafeArea
- ⚙️ Configure automatiquement :
  - `tailwind.config.js`
  - `babel.config.js`
  - `metro.config.js`
  - Importe `global.css` dans `_layout.tsx`
  - Modifie `app.json` pour Metro
- 🎨 Prépare ton projet pour utiliser NativeWind sans efforts

---

## 📥 Installation

Utilise simplement **npx** pour lancer l'outil sans avoir besoin de l'installer globalement :

```bash
npx nativewind-app nomDeTonApp
```

Remplace `nomDeTonApp` par le nom que tu veux donner à ton projet.

---

## 🛠️ Que fait exactement la commande ?

1. Crée une app **Expo**.
2. Installer les dépendances nécessaires :
   - `nativewind`
   - `tailwindcss`
   - `react-native-reanimated`
   - `react-native-safe-area-context`
3. Initialise TailwindCSS.
4. Configure automatiquement les fichiers :
   - **`tailwind.config.js`**
   - **`babel.config.js`**
   - **`metro.config.js`**
   - **Importe `global.css`** dans `app/_layout.tsx`
   - **Configure `app.json`** pour Metro sur Web.
5. Lance ton projet en quelques secondes.

---

## 🚀 Démarrer l'application

Après création :

```bash
cd nomDeTonApp
npx expo start
```

---

## 🔥 Exemple rapide

```bash
npx nativewind-app MonApp
```

puis :

```bash
cd MonApp
npx expo start
```

Et c'est prêt ! 🎉

---

## 👤 Auteur

- **Hugues Apithy**

---

## 📄 Licence

Ce projet est sous licence **MIT**.

