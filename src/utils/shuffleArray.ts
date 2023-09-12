interface MemoryCard {
  uuid: string;
}

function shuffleArrayWithIndex<T extends MemoryCard>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.map((element, index) => ({
    ...element,
    uuid: `${element.uuid}-${index}`,
    success: false,
    isFlipped: false,
  }));
}

export default shuffleArrayWithIndex;
