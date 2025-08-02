# PixelHack Digital Art Gallery

A modern, interactive digital art gallery web app built for hackathons and creative showcases. Features a curated gallery, artist portfolios, testimonials, and a unique 3D interactive sculpture viewer powered by Three.js.

## Features

- **Home Page:** Hero section, featured collections, best arts, artist highlights, testimonials, and newsletter signup.
- **Gallery:** Explore digital artworks with filtering options (Abstract, 3D, AI-generated).
- **Artist Portfolios:** Dedicated pages for featured artists.
- **3D Interactive Sculpture Viewer:** Experience artworks as interactive 3D models that respond to mouse movement and touch. Transform and explore digital art in three dimensions.
- **Custom UI Effects:** Page transitions, custom cursor, particle backgrounds, starfield, carousels, and more.
- **Responsive Design:** Mobile-friendly layout using Tailwind CSS and custom styles.

## Tech Stack

- **HTML5 & CSS3** (Tailwind CSS, custom styles)
- **JavaScript** (Vanilla JS, Three.js, AOS.js)
- **Three.js** for 3D rendering

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/vedant3114/pixelhack-digital-art-gallery.git
   cd pixelhack-digital-art-gallery
   ```
2. **Open `index.html` in your browser.**
   - No build step required; all dependencies are loaded via CDN.

## File Structure

```
├── home.html                # Main landing page
├── gallery.html             # Gallery view
├── portfolio.html           # Artist portfolio (Ava Sharma)
├── portfolio_ethan.html     # Artist portfolio (Ethan Chen)
├── portfolio_isabella.html  # Artist portfolio (Isabella Rossi)
├── script.js                # Main JS logic (UI, 3D, effects)
├── style.css                # Custom styles
├── style1.css               # Additional styles
├── img/                     # Artwork and branding images
│   ├── brand1.jpg
│   ├── brand2.jpg
│   ├── image1.jpg ... image9.jpg
├── threed.html              # 3D Interactive Sculpture Viewer
```

## 3D Interactive Sculpture Viewer

The 3D Interactive Sculpture Viewer is one of the standout features of our gallery. It transforms 2D artworks into interactive 3D models that users can manipulate and explore.

### Key Features

- **Shape Transformation**: Switch between different 3D shapes (Box, Sphere, Cylinder) while maintaining the mapped artwork texture
- **Interactive Controls**: 
  - Drag to rotate the model
  - Scroll/pinch to zoom in and out
  - Automatic rotation toggle
- **Artwork Gallery**: Browse through different artworks, each rendered as a unique 3D sculpture
- **Responsive Design**: Fully responsive and touch-friendly for all devices

### How to Use

1. Navigate to the 3D viewer section from the "View All Collections" button
2. Select different artworks using the thumbnail selector
3. Experiment with different shapes using the shape selector buttons
4. Toggle auto-rotation for dynamic viewing
5. Use your mouse/touch to manipulate the sculpture in real-time

### Customization

The 3D viewer can be customized in the `three.html` file:

- Adjust model size by modifying geometry parameters
- Add custom shapes by extending the shape selector
- Change lighting settings for different visual effects
- Modify depth settings for 3D models
- Add new artworks by placing images in the `img/` folder

### Technical Implementation

- Built with Three.js for WebGL rendering
- Implements touch and mouse event handling for cross-platform compatibility
- Uses texture mapping to apply 2D artwork images onto 3D geometries
- Includes optimized performance with proper disposal of Three.js objects

## Project Showcase

The 3D viewer transforms how users experience digital art by providing an immersive, interactive environment where flat images come to life. Each artwork becomes a tangible object that users can explore from multiple angles, creating a unique gallery experience that bridges the gap between traditional viewing and digital interaction.

## Credits

- Artworks and images: Unsplash, custom uploads
- Libraries: [Tailwind CSS](https://tailwindcss.com/), [Three.js](https://threejs.org/), [AOS.js](https://michalsnik.github.io/aos/)

## License

MIT License. See `LICENSE` for details.

---

**Showcase your digital creativity with PixelHack!**
