# HRnet React – OpenClassRooms Projet 14

Application de gestion des employés pour la société fictive Wealth Health.

---

## 🚀 Présentation
Ce projet est une application web RH permettant de :
- **Créer** de nouveaux employés via un formulaire complet et validé
- **Lister, rechercher, trier** et paginer tous les employés dans un tableau dynamique
- **Utiliser des données mock** pour faciliter le test et la démo
- **Profiter d’une expérience responsive** (tableau classique sur desktop, vue carte sur mobile)
- **Déployer facilement** sur GitHub Pages

Projet réalisé dans le cadre du parcours Développeur Front-End OpenClassRooms – Projet 14.

---

## 🛠️ Stack technique
- **React 18** (Vite)
- **Redux Toolkit** (gestion d’état)
- **@tanstack/react-table** (tableau dynamique)
- **react-datepicker-simple-tlb** (sélecteur de date)
- **react-select** (dropdown)
- **react-modal** (modal)
- **react-router-dom** (routing)
- **CSS custom**
- **gh-pages** (déploiement)

---

## 📦 Installation & lancement

1. **Cloner le repo**
```bash
git clone https://github.com/NovaMakeIt/hrnet-OC-14.git
cd hrnet-OC-14
```
2. **Installer les dépendances**
```bash
npm install
```
3. **Lancer en local**
```bash
npm run dev
```
4. **Build production**
```bash
npm run build
```
5. **Déployer sur GitHub Pages**
```bash
npm run deploy
```

---

## 🗂️ Structure du code
- `/src/pages/` : pages principales (`CreateEmployee`, `EmployeeList`)
- `/src/components/` : composants réutilisables (`DataTable`, `Dropdown`, `DatePicker`, `Modal`)
- `/src/store/` : Redux slice + store
- `/src/data/` : données mock (`mockEmployees.js`, `states.js`)
- `/src/index.css` : styles globaux

---

## ✨ Fonctionnalités principales
- **Formulaire de création** avec validation temps réel
- **Tableau interactif** : tri, recherche globale, pagination, responsive
- **Vue carte mobile** : chaque employé s’affiche en bloc sur smartphone
- **Données mock** : 15 employés fictifs pour tester sans back-end
- **Déploiement** : configuration optimisée pour GitHub Pages (HashRouter, base Vite, etc.)

---

## 📸 Démo
- Démo en ligne : [https://novamakeit.github.io/hrnet-OC-14/](https://novamakeit.github.io/hrnet-OC-14/)
