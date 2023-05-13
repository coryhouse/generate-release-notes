# generate-release-notes

Strongly typed release notes generated via separate files using Node and TypeScript

1. Create <code>releaseNotes/next/prNumber.tsx</code>. Replace `prNumber` in this example with the PR number created
   in the previous step. For example, if the PR number is 100, create <code>100.tsx</code>.

2. Inside, export a const of type <code>ReleaseNote</code> so TypeScript enforces adding the necessary information about
   your change. Commit this file.
