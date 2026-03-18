/**
 * AI Code Review Script
 * Uses Google Gemini API to review PR diffs and post comments on GitHub PRs.
 *
 * Required Environment Variables:
 *  - GEMINI_API_KEY  : Google Gemini API key
 *  - GITHUB_TOKEN    : GitHub token (auto-provided by Actions)
 *  - PR_NUMBER       : Pull Request number
 *  - REPO            : Repository (owner/repo)
 *  - PR_TITLE        : Pull Request title
 *  - PR_BODY         : Pull Request description
 */

const fs = require('fs');
const https = require('https');

// ===================== CONFIG =====================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.REPO;
const PR_TITLE = process.env.PR_TITLE || '';
const PR_BODY = process.env.PR_BODY || '';

const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const MAX_DIFF_LENGTH = 30000; // Giới hạn diff gửi lên Gemini để tránh vượt token limit
const MAX_RETRIES = 3;         // Số lần retry khi bị rate limit
const RETRY_BASE_DELAY = 60;   // Thời gian chờ cơ bản (giây)

// ===================== HELPERS =====================

/**
 * Sleep for given seconds
 */
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Make an HTTPS request (Promise-based, no external dependencies)
 * Returns { statusCode, data } to allow caller to handle status codes
 */
function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        } else {
          const error = new Error(`HTTP ${res.statusCode}: ${data}`);
          error.statusCode = res.statusCode;
          error.responseBody = data;
          reject(error);
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

/**
 * Call Gemini API with retry logic for rate limiting (429)
 */
async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const parsedUrl = new URL(url);

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 4096,
    },
  });

  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await httpsRequest(parsedUrl, options, body);

      if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
        return response.candidates[0].content.parts[0].text;
      }

      throw new Error('Unexpected Gemini API response: ' + JSON.stringify(response));
    } catch (error) {
      if (error.statusCode === 429 && attempt < MAX_RETRIES) {
        // Parse retry delay from response if available
        let waitSeconds = RETRY_BASE_DELAY * attempt;
        try {
          const errorBody = JSON.parse(error.responseBody);
          const retryInfo = errorBody.error?.details?.find(
            (d) => d['@type']?.includes('RetryInfo')
          );
          if (retryInfo?.retryDelay) {
            waitSeconds = Math.ceil(parseFloat(retryInfo.retryDelay)) + 5;
          }
        } catch { /* use default wait */ }

        console.log(`⚠️ Rate limited (429). Attempt ${attempt}/${MAX_RETRIES}. Waiting ${waitSeconds}s before retry...`);
        await sleep(waitSeconds);
        continue;
      }
      throw error;
    }
  }
}

/**
 * Post a comment on the PR via GitHub API
 */
async function postPRComment(comment) {
  const url = new URL(`https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`);

  const body = JSON.stringify({ body: comment });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-Code-Review-Bot',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  await httpsRequest(url, options, body);
  console.log('✅ Review comment posted successfully.');
}

// ===================== MAIN =====================

async function main() {
  // Validate required env vars
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is not set. Add it to repository secrets.');
    process.exit(1);
  }
  if (!GITHUB_TOKEN || !PR_NUMBER || !REPO) {
    console.error('❌ Missing required GitHub environment variables.');
    process.exit(1);
  }

  // Read diff
  let diff = '';
  try {
    diff = fs.readFileSync('pr_diff.txt', 'utf-8');
  } catch (err) {
    console.error('❌ Could not read pr_diff.txt:', err.message);
    process.exit(1);
  }

  if (!diff.trim()) {
    console.log('ℹ️ Empty diff, skipping review.');
    return;
  }

  // Truncate diff if too large
  if (diff.length > MAX_DIFF_LENGTH) {
    console.log(`⚠️ Diff too large (${diff.length} chars), truncating to ${MAX_DIFF_LENGTH} chars.`);
    diff = diff.substring(0, MAX_DIFF_LENGTH) + '\n\n... (diff truncated)';
  }

  console.log(`📝 Reviewing PR #${PR_NUMBER}: "${PR_TITLE}"`);
  console.log(`📊 Diff size: ${diff.length} characters`);

  // Build prompt
  const prompt = `You are a senior QA Automation Engineer reviewing a Pull Request.
The project uses JavaScript, Playwright, and Page Object Model (POM) pattern.

## PR Information
- **Title:** ${PR_TITLE}
- **Description:** ${PR_BODY || 'N/A'}

## Instructions
Review the following code diff and provide feedback in **Vietnamese (Tiếng Việt)**.

Focus on:
1. **Bugs & Logic Errors** — Lỗi logic, null/undefined, race conditions
2. **Test Quality** — Assertions đầy đủ, test coverage, flaky patterns
3. **POM Compliance** — Đúng Page Object Model, tách biệt page/test/data
4. **Locator Quality** — Locator ổn định, không dùng dynamic class names
5. **Best Practices** — Tránh hard-coded waits, dùng auto-wait, code DRY
6. **Security** — Không hardcode credentials, không leak sensitive data

## Output Format
Respond in GitHub Flavored Markdown with the following structure:

### 🤖 AI Code Review Summary
[Tổng quan ngắn gọn về PR]

### ✅ Điểm tốt
[Các điểm code tốt]

### ⚠️ Đề xuất cải thiện
[Liệt kê từng issue với file/line nếu có thể]

### 🐛 Bugs/Issues tiềm ẩn
[Nếu không có thì ghi "Không phát hiện"]

### 📊 Đánh giá tổng thể
[Cho đánh giá: ✅ LGTM / ⚠️ Minor Changes Requested / ❌ Changes Required]

---

## Code Diff:
\`\`\`diff
${diff}
\`\`\``;

  // Call Gemini
  console.log('🚀 Sending diff to Gemini API...');
  const reviewResult = await callGemini(prompt);

  // Build final comment
  const comment = `## 🤖 AI Code Review (Powered by Gemini)

> Automated review for PR #${PR_NUMBER} — Generated by [Gemini AI](https://ai.google.dev/)

${reviewResult}

---
<sub>🔧 This review was generated automatically by GitHub Actions + Gemini API. It is not a substitute for human review.</sub>`;

  // Post comment
  await postPRComment(comment);
  console.log('🎉 AI Code Review completed!');
}

main().catch((err) => {
  console.error('❌ AI Review failed:', err.message);
  process.exit(1);
});
