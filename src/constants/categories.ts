export const HOBBY_CATEGORY_TYPES = ['sports', 'intelligence', 'art'] as const;

export type HobbyCategory = (typeof HOBBY_CATEGORY_TYPES)[number];

export type Category = {
  type: HobbyCategory;
  label: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    type: 'sports',
    label: '운동형',
    description:
      '몸을 움직이며 활력을 채우는 취미입니다. 부담 없이 하루를 시작해 보세요.',
  },
  {
    type: 'intelligence',
    label: '지능형',
    description:
      '생각하고 배우며 몰입하는 취미입니다. 일상 속 작은 성장이 쌓입니다.',
  },
  {
    type: 'art',
    label: '예술형',
    description:
      '손으로 만들고 감각을 표현하는 취미입니다. 나만의 속도로 즐겨 보세요.',
  },
];

/** URL type 값으로 고정 카테고리를 찾습니다. */
export function getCategory(type: string) {
  return CATEGORIES.find((category) => category.type === type);
}
