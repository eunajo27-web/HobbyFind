import { match } from 'ts-pattern';
import {
  CATEGORIES,
  type HobbyCategory,
} from '@/constants/categories';

export type HobbyFilter = HobbyCategory | 'all';

export type Hobby = {
  id: string;
  name: string;
  category: HobbyCategory;
  imageUrl: string;
};

const hobbyImage = (fileName: string) => `/thumbnails/${fileName}`;

export const HOBBIES: Hobby[] = [
  { id: 'jogging', name: '조깅/러닝', category: 'sports', imageUrl: hobbyImage('running.jpg') },
  { id: 'yoga', name: '요가', category: 'sports', imageUrl: hobbyImage('yoga.jpg') },
  { id: 'swimming', name: '수영', category: 'sports', imageUrl: hobbyImage('swimming.jpg') },
  { id: 'cycling', name: '자전거', category: 'sports', imageUrl: hobbyImage('cycling.jpg') },
  { id: 'climbing', name: '클라이밍', category: 'sports', imageUrl: hobbyImage('climbing.jpg') },
  { id: 'dance', name: '댄스', category: 'sports', imageUrl: hobbyImage('dance.jpg') },
  { id: 'reading', name: '독서', category: 'intelligence', imageUrl: hobbyImage('reading.jpg') },
  { id: 'puzzle', name: '퍼즐', category: 'intelligence', imageUrl: hobbyImage('puzzle.jpg') },
  { id: 'chess', name: '체스', category: 'intelligence', imageUrl: hobbyImage('chess.jpg') },
  { id: 'programming', name: '프로그래밍', category: 'intelligence', imageUrl: hobbyImage('programming.jpg') },
  { id: 'language', name: '외국어 학습', category: 'intelligence', imageUrl: hobbyImage('foreign_language_learning.jpg') },
  { id: 'photography', name: '사진 촬영', category: 'intelligence', imageUrl: hobbyImage('photography.jpg') },
  { id: 'drawing', name: '그림 그리기', category: 'art', imageUrl: hobbyImage('drawing.jpg') },
  { id: 'instrument', name: '악기 연주', category: 'art', imageUrl: hobbyImage('instrument_playing.jpg') },
  { id: 'cooking', name: '요리', category: 'art', imageUrl: hobbyImage('cooking.jpg') },
  { id: 'calligraphy', name: '서예', category: 'art', imageUrl: hobbyImage('calligraphy.jpg') },
  { id: 'pottery', name: '도자기 만들기', category: 'art', imageUrl: hobbyImage('pottery.jpg') },
  { id: 'gardening', name: '정원 가꾸기', category: 'art', imageUrl: hobbyImage('gardening.jpg') },
];

/** 고정 취미 id 인지 확인합니다. */
export function isHobbyId(value: string) {
  return HOBBIES.some((hobby) => hobby.id === value);
}

/** 카테고리에 속한 6개 취미만 반환합니다. */
export function getHobbiesByCategory(category: HobbyCategory) {
  return HOBBIES.filter((hobby) => hobby.category === category);
}

/** 홈 필터에 맞는 취미 목록을 반환합니다. */
export function filterHobbies(hobbies: Hobby[], filter: HobbyFilter) {
  return match(filter)
    .with('all', () => hobbies)
    .with('sports', 'intelligence', 'art', (category) =>
      hobbies.filter((hobby) => hobby.category === category),
    )
    .exhaustive();
}

/** 취미 카테고리의 한글 이름을 반환합니다. */
export function getCategoryLabel(category: HobbyCategory) {
  return CATEGORIES.find((item) => item.type === category)?.label ?? category;
}
