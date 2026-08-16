const fs = require('fs');
const path = require('path');

const START_MARKER = '<!-- recent-posts:start -->';
const END_MARKER = '<!-- recent-posts:end -->';

function escapeMarkdown(text) {
  return String(text).replace(/([\\[\]])/g, '\\$1');
}

hexo.extend.generator.register('repository-readme', locals => {
  const readmePath = path.join(hexo.base_dir, 'README.md');
  const original = fs.readFileSync(readmePath, 'utf8');
  const posts = locals.posts
    .sort('-date')
    .limit(5)
    .map(post => `- [${escapeMarkdown(post.title)}](${post.permalink})`)
    .join('\n');
  const recentPosts = `${START_MARKER}\n${posts}\n${END_MARKER}`;
  const markerPattern = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`);
  const readme = original.replace(markerPattern, recentPosts);

  if (readme !== original) {
    fs.writeFileSync(readmePath, readme, 'utf8');
  }

  return {
    path: 'README.md',
    data: readme
  };
});
