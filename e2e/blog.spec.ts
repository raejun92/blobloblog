import { expect, test } from '@playwright/test';

test.describe('홈 페이지', () => {
  test('제목과 포스트 목록이 표시된다', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('내가 보려고 만든 블로그');

    const postLinks = page.locator('h2 > a');
    await expect(postLinks.first()).toBeVisible();
    expect(await postLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('각 포스트에 제목과 날짜가 존재한다', async ({ page }) => {
    await page.goto('/');

    const posts = page.locator('h2 > a');
    const count = await posts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const times = page.locator('time');
    expect(await times.count()).toBeGreaterThanOrEqual(count);
  });
});

test.describe('포스트 페이지', () => {
  test('포스트가 정상적으로 렌더링된다', async ({ page }) => {
    await page.goto('/posts/styled-components');

    const article = page.locator('article');
    await expect(article).toBeVisible();

    await expect(article.locator('h1')).toBeVisible();
    await expect(page.locator('time')).toBeVisible();

    const content = await article.textContent();
    expect(content!.length).toBeGreaterThan(0);
  });
});

test.describe('코드 블록 (신택스 하이라이팅)', () => {
  test('코드 블록이 rehype-pretty-code로 처리된다', async ({ page }) => {
    await page.goto('/posts/useState-rendering');

    const preBlocks = page.locator('pre');
    await expect(preBlocks.first()).toBeVisible();
    expect(await preBlocks.count()).toBeGreaterThanOrEqual(1);

    const dataLines = page.locator('span[data-line]');
    expect(await dataLines.count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe('다크모드 토글', () => {
  test('버튼 클릭 시 dark 클래스가 토글된다', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggleButton = page.locator('header button');

    // defaultTheme is "system" — first click sets to "light", second click sets to "dark"
    await toggleButton.click(); // system → light
    await toggleButton.click(); // light → dark
    await expect(html).toHaveClass(/dark/);

    await toggleButton.click(); // dark → light
    await expect(html).not.toHaveClass(/dark/);
  });
});

test.describe('네비게이션', () => {
  test('홈에서 포스트로 이동하고 다시 홈으로 돌아온다', async ({ page }) => {
    await page.goto('/');

    const firstPostLink = page.locator('h2 > a').first();
    const postTitle = await firstPostLink.textContent();
    await firstPostLink.click();

    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('article h1')).toHaveText(postTitle!);

    await page.locator('header a', { hasText: 'Home' }).click();
    await expect(page.locator('h1')).toHaveText('내가 보려고 만든 블로그');
  });
});
