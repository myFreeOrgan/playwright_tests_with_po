function generateRandomIndexes(maxIndex, count) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * maxIndex);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

export default {
    generateRandomIndexes,
};
