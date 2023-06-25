export type TodoNodeType =
  | "skill" // 기술
  | "competition" // 대회
  | "class" // 수업
  | "job" // 취업
  | "certificate"; // 자격증

export default interface TodoNode {
  id: string;
  title: string;
  type: TodoNodeType;
  content: string;
  prev: string[];
  next: string[];
  related: string[];
}
