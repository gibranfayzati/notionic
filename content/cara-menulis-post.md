---
title: Cara Menulis Post Baru
slug: cara-menulis-post
date: 2026-10-12
tags: [panduan]
summary: Panduan singkat menambah postingan Markdown di blog ini.
status: Published
type: Post
---

Menambah postingan baru caranya sederhana:

1. Buat file `.md` baru di folder `content/`, misal `content/judul-post.md`.
2. Isi frontmatter di bagian atas:

```markdown
---
title: Judul Post
slug: judul-post
date: 2026-10-12
tags: [tag1, tag2]
summary: Ringkasan singkat.
status: Published
type: Post
---
```

3. Tulis isi dengan Markdown biasa di bawahnya.
4. Commit, push, dan Vercel akan me-redeploy otomatis (atau via `vercel --prod`).

Field `status` harus `Published` agar tampil di daftar. Tipe `Post` tampil di feed utama.
