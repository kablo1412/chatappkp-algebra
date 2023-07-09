/*export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
} */

const backgroundImages = [
  "/avatar-img/6769264_60111.jpg",
  "/avatar-img/27470334_7309681.jpg",
  "/avatar-img/27470336_7294793.jpg",
  "/avatar-img/fashion-boy-with-yellow-jacket-blue-pants.jpg",
  "/avatar-img/fashion-little-boy",
  "/avatar-img/24325547_2022_ani_cartoon_28.jpg",
  "/avatar-img/fun-3d-illustration-american-referee.jpg",
];

export function getRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}
