// Handles fetching and caching data
const CACHE = {};

export async function loadData(filename) {
    if (CACHE[filename]) return CACHE[filename];
    
    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const data = await response.json();
        CACHE[filename] = data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
