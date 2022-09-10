import displayCom from './comments-counter';

describe('Testing displayCom function', () => {
  let comments = [];

  test('A list containing one comment should return 1. ', () => {
    comments.push({ username: 'Moses', comment: 'Very thrilling', creation_date: '2022-03-10' });
    const result = displayCom(comments);
    expect(result).toBe(1);
  });

  test('A list containing two comment should return 2. ', () => {
    comments.push({ username: 'James', comment: 'Captivating', creation_date: '2022-03-11' });
    const result = displayCom(comments);
    expect(result).toBe(2);
  });
});