# Generate Release Notes via Node and TypeScript

**Problem**: If you store release notes in a single file log CHANGELOG.md, you will run into merge conflicts constantly as different developers add entries.

**Solution**: Store each release note in a separate file.

Strongly typed release notes generated via separate files using Node and TypeScript = No more conflicts, and type safety to assure all release notes follow a common pattern. 🎉

1. Create <code>release-notes/next/<pr-number>.tsx</code>. Replace `pr-number` in this example with the PR number created
   in the previous step. For example, if the PR number is 100, create <code>100.ts</code>.

2. Inside, export a const of type <code>ReleaseNote</code> so TypeScript enforces adding the necessary information about
   your change. Commit this file.
