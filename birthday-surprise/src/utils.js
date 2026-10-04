// Menyusun path file dari folder /public agar jalan di dev maupun hasil build
export const asset = (path) => import.meta.env.BASE_URL + path
