//TODO: 카테고리 스크립트 생성

import { db } from '@/db';
import { categories } from '@/db/schema';

const categoryNames = [
  '자동차',
  '코미디',
  '교육',
  '게임',
  '오락/연예',
  '영화/애니메이션',
  '패션',
  '음악',
  '뉴스',
  'VLOG',
  '반려동물/동물',
  '과학/기술',
  '스포츠',
  '여행/이벤트'
];

async function main() {
  console.log('seeding categories');

  try {
    const values = categoryNames.map(name => ({
      name,
      description: `${name} 관련 영상`,
    }));

    await db.insert(categories).values(values);

    console.log('categories successfully');
  } catch (error) {
    console.log('Error categories: ', error);
    process.exit(1);
  }
}

main();