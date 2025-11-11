// src/types.ts

// RandomJoke APIが返すデータの構造に基づき定義
export type RandomJoke = {
  // FetchedRandomJoke.tsxで使用されているプロパティを記述
  type: string;
  setup: string;
  punchline: string;
  // APIによって他のプロパティがあるかもしれません（例：id, joke, etc.）
  // 必要に応じて追加してください
};