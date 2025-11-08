---
# 🎨 Symphonia 3D Scroll Experience

An immersive **Next.js** project that combines **GSAP**, **Lenis**, and **Tailwind CSS** to create a stunning **scroll-based 3D cube animation** with smooth transitions and responsive design.
It represents a **digital-first media company** concept called **Symphonia**, built for creative motion experiences.

---

## 🚀 Features

* ⚡ **Next.js 15** — App Router setup with TypeScript
* 🎞️ **GSAP + ScrollTrigger** — Smooth cube rotation and text animations on scroll
* 🌀 **Lenis** — Seamless scroll smoothing
* 🧱 **3D Cubes** — 6 dynamic cubes built with CSS `transform-style: preserve-3d`
* 💨 **Tailwind CSS** — Fully responsive and pixel-perfect design
* 🧭 **Responsive Layouts** — Works perfectly on mobile, tablet, and desktop
* 💎 **Image Faces** — Each cube face uses Next.js `Image` optimization
* 🔮 **Interactivity** — Animated blur, opacity, and transform transitions

---

## 🧰 Tech Stack

| Technology                                      | Purpose                                               |
| ----------------------------------------------- | ----------------------------------------------------- |
| [Next.js 15](https://nextjs.org/)               | React-based framework for server and client rendering |
| [React 19](https://react.dev/)                  | Core UI library                                       |
| [Tailwind CSS 3.4](https://tailwindcss.com/)    | Utility-first CSS framework                           |
| [GSAP 3.12](https://greensock.com/gsap/)        | Scroll-triggered animations                           |
| [Lenis](https://lenis.studiofreight.com/)       | Smooth scrolling                                      |
| [TypeScript](https://www.typescriptlang.org/)   | Type-safe code                                        |
| [Framer Motion](https://www.framer.com/motion/) | (Optional) Extra motion effects                       |

---

## 🏗️ Project Structure

```
my-nextjs-site/
│
├── app/
│   ├── layout.tsx          # Root layout with global fonts
│   ├── page.tsx            # Home page rendering HomePage + Footer
│
├── components/
│   ├── homePage.tsx        # Main scroll animation section
│   ├── footer.tsx          # Footer component
│
├── cubes/
│   └── cubesPostion.ts     # Cube positions & interpolation logic
│
├── public/
│   └── asset/              # Cube images (front, back, left, right, top, bottom)
│
├── styles/
│   └── globals.css         # Tailwind + custom responsive CSS
│
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/my-nextjs-site.git
cd my-nextjs-site
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** to view it in your browser.

---

## 🧩 Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Build the project for production |
| `npm start`     | Run the production build         |
| `npm run lint`  | Check for linting issues         |

---

## 🎬 How It Works

### 🌀 Smooth Scrolling

The project uses **Lenis** to replace the native browser scroll behavior for buttery smooth transitions.

### 🎞️ ScrollTrigger Animation

**GSAP ScrollTrigger** controls when and how the animations are triggered:

* **Logo** fades and blurs as you scroll.
* **Primary Header** scales and blurs out.
* **Secondary Header** fades in later.
* **Cubes** move and rotate in 3D space based on scroll progress.

### 🧱 Cube Interpolation

Each cube’s position, rotation, and depth (`z`) are defined in `cubesPostion.ts`:

```ts
export const cubesData = {
  "cube-1": { initial: {...}, final: {...} },
  ...
};
```

The function:

```ts
interpolate(start, end, progress)
```

smoothly transitions between two values as the user scrolls.

---

## 🔍 SEO Optimized

Symphonia is fully SEO-ready:
- ✅ Semantic HTML structure
- ✅ Optimized meta tags & Open Graph support
- ✅ JSON-LD structured data
- ✅ Sitemap & robots.txt for search indexing
- ✅ Responsive and mobile-friendly layout
- ✅ Lazy-loaded, optimized images

Search engines can easily index content, images, and metadata — ensuring strong visibility and shareability.


## 📱 Responsive Design

The layout uses CSS variables and Tailwind’s responsive utilities:

| Breakpoint | Cube Size | Logo Position |
| ---------- | --------- | ------------- |
| ≤ 420px    | 90px      | 24%           |
| 421–767px  | 110px     | 28%           |
| 768–1279px | 120px     | 30%           |
| ≥ 1280px   | 150px     | 30%           |

Each view ensures the cube layout scales beautifully across devices.

---

## 🧩 Key Files Overview

| File                  | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **`globals.css`**     | Core styles, variables, and responsive media queries |
| **`homePage.tsx`**    | Main GSAP + Lenis logic and cube animation           |
| **`cubesPostion.ts`** | Cube animation states and interpolation helper       |
| **`layout.tsx`**      | Root layout with imported fonts                      |
| **`page.tsx`**        | Combines HomePage and Footer components              |

---

## 🖼️ Assets

Place your cube face images in:

```
/public/asset/
```

Example filenames:

```
1-front.jpeg
1-back.jpeg
1-left.jpeg
1-right.jpeg
1-top.jpeg
1-bottom.jpeg
```

---

## 🌐 Deployment

To build and deploy for production:

```bash
npm run build
npm start
```

Then deploy the `.next` output using **Vercel**, **Netlify**, or your preferred platform.

---

## 🧑‍💻 Author

**Joyel Varghese**
MERN & React Developer
📍 Based in Ernakulam, Kerala, India

---

## 🪄 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute it with attribution.

---