const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * @param base64 - raw base64 string of audio (ogg)
 */
export const useSound = (base64: string) => {
  const audioSrc = `data:audio/ogg;base64,${base64}`;

  const play = () => {
    if (typeof window === "undefined") return;

    if (!audioCache[audioSrc]) {
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      audioCache[audioSrc] = audio;
    }

    const audio = audioCache[audioSrc];
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn("Click sound blocked:", err);
    });
  };

  return play;
};
