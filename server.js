const express = require('express');
const app = express();
const git = require('simple-git')();

const PORT = 4000;
const REPO_PATH = '/path/to/repository';

app.post('/', (req, res) => {
console.log(res)
  git.cwd(REPO_PATH)
    .pull((err, update) => {
      if (err) {
        console.error('Failed to pull repository:', err);
        return res.sendStatus(500);
      }

      if (update && update.summary.changes) {
        console.log('Repository pulled successfully.');
        return res.sendStatus(200);
      }

      console.log('Repository is up to date.');
      return res.sendStatus(204);
    });
});

app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
