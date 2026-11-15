// The home page's forest drawing. The page head preloads the same file the scene draws, so
// both get it from here.
import { getImage } from 'astro:assets';
import sharp from 'sharp';
import forestImage from '../assets/me-on-rock-and-forest.png';

export const forestSize = { width: forestImage.width, height: forestImage.height };

export const getForest = () => getImage({ src: forestImage, width: forestImage.width, format: 'webp' });

// A thumbnail of the drawing (about 1.5 KB), small enough to sit in the page itself. It fills the
// scene with the drawing's colors until the real file arrives.
export const getForestPlaceholder = async () => {
  const tiny = await sharp('src/assets/me-on-rock-and-forest.png').resize(128).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${tiny.toString('base64')}`;
};
