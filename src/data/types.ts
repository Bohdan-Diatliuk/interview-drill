
export type Questions = {
    id: number;
    category: string;
    question: string;
    answer: string;
    difficult: "easy" | "medium" | "hard";
}

export type Links = {
    id: number;
    title: string;
    url: string;
}